import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { uploadToCloudinary } from '../helpers/uploadHelper';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from "../components/Navbar";
import { PageLoader } from '../components/Loader';
import { HiOutlinePhotograph, HiOutlineVideoCamera } from 'react-icons/hi';
import { Upload as UploadIcon, X, Check, Loader, Link as LinkIcon } from 'lucide-react'; // 1. Import LinkIcon

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

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form data
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  // --- 2. Replaced zip state with link state ---
  const [googleDriveLink, setGoogleDriveLink] = useState(''); 

  // Old media previews
  const [oldImagePreview, setOldImagePreview] = useState('');
  const [oldVideoPreview, setOldVideoPreview] = useState('');
  // const [oldZipName, setOldZipName] = useState(''); // <-- REMOVED

  // New file objects
  const [newImageFile, setNewImageFile] = useState(null);
  const [newVideoFile, setNewVideoFile] = useState(null);
  // const [newZipFile, setNewZipFile] = useState(null); // <-- REMOVED

  // New file previews
  const [newImagePreview, setNewImagePreview] = useState('');
  const [newVideoPreview, setNewVideoPreview] = useState('');

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [uploadProgress, setUploadProgress] = useState('');

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  // const zipInputRef = useRef(null); // <-- REMOVED

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
        
        // --- 3. Load the Google Drive link string ---
        setGoogleDriveLink(project.productFile || ''); // <-- UPDATED
        
        // Set old previews
        if (project.images?.[0]) setOldImagePreview(project.images[0].url);
        if (project.demoVideo) setOldVideoPreview(project.demoVideo.url);

      } catch (error) {
        toast.error("Could not fetch project data.");
        navigate('/projects');
      } finally {
        setIsFetching(false);
      }
    };
    fetchProject();
  }, [id, navigate]);

  // 2. Handle *new* file changes
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fileType === 'image') {
      setNewImageFile(file);
      setNewImagePreview(URL.createObjectURL(file));
    } else if (fileType === 'video') {
      setNewVideoFile(file);
      setNewVideoPreview(URL.createObjectURL(file));
    }
    // No zip logic needed
  };

  // 3. Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !price || !liveDemoUrl || !googleDriveLink) {
      return toast.error('All fields, including Google Drive link, are required.');
    }

    setIsLoading(true);
    // --- 4. Add googleDriveLink to the update data ---
    let updateData = { 
      title, 
      desc, 
      category, 
      price: Number(price), 
      liveDemoUrl, 
      productFile: googleDriveLink // <-- UPDATED
    };

    try {
      // 4. Upload *only* the new image/video files
      if (newImageFile) {
        setUploadProgress('Uploading new image...');
        const projectImage = await uploadToCloudinary(newImageFile, 'image');
        if (projectImage) {
          updateData.images = [projectImage]; // Send as array
        }
      }
      if (newVideoFile) {
        setUploadProgress('Uploading new video...');
        const demoVideo = await uploadToCloudinary(newVideoFile, 'video');
        if (demoVideo) {
          updateData.demoVideo = demoVideo;
        }
      }

      // --- 5. REMOVED zip upload logic ---

      setUploadProgress('Saving changes...');
      const token = localStorage.getItem('token');

      // 5. Send PUT request
      await axios.put(
        `${import.meta.env.VITE_SERVER}/api/projects/${id}`,
        updateData,
        { headers: { token: token } }
      );

      toast.success('Project updated successfully!');
      navigate('/projects'); // Go back to projects list

    } catch (error) {
      console.error('Project update failed:', error);
      toast.error(error.response?.data?.message || 'Update failed.');
    } finally {
      setIsLoading(false);
      setUploadProgress('');
    }
  };
  
  // Sub-component for editing media (unchanged, still used for image/video)
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
          {/* --- 6. UPDATED Basic Info Card --- */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ... (Title, Category, Price, Live Demo URL inputs are the same) ... */}
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
            {/* ... (Description textarea is the same) ... */}
            <div className="mt-6 space-y-2">
              <label htmlFor="desc" className="font-bold text-gray-700">Description</label>
              <textarea id="desc" rows={5} value={desc} onChange={(e) => setDesc(e.target.value)} disabled={isLoading} className="w-full p-3 rounded-xl border-2" />
            </div>

            {/* --- 7. NEW Google Drive Link input --- */}
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
                  placeholder="httpsE://drive.google.com/..."
                />
              </div>
            </div>
          </div>

          {/* --- 8. UPDATED Media Uploads Card --- */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Replace Media</h2>
            {/* Updated to 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MediaEditCard
                type="image" icon={HiOutlinePhotograph} label="Replace Cover Image"
                oldPreview={oldImagePreview} newPreview={newImagePreview}
                inputRef={imageInputRef}
              />
              <MediaEditCard
                type="video" icon={HiOutlineVideoCamera} label="Replace Demo Video"
                oldPreview={oldVideoPreview} newPreview={newVideoPreview}
                inputRef={videoInputRef}
              />
              {/* Zip card removed */}
            </div>
          </div>

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