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
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-200 shadow-lg p-[20px] border-t-2 border-gray-600">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
          {/* Social Section 1 */}
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[18px] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Connect with me on
            </div>

            <div className="flex flex-col items-center my-[15px] space-y-4">
              {/* Github */}
              <a
                href="https://github.com/tonystalker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center cursor-pointer hover:text-pink-500 transition duration-300 ease-in-out"
              >
                <RxGithubLogo className="text-[20px]" />
                <span className="text-[16px] ml-[8px]">Github</span>
              </a>

              {/* Discord */}
              <a
                href="https://discord.com/users/tonystalkerr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out"
              >
                <RxDiscordLogo className="text-[20px]" />
                <span className="text-[16px] ml-[8px]">Discord</span>
              </a>

              {/* Email */}
              <a
                href="mailto:707ayushtripathi@gmail.com"
                className="flex flex-row items-center cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
              >
                <RxEnvelopeClosed className="text-[20px]" />
                <span className="text-[16px] ml-[8px]">Email</span>
              </a>
            </div>
          </div>

          {/* Social Section 2 */}
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[18px] text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-500 to-blue-500">
              Social Links
            </div>

            <div className="flex flex-col items-center my-[15px] space-y-4">
              {/* Twitter */}
              <a
                href="https://x.com/TonyStalkerr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center cursor-pointer hover:text-blue-400 transition duration-300 ease-in-out"
              >
                <RxTwitterLogo className="text-[20px]" />
                <span className="text-[16px] ml-[8px]">Twitter</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center cursor-pointer hover:text-blue-600 transition duration-300 ease-in-out"
              >
                <RxLinkedinLogo className="text-[20px]" />
                <span className="text-[16px] ml-[8px]">LinkedIn</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/tripsayush/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center cursor-pointer hover:text-red-500 transition duration-300 ease-in-out"
              >
                <RxInstagramLogo className="text-[20px]" />
                <span className="text-[16px] ml-[8px]">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
