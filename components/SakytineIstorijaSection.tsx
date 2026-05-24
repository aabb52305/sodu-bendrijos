"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resolveText } from "@/lib/contentResolver";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SakytineIstorijaSection({ id }: { id: string }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const heading = resolveText("sakytine_heading");
  const body    = resolveText("text20");

  return (
    <section
      id={id}
      ref={ref}
      className="relative h-screen flex flex-col justify-center overflow-hidden bg-[#f2f5ee]"
    >
      {/* Soft vertical accent — archival / transitional feel */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#9ab08e]/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 lg:px-20 w-full">

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 2, ease: EASE }}
          className="mb-14"
        >
          <h2
            className="font-serif font-normal text-[#2c302a]/75 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {heading}
          </h2>
          <div className="w-12 h-px bg-[#9ab08e]/35 mt-5" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.8, delay: 0.5, ease: EASE }}
          className="font-serif italic text-[#5e6858]/65 leading-loose max-w-3xl"
          style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)" }}
        >
          {body}
        </motion.p>

      </div>
    </section>
  );
}
