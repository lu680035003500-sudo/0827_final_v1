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
        <svg viewBox="0 0 40 40" className="h-full w-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          <ellipse cx="20" cy="16" rx="8" ry="7" fill="#7dd3fc" fillOpacity="0.85" stroke="#0ea5e9" strokeWidth="1" />
          <ellipse cx="20" cy="24" rx="15" ry="6" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
          {UFO_LIGHT_X.map((x) => (
            <circle key={x} cx={x} cy="24" r="1.6" fill="#facc15" />
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
