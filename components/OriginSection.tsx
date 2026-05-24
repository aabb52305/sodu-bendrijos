"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { resolveText, resolveParagraphs, resolvePhoto } from "@/lib/contentResolver";

const heading       = resolveText("origin_heading");
const headingAccent = resolveText("origin_heading_accent");
const paragraphs    = resolveParagraphs("text1");
const photo         = resolvePhoto("photo2");

export default function OriginSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative h-screen flex items-center overflow-hidden bg-[#f2f5ee]"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-14 xl:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-40px" }}
          >
            <h2
              className="font-serif font-normal text-[#2c302a]/80 leading-tight mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
            >
              {heading}
            </h2>
            <h2
              className="font-serif italic text-[#b89460] leading-tight mb-12"
              style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
            >
              {headingAccent}
            </h2>

            <div className="space-y-7 font-sans text-[#5e6858] leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)" }}
            >
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.4, delay: 0.35 + i * 0.25 }}
                  viewport={{ once: true }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-40px" }}
          >
            <div
              className="relative overflow-hidden w-full bg-[#f2f5ee]"
              style={{ height: "clamp(320px, 60vh, 540px)" }}
            >
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-contain object-center"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-[#d4dece] to-stone-200">
                    <div
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, #6a8 0, #6a8 1px, transparent 0, transparent 30px), repeating-linear-gradient(90deg, #6a8 0, #6a8 1px, transparent 0, transparent 30px)",
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-sans text-[#96a48e]/40 text-[9px] tracking-[0.5em] uppercase">
                      {photo.alt}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#9ab08e]/30" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#9ab08e]/30" />
                </>
              )}
            </div>

            {photo.caption && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.7 }}
                viewport={{ once: true }}
                className="mt-3 flex items-center gap-3"
              >
                <div className="h-px flex-1 bg-[#cdd8c5]" />
                <span className="font-sans text-[#96a48e] text-[8px] tracking-[0.3em] uppercase">
                  {photo.caption}
                </span>
                <div className="h-px flex-1 bg-[#cdd8c5]" />
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
