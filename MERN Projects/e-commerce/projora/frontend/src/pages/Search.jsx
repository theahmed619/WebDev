import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Search as SearchIcon } from 'lucide-react'; // Use Lucide icon
import ProjectCard from '../components/ProjectCard'; // 1. Import ProjectCard
import Footer from '../components/Footer.jsx';
import { PageLoader } from '../components/Loader';

const Search = () => {
  // State for storing all projects
  const [allProjects, setAllProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // 2. Fetch from the public /api/projects/all endpoint (no token needed)
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/projects/all`
        );
        
        setAllProjects(data.projects.reverse()); // Store all projects, newest first
      } catch (error) {
        console.error(error);
        toast.error("Could not fetch projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []); // Empty array means this runs only once

  // 2. Filter projects whenever the searchTerm changes
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProjects([]); // If search is empty, show no results
    } else {
      const results = allProjects.filter(
        (project) =>
          (project.title && 
            project.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (project.category && 
            project.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProjects(results);
    }
  }, [searchTerm, allProjects]);

  // Show full loader only on initial data fetch
  if (loading) {
    return <PageLoader />;
  }

  return (
    // 3. Updated to dark mode and min-h-screen for footer
    <div className="flex flex-col min-h-screen bg-gray-900 text-white pt-20 pb-20 md:pt-24 md:pb-0">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto p-4">
          
          {/* Search Input Section */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <SearchIcon className="text-gray-400 w-6 h-6" />
              </div>
              {/* 4. Dark mode input */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or category..."
                className="w-full p-3 pl-12 text-lg bg-gray-800 border border-gray-700 rounded-full shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Results Section */}
          <div>
            {searchTerm ? (
              filteredProjects.length > 0 ? (
                <>
                  <h2 className="text-2xl font-semibold mb-4 text-white">
                    Search Results ({filteredProjects.length})
                  </h2>
                  {/* 5. Use ProjectCard in a grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-400 mt-10">
                  No projects found matching your search.
                </p>
              )
            ) : (
              <p className="text-center text-gray-400 mt-10">
                {/* 6. Updated text */}
                Start typing above to search for projects.
              </p>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;