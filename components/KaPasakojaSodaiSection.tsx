"use client";

import { motion } from "framer-motion";
import { resolveText } from "@/lib/contentResolver";

const heading = resolveText("ka_pasakoja_heading");
const text21  = resolveText("text21");

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function KaPasakojaSodaiSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative py-32 bg-[#f2f5ee]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: EASE }}
          viewport={{ once: true, margin: "-30px" }}
          className="mb-16"
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
          viewport={{ once: true, margin: "-30px" }}
          className="font-serif italic text-[#5e6858]/65 leading-relaxed max-w-2xl"
          style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)" }}
        >
          {text21}
        </motion.p>
      </div>
    </section>
  );
}
