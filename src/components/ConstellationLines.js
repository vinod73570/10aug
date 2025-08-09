// src/components/ConstellationLines.js
import React, { useState, useEffect } from "react";
import { Line } from "@react-three/drei";

/**
 * Connected ConstellationLines
 * - Sanitizes points
 * - Renders a single connected Line that grows progressively (polyline)
 * - Calls onComplete when fully connected
 */
export default function ConstellationLines({
  points = [],
  active = false,
  onComplete,
  stepDelay = 1200, // ms between revealing each next point
}) {
  const [visiblePoints, setVisiblePoints] = useState([]);
  const [sanitized, setSanitized] = useState([]);

  useEffect(() => {
    if (!Array.isArray(points)) {
      setSanitized([]);
      return;
    }
    const s = points
      .map((p) => {
        if (!p || !Array.isArray(p) || p.length < 3) return null;
        const nums = p.map((v) => Number(v));
        if (nums.some((n) => !Number.isFinite(n))) return null;
        return [nums[0], nums[1], nums[2]];
      })
      .filter(Boolean);
    setSanitized(s);
  }, [points]);

  useEffect(() => {
    if (!active) {
      setVisiblePoints([]);
      return;
    }

    if (!sanitized || sanitized.length < 2) {
      // nothing to animate — complete immediately
      if (typeof onComplete === "function") onComplete();
      return;
    }

    // start connected reveal: show first two points then grow
    let i = 1;
    setVisiblePoints(sanitized.slice(0, i + 1));

    const interval = setInterval(() => {
      i++;
      if (i >= sanitized.length) {
        // reveal complete
        setVisiblePoints(sanitized.slice(0));
        clearInterval(interval);
        if (typeof onComplete === "function") {
          try {
            onComplete();
          } catch (e) {
            console.warn("ConstellationLines onComplete threw:", e);
          }
        }
      } else {
        setVisiblePoints(sanitized.slice(0, i + 1));
      }
    }, stepDelay);

    return () => clearInterval(interval);
  }, [active, sanitized, onComplete, stepDelay]);

  if (!active) return null;

  return (
    <>
      {visiblePoints.length >= 2 && (
        <Line
          points={visiblePoints}
          color="#00ffff"
          lineWidth={1.5}
          transparent
          opacity={0.95}
          // prevent lines from blocking pointer events
          raycast={() => null}
        />
      )}
    </>
  );
}
