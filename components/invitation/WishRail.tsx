"use client";

import { useLayoutEffect, useRef } from "react";
import type { Wish } from "@/lib/wishes";

export function WishRail({ wishes }: { wishes: Wish[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const half = () => scroller.scrollWidth / 2;
    const width = half();
    if (width > 0) scroller.scrollLeft = width - 1;
    if (reduced) return;

    let frame = 0;
    let wrapping = false;

    const wrap = () => {
      if (wrapping) return;
      const loop = half();
      if (loop <= 0) return;
      wrapping = true;
      if (scroller.scrollLeft > loop) scroller.scrollLeft -= loop;
      else if (scroller.scrollLeft <= 0) scroller.scrollLeft += loop;
      wrapping = false;
    };

    const tick = () => {
      if (!pausedRef.current) scroller.scrollLeft -= 0.55;
      wrap();
      frame = window.requestAnimationFrame(tick);
    };

    const pause = () => {
      pausedRef.current = true;
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };

    const resumeSoon = () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = window.setTimeout(() => {
        pausedRef.current = false;
      }, 1400);
    };

    frame = window.requestAnimationFrame(tick);
    scroller.addEventListener("pointerdown", pause);
    scroller.addEventListener("pointerup", resumeSoon);
    scroller.addEventListener("pointercancel", resumeSoon);

    return () => {
      window.cancelAnimationFrame(frame);
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
      scroller.removeEventListener("pointerdown", pause);
      scroller.removeEventListener("pointerup", resumeSoon);
      scroller.removeEventListener("pointercancel", resumeSoon);
    };
  }, [wishes]);

  const cards = wishes.length < 4 ? Array.from({ length: 4 }, () => wishes).flat() : wishes;

  return (
    <div
      ref={scrollerRef}
      className="mt-10 flex cursor-grab gap-4 overflow-x-auto px-6 pb-2 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Senarai ucapan"
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 gap-4" aria-hidden={copy === 1}>
          {cards.map((wish, index) => (
            <article
              key={`${copy}-${wish.name}-${index}`}
              className="flex w-[17rem] shrink-0 flex-col justify-between rounded-[1.75rem] border border-gold/20 bg-[#f7f1e8] px-6 py-6 text-center shadow-[0_16px_40px_rgba(63,52,44,0.06)]"
            >
              <p className="font-serif text-lg leading-8 text-ink-soft italic">&ldquo;{wish.message}&rdquo;</p>
              <p className="mt-4 font-serif text-xl text-ink">{wish.name}</p>
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}
