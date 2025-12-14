"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaDownload, FaMusic, FaPause } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
      // Restore all hidden elements and video opacity
      document.body.querySelectorAll('.text-hidden, .image-hidden, .icon-hidden, .container-hidden').forEach(el => {
        el.classList.remove('text-hidden', 'image-hidden', 'icon-hidden', 'container-hidden');
      });
      document.querySelectorAll('video').forEach(video => {
        video.style.opacity = '1';
      });
    } else {
      audioRef.current.play();
      // Hide all text
      document.body.querySelectorAll('*').forEach(el => {
        if (el.children.length === 0 && el.textContent?.trim()) {
          el.classList.add('text-hidden');
        }
      });

      // Hide skill images but preserve background video
      document.querySelectorAll('img[src*="/"], img[src*="png"], img[src*="jpg"], img[src*="webp"], img[src*="svg"]').forEach(img => {
        // Skip background video elements and the music toggle
        if (!img.closest('.music-toggle') && !img.closest('video')) {
          img.classList.add('image-hidden');
        }
      });

      // Hide footer icons and other icon elements but preserve stars
      document.querySelectorAll('svg, i, [class*="icon"], [class*="Icon"]').forEach(icon => {
        // Skip star elements (Three.js canvas) and background elements
        if (!icon.closest('canvas') && !icon.closest('.fixed') && !icon.closest('video')) {
          icon.classList.add('icon-hidden');
        }
      });

      // Hide all containers, sections, divs, cards, etc. but preserve background elements
      document.querySelectorAll('div, section, article, main, header, footer, nav, aside, .container, .card, .box, .wrapper').forEach(container => {
        // Skip the navbar container, Hero section (with video), and stars canvas
        if (!container.closest('.navbar-music-container') &&
          !container.closest('#about-me') &&
          !container.closest('.fixed.inset-0')) {
          container.classList.add('container-hidden');
        }
      });

      // Make video more visible in Stranger Things mode
      document.querySelectorAll('video').forEach(video => {
        video.style.opacity = '1';
        video.style.filter = 'brightness(1.2)';
      });

      // Preserve video and its parent container
      document.querySelectorAll('video').forEach(video => {
        video.classList.remove('container-hidden');
        if (video.parentElement) {
          video.parentElement.classList.remove('container-hidden');
        }
      });
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const resumeLink = "/22035017_Ayush _Tripathi _sdc (3).pdf";

  return (
    <div className="navbar-music-container w-full fixed top-0 z-50 px-4 pt-4 flex justify-center">
      <div className="glass-refined-dark rounded-full px-6 py-3 flex flex-row items-center justify-between w-full max-w-5xl border border-white/10 shadow-lg shadow-purple-500/10">
        <a
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center group music-toggle"
          onClick={toggleMusic}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="relative cursor-pointer hover:scale-110 transition-all duration-300 rounded-full border-2 border-purple-500/50 hover:border-purple-400 w-[40px] h-[40px] flex items-center justify-center bg-black/40">
              {isMusicPlaying ? (
                <FaPause size={16} className="text-white" />
              ) : (
                <FaMusic size={16} className="text-white" />
              )}
            </div>
          </div>
          <span className="font-bold ml-3 hidden md:block text-white font-heading tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
            Ayush Tripathi
          </span>
        </a>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none transition-colors duration-300 p-2"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {["About", "Skills", "Experience", "Projects"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-") === "#about" ? "about-me" : item.toLowerCase()}`}
              className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105 relative group text-sm tracking-wide"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 text-sm"
          >
            <FaDownload size={12} />
            Resume
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass-refined-dark rounded-2xl border border-white/10 p-4 animate-fadeInUp">
          <div className="flex flex-col items-center space-y-4">
            {["About", "Skills", "Experience", "Projects"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-") === "#about" ? "about-me" : item.toLowerCase()}`}
                className="text-gray-300 hover:text-white font-medium transition-colors duration-300 w-full text-center py-2 hover:bg-white/5 rounded-lg"
                onClick={toggleMenu}
              >
                {item}
              </a>
            ))}
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 w-full justify-center"
              onClick={toggleMenu}
            >
              <FaDownload size={14} />
              Resume
            </a>
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/strangerthings_theme.mp3" loop />
    </div>
  );
};

export default Navbar;
