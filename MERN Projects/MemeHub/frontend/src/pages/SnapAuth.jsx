import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiArrowLeft, HiLockClosed, HiCheck } from 'react-icons/hi';

// --- THIS IS YOUR SECRET CODE ---
const SECRET_CODE = "krish";

const SnapAuth = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a quick check
    setTimeout(() => {
      if (code === SECRET_CODE) {
        toast.success("Code correct! Unlocking...");
        // This is the most important part:
        // We pass a 'state' object to the new route to prove we're authorized
        navigate('/snap/view', { state: { authorized: true } });
      } else {
        toast.error("Wrong Code. Please try again.");
        setLoading(false);
        setCode('');
      }
    }, 1000);
  };

  return (
    <div className="pt-20 pb-20 md:pt-24 md:pb-8 p-4 max-w-md mx-auto min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-r from-gray-700 to-black p-4 rounded-full">
            <HiLockClosed size={64} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Enter Secret Code</h1>
          <p className="text-lg text-gray-600 mt-2 text-center">
            Enter the code to view this hidden snap.
          </p>

          <form onSubmit={handleSubmit} className="w-full mt-8 space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Secret Code
              </label>
              <input
                type="password"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 block w-full text-center text-2xl font-bold tracking-widest p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="******"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-purple-600 text-white py-4 px-6 rounded-xl hover:bg-purple-700 transition-colors duration-300 font-bold shadow-lg disabled:opacity-50"
            >
              <HiCheck className="w-6 h-6" />
              {loading ? "Checking..." : "Unlock"}
            </button>

            <Link 
              to="/" // Go back home
              className="w-full flex items-center justify-center gap-2 text-gray-600 py-3"
            >
              <HiArrowLeft />
              Cancel and go back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SnapAuth;