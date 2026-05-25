"use client";

import { motion } from "framer-motion";
import { resolveText } from "@/lib/contentResolver";

const quote       = resolveText("final_quote");
const footerLabel = resolveText("final_footer");

export default function FinalSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden bg-[#f2f5ee]">
      <motion.div
        animate={{ opacity: [0.05, 0.11, 0.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(154,176,142,1) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <motion.div
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
        className="absolute bottom-1/3 right-1/3 w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(184,148,96,0.7) 0%, transparent 70%)", filter: "blur(50px)" }}
      />

      <div className="max-w-2xl mx-auto px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <span className="block font-serif text-[#9ab08e]/28 leading-none mb-2" style={{ fontSize: "5rem" }}>
            &ldquo;
          </span>
          <p
            className="font-serif italic text-[#5e6858]/65 leading-relaxed -mt-6"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
          >
            {quote}
          </p>
          <span className="block font-serif text-[#9ab08e]/28 leading-none mt-2 text-right" style={{ fontSize: "5rem" }}>
            &rdquo;
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.2 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <div className="w-px h-16 bg-gradient-to-b from-[#9ab08e]/25 to-transparent" />
          <p className="font-sans text-[#96a48e] text-[8px] tracking-[0.6em] uppercase">
            {footerLabel}
          </p>
          <div className="flex gap-2 items-center">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.4 + i * 0.1 }}
                viewport={{ once: true }}
                className="w-1 h-1 rounded-full bg-[#cdd8c5]"
              />
            ))}
          </div>

          <p className="font-sans text-[#7a8874] text-[11px] tracking-[0.1em] mt-14">
            Matas Cirusis, Aleksandras Mikšėnas, Matheus Baumann — VU TSPMI III kursas
          </p>
        </motion.div>
      </div>
    </section>
  );
}
