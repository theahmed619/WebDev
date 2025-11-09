import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { PageLoader } from '../components/Loader';
import { Trash2, Edit } from 'lucide-react';
import { ArrowLeft, Calendar, Tag, Eye, IndianRupee, Code, FileArchive } from 'lucide-react';

// Renamed from DetailBlog.jsx
const DetailProject = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/projects/${id}`, // Updated endpoint
          { headers: { token: token } }
        );
        setProject(data.project);
      } catch (error) {
        toast.error("Could not fetch project.");
        navigate("/projects"); // Go back to projects list
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate]);
  
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/projects/${id}`, // Updated endpoint
        { headers: { token: token } }
      );
      toast.success("Project deleted successfully!");
      navigate('/projects');
    } catch (error) { 
      toast.error(error.response?.data?.message || 'Delete failed.'); 
    }
  };
  
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <PageLoader />;
  if (!project) return null; // We navigate away on error, so this is fine

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pt-24 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-bold"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            Back to All Projects
          </Link>
          
          {/* Title Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-gray-100">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-xl">
                <Code className="w-4 h-4 text-indigo-600" strokeWidth={2.5} />
                <span className="text-sm font-bold text-indigo-700">{project.category}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
                <IndianRupee className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                <span className="text-sm font-bold text-green-700">Price: {project.price}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                <Calendar className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
                <span className="text-sm font-bold text-gray-700">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Cover Image */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 md:col-span-1">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Cover Image</h3>
              <img 
                src={project.images?.[0]?.url || 'https://placehold.co/600x400?text=No+Image'} 
                alt="Cover" 
                className="w-full h-auto object-cover rounded-2xl" 
              />
            </div>
            {/* Demo Video */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 md:col-span-2">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Demo Video</h3>
              {project.demoVideo?.url ? (
                <video 
                  src={project.demoVideo.url} 
                  controls 
                  className="w-full max-h-[60vh] bg-black rounded-2xl" 
                />
              ) : (
                <div className="flex items-center justify-center h-48 bg-gray-50 rounded-2xl text-gray-500">
                  No demo video uploaded.
                </div>
              )}
            </div>
          </div>

          {/* Description & Links */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap font-medium mb-6">
              {project.desc || "No description provided."}
            </p>
            
            <h3 className="text-xl font-bold text-gray-800 mb-3">Links</h3>
            <div className="space-y-3">
              <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
                <Eye className="w-4 h-4" /> {project.liveDemoUrl}
              </a>
              <a href={project.productFile.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 font-medium hover:underline">
                <FileArchive className="w-4 h-4" /> Download Product .zip
              </a>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleEdit}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-2xl shadow-xl"
            >
              <Edit className="w-6 h-6" />
              <span className="font-black text-lg">Edit Project</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-red-600 text-white rounded-2xl shadow-xl"
            >
              <Trash2 className="w-6 h-6" />
              <span className="font-black text-lg">Delete Project</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProject;