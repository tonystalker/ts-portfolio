import React from "react";
import HeroContent from "../sub/HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-screen w-full" id="about-me">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 h-full w-full z-[1] object-cover brightness-75 saturate-150"
      >
        <source src="./a1.webm" type="video/webm" />
      </video>

      <div className="relative z-[2] w-full h-full flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md">
        <HeroContent />
      </div>
    </div>
  );
};

export default Hero;
