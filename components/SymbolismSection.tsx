"use client";

import { motion } from "framer-motion";
import { resolveText, resolveQuoteLines, resolveSymbolismBlocks } from "@/lib/contentResolver";

const heading = resolveText("symbolism_heading");
const BLOCKS   = resolveSymbolismBlocks();
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SymbolismSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative py-28 bg-[#f2f5ee]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: EASE }}
          viewport={{ once: true, margin: "-30px" }}
          className="mb-24"
        >
          <h2
            className="font-serif font-normal text-[#2c302a]/75 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            {heading}
          </h2>
          <div className="w-10 h-px bg-[#9ab08e]/40 mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 lg:gap-x-28 lg:gap-y-32">
          {BLOCKS.map((block, i) => {
            const quoteLines = resolveQuoteLines(block.quoteId);
            return (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 2, delay: (i % 2) * 0.18, ease: EASE }}
                viewport={{ once: true, margin: "-40px" }}
                className="relative"
              >
                <span
                  className="absolute -top-8 -left-1 font-serif font-normal leading-none select-none pointer-events-none"
                  style={{ fontSize: "clamp(6rem, 11vw, 9rem)", color: "rgba(44,48,42,0.045)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative pt-10">
                  <motion.h3
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.6, delay: 0.1 + (i % 2) * 0.18, ease: EASE }}
                    viewport={{ once: true }}
                    className="font-serif font-normal text-[#2c302a]/70 leading-tight mb-5"
                    style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
                  >
                    {block.title}
                  </motion.h3>
                  <div className="w-10 h-px bg-[#cdd8c5]" />

                  <div className="mt-9 space-y-4">
                    {quoteLines.map((line, j) => (
                      <motion.p
                        key={j}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.6, delay: 0.3 + j * 0.2 }}
                        viewport={{ once: true }}
                        className="font-serif italic text-[#5e6858]/65 leading-relaxed"
                        style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)" }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>

                  {block.description && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1.4, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="mt-7 font-sans text-[#96a48e]/55 leading-relaxed"
                      style={{ fontSize: "clamp(0.78rem, 1.05vw, 0.88rem)" }}
                    >
                      {block.description}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
