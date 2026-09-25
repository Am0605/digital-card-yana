"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/invitation/FadeIn";
import {
  Ornament,
  SectionEyebrow,
  SectionTitle,
} from "@/components/invitation/SectionHeader";
import { wedding } from "@/lib/wedding";

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function whatsappHref(value: string) {
  if (value.startsWith("http")) return value;
  return `https://wa.me/${value.replace(/\D/g, "")}`;
}

export function Contact() {
  const { phone, whatsapp, note } = wedding.contact;

  return (
    <section id="contact" className="scroll-mt-6 px-6 py-20 sm:py-24">
      <FadeIn>
        <SectionEyebrow>Contact</SectionEyebrow>
        <SectionTitle>Say hello</SectionTitle>
        <div className="mt-6">
          <Ornament />
        </div>
        <p className="mx-auto mt-8 max-w-md text-center font-serif text-lg leading-8 italic text-ink-soft">
          {note}
        </p>
      </FadeIn>

      {phone || whatsapp ? (
        <FadeIn delay={0.1} className="mx-auto mt-10 flex max-w-sm flex-col gap-3">
          {phone ? (
            <motion.a
              href={phoneHref(phone)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-stone"
            >
              Call {phone}
            </motion.a>
          ) : null}
          {whatsapp ? (
            <motion.a
              href={whatsappHref(whatsapp)}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full border border-gold/40 bg-white/60 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-ink"
            >
              WhatsApp
            </motion.a>
          ) : null}
        </FadeIn>
      ) : null}
    </section>
  );
}
