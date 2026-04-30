import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import { DynamicBackground } from "@/components/vanguard/DynamicBackground";
import { InteractiveSandbox } from "@/components/vanguard/InteractiveSandbox";
import { CinematicScroll } from "@/components/vanguard/CinematicScroll";
import { ProblemSection } from "@/components/vanguard/ProblemSection";
import { SwotMatrix } from "@/components/vanguard/SwotMatrix";
import { SiteFooter } from "@/components/vanguard/SiteFooter";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Project Vanguard — Antecipe, intercepte e proteja." },
      {
        name: "description",
        content:
          "Project Vanguard é um sistema de segurança Android de nova geração que antecipa, intercepta e neutraliza ataques de phishing e fraude em tempo real.",
      },
      { property: "og:title", content: "Project Vanguard" },
      {
        property: "og:description",
        content: "Antecipe, intercepte e proteja. Protótipo Android de cibersegurança de próxima geração.",
      },
    ],
  }),
});

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  return (
    <main className="relative min-h-screen text-white">
      {/* Top nav */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-[var(--neon)]" />
          </div>
          <span className="text-sm font-semibold tracking-wide">Vanguard</span>
        </div>
        <nav className="hidden items-center gap-6 text-xs text-white/60 sm:flex">
          <a href="#sandbox" className="hover:text-white">Protótipo</a>
          <a href="#tour" className="hover:text-white">Doutrina</a>
          <a href="#problema" className="hover:text-white">O Problema</a>
          <a href="#swot" className="hover:text-white">SWOT</a>
          <a href="#" className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-medium text-white backdrop-blur hover:bg-white/10">Acesso antecipado</a>
        </nav>
      </header>

      {/* Hero / Sandbox with its own scroll-driven background */}
      <div ref={heroRef} id="sandbox" className="relative">
        <DynamicBackground tone="neutral" scrollProgress={heroProgress} />
        <InteractiveSandbox />
      </div>

      {/* Cinematic sticky scroll tour */}
      <div id="tour">
        <CinematicScroll />
      </div>

      {/* Problem data */}
      <ProblemSection />

      {/* SWOT */}
      <SwotMatrix />

      <SiteFooter />
    </main>
  );
}
