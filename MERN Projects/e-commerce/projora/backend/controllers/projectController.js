import Project from '../models/Project.js';
import cloudinary from '../config/cloudinaryConfig.js';
import User from '../models/User.js'; 

// Helper function to delete media from Cloudinary
const deleteCloudinaryMedia = async (public_id, resource_type = 'image') => {
  if (!public_id) return;
  try {
    await cloudinary.uploader.destroy(public_id, { resource_type });
  } catch (error) {
    console.log(`Cloudinary delete error (${resource_type}):`, error.message);
  }
};

/**
 * @route   POST /api/projects/create
 * @desc    Create a new project
 * @access  Private (Admin)
 */
export const createProject = async (req, res) => {
  try {
    const { title, desc, category, price, liveDemoUrl, images, demoVideo, productFile } = req.body;

    // --- 1. Validation ---
    if (!title || !desc || !category || !price || !liveDemoUrl || !productFile,technologies) {
      return res.status(400).json({
        message: 'Title, desc, category, price, live demo, and product file are required.',
      });
    }
    if (!images || images.length === 0) {
      return res.status(400).json({ message: 'You must provide at least one project image.' });
    }
    
    // --- 2. Build the new project object ---
    const newProjectData = {
      title,
      desc,
      category,
      technologies,
      price: Number(price),
      liveDemoUrl,
      images,
      productFile,
      demoVideo: (demoVideo && demoVideo.public_id) ? demoVideo : undefined, // Add video only if it exists
    };

    // --- 3. Create the project ---
    const newProject = await Project.create(newProjectData);

    res.status(201).json({
      message: 'Project created successfully!',
      project: newProject,
    });

  } catch (error) {
    console.log("PROJECT CREATE FAILED:", error);
  
    res.status(500).json({
      message: 'Server error while creating project.',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'Projects fetched successfully!',
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while fetching projects.',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by ID
 * @access  Public
 */
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.status(200).json({
      message: 'Project fetched successfully!',
      project,
    });
  } catch (error) {
    console.log('GET PROJECT BY ID FAILED:', error);
    res.status(500).json({
      message: 'Server error while fetching project.',
      error: error.message,
    });
  }
};

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Private (Admin)
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the project post
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // 2. Delete all media from Cloudinary
    
    // Delete all images in the array
    if (project.images && project.images.length > 0) {
      for (const image of project.images) {
        await deleteCloudinaryMedia(image.public_id, 'image');
      }
    }
    // Delete the demo video
    if (project.demoVideo && project.demoVideo.public_id) {
      await deleteCloudinaryMedia(project.demoVideo.public_id, 'video');
    }
    // Delete the product ZIP file
    // if (project.productFile && project.productFile.public_id) {
    //   await deleteCloudinaryMedia(project.productFile.public_id, 'raw'); // 'raw' is for files
    // }

    await User.updateMany(
      { purchasedProjects: id },
      { $pull: { purchasedProjects: id } }
    );
    
    // Delete the post from MongoDB
    await Project.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Project deleted successfully!',
    });

  } catch (error) {
    console.log('DELETE PROJECT FAILED:', error);
    res.status(500).json({
      message: 'Server error while deleting project.',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/projects/categories
 * @desc    Get all unique project categories
 * @access  Public
 */
export const getProjectCategories = async (req, res) => {
  try {
    const categories = await Project.distinct('category');
    res.status(200).json({
      message: 'Categories fetched successfully!',
      categories,
    });
  } catch (error) {
    console.log('GET CATEGORIES FAILED:', error);
    res.status(500).json({
      message: 'Server error while fetching categories.',
      error: error.message,
    });
  }
};

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project
 * @access  Private (Admin)
 */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, category, price, liveDemoUrl, images, demoVideo, productFile,technologies } = req.body;

    const oldProject = await Project.findById(id);
    if (!oldProject) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Prepare the new data
    const updateData = {
      title: title || oldProject.title,
      desc: desc || oldProject.desc,
      category: category || oldProject.category,
      technologies: technologies || oldProject.technologies,
      price: Number(price) || oldProject.price,
      liveDemoUrl: liveDemoUrl || oldProject.liveDemoUrl,
      productFile: productFile || oldProject.productFile,
    };

    // --- Cloudinary "Delete and Replace" Logic ---
    
    // Check for new images array
    if (images) {
      // Delete all old images
      if (oldProject.images && oldProject.images.length > 0) {
        for (const image of oldProject.images) {
           await deleteCloudinaryMedia(image.public_id, 'image');
        }
      }
      updateData.images = images;
    }

    // Check for new demoVideo
    if (demoVideo) {
      if (oldProject.demoVideo && oldProject.demoVideo.public_id) {
        await deleteCloudinaryMedia(oldProject.demoVideo.public_id, 'video');
      }
      updateData.demoVideo = demoVideo;
    }

    // Check for new productFile
    // if (productFile) {
    //     if (oldProject.productFile && oldProject.productFile.public_id) {
    //         await deleteCloudinaryMedia(oldProject.productFile.public_id, 'raw');
    //     }
    //     updateData.productFile = productFile;
    // }

    // Find and update the project in MongoDB
    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: 'Project updated successfully!',
      project: updatedProject,
    });

  } catch (error) {
    console.log('UPDATE PROJECT FAILED:', error);
  
    res.status(500).json({
      message: 'Server error while updating project post.',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/projects/download/:projectId
 * @desc    Get a download link for a purchased project
 * @access  Private (User)
 */
export const getDownloadLink = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.userId; // From isAuth middleware

    // 1. Find the user and check their purchases
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 2. Check if the user's 'purchasedProjects' array includes the requested projectId
    const hasPurchased = user.purchasedProjects.includes(projectId);

    if (!hasPurchased) {
      return res.status(403).json({ message: "You have not purchased this project." });
    }

    // 3. If they own it, get the project and return the file URL
    const project = await Project.findById(projectId);
  if (!project || !project.productFile) {
      return res.status(404).json({ message: "Project file not found." });
    }

    res.status(200).json({
      message: "Download link fetched.",
      downloadUrl: project.productFile,
    });

  } catch (error) {
    console.log('GET DOWNLOAD LINK FAILED:', error);
    res.status(500).json({
      message: 'Server error while fetching download link.',
      error: error.message,
    });
  }
};

export const getProjectsByTech = async (req, res) => {
  try {
    // URL will look like: /api/projects/filter?techs=HTML,CSS,JS
    const techQuery = req.query.techs; // "HTML,CSS,JS"
    
    // If no techs are selected, return all projects
    if (!techQuery) {
      return getAllProjects(req, res); // Just show all
    }

    const techArray = techQuery.split(','); // ["HTML", "CSS", "JS"]

    // Find all projects where the 'technologies' array
    // contains ALL of the items in techArray
    const projects = await Project.find({
      technologies: { $all: techArray }
    });

    res.status(200).json({ projects });

  } catch (error) {
    res.status(500).json({ message: "Server error while filtering." });
  }
};