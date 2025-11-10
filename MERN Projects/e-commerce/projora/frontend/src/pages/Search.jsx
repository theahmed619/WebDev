import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Search as SearchIcon, AlertTriangle } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer.jsx';
import { PageLoader } from '../components/Loader';
import TechFilter from '../components/TechFilter';

const Search = () => {
  const [allProjects, setAllProjects] = useState([]); // All projects from API
  const [filteredProjects, setFilteredProjects] = useState([]); // Projects to display
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechs, setSelectedTechs] = useState([]);

  const server = import.meta.env.VITE_SERVER;

  // 1. Fetch all projects just once on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${server}/api/projects/all`
        );
        setAllProjects(data.projects);
        // --- THIS IS THE FIX ---
        // We no longer set filteredProjects here
        // setFilteredProjects(data.projects); 
        // --- END OF FIX ---
      } catch (error) {
        console.error(error);
        toast.error("Could not fetch projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [server]); // Empty array = runs once

  // 2. This effect runs every time the user types or clicks a checkbox
  useEffect(() => {
    // --- THIS IS THE FIX ---
    // If no filters are active, show an empty list
    if (searchTerm === "" && selectedTechs.length === 0) {
      setFilteredProjects([]);
      return;
    }
    // --- END OF FIX ---

    let results = [...allProjects];

    // First, filter by search term (if any)
    if (searchTerm) {
      results = results.filter(
        (project) =>
          (project.title && 
            project.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (project.category && 
            project.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Second, filter by selected technologies (if any)
    if (selectedTechs.length > 0) {
      results = results.filter((project) =>
        selectedTechs.every(tech => 
          project.technologies && project.technologies.includes(tech)
        )
      );
    }
    
    setFilteredProjects(results);

  }, [searchTerm, selectedTechs, allProjects]);

  // 3. Handler for the TechFilter component
  const handleTechChange = (tech) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech) // Uncheck: remove
        : [...prev, tech] // Check: add
    );
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white pt-20 pb-20 md:pt-24 md:pb-0">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto p-4">
          
          {/* Search Input Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Search Projects</h1>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <SearchIcon className="text-gray-400 w-6 h-6" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or category..."
                className="w-full p-3 pl-12 text-lg bg-gray-800 border border-gray-700 rounded-full shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* TechFilter component */}
          <TechFilter 
            selectedTechs={selectedTechs} 
            onTechChange={handleTechChange} 
          />

          {/* Results Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Results ({filteredProjects.length})
            </h2>
            
            {/* --- THIS IS THE FIX --- */}
            {/* Show projects if they exist */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            
            /* Show "Start Search" message if no filters are active */
            ) : (searchTerm === "" && selectedTechs.length === 0) ? (
              <div className="text-center text-gray-400 py-20 bg-gray-800 rounded-lg">
                <SearchIcon className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                <h3 className="text-2xl font-bold text-white">Start Your Search</h3>
                <p>Type in the search bar or select technologies to find projects.</p>
              </div>

            /* Show "No Results" message if filters are active but found nothing */
            ) : (
              <div className="text-center text-gray-400 py-20 bg-gray-800 rounded-lg">
                <AlertTriangle className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                <h3 className="text-2xl font-bold text-white">No Projects Found</h3>
                <p>No projects match your current search and filter combination.</p>
              </div>
            )}
            {/* --- END OF FIX --- */}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;