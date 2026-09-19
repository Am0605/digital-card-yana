"use client";

import { motion } from "framer-motion";
import { AddToCalendar } from "@/components/invitation/AddToCalendar";
import { FadeIn } from "@/components/invitation/FadeIn";
import {
  Ornament,
  SectionEyebrow,
  SectionTitle,
} from "@/components/invitation/SectionHeader";
import { wedding } from "@/lib/wedding";

export function Venue() {
  return (
    <section id="venue" className="px-6 py-20 sm:py-24">
      <FadeIn>
        <SectionEyebrow>Venue & location</SectionEyebrow>
        <SectionTitle>Join us here</SectionTitle>
        <div className="mt-6">
          <Ornament />
        </div>
      </FadeIn>

      <FadeIn delay={0.12} className="mx-auto mt-12 max-w-lg">
        <div className="rounded-[1.75rem] border border-gold/20 bg-white/55 p-7 shadow-[0_20px_50px_rgba(63,52,44,0.08)] backdrop-blur-sm sm:p-9">
          <p className="text-center font-serif text-3xl text-ink">{wedding.venue.name}</p>
          <p className="mt-2 text-center font-sans text-sm tracking-wide text-gold-deep">
            {wedding.venue.hall}
          </p>
          <p className="mt-6 text-center font-sans text-sm leading-6 text-ink-soft">
            {wedding.venue.address}
            <br />
            {wedding.venue.city}
          </p>
          <p className="mt-6 text-center font-serif text-base leading-7 italic text-ink">
            {wedding.dateLabel}
            <br />
            {wedding.timeLabel}
          </p>
          <p className="mt-6 text-center font-sans text-sm leading-7 text-ink-soft">
            {wedding.venue.details}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <motion.a
              href={wedding.venue.mapUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full border border-gold/40 bg-stone px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold hover:bg-champagne/40"
            >
              Open in Maps
            </motion.a>
            <AddToCalendar />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
