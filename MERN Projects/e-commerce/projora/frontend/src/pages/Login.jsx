import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase'; // Adjust this path if needed
import { toast } from "react-hot-toast";

// 1. Import the custom hook 'UserData'
import { UserData } from '../context/UserContext';

// 2. Import a loading component (assuming you have one)
// import { LoadingSpinner } from '../components/Loading';

// Assuming a default logo path
import Logo from "/lust.png"; 
import google from '../assets/google.png';

function Login() {
    let [show, setShow] = useState(false);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    
    let navigate = useNavigate();

    // 3. Use the UserData hook to get functions and loading state
    const { loginWithEmail, loginWithGoogle, btnLoading } = UserData();

    // 4. Handle Email/Password Login
    const handleLogin = async (e) => {
        e.preventDefault();
        // This function now handles everything:
        // API call, loading state, saving token, and navigating
        await loginWithEmail(email, password, navigate);
    }

    // 5. Handle Google Login
    const googleLoginHandler = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            
            // --- CRITICAL FIX ---
            // Create the user object WITH googleId
            const googleUser = {
                name: response.user.displayName,
                email: response.user.email,
                googleId: response.user.uid, // <-- Required by your backend
            };

            await loginWithGoogle(googleUser, navigate);

        } catch (error) {
            console.log(error);
            toast.error("Google Login Failed");
        }
    }
        
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
      <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
        <img className='w-[40px]' src={Logo} alt="Projora Logo" />
        <h1 className='text-[22px] font-sans '>Projora</h1>
      </div>

      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
          <span className='text-[25px] font-semibold'>Login Page</span>
          <span className='text-[16px]'>Welcome back to Projora</span>
      </div>
      <div className='max-w-[600px] w-[90%] min-h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center py-8'>
          <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
              <button 
                type="button" 
                className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' 
                onClick={googleLoginHandler}
                disabled={btnLoading}
              >
                  <img src={google} alt="" className='w-[20px]'/> Login with Google
              </button>
              
              <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
               <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
              </div>
              
              <div className='w-[90%] flex flex-col items-center justify-center gap-[15px] relative'>
                   <input 
                    type="email" 
                    className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' 
                    placeholder='Email' 
                    required  
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                  />
                  <div className="w-full h-[50px] relative">
                    <input 
                      type={show ? "text" : "password"} 
                      className='w-[100%] h-full border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' 
                      placeholder='Password' 
                      required 
                      onChange={(e) => setPassword(e.target.value)} 
                      value={password}
                    />
                    {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-4 top-1/2 -translate-y-1/2' onClick={() => setShow(prev => !prev)}/>}
                    {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-4 top-1/2 -translate-y-1/2' onClick={() => setShow(prev => !prev)}/>}
                  </div>
                    
                    <button 
                      type="submit"
                      className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold disabled:opacity-70 disabled:cursor-not-allowed'
                      disabled={btnLoading}
                    >
                     {btnLoading ? "Loading..." /* <LoadingSpinner/> */ : "Login"}
                    </button>

                    <p className='flex gap-[10px] mt-4'>
                      No account?{" "}
                      <span 
                        className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' 
                        onClick={() => navigate("/signup")}
                      >
                        Create one
                      </span>
                    </p>
              </div>
          </form>
      </div>
    </div>
  )
}

export default Login;