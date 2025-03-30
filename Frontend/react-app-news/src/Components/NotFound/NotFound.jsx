import React from 'react';
import Threads from './Threads';  // Import the Threads component

import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  function handleClick() {
    navigate('/'); // Navigate to the home page
  }

  return (
    <div className="relative">
      {/* Threads container */}
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
        
        {/* 404 content placed over the Threads container */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-60">
          <div className="text-center animate-fadeIn">
            <h1 className="text-9xl font-extrabold text-red-500 animate-bounce font-[Supreme]">404</h1>
            <p className="text-2xl text-black mt-4 font-[Supreme]">Oops! Page not found.</p>
            <p className="text-lg text-neutral-800 mt-2 font-[Supreme]">
              The page you are looking for might have been moved or deleted.
            </p>
            <button
              onClick={handleClick}
              className="mt-6 font-[Supreme] px-8 py-3 text-xl text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
