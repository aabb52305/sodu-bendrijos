"use client";

import { motion } from "framer-motion";
import { resolveText } from "@/lib/contentResolver";

const escapismLabel    = resolveText("escapism_label");
const text3            = resolveText("text3");
const contradictionLabel = resolveText("contradiction_label");
const text4            = resolveText("text4");
const footerLabel      = resolveText("escapism_footer");

export default function EscapismSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative h-screen flex items-center overflow-hidden bg-[#f2f5ee]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ background: "#cdd8c5" }}>
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-40px" }}
            className="bg-[#f2f5ee] p-10 lg:p-14 xl:p-16 relative"
          >
            <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#9ab08e]/30 to-transparent" />
            <p className="font-sans text-[8px] tracking-[0.5em] text-[#96a48e] uppercase mb-8">
              {escapismLabel}
            </p>
            <p
              className="font-serif font-normal text-[#2c302a]/70 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)" }}
            >
              {text3}
            </p>
            <div className="mt-8 w-7 h-px bg-[#9ab08e]/35" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-40px" }}
            className="bg-[#f5f7f2] p-10 lg:p-14 xl:p-16 relative"
          >
            <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#cdd8c5]/50 to-transparent" />
            <p className="font-sans text-[8px] tracking-[0.5em] text-[#96a48e] uppercase mb-8">
              {contradictionLabel}
            </p>
            <p
              className="font-serif font-normal text-[#5e6858]/80 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)" }}
            >
              {text4}
            </p>
            <div className="mt-8 w-7 h-px bg-[#cdd8c5]/60" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="h-px w-10 bg-[#cdd8c5]" />
          <span className="font-sans text-[#96a48e] text-[8px] tracking-[0.4em] uppercase">{footerLabel}</span>
        </motion.div>
      </div>
    </section>
  );
}
