"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/lib/wedding";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M8.5 5.5h2l1.2 3-1.5 1a12 12 0 0 0 4.3 4.3l1-1.5 3 1.2v2c0 .8-.7 1.6-1.5 1.6C9.8 17.1 6.9 14.2 6.9 7c0-.8.8-1.5 1.6-1.5Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10.1 10.1 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.92c-.24.68-1.4 1.25-1.93 1.33-.49.07-1.1.1-1.78-.11-.41-.13-.94-.3-1.62-.59-2.85-1.23-4.7-4.1-4.84-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.39.85-.39.21 0 .42 0 .6.01.19.01.45-.07.7.53.24.62.84 2.13.91 2.28.07.15.12.33.02.53-.1.2-.14.32-.28.49-.14.17-.29.38-.42.51-.14.14-.28.29-.12.56.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.54.73 1.8.86.27.13.44.2.51.31.06.11.06.64-.18 1.32z" />
    </svg>
  );
}

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function whatsappHref(phone: string, whatsapp: string) {
  if (whatsapp.startsWith("http")) return whatsapp;

  const digits = (whatsapp || phone).replace(/\D/g, "");
  const international = digits.startsWith("0") ? `60${digits.slice(1)}` : digits;
  return `https://wa.me/${international}`;
}

function ContactPerson({
  name,
  role,
  phone,
  whatsapp,
}: {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <p className="font-serif text-base leading-tight text-ink">{name}</p>
        {role ? <p className="mt-0.5 font-sans text-xs text-ink-soft">{role}</p> : null}
        <p className="mt-0.5 font-sans text-xs tracking-wide text-ink-soft">{phone}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <a
          href={phoneHref(phone)}
          aria-label={`Panggil ${name}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-stone"
        >
          <PhoneIcon />
        </a>
        <a
          href={whatsappHref(phone, whatsapp)}
          target="_blank"
          rel="noreferrer"
          aria-label={`WhatsApp ${name}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-white text-ink"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  );
}

export function ContactPanel() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="p-2">
      {wedding.contact.groups.map((group) => {
        const expanded = open === group.title;

        return (
          <div key={group.title} className="overflow-hidden">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : group.title)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-ink transition-colors hover:bg-stone"
            >
              <span className="font-medium tracking-wide">{group.title}</span>
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className={`h-4 w-4 text-ink-soft transition-transform ${expanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-2">
                    {group.sections.map((section, sectionIndex) => (
                      <div key={`${group.title}-${sectionIndex}`}>
                        {section.label ? (
                          <p className="pt-1 pb-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-gold-deep">
                            {section.label}
                          </p>
                        ) : null}
                        <div className="divide-y divide-gold/15">
                          {section.people.map((person) => (
                            <ContactPerson key={`${person.name}-${person.phone}`} {...person} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
