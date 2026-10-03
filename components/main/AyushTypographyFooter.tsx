"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export function AyushTypographyFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Fallback state
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // ── Check WebGL Support ──
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
    if (!gl) {
      setWebGLSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 1. Scene, Camera, Renderer ────────────────────────────────────────────
    const scene = new THREE.Scene();
    // Exactly match site's --canvas token (#0b0b0b)
    scene.background = new THREE.Color(0x0b0b0b);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);
    camera.lookAt(0, 0, 0);

    const isMobile = width < 768;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // ── 2. Seamless Background Wall ───────────────────────────────────────────
    // Receives soft shadows without any color mismatch
    const wallGeometry = new THREE.PlaneGeometry(24, 16);
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b0b0b, // Perfectly matches site canvas
      roughness: 0.95,
      metalness: 0.05,
    });
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.z = -0.35;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // ── 3. Balanced Editorial Lighting ────────────────────────────────────────
    // Ambient light tuned to match site legibility
    const ambientLight = new THREE.AmbientLight(0x18191c, 0.65);
    scene.add(ambientLight);

    // Soft warm-neutral spotlight matching --text-primary (#f0eee9)
    const spotLight = new THREE.SpotLight(0xf5ede2, 24, 14, Math.PI / 3.0, 0.8, 1.5);
    spotLight.position.set(0, 0.8, 2.4);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    spotLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 16;
    spotLight.shadow.bias = -0.0004;
    spotLight.shadow.radius = 3.5;
    scene.add(spotLight);

    // Point light for subtle specular highlight tracking
    const pointLight = new THREE.PointLight(0xf2ebe1, 10, 7, 2.0);
    pointLight.position.copy(spotLight.position);
    scene.add(pointLight);

    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 0, 0);
    scene.add(lightTarget);
    spotLight.target = lightTarget;

    // ── 4. Refined 3D "AYUSH" Typography ──────────────────────────────────────
    let textMesh: THREE.Mesh | null = null;
    const textGroup = new THREE.Group();
    scene.add(textGroup);

    // Architectural dark titanium material with subtle warm specular response
    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2024,
      roughness: 0.42,
      metalness: 0.22,
    });

    const fontLoader = new FontLoader();
    fontLoader.load("/fonts/helvetiker_bold.typeface.json", (font: Font) => {
      // Balanced, proportional size (not oversized)
      const baseSize = 0.95;
      const textGeo = new TextGeometry("AYUSH", {
        font,
        size: baseSize,
        depth: 0.22, // Elegant, sleek physical relief
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.025,
        bevelSize: 0.018,
        bevelOffset: 0,
        bevelSegments: 4,
      });

      textGeo.computeBoundingBox();
      textGeo.center();

      textMesh = new THREE.Mesh(textGeo, textMaterial);
      textMesh.position.set(0, 0, 0);
      textMesh.castShadow = true;
      textMesh.receiveShadow = true;
      textGroup.add(textMesh);

      adjustTextScale();
    });

    const adjustTextScale = () => {
      if (!textMesh || !container) return;
      const currentWidth = container.clientWidth;
      // Proportional width: spans ~55% on desktop, ~70% on mobile
      const targetAspect = currentWidth < 640 ? 0.70 : currentWidth < 1024 ? 0.60 : 0.52;
      const fovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      textMesh.geometry.computeBoundingBox();
      const bbox = textMesh.geometry.boundingBox;
      if (bbox) {
        const textWidth = bbox.max.x - bbox.min.x;
        const desiredScale = (visibleWidth * targetAspect) / textWidth;
        // Clamp scale so it never looks overwhelmingly massive
        const clampedScale = Math.min(desiredScale, 1.45);
        textMesh.scale.set(clampedScale, clampedScale, clampedScale);
      }
    };

    // ── 5. Cursor Interaction & Inertia ───────────────────────────────────────
    let targetX = 0;
    let targetY = 0.5;
    let currentX = 0;
    let currentY = 0.5;

    const handlePointerMove = (clientX: number, clientY: number) => {
      setHasInteracted(true);
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      targetX = THREE.MathUtils.clamp(normX * 3.2, -3.0, 3.0);
      targetY = THREE.MathUtils.clamp(normY * 1.5, -1.2, 1.4);
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    // ── 6. Animation Loop ─────────────────────────────────────────────────────
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!prefersReducedMotion) {
        const lagFactor = 1 - Math.exp(-dt * 8.0);
        currentX += (targetX - currentX) * lagFactor;
        currentY += (targetY - currentY) * lagFactor;
      } else {
        currentX = targetX;
        currentY = targetY;
      }

      spotLight.position.set(currentX, currentY, 2.4);
      pointLight.position.copy(spotLight.position);
      lightTarget.position.set(currentX * 0.1, currentY * 0.1, 0);

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // ── 7. Resize ─────────────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      adjustTextScale();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      renderer.dispose();
    };
  }, []);

  return (
    <footer 
      className="w-full relative overflow-hidden select-none border-t"
      style={{
        background: "var(--canvas)",
        borderColor: "var(--line)",
      }}
      aria-label="Interactive AYUSH Typography Footer"
    >
      {/* 3D Viewport with proportional, restrained height */}
      <div 
        ref={containerRef} 
        className="w-full relative h-[42vh] sm:h-[52vh] flex items-center justify-center cursor-crosshair overflow-hidden"
      >
        {webGLSupported ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full block touch-none"
            aria-label="Sculptural 3D AYUSH typography illuminated by moving spotlight"
          />
        ) : (
          /* Non-WebGL Fallback: Tasteful display typography with soft light mask */
          <div 
            className="w-full h-full flex items-center justify-center relative bg-[var(--canvas)]"
            onMouseMove={(e) => {
              setHasInteracted(true);
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
              });
            }}
          >
            <h2 
              className="text-[10vw] sm:text-[8vw] font-black uppercase tracking-tight select-none leading-none text-center"
              style={{
                color: "#1f2024",
                fontFamily: "var(--font-sans)",
                textShadow: `
                  0 1px 0 #2b2c30,
                  0 2px 0 #242528,
                  0 3px 0 #1c1d20,
                  0 8px 20px rgba(0,0,0,0.6)
                `,
              }}
            >
              AYUSH
            </h2>

            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 240px at ${mousePos.x}% ${mousePos.y}%, rgba(245, 237, 226, 0.25) 0%, transparent 70%)`,
                mixBlendMode: "screen",
              }}
            />
          </div>
        )}

        {/* Quiet prompt badge */}
        {!hasInteracted && (
          <div 
            className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 z-20 flex items-center gap-2 px-3 py-1 rounded-full"
            style={{
              background: "rgba(17, 17, 17, 0.85)",
              border: "1px solid var(--line)",
              backdropFilter: "blur(12px)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-ping" style={{ background: "var(--accent)" }} />
            <span className="text-[10.5px] sm:text-[11px]" style={{ color: "var(--text-secondary)" }}>
              hover to illuminate
            </span>
          </div>
        )}
      </div>

      {/* Minimal Lower Edge Layout */}
      <div 
        className="w-full border-t py-4 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono relative z-20"
        style={{
          borderColor: "var(--line)",
          background: "var(--canvas)",
          color: "var(--text-secondary)",
        }}
      >
        <div className="flex items-center gap-2">
          <span>© AYUSH</span>
          <span className="opacity-30">/</span>
          <span className="opacity-60">{new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <a 
            href="https://github.com/tonystalker" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            github
          </a>
          <a 
            href="https://x.com/TonyStalkerr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            x / twitter
          </a>
          <a 
            href="https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            linkedin
          </a>
          <a 
            href="mailto:707ayushtripathi@gmail.com" 
            className="hover:text-[var(--accent)] transition-colors"
          >
            email
          </a>
        </div>
      </div>
    </footer>
  );
}

export const DoorScene = AyushTypographyFooter;
