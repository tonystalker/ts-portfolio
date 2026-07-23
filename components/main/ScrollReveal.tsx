"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";

export function ScrollReveal({ children, className = "", id, ariaLabel }: { children: React.ReactNode, className?: string, id?: string, ariaLabel?: string }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id={id}
        aria-label={ariaLabel}
        className={className}
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.section>
    </LazyMotion>
  );
}
