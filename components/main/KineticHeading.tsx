"use client";

import { useEffect, useRef } from "react";

interface KineticHeadingProps {
  children: string;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export function KineticHeading({
  children,
  className = "",
  as: Component = "h2",
  style,
}: KineticHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Physics state
  const mouseVelocity = useRef(0);
  const targetVelocity = useRef(0);
  const lastMousePos = useRef<{ x: number; time: number } | null>(null);
  const isHovered = useRef(false);
  const swayAmplitude = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.05;

      // Decay target velocity (friction)
      targetVelocity.current *= 0.92;

      // Smoothly interpolate current velocity towards target velocity
      mouseVelocity.current +=
        (targetVelocity.current - mouseVelocity.current) * 0.1;

      // Smoothly ramp the sway amplitude up/down based on hover state
      const targetAmplitude = isHovered.current ? 2.5 : 0;
      swayAmplitude.current +=
        (targetAmplitude - swayAmplitude.current) * 0.05;

      lettersRef.current.forEach((span, i) => {
        if (!span) return;
        const offset =
          Math.sin(time + i * 0.5) *
          swayAmplitude.current *
          (1 + Math.abs(mouseVelocity.current) * 0.5);
        span.style.transform = `translateY(${offset}px)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = performance.now();
    if (lastMousePos.current) {
      const dx = e.clientX - lastMousePos.current.x;
      const dt = now - lastMousePos.current.time;
      if (dt > 0) {
        targetVelocity.current = (dx / dt) * 10;
      }
    }
    lastMousePos.current = { x: e.clientX, time: now };
  };

  return (
    <Component
      ref={containerRef}
      className={`cursor-crosshair ${className}`}
      style={style}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => {
        isHovered.current = false;
        lastMousePos.current = null;
      }}
      onMouseMove={handleMouseMove}
    >
      {children.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => { lettersRef.current[i] = el; }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </span>
      ))}
    </Component>
  );
}
