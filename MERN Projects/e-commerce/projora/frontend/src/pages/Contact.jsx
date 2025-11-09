import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import Footer from '../components/Footer';

// Helper component for the contact buttons
const ContactButton = ({ icon, title, value, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-700 p-6 rounded-lg flex items-center gap-5 transition-colors duration-300 hover:bg-gray-600 group"
    >
      <div className="flex-shrink-0 bg-gray-800 p-3 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-blue-400 group-hover:underline">{value}</p>
      </div>
    </a>
  );
};

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-20 md:pt-24 md:pb-0 bg-gray-900 text-white">
      <main className="flex-grow max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-300 mb-10">
            Have a question, a project idea, or just want to say hi? Feel free to reach out.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactButton
              icon={<Mail className="w-7 h-7 text-blue-400" />}
              title="Email"
              value="hello@devmynt.in"
              href="mailto:hello@devmynt.in"
            />
            <ContactButton
              icon={<Linkedin className="w-7 h-7 text-blue-400" />}
              title="LinkedIn"
              value="View Profile"
              href="https://www.linkedin.com/company/devmynt/"
            />
            <ContactButton
              icon={<Twitter className="w-7 h-7 text-blue-400" />}
              title="Twitter"
              value="@devmynt"
              href="https://x.com/DevMynt"
            />
            <ContactButton
              icon={<Instagram className="w-7 h-7 text-blue-400" />}
              title="Instagram"
              value="@devmynt"
              href="https://www.instagram.com/devmynt/"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;