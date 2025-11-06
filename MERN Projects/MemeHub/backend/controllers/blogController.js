import Blog from '../models/Blog.js';
import cloudinary from '../config/cloudinaryConfig.js';

export const createBlog = async (req, res) => {
  try {
    const { fid, title, desc,category, blogImage, blogVideo, blogReel } = req.body;
console.log(fid)
    // --- 1. Validation (Basic Fields) ---
    if (!fid || !title || !category ) {
      return res.status(400).json({
        message: 'fid , title and category are required.',
      });
    }

    // --- 2. Validation (Media Fields) ---
    // Check that AT LEAST ONE media item is provided
    if (!blogImage && !blogVideo && !blogReel) {
      return res.status(400).json({
        message: 'You must provide at least one image, video, or reel.',
      });
    }

    // --- 3. Build the new blog object ---
    const newBlogData = {
      fid: Number(fid),
      title,
      desc,
      category,
    };

    // Add optional fields ONLY if they were provided and valid
    if (blogImage) {
      if (blogImage.public_id && blogImage.url) {
        newBlogData.blogImage = blogImage;
      } else {
        return res.status(400).json({ message: 'blogImage must have a public_id and url.' });
      }
    }

    if (blogVideo) {
      if (blogVideo.public_id && blogVideo.url) {
        newBlogData.blogVideo = blogVideo;
      } else {
        return res.status(400).json({ message: 'blogVideo must have a public_id and url.' });
      }
    }

    if (blogReel) {
      if (blogReel.public_id && blogReel.url) {
        newBlogData.blogReel = blogReel;
      } else {
        return res.status(400).json({ message: 'blogReel must have a public_id and url.' });
      }
    }
// console.log("newBlogData",newBlogData)
    // --- 4. Create the blog post ---
    const newBlog = await Blog.create(newBlogData);
    // console.log("newBlog",newBlog)

    res.status(201).json({
      message: 'Blog created successfully!',
      blog: newBlog,
    });

  } catch (error) {
    console.log("BLOG CREATE FAILED:", error);
    // --- 5. Handle Errors ---
    if (error.code === 11000) {
      return res.status(409).json({
        message: `An error occurred. The fid '${error.keyValue.fid}' already exists.`,
      });
    }
    
    res.status(500).json({
      message: 'Server error while creating blog post.',
      error: error.message,
    });
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    // console.log(blogs)
    res.status(200).json({
      message: 'Blogs fetched successfully!',
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while fetching blogs.',
      error: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the blog post
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    // 2. Delete media from Cloudinary
    // We check each media type and delete it if it exists.
    try {
      if (blog.blogImage && blog.blogImage.public_id) {
        await cloudinary.uploader.destroy(blog.blogImage.public_id, {
          resource_type: 'image',
        });
      }
      if (blog.blogVideo && blog.blogVideo.public_id) {
        await cloudinary.uploader.destroy(blog.blogVideo.public_id, {
          resource_type: 'video',
        });
      }
      if (blog.blogReel && blog.blogReel.public_id) {
        await cloudinary.uploader.destroy(blog.blogReel.public_id, {
          resource_type: 'video', // Reels are also resource_type 'video'
        });
      }
    } catch (cldError) {
      console.log('Cloudinary delete error:', cldError);
      // We don't stop the process, just log the error
      // The post will be deleted from DB regardless
    }
    
    // 3. Delete the post from MongoDB
    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Blog post deleted successfully!',
    });

  } catch (error) {
    console.log('DELETE BLOG FAILED:', error);
    res.status(500).json({
      message: 'Server error while deleting blog post.',
      error: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    res.status(200).json({
      message: 'Blog fetched successfully!',
      blog,
    });
  } catch (error) {
    console.log('GET BLOG BY ID FAILED:', error);
    res.status(500).json({
      message: 'Server error while fetching blog.',
      error: error.message,
    });
  }
};

export const getBlogCategories = async (req, res) => {
  try {
    // This finds all unique string values in the 'category' field
    const categories = await Blog.distinct('category');
    
    res.status(200).json({
      message: 'Categories fetched successfully!',
      categories, // This will be an array of strings: ['Fantasy', 'Sci-Fi', ...]
    });
  } catch (error) {
    console.log('GET CATEGORIES FAILED:', error);
    res.status(500).json({
      message: 'Server error while fetching categories.',
      error: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // Get new data from the body
    const { fid, title, desc, category, blogImage, blogVideo, blogReel } = req.body;

    // Find the blog post we want to update
    const oldBlog = await Blog.findById(id);
    if (!oldBlog) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    // Prepare the new data
    const updateData = {
      fid: Number(fid) || oldBlog.fid,
      title: title || oldBlog.title,
      desc: desc || oldBlog.desc,
      category: category || oldBlog.category,
    };

    // --- Cloudinary "Delete and Replace" Logic ---
    
    // Check for new Image
    if (blogImage) {
      // If old image exists, delete it
      if (oldBlog.blogImage && oldBlog.blogImage.public_id) {
        await cloudinary.uploader.destroy(oldBlog.blogImage.public_id, { resource_type: 'image' });
      }
      // Add new image data to our update
      updateData.blogImage = blogImage;
    }

    // Check for new Video
    if (blogVideo) {
      if (oldBlog.blogVideo && oldBlog.blogVideo.public_id) {
        await cloudinary.uploader.destroy(oldBlog.blogVideo.public_id, { resource_type: 'video' });
      }
      updateData.blogVideo = blogVideo;
    }

    // Check for new Reel
    if (blogReel) {
      if (oldBlog.blogReel && oldBlog.blogReel.public_id) {
        await cloudinary.uploader.destroy(oldBlog.blogReel.public_id, { resource_type: 'video' });
      }
      updateData.blogReel = blogReel;
    }

    // --- End of Cloudinary Logic ---

    // Find and update the blog in MongoDB
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true,
    });

    res.status(200).json({
      message: 'Blog updated successfully!',
      blog: updatedBlog,
    });

  } catch (error) {
    console.log('UPDATE BLOG FAILED:', error);
    // Handle duplicate FID error
    if (error.code === 11000) {
      return res.status(409).json({
        message: `An error occurred. The fid '${error.keyValue.fid}' already exists.`,
      });
    }
    res.status(500).json({
      message: 'Server error while updating blog post.',
      error: error.message,
    });
  }
};