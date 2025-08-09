import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export default function RingReveal({ active = false, message = "Will you marry me?", onCelebrate }) {
  const ringRef = useRef();
  const outlineRef = useRef();
  const yesRef = useRef();
  const noRef = useRef();

  const [rotateReady, setRotateReady] = useState(false);
  const [hideRing, setHideRing] = useState(false);
  const [layout, setLayout] = useState(getLayout());

  // entrance animation
  const appearRef = useRef({ started: false, startTime: 0, duration: 900 });

 function getLayout() {
  const w = typeof window !== "undefined" ? window.innerWidth : 1024;
  const h = typeof window !== "undefined" ? window.innerHeight : 768;

  if (w <= 720 && h >= 1600) {
    // Tall mobile (720×1600)
    return {
      ringSize: 0.38,       // smaller than before
      ringTube: 0.025,      // thinner tube
      textFontSize: 0.065,
      buttonFontSize: 0.03,
      textY: 0.25,
      btnY: -0.14,
      yesX: -0.16,
      noX: 0.16,
      yesW: 0.22,
      noW: 0.26
    };
  } else if (w <= 480) {
    // Small mobile (iPhone XR)
    return {
      ringSize: 0.34,       // much smaller
      ringTube: 0.022,
      textFontSize: 0.055,
      buttonFontSize: 0.026,
      textY: 0.21,
      btnY: -0.12,
      yesX: -0.14,
      noX: 0.14,
      yesW: 0.18,
      noW: 0.22
    };
  } else {
    // Default desktop/tablet
    return {
      ringSize: 0.6,
      ringTube: 0.04,
      textFontSize: 0.065,
      buttonFontSize: 0.03,
      textY: 0.25,
      btnY: -0.15,
      yesX: -0.18,
      noX: 0.18,
      yesW: 0.22,
      noW: 0.27
    };
  }
}


  useEffect(() => {
    const handleResize = () => setLayout(getLayout());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setRotateReady(true), 1600);
      appearRef.current.started = true;
      appearRef.current.startTime = performance.now();
      setHideRing(false);
      return () => clearTimeout(timer);
    } else {
      setRotateReady(false);
      setHideRing(false);
      appearRef.current.started = false;
    }
  }, [active]);

  const handleClick = (choice) => {
    setHideRing(true);
    try {
      onCelebrate?.(choice);
    } catch (e) {
      console.error("onCelebrate handler threw:", e);
    }
  };

  useFrame((state) => {
    const now = performance.now();
    if (appearRef.current.started && ringRef.current && !hideRing) {
      const { startTime, duration } = appearRef.current;
      const t = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      const from = 0.18;
      const scale = from + (1 - from) * ease;
      ringRef.current.scale.set(scale, scale, scale);

      if (ringRef.current.material) {
        const emissive = 1.2 + ease * 1.2;
        if (ringRef.current.material.emissiveIntensity !== undefined) {
          ringRef.current.material.emissiveIntensity = emissive;
        } else {
          ringRef.current.material.emissive = new THREE.Color("#a020f0").multiplyScalar(Math.max(0.8, emissive / 2));
        }
        if (ringRef.current.material.transparent) {
          ringRef.current.material.opacity = 0.2 + ease * 0.8;
        }
      }

      if (outlineRef.current) {
        outlineRef.current.scale.set(1 + ease * 0.06, 1 + ease * 0.06, 1);
      }

      if (t >= 1) {
        appearRef.current.started = false;
      }
    }

    if (ringRef.current && rotateReady && !hideRing) {
      ringRef.current.rotation.y += 0.004;
    }

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.04;
    if (yesRef.current) yesRef.current.scale.set(pulse, pulse, pulse);
    if (noRef.current) noRef.current.scale.set(pulse, pulse, pulse);
  });

  useEffect(() => {
    if (ringRef.current) ringRef.current.visible = active && !hideRing;
    if (outlineRef.current) outlineRef.current.visible = active && !hideRing;
  }, [active, hideRing]);

  if (!active || hideRing) return null;

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={outlineRef} position={[0, 0, -0.01]} renderOrder={1} visible={false}>
        <torusGeometry args={[layout.ringSize * 1.06, layout.ringTube * 1.2, 16, 100]} />
        <meshBasicMaterial color="#a020f0" transparent opacity={0.12} />
      </mesh>

      <mesh ref={ringRef} renderOrder={2} scale={[0.18, 0.18, 0.18]}>
        <torusGeometry args={[layout.ringSize, layout.ringTube, 16, 100]} />
        <meshStandardMaterial
          emissive={new THREE.Color("#a020f0")}
          emissiveIntensity={1.2}
          color="#ffffff"
          toneMapped={false}
          transparent={true}
          opacity={1}
        />
      </mesh>

      <Text
        position={[0, layout.textY, 0]}
        fontSize={layout.textFontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineColor="#a020f0"
        outlineWidth={0.003}
      >
        {message}
      </Text>

      <mesh ref={yesRef} position={[layout.yesX, layout.btnY, 0]} onPointerDown={() => handleClick("yes")}>
        <boxGeometry args={[layout.yesW, 0.07, 0.015]} />
        <meshStandardMaterial color="#ff69b4" emissive="#a020f0" emissiveIntensity={0.7} />
        <Text fontSize={layout.buttonFontSize} position={[0, 0, 0.02]} color="#fff" anchorX="center" anchorY="middle">
          Yes ❤️
        </Text>
      </mesh>

      <mesh ref={noRef} position={[layout.noX, layout.btnY, 0]} onPointerDown={() => handleClick("forever")}>
        <boxGeometry args={[layout.noW, 0.07, 0.015]} />
        <meshStandardMaterial color="#a020f0" emissive="#ff69b4" emissiveIntensity={0.7} />
        <Text fontSize={layout.buttonFontSize} position={[0, 0, 0.02]} color="#fff" anchorX="center" anchorY="middle">
          Forever 💍
        </Text>
      </mesh>
    </group>
  );
}
