"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resolveText } from "@/lib/contentResolver";

const heading = resolveText("sakytine_heading");
const text20  = resolveText("text20");

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SakytineIstorijaSection({ id }: { id: string }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className="relative h-screen flex flex-col justify-center overflow-hidden bg-[#f2f5ee]"
    >
      {/* Subtle grid texture matching DIY section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #9ab08e 0, #9ab08e 1px, transparent 0, transparent 32px)," +
            "repeating-linear-gradient(90deg, #9ab08e 0, #9ab08e 1px, transparent 0, transparent 32px)",
          opacity: 0.025,
        }}
      />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.8, ease: EASE }}
          className="mb-10"
        >
          <h2
            className="font-serif font-normal text-[#2c302a]/75 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            {heading}
          </h2>
          <div className="w-10 h-px bg-[#9ab08e]/40 mt-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
          className="font-serif italic text-[#5e6858]/65 leading-relaxed max-w-2xl"
          style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)" }}
        >
          {text20}
        </motion.p>
      </div>
    </section>
  );
}
