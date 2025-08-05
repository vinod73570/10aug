// src/components/RingReveal.js
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export default function RingReveal({ active = false, message = "Will you marry me?", onCelebrate }) {
  const ringRef = useRef();
  const yesRef = useRef();
  const noRef = useRef();
  const [rotateReady, setRotateReady] = useState(false);
  const [hideRing, setHideRing] = useState(false);

  const isMobile = window.innerWidth <= 480 || window.innerHeight >= 1400;

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setRotateReady(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setRotateReady(false);
      setHideRing(false);
    }
  }, [active]);

  useFrame((state) => {
    if (ringRef.current && active && !hideRing) {
      if (rotateReady) {
        ringRef.current.rotation.y += 0.004;
      }

      const glow = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.8;
      ringRef.current.material.emissiveIntensity = glow;

      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
      yesRef.current?.scale.set(scale, scale, scale);
      noRef.current?.scale.set(scale, scale, scale);
    }
  });

  useEffect(() => {
    if (ringRef.current) ringRef.current.visible = active && !hideRing;
  }, [active, hideRing]);

  const handleClick = () => {
    setHideRing(true);
    onCelebrate?.();
  };

  if (!active || hideRing) return null;

  // 🔁 Responsive sizes
  const ringSize = isMobile ? 0.32 : 0.4;
  const ringTube = 0.025;
  const textFontSize = isMobile ? 0.05 : 0.065;
  const buttonFontSize = isMobile ? 0.025 : 0.03;
  const textY = isMobile ? 0.22 : 0.25;
  const btnY = isMobile ? -0.13 : -0.15;
  const yesX = isMobile ? -0.15 : -0.18;
  const noX = isMobile ? 0.15 : 0.18;
  const yesW = isMobile ? 0.18 : 0.22;
  const noW = isMobile ? 0.22 : 0.27;

  return (
    <group position={[0, 0, -0.2]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[ringSize, ringTube, 16, 100]} />
        <meshStandardMaterial
          emissive={new THREE.Color('#a020f0')}
          emissiveIntensity={1.5}
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>

      <Text
        position={[0, textY, 0]}
        fontSize={textFontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineColor="#a020f0"
        outlineWidth={0.003}
        font="/fonts/DancingScript-VariableFont_wght.ttf"
      >
        {message}
      </Text>

      <mesh ref={yesRef} position={[yesX, btnY, 0]} onPointerDown={handleClick}>
        <boxGeometry args={[yesW, 0.07, 0.015]} />
        <meshStandardMaterial color="#ff69b4" emissive="#a020f0" emissiveIntensity={0.7} />
        <Text
          fontSize={buttonFontSize}
          position={[0, 0, 0.02]}
          color="#fff"
          anchorX="center"
          anchorY="middle"
        >
          Yes ❤️
        </Text>
      </mesh>

      <mesh ref={noRef} position={[noX, btnY, 0]} onPointerDown={handleClick}>
        <boxGeometry args={[noW, 0.07, 0.015]} />
        <meshStandardMaterial color="#a020f0" emissive="#ff69b4" emissiveIntensity={0.7} />
        <Text
          fontSize={buttonFontSize}
          position={[0, 0, 0.02]}
          color="#fff"
          anchorX="center"
          anchorY="middle"
        >
          Forever 💍
        </Text>
      </mesh>
    </group>
  );
}
