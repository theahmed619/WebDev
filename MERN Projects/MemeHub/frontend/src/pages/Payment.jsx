import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../context/UserContext.jsx'; 
import { HiCreditCard, HiArrowLeft } from 'react-icons/hi';
import { LoadingBig } from '../components/Loading.jsx'; // Assuming you have this

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

// Manually define event data here (same as your Event.jsx)
const eventData = {
  1: { title: "Happy Diwali", amount: 1 },
  2: { title: "Raksha Bandhan", amount: 1 },
  3: { title: "Eid Mubarak", amount: 1 },
  4: { title: "Merry Christmas", amount: 1 },
};

const Payment = () => {
  const { id } = useParams(); // This is the event ID (e.g., '3' for Eid)
  const navigate = useNavigate();
  const { user } = UserData(); // Get the logged-in user's data

  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null); 
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  useEffect(() => {
    const currentEvent = eventData[id];
    if (currentEvent) {
      setEvent(currentEvent);
    } else {
      toast.error("Event not found.");
      navigate('/'); // Go home if event is invalid
    }
    
    // Load the Razorpay script when component mounts
    loadScript("https://checkout.razorpay.com/v1/checkout.js")
      .then(setIsSdkLoaded);
  }, [id, navigate]);

  // Main payment handling function
  const handlePayment = async () => {
    if (!isSdkLoaded) {
      toast.error("Payment SDK is still loading, please wait.");
      return;
    }
    
    setLoading(true);
    toast.loading("Initializing payment...");

    try {
      // 1. Create Order
      const token = localStorage.getItem('token');
      const { data: orderData } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/payment/create-order`,
        { amount: event.amount }, // Sending amount, though backend hardcodes 100 paisa
        { headers: { token: token } }
      );

      if (!orderData || !orderData.order) {
        toast.dismiss();
        toast.error("Could not create payment order.");
        setLoading(false);
        return;
      }
      
      const { order } = orderData;

      // 2. Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use test key from .env
        amount: order.amount,
        currency: order.currency,
        name: "MemeHub Events",
        description: `Payment for ${event.title}`,
        order_id: order.id,
        // This 'handler' function runs after payment is successful
        handler: async (response) => {
          try {
            toast.loading("Verifying payment...");
            
            // 3. Verify Payment
            const { data: verifyData } = await axios.post(
              `${import.meta.env.VITE_SERVER}/api/payment/verify`,
              response, // Send the full response from Razorpay
              { headers: { token: token } }
            );

            toast.dismiss();
            toast.success(verifyData.message);

            // 4. Redirect to the event detail page
            navigate(`/event/${id}`);

          } catch (error) {
            toast.dismiss();
            toast.error(error.response?.data?.message || "Payment verification failed.");
            setLoading(false);
          }
        },
        prefill: {
          email: user.email, // Prefill user's email
        },
        theme: {
          color: "#4A90E2", // Blue color
        },
      };

      // 5. Open the Razorpay Modal
      toast.dismiss();
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
      paymentObject.on('payment.failed', (response) => {
        toast.error("Payment Failed");
        console.log(response.error);
        setLoading(false);
      });

    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "An error occurred.");
      setLoading(false);
    }
  };

  if (!event) return <LoadingBig/>;

  return (
    <div className="pt-20 pb-20 md:pt-24 md:pb-8 p-4 max-w-lg mx-auto min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Checkout</h1>
        <p className="text-lg text-gray-600 text-center mb-6">You're about to unlock:</p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-blue-600">{event.title}</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">₹1.00</p>
          <p className="text-sm text-gray-500">(Test Payment)</p>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || !isSdkLoaded}
          className="w-full flex items-center justify-center gap-3 bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-colors duration-300 font-bold shadow-lg disabled:opacity-50"
        >
          <HiCreditCard className="w-6 h-6" />
          {loading ? "Loading..." : (isSdkLoaded ? "Pay with Razorpay" : "Loading Gateway...")}
        </button>

        <button 
          onClick={() => navigate('/')} // Go back home
          className="w-full flex items-center justify-center gap-2 text-gray-600 py-3 mt-4"
        >
          <HiArrowLeft />
          Cancel and go back
        </button>
      </div>
    </div>
  );
};

export default Payment;

