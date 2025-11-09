import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import Logo from "../../public/shopping-bag.png"; // Import your logo

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-700">
      <div className="max-w-7xl mx-auto p-8 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* 1. Logo and Site Name */}
          <div className="mb-6 md:mb-0 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-3">
              <img src={Logo} alt="Projora Logo" className="w-9 h-9" />
              <span>Projora</span>
            </Link>
            <p className="text-sm max-w-xs">
              Your personal store for high-quality projects.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/projects" className="hover:text-blue-400 transition-colors">All Projects</Link></li>
              <li><Link to="/profile" className="hover:text-blue-400 transition-colors">My Profile</Link></li>
            </ul>
          </div>

          {/* 3. Legal/Other Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* 4. Social Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
            <div className="flex space-x-5">
              <a href="#" className="hover:text-blue-400 transition-colors" title="GitHub"><Github size={24} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors" title="LinkedIn"><Linkedin size={24} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors" title="Twitter"><Twitter size={24} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors" title="Instagram"><Instagram size={24} /></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Projora. All rights reserved. Created by DevMynt.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;