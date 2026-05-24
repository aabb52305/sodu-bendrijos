"use client";

import { useEffect, useState } from "react";
import { resolveNavLabel } from "@/lib/contentResolver";
import Background from "@/components/Background";
import PlanosNav from "@/components/ColonyMapNav";
import HeroSection from "@/components/HeroSection";
import FirstVisualMoment from "@/components/FirstVisualMoment";
import OriginSection from "@/components/OriginSection";
import TransitionMoment from "@/components/TransitionMoment";
import MapSection from "@/components/MapSection";
import SakytineIstorijaSection from "@/components/SakytineIstorijaSection";
import DIYSection from "@/components/DIYSection";
import SocialLifeSection from "@/components/SocialLifeSection";
import SymbolismSection from "@/components/SymbolismSection";
import EscapismSection from "@/components/EscapismSection";
import TraditionsSection from "@/components/TraditionsSection";
import KaPasakojaSodaiSection from "@/components/KaPasakojaSodaiSection";
import FinalSection from "@/components/FinalSection";

const SECTION_IDS = [
  "hero", "first-visual", "origin", "transition",
  "maps", "sakytine-istorija", "diy",
  "social", "symbolism", "escapism", "svetur", "ka-pasakoja-sodai", "final",
] as const;

const SECTIONS = SECTION_IDS.map((id) => ({ id, label: resolveNavLabel(id) }));

// z-index ladder for sticky sections (hero=bottom, diy=top)
const STICKY_Z: Record<string, number> = {
  "hero": 10, "first-visual": 20, "origin": 30,
  "transition": 40, "maps": 50, "sakytine-istorija": 60, "diy": 70,
};
const STICKY_IDS = Object.keys(STICKY_Z);

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.scrollY + window.innerHeight * 0.42;
      let active = SECTIONS[0].id;

      SECTIONS.forEach(({ id }) => {
        const wrapper = document.querySelector<HTMLElement>(`[data-sid="${id}"]`);
        if (!wrapper) return;
        if (threshold >= wrapper.offsetTop) active = id;
      });

      setActiveSection(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="relative">
      <Background />
      <PlanosNav sections={SECTIONS} activeSection={activeSection} onNavigate={scrollTo} />

      {/* ── Sticky immersive scenes (Hero → DIY) ─────────────────── */}
      {STICKY_IDS.map((id) => {
        const Comp = COMPONENT_MAP[id];
        return (
          <div
            key={id}
            data-sid={id}
            className="sticky top-0 bg-[#f2f5ee]"
            style={{ zIndex: STICKY_Z[id] }}
          >
            <Comp id={id} />
          </div>
        );
      })}

      {/* ── Natural scroll sections ───────────────────────────────── */}
      <div data-sid="social" className="relative" style={{ zIndex: 80 }}>
        <SocialLifeSection id="social" />
      </div>
      <div data-sid="symbolism" className="relative" style={{ zIndex: 80 }}>
        <SymbolismSection id="symbolism" />
      </div>
      <div data-sid="escapism" className="relative" style={{ zIndex: 80 }}>
        <EscapismSection id="escapism" />
      </div>
      <div data-sid="svetur" className="relative" style={{ zIndex: 80 }}>
        <TraditionsSection id="svetur" />
      </div>
      <div data-sid="ka-pasakoja-sodai" className="relative" style={{ zIndex: 80 }}>
        <KaPasakojaSodaiSection id="ka-pasakoja-sodai" />
      </div>
      <div data-sid="final" className="relative" style={{ zIndex: 80 }}>
        <FinalSection id="final" />
      </div>
    </main>
  );
}

// Component lookup for sticky sections
const COMPONENT_MAP: Record<string, React.ComponentType<{ id: string }>> = {
  "hero":              HeroSection,
  "first-visual":      FirstVisualMoment,
  "origin":            OriginSection,
  "transition":        TransitionMoment,
  "maps":              MapSection,
  "sakytine-istorija": SakytineIstorijaSection,
  "diy":               DIYSection,
};
