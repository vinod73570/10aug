// src/components/RealStarField.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function RealStarField({ radius = 20, count = 600 }) {
  const meshRef = useRef();
  const dummy = new THREE.Object3D();

  // create per-instance data once
  const positions = React.useMemo(() => {
    return Array.from({ length: count }).map(() => {
      return [
        (Math.random() * 2 - 1) * radius,
        (Math.random() * 2 - 1) * radius,
        -Math.random() * radius - 0.5,
      ];
    });
  }, [count, radius]);

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      dummy.position.set(pos[0], pos[1], pos[2]);
      const s = Math.random() * 0.02 + 0.005;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  // subtle twinkle by adjusting emissive color a little
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    const col = new THREE.Color(0xffffff);
    col.offsetHSL(0, 0, Math.sin(t * 0.3) * 0.02);
    // apply same color to material (cheap)
    meshRef.current.material.color.copy(col);
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, positions.length]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" toneMapped={false} />
    </instancedMesh>
  );
}
