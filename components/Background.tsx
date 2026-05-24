"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Background() {
  const { scrollYProgress } = useScroll();

  // Different blobs drift at different rates as user scrolls
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0,  100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0,  -70]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0,  120]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Paper base */}
      <div className="absolute inset-0 bg-[#f2f5ee]" />

      {/* ── Biomorphic form 1 — large sage, upper left ── */}
      <motion.div style={{ y: y1 }} className="absolute -top-[20%] -left-[12%]">
        <motion.div
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "40% 60% 70% 30% / 40% 70% 30% 60%",
              "55% 45% 42% 58% / 52% 38% 66% 44%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
            scale: [1, 1.03, 0.975, 1],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width:  "min(62vw, 820px)",
            height: "min(62vw, 820px)",
            background:
              "radial-gradient(ellipse 58% 58% at 44% 44%, rgba(154,176,142,0.11) 0%, rgba(180,205,160,0.05) 52%, transparent 74%)",
            filter: "blur(52px)",
          }}
        />
      </motion.div>

      {/* ── Biomorphic form 2 — warm off-white, lower right ── */}
      <motion.div style={{ y: y2 }} className="absolute -bottom-[28%] -right-[12%]">
        <motion.div
          animate={{
            borderRadius: [
              "42% 58% 52% 48% / 32% 52% 48% 68%",
              "65% 35% 35% 65% / 60% 38% 62% 40%",
              "30% 70% 62% 38% / 46% 36% 64% 54%",
              "42% 58% 52% 48% / 32% 52% 48% 68%",
            ],
            scale: [1, 0.968, 1.04, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 8 }}
          style={{
            width:  "min(58vw, 740px)",
            height: "min(58vw, 740px)",
            background:
              "radial-gradient(ellipse 64% 54% at 54% 54%, rgba(205,220,190,0.09) 0%, rgba(215,228,200,0.04) 54%, transparent 74%)",
            filter: "blur(62px)",
          }}
        />
      </motion.div>

      {/* ── Biomorphic form 3 — warm cream, mid-center ── */}
      <motion.div style={{ y: y3 }} className="absolute top-[22%] left-[22%]">
        <motion.div
          animate={{
            borderRadius: [
              "52% 48% 42% 58% / 56% 42% 58% 44%",
              "36% 64% 66% 34% / 62% 50% 38% 56%",
              "66% 34% 44% 56% / 40% 62% 54% 46%",
              "52% 48% 42% 58% / 56% 42% 58% 44%",
            ],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{
            width:  "min(44vw, 580px)",
            height: "min(44vw, 580px)",
            background:
              "radial-gradient(ellipse 68% 60% at 50% 50%, rgba(222,213,196,0.07) 0%, transparent 70%)",
            filter: "blur(72px)",
          }}
        />
      </motion.div>

      {/* ── Biomorphic form 4 — cool sage, upper right ── */}
      <motion.div style={{ y: y4 }} className="absolute -top-[5%] right-[4%]">
        <motion.div
          animate={{
            borderRadius: [
              "70% 30% 52% 48% / 42% 62% 38% 58%",
              "28% 72% 38% 62% / 62% 38% 62% 38%",
              "50% 50% 72% 28% / 54% 50% 38% 62%",
              "70% 30% 52% 48% / 42% 62% 38% 58%",
            ],
            scale: [1, 1.055, 0.965, 1],
          }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 15 }}
          style={{
            width:  "min(38vw, 520px)",
            height: "min(38vw, 520px)",
            background:
              "radial-gradient(ellipse 62% 62% at 50% 50%, rgba(168,192,148,0.08) 0%, transparent 70%)",
            filter: "blur(46px)",
          }}
        />
      </motion.div>

      {/* Very faint horizontal rule system — archival ground */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(100,130,80,0.020) 0px, transparent 1px, transparent 80px)",
        }}
      />
    </div>
  );
}
