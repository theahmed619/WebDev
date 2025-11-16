import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { toast } from "react-hot-toast";
import { UserData } from '../context/UserContext';
import Logo from "/shopping-bag.png"; 
import google from '../assets/google.png';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles, Shield } from 'lucide-react';

function Login() {
    let [show, setShow] = useState(false);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [focusedField, setFocusedField] = useState(null);
    
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
        <div className='min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 pt-20 md:pt-24 relative overflow-hidden'>
            {/* Animated background elements */}
            <div className='absolute inset-0 overflow-hidden'>
                <motion.div 
                    className='absolute top-1/4 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20'
                    animate={{ 
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className='absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20'
                    animate={{ 
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10'
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
                <div className='absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl'></div>
                
                <div className='relative bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 space-y-6'>
                    {/* Decorative elements */}
                    <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full'></div>
                    <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full'></div>

                    {/* Header */}
                    <motion.div 
                        className='text-center space-y-3 relative z-10'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className='inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-2'>
                            <Sparkles className='w-4 h-4 text-blue-400' />
                            <span className='text-xs text-blue-400 font-medium'>Secure Login</span>
                        </div>
                        <h2 className='text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent'>
                            Welcome Back
                        </h2>
                        <p className='text-gray-400 text-sm'>Sign in to continue to your projects</p>
                    </motion.div>

                    <motion.form 
                        onSubmit={handleLogin} 
                        className='space-y-5 relative z-10'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        {/* Google Login Button */}
                        <motion.button 
                            type="button" 
                            className='w-full h-12 bg-white hover:bg-gray-50 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden' 
                            onClick={googleLoginHandler}
                            disabled={btnLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                            <img src={google} alt="" className='w-5 h-5 group-hover:scale-110 transition-transform relative z-10'/> 
                            <span className='text-gray-800 font-semibold relative z-10'>Continue with Google</span>
                        </motion.button>
                        
                        {/* Divider */}
                        <div className='flex items-center gap-4 py-2'>
                            <div className='flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent'></div>
                            <span className='text-gray-500 text-sm font-medium'>OR</span>
                            <div className='flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent'></div>
                        </div>
                        
                        {/* Email Input */}
                        <motion.div 
                            className='space-y-2'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
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
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <label className='text-sm font-medium text-gray-300 ml-1 flex items-center gap-2'>
                                <Lock className='w-4 h-4 text-purple-400' />
                                Password
                            </label>
                            <div className="relative group">
                                <input 
                                    type={show ? "text" : "password"} 
                                    className={`w-full h-12 bg-gray-800/50 border-2 ${focusedField === 'password' ? 'border-purple-500 bg-gray-800' : 'border-gray-700'} rounded-xl px-4 pl-11 pr-12 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-gray-800 transition-all duration-300 outline-none`}
                                    placeholder='Enter your password' 
                                    required 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                />
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'password' ? 'text-purple-400' : 'text-gray-500'}`} />
                                <motion.button 
                                    type="button"
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                                    onClick={() => setShow(prev => !prev)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {show ? <IoEye className='w-5 h-5'/> : <IoEyeOutline className='w-5 h-5'/>}
                                </motion.button>
                            </div>
                        </motion.div>
                        
                        {/* Login Button */}
                        <motion.button 
                            type="submit"
                            className='w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2 group relative overflow-hidden'
                            disabled={btnLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                            {btnLoading ? (
                                <div className='flex items-center justify-center gap-2 relative z-10'>
                                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                <>
                                    <span className='relative z-10'>Sign In</span>
                                    <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10' />
                                </>
                            )}
                        </motion.button>

                        {/* Sign Up Link */}
                        <motion.p 
                            className='text-center text-gray-400 text-sm pt-4'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                        >
                            Don't have an account?{" "}
                            <span 
                                className='text-blue-400 font-semibold cursor-pointer hover:text-blue-300 transition-colors hover:underline' 
                                onClick={() => navigate("/signup")}
                            >
                                Create one
                            </span>
                        </motion.p>
                    </motion.form>
                </div>

                {/* Decorative bottom text */}
                <motion.div 
                    className='flex items-center justify-center gap-2 text-gray-500 text-xs mt-6'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <Shield className='w-4 h-4 text-green-400' />
                    <p>Protected by industry-standard encryption</p>
                </motion.div>
            </motion.div>

            {/* Floating particles effect */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className='absolute w-2 h-2 bg-blue-400 rounded-full opacity-20'
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

export default Login;