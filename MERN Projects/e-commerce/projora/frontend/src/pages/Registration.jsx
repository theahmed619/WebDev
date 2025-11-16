import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { toast } from "react-hot-toast";
import { UserData } from "../context/UserContext";
import Logo from "/shopping-bag.png";
import google from "../assets/google.png";
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Sparkles, Shield, CheckCircle } from 'lucide-react';

function Registration() {
  let [show, setShow] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [focusedField, setFocusedField] = useState(null);

  let navigate = useNavigate();
  const { registerWithEmail, loginWithGoogle, btnLoading } = UserData();

  const handleSignup = async (e) => {
    e.preventDefault();
    await registerWithEmail(name, email, password, navigate);
  };

  const googleSignup = async () => {
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
      toast.error("Google Sign Up Failed");
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 25, text: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 50, text: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 12) return { strength: 75, text: 'Good', color: 'bg-blue-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 pt-20 md:pt-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div 
          className='absolute top-1/4 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20'
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className='absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20'
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10'
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      {/* Main Card */}
      <motion.div 
        className='w-full max-w-md relative z-10'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Card glow effect */}
        <div className='absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl opacity-20 blur-2xl'></div>
        
        <div className='relative bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 space-y-6'>
          {/* Decorative elements */}
          <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full'></div>
          <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-tr-full'></div>

          {/* Header */}
          <motion.div 
            className='text-center space-y-3 relative z-10'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className='inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 mb-2'>
              <Sparkles className='w-4 h-4 text-purple-400' />
              <span className='text-xs text-purple-400 font-medium'>Join Our Community</span>
            </div>
            <h2 className='text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent'>
              Create Account
            </h2>
            <p className='text-gray-400 text-sm'>Get started with Projora in seconds</p>
          </motion.div>

          <motion.form 
            onSubmit={handleSignup} 
            className='space-y-5 relative z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Google Sign Up Button */}
            <motion.button
              type="button"
              className='w-full h-12 bg-white hover:bg-gray-50 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden'
              onClick={googleSignup}
              disabled={btnLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity'></div>
              <img src={google} alt="" className='w-5 h-5 group-hover:scale-110 transition-transform relative z-10'/>
              <span className='text-gray-800 font-semibold relative z-10'>Continue with Google</span>
            </motion.button>

            {/* Divider */}
            <div className='flex items-center gap-4 py-2'>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent'></div>
              <span className='text-gray-500 text-sm font-medium'>OR</span>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent'></div>
            </div>

            {/* Name Input */}
            <motion.div 
              className='space-y-2'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <label className='text-sm font-medium text-gray-300 ml-1 flex items-center gap-2'>
                <User className='w-4 h-4 text-purple-400' />
                Full Name
              </label>
              <div className='relative group'>
                <input
                  type="text"
                  className={`w-full h-12 bg-gray-800/50 border-2 ${focusedField === 'name' ? 'border-purple-500 bg-gray-800' : 'border-gray-700'} rounded-xl px-4 pl-11 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-gray-800 transition-all duration-300 outline-none`}
                  placeholder='Enter your full name'
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'name' ? 'text-purple-400' : 'text-gray-500'}`} />
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div 
              className='space-y-2'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <label className='text-sm font-medium text-gray-300 ml-1 flex items-center gap-2'>
                <Mail className='w-4 h-4 text-blue-400' />
                Email Address
              </label>
              <div className='relative group'>
                <input
                  type="email"
                  className={`w-full h-12 bg-gray-800/50 border-2 ${focusedField === 'email' ? 'border-blue-500 bg-gray-800' : 'border-gray-700'} rounded-xl px-4 pl-11 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-gray-800 transition-all duration-300 outline-none`}
                  placeholder='Enter your email'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'email' ? 'text-blue-400' : 'text-gray-500'}`} />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div 
              className='space-y-2'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <label className='text-sm font-medium text-gray-300 ml-1 flex items-center gap-2'>
                <Lock className='w-4 h-4 text-pink-400' />
                Password
              </label>
              <div className="relative group">
                <input
                  type={show ? "text" : "password"}
                  className={`w-full h-12 bg-gray-800/50 border-2 ${focusedField === 'password' ? 'border-pink-500 bg-gray-800' : 'border-gray-700'} rounded-xl px-4 pl-11 pr-12 text-white placeholder-gray-500 focus:border-pink-500 focus:bg-gray-800 transition-all duration-300 outline-none`}
                  placeholder='Min. 8 characters'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'password' ? 'text-pink-400' : 'text-gray-500'}`} />
                <motion.button
                  type="button"
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                  onClick={() => setShow((prev) => !prev)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {show ? <IoEye className='w-5 h-5'/> : <IoEyeOutline className='w-5 h-5'/>}
                </motion.button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className='space-y-1'
                >
                  <div className='flex items-center justify-between text-xs'>
                    <span className='text-gray-400'>Password Strength</span>
                    <span className={`font-medium ${
                      passwordStrength.strength === 100 ? 'text-green-400' :
                      passwordStrength.strength >= 75 ? 'text-blue-400' :
                      passwordStrength.strength >= 50 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className='h-1.5 bg-gray-700 rounded-full overflow-hidden'>
                    <motion.div
                      className={`h-full ${passwordStrength.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength.strength}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Features List */}
            <motion.div 
              className='bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 space-y-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className='flex items-center gap-2 text-sm text-gray-300'>
                <CheckCircle className='w-4 h-4 text-green-400 flex-shrink-0' />
                <span>Access to all premium projects</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-300'>
                <CheckCircle className='w-4 h-4 text-green-400 flex-shrink-0' />
                <span>Instant download & deployment</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-300'>
                <CheckCircle className='w-4 h-4 text-green-400 flex-shrink-0' />
                <span>Lifetime updates & support</span>
              </div>
            </motion.div>

            {/* Sign Up Button */}
            <motion.button
              type="submit"
              className='w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2 group relative overflow-hidden'
              disabled={btnLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>
              {btnLoading ? (
                <div className='flex items-center justify-center gap-2 relative z-10'>
                  <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                <>
                  <span className='relative z-10'>Create Account</span>
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10' />
                </>
              )}
            </motion.button>

            {/* Login Link */}
            <motion.p 
              className='text-center text-gray-400 text-sm pt-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              Already have an account?{" "}
              <span
                className='text-purple-400 font-semibold cursor-pointer hover:text-purple-300 transition-colors hover:underline'
                onClick={() => navigate("/login")}
              >
                Sign in
              </span>
            </motion.p>
          </motion.form>
        </div>

        {/* Decorative bottom text */}
        <motion.div 
          className='flex items-center justify-center gap-2 text-gray-500 text-xs mt-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Shield className='w-4 h-4 text-green-400' />
          <p>Your data is encrypted and secure</p>
        </motion.div>
      </motion.div>

      {/* Floating particles effect */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-2 h-2 bg-purple-400 rounded-full opacity-20'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default Registration;