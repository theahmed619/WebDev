import React, { useEffect } from 'react'
import PortfolioCard from '../components/PortfolioCard'
import HomeCard from '../components/HomeCard'
import AboutCard from '../components/AboutCard'
import SkillsSection from '../components/SkillsSection'
import ProjectSection from '../components/ProjectSection'
import ContactSection from '../components/ContactSection'
import Experience from "../components/Experience";
import Navbar from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";



const Home = () => {

    useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className='w-[80vw]  mx-auto'>
    <Navbar/>
      <PortfolioCard/>
      <HomeCard/>
   {/* <AboutCard/> */} {/* <-- REMOVE THIS */}
      <Experience /> {/* <-- ADD THIS */}
      <SkillsSection/>
      <ProjectSection/>
      <ContactSection/>
    </div>
  )
}

export default Home