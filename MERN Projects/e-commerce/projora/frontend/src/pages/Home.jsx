import React from "react";
import Slidebar from "../components/Sidebar";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Ai from "../components/Ai";

// 1. Import the new FeaturedProjects component
import FeaturedProjects from "../components/FeaturedProjects";

const Home = () => {
  return (
    // 2. This main div provides the full-width background
    // The "gaps" you want are created by the `max-w-7xl mx-auto`
    // class inside each component (Slidebar, Category, FeaturedProjects)
    <div className="pt-20 pb-20 md:pt-24 md:pb-0 bg-gray-900">
      <Slidebar />
      <Category />
      
      {/* 3. Replaced the full Projects page with the new component */}
      <FeaturedProjects />
   
      <Ai />
      <Footer />
    </div>
  );
};

export default Home;