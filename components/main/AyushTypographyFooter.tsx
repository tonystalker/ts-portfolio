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
    scene.background = new THREE.Color(0x070709);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 700;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
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

    // ── 2. Background Receiving Wall & Floor ──────────────────────────────────
    // The back wall receives the dynamic shadow of the giant extruded AYUSH letters
    const wallGeometry = new THREE.PlaneGeometry(30, 20);
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c0d10,
      roughness: 0.92,
      metalness: 0.08,
    });
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.z = -0.55;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Subtle ground plane
    const floorGeometry = new THREE.PlaneGeometry(30, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.95,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.2;
    floor.position.z = 2.0;
    floor.receiveShadow = true;
    scene.add(floor);

    // ── 3. Base & Cinematic Lighting ──────────────────────────────────────────
    // Low ambient fill so AYUSH is always readable even when the light is far away
    const ambientLight = new THREE.AmbientLight(0x141822, 0.42);
    scene.add(ambientLight);

    // Subtle cool fill from opposite corner
    const coolFill = new THREE.DirectionalLight(0x1a2638, 0.25);
    coolFill.position.set(-5, 4, 3);
    scene.add(coolFill);

    // Main Warm Moving Spotlight (casts physical shadows & highlights)
    const spotLight = new THREE.SpotLight(0xefb66d, 75, 16, Math.PI / 2.8, 0.75, 1.6);
    spotLight.position.set(0, 0.5, 2.8);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    spotLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 18;
    spotLight.shadow.bias = -0.0006;
    spotLight.shadow.radius = 3.2; // Soft PCF shadow edges
    scene.add(spotLight);

    // Moving point light for local highlight intensity and proximity glow
    const pointLight = new THREE.PointLight(0xffdca8, 30, 9, 1.8);
    pointLight.position.copy(spotLight.position);
    scene.add(pointLight);

    // Spotlight target at the center of the text
    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 0, 0);
    scene.add(lightTarget);
    spotLight.target = lightTarget;

    // Glowing light bulb indicator
    const bulbMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xfff0d0 })
    );
    bulbMesh.position.copy(spotLight.position);
    scene.add(bulbMesh);

    // Subtle warm halo ring around the light point
    const haloMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0xefb66d,
        transparent: true,
        opacity: 0.22,
      })
    );
    haloMesh.position.copy(spotLight.position);
    scene.add(haloMesh);

    // ── 4. 3D Extruded "AYUSH" Typography ─────────────────────────────────────
    let textMesh: THREE.Mesh | null = null;
    const textGroup = new THREE.Group();
    scene.add(textGroup);

    // Charcoal coated architectural material with fine bevel specular sheen
    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0x27282c,
      roughness: 0.38, // Allows sheen across beveled edges under spotlight
      metalness: 0.28,
    });

    const fontLoader = new FontLoader();
    fontLoader.load("/fonts/helvetiker_bold.typeface.json", (font: Font) => {
      // Calculate responsive font size to span ~80% of container width
      const baseSize = isMobile ? 0.95 : 1.7;
      const textGeo = new TextGeometry("AYUSH", {
        font,
        size: baseSize,
        depth: isMobile ? 0.35 : 0.55, // Extruded physical 3D depth
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.03,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      textGeo.computeBoundingBox();
      textGeo.center(); // Center text perfectly at (0, 0, 0)

      textMesh = new THREE.Mesh(textGeo, textMaterial);
      textMesh.position.set(0, isMobile ? -0.1 : 0, 0);
      textMesh.castShadow = true;
      textMesh.receiveShadow = true;
      textGroup.add(textMesh);

      // Auto-scale to fill viewport width neatly
      adjustTextScale();
    });

    const adjustTextScale = () => {
      if (!textMesh || !container) return;
      const currentWidth = container.clientWidth;
      // Target text width relative to viewport
      const targetAspect = currentWidth < 640 ? 0.92 : currentWidth < 1024 ? 0.86 : 0.80;
      const fovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      textMesh.geometry.computeBoundingBox();
      const bbox = textMesh.geometry.boundingBox;
      if (bbox) {
        const textWidth = bbox.max.x - bbox.min.x;
        const desiredScale = (visibleWidth * targetAspect) / textWidth;
        textMesh.scale.set(desiredScale, desiredScale, desiredScale);
      }
    };

    // ── 5. Cursor Interaction & Cinematic Inertial Lag ─────────────────────────
    let targetX = 0;
    let targetY = 0.5;
    let currentX = 0;
    let currentY = 0.5;

    const handlePointerMove = (clientX: number, clientY: number) => {
      setHasInteracted(true);
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      // Extrapolate light across the wide text plane
      targetX = THREE.MathUtils.clamp(normX * 4.8, -4.5, 4.5);
      targetY = THREE.MathUtils.clamp(normY * 2.2, -1.8, 2.0);
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

    // ── 6. Render Animation Loop ──────────────────────────────────────────────
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!prefersReducedMotion) {
        // 130ms buttery smooth inertial lag
        const lagFactor = 1 - Math.exp(-dt * 8.5);
        currentX += (targetX - currentX) * lagFactor;
        currentY += (targetY - currentY) * lagFactor;
      } else {
        currentX = targetX;
        currentY = targetY;
      }

      // Calculate light depth: slightly closer when near the edges to create dramatic grazing shadows
      const distFromCenter = Math.sqrt(currentX * currentX + currentY * currentY);
      const lightZ = 2.1 + Math.sin(Math.min(distFromCenter / 4.0, 1.0)) * 0.4;

      spotLight.position.set(currentX, currentY, lightZ);
      pointLight.position.copy(spotLight.position);
      bulbMesh.position.copy(spotLight.position);
      haloMesh.position.copy(spotLight.position);

      // Dynamically point light target toward center and slightly leading the movement
      lightTarget.position.set(currentX * 0.15, currentY * 0.15, 0);

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // ── 7. Responsive Resize ──────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 700;
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
        background: "#070709",
        borderColor: "var(--line)",
        minHeight: "80vh",
      }}
      aria-label="Interactive AYUSH Typography Footer"
    >
      {/* 3D Canvas / Typography Viewport */}
      <div 
        ref={containerRef} 
        className="w-full relative h-[78vh] sm:h-[86vh] flex items-center justify-center cursor-crosshair overflow-hidden"
      >
        {webGLSupported ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full block touch-none"
            aria-label="Giant 3D extruded AYUSH illuminated by interactive moving light"
          />
        ) : (
          /* Non-WebGL Fallback: Giant AYUSH text with layered 3D depth & moving light mask */
          <div 
            className="w-full h-full flex items-center justify-center relative bg-[#070709]"
            onMouseMove={(e) => {
              setHasInteracted(true);
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
              });
            }}
          >
            {/* Giant Display Typography */}
            <h2 
              className="text-[20vw] font-black uppercase tracking-tighter select-none leading-none text-center"
              style={{
                color: "#28292c",
                fontFamily: "var(--font-sans)",
                textShadow: `
                  0 1px 0 #3a3b40,
                  0 2px 0 #333438,
                  0 3px 0 #2c2d30,
                  0 4px 0 #242528,
                  0 5px 0 #1c1d20,
                  0 12px 24px rgba(0,0,0,0.8)
                `,
              }}
            >
              AYUSH
            </h2>

            {/* Draggable CSS Spotlight Radial Mask */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 320px at ${mousePos.x}% ${mousePos.y}%, rgba(239, 182, 109, 0.45) 0%, rgba(239, 182, 109, 0.1) 40%, transparent 70%)`,
                mixBlendMode: "color-dodge",
              }}
            />
          </div>
        )}

        {/* First-interaction prompt badge */}
        {!hasInteracted && (
          <div 
            className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full"
            style={{
              background: "rgba(12, 13, 16, 0.88)",
              border: "1px solid var(--line-strong)",
              backdropFilter: "blur(12px)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-ping" style={{ background: "var(--lamp)" }} />
            <span className="text-[11px] sm:text-[12px]" style={{ color: "var(--text-secondary)" }}>
              drag to light AYUSH
            </span>
          </div>
        )}
      </div>

      {/* Minimal Lower Edge Layout: Tiny metadata & subtle links outside the focal area */}
      <div 
        className="w-full border-t py-5 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono relative z-20"
        style={{
          borderColor: "var(--line)",
          background: "#070709",
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

// Export DoorScene alias for backward compatibility
export const DoorScene = AyushTypographyFooter;
