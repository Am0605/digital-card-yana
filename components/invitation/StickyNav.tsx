"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BackgroundAudio,
  MusicToggle,
  useInvitationMusic,
} from "@/components/invitation/BackgroundMusic";
import { wedding } from "@/lib/wedding";

export function StickyNav() {
  const [visible, setVisible] = useState(false);
  const { audioRef, playing, toggle, setPlaying } = useInvitationMusic();

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.intersectionRatio < 0.45);
      },
      { threshold: [0, 0.45, 1] },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <BackgroundAudio
        audioRef={audioRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <AnimatePresence>
        {visible ? (
          <motion.nav
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            className="fixed inset-x-0 top-0 z-40 flex items-center px-4 py-3 sm:px-6"
          >
            <div className="mx-auto flex w-full max-w-lg items-center justify-between rounded-full border border-gold/20 bg-stone/90 px-3 py-2 shadow-[0_10px_30px_rgba(63,52,44,0.1)] backdrop-blur-md">
              <p className="pl-1 font-script text-xl text-ink">{wedding.monogram}</p>
              <div className="flex items-center gap-2">
                <MusicToggle playing={playing} onToggle={toggle} />
                <a
                  href="#rsvp"
                  className="rounded-full bg-ink px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-stone transition-transform hover:scale-[1.03]"
                >
                  RSVP
                </a>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
