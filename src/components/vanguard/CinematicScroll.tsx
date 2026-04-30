import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Eye, Ban, ScanLine } from "lucide-react";
import { PhoneFrame } from "./PhoneFrame";
import { DynamicBackground } from "./DynamicBackground";
import { AnticipateScreen, InterceptScreen, ProtectScreen } from "./CinematicScreens";

type Tone = "neon" | "alert" | "safe";

const states: {
  key: Tone;
  step: string;
  title: string;
  text: string;
  icon: typeof Eye;
  side: "left" | "right";
}[] = [
  {
    key: "neon",
    step: "01 · Antecipar",
    title: "Identifique a ameaça antes que ela chegue.",
    text: "A NotificationListener API intercepta e analisa links antes mesmo do usuário tocar neles.",
    icon: Eye,
    side: "left",
  },
  {
    key: "alert",
    step: "02 · Interceptar",
    title: "Corte a conexão em 0,04 ms.",
    text: "Um VpnService local atua como DNS Sinkhole, derrubando conexões a domínios maliciosos instantaneamente.",
    icon: Ban,
    side: "right",
  },
  {
    key: "safe",
    step: "03 · Proteger",
    title: "Verifique qualquer link, a qualquer hora.",
    text: "Share Intents permitem verificação segura e sob demanda sem comprometer a privacidade do usuário.",
    icon: ScanLine,
    side: "left",
  },
];

export function CinematicScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [activeIdx, setActiveIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = v < 0.34 ? 0 : v < 0.67 ? 1 : 2;
    setActiveIdx(idx);
  });

  const tone = states[activeIdx].key;
  const side = states[activeIdx].side;
  const Icon = states[activeIdx].icon;

  // Subtle scale of the sticky stage
  const stageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <section ref={ref} className="relative" style={{ height: "320vh" }}>
      <DynamicBackground tone={tone} scrollProgress={scrollYProgress} />

      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 top-8 z-10 text-center">
          <div className="text-[10px] uppercase tracking-[0.35em] text-white/50">A Doutrina Vanguard</div>
          <ProgressDots active={activeIdx} />
        </div>

        <motion.div
          style={{ scale: stageScale }}
          className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-[1fr_auto_1fr]"
        >
          {/* Left card */}
          <div className="relative order-2 flex min-h-[140px] justify-end lg:order-1 lg:min-h-[260px]">
            <AnimatePresence mode="wait">
              {side === "left" && (
                <NarrativeCard key={tone + "L"} idx={activeIdx} icon={Icon} side="left" />
              )}
            </AnimatePresence>
          </div>

          {/* Phone */}
          <div className="relative order-1 flex justify-center lg:order-2">
            <PhoneFrame>
              <AnimatePresence mode="wait">
                {tone === "neon" && <motion.div key="a" className="absolute inset-0"><AnticipateScreen /></motion.div>}
                {tone === "alert" && <motion.div key="b" className="absolute inset-0"><InterceptScreen /></motion.div>}
                {tone === "safe" && <motion.div key="c" className="absolute inset-0"><ProtectScreen /></motion.div>}
              </AnimatePresence>
            </PhoneFrame>

            {/* SVG arrows overlay (desktop only — clean stack on mobile) */}
            <ArrowOverlay tone={tone} side={side} progress={scrollYProgress} activeIdx={activeIdx} />
          </div>

          {/* Right card */}
          <div className="relative order-3 flex min-h-[140px] justify-start lg:min-h-[260px]">
            <AnimatePresence mode="wait">
              {side === "right" && (
                <NarrativeCard key={tone + "R"} idx={activeIdx} icon={Icon} side="right" />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProgressDots({ active }: { active: number }) {
  return (
    <div className="mt-3 flex items-center justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all ${
            i === active ? "w-8 bg-white" : "w-3 bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}

function NarrativeCard({
  idx, icon: Icon, side,
}: { idx: number; icon: typeof Eye; side: "left" | "right" }) {
  const s = states[idx];
  const accent =
    s.key === "neon" ? "var(--neon)" : s.key === "alert" ? "var(--alert)" : "var(--safe)";
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: side === "left" ? -40 : 40, y: -10 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="glass-card relative w-full max-w-sm rounded-2xl p-5"
      style={{ boxShadow: `0 20px 60px -20px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.06)` }}
    >
      <div
        className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ background: `${accent}22`, color: accent }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: accent }}>{s.step}</div>
      <h3 className="mt-1 text-xl font-semibold text-white">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
      <div className="mt-4 flex items-center gap-2 text-[10px] text-white/40">
        <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
        Módulo do sistema em execução
      </div>
    </motion.div>
  );
}

function ArrowOverlay({
  tone, side, progress, activeIdx,
}: {
  tone: Tone; side: "left" | "right"; progress: ReturnType<typeof useScroll>["scrollYProgress"]; activeIdx: number;
}) {
  const [hidden, setHidden] = useState(false);
  // Hide overlay arrow on small screens (cards stack)
  useEffect(() => {
    const check = () => setHidden(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Per-state local progress (0..1 within each third)
  const localProgress = useTransform(progress, (v) => {
    const seg = 1 / 3;
    const start = activeIdx * seg;
    return Math.max(0, Math.min(1, (v - start) / seg));
  });
  const pathLength = useTransform(localProgress, [0.05, 0.55], [0, 1]);
  const opacity = useTransform(localProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);

  const color = tone === "neon" ? "#007AFF" : tone === "alert" ? "#FF3B30" : "#34C759";

  if (hidden) return null;

  // Path: from phone edge outward in a soft curve
  const d = side === "left"
    ? "M 0 90 C -90 70, -180 50, -260 30"
    : "M 0 90 C 90 70, 180 50, 260 30";

  return (
    <motion.svg
      style={{ opacity }}
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[240px] w-[640px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
      viewBox="-320 -20 640 240"
    >
      <defs>
        <filter id={`glow-${tone}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id={`head-${tone}`} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={color} />
        </marker>
      </defs>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        style={{ pathLength }}
        filter={`url(#glow-${tone})`}
        markerEnd={`url(#head-${tone})`}
      />
      {/* Source pulse at phone edge */}
      <motion.circle
        cx={0} cy={90} r={5} fill={color}
        animate={{ scale: [1, 1.8, 1], opacity: [0.9, 0.2, 0.9] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        filter={`url(#glow-${tone})`}
      />
    </motion.svg>
  );
}
