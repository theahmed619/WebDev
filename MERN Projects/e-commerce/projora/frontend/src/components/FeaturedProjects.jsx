import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ProjectCard from './ProjectCard';
import { DotsLoader } from './Loader';
import { Link } from 'react-router-dom';
import { Rocket, Loader2 } from 'lucide-react';

const FeaturedProjects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const server = import.meta.env.VITE_SERVER;

  // --- 1. THIS IS THE FIX ---
  const [visibleCount, setVisibleCount] = useState(3); // Start by showing 3
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  // --- END FIX ---

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/api/projects/all`);
        setAllProjects(data.projects); // Get all projects
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch featured projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [server]);

  // --- 2. THIS IS THE FIX ---
  const loadMore = () => {
    setLoadMoreLoading(true);
    setTimeout(() => {
      setVisibleCount(prevCount => prevCount + 3); // Show 3 more
      setLoadMoreLoading(false);
    }, 500);
  };

  const hasMoreProjects = visibleCount < allProjects.length;
  // --- END FIX ---

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Rocket className="w-7 h-7 mr-3 text-blue-400" />
          Our Projects
        </h1>
        <Link 
          to="/projects"
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          View All &rarr;
        </Link>
      </div>

      {/* 3. Projects Grid */}
      {loading ? (
        <div className="h-64 flex justify-center items-center">
          <DotsLoader />
        </div>
      ) : allProjects.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <h2 className="text-2xl font-semibold">No Projects Yet</h2>
        </div>
      ) : (
        // 4. Grid now uses the new visibleCount
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.slice(0, visibleCount).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      {/* 5. "Load More" Button */}
      {hasMoreProjects && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            disabled={loadMoreLoading}
            className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto disabled:opacity-70"
          >
            {loadMoreLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Load More Projects'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedProjects;