import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { MdMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navItems = ["Home", "About", "Projects", "Contact"];

  // Handle scroll event for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar Container */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg transition-all duration-300 ${
          scrolled ? "bg-gray-900/90 shadow-lg py-3" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 md:px-12 ">
          {/* Logo */}
          <h1 className="text-white text-2xl font-bold cursor-pointer">
            Ahmed Shaikh
          </h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  to={item}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  spy={true}
                  activeClass="text-green-400 border-b-2 border-green-400 pb-1"
                  onSetActive={() => setActiveLink(item)}
                  className={`cursor-pointer text-white font-medium transition-all duration-300 ${
                    activeLink === item
                      ? "text-green-400 border-b-2 border-green-400 pb-1"
                      : "hover:text-green-300"
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all"
          >
            {menuOpen ? <RxCross2 size={26} /> : <MdMenu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center transform transition-transform duration-500 ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="space-y-8">
          {navItems.map((item) => (
            <li key={item}>
              <Link
                to={item}
                smooth={true}
                duration={500}
                offset={-70}
                spy={true}
                onClick={() => {
                  setActiveLink(item);
                  setMenuOpen(false);
                }}
                className="text-white text-3xl font-bold cursor-pointer hover:text-green-400 transition-all"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Spacer to prevent content from hiding behind navbar */}
      <div className="h-12 "></div>
    </>
  );
};

export default Navbar;
