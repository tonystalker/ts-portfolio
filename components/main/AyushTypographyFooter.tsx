"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export function AyushTypographyFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // ── 1. Check WebGL Support ──────────────────────────────────────────────
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

    // ── 2. Scene, Camera, Renderer ──────────────────────────────────────────
    const scene = new THREE.Scene();
    // Deep dark backdrop matching the reference video (#08080a)
    scene.background = new THREE.Color(0x070709);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.8);
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
    renderer.toneMappingExposure = 1.15;

    // ── 3. Back Shadow-Receiving Wall ───────────────────────────────────────
    // Rich crimson wall that receives the long silhouette shadows from the letters
    const wallGeo = new THREE.PlaneGeometry(36, 24);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x361014, // Warm deep crimson matching reference video
      roughness: 0.88,
      metalness: 0.05,
    });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.z = 0;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // ── 4. Soft Ambient & Front Fill Lighting ────────────────────────────────
    // Ambient light giving warm red baseline visibility
    const ambientLight = new THREE.AmbientLight(0x361215, 0.75);
    scene.add(ambientLight);

    // Front soft fill light so letter faces and serifs are clearly legible across entire width
    const frontFill = new THREE.DirectionalLight(0xcc4448, 1.25);
    frontFill.position.set(0, 1.5, 5.5);
    frontFill.castShadow = false; // Does not interfere with mascot's dynamic shadows
    scene.add(frontFill);

    // ── 5. The Hanging Interactive Light Source (Mascot Point Light) ────────
    // Red glowing point light that casts the sweeping perspective shadows
    const pointLight = new THREE.PointLight(0xff3322, 26, 16, 1.4);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    pointLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    pointLight.shadow.camera.near = 0.15;
    pointLight.shadow.camera.far = 18;
    pointLight.shadow.bias = -0.0002;
    pointLight.shadow.radius = 1.6; // Crisp, cinematic silhouette shadow edges
    scene.add(pointLight);

    // ── 6. 3D Hanging Mascot / Charm ────────────────────────────────────────
    const mascotGroup = new THREE.Group();
    scene.add(mascotGroup);

    // Procedural 2D Shape of the cute Backdoor ghost/mascot
    const mw = 0.28;
    const mh = 0.35;
    const mascotShape = new THREE.Shape();
    mascotShape.moveTo(-mw, -mh * 0.45);
    // Left rounded side
    mascotShape.quadraticCurveTo(-mw * 1.08, mh * 0.25, -mw * 0.72, mh * 0.72);
    // Head dome
    mascotShape.bezierCurveTo(-mw * 0.4, mh * 1.08, mw * 0.4, mh * 1.08, mw * 0.72, mh * 0.72);
    // Right rounded side
    mascotShape.quadraticCurveTo(mw * 1.08, mh * 0.25, mw, -mh * 0.45);
    // Bottom cute ghost ripples / feet (3 scallops)
    mascotShape.quadraticCurveTo(mw * 0.72, -mh * 0.28, mw * 0.42, -mh * 0.45);
    mascotShape.quadraticCurveTo(mw * 0.14, -mh * 0.28, -mw * 0.14, -mh * 0.45);
    mascotShape.quadraticCurveTo(-mw * 0.42, -mh * 0.28, -mw * 0.72, -mh * 0.45);
    mascotShape.quadraticCurveTo(-mw * 0.88, -mh * 0.38, -mw, -mh * 0.45);

    const mascotGeo = new THREE.ExtrudeGeometry(mascotShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.035,
      bevelSegments: 4,
      curveSegments: 16,
    });
    mascotGeo.center();

    // Solid vibrant red plush material that NEVER washes out
    const mascotMat = new THREE.MeshBasicMaterial({
      color: 0xdb2424, // Exact plush red from the video
    });
    const mascotMesh = new THREE.Mesh(mascotGeo, mascotMat);
    mascotGroup.add(mascotMesh);

    // Cute white pill eyes
    const eyeGeo = new THREE.CapsuleGeometry(0.024, 0.052, 8, 12);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.082, 0.04, 0.135);
    mascotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.082, 0.04, 0.135);
    mascotGroup.add(rightEye);

    // Cute curved smile
    const smileCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.048, -0.042, 0.135),
      new THREE.Vector3(0, -0.08, 0.135),
      new THREE.Vector3(0.048, -0.042, 0.135)
    );
    const smileGeo = new THREE.TubeGeometry(smileCurve, 12, 0.009, 6, false);
    const smileMesh = new THREE.Mesh(smileGeo, eyeMat);
    mascotGroup.add(smileMesh);


    // ── 7. Hanging Cord / String ────────────────────────────────────────────
    const anchorY = 3.4; // Top of viewport in world units
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xaaaaaa,
      transparent: true,
      opacity: 0.75,
      linewidth: 1.5,
    });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, anchorY, 0.4),
      new THREE.Vector3(0, 0.7, 0.75),
    ]);
    const hangingCord = new THREE.Line(lineGeo, lineMat);
    scene.add(hangingCord);

    // ── 8. Serif 3D "AYUSH" Typography ──────────────────────────────────────
    let textMesh: THREE.Mesh | null = null;
    const textGroup = new THREE.Group();
    scene.add(textGroup);

    // High-contrast warm terracotta-crimson editorial material matching Backdoor
    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0xa43639, // Beautiful terracotta-red base
      roughness: 0.35,
      metalness: 0.12,
    });

    const fontLoader = new FontLoader();
    // Load high-end classical serif typeface
    fontLoader.load("/fonts/droid_serif_bold.typeface.json", (font: Font) => {
      const baseSize = 1.05;
      const textGeo = new TextGeometry("AYUSH", {
        font,
        size: baseSize,
        depth: 0.28, // Deep architectural extrusion for realistic side shadows
        curveSegments: 16,
        bevelEnabled: true,
        bevelThickness: 0.038,
        bevelSize: 0.022,
        bevelOffset: 0,
        bevelSegments: 4,
      });

      textGeo.computeBoundingBox();
      textGeo.center();

      textMesh = new THREE.Mesh(textGeo, textMaterial);
      // Positioned below the resting mascot, raised slightly off the back wall
      textMesh.position.set(0, -0.65, 0.35);
      textMesh.castShadow = true;
      textMesh.receiveShadow = true;
      textGroup.add(textMesh);

      adjustTextScale();
    });

    const adjustTextScale = () => {
      if (!textMesh || !container) return;
      const currentWidth = container.clientWidth;
      // Proportional width: spans ~70% on desktop, ~85% on mobile (like "BACKDOOR" in video)
      const targetAspect = currentWidth < 640 ? 0.86 : currentWidth < 1024 ? 0.76 : 0.68;
      const fovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      textMesh.geometry.computeBoundingBox();
      const bbox = textMesh.geometry.boundingBox;
      if (bbox) {
        const textWidth = bbox.max.x - bbox.min.x;
        const desiredScale = (visibleWidth * targetAspect) / textWidth;
        // Restrained clamp so it never overflows
        const clampedScale = Math.min(desiredScale, 1.6);
        textMesh.scale.set(clampedScale, clampedScale, clampedScale);
      }
    };

    // ── 9. Pendulum Physics & Mouse Drag Simulation ─────────────────────────
    // Natural pendulum resting coordinates
    const restX = 0;
    const restY = 0.65;
    const restZ = 0.75;

    let mascotX = restX;
    let mascotY = restY;
    let mascotZ = restZ;

    let velX = 0;
    let velY = 0;

    let mouseWorldX = 0;
    let mouseWorldY = 0;
    let dragging = false;
    let pointerHovered = false;

    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), -restZ);

    const updateMouseWorldPos = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouseNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouseNDC, camera);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, intersection);
      if (intersection) {
        mouseWorldX = intersection.x;
        mouseWorldY = intersection.y;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      updateMouseWorldPos(e.clientX, e.clientY);
      // Check if clicked close to mascot
      const dist = Math.hypot(mouseWorldX - mascotX, mouseWorldY - mascotY);
      if (dist < 0.65) {
        dragging = true;
        setIsDragging(true);
        setHasInteracted(true);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      updateMouseWorldPos(e.clientX, e.clientY);
      setHasInteracted(true);
      pointerHovered = true;

      const dist = Math.hypot(mouseWorldX - mascotX, mouseWorldY - mascotY);
      if (container) {
        if (dragging) {
          container.style.cursor = "grabbing";
        } else if (dist < 0.65) {
          container.style.cursor = "grab";
        } else {
          container.style.cursor = "default";
        }
      }
    };

    const onPointerUp = () => {
      dragging = false;
      setIsDragging(false);
      if (container) {
        container.style.cursor = "default";
      }
    };

    const onPointerLeave = () => {
      dragging = false;
      pointerHovered = false;
      setIsDragging(false);
      if (container) {
        container.style.cursor = "default";
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerLeave);

    // ── 10. 60 FPS Physics Simulation Loop ──────────────────────────────────
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      if (!prefersReducedMotion) {
        if (dragging) {
          // Direct drag tracking with boundary clamp
          const targetX = THREE.MathUtils.clamp(mouseWorldX, -3.2, 3.2);
          const targetY = THREE.MathUtils.clamp(mouseWorldY, -0.3, 2.0);

          velX = (targetX - mascotX) / dt;
          velY = (targetY - mascotY) / dt;

          mascotX = targetX;
          mascotY = targetY;
        } else {
          // Pendulum spring physics towards resting cord position
          let forceX = 0;
          let forceY = 0;

          // If pointer is moving nearby, gentle magnetic pull
          if (pointerHovered) {
            const pullTargetX = THREE.MathUtils.clamp(mouseWorldX * 0.7, -2.4, 2.4);
            const pullTargetY = THREE.MathUtils.clamp(restY + (mouseWorldY - restY) * 0.35, 0.2, 1.4);
            forceX += (pullTargetX - mascotX) * 14.0;
            forceY += (pullTargetY - mascotY) * 12.0;
          } else {
            // Natural resting pendulum spring
            forceX += (restX - mascotX) * 18.0;
            forceY += (restY - mascotY) * 16.0;
          }

          // Gravity and air drag
          forceY -= 4.0; // Subtle gravity
          velX = (velX + forceX * dt) * 0.94;
          velY = (velY + forceY * dt) * 0.92;

          mascotX += velX * dt;
          mascotY += velY * dt;

          // Clamp so mascot doesn't sink beneath text
          if (mascotY < -0.2) {
            mascotY = -0.2;
            velY = -velY * 0.3;
          }
        }
      } else {
        mascotX = restX;
        mascotY = restY;
      }

      // Update Mascot Group position and banking tilt
      mascotGroup.position.set(mascotX, mascotY, mascotZ);
      // Mascot rotates into the direction of velocity (like a swinging pendulum)
      mascotGroup.rotation.z = THREE.MathUtils.clamp(-velX * 0.025, -0.45, 0.45);
      mascotGroup.rotation.y = THREE.MathUtils.clamp(velX * 0.015, -0.3, 0.3);

      // Light source emanates directly from the mascot center
      pointLight.position.set(mascotX, mascotY, mascotZ + 0.15);

      // Update Hanging String cord endpoints
      const linePositions = hangingCord.geometry.attributes.position as THREE.BufferAttribute;
      if (linePositions) {
        // Anchor top
        linePositions.setXYZ(0, 0, anchorY, 0.4);
        // Mascot top head
        linePositions.setXYZ(1, mascotX, mascotY + mh * 0.52, mascotZ);
        linePositions.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // ── 11. Window Resize ───────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      adjustTextScale();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);
      renderer.dispose();
    };
  }, []);

  return (
    <footer 
      className="w-full relative overflow-hidden select-none border-t"
      style={{
        background: "#070709",
        borderColor: "var(--line)",
      }}
      aria-label="Interactive AYUSH Typography Footer with swinging red mascot"
    >
      {/* ── Top Footer Navigation (Quiet editorial columns matching Backdoor) ── */}
      <div 
        className="w-full max-w-[1180px] mx-auto pt-16 sm:pt-20 pb-8 px-6 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-[12px] font-mono border-b relative z-20"
        style={{ borderColor: "rgba(255, 255, 255, 0.07)" }}
      >
        {/* Column 1: Navigation */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--accent)" }}>
            Navigation
          </span>
          <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            About / Story
          </Link>
          <Link href="/projects" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Selected Work
          </Link>
          <Link href="/blog" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Notes from the build
          </Link>
          <Link href="/reads" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Worth keeping open
          </Link>
        </div>

        {/* Column 2: Systems & AI Projects */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-secondary)" }}>
            Systems
          </span>
          <a href="https://github.com/tonystalker/voiceflow" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Voiceflow (Local Voice AI)
          </a>
          <a href="https://flow-desk-lemon-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            FlowDesk (Multi-Agent Support)
          </a>
          <a href="https://github.com/tonystalker/CodeSentinel" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            CodeSentinel (E2B Sandbox PRs)
          </a>
          <a href="https://github.com/tonystalker/Memoris" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Memoris (Agent Swarm Memory)
          </a>
        </div>

        {/* Column 3: Connect */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-secondary)" }}>
            Connect
          </span>
          <a href="https://github.com/tonystalker" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            GitHub (tonystalker)
          </a>
          <a href="https://x.com/TonyStalkerr" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            X / Twitter (@TonyStalkerr)
          </a>
          <a href="https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            LinkedIn
          </a>
          <a href="mailto:707ayushtripathi@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
            Email (Direct)
          </a>
        </div>

        {/* Column 4: Status & Thesis */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-secondary)" }}>
            Status
          </span>
          <span className="text-[var(--text-primary)] font-medium">
            Move fast. Make it hold.
          </span>
          <span className="text-[var(--text-secondary)]">
            IIT (BHU) Varanasi · India
          </span>
          <span className="text-[var(--text-secondary)]">
            UTC+5:30
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
            <span className="text-[var(--accent)] font-medium">Open to opportunities</span>
          </div>
        </div>
      </div>

      {/* ── 3D Viewport: Serif "AYUSH" Typography with Swinging Mascot & Dynamic Shadows ── */}
      <div 
        ref={containerRef} 
        className="w-full relative h-[56vh] sm:h-[68vh] flex items-center justify-center overflow-hidden touch-none"
        style={{
          background: "#070709",
        }}
      >
        {webGLSupported ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-label="3D Serif AYUSH typography illuminated by swinging red mascot with dynamic perspective shadows"
          />
        ) : (
          /* Non-WebGL Fallback */
          <div className="w-full h-full flex items-center justify-center relative bg-[#070709]">
            <h2 
              className="text-[12vw] sm:text-[10vw] font-serif font-bold uppercase tracking-tight select-none leading-none text-center"
              style={{
                color: "#2a1a1c",
                fontFamily: "Georgia, serif",
                textShadow: "0 10px 40px rgba(255, 59, 48, 0.35)",
              }}
            >
              AYUSH
            </h2>
          </div>
        )}

        {/* Interaction Hint Badge */}
        {!hasInteracted && (
          <div 
            className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(18, 12, 14, 0.85)",
              border: "1px solid rgba(255, 59, 48, 0.3)",
              backdropFilter: "blur(12px)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span className="w-2 h-2 rounded-full inline-block animate-ping" style={{ background: "#ff3b30" }} />
            <span className="text-[11px]" style={{ color: "#f0eee9" }}>
              Drag or hover the red mascot to swing light & shadows
            </span>
          </div>
        )}

        {/* Dragging state indicator */}
        {isDragging && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20 text-[10px] font-mono uppercase tracking-wider text-red-400 opacity-75">
            Dragging light source
          </div>
        )}
      </div>

      {/* ── Minimal Bottom Edge Bar ── */}
      <div 
        className="w-full border-t py-4 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono relative z-20"
        style={{
          borderColor: "rgba(255, 255, 255, 0.06)",
          background: "#070709",
          color: "rgba(240, 238, 233, 0.45)",
        }}
      >
        <div className="flex items-center gap-2">
          <span>© 2026 Ayush Tripathi</span>
          <span className="opacity-30">·</span>
          <span>Crafted with Three.js & Next.js</span>
        </div>

        <div className="flex items-center gap-6">
          <span>Terms</span>
          <span>Privacy</span>
          <span style={{ color: "var(--accent)" }}>Move fast. Make it hold.</span>
        </div>
      </div>
    </footer>
  );
}

export const DoorScene = AyushTypographyFooter;
