import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 ">
      <div className="container mx-auto max-w-6xl p-3 md:p-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Site Name */}
          <div className="mb-3 md:mb-0 text-center md:text-left">
            <Link to="/" className="text-3xl font-bold text-white">
              Meme<span className="text-blue-500">Hub</span>
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              Your daily dose of Memes.
            </p>
          </div>

          {/* Quick Links */}
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;