import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { uploadToCloudinary } from '../helpers/uploadHelper';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from "../components/Navbar";
import { PageLoader } from '../components/Loader';
import { HiOutlinePhotograph, HiOutlineVideoCamera } from 'react-icons/hi';
import { Upload as UploadIcon, X, Check, Loader, Link as LinkIcon, Plus } from 'lucide-react';

const categories = [
  'Frontend',
  'Backend',
  'Full-Stack',
  'MERN Stack',
  'Java',
  'JS',
  'React JS',
  'Next JS',
  'Games',
  'Other',
];
// --- 1. ADD TECHNOLOGY LIST ---
const allTechnologies = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 
  'Firebase', 'TailwindCSS', 'Java', 'Python', 'Redux'
]

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form data
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [googleDriveLink, setGoogleDriveLink] = useState(''); 
  const [technologies, setTechnologies] = useState([]);

  // --- 1. MODIFIED STATE FOR MULTIPLE IMAGES ---
  const [oldImages, setOldImages] = useState([]); // To show current images
  const [oldVideoPreview, setOldVideoPreview] = useState('');

  const [newImageFiles, setNewImageFiles] = useState([]); // For new uploads
  const [newVideoFile, setNewVideoFile] = useState(null);

  const [newImagePreviews, setNewImagePreviews] = useState([]); // For new previews
  const [newVideoPreview, setNewVideoPreview] = useState('');
  // --- END MODIFICATION ---

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [uploadProgress, setUploadProgress] = useState('');

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // 1. Fetch existing project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsFetching(true);
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/projects/${id}`,
          { headers: { token: token } }
        );
        
        const project = data.project;
        setTitle(project.title);
        setDesc(project.desc || '');
        setCategory(project.category);
        setPrice(project.price.toString());
        setLiveDemoUrl(project.liveDemoUrl);
        setGoogleDriveLink(project.productFile || '');
        setTechnologies(project.technologies || []);
        
        // --- 2. MODIFIED TO LOAD IMAGE ARRAY ---
        if (project.images) {
          setOldImages(project.images); // Set array of { public_id, url }
        }
        if (project.demoVideo) {
          setOldVideoPreview(project.demoVideo.url);
        }
        // --- END MODIFICATION ---

      } catch (error) {
        toast.error("Could not fetch project data.");
        navigate('/projects');
      } finally {
        setIsFetching(false);
      }
    };
    fetchProject();
  }, [id, navigate]);

  // --- 3. MODIFIED handleFileChange ---
  const handleFileChange = (e, fileType) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (fileType === 'image') {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      
      // Clear old images when new ones are added
      setOldImages([]); 
      
      setNewImageFiles(prevFiles => [...prevFiles, ...newFiles]);
      setNewImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);

    } else if (fileType === 'video') {
      const file = files[0];
      setNewVideoFile(file);
      setNewVideoPreview(URL.createObjectURL(file));
      setOldVideoPreview(''); // Clear old video
    }
  };
  // --- END MODIFICATION ---

  // --- 4. MODIFIED clearFile (for new images) ---
  const clearNewFile = (fileType, indexToRemove) => {
     if (fileType === 'image') {
        setNewImageFiles(prev => prev.filter((_, i) => i !== indexToRemove));
        setNewImagePreviews(prev => {
          const newPreviews = prev.filter((_, i) => i !== indexToRemove);
          URL.revokeObjectURL(prev[indexToRemove]);
          return newPreviews;
        });
    } else if (fileType === 'video') {
        URL.revokeObjectURL(newVideoPreview);
        setNewVideoFile(null);
        setNewVideoPreview('');
    }
  }
  // --- END MODIFICATION ---

  const handleTechChange = (tech) => {
    setTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech) // Uncheck: remove from array
        : [...prev, tech] // Check: add to array
    );
  };

  // 3. Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !price || !liveDemoUrl || !googleDriveLink) {
      return toast.error('All fields, including Google Drive link, are required.');
    }

    setIsLoading(true);
    let updateData = { 
      title, 
      desc, 
      category, 
      technologies,
      price: Number(price), 
      liveDemoUrl, 
      productFile: googleDriveLink
    };

    try {
      // --- 5. MODIFIED UPLOAD LOGIC ---
      // Only upload if new images were added
      if (newImageFiles.length > 0) {
        setUploadProgress(`Uploading ${newImageFiles.length} new image(s)...`);
        const uploadPromises = newImageFiles.map(file => 
          uploadToCloudinary(file, 'image')
        );
        const uploadedImages = await Promise.all(uploadPromises);

        if (uploadedImages.some(img => img === null)) {
          toast.error("One or more image uploads failed.");
          setIsLoading(false);
          return;
        }
        updateData.images = uploadedImages; // Set the new array
      } else {
        // No new images, so send back the *old* images to keep them
        updateData.images = oldImages;
      }

      if (newVideoFile) {
        setUploadProgress('Uploading new video...');
        const demoVideo = await uploadToCloudinary(newVideoFile, 'video');
        if (demoVideo) {
          updateData.demoVideo = demoVideo;
        }
      }
      // --- END MODIFICATION ---

      setUploadProgress('Saving changes...');
      const token = localStorage.getItem('token');

      await axios.put(
        `${import.meta.env.VITE_SERVER}/api/projects/${id}`,
        updateData,
        { headers: { token: token } }
      );

      toast.success('Project updated successfully!');
      navigate('/projects');

    } catch (error) {
      console.error('Project update failed:', error);
      toast.error(error.response?.data?.message || 'Update failed.');
    } finally {
      setIsLoading(false);
      setUploadProgress('');
    }
  };
  
  // (This sub-component is now only used for video)
  const MediaEditCard = ({ type, icon: Icon, label, oldPreview, newPreview, inputRef }) => {
    const preview = newPreview || oldPreview;
    return (
      <div className="space-y-3">
        <label className="font-bold text-gray-700">{label}</label>
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          disabled={isLoading}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
            newPreview ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white hover:border-blue-500'
          }`}
        >
          {newPreview ? <Check className="w-5 h-5 text-green-600" /> : <Icon className="w-5 h-5 text-gray-500" />}
          <span className={`font-semibold ${newPreview ? 'text-green-600' : 'text-gray-600'}`}>
            {newPreview ? 'New file selected!' : 'Upload New'}
          </span>
        </button>
        {preview && (
          <div className="relative rounded-lg overflow-hidden border">
            {type === 'image' ? (
              <img src={preview} alt="Preview" className="w-full h-auto object-cover" />
            ) : (
              <video controls src={preview} className="w-full h-auto bg-black" />
            )}
            <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold text-white ${
              newPreview ? 'bg-green-500' : 'bg-gray-700'
            }`}>
              {newPreview ? 'New' : 'Current'}
            </div>
          </div>
        )}
        <input
          type="file"
          accept={type === 'image' ? 'image/*' : 'video/*'}
          ref={inputRef}
          onChange={(e) => handleFileChange(e, type)}
          className="hidden"
          disabled={isLoading}
        />
      </div>
    );
  };

  if (isFetching) return <PageLoader />;

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-24 md:pb-8 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-6">Edit Project</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ... (Project Details Card is the same) ... */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="font-bold text-gray-700">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} className="w-full p-3 rounded-xl border-2" />
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="font-bold text-gray-700">Category</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} disabled={isLoading} className="w-full p-3 rounded-xl border-2">
                  <option value="">Select a category</option>
                  {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="price" className="font-bold text-gray-700">Price (INR)</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} disabled={isLoading} className="w-full p-3 rounded-xl border-2" />
              </div>
              <div className="space-y-2">
                <label htmlFor="liveDemoUrl" className="font-bold text-gray-700">Live Demo URL</label>
                <input type="text" id="liveDemoUrl" value={liveDemoUrl} onChange={(e) => setLiveDemoUrl(e.target.value)} disabled={isLoading} className="w-full p-3 rounded-xl border-2" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label htmlFor="desc" className="font-bold text-gray-700">Description</label>
              <textarea id="desc" rows={5} value={desc} onChange={(e) => setDesc(e.target.value)} disabled={isLoading} className="w-full p-3 rounded-xl border-2" />
            </div>

            <div className="mt-6 space-y-2">
              <label htmlFor="googleDriveLink" className="block text-sm font-bold text-gray-700">Product Google Drive Link <span className="text-red-500">*</span></label>
              <div className="relative">
                <LinkIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  id="googleDriveLink"
                  value={googleDriveLink}
                  onChange={(e) => setGoogleDriveLink(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="https://drive.google.com/..."
                />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label className="block text-sm font-bold text-gray-700">Technologies</label>
              <div className="flex flex-wrap gap-3">
                {allTechnologies.map((tech) => (
                  <label key={tech} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={technologies.includes(tech)}
                      onChange={() => handleTechChange(tech)}
                      disabled={isLoading}
                      className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="font-medium text-gray-700">{tech}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* --- 6. MODIFIED MEDIA SECTION --- */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Replace Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Replace Project Images</label>
                <p className="text-xs text-gray-500 mb-3">Uploading new images will replace all old ones.</p>
                {/* Grid for Image Previews */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {/* Show NEW previews if they exist */}
                  {newImagePreviews.length > 0 ? (
                    newImagePreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-green-400">
                        <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => clearNewFile('image', index)}
                          disabled={isLoading}
                          className="absolute top-1 right-1 z-10 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-lg"
                        >
                          <X className="w-3 h-3" strokeWidth={3} />
                        </button>
                      </div>
                    ))
                  ) : (
                    // Otherwise, show OLD images
                    oldImages.map((image, index) => (
                       <div key={image.public_id} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                        <img src={image.url} alt={`Old Preview ${index}`} className="w-full h-full object-cover" />
                         <div className="absolute top-1 left-1 bg-gray-900/70 text-white text-xs px-2 py-0.5 rounded-full">Current</div>
                      </div>
                    ))
                  )}
                  {/* Add New Image Button */}
                  <button
                    type="button"
                    onClick={() => imageInputRef.current.click()}
                    disabled={isLoading}
                    className="flex flex-col items-center justify-center aspect-square bg-gray-50 text-gray-400 rounded-lg border-3 border-dashed border-gray-300 hover:border-indigo-400 hover:text-indigo-400 transition-all"
                  >
                    <Plus className="w-8 h-8" />
                    <span className="text-xs font-semibold">Add New</span>
                  </button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={(e) => handleFileChange(e, 'image')}
                  className="hidden"
                  disabled={isLoading}
                  multiple // <-- Allow multiple
                />
              </div>

              {/* Video Upload Section */}
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Replace Demo Video (Optional)</label>
                <MediaEditCard
                  type="video" icon={HiOutlineVideoCamera} label="Replace Demo Video"
                  oldPreview={oldVideoPreview} newPreview={newVideoPreview}
                  inputRef={videoInputRef}
                />
              </div>

            </div>
          </div>
          {/* --- END MODIFIED MEDIA SECTION --- */}

          {/* ... (Submit Button is the same) ... */}
           <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl"
            >
              {isLoading ? (uploadProgress || 'Saving...') : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProject;