"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { resolveQuoteLines, resolveSocialSections, resolvePhoto, type SocialSectionContent, type PhotoContent } from "@/lib/contentResolver";

type Layout = SocialSectionContent["layout"];

interface SubData {
  title: string;
  quoteLines: string[];
  layout: Layout;
  photo?: PhotoContent;
}

const darbasPhoto = resolvePhoto("photo20");

const SUBSECTIONS: SubData[] = resolveSocialSections().map((s) => ({
  title:      s.title,
  quoteLines: resolveQuoteLines(s.quoteId),
  layout:     s.layout,
  photo:      s.title === "Darbas" ? darbasPhoto : undefined,
}));

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Divider() {
  return <div className="w-full h-px bg-[#cdd8c5]" />;
}

function SubFullQuote({ data }: { data: SubData }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.8 }}
      viewport={{ once: true, margin: "-60px" }}
      className="min-h-[85vh] flex items-center py-32"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16 lg:pr-56 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <h3
            className="font-serif font-normal text-[#2c302a]/80 leading-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
          >
            {data.title}
          </h3>
        </motion.div>

        <div className="border-l border-[#9ab08e]/35 pl-10 space-y-12">
          {data.quoteLines.map((line, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.2 + i * 0.35, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <p
                className="font-serif italic text-[#5e6858]/75 leading-relaxed"
                style={{ fontSize: "clamp(1.05rem, 1.9vw, 1.5rem)" }}
              >
                {line}
              </p>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SubCentered({ data }: { data: SubData }) {
  /* Two-quote conversational layout */
  if (data.quoteLines.length > 1) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
        viewport={{ once: true, margin: "-60px" }}
        className="min-h-[85vh] flex items-center py-28"
      >
        <div className="max-w-6xl mx-auto px-8 lg:px-16 w-full">
          <motion.h3
            initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: EASE }}
            viewport={{ once: true, margin: "-60px" }}
            className="font-serif font-normal text-[#2c302a]/80 leading-tight mb-16"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
          >
            {data.title}
          </motion.h3>

          <div className="space-y-14">
            {data.quoteLines.map((line, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -14 : 14, filter: "blur(3px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 2.2, delay: 0.15 + i * 0.55, ease: EASE }}
                viewport={{ once: true, margin: "-60px" }}
                className={i % 2 === 0 ? "max-w-2xl" : "max-w-2xl ml-auto text-right"}
              >
                <p
                  className="font-serif italic text-[#5e6858]/75 leading-relaxed"
                  style={{ fontSize: "clamp(1.05rem, 1.85vw, 1.45rem)" }}
                >
                  {line}
                </p>
                <div
                  className="w-6 h-px bg-[#9ab08e]/30 mt-6"
                  style={{ marginLeft: i % 2 !== 0 ? "auto" : 0 }}
                />
              </motion.blockquote>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  /* Single-quote centered layout */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.8 }}
      viewport={{ once: true, margin: "-60px" }}
      className="min-h-[75vh] flex items-center py-24"
    >
      <div className="max-w-xl mx-auto px-8 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
          className="font-serif font-normal text-[#2c302a]/80 leading-tight mt-4 mb-10"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
        >
          {data.title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="w-8 h-px bg-[#9ab08e]/30 mx-auto mb-8" />
          <p className="font-serif italic text-[#5e6858]/75 text-xl leading-relaxed">
            {data.quoteLines[0]}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SubRightLine({ data }: { data: SubData }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.8 }}
      viewport={{ once: true, margin: "-60px" }}
      className="min-h-[75vh] flex items-center py-28"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — photo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.15, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
        >
          {data.photo?.src && (
            <>
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={data.photo.src}
                  alt={data.photo.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              {data.photo.caption && (
                <p className="font-sans text-[#96a48e] text-[9px] tracking-[0.2em] mt-2.5 leading-relaxed">
                  {data.photo.caption}
                </p>
              )}
            </>
          )}
        </motion.div>

        {/* Right — title + quotes */}
        <div className="text-right">
          <motion.h3
            initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: EASE }}
            viewport={{ once: true, margin: "-60px" }}
            className="font-serif font-normal text-[#2c302a]/80 leading-tight mt-3 mb-8"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
          >
            {data.title}
          </motion.h3>
          <div className={data.quoteLines.length > 1 ? "space-y-12" : undefined}>
            {data.quoteLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, delay: 0.2 + i * 0.55, ease: EASE }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-px bg-[#cdd8c5] ml-auto mb-8" />
                <p
                  className="font-serif italic text-[#5e6858]/75 leading-relaxed max-w-2xl ml-auto"
                  style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.5rem)" }}
                >
                  {line}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function SubFullCenter({ data }: { data: SubData }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2 }}
      viewport={{ once: true, margin: "-60px" }}
      className="min-h-screen flex items-center py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9ab08e]/4 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.2, delay: 0.2, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <h3
            className="font-serif font-normal text-[#b89460]/75 leading-tight mb-10"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {data.title}
          </h3>
          <div className="w-8 h-px bg-[#9ab08e]/25 mx-auto mb-10" />
          <blockquote
            className="font-serif italic text-[#5e6858]/70 leading-relaxed"
            style={{ fontSize: "clamp(1.3rem, 3vw, 2.4rem)" }}
          >
            {data.quoteLines[0]}
          </blockquote>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SocialLifeSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative bg-[#f2f5ee]">
      {SUBSECTIONS.map((sub) => (
        <div key={sub.title}>
          <Divider />
          {sub.layout === "fullquote"  && <SubFullQuote  data={sub} />}
          {sub.layout === "centered"   && <SubCentered   data={sub} />}
          {sub.layout === "rightline"  && <SubRightLine  data={sub} />}
          {sub.layout === "fullcenter" && <SubFullCenter data={sub} />}
        </div>
      ))}
      <Divider />
    </section>
  );
}
