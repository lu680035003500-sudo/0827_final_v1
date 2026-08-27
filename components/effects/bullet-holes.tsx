"use client";

import { useEffect, useState } from "react";

type Hole = {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
};

const MAX_HOLES = 24;
const SPAWN_INTERVAL_MS = 700;
const MAX_SPAWN_ATTEMPTS = 10;
const MAX_HOLE_SIZE_PX = 40;
// A rotated square's bounding box grows to size * sqrt(2); pad the forbidden
// zone by that half-diagonal so the UFO's visible box never touches the cabinet.
const HOLE_MARGIN_PX = (MAX_HOLE_SIZE_PX * Math.SQRT2) / 2;

let nextHoleId = 0;

const UFO_LIGHT_X = [8, 14, 20, 26, 32];

function getForbiddenZonePercent() {
  const cabinet = document.getElementById("arcade-cabinet");
  if (!cabinet) return null;
  const rect = cabinet.getBoundingClientRect();
  return {
    left: ((rect.left - HOLE_MARGIN_PX) / window.innerWidth) * 100,
    right: ((rect.right + HOLE_MARGIN_PX) / window.innerWidth) * 100,
    top: ((rect.top - HOLE_MARGIN_PX) / window.innerHeight) * 100,
    bottom: ((rect.bottom + HOLE_MARGIN_PX) / window.innerHeight) * 100,
  };
}

export function BulletHoles() {
  const [holes, setHoles] = useState<Hole[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const forbidden = getForbiddenZonePercent();

      let x = Math.random() * 100;
      let y = Math.random() * 100;
      if (forbidden) {
        let attempts = 0;
        while (
          x >= forbidden.left &&
          x <= forbidden.right &&
          y >= forbidden.top &&
          y <= forbidden.bottom &&
          attempts < MAX_SPAWN_ATTEMPTS
        ) {
          x = Math.random() * 100;
          y = Math.random() * 100;
          attempts++;
        }
        if (attempts >= MAX_SPAWN_ATTEMPTS) return;
      }

      setHoles((prev) => {
        const hole: Hole = {
          id: nextHoleId++,
          x,
          y,
          size: 18 + Math.random() * 22,
          rotation: Math.random() * 360,
        };
        const next = [...prev, hole];
        return next.length > MAX_HOLES ? next.slice(next.length - MAX_HOLES) : next;
      });
    }, SPAWN_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {holes.map((hole) => (
        <BulletHole key={hole.id} hole={hole} />
      ))}
    </div>
  );
}

function BulletHole({ hole }: { hole: Hole }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${hole.x}%`,
        top: `${hole.y}%`,
        width: hole.size,
        height: hole.size,
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg
        viewBox="0 0 40 40"
        className="h-full w-full animate-bullet-pop drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        style={{ rotate: `${hole.rotation}deg` }}
      >
        <ellipse cx="20" cy="16" rx="8" ry="7" fill="#7dd3fc" fillOpacity="0.85" stroke="#0ea5e9" strokeWidth="1" />
        <ellipse cx="20" cy="24" rx="15" ry="6" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
        {UFO_LIGHT_X.map((x) => (
          <circle key={x} cx={x} cy="24" r="1.6" fill="#facc15" />
        ))}
      </svg>
    </div>
  );
}
