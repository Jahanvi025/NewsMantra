import React from 'react';
import newsimg from "../../assets/images/men-reading-newspaper-isolated-white-background.webp";
import { Newspaper } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/news");
  };

  return (
    <div
      className="relative w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${newsimg})`,
        minHeight: "50vh", // short height even for small screens
      }}
    >
     
      {/* Text Content */}
      <div className="relative z-10 px-4 md:px-16 py-8 flex flex-col items-center md:items-start justify-center gap-6 h-full">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-[Supreme] font-bold bg-gradient-to-b from-black to-neutral-700 bg-clip-text text-transparent text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Prime News
        </motion.h1>

        <motion.div
          className="flex gap-2 items-start max-w-xl text-center md:text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Newspaper size={32} color="#F7374F" strokeWidth={1.5} />
          <p className="text-gray-800 font-[Supreme] text-sm sm:text-base">
            Stay informed with the latest headlines from around the world. NewsMantra brings you
            <span className="text-[#F7374F] font-medium"> real-time updates </span>
            on politics, tech, business, sports, and more—all in one place.
          </p>
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="bg-[#F7374F] text-white hover:bg-black px-6 py-2 rounded-lg font-[Supreme] transition-colors duration-300"
        >
          Read News
        </motion.button>
      </div>
    </div>
  );
};

export default HomePage;
