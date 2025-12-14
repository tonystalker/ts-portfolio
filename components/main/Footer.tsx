"use client";
import React from "react";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
  RxEnvelopeClosed,
} from "react-icons/rx";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: <RxGithubLogo className="text-xl" />,
      label: "GitHub",
      href: "https://github.com/tonystalker",
      color: "hover:text-gray-100"
    },
    {
      icon: <RxLinkedinLogo className="text-xl" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/",
      color: "hover:text-blue-400"
    },
    {
      icon: <RxTwitterLogo className="text-xl" />,
      label: "Twitter",
      href: "https://x.com/TonyStalkerr",
      color: "hover:text-sky-400"
    },
    {
      icon: <RxInstagramLogo className="text-xl" />,
      label: "Instagram",
      href: "https://www.instagram.com/tripsayush/",
      color: "hover:text-pink-400"
    },
    {
      icon: <RxDiscordLogo className="text-xl" />,
      label: "Discord",
      href: "https://discord.com/users/tonystalkerr",
      color: "hover:text-purple-400"
    },
    {
      icon: <RxEnvelopeClosed className="text-xl" />,
      label: "Email",
      href: "mailto:707ayushtripathi@gmail.com",
      color: "hover:text-red-400"
    }
  ];

  return (
    <footer className="relative w-full mt-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-purple-900/10 to-transparent">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 right-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>
      </div>
      
      <div className="relative z-10">
        {/* Top border */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Ayush Tripathi
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Full-stack developer passionate about building innovative web experiences and exploring the future of decentralized technology.
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                <span>© {currentYear}</span>
                <span>•</span>
                <span>Built with Next.js & Tailwind CSS</span>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-col items-center">
              <h4 className="text-lg md:text-xl font-semibold text-white mb-6">Quick Links</h4>
              <div className="flex flex-col space-y-2 md:space-y-3">
                <a href="#about-me" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  About
                </a>
                <a href="#skills" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Skills
                </a>
                <a href="#experience" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Experience
                </a>
                <a href="#projects" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Projects
                </a>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-col items-center">
              <h4 className="text-lg md:text-xl font-semibold text-white mb-6">Connect</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 text-gray-400 ${link.color} transition-all duration-300 hover:scale-105`}
                  >
                    <span className="transform transition-transform duration-300 group-hover:scale-110">
                      {link.icon}
                    </span>
                    <span className="text-xs md:text-sm">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <p className="text-gray-400 text-xs md:text-sm text-center">
                Let&apos;s build something amazing together
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
