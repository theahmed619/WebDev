// src/components/Experience.jsx

import React from "react";

// You can update this data with your actual experience
const experiences = [
  {
    role: "MERN Stack Developer",
    company: "Freelance",
    duration: "2022 - Present",
    description:
      "Designed and developed full-stack web applications for various clients, utilizing MongoDB, Express.js, React, and Node.js.",
  },
  {
    role: "Junior Developer Intern",
    company: "Tech Solutions Inc.",
    duration: "2021 - 2022",
    description:
      "Assisted the senior development team in building and maintaining client websites. Focused on front-end tasks using React and Tailwind CSS.",
  },
  {
    role: "Web Developer Trainee",
    company: "Code Academy",
    duration: "2020 - 2021",
    description:
      "Completed an intensive training program focused on modern web development principles, including HTML, CSS, JavaScript, and React.",
  },
];

const Experience = () => {
  return (
    <div data-aos="fade-up" className="mb-20 lg:mb-36" id="experience">
      <h1 className="text-5xl lg:text-7xl gradient-text mb-16">My Experience</h1>

      <div className="timeline-container relative">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-content backdrop-blur-md shadow-xl p-6 border-2 rounded-lg border-gray-400">
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                {exp.role}
              </h3>
              <span className="text-lg lg:text-xl font-semibold text-yellow-500 my-2 block">
                {exp.company} | {exp.duration}
              </span>
              <p className="text-gray-300 text-lg lg:text-xl">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;