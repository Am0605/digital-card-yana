"use client";

import { FadeIn } from "@/components/invitation/FadeIn";
import {
  Ornament,
  SectionEyebrow,
  SectionTitle,
} from "@/components/invitation/SectionHeader";
import { wedding } from "@/lib/wedding";

export function DressCode() {
  return (
    <section id="dress" className="px-6 py-20 sm:py-24">
      <FadeIn>
        <SectionEyebrow>Attire</SectionEyebrow>
        <SectionTitle>{wedding.dressCode.title}</SectionTitle>
        <div className="mt-6">
          <Ornament />
        </div>
        <p className="mx-auto mt-8 max-w-md text-center font-serif text-lg leading-8 italic text-ink-soft">
          {wedding.dressCode.description}
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mx-auto mt-10 flex max-w-sm justify-center gap-3">
        {wedding.dressCode.palette.map((swatch) => (
          <div key={swatch.name} className="flex flex-col items-center gap-2">
            <span
              className="h-12 w-12 rounded-full border border-white/80 shadow-[0_8px_20px_rgba(63,52,44,0.12)]"
              style={{ backgroundColor: swatch.hex }}
              aria-hidden="true"
            />
            <span className="text-[0.65rem] text-center uppercase tracking-[0.16em] text-ink-soft">
              {swatch.name}
            </span>
            <span className="text-[0.65rem] text-center uppercase tracking-[0.16em] text-ink-soft">
              {swatch.body}
            </span>
          </div>
        ))}
      </FadeIn>

      <FadeIn delay={0.16}>
        <ul className="mx-auto mt-10 max-w-md space-y-3">
          {wedding.dressCode.notes.map((note) => (
            <li
              key={note}
              className="rounded-2xl border border-gold/15 bg-white/40 px-5 py-4 text-center font-sans text-sm leading-6 text-ink-soft"
            >
              {note}
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
