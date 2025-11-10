import React, { useState, useRef } from 'react';
import { uploadToCloudinary } from '../helpers/uploadHelper';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from "../components/Navbar"
// --- 1. THIS IS THE FIX ---
// You were missing the import for your icons
import { HiOutlinePhotograph, HiOutlineVideoCamera } from 'react-icons/hi';
// --- END OF FIX ---
import { Upload as UploadIcon, Sparkles, X, Check, Loader, Link as LinkIcon, Plus } from 'lucide-react';

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

const allTechnologies = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 
  'Firebase', 'TailwindCSS', 'Java', 'Python', 'Redux'
];

const Upload = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [technologies, setTechnologies] = useState([]);

  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleFileChange = (e, fileType) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (fileType === 'image') {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImageFiles(prevFiles => [...prevFiles, ...newFiles]);
      setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    } else if (fileType === 'video') {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoPreview(previewUrl);
    }
  };

  const clearFile = (fileType, indexToRemove) => {
    if (fileType === 'image') {
      if (indexToRemove !== undefined) {
        setImageFiles(prev => prev.filter((_, i) => i !== indexToRemove));
        setImagePreviews(prev => {
          const newPreviews = prev.filter((_, i) => i !== indexToRemove);
          URL.revokeObjectURL(prev[indexToRemove]);
          return newPreviews;
        });
      } else {
        imagePreviews.forEach(url => URL.revokeObjectURL(url));
        setImageFiles([]);
        setImagePreviews([]);
        if (imageInputRef.current) imageInputRef.current.value = null;
      }
    } else if (fileType === 'video') {
      URL.revokeObjectURL(videoPreview);
      setVideoFile(null);
      setVideoPreview('');
      if (videoInputRef.current) videoInputRef.current.value = null;
    }
  };

  const clearForm = () => {
    setTitle('');
    setDesc('');
    setCategory('');
    setPrice('');
    setLiveDemoUrl('');
    setGoogleDriveLink('');
    setTechnologies([]);
    clearFile('image');
    clearFile('video');
  };

  const handleTechChange = (tech) => {
    setTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !price || !liveDemoUrl || !googleDriveLink) {
      return toast.error('All fields, including Google Drive link, are required.');
    }
    if (imageFiles.length === 0) {
      return toast.error('You must upload at least one Cover Image.');
    }
    
    setIsLoading(true);
    let demoVideo = null;
    let uploadedImages = [];
    try {
      setUploadProgress(`Uploading ${imageFiles.length} image(s)...`);
      
      const uploadPromises = imageFiles.map(file => 
        uploadToCloudinary(file, 'image')
      );
      uploadedImages = await Promise.all(uploadPromises);

      if (uploadedImages.some(img => img === null)) {
        toast.error("One or more image uploads failed. Cannot create project.");
        setIsLoading(false);
        setUploadProgress('');
        return;
      }

      if (videoFile) {
        setUploadProgress('Uploading demo video...');
        demoVideo = await uploadToCloudinary(videoFile, 'video');
      }
      
      setUploadProgress('Creating project...');
      const token = localStorage.getItem('token');

      const projectPostData = {
        title,
        desc,
        category,
        technologies,
        price: Number(price),
        liveDemoUrl,
        images: uploadedImages,
        demoVideo: demoVideo, 
        productFile: googleDriveLink,
      };

      await axios.post(
        `${import.meta.env.VITE_SERVER}/api/projects/create`,
        projectPostData,
        { headers: { token: token } }
      );

      toast.success('Project created successfully!');
      clearForm();

    } catch (error) {
      console.error('Project creation failed:', error);
      toast.error(error.response?.data?.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
      setUploadProgress('');
    }
  };
  
  const MediaUploadCard = ({ type, icon: Icon, label, file, preview, inputRef, gradient }) => (
    <div className="group">
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        disabled={isLoading}
        className={`relative w-full flex flex-col items-center justify-center px-6 py-8 bg-gradient-to-br ${gradient} rounded-2xl border-3 border-dashed transition-all duration-300 overflow-hidden ${
          file 
            ? 'border-green-400 bg-green-50' 
            : 'border-gray-300 hover:border-indigo-400 hover:shadow-xl'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mt-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full -mr-12 -mb-12"></div>
        </div>
        <div className={`relative z-10 ${file ? 'bg-green-500' : 'bg-white'} p-4 rounded-2xl shadow-lg mb-4 transition-all duration-300 ${!file && 'group-hover:scale-110 group-hover:rotate-6'}`}>
          {file ? (
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          ) : (
            <Icon className="w-8 h-8 text-gray-600" />
          )}
        </div>
        <span className="relative z-10 text-sm font-bold text-gray-700 text-center break-all px-2">
          {file ? file.name : label}
        </span>
        
        {file && (
          <span className="relative z-10 mt-2 text-xs font-semibold text-green-600 flex items-center gap-1">
            <Check className="w-4 h-4" />
            Ready to upload
          </span>
        )}

        <input
          type="file"
          accept={type === 'image' ? 'image/*' : 'video/*'}
          ref={inputRef}
          onChange={(e) => handleFileChange(e, type)}
          className="hidden"
          disabled={isLoading}
        />
      </button>
      {preview && (
        <div className="relative mt-4 rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 group">
          <button
            type="button"
            onClick={() => clearFile(type)}
            disabled={isLoading}
            className="absolute top-3 right-3 z-20 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <X className="w-4 h-4" strokeWidth={3} />
          </button>
          {type === 'image' ? (
            <img src={preview} alt="Preview" className="w-full h-auto object-cover rounded-xl" />
          ) : (
            <video controls src={preview} className="w-full h-auto rounded-xl bg-black" />
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-24 pb-24 md:pb-8 px-4">
        <div className="max-w-6xl mx-auto">
           <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 rounded-2xl shadow-xl">
                <UploadIcon className="w-8 h-8 text-white" strokeWidth={2.5} />
                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" strokeWidth={3} />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                  Create New Project
                </h1>
                <p className="text-gray-500 font-semibold mt-1">
                  Upload a new project to your Projora store
                </p>
              </div>
            </div>
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full w-32"></div>
          </div>


          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                <h2 className="text-2xl font-black text-gray-900">Project Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-bold text-gray-700">Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    placeholder="e.g., Projora Website"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-bold text-gray-700">Category <span className="text-red-500">*</span></label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-bold text-gray-700">Price (INR) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    placeholder="e.g., 499"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="liveDemoUrl" className="block text-sm font-bold text-gray-700">Live Demo URL <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="liveDemoUrl"
                    value={liveDemoUrl}
                    onChange={(e) => setLiveDemoUrl(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label htmlFor="desc" className="block text-sm font-bold text-gray-700">Description</label>
                <textarea
                  id="desc"
                  rows={5}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 resize-none"
                  placeholder="Describe your project..."
                />
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
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                  <h2 className="text-2xl font-black text-gray-900">Project Media</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Project Images (Select multiple) *</label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                        <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => clearFile('image', index)}
                          disabled={isLoading}
                          className="absolute top-1 right-1 z-10 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-lg"
                        >
                          <X className="w-3 h-3" strokeWidth={3} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => imageInputRef.current.click()}
                      disabled={isLoading}
                      className="flex flex-col items-center justify-center aspect-square bg-gray-50 text-gray-400 rounded-lg border-3 border-dashed border-gray-300 hover:border-indigo-400 hover:text-indigo-400 transition-all"
                    >
                      <Plus className="w-8 h-8" />
                      <span className="text-xs font-semibold">Add Image</span>
                    </button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    onChange={(e) => handleFileChange(e, 'image')}
                    className="hidden"
                    disabled={isLoading}
                    multiple
                  />
                </div>
                
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Demo Video (Optional)</label>
                  <MediaUploadCard
                    type="video"
                    icon={HiOutlineVideoCamera}
                    label="Upload Demo Video"
                    file={videoFile}
                    preview={videoPreview}
                    inputRef={videoInputRef}
                    gradient="from-blue-50 to-indigo-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={clearForm}
                disabled={isLoading}
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-400"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 text-white font-black rounded-2xl shadow-xl disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" strokeWidth={3} />
                      {uploadProgress || 'Processing...'}
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-5 h-5" strokeWidth={3} />
                      Create Project
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;