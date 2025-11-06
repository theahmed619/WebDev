import React from "react";
// import Navbar from '../components/Navbar' // 1. Removed Navbar, App.jsx handles it
import Slidebar from "../components/Sidebar"; // 2. Import Slidebar
import Category from "../components/Category"; // 3. Import Category

import Event from "../components/Event";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Surprise from "../components/SurpriseCard";
import SnapCard from "../components/SnapCard";
import Ai from "../components/Ai";

const Home = () => {
  return (
    // 4. Add padding for the top and bottom navbars
    <div className="pt-20 pb-20 md:pt-24 md:pb-0">
      {/* <Navbar/> */} {/* 5. Navbar is no longer needed here */}
      <Slidebar />
      {/* <Hero/> */}
      <Category />
      <Event />
    
      <Surprise />
      <Ai/>
 

        {/* <SnapCard/> */}
      
      {/* You can add your main blog post list here */}
      {/* <div className="p-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Posts</h2> */}
      {/* Placeholder for blog posts */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md h-40">Post 1</div>
          <div className="bg-white p-4 rounded-lg shadow-md h-40">Post 2</div>
          <div className="bg-white p-4 rounded-lg shadow-md h-40">Post 3</div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default Home;
