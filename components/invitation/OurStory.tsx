"use client";

import { FadeIn } from "@/components/invitation/FadeIn";
import {
  Ornament,
  SectionEyebrow,
  SectionTitle,
} from "@/components/invitation/SectionHeader";
import { wedding } from "@/lib/wedding";

export function OurStory() {
  return (
    <section id="story" className="px-6 py-20 sm:py-24">
      <FadeIn>
        <SectionEyebrow>Our story</SectionEyebrow>
        <SectionTitle>A love in chapters</SectionTitle>
        <div className="mt-6">
          <Ornament />
        </div>
      </FadeIn>

      <div className="relative mx-auto mt-14 max-w-lg">
        <span
          className="absolute top-2 bottom-2 left-[1.15rem] w-px bg-gradient-to-b from-gold/70 via-blush/60 to-transparent sm:left-1/2 sm:-translate-x-1/2"
          aria-hidden="true"
        />
        <ol>
          {wedding.story.map((chapter, index) => (
            <FadeIn
              key={chapter.year}
              as="li"
              delay={index * 0.08}
              className="relative mb-12 grid grid-cols-[2.3rem_1fr] items-start gap-4 last:mb-0 sm:grid-cols-1 sm:text-center"
            >
              <span className="relative z-10 mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-stone text-[0.65rem] font-medium tracking-wide text-gold-deep shadow-[0_6px_18px_rgba(184,149,108,0.18)] sm:mx-auto">
                {index + 1}
              </span>
              <div className="sm:mx-auto sm:max-w-md">
                <p className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-gold-deep">
                  {chapter.year}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-ink">{chapter.title}</h3>
                <p className="mt-3 font-sans text-[0.95rem] leading-7 text-ink-soft">
                  {chapter.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
