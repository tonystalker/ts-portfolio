"use client";
import React from "react";
import ProjectCard from "../sub/ProjectCard";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      id: 1,
      src: "/crowdfund.png",
      title: "Crowd Fund Marketplace",
      description: "A crowd fund marketplace project with smart contract integration written in Solidity which allows users to start campaigns and others to donate.",
      link: "https://crowd-fund-me-i9j7.vercel.app/",
      tech: ["Solidity", "React", "Web3.js", "Tailwind CSS"],
      featured: true
    },
    {
      id: 2,
      src: "/intve.png",
      title: "Code Interview Platform",
      description: "A code interview platform where users can create and take coding challenges, with real-time code execution and evaluation.",
      link: "https://code-chat-sigma.vercel.app/",
      tech: ["Next.js", "TypeScript", "Monaco Editor", "Node.js"],
      featured: false
    },
    {
      id: 3,
      src: "/web3jobs.png",
      title: "Web3 Jobs",
      description: "A job portal where users can post jobs and apply for jobs, where a single recruiter can recruit for multiple companies.",
      link: "https://web3-jobs-1tnt.vercel.app/",
      tech: ["React", "Web3.js", "Smart Contracts", "MongoDB"],
      featured: false
    },
    {
      id: 4,
      src: "/defi.jpeg",
      title: "Basic Defi Protocol",
      description: "A basic DeFi protocol that lets users deposit collateral and mint stable coins.",
      link: "https://github.com/tonystalker/defi_dsc_engine",
      tech: ["Solidity", "Hardhat", "JavaScript", "DeFi"],
      featured: false
    }
  ];

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen py-20 overflow-hidden"
      id="projects"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="text-center mb-16 relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6"
        >
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-purple-300 text-sm font-medium">Featured Projects</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-heading"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            My Projects
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-300 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Explore my latest work and side projects in Web3, DeFi, and full-stack development
        </motion.p>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 z-10">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(400px,auto)]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${index === 0 || index === 3 ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
              <ProjectCard
                {...project}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-20 text-center relative z-10 px-4"
      >
        <div className="glass-refined rounded-2xl p-8 md:p-12 inline-block max-w-3xl w-full border border-white/5">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">Want to see more?</h3>
          <p className="text-gray-300 text-base md:text-lg mb-8">Check out my GitHub for additional projects, contributions, and experiments.</p>
          <a
            href="https://github.com/tonystalker"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 text-base md:text-lg font-semibold text-white px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
          >
            <span className="relative z-10">View All Projects</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </motion.div>

      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#030014] via-purple-900/5 to-[#030014] pointer-events-none"></div>
    </section>
  );
};

export default Projects;
