"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { resolvePhoto } from "@/lib/contentResolver";

const photo = resolvePhoto("photo1");

export default function FirstVisualMoment({ id }: { id: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0.4]);

  return (
    <section id={id} ref={ref} className="relative h-screen overflow-hidden bg-[#f2f5ee]">
      <motion.div style={{ opacity }} className="absolute inset-0">
        <motion.div style={{ y }} className="absolute inset-[-6%]">
          {photo.src ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-300 to-[#d4dece]">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #8a9 0, #8a9 1px, transparent 0, transparent 26px)",
                }}
              />
            </div>
          )}
        </motion.div>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #f2f5ee 0%, transparent 18%, transparent 82%, #f2f5ee 100%)",
          }}
        />

      </motion.div>
    </section>
  );
}
