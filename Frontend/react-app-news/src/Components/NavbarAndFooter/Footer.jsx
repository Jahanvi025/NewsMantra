import React from 'react';
import { Phone, Mail } from "lucide-react";
import { FaLinkedin, FaGithub, FaCube } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import logo from "../../assets/images/icons8-inactive-state-96 (1).png";

const Footer = () => {
  const SocialLinks = () => {
    const links = [
      {
        href: "https://www.linkedin.com/in/jahanvi025",
        icon: FaLinkedin,
      },
      {
        href: "https://github.com/Jahanvi025",
        icon: FaGithub,
      },
      {
        href: "https://codesandbox.io/u/jahanvi025",
        icon: FaCube, 
      },
    ];

    return (
      <div className="flex space-x-4 justify-center md:justify-start">
        {links.map(({ href, icon: Icon }, index) => (
          <motion.a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="transition-transform duration-300 text-white hover:text-black"
          >
            <Icon size={28} />
          </motion.a>
        ))}
      </div>
    );
  };

  return (
    <footer className="footer relative bottom-0 w-full">
      <div className="bg-[#F7374F] w-full rounded-t-lg p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Link to="/" className="flex items-center space-x-2 py-5 justify-center md:justify-start">
            <img className="w-9 h-9" src={logo || "/placeholder.svg"} alt="icon" />
            <span className="font-bold text-xl text-white font-[Supreme]">NewsMantra</span>
          </Link>

          <div className="text-center md:text-left">
            <h1 className="font-bold text-2xl md:text-4xl text-white font-[Supreme] mb-3">
              Let's Connect and Collaborate
            </h1>
            <p className="text-[16px] font-thin text-neutral-100 font-[Supreme] mb-5">
              We are excited about your vision and explore how we can bring it together.
            </p>
            <div className="flex flex-col space-y-3 items-center md:items-start">
              <div className="flex flex-row space-x-2 items-center">
                <Phone size={20} color="#fff" />
                <span className="text-[16px] font-[Supreme] text-white">+91 1234567890</span>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <Mail size={20} color="#fff" />
                <span className="text-[16px] font-[Supreme] text-white">info@newsmantara.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center md:items-end'>
          {SocialLinks()}
          <div className="mt-5 md:mt-0 text-center md:text-left">
            <h1 className="text-lg text-white font-[Supreme] my-3 underline">Resources</h1>
            <ul className="flex flex-col space-y-2">
              <li><Link className="text-[16px] font-[Supreme] text-white hover:text-black" to="/">Home</Link></li>
              <li><Link className="text-[16px] font-[Supreme] text-white hover:text-black" to="/news">All News</Link></li>
              <li><Link className="text-[16px] font-[Supreme] text-white hover:text-black" to="/famous-stories">Popular News</Link></li>
              <li><Link className="text-[16px] font-[Supreme] text-white hover:text-black" to="/articles">Articles</Link></li>
              <li><Link className="text-[16px] font-[Supreme] text-white hover:text-black" to="/about">About Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full rounded-b-lg bg-[#F7374F] py-4 text-center mt-[2px]">
        <p className="text-white font-[Supreme] text-sm md:text-base">© 2024 NewsMantra. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to="/terms" className="text-sm md:text-base text-white font-[Supreme] font-bold hover:underline">Terms of Service</Link>
          <Link to="/privacy" className="text-sm md:text-base text-white font-[Supreme] font-bold hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
