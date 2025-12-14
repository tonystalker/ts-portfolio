"use client";

import { Backend_skill, Frontend_skill, Other_skill } from "@/constants";
import React, { useState } from "react";
import SkillDataProvider from "../sub/SkillDataProvider";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const skillCategories = [
    {
      id: "frontend",
      title: "Frontend",
      skills: Frontend_skill,
      gradient: "from-purple-400 to-pink-400",
      color: "purple"
    },
    {
      id: "backend", 
      title: "Backend",
      skills: Backend_skill,
      gradient: "from-blue-400 to-cyan-400",
      color: "blue"
    },
    {
      id: "blockchain",
      title: "Blockchain",
      skills: Other_skill,
      gradient: "from-green-400 to-emerald-400",
      color: "green"
    }
  ];

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>
      
      {/* Section Header */}
      <div className="text-center mb-12 opacity-0 animate-fadeInUp relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm rounded-full mb-6">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          <span className="text-purple-300 text-sm font-medium">Technical Expertise</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Skills & Technologies
          </span>
        </h2>
        
        <p className="text-gray-300 text-lg max-w-3xl mx-auto px-4 leading-relaxed">
          Explore my technical capabilities across different development domains
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-8 opacity-0 animate-fadeInUp relative z-10" style={{ animationDelay: "0.2s" }}>
        <div className="inline-flex bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full p-1">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Display */}
      <div className="w-full max-w-4xl mx-auto px-6 z-10 opacity-0 animate-fadeInUp relative" style={{ animationDelay: "0.4s" }}>
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
          {/* Category Header */}
          <div className="text-center mb-8">
            <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${activeSkills?.gradient} mb-2`}>
              {activeSkills?.title} Development
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r opacity-30 rounded-full mx-auto"
                 style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
            </div>
          </div>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {activeSkills?.skills.map((skill, skillIndex) => (
              <div
                key={skillIndex}
                className="flex flex-col items-center justify-center p-4 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <SkillDataProvider
                    src={skill.Image}
                    width={skill.width * 0.8}
                    height={skill.height * 0.8}
                    index={skillIndex}
                  />
                </div>
                <span className="text-xs text-gray-400 text-center font-medium">
                  {skill.skill_name || skill.Image.split('/').pop()?.split('.')[0]?.replace(/[-_]/g, ' ') || ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#030014] via-purple-900/5 to-[#030014] pointer-events-none"></div>
    </section>
  );
};

export default Skills;
