import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ProjectCard from './ProjectCard'; // Re-use your card
import { DotsLoader } from './Loader'; // Use your loader
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const server = import.meta.env.VITE_SERVER;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/api/projects/all`);
        // 1. Get all projects, but only show the 6 newest
        setProjects(data.projects.slice(0, 6)); 
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch featured projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [server]);

  return (
    // 2. This container centers the content
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Rocket className="w-7 h-7 mr-3 text-blue-400" />
          Featured Projects
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
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <h2 className="text-2xl font-semibold">No Projects Yet</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProjects;