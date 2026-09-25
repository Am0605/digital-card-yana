"use client";

import { FadeIn } from "@/components/invitation/FadeIn";
import { Ornament } from "@/components/invitation/SectionHeader";
import { wedding } from "@/lib/wedding";

function NameLine({ children }: { children: string }) {
  return (
    <p className="font-serif text-xl font-semibold leading-snug text-ink sm:text-2xl">{children}</p>
  );
}

export function InvitationNote() {
  const [groom, bride] = wedding.note.couple;

  return (
    <section id="note" className="px-6 py-20 sm:py-24">
      <FadeIn>
        <p
          lang="ar"
          dir="rtl"
          className="text-center font-arabic text-3xl leading-relaxed text-ink sm:text-4xl"
        >
          {wedding.note.bismillah}
        </p>
        <div className="mt-6">
          <Ornament />
        </div>
        <p className="mx-auto mt-8 max-w-md text-center font-serif text-2xl leading-9 text-ink">
          {wedding.note.greeting}
        </p>
      </FadeIn>

      <FadeIn delay={0.12} className="mx-auto mt-8 max-w-md text-center">
        <p className="font-serif text-lg leading-8 text-ink-soft">{wedding.note.opening}</p>

        <div className="mt-5 space-y-2">
          <NameLine>{wedding.note.groomFather}</NameLine>
          <p className="font-serif text-base italic text-gold-deep">&</p>
          <NameLine>{wedding.note.groomMother}</NameLine>
          <p className="font-serif text-base italic text-gold-deep">serta</p>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">arwah</p>
          <NameLine>{wedding.note.brideFather}</NameLine>
          <p className="font-serif text-base italic text-gold-deep">&</p>
          <NameLine>{wedding.note.brideMother}</NameLine>
        </div>

        <p className="mt-6 font-serif text-lg leading-8 text-ink-soft">{wedding.note.invitation}</p>

        <div className="mt-5 space-y-1">
          <NameLine>{groom}</NameLine>
          <p className="font-serif text-base italic text-gold-deep">dan</p>
          <NameLine>{bride}</NameLine>
        </div>

        <p className="mt-8 font-serif text-lg leading-8 text-ink-soft">{wedding.note.closing}</p>
      </FadeIn>
    </section>
  );
}
