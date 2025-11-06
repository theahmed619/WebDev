import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { uploadToCloudinary } from '../helpers/uploadHelper';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from "../components/Navbar";
import { PageLoader } from '../components/LoadingSpinner';
import { HiOutlinePhotograph, HiOutlineVideoCamera, HiOutlineFilm, HiArrowLeft } from 'react-icons/hi';
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

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form data
  const [fid, setFid] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');

  // Old media previews
  const [oldImagePreview, setOldImagePreview] = useState('');
  const [oldVideoPreview, setOldVideoPreview] = useState('');
  const [oldReelPreview, setOldReelPreview] = useState('');

  // New file objects
  const [newImageFile, setNewImageFile] = useState(null);
  const [newVideoFile, setNewVideoFile] = useState(null);
  const [newReelFile, setNewReelFile] = useState(null);

  // New file previews
  const [newImagePreview, setNewImagePreview] = useState('');
  const [newVideoPreview, setNewVideoPreview] = useState('');
  const [newReelPreview, setNewReelPreview] = useState('');

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [uploadProgress, setUploadProgress] = useState('');

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const reelInputRef = useRef(null);

  // 1. Fetch existing blog data on load
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsFetching(true);
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/blog/${id}`,
          { headers: { token: token } }
        );
        
        const blog = data.blog;
        setFid(blog.fid);
        setTitle(blog.title);
        setDesc(blog.desc || '');
        setCategory(blog.category);
        
        // Set old previews
        if (blog.blogImage) setOldImagePreview(blog.blogImage.url);
        if (blog.blogVideo) setOldVideoPreview(blog.blogVideo.url);
        if (blog.blogReel) setOldReelPreview(blog.blogReel.url);

      } catch (error) {
        toast.error("Could not fetch blog post data.");
        navigate('/'); // Go home if post doesn't exist
      } finally {
        setIsFetching(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  // 2. Handle *new* file changes
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (fileType === 'image') {
      setNewImageFile(file);
      setNewImagePreview(previewUrl);
    } else if (fileType === 'video') {
      setNewVideoFile(file);
      setNewVideoPreview(previewUrl);
    } else if (fileType === 'reel') {
      setNewReelFile(file);
      setNewReelPreview(previewUrl);
    }
  };

  // 3. Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fid || !title || !category) {
      return toast.error('FID, Title, and Category are required.');
    }

    setIsLoading(true);
    
    // We will only send new media data if new files were uploaded
    let updateData = { fid, title, desc, category };

    try {
      // 4. Upload *only* the new files
      if (newImageFile) {
        setUploadProgress('Uploading new image...');
        const blogImage = await uploadToCloudinary(newImageFile);
        updateData.blogImage = blogImage; // Add to updateData
      }
      if (newVideoFile) {
        setUploadProgress('Uploading new video...');
        const blogVideo = await uploadToCloudinary(newVideoFile);
        updateData.blogVideo = blogVideo;
      }
      if (newReelFile) {
        setUploadProgress('Uploading new reel...');
        const blogReel = await uploadToCloudinary(newReelFile);
        updateData.blogReel = blogReel;
      }

      setUploadProgress('Saving changes...');
      const token = localStorage.getItem('token');

      // 5. Send PUT request to the backend
      await axios.put(
        `${import.meta.env.VITE_SERVER}/api/blog/${id}`,
        updateData,
        {
          headers: { token: token },
        }
      );

      toast.success('Blog post updated successfully!');
      navigate('/'); // Go back home

    } catch (error) {
      console.error('Blog update failed:', error);
      toast.error(error.response?.data?.message || 'Update failed.');
    } finally {
      setIsLoading(false);
      setUploadProgress('');
    }
  };
  
  // A simple card for showing/updating media
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
        <h1 className="text-4xl font-black text-gray-900 mb-6">Edit Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Blog Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* FID */}
              <div className="space-y-2">
                <label htmlFor="fid" className="font-bold text-gray-700">FID</label>
                <input
                  type="number" id="fid" value={fid}
                  onChange={(e) => setFid(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200"
                />
              </div>
              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="font-bold text-gray-700">Title</label>
                <input
                  type="text" id="title" value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200"
                />
              </div>
              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="font-bold text-gray-700">Category</label>
                <select
                  id="category" value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Description */}
            <div className="mt-6 space-y-2">
              <label htmlFor="desc" className="font-bold text-gray-700">Description</label>
              <textarea
                id="desc" rows={5} value={desc}
                onChange={(e) => setDesc(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200"
              />
            </div>
          </div>

          {/* Media Uploads Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Media (Replace)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MediaEditCard
                type="image" icon={HiOutlinePhotograph} label="Replace Image"
                oldPreview={oldImagePreview} newPreview={newImagePreview}
                inputRef={imageInputRef}
              />
              <MediaEditCard
                type="video" icon={HiOutlineVideoCamera} label="Replace Video"
                oldPreview={oldVideoPreview} newPreview={newVideoPreview}
                inputRef={videoInputRef}
              />
              <MediaEditCard
                type="reel" icon={HiOutlineFilm} label="Replace Reel"
                oldPreview={oldReelPreview} newPreview={newReelPreview}
                inputRef={reelInputRef}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl"
            >
              {isLoading ? (uploadProgress || 'Saving...') : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBlog;