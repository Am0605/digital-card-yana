"use client";

import { motion } from "framer-motion";
import { Countdown } from "@/components/invitation/Countdown";
import { Ornament } from "@/components/invitation/SectionHeader";
import { wedding } from "@/lib/wedding";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <header
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-16 pb-28 text-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#fde8eb_0%,transparent_55%),radial-gradient(ellipse_at_bottom,#f3cfd5_0%,transparent_50%)]" />
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-40" />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="relative mb-6 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-gold-deep"
      >
        Majlis perkahwinan
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.12, ease }}
        className="relative font-script text-[4.35rem] leading-[0.9] text-ink sm:text-8xl"
      >
        {wedding.couple.partnerOne}
        <span className="mx-3 inline-block font-script text-4xl text-blush-deep sm:text-5xl">
          &
        </span>
        {wedding.couple.partnerTwo}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="relative mt-8"
      >
        <Ornament />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease }}
        className="relative mt-8 max-w-md font-serif text-lg leading-8 text-ink-soft sm:text-xl"
      >
        {wedding.tagline}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative mt-6 font-sans text-sm uppercase tracking-[0.28em] text-ink"
      >
        {wedding.dateLabel}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative mt-2 font-serif text-base italic text-ink-soft"
      >
        {wedding.timeLabel}
      </motion.p>

      <div className="relative flex w-full justify-center">
        <Countdown />
      </div>
    </header>
  );
}
