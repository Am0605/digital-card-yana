"use client";

import { motion } from "framer-motion";
import { Countdown } from "@/components/invitation/Countdown";
import { FloralFrame } from "@/components/invitation/Floral";
import { Ornament } from "@/components/invitation/SectionHeader";
import { wedding } from "@/lib/wedding";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <header id="hero" className="relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#edd9cc_0%,transparent_55%),radial-gradient(ellipse_at_bottom,#dcc6bc_0%,transparent_50%)]" />
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-40" />
      <FloralFrame />

      <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-20 py-28 text-center sm:px-24 sm:py-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-gold-deep"
        >
          Majlis perkahwinan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease }}
          className="flex max-w-full flex-wrap items-center justify-center gap-x-3 font-script text-[clamp(2.5rem,8vw,4.5rem)] leading-none text-ink"
        >
          <span>{wedding.couple.partnerOne}</span>
          <span className="text-[0.62em] text-blush-deep">&</span>
          <span>{wedding.couple.partnerTwo}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-5"
        >
          <Ornament />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="mt-5 max-w-md font-serif text-lg leading-8 text-ink-soft sm:text-xl"
        >
          {wedding.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 font-sans text-sm uppercase tracking-[0.28em] text-ink"
        >
          {wedding.dateLabel}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-2 font-serif text-base italic text-ink-soft"
        >
          {wedding.timeLabel}
        </motion.p>

        <div className="flex w-full justify-center">
          <Countdown />
        </div>
      </div>
    </header>
  );
}
