"use client";

import { useEffect, useState, type CSSProperties } from "react";

const SPAWN_INTERVAL_MS = 220;
const PARTICLES_PER_BURST = 3;
const MAX_BURSTS = 10;
const LAVA_COLORS = ["#f97316", "#ef4444", "#facc15"];
const SMOKE_COLOR = "#57534e";

type Particle = {
  id: number;
  dx: number;
  dy: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
};

let nextParticleId = 0;
let nextBurstId = 0;

function createParticles(): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < PARTICLES_PER_BURST; i++) {
    const angle = Math.PI / 2 + (Math.random() - 0.5) * (Math.PI / 2.2);
    const distance = 40 + Math.random() * 60;
    particles.push({
      id: nextParticleId++,
      dx: Math.cos(angle) * distance,
      dy: -Math.sin(angle) * distance,
      color: LAVA_COLORS[i % LAVA_COLORS.length],
      size: 4 + Math.random() * 4,
      delay: Math.random() * 0.1,
      duration: 0.8,
    });
  }

  if (Math.random() < 0.5) {
    particles.push({
      id: nextParticleId++,
      dx: (Math.random() - 0.5) * 30,
      dy: -(60 + Math.random() * 40),
      color: SMOKE_COLOR,
      size: 10 + Math.random() * 6,
      delay: 0,
      duration: 1.6,
    });
  }

  return particles;
}

export function VolcanoEruption() {
  const [bursts, setBursts] = useState<Array<{ id: number; particles: Particle[] }>>([]);

  useEffect(() => {
    const spawn = () => {
      setBursts((prev) =>
        [...prev, { id: nextBurstId++, particles: createParticles() }].slice(-MAX_BURSTS)
      );
    };
    spawn();
    const interval = setInterval(spawn, SPAWN_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none fixed bottom-[38%] left-[8%]"
      aria-hidden="true"
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 opacity-70 blur-[2px]" style={{ width: 10, height: 10 }} />
      {bursts.map((burst) => (
        <div key={burst.id} className="absolute">
          {burst.particles.map((particle) => (
            <span
              key={particle.id}
              className="absolute rounded-full"
              style={
                {
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  animationName: "confetti-burst",
                  animationTimingFunction: "ease-out",
                  animationFillMode: "forwards",
                  animationDuration: `${particle.duration}s`,
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
