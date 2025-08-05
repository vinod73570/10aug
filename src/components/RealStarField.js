import React, { useState, useEffect, useMemo } from 'react';
import { Points } from '@react-three/drei';
import { BufferGeometry, Float32BufferAttribute } from 'three';

export default function RealStarField({ radius = 20 }) {
  const [stars, setStars] = useState([]);

  // 1. Fetch JSON once on mount
  useEffect(() => {
    fetch('/data/stars.json')
      .then(res => {
        console.log('stars.json status', res.status);
        return res.json();
      })
      .then(data => {
        console.log('loaded stars count:', data.length);
        setStars(data);
      })
      .catch(err => console.error('Failed to load stars.json', err));
  }, []);

  // 2. Build positions array when stars arrive
  const positions = useMemo(() => {
    if (!stars.length) return null;
    const pts = [];
    stars.forEach(({ ra, dec }) => {
      // RA hours → radians (24h → 2π), Dec degrees → radians
      const raRad  = ra  * Math.PI / 12;
      const decRad = dec * Math.PI / 180;
      // Spherical → Cartesian
      const x = radius * Math.cos(decRad) * Math.cos(raRad);
      const y = radius * Math.sin(decRad);
      const z = radius * Math.cos(decRad) * Math.sin(raRad);
      pts.push(x, y, z);
    });
    console.log('positions array length:', pts.length);
    return new Float32Array(pts);
  }, [stars, radius]);

  // 3. Create BufferGeometry
  const geom = useMemo(() => {
    if (!positions) return null;
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  // 4. Render as Points
  if (!geom) return null;
  return (
    <Points geometry={geom}>
      <pointsMaterial
        attach="material"
        size={2}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </Points>
  );
}
