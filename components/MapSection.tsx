"use client";

import Image from "next/image";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { resolveText, resolveMap } from "@/lib/contentResolver";

const heading    = resolveText("text2");
const map1       = resolveMap("map1");
const map2       = resolveMap("map2");
const disclaimer = resolveText("map_disclaimer");

export default function MapSection({ id }: { id: string }) {
  return (
    <Fragment>
    <section id={id} className="relative h-screen flex flex-col overflow-hidden bg-[#f2f5ee]">
      <div className="flex flex-col flex-1 w-full px-6 lg:px-10 py-8">

        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-30px" }}
          className="mb-6 shrink-0"
        >
          <h2
            className="font-serif font-normal text-[#2c302a]/75 leading-tight mb-1"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.4rem)" }}
          >
            {heading}
          </h2>
          <div className="w-10 h-px bg-[#9ab08e]/40 mt-3" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 flex-1 min-h-0">
          {[
            { map: map1, delay: 0.15 },
            { map: map2, delay: 0.32 },
          ].map(({ map, delay }) => (
            <motion.div
              key={map.tag}
              className="flex flex-col min-h-0"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-30px" }}
            >
              <div className="relative flex-1 min-h-0 overflow-hidden bg-[#f2f5ee]">
                {map.src ? (
                  <Image
                    src={map.src}
                    alt={map.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-center"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#eaf0e4] border border-[#cdd8c5] flex items-center justify-center">
                    <span className="font-sans text-[#96a48e]/40 text-[9px] tracking-[0.5em] uppercase">{map.tag}</span>
                  </div>
                )}
              </div>
              <p className="mt-2.5 shrink-0 font-sans text-[#96a48e] text-[9px] tracking-[0.3em] uppercase">
                {map.caption}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-4 shrink-0 font-sans text-[#96a48e]/55 text-[7px] tracking-[0.25em]"
        >
          {disclaimer}
        </motion.p>

      </div>
    </section>
    <div className="h-[28vh] bg-[#f2f5ee]" aria-hidden="true" />
    </Fragment>
  );
}
