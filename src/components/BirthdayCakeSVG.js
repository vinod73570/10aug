// src/components/BirthdayCakeSVG.js
import React, { useState } from "react";

export default function BirthdayCakeSVG({ onBlow, className = "" }) {
  const [flamesOn, setFlamesOn] = useState(true);

  // ───── Animation Settings ─────
  const CORE_DURATION    = 2.4;
  const OUTER_DURATION   = 3.2;
  const CORE_SCALE_MAX   = 1.05;
  const OUTER_SCALE_MAX  = 1.1;
  const START_DELAY      = 0.4;
  // ──────────────────────────────

  const handleClick = () => {
    if (flamesOn) {
      setFlamesOn(false);
      onBlow?.();
    }
  };

  return (
   <svg
  viewBox="0 0 300 300"
  className={`responsive-cake-svg ${className}`}
  preserveAspectRatio="xMidYMid meet"
  style={{
    width: "100%",
    maxWidth: "320px",
    height: "auto",
    cursor: flamesOn ? "pointer" : "default",
  }}
  onClick={handleClick}
>

      <defs>
        {/* Glowing blur effect */}
        <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Inner flame gradient */}
        <radialGradient id="flameInner" cx="50%" cy="15%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="40%" stopColor="#ffeb8a" stopOpacity="1" />
          <stop offset="70%" stopColor="#ff9a00" stopOpacity="0.7" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Outer flame gradient */}
        <radialGradient id="flameOuter" cx="50%" cy="25%" r="60%">
          <stop offset="0%" stopColor="#ffd27f" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#ff8c00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Cake base */}
      <rect x="40" y="180" width="220" height="80" rx="15" fill="#ffc0cb" />
      <rect x="50" y="160" width="200" height="30" rx="10" fill="#ff9ab8" />
      <rect x="60" y="140" width="180" height="30" rx="8" fill="#e83e8c" />

      {/* Candles + flames */}
      {[80, 140, 200].map((cx, i) => (
        <g key={i}>
          <rect x={cx - 6} y="110" width="12" height="30" fill="#fff" rx="2" />
          <rect x={cx - 1} y="100" width="2" height="10" fill="#333" rx="1" />

          {flamesOn && (
            <g filter="url(#flameGlow)">
              {/* Inner flame core */}
              <path
                d={`M ${cx} 95 C ${cx - 5} 90, ${cx - 3} 85, ${cx} 90 C ${cx + 3} 85, ${cx + 5} 90, ${cx} 95`}
                fill="url(#flameInner)"
              >
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  from="1"
                  to={CORE_SCALE_MAX}
                  begin={`${START_DELAY}s`}
                  dur={`${CORE_DURATION}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="1;0.65;1"
                  begin={`${START_DELAY}s`}
                  dur={`${CORE_DURATION}s`}
                  repeatCount="indefinite"
                />
              </path>

              {/* Outer flame glow */}
              <path
                d={`M ${cx} 93 C ${cx - 7} 88, ${cx - 4} 82, ${cx} 88 C ${cx + 4} 82, ${cx + 7} 88, ${cx} 93`}
                fill="url(#flameOuter)"
              >
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  from="1"
                  to={OUTER_SCALE_MAX}
                  begin={`${START_DELAY}s`}
                  dur={`${OUTER_DURATION}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0.2;0.5"
                  begin={`${START_DELAY}s`}
                  dur={`${OUTER_DURATION}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
