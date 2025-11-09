import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Search as SearchIcon, AlertTriangle } from 'lucide-react';
import ProjectCard from '../components/ProjectCard'; // Use your existing ProjectCard
import Navbar from '../components/Navbar';
import { PageLoader } from '../components/Loader';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get search query from URL (for laptop navbar)
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || "";
  const [searchTerm, setSearchTerm] = useState(query);


  // 1. Fetch all projects once when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return toast.error("Please log in to search.");
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/projects/all`,
          { headers: { token: token } } // Use admin token
        );
        
        setAllProjects(data.projects.reverse()); // Store all projects
      } catch (error) {
        console.error(error);
        toast.error("Could not fetch projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []); // Empty array means this runs only once

  // 2. Filter projects whenever the searchTerm or allProjects change
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

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pt-24 pb-24 md:pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Search Input Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-6">Search Projects</h1>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <SearchIcon className="text-gray-400 w-6 h-6" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or category..."
                className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Results Section */}
          <div>
            {searchTerm ? (
              filteredProjects.length > 0 ? (
                <>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Search Results ({filteredProjects.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project._id} project={project} onDeleteClick={() => {}} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 mt-16">
                  <AlertTriangle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800">No Projects Found</h3>
                  <p>No projects found matching your search for "{searchTerm}".</p>
                </div>
              )
            ) : (
              <div className="text-center text-gray-500 mt-16">
                <SearchIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">Search Your Projects</h3>
                <p>Start typing above to find any project by its title or category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;