"use client";

import { useEffect, useState } from "react";

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
      <div className="h-full w-full animate-ufo-wiggle">
        <svg viewBox="0 0 40 40" className="h-full w-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          <ellipse cx="20" cy="16" rx="8" ry="7" fill="#7dd3fc" fillOpacity="0.85" stroke="#0ea5e9" strokeWidth="1" />
          <ellipse cx="20" cy="24" rx="15" ry="6" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
          {UFO_LIGHT_X.map((x) => (
            <circle key={x} cx={x} cy="24" r="1.6" fill="#facc15" />
          ))}
        </svg>
      </div>
    </div>
  );
}
