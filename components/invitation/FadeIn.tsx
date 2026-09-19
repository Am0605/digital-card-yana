"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const motionTags = {
  div: motion.div,
  section: motion.section,
  header: motion.header,
  footer: motion.footer,
  li: motion.li,
};

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof motionTags;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  as = "div",
}: FadeInProps) {
  const Component = motionTags[as];

  return (
    <Component
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -48px 0px" }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </Component>
  );
}
