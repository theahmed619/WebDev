import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { toast } from "react-hot-toast";
import { UserData } from '../context/UserContext';
import Logo from "/shopping-bag.png"; 
import google from '../assets/google.png';

function Login() {
    let [show, setShow] = useState(false);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    
    let navigate = useNavigate();
    const { loginWithEmail, loginWithGoogle, btnLoading } = UserData();

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginWithEmail(email, password, navigate);
    }

    const googleLoginHandler = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const googleUser = {
                name: response.user.displayName,
                email: response.user.email,
                googleId: response.user.uid,
            };
            await loginWithGoogle(googleUser, navigate);
        } catch (error) {
            console.log(error);
            toast.error("Google Login Failed");
        }
    }
        
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700'></div>
      </div>

      {/* Logo Header */}
      <div className='absolute top-8 left-8 flex items-center gap-3 cursor-pointer z-10 group' onClick={() => navigate("/")}>
        <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform'>
          <img className='w-7' src={Logo} alt="Projora Logo" />
        </div>
        <h1 className='text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>Projora</h1>
      </div>

      {/* Main Card */}
      <div className='w-full max-w-md relative z-10'>
        <div className='bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6'>
          {/* Header */}
          <div className='text-center space-y-2'>
            <h2 className='text-3xl font-bold text-white'>Welcome Back</h2>
            <p className='text-gray-300 text-sm'>Sign in to continue to Projora</p>
          </div>

          <form onSubmit={handleLogin} className='space-y-5'>
            {/* Google Login Button */}
            <button 
              type="button" 
              className='w-full h-12 bg-white hover:bg-gray-50 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group' 
              onClick={googleLoginHandler}
              disabled={btnLoading}
            >
              <img src={google} alt="" className='w-5 h-5 group-hover:scale-110 transition-transform'/> 
              <span className='text-gray-800 font-semibold'>Continue with Google</span>
            </button>
            
            {/* Divider */}
            <div className='flex items-center gap-4 py-2'>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
              <span className='text-gray-400 text-sm font-medium'>OR</span>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
            </div>
            
            {/* Email Input */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-200 ml-1'>Email Address</label>
              <input 
                type="email" 
                className='w-full h-12 bg-white/5 border-2 border-white/10 rounded-xl px-4 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-white/10 transition-all duration-300 outline-none' 
                placeholder='Enter your email' 
                required  
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
              />
            </div>

            {/* Password Input */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-200 ml-1'>Password</label>
              <div className="relative">
                <input 
                  type={show ? "text" : "password"} 
                  className='w-full h-12 bg-white/5 border-2 border-white/10 rounded-xl px-4 pr-12 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-white/10 transition-all duration-300 outline-none' 
                  placeholder='Enter your password' 
                  required 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                />
                <button 
                  type="button"
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                  onClick={() => setShow(prev => !prev)}
                >
                  {show ? <IoEye className='w-5 h-5'/> : <IoEyeOutline className='w-5 h-5'/>}
                </button>
              </div>
            </div>
            
            {/* Login Button */}
            <button 
              type="submit"
              className='w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6'
              disabled={btnLoading}
            >
              {btnLoading ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  <span>Signing in...</span>
                </div>
              ) : "Sign In"}
            </button>

            {/* Sign Up Link */}
            <p className='text-center text-gray-300 text-sm pt-4'>
              Don't have an account?{" "}
              <span 
                className='text-purple-400 font-semibold cursor-pointer hover:text-purple-300 transition-colors' 
                onClick={() => navigate("/signup")}
              >
                Create one
              </span>
            </p>
          </form>
        </div>

        {/* Decorative bottom text */}
        <p className='text-center text-gray-400 text-xs mt-6'>
          By continuing, you agree to Projora's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default Login;