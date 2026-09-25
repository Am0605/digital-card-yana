"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/invitation/FadeIn";
import {
  Ornament,
  SectionEyebrow,
  SectionTitle,
} from "@/components/invitation/SectionHeader";
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

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-6 px-6 py-20 sm:py-24">
      <FadeIn>
        <SectionEyebrow>Hubungi</SectionEyebrow>
        <SectionTitle>Hubungi kami</SectionTitle>
        <div className="mt-6">
          <Ornament />
        </div>
        <p className="mx-auto mt-8 max-w-md text-center font-serif text-lg leading-8 italic text-ink-soft">
          {wedding.contact.note}
        </p>
      </FadeIn>

      <div className="mx-auto mt-10 flex max-w-md flex-col gap-4">
        {wedding.contact.people.map((person, index) => (
          <FadeIn key={person.phone} delay={index * 0.08}>
            <article className="rounded-[1.75rem] border border-gold/20 bg-white/55 px-6 py-6 text-center shadow-[0_16px_40px_rgba(63,52,44,0.06)]">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-gold-deep">
                {person.side}
              </p>
              <p className="mt-2 font-serif text-2xl text-ink">{person.name}</p>
              <p className="mt-1 font-sans text-sm text-ink-soft">{person.role}</p>
              <p className="mt-3 font-sans text-sm tracking-wide text-ink">{person.phone}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <motion.a
                  href={phoneHref(person.phone)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-3 py-3 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-stone"
                >
                  <PhoneIcon />
                  Call
                </motion.a>
                <motion.a
                  href={whatsappHref(person.phone, person.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-white/70 px-3 py-3 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </motion.a>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
