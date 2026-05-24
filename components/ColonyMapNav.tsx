"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { resolveText } from "@/lib/contentResolver";

const navHeader = resolveText("nav_header");

interface Section { id: string; label: string; }
interface Props { sections: Section[]; activeSection: string; onNavigate: (id: string) => void; }

export default function PlanosNav({ sections, activeSection, onNavigate }: Props) {
  const [open, setOpen] = useState(true);

  const activeIdx = sections.findIndex((s) => s.id === activeSection);
  const progress   = sections.length > 1 ? activeIdx / (sections.length - 1) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[200] flex items-center gap-1.5"
    >
      {/* Toggle tab */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-4 h-8 bg-white/60 backdrop-blur-sm border border-[#cdd8c5]/70 flex items-center justify-center text-[#b8c8b0] hover:text-[#6b8c60] transition-colors duration-300 text-[10px] rounded-sm"
        aria-label="Toggle navigation"
      >
        {open ? "›" : "‹"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-white/65 backdrop-blur-md border border-[#cdd8c5]/60 w-40 p-3 rounded-sm shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
              {/* Header — label only, no counter */}
              <div className="mb-3 pb-2 border-b border-[#e2eadc]/80">
                <span className="font-sans text-[7.5px] tracking-[0.45em] text-[#b0c0a8] uppercase">
                  {navHeader}
                </span>
              </div>

              {/* Plot nodes */}
              <div className="space-y-0.5">
                {sections.map((section, i) => {
                  const isActive = section.id === activeSection;
                  const isPast   = i < activeIdx;
                  return (
                    <button
                      key={section.id}
                      onClick={() => onNavigate(section.id)}
                      className="w-full flex items-center gap-2 group py-[3px]"
                    >
                      {/* Garden-plot rectangle */}
                      <div className="relative shrink-0" style={{ width: 24, height: 14 }}>
                        <motion.div
                          animate={{
                            backgroundColor: isActive
                              ? "rgba(107,140,96,0.16)"
                              : isPast
                              ? "rgba(107,140,96,0.04)"
                              : "rgba(200,215,190,0.14)",
                            borderColor: isActive
                              ? "rgba(107,140,96,0.52)"
                              : isPast
                              ? "rgba(107,140,96,0.18)"
                              : "rgba(180,200,170,0.28)",
                          }}
                          transition={{ duration: 0.55, ease: "easeOut" }}
                          className="absolute inset-0 border"
                        />
                        {/* Active glow fill — shared layout */}
                        {isActive && (
                          <motion.div
                            layoutId="activePlot"
                            className="absolute inset-[2px] bg-[#6b8c60]/14"
                            transition={{ type: "spring", stiffness: 180, damping: 26 }}
                          />
                        )}
                        {/* Breathing pulse on active */}
                        {isActive && (
                          <motion.div
                            animate={{ opacity: [0.18, 0.38, 0.18] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 border border-[#6b8c60]/30"
                          />
                        )}
                      </div>

                      {/* Label */}
                      <motion.span
                        animate={{
                          color: isActive
                            ? "#6b8c60"
                            : isPast
                            ? "#8a9e82"
                            : "#c2d0ba",
                        }}
                        transition={{ duration: 0.45 }}
                        className="font-sans text-[8px] tracking-wide leading-none group-hover:text-[#5e6858] transition-colors duration-300"
                      >
                        {section.label}
                      </motion.span>
                    </button>
                  );
                })}
              </div>

              {/* Progress — spatial journey line */}
              <div className="mt-3 pt-2 border-t border-[#e2eadc]/70">
                <div className="relative h-[1px] bg-[#e2eadc] overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#9ab08e]/55"
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                {/* Current label — ambient section name */}
                <motion.p
                  key={activeSection}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="font-sans text-[#b0c0a8] text-[7px] mt-1.5 tracking-[0.38em] uppercase"
                >
                  {sections[activeIdx]?.label}
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
