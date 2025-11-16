import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../../public/shopping-bag.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Mail, href: "mailto:hello@devmynt.in", label: "Email", color: "hover:text-red-400" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/devmynt/", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Twitter, href: "https://x.com/DevMynt", label: "Twitter", color: "hover:text-sky-400" },
    { icon: Instagram, href: "https://www.instagram.com/devmynt/", label: "Instagram", color: "hover:text-pink-400" },
  ];

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
  ];

  const legalLinks = [
    { to: "/legal#privacy-policy", label: "Privacy" },
    { to: "/legal#terms-of-service", label: "Terms" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-gray-400 border-t border-gray-800/50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-8">
          
          {/* Logo and Description - Takes more space */}
          <motion.div 
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-flex items-center gap-3 group mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg group-hover:bg-blue-500/30 transition-all"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <img src={Logo} alt="Projora Logo" className="w-6 h-6" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Projora
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Your premium marketplace for high-quality, ready-to-deploy projects. Built with modern technologies.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-2.5 bg-gray-800/50 rounded-lg border border-gray-700/50 ${social.color} transition-all duration-300`}
                  title={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <social.icon size={18} />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity"></div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              Legal & Contact
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Divider */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom Bar */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="flex items-center gap-2">
            © {currentYear} Projora. All rights reserved.
          </p>
          
          <p className="flex items-center gap-2">
            Crafted with <Heart className="w-3 h-3 text-red-400 fill-current animate-pulse" /> by 
            <a 
              href="https://devmynt.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              DevMynt
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;