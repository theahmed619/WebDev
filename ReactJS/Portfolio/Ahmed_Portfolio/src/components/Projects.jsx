import React from "react";
import java from "../img/java.png";
import spring from "../img/spring.png";
import react from "../img/react.png";

const Projects = () => {
  const projects = [
    {
      id: 1,
      logo: java,
      name: "Java Projects",
      description:
        "Core Java applications showcasing problem-solving and OOP concepts.",
      link: "https://github.com/theahmed619/",
    },
    {
      id: 2,
      logo: spring,
      name: "Spring Boot Projects",
      description:
        "RESTful APIs, microservices, and backend development with Spring Boot.",
      link: "https://github.com/theahmed619/",
    },
    {
      id: 3,
      logo: react,
      name: "React.js Projects",
      description:
        "Interactive and responsive front-end applications using React.js.",
      link: "https://github.com/theahmed619/",
    },
  ];

  return (
    <section
      id="Projects"
      className="max-w-screen-2xl container mx-auto px-6 md:px-20 mt-16 mb-20 py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
    >
      <div>
        <h1 className="text-4xl font-bold text-green-400 text-center mb-12">
          My Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {projects.map(({ id, logo, name, description, link }) => (
            <div
              key={id}
              className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg p-8 transition-transform transform hover:scale-105 duration-300"
            >
              <div className="flex justify-center">
                <img
                  src={logo}
                  className="w-24 h-24 p-2 rounded-full border-2 border-green-400"
                  alt={name}
                />
              </div>

              <h2 className="text-2xl font-semibold text-white mt-4">{name}</h2>
              <p className="text-gray-300 mt-2">{description}</p>

              <div className="mt-6">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded-lg transition-all duration-300 shadow-lg"
                >
                  View Source Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
