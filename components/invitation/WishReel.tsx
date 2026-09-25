"use client";

import { useState } from "react";
import type { Wish } from "@/lib/wishes";

function fillReel(wishes: Wish[]) {
  const reel = [...wishes];
  while (reel.length < 4) reel.push(...wishes);
  return reel;
}

export function WishReel({ wishes }: { wishes: Wish[] }) {
  const [paused, setPaused] = useState(false);
  const reel = fillReel(wishes);
  const duration = `${reel.length * 8}s`;

  function pause() {
    setPaused(true);
  }

  function play() {
    setPaused(false);
  }

  return (
    <div
      className="mt-10 overflow-hidden"
      onPointerDown={pause}
      onPointerUp={play}
      onPointerCancel={play}
      onPointerLeave={play}
    >
      <div
        className={`wish-marquee flex w-max ${paused ? "is-paused" : ""}`}
        style={{ animationDuration: duration }}
      >
        {[reel, reel].map((group, groupIndex) => (
          <ul key={groupIndex} className="flex shrink-0 gap-4 pr-4" aria-hidden={groupIndex === 1}>
            {group.map((wish, index) => (
              <li key={`${wish.name}-${index}`}>
                <article className="flex h-full w-[17rem] flex-col justify-between rounded-[1.75rem] border border-gold/20 bg-white/55 px-6 py-6 text-center shadow-[0_16px_40px_rgba(63,52,44,0.06)]">
                  <p className="font-serif text-lg leading-8 text-ink-soft italic">&ldquo;{wish.message}&rdquo;</p>
                  <p className="mt-4 font-serif text-xl text-ink">{wish.name}</p>
                </article>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
