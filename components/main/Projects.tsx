import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center py-20 overflow-hidden"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 max-w-7xl w-full">
        <ProjectCard
          src="/NextWebsite.png"
          title="Modern Next.js Portfolio"
          description="A modern, responsive portfolio built with Next.js showcasing my work and skills."
        />
        <ProjectCard
          src="/CardImage.png"
          title="Interactive Website Cards"
          description="An engaging project with interactive cards that highlight different content dynamically."
        />
        <ProjectCard
          src="/SpaceWebsite.png"
          title="Space Themed Website"
          description="A space-themed website project with smooth animations and modern design principles."
        />
      </div>

      <div className="absolute inset-0 z-[-5] bg-gradient-to-t from-[#030014] via-transparent to-[#030014] opacity-60 pointer-events-none"></div>
    </section>
  );
};

export default Projects;
