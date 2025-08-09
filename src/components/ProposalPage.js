// === FILE: src/components/ProposalPage.js ===
import React, { useEffect, useState, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Howl } from "howler";

import StarOrb from "./StarOrb";
import ConstellationLines from "./ConstellationLines";
import RingReveal from "./RingReveal";
import RealStarField from "./RealStarField";
import SecretHearts from "./SecretHearts";

import { CelebrationContext } from "./CelebrationContext";
import "./ProposalPage.css";

const LOCAL_UNLOCK_KEY = "secret_hearts_unlocked_v1";
const SECRET_PASSWORD = "open-sesame";

export default function ProposalPage() {
  const memoryStars = [
    { position: [0.2, 0.4, -1], media: "/videos/memories1.mp4" },
    { position: [-0.3, 0.1, -1], media: "/videos/memories1.mp4" },
    { position: [0.0, -0.2, -1], media: "/videos/memories1.mp4" },
    { position: [0.4, -0.1, -1], media: "/videos/memories1.mp4" },
    { position: [-0.5, 0.5, -1], media: "/videos/memories1.mp4" },
  ];

  const [showRing, setShowRing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSecretButton, setShowSecretButton] = useState(false); // ✅ NEW STATE
  const { setShowFireworks } = useContext(CelebrationContext);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSecretHearts, setShowSecretHearts] = useState(false);
  const [rememberForeverChecked, setRememberForeverChecked] = useState(false);

  useEffect(() => {
    const whisper = new Howl({
      src: ["/audio/whisper1.mp3"],
      volume: 0.5,
      html5: true,
    });
    const timer = setTimeout(() => {
      try {
        whisper.play();
      } catch {}
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const unlocked = localStorage.getItem(LOCAL_UNLOCK_KEY);
      if (unlocked === "1") {
        setShowSecretHearts(true);
      }
    } catch {}
  }, []);

  const handleOnConstellationComplete = () => {
    setShowRing(true);
  };

  const handleCelebrate = (choice) => {
    console.log("Ring button pressed:", choice);
    setShowFireworks(true);
    setShowCelebration(true);
    setShowSecretButton(true); // ✅ Show button after click

    setTimeout(() => setShowFireworks(false), 6000);
  };

  return (
    <div className="proposal-page">
      <div className="star-background" style={{ pointerEvents: "none" }} />

      <Canvas
   className="proposal-canvas"
  dpr={Math.min(window.devicePixelRatio, 1)}
  camera={{ position: [0, 0, 2], fov: 60 }}
  gl={{ powerPreference: "low-power", antialias: true }}
>
        
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, 5, 5]} intensity={0.3} />

        <RealStarField radius={20} count={600} />
        <Stars radius={80} depth={50} count={800} factor={2} saturation={0} fade />

        {memoryStars.map((star, idx) => (
          <StarOrb key={idx} position={star.position} media={star.media} />
        ))}

        <ConstellationLines
          points={memoryStars.map((s) => s.position)}
          active={true}
          stepDelay={1200}
          onComplete={handleOnConstellationComplete}
        />

        <RingReveal active={showRing} message="Will you marry me?" onCelebrate={handleCelebrate} />
      </Canvas>

      {showCelebration && (
        <div className="celebration-panel">
          <h1>💍 She said YES! ❤️</h1>
          <p>Forever starts now under our constellation of memories.</p>
        </div>
      )}

      {/* ✅ Only show after ring click */}
      {showSecretButton && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            textAlign: "center",
          }}
        >
          <button
            className="secret-btn-god"
            onClick={() => {
              setPasswordError("");
              setPasswordInput("");
              setShowPasswordModal(true);
            }}
          >
            View Secret Message ❤️
          </button>
        </div>
      )}

      {/* Password Popup */}
      {showPasswordModal && (
        <div className="password-popup">
          <h4>💌 Enter Password</h4>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Password"
            autoFocus
          />
          {passwordError && <div className="error-text">{passwordError}</div>}

          <div className="popup-actions">
            <button className="cancel-btn" onClick={() => setShowPasswordModal(false)}>
              Cancel
            </button>
            <button
              className="unlock-btn"
              onClick={() => {
                if (passwordInput === SECRET_PASSWORD) {
                  if (rememberForeverChecked) {
                    localStorage.setItem(LOCAL_UNLOCK_KEY, "1");
                  }
                  setShowPasswordModal(false);
                  setShowSecretHearts(true);
                  setPasswordInput("");
                } else {
                  setPasswordError("Incorrect password");
                }
              }}
            >
              Unlock
            </button>
          </div>
        </div>
      )}

      {showSecretHearts && <SecretHearts onClose={() => setShowSecretHearts(false)} />}
    </div>
  );
}
