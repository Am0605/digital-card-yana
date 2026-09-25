"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return null;
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const unitLabels = ["Hari", "Jam", "Minit", "Saat"] as const;

export function Countdown() {
  const target = useMemo(() => new Date(wedding.start), []);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(target));
    tick();
    setReady(true);

    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [target]);

  if (ready && !timeLeft) {
    return (
      <p className="mt-10 font-serif text-xl italic text-blush-deep">
        Hari ini kita meraikan perkahwinan Imran dan Norliyana.
      </p>
    );
  }

  const units: Array<[string, string]> = timeLeft
    ? [
        ["Hari", String(timeLeft.days).padStart(2, "0")],
        ["Jam", String(timeLeft.hours).padStart(2, "0")],
        ["Minit", String(timeLeft.minutes).padStart(2, "0")],
        ["Saat", String(timeLeft.seconds).padStart(2, "0")],
      ]
    : unitLabels.map((label) => [label, "--"]);

  return (
    <div className="mt-6 grid w-full max-w-md grid-cols-4 gap-2 sm:gap-3">
      {units.map(([label, value], index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.08, duration: 0.5 }}
          className="rounded-2xl border border-gold/25 bg-white/40 px-1 py-3 text-center shadow-[0_8px_30px_rgba(63,52,44,0.06)] backdrop-blur-sm"
        >
          <p className="font-serif text-2xl font-medium tabular-nums text-ink sm:text-3xl">
            {value}
          </p>
          <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-ink-soft">
            {label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
