"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuHand } from "react-icons/lu";

interface MascotEasterEggProps {
  isPlaying: boolean;
  onEnded: () => void;
}

export function MascotEasterEgg({ isPlaying, onEnded }: MascotEasterEggProps) {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isPlaying) {
      setIsVisible(false);
      return;
    }

    // 1. Mascot appears smoothly
    setIsVisible(true);

    // 2. Play the video
    const playTimer = setTimeout(async () => {
      if (videoRef.current) {
        try {
          videoRef.current.currentTime = 0;
          await videoRef.current.play();
        } catch {
          // Ignore autoplay restrictions if handled
        }
      }
    }, 60);

    // 3. Automatically slides away and goes after waving (~4.5 seconds)
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4500);

    // 4. Complete cleanup after exit animation finishes (~5.0 seconds)
    const cleanupTimer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      onEnded();
    }, 5000);

    return () => {
      clearTimeout(playTimer);
      clearTimeout(exitTimer);
      clearTimeout(cleanupTimer);
    };
  }, [isPlaying, onEnded]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 120, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 120, scale: 0.92 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 right-0 sm:bottom-2 sm:right-3 md:bottom-3 md:right-5 z-50 w-[240px] sm:w-[340px] md:w-[440px] lg:w-[500px] select-none pointer-events-none"
        >
          <div className="relative">
            {/* Floating Greeting Speech Bubble (Automatically goes away with mascot) */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="absolute -top-7 left-6 sm:left-14 bg-[#161618]/95 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full shadow-2xl flex items-center gap-1.5"
            >
              <LuHand className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-mono font-medium text-white tracking-tight">
                Hello there!
              </span>
            </motion.div>

            <video
              ref={videoRef}
              muted
              playsInline
              disablePictureInPicture
              className="w-full h-auto object-contain block drop-shadow-2xl pointer-events-none"
            >
              <source src="/mascot-transparent.webm" type="video/webm" />
              <source src="/mascot-transparent-hevc.mp4" type='video/mp4; codecs="hvc1"' />
              <source src="/mascot-transparent-hevc.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
