import React from 'react';
import { Newspaper } from "lucide-react";

const HomePage = () => {
  return (
    <div className='relative'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 px-4'>
        {/* Left Section */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h1 className='text-6xl sm:text-8xl md:text-9xl font-[Supreme] font-bold bg-gradient-to-b from-black to-neutral-600 bg-clip-text text-transparent'>
            Prime News
          </h1>
          <div className='flex flex-row gap-2 justify-center md:justify-start items-start pl-2'>
            <Newspaper size={22} color="#F7374F" strokeWidth={1.5} />
            <p className='text-neutral-800 font-[Supreme] w-full sm:w-5/6 md:w-3/6'>
              Stay informed with the latest headlines from around the world. NewsMantra brings you
              <span className='text-[#F7374F]'> real-time updates </span>
              on politics, technology, business, sports, entertainment, and more—all in one place.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
