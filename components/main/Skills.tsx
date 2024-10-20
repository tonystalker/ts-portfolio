import { Backend_skill, Frontend_skill, Other_skill } from "@/constants";
import React from "react";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText from "../sub/SkillText";

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center gap-16 h-full overflow-hidden pb-80 py-20"
      style={{ transform: "scale(0.95)" }}
    >
      <SkillText />

      <div className="w-full flex flex-col items-center justify-center mt-8">
        <h2 className="text-3xl text-white font-bold mb-6 border-b-2 border-purple-400 pb-2">
          Frontend Skills
        </h2>
        <div className="flex flex-row justify-around flex-wrap gap-8 items-center w-full max-w-4xl">
          {Frontend_skill.map((image, index) => (
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-8">
        <h2 className="text-3xl text-white font-bold mb-6 border-b-2 border-blue-400 pb-2">
          Backend Skills
        </h2>
        <div className="flex flex-row justify-around flex-wrap gap-8 items-center w-full max-w-4xl">
          {Backend_skill.map((image, index) => (
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-8">
        <h2 className="text-3xl text-white font-bold mb-6 border-b-2 border-green-400 pb-2">
          Blockchain Skills
        </h2>
        <div className="flex flex-row justify-around flex-wrap gap-8 items-center w-full max-w-4xl">
          {Other_skill.map((image, index) => (
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-[-10] flex items-center justify-center bg-cover opacity-20 pointer-events-none">
        <video
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          preload="false"
          playsInline
          loop
          muted
          autoPlay
          src="/a4.webm"
        />
      </div>

      <div className="absolute inset-0 z-[-5] bg-gradient-to-t from-[#030014] via-transparent to-[#030014] opacity-60 pointer-events-none"></div>
    </section>
  );
};

export default Skills;
