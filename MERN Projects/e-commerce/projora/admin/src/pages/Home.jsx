import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Plus, Sparkles } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      
      {/* Main content with proper padding */}
      <main className="pt-24 pb-24 md:pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 font-semibold mt-1">
              Welcome to the Projora v4 content manager.
            </p>
          </div>

          {/* Grid for Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Manage All Projects */}
            <div
              onClick={() => navigate('/projects')}
              className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-8 cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] group overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-70 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 inline-block rounded-2xl shadow-lg mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <LayoutGrid className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-black text-gray-800 mb-2">
                  Manage Projects
                </h2>
                <p className="text-gray-500 font-semibold mb-6">
                  View, edit, or delete all your uploaded projects.
                </p>
                <span className="font-bold text-blue-600 group-hover:gap-2 transition-all flex items-center gap-1">
                  View All Projects <span>&rarr;</span>
                </span>
              </div>
            </div>

            {/* Card 2: Upload New Project */}
            <div
              onClick={() => navigate('/upload')}
              className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-8 cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] group overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-3xl opacity-70 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 inline-block rounded-2xl shadow-lg mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <Plus className="w-8 h-8 text-white" strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-black text-gray-800 mb-2">
                  Upload New
                </h2>
                <p className="text-gray-500 font-semibold mb-6">
                  Add a new project to your Projora store.
                </p>
                <span className="font-bold text-green-600 group-hover:gap-2 transition-all flex items-center gap-1">
                  Go to Upload Page <span>&rarr;</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;