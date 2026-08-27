"use client";

import { useEffect, useState, type CSSProperties } from "react";

const DURATION_MS = 10000;
const BURST_INTERVAL_MS = 400;
const PARTICLES_PER_BURST = 26;
const MAX_CONCURRENT_BURSTS = 6;
const COLORS = [
  "#f87171",
  "#facc15",
  "#4ade80",
  "#60a5fa",
  "#c084fc",
  "#fb923c",
  "#f472b6",
  "#22d3ee",
];

type Particle = {
  id: number;
  dx: number;
  dy: number;
  color: string;
  delay: number;
};

type Burst = {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
};

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLES_PER_BURST }, (_, index) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 110;
    return {
      id: index,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      color: COLORS[index % COLORS.length],
      delay: Math.random() * 0.1,
    };
  });
}

export function FireworksOverlay({ active }: { active: boolean }) {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (!active) return;

    let nextId = 0;
    const spawnBurst = () => {
      setBursts((prev) => {
        const next: Burst = {
          id: nextId++,
          x: 15 + Math.random() * 70,
          y: 15 + Math.random() * 60,
          particles: createParticles(),
        };
        return [...prev, next].slice(-MAX_CONCURRENT_BURSTS);
      });
    };

    spawnBurst();
    const interval = setInterval(spawnBurst, BURST_INTERVAL_MS);
    const stopTimer = setTimeout(() => clearInterval(interval), DURATION_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimer);
      setBursts([]);
    };
  }, [active]);

  if (!active || bursts.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute"
          style={{ left: `${burst.x}%`, top: `${burst.y}%` }}
        >
          {burst.particles.map((particle) => (
            <span
              key={particle.id}
              className="absolute h-1.5 w-1.5 rounded-full animate-confetti"
              style={
                {
                  backgroundColor: particle.color,
                  animationDelay: `${particle.delay}s`,
                  "--dx": `${particle.dx}px`,
                  "--dy": `${particle.dy}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
