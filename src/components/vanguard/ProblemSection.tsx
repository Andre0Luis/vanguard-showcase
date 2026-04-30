import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
} from "recharts";
import { TrendingUp, MessageCircleWarning, AlertTriangle, Globe2 } from "lucide-react";

function CountUp({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("pt-BR") + suffix);
  const [val, setVal] = useState("0" + suffix);
  useEffect(() => {
    const unsub = rounded.on("change", setVal);
    return () => unsub();
  }, [rounded]);
  useEffect(() => {
    if (inView) animate(mv, to, { duration, ease: "easeOut" });
  }, [inView, mv, to, duration]);
  return <span ref={ref}>{val}</span>;
}

const growthData = [
  { year: "2021", value: 38 },
  { year: "2022", value: 55 },
  { year: "2023", value: 78 },
  { year: "2024", value: 125 },
];

const phishingData = [
  { name: "Brasil", value: 28, color: "#007AFF" },
  { name: "Outros (top 1)", value: 32, color: "#FF3B30" },
  { name: "Demais países", value: 40, color: "rgba(255,255,255,0.15)" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, type: "spring" as const, stiffness: 110, damping: 18 },
  }),
};

export function ProblemSection() {
  return (
    <section id="problema" className="relative mx-auto w-full max-w-7xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--alert)]/30 bg-[var(--alert)]/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[var(--alert)]">
          <AlertTriangle className="h-3 w-3" /> O Problema
        </div>
        <h2 className="mt-5 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          Por que o Vanguard é necessário
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60 sm:text-base">
          Os dados mostram uma escalada acelerada de fraudes digitais — e os mais vulneráveis estão na linha de frente.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* CARD 1 — Growth */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -4 }}
          className="glass-card relative overflow-hidden rounded-3xl p-6"
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--alert)]/20 blur-3xl" />
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[var(--alert)]">
                <TrendingUp className="h-3 w-3" /> Golpes financeiros · Brasil
              </div>
              <div className="mt-3 text-5xl font-bold text-white text-glow-alert">
                +<CountUp to={60} suffix="%" />
              </div>
              <p className="mt-1 text-sm text-white/60">de crescimento contra idosos no último ano.</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--alert)]/40 bg-[var(--alert)]/10 text-[var(--alert)]">
              <MessageCircleWarning className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 h-44 w-full">
            <ResponsiveContainer>
              <BarChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barAlert" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF3B30" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#FF3B30" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{ background: "#0b1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(v: number) => [`${v} mil ocorrências`, ""]}
                />
                <Bar dataKey="value" fill="url(#barAlert)" radius={[8, 8, 0, 0]} animationDuration={1400} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-[10px] text-white/40">Fonte: levantamentos públicos sobre fraudes digitais no Brasil.</div>
        </motion.div>

        {/* CARD 2 — Phishing */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -4 }}
          className="glass-card relative overflow-hidden rounded-3xl p-6"
        >
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[var(--neon)]/20 blur-3xl" />
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[var(--neon)]">
                <Globe2 className="h-3 w-3" /> Phishing global · WhatsApp & SMS
              </div>
              <div className="mt-3 text-5xl font-bold text-white text-glow-neon">
                <CountUp to={2} suffix="º" />
              </div>
              <p className="mt-1 text-sm text-white/60">país mais atacado do mundo.</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--neon)]/40 bg-[var(--neon)]/10 text-[var(--neon)]">
              <Globe2 className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-44 w-44">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={phishingData}
                    dataKey="value"
                    innerRadius={42}
                    outerRadius={70}
                    paddingAngle={3}
                    stroke="none"
                    animationDuration={1400}
                  >
                    {phishingData.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#0b1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                    formatter={(v: number, n: string) => [`${v}%`, n]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {phishingData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs text-white/70">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  <span className="flex-1">{d.name}</span>
                  <span className="font-mono text-white">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-[10px] text-white/40">Brasil concentra parcela expressiva dos ataques de phishing móvel.</div>
        </motion.div>
      </div>
    </section>
  );
}
