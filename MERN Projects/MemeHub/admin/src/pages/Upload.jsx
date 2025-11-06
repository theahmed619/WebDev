import React, { useState, useRef } from 'react';
import { uploadToCloudinary } from '../helpers/uploadHelper';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from "../components/Navbar"
import { HiOutlinePhotograph, HiOutlineVideoCamera, HiOutlineFilm } from 'react-icons/hi';
import { Upload as UploadIcon, Sparkles, X, Check, Loader } from 'lucide-react';

const categories = [
  'Funny',
  'Adult',
  'Vlog',
  'News',
  'Emotional',
  'Animal',
  'Bollywood',
  'Hollywood',
  'Educational',
  'Random',
  'Cartoon',
  'X',
  
];

const Upload = () => {
  const [fid, setFid] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [reelFile, setReelFile] = useState(null);

  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [reelPreview, setReelPreview] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const reelInputRef = useRef(null);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (fileType === 'image') {
      setImageFile(file);
      setImagePreview(previewUrl);
    } else if (fileType === 'video') {
      setVideoFile(file);
      setVideoPreview(previewUrl);
    } else if (fileType === 'reel') {
      setReelFile(file);
      setReelPreview(previewUrl);
    }
  };

  const clearFile = (fileType) => {
    if (fileType === 'image') {
      setImageFile(null);
      setImagePreview('');
      if (imageInputRef.current) imageInputRef.current.value = null;
    } else if (fileType === 'video') {
      setVideoFile(null);
      setVideoPreview('');
      if (videoInputRef.current) videoInputRef.current.value = null;
    } else if (fileType === 'reel') {
      setReelFile(null);
      setReelPreview('');
      if (reelInputRef.current) reelInputRef.current.value = null;
    }
  };

  const clearForm = () => {
    setFid('');
    setTitle('');
    setDesc('');
    setCategory('');
    setImageFile(null);
    setVideoFile(null);
    setReelFile(null);
    setImagePreview('');
    setVideoPreview('');
    setReelPreview('');
    if (imageInputRef.current) imageInputRef.current.value = null;
    if (videoInputRef.current) videoInputRef.current.value = null;
    if (reelInputRef.current) reelInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fid || !title || !category) {
      return toast.error('FID and Title are required.');
    }

    if (!imageFile && !videoFile && !reelFile) {
      return toast.error('You must upload at least one media file.');
    }

    setIsLoading(true);
    let blogImage = null;
    let blogVideo = null;
    let blogReel = null;

    try {
      if (imageFile) {
        setUploadProgress('Uploading image...');
        blogImage = await uploadToCloudinary(imageFile);
      }
      if (videoFile) {
        setUploadProgress('Uploading video...');
        blogVideo = await uploadToCloudinary(videoFile);
      }
      if (reelFile) {
        setUploadProgress('Uploading reel...');
        blogReel = await uploadToCloudinary(reelFile);
      }

      setUploadProgress('Creating blog post...');
      const token = localStorage.getItem('token');

      const blogPostData = {
        fid,
        title,
        desc,
        category,
        blogImage,
        blogVideo,
        blogReel,
      };

      await axios.post(
        `${import.meta.env.VITE_SERVER}/api/blog/create`,
        blogPostData,
        {
          headers: {
            token: token,
          },
        }
      );

      toast.success('Blog post created successfully!');
      clearForm();

    } catch (error) {
      console.error('Blog creation failed:', error);
      toast.error(error.message || 'An error occurred.');
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
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mt-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full -mr-12 -mb-12"></div>
        </div>

        {/* Icon */}
        <div className={`relative z-10 ${file ? 'bg-green-500' : 'bg-white'} p-4 rounded-2xl shadow-lg mb-4 transition-all duration-300 ${!file && 'group-hover:scale-110 group-hover:rotate-6'}`}>
          {file ? (
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          ) : (
            <Icon className="w-8 h-8 text-gray-600" />
          )}
        </div>

        {/* Text */}
        <span className="relative z-10 text-sm font-bold text-gray-700 text-center">
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

      {/* Preview */}
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
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-auto object-cover rounded-xl" 
            />
          ) : (
            <video 
              controls 
              src={preview} 
              className="w-full h-auto rounded-xl bg-black" 
            />
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
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 rounded-2xl shadow-xl">
                <UploadIcon className="w-8 h-8 text-white" strokeWidth={2.5} />
                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" strokeWidth={3} />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                  Create New Post
                  <Sparkles className="w-8 h-8 text-purple-500" strokeWidth={2} />
                </h1>
                <p className="text-gray-500 font-semibold mt-1">
                  Share your amazing content with the world
                </p>
              </div>
            </div>
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full w-32"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                <h2 className="text-2xl font-black text-gray-900">Basic Information</h2>
              </div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fid" className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                    Post FID
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="fid"
                    value={fid}
                    onChange={(e) => setFid(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 font-semibold text-gray-800 disabled:opacity-50"
                    placeholder="e.g., 101"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                    Title
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 font-semibold text-gray-800 disabled:opacity-50"
                    placeholder="My Awesome Post"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                    Category
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 font-semibold text-gray-800 disabled:opacity-50"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label htmlFor="desc" className="block text-sm font-bold text-gray-700">
                  Description
                </label>
                <textarea
                  id="desc"
                  rows={5}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 font-medium text-gray-800 resize-none disabled:opacity-50"
                  placeholder="Write something amazing about your post..."
                />
              </div>
            </div>

            {/* Media Uploads Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                  <h2 className="text-2xl font-black text-gray-900">Media Uploads</h2>
                </div>
                <span className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                  At least 1 required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MediaUploadCard
                  type="image"
                  icon={HiOutlinePhotograph}
                  label="Upload Image"
                  file={imageFile}
                  preview={imagePreview}
                  inputRef={imageInputRef}
                  gradient="from-pink-50 to-rose-50"
                />
                <MediaUploadCard
                  type="video"
                  icon={HiOutlineVideoCamera}
                  label="Upload Video"
                  file={videoFile}
                  preview={videoPreview}
                  inputRef={videoInputRef}
                  gradient="from-blue-50 to-indigo-50"
                />
                <MediaUploadCard
                  type="reel"
                  icon={HiOutlineFilm}
                  label="Upload Reel"
                  file={reelFile}
                  preview={reelPreview}
                  inputRef={reelInputRef}
                  gradient="from-purple-50 to-pink-50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={clearForm}
                disabled={isLoading}
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 text-white font-black rounded-2xl transition-all duration-300 overflow-hidden group shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" strokeWidth={3} />
                      {uploadProgress || 'Processing...'}
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-5 h-5" strokeWidth={3} />
                      Create Post
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Progress Indicator */}
            {isLoading && (
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-indigo-200">
                <div className="flex items-center gap-4">
                  <Loader className="w-6 h-6 text-indigo-600 animate-spin" strokeWidth={3} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-700">Upload in progress...</p>
                    <p className="text-xs font-semibold text-gray-500 mt-1">{uploadProgress}</p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;