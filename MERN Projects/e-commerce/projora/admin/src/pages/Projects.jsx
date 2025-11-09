import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { PageLoader } from '../components/Loader';
import ProjectCard from '../components/ProjectCard'; // Import the new card
import { LayoutGrid, Sparkles, AlertTriangle } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      // 1. Fetch from the new projects endpoint
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/projects/all`,
        { headers: { token: token } } // Admin auth
      );
      setProjects(data.projects);
    } catch (error) {
      toast.error('Could not fetch projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchProjects();
  }, []);

  const handleDeleteClick = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project? This is permanent.')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/projects/${projectId}`, // Use project endpoint
        { headers: { token: token } }
      );
      toast.success('Project deleted successfully!');
      fetchProjects(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed.');
    }
  };

  if (loading) return <PageLoader />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-24 md:pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-4 rounded-2xl shadow-xl">
                <LayoutGrid className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                  All Projects
                </h1>
                <p className="text-gray-500 font-semibold mt-1">
                  {projects.length} projects found
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-12 h-12 text-orange-600" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Projects Found</h3>
                <p className="text-gray-500 font-medium">Go to the 'Upload' page to create your first project!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map(project => (
                <ProjectCard 
                  key={project._id} 
                  project={project}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;