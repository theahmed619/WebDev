import React from 'react'
import Logo from "../../public/lust.png" 
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase'; // Assumed path
import { LoadingSpinner } from '../components/Loading';
import { toast } from "react-toastify";

// --- FIX ---
// 1. Import the custom hook 'UserData' instead of 'userDataContext'
import { UserData } from '../context/UserContext';

function Login() {
    let [show,setShow] = useState(false)
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    
    let navigate = useNavigate()

    // --- FIX ---
    // 2. Use the UserData hook to get the functions and loading state
    const { loginWithEmail, loginWithGoogle, btnLoading } = UserData();

    // 3. These are no longer needed, as the context handles them
    // let {serverUrl} = useContext(authDataContext)
    // let {getCurrentUser} = useContext(userDataContext)
    // let [loading,setLoading] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault();
        // 4. Call the simplified function from context
        // It handles loading, API, localStorage, state, and navigation
        await loginWithEmail(email, password, navigate);
    }

     const googlelogin = async () => {
            try {
                const response = await signInWithPopup(auth , provider)
                const googleUser = {
                    name: response.user.displayName,
                    email: response.user.email,
                };
    
                // 5. Call the simplified function from context
                await loginWithGoogle(googleUser, navigate);
    
            } catch (error) {
                console.log(error)
                toast.error("Google Login Failed");
            }
        }
        
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
    <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={()=>navigate("/")}>
    <img className='w-[40px]' src={Logo} alt="" />
    <h1 className='text-[22px] font-sans '>MemeHub</h1>
    </div>

    <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Login Page</span>
        <span className='text-[16px]'>Welcome to MemeHub, login to see content</span>
    </div>
    <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center '>
        <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
            <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googlelogin}>
                <img src={google} alt="" className='w-[20px]'/> Login account with Google
            </div>
            <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
             <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            </div>
            <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]  relative'>
              
                 <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required  onChange={(e)=>setEmail(e.target.value)} value={email}/>
                  <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
                  {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={()=>setShow(prev => !prev)}/>}
                  {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={()=>setShow(prev => !prev)}/>}
                  
                  {/* --- FIX --- */}
                  {/* 6. Use 'btnLoading' from the context */}
                  <button 
                    className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'
                    disabled={btnLoading}
                  >
                   {btnLoading ? <LoadingSpinner/> : "Login"}
                  </button>

                  <p className='flex  gap-[10px]'>You haven't any account? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate("/signup")}>Create New Account</span></p>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Login