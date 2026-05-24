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

function formatTime(s: number) {
  if (!isFinite(s) || isNaN(s) || s <= 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

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

      <div className="flex flex-col flex-1 w-full px-10 lg:px-16 pt-10 pb-8 min-h-0">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.6, ease: EASE }}
          className="mb-6 shrink-0"
        >
          <h2
            className="font-serif font-normal text-[#2c302a]/75 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            {sectionLabel}
          </h2>
          <div className="w-10 h-px bg-[#9ab08e]/40 mt-3" />
        </motion.div>

        {/* Main content: photo (dominant) + sidebar */}
        <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">

          {/* Left — photo (dominant visual anchor) */}
          <div className="col-span-7 flex flex-col min-h-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 2, delay: 0.25, ease: EASE }}
              className="flex-1 relative overflow-hidden min-h-0"
            >
              {photo4.src ? (
                <Image
                  src={photo4.src}
                  alt={photo4.alt}
                  fill
                  sizes="(max-width: 1024px) 60vw, 52vw"
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
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.7 }}
                className="font-sans text-[#96a48e] text-[9px] tracking-[0.2em] mt-2.5 shrink-0 leading-relaxed"
              >
                {photo4.caption}
              </motion.p>
            )}
          </div>

          {/* Right — text + audio */}
          <div className="col-span-5 flex flex-col justify-between py-1 min-h-0">

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
            >
              <div className="w-5 h-px bg-[#b89460]/35 mb-5" />
              <p
                className="font-serif italic text-[#5e6858]/75 leading-relaxed"
                style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)" }}
              >
                {text5}
              </p>
            </motion.div>

            {/* Audio player — clearly discoverable */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 1.2 }}
              className="border border-[#9ab08e]/40 bg-white/30 p-5"
            >
              <p className="font-sans text-[7px] tracking-[0.45em] text-[#96a48e] uppercase mb-3">
                {audioLabel}
              </p>
              <p
                className="font-sans text-[#5e6858]/60 leading-snug mb-5"
                style={{ fontSize: "clamp(0.68rem, 0.9vw, 0.8rem)" }}
              >
                {audio.title}
              </p>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full border border-[#9ab08e]/55 flex items-center justify-center shrink-0 hover:border-[#6b8c60]/70 hover:bg-[#9ab08e]/[0.06] transition-all"
                >
                  <span className="text-[#6b8c60] text-[11px]">{isPlaying ? "■" : "▶"}</span>
                </button>
                <span className="font-sans text-[7px] text-[#96a48e] ml-auto tabular-nums">
                  {formatTime(progress * duration)} / {formatTime(duration)}
                </span>
              </div>
              <div
                className="h-1.5 bg-[#cdd8c5]/70 relative cursor-pointer rounded-full"
                onClick={handleSeek}
              >
                <div
                  className="absolute left-0 top-0 h-full bg-[#6b8c60]/55 rounded-full pointer-events-none"
                  style={{ width: `${progress * 100}%` }}
                />
                <div
                  className="absolute w-3 h-3 rounded-full bg-[#6b8c60]/85 pointer-events-none shadow-sm"
                  style={{ left: `${progress * 100}%`, top: "50%", transform: "translate(-50%, -50%)" }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.6, delay: 0.9, ease: EASE }}
              className="text-right"
            >
              <p
                className="font-serif italic text-[#5e6858]/75 leading-relaxed"
                style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)" }}
              >
                {text6}
              </p>
              <div className="w-5 h-px bg-[#b89460]/35 mt-4 ml-auto" />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
