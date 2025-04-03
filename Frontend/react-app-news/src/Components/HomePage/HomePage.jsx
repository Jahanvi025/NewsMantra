import React from 'react';
import newsimg from "../../assets/images/men-reading-newspaper-isolated-white-background.jpg";
import { Newspaper } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/news");
  }

  return (
    <div className='relative'>
      <div className=' flex flex-col md:flex-row justify-end items-start gap-6 md:gap-0'>

        {/* Left Section */}
        <motion.div 
          className="flex absolute top-15 left-12 flex-col mt-15 gap-3 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-6xl sm:text-8xl md:text-9xl font-[Supreme] font-bold bg-gradient-to-b from-black to-neutral-600 bg-clip-text text-transparent'>
            Prime News
          </h1>
          <motion.div 
            className='flex flex-row gap-2 justify-center md:justify-start items-start pl-2'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Newspaper size={22} color="#F7374F" strokeWidth={1.5} />
            <p className='text-neutral-800 font-[Supreme] w-full md:w-2/6'>
              Stay informed with the latest headlines from around the world. NewsMantra brings you
              <span className='text-[#F7374F]'> real-time updates </span>
              on politics, technology, business, sports, entertainment, and more—all in one place.
            </p>
          </motion.div>
          <motion.div
            
            whileTap={{ scale: 0.95 }}
          >
            <button 
              className="bg-[#F7374F] hover:text-white font-[Supreme] py-2 px-4 rounded-lg mt-1 transition-all delay-100 ease-in group"
              onClick={handleClick}
            >
              Read News
            </button>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div 
          className="flex flex-col gap-3 text-center items-end md:text-left w-5/6 h-[90vh]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={newsimg} alt="newsimg" loading='lazy' className='object-cover'/>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
