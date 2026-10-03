"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function DoorScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
    if (!gl) {
      setWebGLSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 1. Scene & Renderer Setup ─────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0b0b);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 650;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    // Camera is strictly static at eye level looking straight at the door
    camera.position.set(0, 0, 4.4);
    camera.lookAt(0, -0.05, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;

    // ── 2. Materials ──────────────────────────────────────────────────────────
    // Subtle cool ambient
    const ambientLight = new THREE.AmbientLight(0x181e28, 0.35);
    scene.add(ambientLight);

    // Wall material: dark plaster/brick with fine grain
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x101114,
      roughness: 0.95,
      metalness: 0.05,
    });

    // Dark worn painted timber for door frame & stiles
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x161719,
      roughness: 0.82,
      metalness: 0.08,
    });

    // Inset door panels: slightly deeper tone to enhance shadow contrast
    const panelMaterial = new THREE.MeshStandardMaterial({
      color: 0x131416,
      roughness: 0.88,
      metalness: 0.05,
    });

    // Brass hardware
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xb88e4c,
      roughness: 0.32,
      metalness: 0.88,
    });

    // Weathered iron/dark bronze for lamp shade
    const lampFixtureMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1d20,
      roughness: 0.6,
      metalness: 0.7,
    });

    // Lamp bulb
    const bulbMaterial = new THREE.MeshBasicMaterial({
      color: 0xffdfaa,
    });

    // ── 3. Back Wall & Floor ──────────────────────────────────────────────────
    const wallGeometry = new THREE.PlaneGeometry(10, 8);
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.z = -0.05;
    wall.receiveShadow = true;
    scene.add(wall);

    const floorGeometry = new THREE.PlaneGeometry(10, 4);
    const floor = new THREE.Mesh(floorGeometry, new THREE.MeshStandardMaterial({
      color: 0x0c0c0e,
      roughness: 0.9,
      metalness: 0.1,
    }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.45;
    floor.position.z = 1.0;
    floor.receiveShadow = true;
    scene.add(floor);

    // ── 4. Architectural Door Construction (Physical Panels & Relief) ─────────
    const doorGroup = new THREE.Group();

    // Outer Frame (Top, Left, Right casings)
    const frameDepth = 0.12;
    const frameWidth = 1.48;
    const frameHeight = 2.65;
    const frameThickness = 0.08;

    // Left post
    const leftPost = new THREE.Mesh(
      new THREE.BoxGeometry(frameThickness, frameHeight, frameDepth),
      woodMaterial
    );
    leftPost.position.set(-(frameWidth / 2 - frameThickness / 2), -0.15, 0.02);
    leftPost.castShadow = true;
    leftPost.receiveShadow = true;
    doorGroup.add(leftPost);

    // Right post
    const rightPost = new THREE.Mesh(
      new THREE.BoxGeometry(frameThickness, frameHeight, frameDepth),
      woodMaterial
    );
    rightPost.position.set(frameWidth / 2 - frameThickness / 2, -0.15, 0.02);
    rightPost.castShadow = true;
    rightPost.receiveShadow = true;
    doorGroup.add(rightPost);

    // Top header casing
    const topHeader = new THREE.Mesh(
      new THREE.BoxGeometry(frameWidth + 0.06, frameThickness, frameDepth + 0.02),
      woodMaterial
    );
    topHeader.position.set(0, frameHeight / 2 - 0.15 - frameThickness / 2, 0.03);
    topHeader.castShadow = true;
    topHeader.receiveShadow = true;
    doorGroup.add(topHeader);

    // Bottom threshold sill
    const threshold = new THREE.Mesh(
      new THREE.BoxGeometry(frameWidth + 0.04, 0.04, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x1f2024, roughness: 0.7, metalness: 0.2 })
    );
    threshold.position.set(0, -1.45, 0.06);
    threshold.receiveShadow = true;
    doorGroup.add(threshold);

    // Door Leaf Slab
    const doorWidth = 1.30;
    const doorHeight = 2.45;
    const doorDepth = 0.055;
    const doorLeaf = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth),
      woodMaterial
    );
    doorLeaf.position.set(0, -0.18, 0.01);
    doorLeaf.castShadow = true;
    doorLeaf.receiveShadow = true;
    doorGroup.add(doorLeaf);

    // Inset panels (4 distinct recessed rectangular panels)
    const panelW = 0.44;
    const panelH = 0.78;
    const panelDepth = 0.025;
    const panelPositions = [
      { x: -0.28, y: 0.42 }, // Top Left
      { x: 0.28, y: 0.42 },  // Top Right
      { x: -0.28, y: -0.65 }, // Bottom Left
      { x: 0.28, y: -0.65 },  // Bottom Right
    ];

    panelPositions.forEach((pos) => {
      // Recessed interior plate
      const panelMesh = new THREE.Mesh(
        new THREE.BoxGeometry(panelW, panelH, panelDepth),
        panelMaterial
      );
      panelMesh.position.set(pos.x, pos.y, 0.02);
      panelMesh.receiveShadow = true;
      panelMesh.castShadow = true;
      doorGroup.add(panelMesh);

      // Molded bevel border around each panel
      const bevelTop = new THREE.Mesh(new THREE.BoxGeometry(panelW + 0.02, 0.02, 0.015), woodMaterial);
      bevelTop.position.set(pos.x, pos.y + panelH / 2, 0.032);
      doorGroup.add(bevelTop);

      const bevelBtm = new THREE.Mesh(new THREE.BoxGeometry(panelW + 0.02, 0.02, 0.015), woodMaterial);
      bevelBtm.position.set(pos.x, pos.y - panelH / 2, 0.032);
      doorGroup.add(bevelBtm);

      const bevelLeft = new THREE.Mesh(new THREE.BoxGeometry(0.02, panelH, 0.015), woodMaterial);
      bevelLeft.position.set(pos.x - panelW / 2, pos.y, 0.032);
      doorGroup.add(bevelLeft);

      const bevelRight = new THREE.Mesh(new THREE.BoxGeometry(0.02, panelH, 0.015), woodMaterial);
      bevelRight.position.set(pos.x + panelW / 2, pos.y, 0.032);
      doorGroup.add(bevelRight);
    });

    // ── 5. Brass Hardware: Lock, Doorknob, Hinges & Nameplate ──────────────────
    // Doorknob rose plate
    const rosePlate = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.01, 24),
      brassMaterial
    );
    rosePlate.rotation.x = Math.PI / 2;
    rosePlate.position.set(0.48, -0.15, 0.042);
    doorGroup.add(rosePlate);

    // Spherical brass knob
    const knob = new THREE.Mesh(
      new THREE.SphereGeometry(0.032, 24, 24),
      brassMaterial
    );
    knob.position.set(0.48, -0.15, 0.075);
    knob.castShadow = true;
    doorGroup.add(knob);

    // Keyhole escutcheon
    const escutcheon = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.045, 0.008),
      brassMaterial
    );
    escutcheon.position.set(0.48, -0.23, 0.04);
    doorGroup.add(escutcheon);

    // Brass Hinges on the left side
    [-0.8, 0.6].forEach((yPos) => {
      const hinge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 0.08, 16),
        brassMaterial
      );
      hinge.position.set(-0.645, yPos, 0.045);
      hinge.castShadow = true;
      doorGroup.add(hinge);
    });

    // Physical Nameplate: AYUSH
    const plateWidth = 0.28;
    const plateHeight = 0.08;
    const plateGeometry = new THREE.BoxGeometry(plateWidth, plateHeight, 0.012);
    const plate = new THREE.Mesh(plateGeometry, brassMaterial);
    plate.position.set(0, 0.95, 0.045);
    plate.castShadow = true;
    doorGroup.add(plate);

    // Canvas texture for "AYUSH" etched on the brass plaque
    const textCanvas = document.createElement("canvas");
    textCanvas.width = 512;
    textCanvas.height = 160;
    const ctx = textCanvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#c29b4e";
      ctx.fillRect(0, 0, 512, 160);
      // Border
      ctx.strokeStyle = "#80622a";
      ctx.lineWidth = 10;
      ctx.strokeRect(10, 10, 492, 140);
      // Typography
      ctx.fillStyle = "#1e160a";
      ctx.font = "bold 64px 'Geist Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "10px";
      ctx.fillText("AYUSH", 256, 80);
    }
    const textTexture = new THREE.CanvasTexture(textCanvas);
    const textPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(plateWidth - 0.02, plateHeight - 0.015),
      new THREE.MeshBasicMaterial({ map: textTexture })
    );
    textPlate.position.set(0, 0.95, 0.052);
    doorGroup.add(textPlate);

    scene.add(doorGroup);

    // ── 6. Movable Hanging Lamp (Hanging from ceiling anchor) ──────────────────
    const ceilingAnchorY = 2.4;
    const lampGroup = new THREE.Group();

    // Cord line
    const cordMaterial = new THREE.LineBasicMaterial({ color: 0x222224 });
    const cordPoints = [new THREE.Vector3(0, ceilingAnchorY, 0), new THREE.Vector3(0, 1.4, 0.6)];
    const cordGeometry = new THREE.BufferGeometry().setFromPoints(cordPoints);
    const cordLine = new THREE.Line(cordGeometry, cordMaterial);
    scene.add(cordLine);

    // Shade fixture
    const shade = new THREE.Mesh(
      new THREE.ConeGeometry(0.18, 0.14, 24, 1, true),
      lampFixtureMaterial
    );
    shade.rotation.x = Math.PI; // point downwards
    shade.castShadow = true;
    lampGroup.add(shade);

    // Socket ring
    const socketRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16),
      brassMaterial
    );
    socketRing.position.y = 0.08;
    lampGroup.add(socketRing);

    // Bulb
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      bulbMaterial
    );
    bulb.position.y = -0.04;
    lampGroup.add(bulb);

    // Dominant warm light source
    const lampLight = new THREE.PointLight(0xefb66d, 35, 8.5, 1.8);
    lampLight.position.set(0, -0.06, 0);
    lampLight.castShadow = true;
    lampLight.shadow.mapSize.width = 1024;
    lampLight.shadow.mapSize.height = 1024;
    lampLight.shadow.bias = -0.001;
    lampLight.shadow.radius = 2.5;
    lampGroup.add(lampLight);

    // Secondary subtle downward spot to accentuate the door surface
    const downSpot = new THREE.SpotLight(0xefb66d, 15, 6, Math.PI / 2.6, 0.6, 1.5);
    downSpot.position.set(0, -0.06, 0);
    downSpot.target.position.set(0, -1, 0);
    lampGroup.add(downSpot);
    lampGroup.add(downSpot.target);

    scene.add(lampGroup);

    // ── 7. Interaction, Inertial Lag & Restrained Physics Sway ──────────────────
    let isDragging = false;
    let targetX = 0;
    let targetY = 1.35;
    let currentX = 0;
    let currentY = 1.35;
    let currentZ = 0.65;

    // Harmonic pendulum sway variables
    let swayAngleX = 0;
    let swayVelX = 0;
    let swayAngleY = 0;
    let swayVelY = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Raycast or proximity check to the lamp
      isDragging = true;
      setHasInteracted(true);
      (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
    };

    const updatePointerTarget = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      // Restrict target to believable arc above and in front of the door
      targetX = THREE.MathUtils.clamp(normX * 1.5, -1.15, 1.15);
      targetY = THREE.MathUtils.clamp(normY * 1.0 + 1.25, 0.85, 1.65);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      updatePointerTarget(e.clientX, e.clientY);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        // Inject physical release velocity based on offset from center
        swayVelX = (targetX - 0) * 4.2;
        swayVelY = (targetY - 1.35) * 3.5;
        (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const touch = e.touches[0];
      updatePointerTarget(touch.clientX, touch.clientY);
    };

    const domCanvas = renderer.domElement;
    domCanvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    domCanvas.addEventListener("touchmove", onTouchMove, { passive: true });

    // ── 8. Render & Animation Loop ────────────────────────────────────────────
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!prefersReducedMotion) {
        if (isDragging) {
          // 120-160ms inertial lag toward user drag position
          const lagFactor = 1 - Math.exp(-dt * 9.5);
          currentX += (targetX - currentX) * lagFactor;
          currentY += (targetY - currentY) * lagFactor;
          swayAngleX = (targetX - currentX) * 0.45;
          swayAngleY = (targetY - currentY) * 0.45;
        } else {
          // Damped harmonic oscillation settling to center rest
          const k = 16.0;   // Spring stiffness
          const c = 2.8;    // Damping coefficient

          const accelX = -k * (currentX - 0) - c * swayVelX;
          swayVelX += accelX * dt;
          currentX += swayVelX * dt;

          const accelY = -k * (currentY - 1.35) - c * swayVelY;
          swayVelY += accelY * dt;
          currentY += swayVelY * dt;

          swayAngleX = THREE.MathUtils.lerp(swayAngleX, swayVelX * 0.12, dt * 6);
          swayAngleY = THREE.MathUtils.lerp(swayAngleY, swayVelY * 0.12, dt * 6);
        }
      } else {
        currentX = 0;
        currentY = 1.35;
        swayAngleX = 0;
        swayAngleY = 0;
      }

      // Calculate physical pendulum arc depth
      // As lamp swings left or right, cord arc swings slightly forward/backward
      const cordLength = ceilingAnchorY - currentY;
      const maxCord = ceilingAnchorY - 0.85;
      currentZ = 0.55 + Math.sin(Math.min(Math.abs(currentX) / 1.5, 1.0)) * 0.18;

      // Update lamp position & tilt
      lampGroup.position.set(currentX, currentY, currentZ);
      lampGroup.rotation.z = -swayAngleX;
      lampGroup.rotation.x = swayAngleY;

      // Update cord line buffer geometry
      const cordPos = cordGeometry.attributes.position as THREE.BufferAttribute;
      cordPos.setXYZ(0, 0, ceilingAnchorY, 0.1);
      cordPos.setXYZ(1, currentX, currentY + 0.08, currentZ);
      cordPos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // ── 9. Resize Handling ──────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 650;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domCanvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      domCanvas.removeEventListener("touchmove", onTouchMove);
      renderer.dispose();
    };
  }, []);

  return (
    <footer 
      className="w-full relative overflow-hidden select-none border-t"
      style={{
        background: "#0b0b0b",
        borderColor: "var(--line)",
        minHeight: "75vh",
      }}
      aria-label="Interactive Door Footer"
    >
      <div 
        ref={containerRef} 
        className="w-full relative h-[70vh] sm:h-[80vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {webGLSupported ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full block touch-none"
            aria-label="Interactive 3D door scene with movable hanging lamp. Drag the lamp to illuminate the door."
          />
        ) : (
          /* Non-WebGL Fallback: Authored 2D architectural door + CSS radial light */
          <div className="relative w-full h-full flex items-center justify-center bg-[#0b0b0b]">
            <div 
              className="w-64 h-96 rounded-t-lg border-4 border-[#1c1d20] bg-[#141517] relative flex flex-col items-center justify-between p-6 shadow-2xl"
              style={{
                boxShadow: "0 0 80px rgba(239, 182, 109, 0.25)",
              }}
            >
              <div className="px-4 py-1 rounded bg-[#b88e4c] text-black font-mono font-bold text-[12px] tracking-widest">
                AYUSH
              </div>
              <div className="w-6 h-6 rounded-full bg-[#b88e4c] ml-auto mr-2 shadow" />
            </div>
            <div 
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(239, 182, 109, 0.28) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </div>
        )}

        {/* First-interaction prompt hint */}
        {!hasInteracted && (
          <div 
            className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full"
            style={{
              background: "rgba(17, 17, 17, 0.85)",
              border: "1px solid var(--line-strong)",
              backdropFilter: "blur(12px)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-ping" style={{ background: "var(--lamp)" }} />
            <span className="text-[11px] sm:text-[12px]" style={{ color: "var(--text-secondary)" }}>
              drag the light
            </span>
          </div>
        )}
      </div>

      {/* Quiet, low-contrast footer links outside the primary focal area */}
      <div 
        className="w-full border-t py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono relative z-20"
        style={{
          borderColor: "var(--line)",
          background: "#090909",
          color: "var(--text-secondary)",
        }}
      >
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Ayush Tripathi</span>
          <span className="opacity-40">·</span>
          <span className="opacity-75">Quiet technical editorial</span>
        </div>

        <div className="flex items-center gap-6">
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
