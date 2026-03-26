import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

export default function Printer3D() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(480, 480);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ── Lighting — white studio feel ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xddeeff, 0.6);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x0057FF, 1.0, 12);
    rimLight.position.set(-3, 3, -2);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0x00C2FF, 0.8, 8);
    accentLight.position.set(2, -1, 3);
    scene.add(accentLight);

    // ── Materials — white/light premium theme ──
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xF2F4F8,       // light cool gray
      metalness: 0.2,
      roughness: 0.3,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
    });

    const accentMat = new THREE.MeshPhysicalMaterial({
      color: 0x0057FF,
      metalness: 0.5,
      roughness: 0.4,
      emissive: 0x0057FF,
      emissiveIntensity: 0.25,
    });

    const darkPanelMat = new THREE.MeshPhysicalMaterial({
      color: 0x1E2A3A,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x0057FF,
      emissiveIntensity: 0.1,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xD0E4FF,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.6,
      opacity: 0.7,
      transparent: true,
    });

    const trayMat = new THREE.MeshPhysicalMaterial({
      color: 0xE4E8F0,
      metalness: 0.15,
      roughness: 0.4,
    });

    // ── Build printer group ──
    const printerGroup = new THREE.Group();

    // Main body
    const body = new THREE.Mesh(roundBox(2.8, 1.0, 2.0, 0.1), bodyMat);
    printerGroup.add(body);

    // Top scanner lid
    const lid = new THREE.Mesh(roundBox(2.7, 0.1, 1.9, 0.06), bodyMat);
    lid.position.set(0, 0.55, 0);
    printerGroup.add(lid);

    // Scanner glass (blue-tinted)
    const glass = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.02, 1.7), glassMat);
    glass.position.set(0, 0.61, 0);
    printerGroup.add(glass);

    // Control panel - dark
    const panel = new THREE.Mesh(roundBox(0.75, 0.12, 0.28, 0.03), darkPanelMat);
    panel.position.set(0.85, 0.22, 1.05);
    panel.rotation.x = -0.25;
    printerGroup.add(panel);

    // Screen glow strip
    const screenGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.55, 0.06),
      new THREE.MeshBasicMaterial({ color: 0x0057FF, transparent: true, opacity: 0.9 })
    );
    screenGlow.position.set(0.85, 0.27, 1.07);
    screenGlow.rotation.x = -0.25;
    printerGroup.add(screenGlow);

    // Paper output tray
    const tray = new THREE.Mesh(roundBox(1.9, 0.06, 0.55, 0.02), trayMat);
    tray.position.set(-0.05, -0.2, 1.28);
    printerGroup.add(tray);

    // Paper tray lip
    const trayLip = new THREE.Mesh(roundBox(1.9, 0.12, 0.04, 0.01), trayMat);
    trayLip.position.set(-0.05, -0.16, 1.54);
    printerGroup.add(trayLip);

    // Blue accent strip (front)
    const strip = new THREE.Mesh(new THREE.BoxGeometry(2.82, 0.04, 0.04), accentMat);
    strip.position.set(0, 0.18, 1.02);
    printerGroup.add(strip);

    // NI logo plate (front, subtle)
    const logoPlate = new THREE.Mesh(roundBox(0.3, 0.1, 0.02, 0.01),
      new THREE.MeshPhysicalMaterial({ color: 0x0057FF, emissive: 0x003BBF, emissiveIntensity: 0.4, metalness: 0.5, roughness: 0.3 })
    );
    logoPlate.position.set(-1.0, 0.18, 1.03);
    printerGroup.add(logoPlate);

    // Ventilation grille slots (right side)
    for (let i = 0; i < 5; i++) {
      const slot = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.36, 0.04),
        new THREE.MeshPhysicalMaterial({ color: 0xCDD2DC, metalness: 0.3, roughness: 0.5 })
      );
      slot.position.set(1.43, 0, -0.4 + i * 0.2);
      printerGroup.add(slot);
    }

    printerGroup.position.y = -0.2;
    scene.add(printerGroup);

    // ── Floating particles ──
    const particlePositions = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 9;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0x0057FF, size: 0.025, transparent: true, opacity: 0.5,
    }));
    scene.add(particles);

    // ── Mouse tracking ──
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ── Animation loop ──
    let time = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      time += 0.005;

      // Mouse-reactive rotation
      const targetRotY = mouseRef.current.x * 0.25;
      const targetRotX = mouseRef.current.y * 0.12;
      printerGroup.rotation.y += (targetRotY - printerGroup.rotation.y) * 0.04;
      printerGroup.rotation.x += (targetRotX - printerGroup.rotation.x) * 0.04;

      // Sine-wave floating
      printerGroup.position.y = -0.2 + Math.sin(time * 1.8) * 0.12;

      // Particle drift
      particles.rotation.y = time * 0.25;

      // Accent light pulse
      accentLight.intensity = 0.7 + Math.sin(time * 3.5) * 0.3;
      rimLight.intensity = 1.0 + Math.sin(time * 2.5 + 1) * 0.4;

      // Screen glow pulse
      screenGlow.material.opacity = 0.7 + Math.sin(time * 5) * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      ref={containerRef}
      className="w-full max-w-[480px] aspect-square mx-auto relative"
      style={{ cursor: "grab" }}
    />
  );
}

// Helper: Rounded extruded box geometry
function roundBox(w, h, d, r) {
  const shape = new THREE.Shape();
  const hw = w / 2 - r;
  const hh = h / 2 - r;

  shape.moveTo(-hw, -h / 2);
  shape.lineTo(hw, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -hh);
  shape.lineTo(w / 2, hh);
  shape.quadraticCurveTo(w / 2, h / 2, hw, h / 2);
  shape.lineTo(-hw, h / 2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, hh);
  shape.lineTo(-w / 2, -hh);
  shape.quadraticCurveTo(-w / 2, -h / 2, -hw, -h / 2);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: d, bevelEnabled: true, bevelSize: r * 0.5, bevelThickness: r * 0.5, bevelSegments: 3,
  });
  geometry.center();
  return geometry;
}