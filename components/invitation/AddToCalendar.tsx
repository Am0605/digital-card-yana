"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { downloadIcsFile, getGoogleCalendarUrl } from "@/lib/calendar";

export function AddToCalendar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-stone shadow-[0_10px_24px_rgba(63,52,44,0.16)] transition-colors hover:bg-gold-deep sm:w-auto"
      >
        Add to Calendar
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="absolute top-[calc(100%+0.6rem)] right-0 left-0 z-20 overflow-hidden rounded-2xl border border-gold/25 bg-white/95 p-2 shadow-[0_16px_40px_rgba(63,52,44,0.12)] backdrop-blur-md sm:left-auto sm:w-56"
          >
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl px-4 py-3 text-left text-sm text-ink transition-colors hover:bg-stone"
              onClick={() => setOpen(false)}
            >
              Google Calendar
            </a>
            <button
              type="button"
              className="block w-full rounded-xl px-4 py-3 text-left text-sm text-ink transition-colors hover:bg-stone"
              onClick={() => {
                downloadIcsFile();
                setOpen(false);
              }}
            >
              Download .ics
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
