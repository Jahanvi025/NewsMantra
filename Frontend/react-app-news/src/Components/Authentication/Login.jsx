import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from 'lucide-react';
import { Link } from "react-router-dom";
import googleicon from "../../assets/images/icons8-google.svg"
import poster from "../../assets/images/loginimg.svg"
import { motion } from "framer-motion";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='relative p-6 md:p-12'>
      <motion.div 
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='flex flex-col justify-center items-start space-y-5'>
        <motion.div 
  className='flex flex-col'
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
>
  <h1 className='text-xl text-left font-bold font-[Supreme] mb-2'>Welcome Back!</h1>
  <p className="text-left text-neutral-700 font-[Supreme] w-5/6 md:w-4/6 text-sm">
    Log in to access your personalized news feed, manage your articles, and stay updated with NewsMantra.
  </p>
</motion.div>


          <motion.button 
            className='flex text-sm flex-row items-center justify-center space-x-2 font-[Supreme] border border-solid border-neutral-950 rounded-lg px-16 md:px-20 py-2 w-full'
            whileHover={{ scale: 1.05 }}
          >
            <img src={googleicon} alt="Google Logo" className="w-6 h-6" />
            <span className='text-neutral-950'>Continue with Google</span>
          </motion.button>
          
          <div className="flex flex-row items-center justify-center space-x-2 w-full">
            <div className="border-b border-solid border-neutral-950 w-24 md:w-32"></div>
            <p className="font-[Supreme] text-sm">Or</p>
            <div className="border-b border-solid border-neutral-950 w-24 md:w-32"></div>
          </div>

          <form action="" className='w-full'>
            <motion.div 
              className='flex flex-col -space-y-0.5'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
      
              <input type="email" placeholder='Enter Email here' className='placeholder:font-[Supreme] placeholder:select-none placeholder:text-black placeholder:text-sm border border-solid border-neutral-950 rounded-lg pl-5 pr-9 py-2 w-full px-16 md:px-20'/>
              <br />
              <div className='relative w-full'>
                <input type={isVisible ? 'text' : 'password'} placeholder='Enter Password here' className='placeholder:font-[Supreme] placeholder:select-none placeholder:text-black placeholder:text-sm border border-solid border-neutral-950 rounded-lg pl-5 pr-10 py-2 w-full px-16 md:px-20'/>
                <div
                  className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                  onClick={() => setIsVisible((prev) => !prev)}
                >
                  {isVisible ? <Eye size={22} /> : <EyeOff size={22} />}
                </div>
              </div>
              <br />
              
              <motion.button 
                className='font-[Supreme] bg-black px-14 py-2 text-sm hover:text-[#F7374F] transform transition-transform delay-150 border-neutral-950 rounded-lg border border-solid text-white group w-full'
                whileHover={{ scale: 1.05 }}
              >Login</motion.button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <p className='font-[Supreme] text-sm'>Don't have an account? <Link to="/register" className='text-blue-700 text-sm'>Create your account here</Link></p>
          </motion.div>
        </div>
        
        <motion.div 
          className='flex justify-center'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={poster} alt="posterimg" className='w-full'/>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
