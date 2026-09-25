"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getGoogleCalendarUrl } from "@/lib/calendar";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M22 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.6a4.8 4.8 0 0 1-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.5Z" />
      <path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.2 13.6A6 6 0 0 1 6.2 10.4V7.7H2.7a10 10 0 0 0 0 8.6l3.5-2.7Z" />
      <path fill="#EA4335" d="M12 6.1c1.5 0 2.9.5 4 1.5l3-3A10 10 0 0 0 2.7 7.7l3.5 2.7C7 7.9 9.3 6.1 12 6.1Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.6.8-3.3.8s-1.7-.8-2.8-.7c-1.5.1-2.8.8-3.6 2.1-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7 1.9-1.1 2.6-2.2c.8-1.2 1.2-2.4 1.2-2.4s-2.2-.9-2.2-3.5ZM14.8 6.8c.6-.7 1-1.7.9-2.7-1 .1-2.1.6-2.8 1.4-.6.7-1.1 1.7-.9 2.7 1.1.1 2.1-.5 2.8-1.4Z" />
    </svg>
  );
}

export function CalendarChoices({ onDone }: { onDone?: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <a
        href={getGoogleCalendarUrl()}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm text-ink transition-colors hover:bg-stone"
        onClick={onDone}
      >
        <GoogleIcon />
        Google
      </a>
      <a
        href="/calendar"
        className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm text-ink transition-colors hover:bg-stone"
        onClick={onDone}
      >
        <AppleIcon />
        Apple
      </a>
    </div>
  );
}

export function AddToCalendar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-stone shadow-[0_10px_24px_rgba(74,28,42,0.16)] transition-colors hover:bg-gold-deep"
      >
        Tambah ke kalendar
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="absolute top-[calc(100%+0.6rem)] right-0 left-0 z-20 overflow-hidden rounded-2xl border border-gold/25 bg-white/95 p-2 shadow-[0_16px_40px_rgba(74,28,42,0.12)] backdrop-blur-md sm:left-auto sm:w-56"
          >
            <CalendarChoices onDone={() => setOpen(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
