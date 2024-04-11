import React from "react";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-340px] left-0 z-[1] h-full object-cover"
      >
        <source src="/blackhole.webm" type="video/wbm" />
      </video>
    </div>
  );
};

export default Hero;
