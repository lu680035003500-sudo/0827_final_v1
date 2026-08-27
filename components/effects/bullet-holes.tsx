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

let nextHoleId = 0;

const UFO_LIGHT_X = [8, 14, 20, 26, 32];

export function BulletHoles() {
  const [holes, setHoles] = useState<Hole[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHoles((prev) => {
        const hole: Hole = {
          id: nextHoleId++,
          x: Math.random() * 100,
          y: Math.random() * 100,
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
