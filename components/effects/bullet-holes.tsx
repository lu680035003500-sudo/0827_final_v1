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

const CRACK_ANGLES = [10, 55, 95, 140, 175, 220, 265, 310];

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
        <circle cx="20" cy="20" r="9" fill="#161616" />
        <circle cx="20" cy="20" r="9" fill="none" stroke="#4a4a4a" strokeWidth="1.2" />
        {CRACK_ANGLES.map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 20 + Math.cos(rad) * 8;
          const y1 = 20 + Math.sin(rad) * 8;
          const x2 = 20 + Math.cos(rad) * (15 + (angle % 30));
          const y2 = 20 + Math.sin(rad) * (15 + (angle % 30));
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#161616"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
}
