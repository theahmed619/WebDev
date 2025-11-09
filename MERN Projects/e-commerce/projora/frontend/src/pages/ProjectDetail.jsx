import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PageLoader, ButtonSpinner } from '../components/Loader';
import { UserData } from '../context/UserContext'; // To check purchase status
import { ArrowLeft, Eye, ShoppingCart, Download, IndianRupee, Code, CheckCircle } from 'lucide-react';

// Helper to load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ProjectDetail = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buyLoading, setBuyLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuth, getCurrentUser } = UserData(); // Get user data
  const server = import.meta.env.VITE_SERVER;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/api/projects/${id}`);
        setProject(data.project);
        // Set initial media: video if available, else first image
        if (data.project.demoVideo?.url) {
          setSelectedMedia({ type: 'video', url: data.project.demoVideo.url });
        } else if (data.project.images?.[0]?.url) {
          setSelectedMedia({ type: 'image', url: data.project.images[0].url });
        }
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch project details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, server]);

  const handleBuyProject = async () => {
    if (!isAuth) {
      toast.error("Please log in to purchase a project.");
      return navigate("/login");
    }
    setBuyLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Could not load payment gateway. Please try again.");
      setBuyLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // 1. Create Order
      const { data: orderData } = await axios.post(
        `${server}/api/payment/create-order`,
        { projectId: project._id, amount: project.price },
        { headers: { token } }
      );

      // 2. Configure Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Projora",
        description: `Purchase: ${project.title}`,
        order_id: orderData.order.id,
        handler: async (response) => {
          // 3. Verify Payment
          try {
            await axios.post(
              `${server}/api/payment/verify`,
              response,
              { headers: { token } }
            );
            
            toast.success("Payment successful! Your project is processing.");
            // The webhook will handle adding the project.
            // We'll refresh the user data to check for the purchase.
            setTimeout(() => {
              getCurrentUser(); // Refresh user data from context
            }, 3000); // Give webhook time to process

          } catch (err) {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#2563EB", // Blue
        },
      };

      // 4. Open Razorpay Checkout
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error creating order.");
    } finally {
      setBuyLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${server}/api/projects/download/${project._id}`,
        { headers: { token } }
      );
      
      // Trigger download
      window.open(data.downloadUrl, '_blank');
      toast.success("Download starting...");

    } catch (error) {
       console.log(error);
       toast.error(error.response?.data?.message || "Could not get download link.");
    } finally {
      setDownloadLoading(false);
    }
  };


  if (loading) {
    return <PageLoader />;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-24 text-center">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <Link to="/projects" className="text-blue-400 hover:underline mt-4 inline-block">
          Back to all projects
        </Link>
      </div>
    );
  }

  // Check if user has purchased this project
  const hasPurchased = user?.purchasedProjects?.includes(project._id);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-20 md:pt-24 md:pb-0">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to all projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side: Media */}
          <div className="lg:col-span-3">
            {/* Main Media Display */}
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 mb-4 aspect-video">
              {selectedMedia?.type === 'video' ? (
                <video
                  src={selectedMedia.url}
                  controls
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={selectedMedia?.url}
                  alt="Project media"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://placehold.co/1280x720/0d1117/3b82f6?text=Media+Error'; }}
                />
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {project.demoVideo?.url && (
                <button
                  onClick={() => setSelectedMedia({ type: 'video', url: project.demoVideo.url })}
                  className={`rounded-lg overflow-hidden border-2 ${selectedMedia?.url === project.demoVideo.url ? 'border-blue-500' : 'border-gray-700 hover:border-blue-500'}`}
                >
                  <img src={project.images?.[0]?.url || 'https://placehold.co/100x75/0d1117/3b82f6?text=Video'} alt="Video thumbnail" className="aspect-video object-cover" />
                </button>
              )}
              {project.images.map((image) => (
                <button
                  key={image.public_id}
                  onClick={() => setSelectedMedia({ type: 'image', url: image.url })}
                  className={`rounded-lg overflow-hidden border-2 ${selectedMedia?.url === image.url ? 'border-blue-500' : 'border-gray-700 hover:border-blue-500'}`}
                >
                  <img src={image.url} alt="Project thumbnail" className="aspect-video object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">{project.title}</h1>
            
            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center text-sm bg-gray-700 text-blue-300 px-3 py-1 rounded-full">
                <Code className="w-4 h-4 mr-1.5" />
                {project.category}
              </span>
              <span className="text-3xl font-bold text-blue-400 flex items-center">
                <IndianRupee className="w-6 h-6" />{project.price}
              </span>
            </div>

            <p className="text-gray-300 mb-8">{project.desc}</p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-700 text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <Eye className="w-5 h-5" />
                View Live Demo
              </a>

              {hasPurchased ? (
                <button
                  onClick={handleDownload}
                  disabled={downloadLoading}
                  className="w-full bg-green-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 text-lg disabled:opacity-70"
                >
                  {downloadLoading ? <ButtonSpinner /> : <Download className="w-5 h-5" />}
                  Download Project
                </button>
              ) : (
                <button
                  onClick={handleBuyProject}
                  disabled={buyLoading}
                  className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-lg disabled:opacity-70"
                >
                  {buyLoading ? <ButtonSpinner /> : <ShoppingCart className="w-5 h-5" />}
                  Buy Now
                </button>
              )}
              {hasPurchased && (
                 <p className="text-green-400 text-sm flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> You own this project.
                 </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;