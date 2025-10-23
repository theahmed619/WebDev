import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900/90 backdrop-blur-lg text-gray-300 py-10">
      <div className="max-w-screen-2xl container mx-auto px-6 md:px-14 text-center">
        {/* Social Icons */}
        <div className="flex justify-center space-x-8 mb-6">
          <a
            href="https://x.com/theahmedshaikh"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-gray-400 transition-all transform hover:scale-110 duration-300"
          >
            <FaTwitter size={30} className="group-hover:text-blue-400" />
          </a>
          <a
            href="https://github.com/theahmed619"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-gray-400 transition-all transform hover:scale-110 duration-300"
          >
            <FaGithub size={30} className="group-hover:text-gray-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed619/"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-gray-400 transition-all transform hover:scale-110 duration-300"
          >
            <FaLinkedin size={30} className="group-hover:text-blue-600" />
          </a>
        </div>

        {/* Footer Text */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Ahmed Shaikh
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            Thanks for visiting! 🚀 Made with 💙 by Ahmed
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
