"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { resolveText, resolveAudio, resolvePhoto } from "@/lib/contentResolver";

const text5        = resolveText("text5");
const text6        = resolveText("text6");
const audioLabel   = resolveText("audio_archive_label");
const audio        = resolveAudio("audio1");
const sectionLabel = resolveText("diy_section_label");
const photo4       = resolvePhoto("photo4");

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_PATH: [number, number, number, number] = [0.4, 0, 0.2, 1];

function formatTime(s: number) {
  if (!isFinite(s) || isNaN(s) || s <= 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/* ── Blueprint SVG ───────────────────────────────────────────── */

function AnimPath({
  d, stroke = "#9ab08e", strokeWidth = 0.5, strokeDasharray,
  opacity = 0.4, delay = 0, dur = 1.6, inView,
}: {
  d: string; stroke?: string; strokeWidth?: number; strokeDasharray?: string;
  opacity?: number; delay?: number; dur?: number; inView: boolean;
}) {
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity } : { pathLength: 0, opacity: 0 }}
      transition={{
        pathLength: { duration: dur, delay, ease: EASE_PATH },
        opacity:    { duration: 0.01, delay },
      }}
    />
  );
}

function AnimText({
  x, y, children, delay = 0, opacity = 0.4, inView,
  textAnchor = "start", transform,
}: {
  x: number; y: number; children: string; delay?: number;
  opacity?: number; inView: boolean; textAnchor?: "start" | "middle" | "end" | "inherit"; transform?: string;
}) {
  return (
    <motion.text
      x={x} y={y}
      fill="#9ab08e"
      fontSize="6"
      fontFamily="sans-serif"
      letterSpacing="0.06em"
      textAnchor={textAnchor}
      transform={transform}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity } : { opacity: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.text>
  );
}

function GardenPlan({ inView }: { inView: boolean }) {
  return (
    <svg viewBox="0 0 480 360" fill="none" style={{ overflow: "visible", width: "100%", height: "100%" }}>
      <AnimPath d="M 42 38 L 438 38 L 438 322 L 42 322 Z"
        strokeWidth={0.8} opacity={0.55} delay={0} dur={2} inView={inView} />
      <AnimPath d="M 42 188 L 438 188" opacity={0.35} delay={0.8} inView={inView} />
      <AnimPath d="M 42 206 L 438 206" opacity={0.2} delay={1.0} inView={inView} />
      <AnimPath d="M 270 38 L 270 188" opacity={0.35} delay={1.1} inView={inView} />
      <AnimPath d="M 270 38 L 438 38 L 438 188 L 270 188 Z"
        opacity={0.22} strokeDasharray="4 3" delay={1.4} inView={inView} />
      <AnimPath d="M 300 62 L 414 62 L 414 165 L 300 165 Z"
        stroke="#b89460" opacity={0.25} delay={1.7} inView={inView} />
      <AnimPath d="M 348 165 L 348 185" stroke="#b89460" opacity={0.22} delay={1.9} inView={inView} />
      <AnimPath d="M 156 38 L 156 188" opacity={0.22} strokeDasharray="3 4" delay={1.5} inView={inView} />
      <AnimPath d="M 42 113 L 270 113" opacity={0.22} strokeDasharray="3 4" delay={1.6} inView={inView} />
      <AnimPath d="M 180 206 L 180 322" opacity={0.22} strokeDasharray="3 4" delay={1.8} inView={inView} />
      <AnimPath d="M 318 206 L 318 322" opacity={0.22} strokeDasharray="3 4" delay={1.9} inView={inView} />
      <AnimPath d="M 42 18 L 438 18" opacity={0.2} delay={2.2} inView={inView} />
      <AnimPath d="M 42 14 L 42 22" opacity={0.2} delay={2.3} inView={inView} />
      <AnimPath d="M 438 14 L 438 22" opacity={0.2} delay={2.3} inView={inView} />
      <AnimPath d="M 22 38 L 22 322" opacity={0.2} delay={2.2} inView={inView} />
      <AnimPath d="M 18 38 L 26 38" opacity={0.2} delay={2.4} inView={inView} />
      <AnimPath d="M 18 322 L 26 322" opacity={0.2} delay={2.4} inView={inView} />
      <AnimPath d="M 454 50 L 454 32 M 450 38 L 454 32 L 458 38"
        opacity={0.3} delay={2.5} inView={inView} />
      <AnimText x={238} y={14} textAnchor="middle" opacity={0.35} delay={2.6} inView={inView}>24 m</AnimText>
      <AnimText x={17} y={185} textAnchor="middle" opacity={0.35} delay={2.6}
        transform="rotate(-90, 17, 185)" inView={inView}>25 m</AnimText>
      <AnimText x={459} y={42} opacity={0.35} delay={2.7} inView={inView}>N</AnimText>
      <AnimText x={354} y={118} textAnchor="middle" opacity={0.22} delay={2.8} inView={inView}>6 arai</AnimText>
    </svg>
  );
}

/* ── Main component ──────────────────────────────────────────── */

export default function DIYSection({ id }: { id: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  function togglePlay() {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) { el.pause(); setIsPlaying(false); }
    else { el.play().catch(() => {}); setIsPlaying(true); }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    el.currentTime = fraction * el.duration;
    setProgress(fraction);
  }

  return (
    <section
      id={id}
      ref={ref}
      className="relative h-screen flex flex-col overflow-hidden bg-[#f2f5ee]"
    >
      <audio
        ref={audioRef}
        src={audio.src ?? undefined}
        onTimeUpdate={() => {
          const el = audioRef.current;
          if (!el || !el.duration) return;
          setProgress(el.currentTime / el.duration);
        }}
        onLoadedMetadata={() => {
          const el = audioRef.current;
          if (el) setDuration(el.duration);
        }}
        onEnded={() => { setIsPlaying(false); setProgress(0); }}
      />

      {/* Blueprint graph-paper background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #9ab08e 0, #9ab08e 1px, transparent 0, transparent 32px)," +
            "repeating-linear-gradient(90deg, #9ab08e 0, #9ab08e 1px, transparent 0, transparent 32px)",
          opacity: 0.025,
        }}
      />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute top-8 left-10 flex items-center gap-3 z-10"
      >
        <div className="h-px w-7 bg-[#9ab08e]/40" />
        <span className="font-sans text-[8px] tracking-[0.5em] text-[#96a48e] uppercase">{sectionLabel}</span>
      </motion.div>

      {/* Central layout — 3 columns */}
      <div className="flex-1 grid grid-cols-12 gap-0 items-stretch px-10 lg:px-16 pt-16 pb-4 min-h-0">

        {/* Left — text5 + audio player */}
        <div className="col-span-3 flex flex-col justify-between h-full py-8 pr-6 min-h-0">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.6, delay: 1.2, ease: EASE }}
          >
            <div className="w-5 h-px bg-[#b89460]/35 mb-4" />
            <p
              className="font-serif italic text-[#5e6858]/60 leading-relaxed"
              style={{ fontSize: "clamp(0.82rem, 1.1vw, 0.96rem)" }}
            >
              {text5}
            </p>
          </motion.div>

          {/* Audio player */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.4, delay: 2.6 }}
            className="border border-[#cdd8c5]/80 bg-white/25 p-5"
          >
            <p className="font-sans text-[7px] tracking-[0.45em] text-[#96a48e] uppercase mb-3">
              {audioLabel}
            </p>
            <p
              className="font-sans text-[#5e6858]/60 leading-snug mb-4"
              style={{ fontSize: "clamp(0.62rem, 0.82vw, 0.75rem)" }}
            >
              {audio.title}
            </p>
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full border border-[#9ab08e]/50 flex items-center justify-center shrink-0 hover:border-[#6b8c60]/60 transition-colors"
              >
                <span className="text-[#6b8c60] text-[10px]">{isPlaying ? "■" : "▶"}</span>
              </button>
              <span className="font-sans text-[7px] text-[#96a48e] ml-auto tabular-nums">
                {formatTime(progress * duration)} / {formatTime(duration)}
              </span>
            </div>
            {/* Seekable progress bar */}
            <div
              className="h-1.5 bg-[#cdd8c5]/60 relative cursor-pointer rounded-full"
              onClick={handleSeek}
            >
              <div
                className="absolute left-0 top-0 h-full bg-[#6b8c60]/50 rounded-full pointer-events-none"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="absolute w-3 h-3 rounded-full bg-[#6b8c60]/80 pointer-events-none"
                style={{ left: `${progress * 100}%`, top: "50%", transform: "translate(-50%, -50%)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Center — animated garden plan */}
        <div className="col-span-5 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-[400px]"
            style={{ aspectRatio: "480/360" }}
          >
            <GardenPlan inView={inView} />
          </motion.div>
        </div>

        {/* Right — photo4 + text6 */}
        <div className="col-span-4 flex flex-col h-full py-8 pl-6 min-h-0">
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.8, delay: 0.6, ease: EASE }}
            className="flex-1 min-h-0 relative overflow-hidden"
          >
            {photo4.src ? (
              <Image
                src={photo4.src}
                alt={photo4.alt}
                fill
                sizes="(max-width: 1024px) 33vw, 28vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-[#d4dece] to-stone-200">
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: "repeating-linear-gradient(45deg, #8a9 0, #8a9 1px, transparent 0, transparent 22px)" }}
                />
              </div>
            )}
          </motion.div>

          {photo4.caption && (
            <p className="font-sans text-[#96a48e] text-[7px] tracking-[0.2em] mt-2.5 shrink-0 leading-relaxed">
              {photo4.caption}
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.6, delay: 1.8, ease: EASE }}
            className="mt-5 text-right shrink-0"
          >
            <p
              className="font-serif italic text-[#5e6858]/60 leading-relaxed"
              style={{ fontSize: "clamp(0.82rem, 1.1vw, 0.96rem)" }}
            >
              {text6}
            </p>
            <div className="w-5 h-px bg-[#b89460]/35 mt-4 ml-auto" />
          </motion.div>
        </div>
      </div>

      {/* Bottom annotation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 3 }}
        className="px-10 lg:px-16 pb-6 flex items-center gap-4 shrink-0"
      >
        <div className="h-px w-8 bg-[#cdd8c5]" />
        <span className="font-sans text-[#96a48e] text-[7px] tracking-[0.45em] uppercase">
          Sodininko sklypas — tipinė schema
        </span>
      </motion.div>
    </section>
  );
}
