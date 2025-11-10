import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, AlertTriangle } from 'lucide-react';
import { PageLoader } from '../components/Loader';
import ProjectCard from '../components/ProjectCard'; // Re-use your project card
import Footer from '../components/Footer';

// Define the technologies you want to filter by
const allTechnologies = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 
  'Firebase', 'TailwindCSS', 'Java', 'Python', 'Redux'
];

const SelectTech = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false); // Only load when filtering
  const [selectedTechs, setSelectedTechs] = useState([]);
  const server = import.meta.env.VITE_SERVER;

  // This effect runs whenever the 'selectedTechs' array changes
  useEffect(() => {
    const fetchFilteredProjects = async () => {
      // If no techs are selected, don't show any projects
      if (selectedTechs.length === 0) {
        setProjects([]);
        return;
      }

      setLoading(true);
      try {
        // Creates a query string like "HTML,React,Node.js"
        const techQueryString = selectedTechs.join(',');
        
        const { data } = await axios.get(
          `${server}/api/projects/filter?techs=${techQueryString}`
        );
        setProjects(data.projects);

        if (data.projects.length === 0) {
            toast.error("No projects found with that combination.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch filtered projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProjects();
  }, [selectedTechs, server]); // Dependency: re-run when filters change

  // Handler for checking/unchecking a box
  const handleTechChange = (tech) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech) // Uncheck: remove from array
        : [...prev, tech] // Check: add to array
    );
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 pb-20 md:pt-24 md:pb-0 bg-gray-900 text-white">
      <main className="flex-grow max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        {/* Filter Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 md:p-10 mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <SlidersHorizontal className="w-7 h-7 text-blue-400" />
            Project Filter
          </h1>
          <p className="text-gray-300 mb-6">
            Select technologies to find projects that include *all* of them.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {allTechnologies.map((tech) => (
              <label key={tech} className="flex items-center gap-2 cursor-pointer text-lg">
                <input
                  type="checkbox"
                  checked={selectedTechs.includes(tech)}
                  onChange={() => handleTechChange(tech)}
                  className="h-5 w-5 rounded text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                />
                <span className="font-medium text-white">{tech}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Results</h2>
          {loading ? (
            <PageLoader />
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-20 bg-gray-800 rounded-lg">
              <AlertTriangle className="w-16 h-16 mx-auto text-gray-500 mb-4" />
              <h3 className="text-2xl font-bold text-white">No Results</h3>
              <p>
                {selectedTechs.length === 0
                  ? "Select one or more technologies above to get started."
                  : "No projects match your selected filters."}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SelectTech;