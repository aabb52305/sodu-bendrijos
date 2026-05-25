"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { resolveText, resolvePhoto } from "@/lib/contentResolver";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function KaPasakojaSodaiSection({ id }: { id: string }) {
  const heading = resolveText("ka_pasakoja_heading");
  const body    = resolveText("text21");
  const body2   = resolveText("text23");
  const body3   = resolveText("text24");
  const photo17 = resolvePhoto("photo17");

  return (
    <section id={id} className="relative min-h-screen flex items-center py-24 bg-[#f2f5ee]">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#cdd8c5]/60 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 lg:px-20 w-full">

        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: EASE }}
          viewport={{ once: true, margin: "-40px" }}
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.72fr] gap-10 lg:gap-16 items-start">

          {/* Text column */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
              viewport={{ once: true, margin: "-40px" }}
              className="font-serif text-[#5e6858]/80 leading-relaxed"
              style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)" }}
            >
              {body}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.65, ease: EASE }}
              viewport={{ once: true, margin: "-40px" }}
              className="font-serif text-[#5e6858]/80 leading-relaxed mt-8"
              style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)" }}
            >
              {body2}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.9, ease: EASE }}
              viewport={{ once: true, margin: "-40px" }}
              className="font-serif text-[#5e6858]/80 leading-relaxed mt-8"
              style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)" }}
            >
              {body3}
            </motion.p>
          </div>

          {/* Image column */}
          {photo17.src && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.3, ease: EASE }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={photo17.src}
                  alt={photo17.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="object-cover object-center"
                />
              </div>
              {photo17.caption && (
                <p className="font-sans text-[#96a48e] text-[9px] tracking-[0.2em] mt-2.5 leading-relaxed">
                  {photo17.caption}
                </p>
              )}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
