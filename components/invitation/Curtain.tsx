"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Ornament } from "@/components/invitation/SectionHeader";
import { wedding } from "@/lib/wedding";

const ease = [0.77, 0, 0.18, 1] as const;

const curtainFace =
  "absolute inset-y-0 w-1/2 bg-[linear-gradient(90deg,#e7d5c8_0%,#f6ebe3_12%,#d9c2b2_28%,#f8f1ea_50%,#dcc6b6_72%,#f6ebe3_88%,#e4d0c2_100%)]";

export function Curtain({
  opening,
  onOpen,
  onFinished,
}: {
  opening: boolean;
  onOpen: () => void;
  onFinished: () => void;
}) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Buka jemputan">
      <motion.div
        className={`${curtainFace} left-0 origin-left shadow-[8px_0_24px_rgba(63,52,44,0.12)]`}
        initial={false}
        animate={{ x: opening ? "-105%" : "0%" }}
        transition={{ duration: 1.15, ease }}
      />
      <motion.div
        className={`${curtainFace} right-0 origin-right shadow-[-8px_0_24px_rgba(63,52,44,0.12)]`}
        initial={false}
        animate={{ x: opening ? "105%" : "0%" }}
        transition={{ duration: 1.15, ease }}
        onAnimationComplete={() => {
          if (opening) onFinished();
        }}
      />

      <motion.button
        type="button"
        onClick={onOpen}
        disabled={opening}
        initial={false}
        animate={opening ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center"
      >
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.38em] text-gold-deep">
          Anda dijemput
        </p>
        <p className="mt-4 font-script text-6xl leading-none text-ink sm:text-7xl">
          {wedding.monogram}
        </p>
        <div className="mt-5">
          <Ornament />
        </div>
        <p className="mt-5 font-serif text-2xl text-ink">{wedding.names}</p>
        <p className="mt-2 text-[0.68rem] uppercase tracking-[0.28em] text-ink-soft">
          {wedding.dateLabel}
        </p>
        <span className="mt-10 rounded-full border border-gold/40 bg-white/50 px-6 py-3 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink">
          Ketik untuk buka
        </span>
      </motion.button>
    </div>
  );
}
