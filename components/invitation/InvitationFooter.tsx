"use client";

import { FadeIn } from "@/components/invitation/FadeIn";
import { Ornament } from "@/components/invitation/SectionHeader";
import { wedding } from "@/lib/wedding";

export function InvitationFooter() {
  return (
    <FadeIn as="footer" className="px-6 pb-16 pt-6">
      <div className="mx-auto max-w-lg text-center">
        <Ornament />
        <p className="mt-8 font-script text-4xl text-ink">{wedding.names}</p>
        <p className="mt-3 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-gold-deep">
          {wedding.dateLabel}
        </p>
        <p className="mt-6 font-serif text-sm italic text-ink-soft">
          Dengan kasih, kami menanti untuk beraya bersama anda.
        </p>
      </div>
    </FadeIn>
  );
}
