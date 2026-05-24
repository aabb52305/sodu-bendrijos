"use client";

import { motion } from "framer-motion";
import { resolveText, resolveWords } from "@/lib/contentResolver";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const wordVariant = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE_OUT },
  },
};

const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

const LINE_1   = resolveWords("hero_line1");
const LINE_2   = resolveWords("hero_line2");
const LINE_3   = resolveWords("hero_line3");
const SUBTITLE = resolveText("hero_subtitle");

export default function HeroSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f2f5ee]"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.6 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 font-sans text-[9px] tracking-[0.35em] text-[#96a48e] uppercase select-none"
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
      >
        {SUBTITLE}
      </motion.p>

      <div className="text-center px-10 max-w-6xl mx-auto select-none">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-[0.55em] gap-y-3 mb-6"
        >
          {LINE_1.map((w) => (
            <motion.span
              key={w}
              variants={wordVariant}
              className="font-serif font-normal text-[#2c302a]/85 leading-[1.05] tracking-[0.01em]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}
            >
              {w.trim()}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.3 }}
          className="flex flex-wrap justify-center gap-x-[0.55em] gap-y-3 mb-12"
        >
          {LINE_2.map((w) => (
            <motion.span
              key={w}
              variants={wordVariant}
              className="font-serif font-normal text-[#2c302a]/85 leading-[1.05] tracking-[0.01em]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}
            >
              {w.trim()}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: EASE_OUT }}
          className="flex flex-wrap justify-center gap-x-[0.4em] gap-y-2"
        >
          {LINE_3.map((w) => (
            <span
              key={w}
              className="font-serif italic text-[#b89460] leading-[1.05] tracking-[0.01em]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4.2rem)" }}
            >
              {w.trim()}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: EASE_OUT }}
        className="absolute bottom-0 left-16 right-16 h-px bg-[#cdd8c5] origin-left"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#9ab08e] to-transparent"
        />
      </motion.div>
    </section>
  );
}
