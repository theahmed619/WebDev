import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaJava,
  FaReact,
  FaTwitter,
} from "react-icons/fa6";
import { SiSpringboot } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { ReactTyped } from "react-typed";

const Home = () => {
  return (
    <section
      id="Home"
      className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 md:px-16 overflow-hidden mt-5"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgba(17, 24, 39, 0.95), rgba(0, 0, 0, 0.98))",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for enhanced contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/30 pointer-events-none "></div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-3xl mx-auto space-y-10">
        {/* Intro Text */}
        <div className="space-y-4 mt-5">
          <h2 className="text-xl md:text-2xl text-blue-400 font-medium">
            Hello, I'm
          </h2>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Ahmed Shaikh
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center text-2xl md:text-4xl font-bold">
            <span className="text-gray-300 mr-2">I'm a</span>
            <ReactTyped
              className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
              strings={["Java Developer", "Backend Developer"]}
              typeSpeed={70}
              backSpeed={50}
              loop
            />
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Software developer specializing in Java and Spring Boot, with a
          passion for building scalable applications and optimizing backend
          performance. Committed to writing clean, maintainable code and
          continuously improving my skills.
        </p>

        {/* Unique Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="img/Ahmed_Java_Developer1.pdf"
            download
            className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-300 text-center shadow-lg shadow-green-500/30"
          >
            📄 Download Resume
          </a>

          <a
            href="https://github.com/theahmed619?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-300 text-center shadow-lg shadow-purple-500/30"
          >
            🌟 Explore Open Source
          </a>
        </div>

        {/* Social Media & Skills Section */}
        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-700/30 mt-8 backdrop-blur-sm bg-black/10 p-6 rounded-lg max-w-3xl mx-auto mb-4">
          {/* Social Media Links */}
          <div className="text-white">
            <h3 className="font-bold text-lg mb-3 text-blue-400">
              Connect With Me
            </h3>
            <div className="flex gap-5 mt-2 justify-center md:justify-center">
              <a
                href="https://x.com/theahmedshaikh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <FaTwitter className="text-3xl" />
              </a>
              <a
                href="https://github.com/theahmed619"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaGithub className="text-3xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/ahmed619/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
              >
                <FaLinkedin className="text-3xl" />
              </a>
            </div>
          </div>

          {/* Skills */}
          <div className="text-white">
            <h3 className="font-bold text-lg mb-3 text-blue-400">
              Technical Expertise
            </h3>
            <div className="flex gap-5 mt-2 justify-center md:justify-center">
              <div className="flex flex-col items-center">
                <FaJava className="text-3xl text-orange-500" />
                <span className="text-xs mt-1 text-gray-400">Java</span>
              </div>
              <div className="flex flex-col items-center">
                <SiSpringboot className="text-3xl text-green-500" />
                <span className="text-xs mt-1 text-gray-400">Spring</span>
              </div>
              <div className="flex flex-col items-center">
                <FaReact className="text-3xl text-blue-400" />
                <span className="text-xs mt-1 text-gray-400">React</span>
              </div>
              <div className="flex flex-col items-center">
                <GrMysql className="text-3xl text-blue-600" />
                <span className="text-xs mt-1 text-gray-400">MySQL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
    </section>
  );
};

export default Home;
