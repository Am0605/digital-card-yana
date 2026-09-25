"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  BackgroundAudio,
  useInvitationMusic,
} from "@/components/invitation/BackgroundMusic";
import { BottomNav } from "@/components/invitation/BottomNav";
import { Curtain } from "@/components/invitation/Curtain";

function scrollToHero() {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    root.style.scrollBehavior = previous;
  });
}

export function InvitationShell({ children }: { children: ReactNode }) {
  const { audioRef, playing, play, toggle, setPlaying } = useInvitationMusic();
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    scrollToHero();
  }, []);

  function reveal() {
    if (phase !== "closed") return;
    scrollToHero();
    play();
    setPhase("opening");
  }

  return (
    <>
      <BackgroundAudio
        audioRef={audioRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {phase !== "open" ? (
        <Curtain
          opening={phase === "opening"}
          onOpen={reveal}
          onFinished={() => {
            scrollToHero();
            setPhase("open");
          }}
        />
      ) : null}
      {children}
      <BottomNav revealed={phase === "open"} playing={playing} onToggleMusic={toggle} />
    </>
  );
}
