"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarChoices } from "@/components/invitation/AddToCalendar";
import { MusicToggle } from "@/components/invitation/BackgroundMusic";
import { ContactPanel } from "@/components/invitation/Contact";
import { wedding } from "@/lib/wedding";

type NavId = "venue" | "rsvp";
type Panel = "calendar" | "contact";

const items: Array<
  | { type: "calendar"; label: string; icon: "calendar" }
  | { type: "contact"; label: string; icon: "phone" }
  | { type: "link"; id: NavId; label: string; icon: "pin" | "rsvp" }
> = [
  { type: "calendar", label: "Kalendar", icon: "calendar" },
  { type: "link", id: "venue", label: "Lokasi", icon: "pin" },
  { type: "contact", label: "Hubungi", icon: "phone" },
  { type: "link", id: "rsvp", label: "RSVP", icon: "rsvp" },
];

function NavIcon({ name }: { name: "calendar" | "pin" | "phone" | "rsvp" }) {
  const className = "h-5 w-5";

  if (name === "calendar") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3.5v3M16 3.5v3M4 10h16" />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M8.5 5.5h2l1.2 3-1.5 1a12 12 0 0 0 4.3 4.3l1-1.5 3 1.2v2c0 .8-.7 1.6-1.5 1.6C9.8 17.1 6.9 14.2 6.9 7c0-.8.8-1.5 1.6-1.5Z" />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
        <circle cx="12" cy="11" r="1.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 7.5 12 12l7-4.5" />
      <rect x="4" y="6" width="16" height="12" rx="2" />
    </svg>
  );
}

export function BottomNav({
  revealed,
  playing,
  onToggleMusic,
}: {
  revealed: boolean;
  playing: boolean;
  onToggleMusic: () => void;
}) {
  const [active, setActive] = useState<NavId | "">("");
  const [panel, setPanel] = useState<Panel | null>(null);

  useEffect(() => {
    const elements = items
      .flatMap((item) => (item.type === "link" ? [document.getElementById(item.id)] : []))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id === "venue" || visible?.target.id === "rsvp") {
          setActive(visible.target.id);
        }
      },
      { threshold: [0.35, 0.6], rootMargin: "-10% 0px -45% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!panel) return;

    function close(event: PointerEvent) {
      const target = event.target as Element | null;
      if (target?.closest("[data-nav-menu]")) return;
      setPanel(null);
    }

    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [panel]);

  return (
    <AnimatePresence>
      {revealed ? (
        <motion.nav
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 28, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))]"
          aria-label="Jemputan"
        >
          <div className="relative mx-auto max-w-xl" data-nav-menu="">
            <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2">
              <MusicToggle playing={playing} onToggle={onToggleMusic} />
            </div>

            <AnimatePresence>
              {panel ? (
                <motion.div
                  key={panel}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute inset-x-0 bottom-[calc(100%+2.4rem)] z-20 max-h-[min(70dvh,32rem)] overflow-y-auto rounded-2xl border border-gold/25 bg-white/95 shadow-[0_16px_40px_rgba(63,52,44,0.12)]"
                >
                  {panel === "calendar" ? (
                    <div className="p-2">
                      <div className="px-3 pt-3 pb-2 text-center">
                        <p className="font-serif text-lg leading-snug text-ink">{wedding.dateLabel}</p>
                        <p className="mt-1 font-serif text-sm italic text-ink-soft">{wedding.timeLabel}</p>
                      </div>
                      <CalendarChoices onDone={() => setPanel(null)} />
                    </div>
                  ) : (
                    <ContactPanel />
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="grid grid-cols-4 rounded-[1.6rem] border border-gold/20 bg-stone/95 pt-7 pb-2 shadow-[0_-10px_40px_rgba(63,52,44,0.12)] backdrop-blur-md">
              {items.map((item) => {
                if (item.type === "link") {
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setPanel(null)}
                      aria-current={active === item.id ? "true" : undefined}
                      className={`flex flex-col items-center gap-1 px-1 py-1 text-[0.62rem] uppercase tracking-[0.14em] ${
                        active === item.id ? "text-gold-deep" : "text-ink-soft"
                      }`}
                    >
                      <NavIcon name={item.icon} />
                      {item.label}
                    </a>
                  );
                }

                const selected = panel === item.type;

                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setPanel(selected ? null : item.type)}
                    aria-expanded={selected}
                    className={`flex flex-col items-center gap-1 px-1 py-1 text-[0.62rem] uppercase tracking-[0.14em] ${
                      selected ? "text-gold-deep" : "text-ink-soft"
                    }`}
                  >
                    <NavIcon name={item.icon} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
