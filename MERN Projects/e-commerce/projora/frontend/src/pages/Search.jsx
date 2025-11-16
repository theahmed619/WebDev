import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Search as SearchIcon, AlertTriangle, Sparkles, Filter, X, TrendingUp } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer.jsx';
import { PageLoader } from '../components/Loader';
import TechFilter from '../components/TechFilter';
import { motion, AnimatePresence } from 'framer-motion';

const Search = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const server = import.meta.env.VITE_SERVER;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/api/projects/all`);
        setAllProjects(data.projects);
      } catch (error) {
        console.error(error);
        toast.error("Could not fetch projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [server]);

  useEffect(() => {
    if (searchTerm === "" && selectedTechs.length === 0) {
      setFilteredProjects([]);
      return;
    }

    let results = [...allProjects];

    if (searchTerm) {
      results = results.filter(
        (project) =>
          (project.title && 
            project.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (project.category && 
            project.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTechs.length > 0) {
      results = results.filter((project) =>
        selectedTechs.every(tech => 
          project.technologies && project.technologies.includes(tech)
        )
      );
    }
    
    setFilteredProjects(results);

  }, [searchTerm, selectedTechs, allProjects]);

  const handleTechChange = (tech) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedTechs([]);
  };

  const hasActiveFilters = searchTerm !== "" || selectedTechs.length > 0;

  if (loading) {
    return <PageLoader />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pt-20 pb-20 md:pt-24 md:pb-0">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <main className="flex-grow relative z-10">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          
          {/* Hero Section */}
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">Discover Your Next Project</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Search Projects
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Find the perfect project by searching titles, categories, or filtering by technologies
            </p>
          </motion.div>

          {/* Search Bar Section */}
          <motion.div 
            className="mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 group-hover:opacity-30 blur-lg transition-opacity duration-500"></div>
              
              <div className="relative flex items-center bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full shadow-2xl overflow-hidden">
                <div className="flex items-center pl-5 pointer-events-none">
                  <SearchIcon className="text-gray-400 w-6 h-6" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title or category..."
                  className="flex-1 p-4 pl-4 text-lg bg-transparent border-none text-white placeholder-gray-500 focus:outline-none focus:ring-0"
                />
                
                {/* Clear button */}
                {searchTerm && (
                  <motion.button
                    onClick={clearSearch}
                    className="mr-2 p-2 hover:bg-gray-700 rounded-full transition-colors"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                )}

                {/* Filter toggle button (mobile) */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden mr-2 p-2 hover:bg-gray-700 rounded-full transition-colors relative"
                >
                  <Filter className="w-5 h-5 text-gray-400" />
                  {selectedTechs.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {selectedTechs.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Active filters summary */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mt-4 p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl"
              >
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span>
                    {searchTerm && <span className="text-white font-medium">"{searchTerm}"</span>}
                    {searchTerm && selectedTechs.length > 0 && <span> + </span>}
                    {selectedTechs.length > 0 && (
                      <span className="text-white font-medium">{selectedTechs.length} tech filter{selectedTechs.length > 1 ? 's' : ''}</span>
                    )}
                  </span>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Clear All
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Tech Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`mb-8 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <TechFilter 
              selectedTechs={selectedTechs} 
              onTechChange={handleTechChange} 
            />
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Results header */}
            <div className="flex items-center justify-between mb-6 p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Results</span>
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 text-lg font-bold">
                  {filteredProjects.length}
                </span>
              </h2>
              
              {filteredProjects.length > 0 && (
                <span className="text-sm text-gray-400">
                  Found in {allProjects.length} total projects
                </span>
              )}
            </div>
            
            <AnimatePresence mode="wait">
              {/* Show projects if they exist */}
              {filteredProjects.length > 0 ? (
                <motion.div 
                  key="results"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div key={project._id} variants={itemVariants}>
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>
              
              /* Show "Start Search" message if no filters are active */
              ) : (searchTerm === "" && selectedTechs.length === 0) ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative text-center py-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                  <div className="relative z-10">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-6"
                    >
                      <SearchIcon className="w-10 h-10 text-blue-400" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white mb-3">Start Your Search</h3>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                      Type in the search bar or select technologies to discover amazing projects
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                      <span className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-sm text-gray-300">
                        Try: "MERN"
                      </span>
                      <span className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-sm text-gray-300">
                        Try: "React"
                      </span>
                      <span className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-sm text-gray-300">
                        Try: "E-commerce"
                      </span>
                    </div>
                  </div>
                </motion.div>

              /* Show "No Results" message if filters are active but found nothing */
              ) : (
                <motion.div 
                  key="no-results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative text-center py-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5"></div>
                  <div className="relative z-10">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full mb-6"
                    >
                      <AlertTriangle className="w-10 h-10 text-red-400" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white mb-3">No Projects Found</h3>
                    <p className="text-gray-400 text-lg max-w-md mx-auto mb-6">
                      No projects match your current search and filter combination
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      <X className="w-5 h-5" />
                      Clear All Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;