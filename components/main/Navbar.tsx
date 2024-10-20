import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#0d001f]/80 backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src="/a3.jpg"
            alt="logo"
            width={50}
            height={50}
            className="cursor-pointer hover:animate-slowspin transition-transform duration-300 hover:scale-110 rounded-full border-[2px] border-transparent hover:border-purple-950 shadow-[0px_0px_10px_rgba(112,66,248,0.6)]"
          />

          <span className="font-bold ml-[10px] hidden md:block text-gray-300 hover:text-white transition duration-300">
            Tony Stalker
          </span>
        </a>

        <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
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
    </div>
  );
};

export default Navbar;
