"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { resolveText, resolvePhoto } from "@/lib/contentResolver";

const title    = resolveText("svetur_title");
const subtitle = resolveText("svetur_subtitle");

const state1   = resolveText("state1_name");
const text9    = resolveText("text9");
const photo11  = resolvePhoto("photo11");

const state2   = resolveText("state2_name");
const text10   = resolveText("text10");
const photo12  = resolvePhoto("photo12");

const state3   = resolveText("state3_name");
const text11   = resolveText("text11");
const photo13  = resolvePhoto("photo13");

const state4   = resolveText("state4_name");
const text12   = resolveText("text12");
const photo14  = resolvePhoto("photo14");

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Photo placeholder block ───────────────────────────────────── */

function PhotoPlaceholder({
  photo,
  className = "",
  gradient = "from-stone-100 via-[#d4dece] to-stone-200",
}: {
  photo: { src?: string | null; alt: string };
  className?: string;
  gradient?: string;
}) {
  if (photo.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #8a9 0, #8a9 1px, transparent 0, transparent 22px)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-sans text-[#96a48e]/35 text-[9px] tracking-[0.6em] uppercase">
          {photo.alt}
        </span>
      </div>
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#9ab08e]/25" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#9ab08e]/25" />
    </div>
  );
}

/* ── State name heading ─────────────────────────────────────────── */

function StateName({ name, align = "left", size = "lg" }: { name: string; align?: "left" | "right"; size?: "lg" | "xl" }) {
  const fs = size === "xl"
    ? "clamp(4rem, 10vw, 9rem)"
    : "clamp(2.8rem, 7vw, 6.5rem)";
  return (
    <span
      className={`font-serif font-normal text-[#2c302a]/12 leading-none select-none block ${align === "right" ? "text-right" : ""}`}
      style={{ fontSize: fs, letterSpacing: "-0.02em", color: "rgba(44,48,42,0.10)" }}
    >
      {name}
    </span>
  );
}

/* ── Main section ───────────────────────────────────────────────── */

export default function TraditionsSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative bg-[#f2f5ee] overflow-hidden">

      {/* ── Intro header ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: EASE }}
          viewport={{ once: true, margin: "-40px" }}
        >
          <h2
            className="font-serif font-normal text-[#2c302a]/80 leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            {title}
          </h2>
          <div className="w-12 h-px bg-[#9ab08e]/40 mb-8" />
          <p
            className="font-sans text-[#5e6858]/65 leading-relaxed max-w-2xl"
            style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.05rem)" }}
          >
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* ── State 1 — Russia : large photo left, big name + text right ── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Photo — 7 cols */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: EASE }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <PhotoPlaceholder
              photo={photo11}
              className="aspect-[4/3]"
              gradient="from-stone-100 via-[#d4dece] to-stone-200"
            />
          </motion.div>

          {/* Text — 5 cols */}
          <motion.div
            className="lg:col-span-5 lg:pt-8 flex flex-col gap-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <StateName name={state1} size="xl" />
            <div className="w-8 h-px bg-[#9ab08e]/35" />
            <p
              className="font-sans text-[#5e6858]/70 leading-relaxed"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.05rem)" }}
            >
              {text9}
            </p>
            {photo11.caption && (
              <span className="font-sans text-[7px] tracking-[0.4em] text-[#96a48e] uppercase mt-2 block">
                {photo11.caption}
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Thin rule */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="h-px bg-[#e2eadc]" />
      </div>

      {/* ── State 2 — Poland : reversed, photo smaller and right ──── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

          {/* Text — 6 cols */}
          <motion.div
            className="lg:col-span-6 flex flex-col gap-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: EASE }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <StateName name={state2} size="xl" align="right" />
            <div className="w-8 h-px bg-[#9ab08e]/35 ml-auto" />
            <p
              className="font-sans text-[#5e6858]/70 leading-relaxed text-right"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.05rem)" }}
            >
              {text10}
            </p>
            {photo12.caption && (
              <span className="font-sans text-[7px] tracking-[0.4em] text-[#96a48e] uppercase mt-2 text-right block">
                {photo12.caption}
              </span>
            )}
          </motion.div>

          {/* Photo — 5 cols, offset top */}
          <motion.div
            className="lg:col-span-5 lg:col-start-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.25, ease: EASE }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <PhotoPlaceholder
              photo={photo12}
              className="aspect-[3/4]"
              gradient="from-[#e2eadc] via-stone-100 to-[#d4dece]"
            />
          </motion.div>
        </div>
      </div>

      {/* Thin rule */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="h-px bg-[#e2eadc]" />
      </div>

      {/* ── States 3+4 — comparative side-by-side (unequal) ────────── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* State 3 (Czech) — text-heavy, smaller photo at top: 5 cols */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: EASE }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <PhotoPlaceholder
              photo={photo13}
              className="aspect-video"
              gradient="from-stone-200 via-[#cdd8c5] to-stone-100"
            />
            <div className="pt-2">
              <StateName name={state3} size="lg" />
              <div className="w-6 h-px bg-[#9ab08e]/35 mt-4 mb-5" />
              <p
                className="font-sans text-[#5e6858]/70 leading-relaxed"
                style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.05rem)" }}
              >
                {text11}
              </p>
              {photo13.caption && (
                <span className="font-sans text-[7px] tracking-[0.4em] text-[#96a48e] uppercase mt-4 block">
                  {photo13.caption}
                </span>
              )}
            </div>
          </motion.div>

          {/* Vertical divider — subtle */}
          <div className="hidden lg:flex lg:col-span-1 items-stretch justify-center">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
              viewport={{ once: true }}
              className="w-px bg-[#e2eadc] origin-top"
              style={{ minHeight: "100%" }}
            />
          </div>

          {/* State 4 (Germany) — image-heavy: 6 cols */}
          <motion.div
            className="lg:col-span-6 flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.2, ease: EASE }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <PhotoPlaceholder
              photo={photo14}
              className="aspect-[5/4]"
              gradient="from-[#e8e0d4] via-stone-100 to-stone-200"
            />
            <div className="flex items-start justify-between pt-2">
              <div className="flex-1">
                <StateName name={state4} size="lg" />
                <p
                  className="font-sans text-[#5e6858]/70 leading-relaxed mt-4 max-w-sm"
                  style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.05rem)" }}
                >
                  {text12}
                </p>
                {photo14.caption && (
                  <span className="font-sans text-[7px] tracking-[0.4em] text-[#96a48e] uppercase mt-4 block">
                    {photo14.caption}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
