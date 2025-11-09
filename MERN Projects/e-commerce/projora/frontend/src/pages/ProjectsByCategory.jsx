import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ProjectCard from '../components/ProjectCard'; // Use the new card
import { PageLoader } from '../components/Loader';
import Category from '../components/Category'; // Import the category bar
import { ArrowLeft } from 'lucide-react';

const ProjectsByCategory = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();
  const server = import.meta.env.VITE_SERVER;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Fetch all projects, then filter
        const { data } = await axios.get(`${server}/api/projects/all`);

        const filtered = data.projects.filter(
          (project) => 
            project.category && 
            project.category.trim().toLowerCase() === categoryName.trim().toLowerCase()
        );
        
        setProjects(filtered);

      } catch (error) {
        console.log(error);
        toast.error("Could not fetch projects for this category.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [categoryName, server]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-20 md:pt-24 md:pb-0">
      {/* 1. Add the Category component bar */}
      <Category />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* 2. Back Link */}
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to All Projects
        </Link>

        <h1 className="text-3xl font-bold text-white mb-6">
          Category: <span className="text-blue-400 capitalize">{categoryName}</span>
        </h1>

        {projects.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <h2 className="text-2xl font-semibold mb-4">No Projects Found</h2>
            <p>No projects have been added to the "{categoryName}" category yet.</p>
          </div>
        ) : (
          // 3. Use a responsive grid to show the cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsByCategory;