import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../context/UserContext.jsx';
import { HiCreditCard, HiArrowLeft, HiGift } from 'react-icons/hi';

// Helper function to load Razorpay's script
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const SurprisePayment = () => {
  const navigate = useNavigate();
  const { user } = UserData(); // Get the logged-in user's data

  const [loading, setLoading] = useState(false);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  useEffect(() => {
    // Load the Razorpay script when component mounts
    loadScript("https://checkout.razorpay.com/v1/checkout.js")
      .then(setIsSdkLoaded);
  }, []);

  const handlePayment = async () => {
    if (!isSdkLoaded) {
      toast.error("Payment Gateway is loading, please wait.");
      return;
    }
    
    setLoading(true);
    toast.loading("Initializing payment...");

    try {
      // 1. Create Order (same backend route)
      const token = localStorage.getItem('token');
      const { data: orderData } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/payment/create-order`,
        { amount: 1 }, // We charge 1 Rupee (100 paisa)
        { headers: { token: token } }
      );

      const { order } = orderData;

      // 2. Configure Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use test key from .env
        amount: order.amount,
        currency: order.currency,
        name: "MemeHub Surprise",
        description: "Payment for a special surprise",
        order_id: order.id,
        handler: async (response) => {
          try {
            toast.loading("Verifying payment...");
            
            // 3. Verify Payment (same backend route)
            const { data: verifyData } = await axios.post(
              `${import.meta.env.VITE_SERVER}/api/payment/verify`,
              response,
              { headers: { token: token } }
            );

            toast.dismiss();
            toast.success(verifyData.message);

            // 4. Redirect to the SURPRISE page
            navigate(`/surprise`);

          } catch (error) {
            toast.dismiss();
            toast.error(error.response?.data?.message || "Payment verification failed.");
            setLoading(false);
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#8B5CF6", // Purple color
        },
      };

      // 5. Open Modal
      toast.dismiss();
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
      paymentObject.on('payment.failed', (response) => {
        toast.error("Payment Failed");
        setLoading(false);
      });

    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "An error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-20 md:pt-24 md:pb-8 p-4 max-w-lg mx-auto min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Unlock Surprise</h1>
        <p className="text-lg text-gray-600 text-center mb-6">A special gift is one step away!</p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200 text-center">
          <HiGift className="w-16 h-16 text-purple-500 mx-auto" />
          <h2 className="text-2xl font-semibold text-purple-600 mt-2">Special Surprise</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">₹1.00</p>
          <p className="text-sm text-gray-500">(Test Payment)</p>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || !isSdkLoaded}
          className="w-full flex items-center justify-center gap-3 bg-purple-600 text-white py-4 px-6 rounded-xl hover:bg-purple-700 transition-colors duration-300 font-bold shadow-lg disabled:opacity-50"
        >
          <HiCreditCard className="w-6 h-6" />
          {loading ? "Loading..." : (isSdkLoaded ? "Pay with Razorpay" : "Loading Gateway...")}
        </button>

        <Link 
          to="/" // Go back home
          className="w-full flex items-center justify-center gap-2 text-gray-600 py-3 mt-4"
        >
          <HiArrowLeft />
          Cancel and go back
        </Link>
      </div>
    </div>
  );
};

export default SurprisePayment;
