"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { resolveText } from "@/lib/contentResolver";

const quote             = resolveText("quote1");
const labelBefore       = resolveText("transition_label_before");
const labelAfter        = resolveText("transition_label_after");
const footBefore        = resolveText("transition_foot_before");
const footDrag          = resolveText("transition_foot_drag");
const footAfter         = resolveText("transition_foot_after");

export default function TransitionMoment({ id }: { id: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef  = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-120px" });

  const [sliderPos,  setSliderPos]  = useState(90);
  const [isDragging, setIsDragging] = useState(false);
  const [autoPlayed, setAutoPlayed] = useState(false);

  useEffect(() => {
    if (!isInView || autoPlayed) return;
    setAutoPlayed(true);
    const start = Date.now();
    const from = 90, to = 48, duration = 2000;
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setSliderPos(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    setTimeout(() => requestAnimationFrame(tick), 700);
  }, [isInView, autoPlayed]);

  const move = (clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSliderPos(Math.max(3, Math.min(97, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f2f5ee]"
    >
      <motion.blockquote
        initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-40px" }}
        className="max-w-xl mx-auto text-center px-8 mb-12"
      >
        <span className="font-serif text-[#b89460]/40 text-5xl leading-none block -mb-2">&ldquo;</span>
        <p className="font-serif italic text-[#5e6858] text-lg md:text-xl leading-relaxed">
          {quote}
        </p>
      </motion.blockquote>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.5 }}
        viewport={{ once: true, margin: "-40px" }}
        className="w-full max-w-5xl mx-auto px-6"
      >
        <div
          ref={sliderRef}
          className="relative aspect-video overflow-hidden cursor-ew-resize select-none"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={(e) => isDragging && move(e.clientX)}
          onTouchMove={(e) => move(e.touches[0].clientX)}
        >
          {/* AFTER — washed stone/urban */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400">
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, #aaa 0, #aaa 1px, transparent 0, transparent 36px), repeating-linear-gradient(90deg, #aaa 0, #aaa 1px, transparent 0, transparent 36px)",
              }}
            />
            {[
              { top: "20%", left: "10%", w: "14%", h: "22%" },
              { top: "18%", left: "30%", w: "18%", h: "28%" },
              { top: "22%", left: "54%", w: "16%", h: "24%" },
              { top: "55%", left: "8%",  w: "20%", h: "18%" },
              { top: "50%", left: "38%", w: "24%", h: "26%" },
              { top: "52%", left: "68%", w: "18%", h: "22%" },
            ].map((s, i) => (
              <div
                key={i}
                className="absolute bg-stone-400/20 border border-stone-400/15"
                style={{ top: s.top, left: s.left, width: s.w, height: s.h }}
              />
            ))}
            <span className="absolute bottom-3 right-3 font-sans text-[#96a48e]/60 text-[8px] tracking-widest uppercase">
              {labelAfter}
            </span>
          </div>

          {/* BEFORE — washed green/field */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#d4e8c8] via-[#c8ddb8] to-stone-200 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage: "repeating-linear-gradient(30deg, #6a8 0, #6a8 1px, transparent 0, transparent 22px)",
              }}
            />
            <span className="absolute bottom-3 left-3 font-sans text-[#6b8c60]/60 text-[8px] tracking-widest uppercase">
              {labelBefore}
            </span>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 z-10 pointer-events-none"
            style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute inset-y-0 left-1/2 w-px bg-[#6b8c60]/60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#6b8c60]/60 flex items-center justify-center shadow-sm">
              <span className="text-[#6b8c60] text-[9px] select-none">⇔</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-3 px-1">
          <span className="font-sans text-[#96a48e] text-[8px] tracking-[0.4em] uppercase">{footBefore}</span>
          <span className="font-sans text-[#b8c8b0] text-[8px] tracking-[0.3em] uppercase">{footDrag}</span>
          <span className="font-sans text-[#96a48e] text-[8px] tracking-[0.4em] uppercase">{footAfter}</span>
        </div>
      </motion.div>
    </section>
  );
}
