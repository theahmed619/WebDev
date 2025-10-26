// src/components/Navbar.jsx

import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // Import icons

const navLinks = [
  { title: "Home", href: "#home" },
  { title: "Experience", href: "#experience" },
  { title: "Skills", href: "#skills" },
  { title: "Projects", href: "#projects" },
  { title: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    <>
      {/* This is the main navbar pill */}
      <nav className="navbar-container">
        
        {/* Desktop Links (hidden on mobile) */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className={`nav-link ${
                active === link.title ? "active-link" : ""
              }`}
              onClick={() => setActive(link.title)}
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button (hidden on desktop) */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(true)} // <-- This now opens the modal
        >
          <HiMenu size={28} />
        </button>
      </nav>
      
      {/* --- Mobile Menu Modal --- */}
      {/* This modal appears in the middle of the screen */}
      {isOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)}>
          
          {/* This is the modal content box */}
          <div 
            className="mobile-menu-content" 
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
            {/* Modal Header */}
            <div className="mobile-menu-header">
              <h2 className="text-xl font-bold text-white">Navigation</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <HiX size={28} />
              </button>
            </div>

            {/* Modal Links */}
            <div className="mobile-menu-links">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="mobile-modal-link"
                  onClick={() => {
                    setActive(link.title);
                    setIsOpen(false); // Close menu on link click
                  }}
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* --- End Mobile Menu Modal --- */}
    </>
  );
};

export default Navbar;