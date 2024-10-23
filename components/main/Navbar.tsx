"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#0d001f]/80 backdrop-blur-md z-50 px-5 md:px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src="/a3.jpg"
            alt="logo"
            width={40}
            height={40}
            className="cursor-pointer hover:animate-slowspin transition-transform duration-300 hover:scale-110 rounded-full border-[2px] border-transparent hover:border-purple-950 shadow-[0px_0px_10px_rgba(112,66,248,0.6)]"
          />
          <span className="font-bold ml-[10px] hidden md:block text-gray-300 hover:text-white transition duration-300">
            Tony Stalker
          </span>
        </a>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 focus:outline-none"
          >
            {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
          </button>
        </div>

        <div className="hidden md:flex w-[500px] h-full flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#1a012e5e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            <a
              href="#about-me"
              className="cursor-pointer hover:text-purple-400 transition duration-300"
            >
              About me
            </a>
            <a
              href="#skills"
              className="cursor-pointer hover:text-purple-400 transition duration-300"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="cursor-pointer hover:text-purple-400 transition duration-300"
            >
              Projects
            </a>
            <a
              href="/Resume.pdf"
              className="cursor-pointer hover:text-purple-400 transition duration-300"
              download="Resume"
            >
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0d001f] w-full py-4">
          <ul className="flex flex-col items-center space-y-4 text-gray-300">
            <li>
              <a
                href="#about-me"
                className="cursor-pointer hover:text-purple-400 transition duration-300"
                onClick={toggleMenu}
              >
                About me
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="cursor-pointer hover:text-purple-400 transition duration-300"
                onClick={toggleMenu}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="cursor-pointer hover:text-purple-400 transition duration-300"
                onClick={toggleMenu}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="/Resume.pdf"
                className="cursor-pointer hover:text-purple-400 transition duration-300"
                onClick={toggleMenu}
                download="Resume"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
