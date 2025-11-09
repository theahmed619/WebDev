import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ProjectCard from '../components/ProjectCard';
import { PageLoader } from '../components/Loader';
import Category from '../components/Category'; // Import the category bar
import { LayoutGrid, Loader2 } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 initially
  const server = import.meta.env.VITE_SERVER;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // This route is public, no token needed
        const { data } = await axios.get(`${server}/api/projects/all`);
        setProjects(data.projects);
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [server]);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 3); // Load 3 more
  };

  const hasMoreProjects = visibleCount < projects.length;

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-20 md:pt-24 md:pb-0">
      {/* 1. Add the Category component bar */}
      <Category />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* 2. Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <LayoutGrid className="w-7 h-7 mr-3 text-blue-400" />
            All Projects
          </h1>
          <span className="text-gray-400">{projects.length} projects found</span>
        </div>

        {/* 3. Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <h2 className="text-2xl font-semibold mb-4">No Projects Yet</h2>
            <p>Admin hasn't added any projects. Please check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, visibleCount).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        {/* 4. "Load More" Button */}
        {hasMoreProjects && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;