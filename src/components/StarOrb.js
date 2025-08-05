// src/components/StarOrb.js
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export default function StarOrb({ position = [0, 0, 0], media = '' }) {
  const orbRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Pulsing animation on hover
  useFrame(() => {
    if (orbRef.current) {
      const target = hovered ? 1.3 : 1;
      orbRef.current.scale.lerp({ x: target, y: target, z: target }, 0.1);
    }
  });

  return (
    <mesh
      ref={orbRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => window.open(media, '_blank')}
    >
      <sphereGeometry args={[0.025, 16, 16]} />
      <meshStandardMaterial
        color={hovered ? '#ff69b4' : '#ffffff'}
        emissive={hovered ? '#ff69b4' : '#222'}
        metalness={0.3}
        roughness={0.2}
      />

      {hovered && (
        <Html distanceFactor={1.5} style={{ pointerEvents: 'none' }}>
          <video
            src={media}
            width={140}
            autoPlay
            loop
            muted
            playsInline
            style={{
              borderRadius: '10px',
              boxShadow: '0 0 10px #ff69b4',
            }}
          />
        </Html>
      )}
    </mesh>
  );
}
