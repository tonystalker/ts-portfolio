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
  const isInViewportRef = useRef(false);   // ref so animate() always reads live value
  const [isInViewport, setIsInViewport] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // ── 1. Intersection Observer for Performance (Section 8 of revise.md) ───
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInViewport(visible);
        isInViewportRef.current = visible;   // keep ref in sync for animate() loop
      },
      { rootMargin: "300px 0px 300px 0px", threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // ── 2. Three.js Sculptural "Ayush" Scene ─────────────────────────────────
  useEffect(() => {
    if (!isInViewport) return;

    // Check WebGL Support
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

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0c);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    camera.lookAt(0, 0, 0);

    const isMobile = width < 768;

    // Render DPR: capped at 1.5 on desktop, 1.0-1.25 on mobile (revise.md Section 8)
    const maxDpr = isMobile ? 1.25 : 1.5;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // ── Back Shadow-Catching Charcoal Wall ──────────────────────────────────
    const wallGeo = new THREE.PlaneGeometry(36, 24);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f12,
      roughness: 0.92,
      metalness: 0.08,
    });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.z = -0.1;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // ── Balanced Ambient & Directional Fill: Sculpted Grey-Silver Ayush ──
    const ambientLight = new THREE.AmbientLight(0x383844, 1.8);
    scene.add(ambientLight);

    const fillLight = new THREE.DirectionalLight(0xb4b4c4, 1.15);
    fillLight.position.set(0, 2.8, 6.0);
    fillLight.castShadow = false;
    scene.add(fillLight);

    // ── 3D Sculptural "Ayush" Typography ────────────────────────────────────
    let textMesh: THREE.Mesh | null = null;
    const textGroup = new THREE.Group();
    scene.add(textGroup);

    // Materials: Distinct, lustrous Grey-Silver face + brushed graphite/gunmetal depth
    const faceMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8c8d2,      // True refined cool grey-silver
      roughness: 0.20,      // Smooth metallic surface catching silver sheen
      metalness: 0.82,      // High metalness for authentic silver luster
    });
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: 0x565662,      // Brushed gunmetal/graphite grey-silver (visible 3D depth)
      roughness: 0.40,
      metalness: 0.70,
    });
    const materials = [faceMaterial, sideMaterial];

    const fontLoader = new FontLoader();
    fontLoader.load("/fonts/droid_serif_bold.typeface.json", (font: Font) => {
      const baseSize = 1.15;
      const textGeo = new TextGeometry("Ayush", {
        font,
        size: baseSize,
        depth: 0.40,            // Monumental 3D structural block depth!
        curveSegments: 18,
        bevelEnabled: true,
        bevelThickness: 0.045,  // Crisp faceted 3D bevels
        bevelSize: 0.026,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      textGeo.computeBoundingBox();
      textGeo.center();
      textMesh = new THREE.Mesh(textGeo, materials);
      textMesh.position.set(0, -0.15, 0.35);
      textMesh.castShadow = true;
      textMesh.receiveShadow = true;
      textGroup.add(textMesh);
      adjustTextScale();
    });

    const adjustTextScale = () => {
      if (!textMesh || !container) return;
      const currentWidth = container.clientWidth;
      const targetAspect = currentWidth < 640 ? 0.88 : currentWidth < 1024 ? 0.78 : 0.72;
      const fovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      textMesh.geometry.computeBoundingBox();
      const bbox = textMesh.geometry.boundingBox;
      if (bbox) {
        const textWidth = bbox.max.x - bbox.min.x;
        const desiredScale = (visibleWidth * targetAspect) / textWidth;
        textMesh.scale.setScalar(Math.min(desiredScale, 1.75));
      }
    };

    // ── Hanging Person Character Mesh ──────────────────────────────────────
    const textureLoader = new THREE.TextureLoader();
    const charTexture = textureLoader.load("/hanging_character.png");
    charTexture.colorSpace = THREE.SRGBColorSpace;
    charTexture.generateMipmaps = true;
    charTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Plane geometry: 2.80 wide x 2.80 tall (scaled for prominent, balanced presence)
    const CHAR_SIZE = 2.80;
    const charGeo = new THREE.PlaneGeometry(CHAR_SIZE, CHAR_SIZE);
    // Shift pivot: in the illustration, the rope is tied around the boots at ~16% from top
    // Top of plane is +CHAR_SIZE/2 = +1.40. 16% from top = 1.40 - (0.16 * 2.80) = +0.952.
    // Shifting geometry by -0.95 places the boots tie point right at (0, 0, 0)!
    charGeo.translate(0, -0.95, 0);

    const charMat = new THREE.MeshStandardMaterial({
      map: charTexture,
      transparent: true,
      alphaTest: 0.15,
      roughness: 0.65,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });
    const charMesh = new THREE.Mesh(charGeo, charMat);
    charMesh.castShadow = true;
    scene.add(charMesh);

    // Custom depth material so cast shadow matches character silhouette
    charMesh.customDepthMaterial = new THREE.MeshDepthMaterial({
      depthPacking: THREE.RGBADepthPacking,
      map: charTexture,
      alphaTest: 0.2,
    });

    // ── Short & Stretchable Rope Parameters ─────────────────────────────────
    const ANCHOR_X = 0;
    const ANCHOR_Y = 2.75;             // ceiling anchor in world-space
    const ROPE_REST_LEN = 1.20;         // tuned rope length so larger mascot hangs gracefully across letters
    const LAMP_Z = 1.4;                // character sits in front of text plane
    const MIN_ROPE_LEN = 0.65;          // compression limit
    const MAX_ROPE_LEN = 2.50;          // maximum elastic stretch limit
    const K_SPRING = 44.0;              // stretchable spring stiffness
    const DAMP_SPRING = 2.8;            // spring damping
    const G_EQUIV = 4.2;                // pendulum gravity
    const DAMP_SWING = 0.997;           // pendulum angular damping
    const MAX_ANGLE = Math.PI * 0.44;   // swing arc

    let ropeLen = ROPE_REST_LEN;        // current dynamic rope length (stretchable!)
    let ropeLenVel = 0.0;               // velocity of stretch (bouncy spring recoil!)
    let pendulumAngle = -0.22;          // radians from vertical
    let pendulumVel = 0.35;             // angular velocity
    let isDragging = false;
    let isHovering = false;
    let hoverTargetAngle = 0;
    let lastDragTime = performance.now();

    // Ceiling canopy & hook: dark industrial mount at ceiling
    const canopyGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.02, 16);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x3a3a42, roughness: 0.5, metalness: 0.7 });
    const canopyMesh = new THREE.Mesh(canopyGeo, canopyMat);
    canopyMesh.position.set(ANCHOR_X, ANCHOR_Y + 0.04, LAMP_Z);
    scene.add(canopyMesh);

    const hookGeo = new THREE.SphereGeometry(0.042, 8, 6);
    const hookMat = new THREE.MeshStandardMaterial({ color: 0x585862, roughness: 0.4, metalness: 0.8 });
    const hookMesh = new THREE.Mesh(hookGeo, hookMat);
    hookMesh.position.set(ANCHOR_X, ANCHOR_Y, LAMP_Z);
    scene.add(hookMesh);

    // ── Braided Hemp Rope (Twisted strands matching illustration rope) ──────
    const NUM_ROPE_POINTS = 36;
    const strand1Positions = new Float32Array(NUM_ROPE_POINTS * 3);
    const strand2Positions = new Float32Array(NUM_ROPE_POINTS * 3);

    const ropeGeo1 = new THREE.BufferGeometry();
    ropeGeo1.setAttribute("position", new THREE.BufferAttribute(strand1Positions, 3));
    const ropeMat1 = new THREE.LineBasicMaterial({ color: 0xb09262 }); // warm tan hemp
    const ropeMesh1 = new THREE.Line(ropeGeo1, ropeMat1);
    scene.add(ropeMesh1);

    const ropeGeo2 = new THREE.BufferGeometry();
    ropeGeo2.setAttribute("position", new THREE.BufferAttribute(strand2Positions, 3));
    const ropeMat2 = new THREE.LineBasicMaterial({ color: 0x6e5636 }); // darker shaded hemp
    const ropeMesh2 = new THREE.Line(ropeGeo2, ropeMat2);
    scene.add(ropeMesh2);

    // Luminous hover light attached to the hanging person (illuminates 3D letters)
    const personLight = new THREE.PointLight(0xffeed4, 5.8, 14, 1.4);
    personLight.castShadow = true;
    personLight.shadow.mapSize.width = isMobile ? 512 : 1024;
    personLight.shadow.mapSize.height = isMobile ? 512 : 1024;
    personLight.shadow.bias = -0.001;
    scene.add(personLight);

    // Update dynamic stretchable rope
    const updateRope = (bootsX: number, bootsY: number) => {
      const p1Attr = ropeGeo1.attributes.position as THREE.BufferAttribute;
      const p2Attr = ropeGeo2.attributes.position as THREE.BufferAttribute;

      const dx = bootsX - ANCHOR_X;
      const dy = bootsY - ANCHOR_Y;

      // When stretched (ropeLen > ROPE_REST_LEN), rope gets tauter; when slack, it sags
      const stretchAmount = ropeLen - ROPE_REST_LEN;
      const sagDepth = Math.max(0.03, 0.20 - stretchAmount * 0.25);

      for (let i = 0; i < NUM_ROPE_POINTS; i++) {
        const t = i / (NUM_ROPE_POINTS - 1);
        const omt = 1 - t;

        // Linear chord
        const chordX = ANCHOR_X + t * dx;
        const chordY = ANCHOR_Y + t * dy;

        // Subtle vertical hang drop from ceiling
        const hangX = -dx * 0.12 * omt * omt * t * 2.5;

        // Catenary sag (less sag when stretched)
        const sag = -sagDepth * Math.sin(Math.PI * t);

        // Relaxed natural wave (dampened when stretched)
        const waveX = (stretchAmount > 0.2 ? 0.005 : 0.02) * Math.sin(Math.PI * 2 * t) * omt;

        const cx = chordX + hangX + waveX;
        const cy = chordY + sag;
        const cz = LAMP_Z;

        // 3D twisted pair spiral: two strands intertwined around the rope axis
        const twistAngle = t * Math.PI * 12;
        const twistRadius = 0.012;
        const ox = Math.cos(twistAngle) * twistRadius;
        const oz = Math.sin(twistAngle) * twistRadius;

        p1Attr.setXYZ(i, cx + ox, cy, cz + oz);
        p2Attr.setXYZ(i, cx - ox, cy, cz - oz);
      }

      p1Attr.needsUpdate = true;
      p2Attr.needsUpdate = true;
    };

    // ── Drag & Stretch Interaction (drag anywhere to stretch, pull, and swing) ──
    const ptrToWorld = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1; // -1..1
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1); // +1 top, -1 bottom
      const fovRad = (camera.fov * Math.PI) / 180;
      const visH = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const visW = visH * camera.aspect;
      return {
        x: nx * (visW / 2),
        y: ny * (visH / 2),
      };
    };

    const onPointerEnter = () => {
      isHovering = true;
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      isHovering = true;
      lastDragTime = performance.now();
      pendulumVel = 0;
      ropeLenVel = 0;
      setHasInteracted(true);
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      isHovering = true;
      const wp = ptrToWorld(e.clientX, e.clientY);
      const dx = wp.x - ANCHOR_X;
      const dy = wp.y - ANCHOR_Y;

      // Sync CSS fallback position
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
        y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
      });

      if (isDragging) {
        const now = performance.now();
        const dt = Math.max((now - lastDragTime) / 1000, 0.001);
        lastDragTime = now;

        // Target pendulum angle on pull
        const targetAngle = THREE.MathUtils.clamp(
          Math.atan2(dx, -dy),
          -MAX_ANGLE,
          MAX_ANGLE
        );

        // Target stretchable length (distance from anchor minus distance to grabbed body part ~0.80)
        const dist = Math.sqrt(dx * dx + dy * dy);
        const targetLen = THREE.MathUtils.clamp(dist - 0.80, MIN_ROPE_LEN, MAX_ROPE_LEN);

        // Velocity capture for natural elastic release
        pendulumVel = (targetAngle - pendulumAngle) / dt;
        ropeLenVel = (targetLen - ropeLen) / dt;

        pendulumAngle = targetAngle;
        ropeLen = targetLen;
      } else {
        // Natural hover response: gentle sway towards the mouse position
        hoverTargetAngle = THREE.MathUtils.clamp(
          Math.atan2(dx, -dy) * 0.40,
          -MAX_ANGLE * 0.5,
          MAX_ANGLE * 0.5
        );
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    const onPointerLeave = () => {
      isDragging = false;
      isHovering = false;
      hoverTargetAngle = 0;
      container.style.cursor = "grab";
    };

    container.style.cursor = "grab";
    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerdown",  onPointerDown);
    container.addEventListener("pointermove",  onPointerMove);
    window.addEventListener("pointerup",       onPointerUp);
    container.addEventListener("pointerleave", onPointerLeave);

    // ── Animation Loop with Spring-Pendulum Physics ──────────────────────────
    let animationFrameId: number;
    let isRenderingActive = true;
    let lastTime = performance.now();

    const handleVisibilityChange = () => {
      isRenderingActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isRenderingActive || !isInViewportRef.current) return;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05); // cap at 50ms
      lastTime = now;

      if (!prefersReducedMotion) {
        if (!isDragging) {
          // 1. Stretchable Spring physics (Hooke's Law with damping)
          const stretchDelta = ropeLen - ROPE_REST_LEN;
          const springAcc = -K_SPRING * stretchDelta - DAMP_SPRING * ropeLenVel;
          ropeLenVel += springAcc * dt;
          ropeLen += ropeLenVel * dt;
          ropeLen = THREE.MathUtils.clamp(ropeLen, MIN_ROPE_LEN, MAX_ROPE_LEN);

          // 2. Pendulum angular swing physics: α = -(g / L) * sin(θ)
          const alpha = -(G_EQUIV / Math.max(ropeLen, 0.5)) * Math.sin(pendulumAngle);
          // Natural hover torque: gently swings character & light toward cursor when hovering
          const hoverTorque = isHovering ? (hoverTargetAngle - pendulumAngle) * 5.5 : 0;
          pendulumVel = (pendulumVel + (alpha + hoverTorque) * dt) * (isHovering ? 0.985 : DAMP_SWING);
          pendulumAngle += pendulumVel * dt;
          pendulumAngle = THREE.MathUtils.clamp(pendulumAngle, -MAX_ANGLE, MAX_ANGLE);
        }
      }

      // Boots position (where rope attaches to the upside-down person)
      const bootsX = ANCHOR_X + ropeLen * Math.sin(pendulumAngle);
      const bootsY = ANCHOR_Y - ropeLen * Math.cos(pendulumAngle);

      // Character mesh position and rotation (pivoting from boots)
      charMesh.position.set(bootsX, bootsY, LAMP_Z);
      charMesh.rotation.z = -pendulumAngle;

      // Rope reaches from ceiling hook down to the boots
      updateRope(bootsX, bootsY);

      // Light hovers at the person's chest / head (~1.85 units below boots)
      const headOffset = 1.85;
      const lightX = bootsX - headOffset * Math.sin(-pendulumAngle);
      const lightY = bootsY - headOffset * Math.cos(-pendulumAngle);
      personLight.position.set(lightX, lightY, LAMP_Z + 0.3);

      // Ayush 3D typography is strictly fixed: no rotation, no tilt, completely solid

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // ── Resize Listener ──────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      width  = container.clientWidth;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      adjustTextScale();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup",      onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);
      renderer.dispose();
      wallGeo.dispose();
      wallMat.dispose();
      ropeGeo1.dispose();
      ropeMat1.dispose();
      ropeGeo2.dispose();
      ropeMat2.dispose();
      canopyGeo.dispose();
      canopyMat.dispose();
      hookGeo.dispose();
      hookMat.dispose();
      charGeo.dispose();
      charMat.dispose();
      charTexture.dispose();
      faceMaterial.dispose();
      sideMaterial.dispose();
    };
  }, [isInViewport]);

  return (
    <footer 
      className="w-full relative overflow-hidden select-none border-t"
      style={{
        background: "var(--canvas)",
        borderColor: "var(--line)",
      }}
      aria-label="Ayush Typography Footer"
    >
      {/* ── 3D Viewport: Sculptural "Ayush" Typography ───────────────────────── */}
      <div 
        ref={containerRef} 
        className="w-full relative h-[52vh] sm:h-[65vh] flex items-center justify-center overflow-hidden touch-none"
        style={{
          background: "#0a0a0c",
        }}
      >
        {webGLSupported ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-label="3D Sculptural Ayush typography illuminated by moving spotlight"
          />
        ) : (
          /* Non-WebGL Fallback: Enormous CSS text with moving light mask per Section 7 */
          <div className="w-full h-full flex items-center justify-center relative bg-[#0a0a0c] overflow-hidden">
            <h2 
              className="font-bold select-none leading-none text-center"
              style={{
                fontSize: "clamp(5rem, 25vw, 16rem)",
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.03em",
                background: `radial-gradient(ellipse 45% 55% at ${mousePos.x}% 60%, #ffffff 0%, #d2d2dc 32%, #7e7e8c 64%, #1e1e24 90%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 35px rgba(220, 220, 235, 0.25)",
                animation: "lamp-swing 4s ease-in-out infinite",
              }}
            >
              Ayush
            </h2>
            <style>{`
              @keyframes lamp-swing {
                0%   { filter: drop-shadow(0 0 20px rgba(200, 200, 220, 0.25)); }
                50%  { filter: drop-shadow(0 0 35px rgba(240, 240, 255, 0.45)); }
                100% { filter: drop-shadow(0 0 20px rgba(200, 200, 220, 0.25)); }
              }
            `}</style>
          </div>
        )}

        {/* Initial Cue: drag to light Ayush (fades after first interaction per Section 7) */}
        {!hasInteracted && (
          <div 
            className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(24, 24, 24, 0.85)",
              border: "1px solid var(--line-strong)",
              backdropFilter: "blur(12px)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-ping" style={{ background: "var(--accent)" }} />
            <span className="text-[11px]" style={{ color: "var(--text-primary)" }}>
              hover or pull character · light Ayush
            </span>
          </div>
        )}
      </div>

      {/* ── Subdued Bottom Bar ── */}
      <div 
        className="w-full border-t py-4 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono relative z-20"
        style={{
          borderColor: "var(--line)",
          background: "var(--canvas)",
          color: "var(--text-muted)",
        }}
      >
        <div className="flex items-center gap-2">
          <span>© 2026 Ayush Tripathi</span>
          <span className="opacity-30">·</span>
          <span>Crafted with Three.js &amp; Next.js</span>
        </div>

        <div className="flex items-center gap-6">
          <span style={{ color: "var(--text-primary)" }}>Move fast. Make it hold.</span>
        </div>
      </div>
    </footer>
  );
}

export const DoorScene = AyushTypographyFooter;
