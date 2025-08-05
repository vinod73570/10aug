// src/components/ProposalPage.js
import React, { useEffect, useState, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { Howl } from 'howler';

import StarOrb from './StarOrb';
import ConstellationLines from './ConstellationLines';
import RingReveal from './RingReveal';
// import StardustParticles from './StardustParticles';
// import VoiceoverController from './VoiceoverController';
// import ProposalSceneManager from './ProposalSceneManager';
import RealStarField from './RealStarField';

import { CelebrationContext } from './CelebrationContext'; // ✅ Import context
import './ProposalPage.css';

export default function ProposalPage() {
  const memoryStars = [
    { position: [0.2, 0.4, -1], media: '/videos/memories1.mp4' },
    { position: [-0.3, 0.1, -1], media: '/videos/memories1.mp4' },
    { position: [0.0, -0.2, -1], media: '/videos/memories1.mp4' },
    { position: [0.4, -0.1, -1], media: '/videos/memories1.mp4' },
    { position: [-0.5, 0.5, -1], media: '/videos/memories1.mp4' },
  ];

  const [showRing, setShowRing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { setShowFireworks } = useContext(CelebrationContext); // ✅ use global fireworks state

  // 🎉 Trigger fireworks and panel
  const handleCelebrate = () => {
    console.log("🔥 CELEBRATION STARTED");
    setShowFireworks(true);
    setShowCelebration(true);

    // Stop fireworks after 6 seconds
    setTimeout(() => setShowFireworks(false), 6000);
  };

  useEffect(() => {
    const whisper = new Howl({
      src: ['/audio/whisper1.mp3'],
      volume: 0.5,
      html5: true,
    });
    const timer = setTimeout(() => whisper.play(), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="proposal-page">
      {/* 🌌 Starry CSS background layer */}
      <div className="star-background" />

      {/* 🌠 Three.js Canvas on top */}
      <Canvas
        className="proposal-canvas"
        frameloop="demand"
        dpr={Math.min(window.devicePixelRatio, 1)}
        camera={{ position: [0, 0, 2], fov: 60 }}
        gl={{ powerPreference: 'low-power', antialias: true }}
      >
        <RealStarField radius={20} />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />

        {memoryStars.map((star, idx) => (
          <StarOrb key={idx} position={star.position} media={star.media} />
        ))}

        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.3} />

        <ConstellationLines
          points={memoryStars.map((s) => s.position)}
          active={true}
          onComplete={() => setShowRing(true)}
        />

        <RingReveal active={showRing} message="Will you marry me?" onCelebrate={handleCelebrate} />

        {/* <StardustParticles show={false} /> */}
        {/* <VoiceoverController index={0} /> */}
        {/* <ProposalSceneManager onSequenceComplete={() => {}} /> */}
      </Canvas>

      {/* 💖 Message after proposal */}
      {showCelebration && (
        <div className="celebration-panel">
          <h1>💍 She said YES! ❤️</h1>
          <p>Forever starts now under our constellation of memories.</p>
        </div>
      )}
    </div>
  );
}
