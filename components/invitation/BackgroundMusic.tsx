"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";

export function useInvitationMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  async function play() {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  function pause() {
    audioRef.current?.pause();
    setPlaying(false);
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    void play();

    function unlockOnGesture(event: PointerEvent) {
      window.removeEventListener("pointerdown", unlockOnGesture);

      if ((event.target as Element | null)?.closest("[data-music-toggle]")) {
        return;
      }

      if (!userPaused.current) {
        void play();
      }
    }

    window.addEventListener("pointerdown", unlockOnGesture);

    return () => {
      window.removeEventListener("pointerdown", unlockOnGesture);
    };
  }, []);

  function toggle() {
    if (playing) {
      userPaused.current = true;
      pause();
      return;
    }

    userPaused.current = false;
    void play();
  }

  return {
    audioRef,
    playing,
    toggle,
    setPlaying,
  };
}

export function MusicToggle({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      data-music-toggle=""
      onClick={onToggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      aria-pressed={playing}
      aria-label={playing ? `Pause ${wedding.music.title}` : `Play ${wedding.music.title}`}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-white/70 text-ink"
    >
      <motion.span
        className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/30 bg-gradient-to-br from-champagne/80 to-blush/70"
        animate={{ rotate: playing ? 360 : 0 }}
        transition={
          playing
            ? { duration: 8, repeat: Infinity, ease: "linear" }
            : { duration: 0.35 }
        }
        aria-hidden="true"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-ink/80" />
      </motion.span>
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-ink"
        aria-hidden="true"
      >
        {playing ? (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-current">
            <rect x="2" y="2" width="2.6" height="8" rx="0.4" />
            <rect x="7.4" y="2" width="2.6" height="8" rx="0.4" />
          </svg>
        ) : (
          <svg viewBox="0 0 12 12" className="ml-0.5 h-2.5 w-2.5 fill-current">
            <path d="M3.2 1.7v8.6L10.4 6 3.2 1.7Z" />
          </svg>
        )}
      </span>
    </motion.button>
  );
}

export function BackgroundAudio({
  audioRef,
  onPlay,
  onPause,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onPlay: () => void;
  onPause: () => void;
}) {
  return (
    <audio
      ref={audioRef}
      src={wedding.music.src}
      loop
      preload="auto"
      playsInline
      onPlay={onPlay}
      onPause={onPause}
    />
  );
}
