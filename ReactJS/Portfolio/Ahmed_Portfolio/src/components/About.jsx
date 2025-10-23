import React from "react";
import { FaGraduationCap, FaCode, FaDatabase, FaTools } from "react-icons/fa";

const About = () => {
  return (
    <section
      id="About"
      className="max-w-screen-2xl container mx-auto px-6 md:px-20 my-20 py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-400 mb-8">About Me</h1>
        <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Hello, I'm <span className="text-blue-400 font-medium">Ahmed</span>, a
          passionate **Java Developer** specializing in{" "}
          <span className="text-blue-400">Spring Boot</span>,{" "}
          <span className="text-blue-400">RESTful APIs</span>, and backend
          development. I enjoy **building scalable applications**, writing{" "}
          <span className="text-blue-400">clean code</span>, and solving
          real-world problems. I thrive in collaborative environments and love
          working on **impactful projects**.
        </p>
      </div>

      {/* Education Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-green-500 mb-3">
          <FaGraduationCap className="inline-block mr-2" /> Education
        </h2>
        <hr className="border-gray-700 mb-4" />

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 className="text-xl font-medium text-white">
              BSc in Information Technology
            </h3>
            <p className="text-gray-400">SPDT College, Mumbai University</p>
          </div>
          <div className="text-right">
            <h3 className="text-xl font-medium text-white">2022 - 2025</h3>
            <p className="text-gray-400">CGPA: 9.3 / 10</p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-green-500 mb-3">
          <FaCode className="inline-block mr-2" /> Technical Skills
        </h2>
        <hr className="border-gray-700 mb-4" />

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <li className="flex items-center space-x-2">
            <FaCode className="text-blue-400" />
            <span>
              <span className="font-medium text-blue-400">Front-end:</span>{" "}
              HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React.js
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <FaCode className="text-blue-400" />
            <span>
              <span className="font-medium text-blue-400">Back-end:</span> Java,
              Spring Boot, Hibernate
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <FaDatabase className="text-blue-400" />
            <span>
              <span className="font-medium text-blue-400">Database:</span> MySQL
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <FaTools className="text-blue-400" />
            <span>
              <span className="font-medium text-blue-400">Tools:</span> Git,
              GitHub, Postman
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
