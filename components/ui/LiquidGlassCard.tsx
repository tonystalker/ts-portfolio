"use client";

import React, { useRef, useState } from "react";

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
}

/**
 * Pure Apple Liquid Glass UI Card Component.
 * Implements real-time spatial mouse light sheen, specular rim reflection,
 * frosted backdrop blur, and subtle 3D physical parallax tilt.
 */
export function LiquidGlassCard({
  children,
  className = "",
  enableTilt = true,
  ...props
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update pointer position variables for specular sheen
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4; // Subtle 4deg max tilt
      const rotateY = ((x - centerX) / centerX) * 4;

      setTransformStyle(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.008, 1.008, 1.008)`
      );
    }
  };

  const handleMouseLeave = () => {
    if (enableTilt) {
      setTransformStyle(
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
      );
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition:
          "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      className={`liquid-glass liquid-glass-card group relative p-6 border hover:border-[var(--border-active)] hover:shadow-xl ${className}`}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
