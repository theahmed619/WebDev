import React, { useState } from 'react';
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle } from 'lucide-react';

const Verify = () => {
  const [otp, setOtp] = useState("");

  const { verifyUser } = UserData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex justify-center items-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-lg mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Verify Your Account
          </h1>
          <p className="text-gray-600">Enter the OTP sent to your email</p>
        </div>

        {/* Verify Form Card */}
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Check Your Email</h2>
          <p className="text-gray-600 text-center mb-6">
            We've sent a verification code to your email address
          </p>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Enter OTP Code
            </label>
            <div className="relative">
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-center text-2xl font-bold tracking-widest"
                placeholder="000000"
                maxLength="6"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Please enter the 6-digit code
            </p>
          </div>

          <button 
            onClick={submitHandler}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium py-3 px-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Verify Account
          </button>

          <div className="mt-6 text-center">
            <button className="text-sm text-green-600 hover:text-green-700 font-medium">
              Didn't receive code? Resend
            </button>
          </div>
        </div>

    
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* Remove number input arrows */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default Verify;