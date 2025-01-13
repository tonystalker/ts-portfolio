import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center py-20 overflow-hidden"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20 z-[10]">
        My Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 max-w-7xl w-full z-[20]">
        <ProjectCard
          src="/crowdfund.png"
          title="Crowd Fund Marketplace"
          description="A crowd fund marketplace project with smart contract integration written in Solidity which allows users to start campaigns and others to donate."
          link="https://crowd-fund-me-i9j7.vercel.app/"
        />
        <ProjectCard
          src="/web3jobs.png"
          title="Web3 Jobs"
          description="A job portal where users can post jobs and apply for jobs, where a single recruiter can recruit for multiple companies."
          link="https://web3-jobs-1tnt.vercel.app/"
        />
        <ProjectCard
          src="/defi.jpeg"
          title="Basic Defi Protocol"
          description="A basic DeFi protocol that lets users deposit collateral and mint stable coins."
          link="https://github.com/tonystalker/defi_dsc_engine"
        />
      </div>

      {/* More Projects Section */}
      <div className="mt-16 text-center">
        <a
          href="https://github.com/tonystalker"
          className="text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-full inline-block transform transition duration-300 hover:scale-105 hover:from-purple-700 hover:to-cyan-700"
        >
          More Projects
        </a>
      </div>

      <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-[#030014] via-transparent to-[#030014] opacity-60 pointer-events-none"></div>
    </section>
  );
};

export default Projects;
