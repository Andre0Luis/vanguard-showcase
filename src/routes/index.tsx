import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import { DynamicBackground } from "@/components/vanguard/DynamicBackground";
import { InteractiveSandbox } from "@/components/vanguard/InteractiveSandbox";
import { CinematicScroll } from "@/components/vanguard/CinematicScroll";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Project Vanguard — Anticipate, intercept, and protect." },
      {
        name: "description",
        content:
          "Project Vanguard is a next-generation Android security suite that anticipates, intercepts and neutralizes phishing and malware threats in real time.",
      },
      { property: "og:title", content: "Project Vanguard" },
      {
        property: "og:description",
        content: "Anticipate, intercept, and protect. The next-gen Android security prototype.",
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
          <a href="#sandbox" className="hover:text-white">Prototype</a>
          <a href="#tour" className="hover:text-white">Doctrine</a>
          <a href="#" className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-medium text-white backdrop-blur hover:bg-white/10">Get early access</a>
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

      <footer className="relative z-10 border-t border-white/5 px-6 py-10 text-center text-xs text-white/40">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-[var(--neon)]" />
          Project Vanguard · Interactive Prototype
        </div>
        <div className="mt-1">Anticipate. Intercept. Protect.</div>
      </footer>
    </main>
  );
}
