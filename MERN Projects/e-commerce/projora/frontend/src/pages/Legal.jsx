import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

const Legal = () => {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-20 md:pt-24 md:pb-0 bg-gray-900 text-white">
      <main className="flex-grow max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        {/* Main Content Card */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
          
          {/* Privacy Policy Section */}
          <article id="privacy-policy" className="prose prose-invert lg:prose-lg max-w-none mb-16">
            <h1 className="text-white">Privacy Policy for Projora</h1>
            <p className="lead">Last updated: [Date]</p>
            
            <p>Welcome to Projora. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>

            <h2>1. Information We Collect</h2>
            <p>We may collect personal information from you in a variety of ways, including:</p>
            <ul>
              <li><strong>Personal Data:</strong> Name, email address, and authentication data (via Google Firebase or email/password) when you register for an account.</li>
              <li><strong>Purchase Data:</strong> A record of the projects you purchase. We do **not** collect or store your payment card details. All payments are processed securely by Razorpay.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Create and manage your account.</li>
              <li>Provide you with access to your purchased digital products (project files).</li>
              <li>Send you purchase confirmations and customer service emails.</li>
            </ul>

            <h2>3. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us at: [Your Email Address]</p>
          </article>

          {/* Divider */}
          <hr className="border-gray-700 my-16" />

          {/* Terms of Service Section */}
          <article id="terms-of-service" className="prose prose-invert lg:prose-lg max-w-none">
            <h1 className="text-white">Terms of Service for Projora</h1>
            <p className="lead">Last updated: [Date]</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using Projora ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.</p>

            <h2>2. Digital Products & Payments</h2>
            <p>Projora sells digital software projects ("Products") delivered as downloadable files. All payments are processed through Razorpay. By making a purchase, you agree to abide by Razorpay's terms of service.</p>

            <h2>3. Refund Policy</h2>
            <p><strong>All sales of digital Products are final.</strong> Due to the digital nature of our Products, we do not offer refunds or exchanges once a purchase is made. Please review the "View Live" demo before purchasing.</p>

            <h2>4. License</h2>
            <p>When you purchase a Product, you are granted a non-exclusive license to use the code for personal, educational, or client projects. You are **not** permitted to resell or redistribute the original code "as-is".</p>

            <h2>5. Contact Us</h2>
            <p>If you have questions about these Terms, please contact us at: [Your Email Address]</p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;