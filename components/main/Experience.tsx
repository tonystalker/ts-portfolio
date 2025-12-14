"use client";
import React from "react";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    title: "Software Development Intern",
    company: "ScriptSolve",
    period: "May 2025 - July 2025",
    description: "Built reusable React and TypeScript components for a responsive course catalog. Integrated REST APIs to deliver dynamic content and functionality. Implemented dynamic sidebar navigation with React state management, enabling accurate lesson tracking and progress indicators that enhanced usability and streamlined navigation for learners.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "REST APIs", "State Management"]
  }
];

const Experience: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full py-12 md:py-20" id="experience">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />

      <div className="text-center mb-12 md:mb-16 opacity-0 animate-fadeInUp px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Experience
          </span>
        </h2>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto px-4">
          My professional journey and the technologies I&apos;ve worked with
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-400 to-pink-400 hidden md:block" />

          <div className="space-y-12">
            {experienceData.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center opacity-0 animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-[#030014] hidden md:block z-10" />

                <div className="w-full md:w-10/12 lg:w-5/12 md:pr-8">
                  <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 md:p-6 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                      <h3 className="text-lg md:text-xl font-bold text-white">{item.title}</h3>
                      <span className="text-xs md:text-sm text-purple-300 font-medium">{item.period}</span>
                    </div>

                    <p className="text-base md:text-lg text-purple-200 mb-3">{item.company}</p>

                    <p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed">{item.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-xs text-purple-200 font-medium hover:bg-purple-500/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-2/12 lg:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
