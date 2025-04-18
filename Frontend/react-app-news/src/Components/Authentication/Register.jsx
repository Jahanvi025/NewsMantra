import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import api from "../../utils/api.js";
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from "../../utils/api";
import googleicon from "../../assets/images/icons8-google.svg";
import poster from "../../assets/images/loginimg.svg";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setServerError("");
      const res = await api.post("/auth/register", data);
      if (res.data.success) {
        toast.success("Signup successful! You can now log in.");
        reset();
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setServerError(error.response?.data?.message || "Something went wrong");
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        const { email, username } = result.data.user;
        const token = result.data.token;

        const userData = { token, email, username };
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event("userUpdated")) 
        toast.success("Google signup successful!");
        
        navigate("/");
      }
    } catch (error) {
      console.error("Error during Google signup:", error);
      toast.error("Google signup failed");
    }
  };

  const googleSignup = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

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
            <h1 className='text-xl text-left font-bold font-[Supreme] mb-2'>Unlock a World of News!</h1>
            <p className="text-left text-neutral-700 font-[Supreme] w-5/6 md:w-4/6 text-sm">Sign up now to personalize your feed, create articles, and stay ahead with NewsMantra.</p>
          </motion.div>

          <motion.button 
            className='flex text-sm flex-row items-center justify-center space-x-2 font-[Supreme] border border-solid border-neutral-950 rounded-lg px-16 md:px-20 py-2 w-full'
            whileHover={{ scale: 1.05 }}
            onClick={googleSignup}
          >
            <img src={googleicon} alt="Google Logo" className="w-6 h-6" />
            <span className='text-neutral-950'>Continue with Google</span>
          </motion.button>
          
          <div className="flex flex-row items-center justify-center space-x-2 w-full">
            <div className="border-b border-solid border-neutral-950 w-24 md:w-32"></div>
            <p className="font-[Supreme] text-sm">Or</p>
            <div className="border-b border-solid border-neutral-950 w-24 md:w-32"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <motion.div 
              className='flex flex-col -space-y-0.5'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <input 
                type="text" 
                placeholder='Enter Full Name here' 
                className='placeholder:font-[Supreme] border border-solid border-neutral-950 rounded-lg pl-5 pr-9 py-2 placeholder:text-sm placeholder:text-black w-full' 
                {...register("username", { required: "Username is required", minLength: { value: 3, message: "Minimum 3 characters" } })} 
              />
              {errors.username && <p className='text-[#F7374F] mt-1 text-xs'>{errors.username.message}</p>}
              <br />

              <input 
                type="email" 
                placeholder='Enter Email here' 
                className='placeholder:font-[Supreme] border border-solid border-neutral-950 rounded-lg pl-5 pr-9 py-2 placeholder:text-sm placeholder:text-black w-full' 
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                })} 
              />
              {errors.email && <p className='text-[#F7374F] mt-1  text-xs'>{errors.email.message}</p>}
              <br />

              <div className='relative w-full'>
                <input 
                  type={isVisible ? 'text' : 'password'} 
                  placeholder='Enter Password here' 
                  className='placeholder:font-[Supreme] border border-solid border-neutral-950 rounded-lg pl-5 pr-10 py-2 placeholder:text-sm placeholder:text-black w-full' 
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters required" }
                  })} 
                />
                <div
                  className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                  onClick={() => setIsVisible((prev) => !prev)}
                >
                  {isVisible ? <Eye size={22} /> : <EyeOff size={22} />}
                </div>
                {errors.password && <p className='text-[#F7374F] mt-1  text-xs'>{errors.password.message}</p>}
              </div>
              <br />

              {serverError && <p className="text-[#F7374F] mb-2  text-sm">{serverError}</p>}
              
              <motion.button 
                type="submit"
                className='font-[Supreme] bg-black px-14 py-2 text-sm hover:text-[#F7374F] transition-transform delay-150 border-neutral-950 rounded-lg border text-white w-full'
                whileHover={{ scale: 1.05 }}
              >Sign Up</motion.button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <p className='font-[Supreme] text-sm'>Already have an account? <Link to="/login" className='text-blue-700 text-sm'>Login to your account</Link></p>
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
  );
};

export default Register;
