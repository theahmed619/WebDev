import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

// Define the technologies you want to filter by
const allTechnologies = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 
  'Firebase', 'TailwindCSS', 'Java', 'Python', 'Redux'
];

/**
 * A component for selecting technologies.
 * @param {string[]} selectedTechs - The currently selected techs.
 * @param {function} onTechChange - Function to call when a tech is toggled.
 */
const TechFilter = ({ selectedTechs, onTechChange }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-8 md:p-10 mb-8">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
        <SlidersHorizontal className="w-6 h-6 text-blue-400" />
        Filter by Technology
      </h2>
      <p className="text-gray-300 mb-6">
        Show projects that include *all* of the selected technologies.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-4">
        {allTechnologies.map((tech) => (
          <label key={tech} className="flex items-center gap-2 cursor-pointer text-lg">
            <input
              type="checkbox"
              checked={selectedTechs.includes(tech)}
              onChange={() => onTechChange(tech)}
              className="h-5 w-5 rounded text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
            />
            <span className="font-medium text-white">{tech}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TechFilter;