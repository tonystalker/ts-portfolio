"use client";

import { useEffect, useRef } from "react";

/**
 * A lightweight 2D Canvas particle-wave background.
 * Inspired by ryanhugh.com — uses sine-wave math + mouse interaction.
 * No Three.js dependency — pure Canvas2D for maximum compatibility.
 */
export function ParticleWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Configuration ──────────────────────────────────────────
    const COLS = 50;
    const ROWS = 50;
    const SPACING = 30;     // px between dots
    const BASE_RADIUS = 1.6;
    const WAVE_HEIGHT = 18;  // max vertical displacement in px
    const SPEED = 0.04;      // animation speed

    // ── State ──────────────────────────────────────────────────
    let mouseX = -9999;
    let mouseY = -9999;
    let animationId: number;
    let tick = 0;

    // ── Resize handler ─────────────────────────────────────────
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Mouse tracking ─────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    // ── Touch tracking (mobile) ─────────────────────────────────
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouseX = touch.clientX;
        mouseY = touch.clientY;
      }
    };
    const onTouchEnd = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    // ── Draw loop ──────────────────────────────────────────────
    // Read theme once per frame (class "dark" on <html>)
    const draw = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const isDark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, W, H);

      // Center the grid
      const gridW = (COLS - 1) * SPACING;
      const gridH = (ROWS - 1) * SPACING;
      const offsetX = (W - gridW) / 2;
      const offsetY = (H - gridH) / 2;

      for (let ix = 0; ix < COLS; ix++) {
        for (let iy = 0; iy < ROWS; iy++) {
          const baseX = offsetX + ix * SPACING;
          const baseY = offsetY + iy * SPACING;

          // Sine-wave displacement
          const wave =
            Math.sin(ix * 0.3 + tick) * WAVE_HEIGHT * 0.5 +
            Math.sin(iy * 0.3 + tick * 0.8) * WAVE_HEIGHT * 0.5;

          const x = baseX;
          const y = baseY + wave;

          // Mouse/touch interaction — repel particles near pointer
          let dx = 0;
          let dy = 0;
          const distX = x - mouseX;
          const distY = y - mouseY;
          const dist = Math.sqrt(distX * distX + distY * distY);
          const MOUSE_RADIUS = 120;

          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            dx = (distX / dist) * force * 25;
            dy = (distY / dist) * force * 25;
          }

          const finalX = x + dx;
          const finalY = y + dy;

          // Scale radius based on wave height for depth illusion
          const scaleFactor = 1 + (wave / WAVE_HEIGHT) * 0.5;
          const radius = BASE_RADIUS * Math.max(0.4, scaleFactor);

          if (isDark) {
            // Dark mode: colorful HSL cycling
            const hue = (160 + ix * 2 + iy * 2 + tick * 10) % 360;
            const lightness = 50 + (wave / WAVE_HEIGHT) * 20;
            const alpha = 0.3 + scaleFactor * 0.25;
            ctx.fillStyle = `hsla(${hue}, 80%, ${lightness}%, ${alpha})`;
          } else {
            // Light mode: monochrome dark green (#1B5E20) with subtle opacity
            const alpha = 0.08 + scaleFactor * 0.12;
            ctx.fillStyle = `rgba(27, 94, 32, ${alpha})`;
          }

          ctx.beginPath();
          ctx.arc(finalX, finalY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      tick += SPEED;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    // ── Cleanup ────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
