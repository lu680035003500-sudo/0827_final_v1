"use client";

import { useEffect, useState } from "react";

import { TeddyBear } from "./teddy-bear";

const UFO_LIGHT_X = [8, 14, 20, 26, 32];

type SideUfoProps = {
  side: "left" | "right";
};

export function SideUfo({ side }: SideUfoProps) {
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    function updateButtonWidth() {
      const button = document.querySelector<HTMLButtonElement>("#arcade-cabinet button");
      if (button) setButtonWidth(button.getBoundingClientRect().width);
    }
    updateButtonWidth();
    window.addEventListener("resize", updateButtonWidth);
    return () => window.removeEventListener("resize", updateButtonWidth);
  }, []);

  const extraShift = side === "left" ? -buttonWidth : buttonWidth;

  return (
    <div
      className={`absolute top-1/2 z-20 h-20 w-20 sm:h-24 sm:w-24 ${
        side === "left" ? "-left-10 sm:-left-14" : "-right-10 sm:-right-14"
      }`}
      style={{ transform: `translateY(-50%) translateX(${extraShift}px)` }}
      aria-hidden="true"
    >
      <div className="relative h-full w-full animate-ufo-wiggle">
        <svg viewBox="0 0 40 40" className="h-full w-full drop-shadow-[0_3px_6px_rgba(0,0,0,0.55)]">
          <defs>
            <linearGradient id={`ufo-body-${side}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="45%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#3f4b5e" />
            </linearGradient>
            <radialGradient id={`ufo-dome-${side}`} cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="55%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>
          </defs>

          <ellipse cx="20" cy="27.5" rx="16.5" ry="3.5" fill="#38bdf8" opacity="0.35" />

          <ellipse
            cx="20"
            cy="24"
            rx="16"
            ry="6.5"
            fill={`url(#ufo-body-${side})`}
            stroke="#1e293b"
            strokeWidth="0.6"
          />
          <path
            d="M5.5 22.3 Q20 16.5 34.5 22.3"
            stroke="#f8fafc"
            strokeWidth="1"
            fill="none"
            opacity="0.55"
            strokeLinecap="round"
          />

          <ellipse
            cx="20"
            cy="15"
            rx="8.5"
            ry="7.5"
            fill={`url(#ufo-dome-${side})`}
            stroke="#075985"
            strokeWidth="0.6"
          />
          <ellipse cx="17" cy="11.5" rx="2.6" ry="1.6" fill="#ffffff" opacity="0.8" />

          {UFO_LIGHT_X.map((x) => (
            <g key={x}>
              <circle cx={x} cy="24" r="2.4" fill="#fde047" opacity="0.3" />
              <circle cx={x} cy="24" r="1.1" fill="#fde047" />
            </g>
          ))}
        </svg>

        <div
          className="absolute top-full left-1/2 h-[17.875rem] w-10 -translate-x-1/2 animate-beam-glow"
          style={{
            background: "linear-gradient(to bottom, rgba(250,204,21,0.75), rgba(125,211,252,0))",
            clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
          }}
        />

        <div
          className="absolute top-full left-1/2 -translate-x-1/2 animate-bear-abduct"
          style={{ marginTop: "17.875rem", animationDelay: side === "right" ? "1.4s" : "0s" }}
        >
          <TeddyBear className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
}
