"use client";

import { useEffect, useState, type CSSProperties } from "react";

import { TeddyBear } from "@/components/arcade/teddy-bear";

const MOVE_INTERVAL_MS = 4000;
const TRANSITION_MS = 3500;

export function WanderingBear() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [facingLeft, setFacingLeft] = useState(false);

  useEffect(() => {
    const pickNewSpot = () => {
      setPos((prev) => {
        const nextX = 6 + Math.random() * 82;
        const nextY = 10 + Math.random() * 75;
        setFacingLeft(nextX < prev.x);
        return { x: nextX, y: nextY };
      });
    };

    pickNewSpot();
    const interval = setInterval(pickNewSpot, MOVE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-0"
      style={
        {
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transition: `left ${TRANSITION_MS}ms ease-in-out, top ${TRANSITION_MS}ms ease-in-out`,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <div style={{ transform: `translate(-50%, -50%) scaleX(${facingLeft ? -1 : 1})` }}>
        <TeddyBear className="h-20 w-auto animate-bear-bob" />
      </div>
    </div>
  );
}
