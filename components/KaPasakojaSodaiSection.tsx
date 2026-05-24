"use client";

import { motion } from "framer-motion";
import { resolveText } from "@/lib/contentResolver";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function KaPasakojaSodaiSection({ id }: { id: string }) {
  const heading = resolveText("ka_pasakoja_heading");
  const body    = resolveText("text21");
  const body2   = resolveText("text23");

  return (
    <section id={id} className="relative min-h-[80vh] flex items-center py-32 bg-[#f2f5ee]">

      {/* Soft horizontal accent at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#cdd8c5]/60 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 lg:px-20 w-full">

        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: EASE }}
          viewport={{ once: true, margin: "-40px" }}
          className="mb-20"
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
          viewport={{ once: true, margin: "-40px" }}
          className="font-serif text-[#5e6858]/80 leading-relaxed max-w-3xl"
          style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)" }}
        >
          {body}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-40px" }}
          className="font-serif text-[#5e6858]/80 leading-relaxed max-w-3xl mt-10"
          style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)" }}
        >
          {body2}
        </motion.p>

      </div>
    </section>
  );
}
