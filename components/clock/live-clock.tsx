"use client";

import { useSyncExternalStore } from "react";

function formatNow(): string {
  return new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function subscribe(callback: () => void) {
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
}

function getServerSnapshot(): string | null {
  return null;
}

export function LiveClock() {
  const now = useSyncExternalStore(subscribe, formatNow, getServerSnapshot);

  if (!now) return null;

  return (
    <div className="fixed left-3 top-3 z-40 rounded-md bg-black/60 px-2 py-1 font-mono text-xs text-white">
      {now}
    </div>
  );
}
