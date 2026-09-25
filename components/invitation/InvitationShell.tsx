"use client";

import { useState, type ReactNode } from "react";
import {
  BackgroundAudio,
  useInvitationMusic,
} from "@/components/invitation/BackgroundMusic";
import { BottomNav } from "@/components/invitation/BottomNav";
import { Curtain } from "@/components/invitation/Curtain";

export function InvitationShell({ children }: { children: ReactNode }) {
  const { audioRef, playing, play, toggle, setPlaying } = useInvitationMusic();
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");

  function reveal() {
    if (phase !== "closed") return;
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
          onFinished={() => setPhase("open")}
        />
      ) : null}
      {children}
      <BottomNav revealed={phase === "open"} playing={playing} onToggleMusic={toggle} />
    </>
  );
}
