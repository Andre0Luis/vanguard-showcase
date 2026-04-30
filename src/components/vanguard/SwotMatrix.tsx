import { motion } from "framer-motion";
import { Shield, AlertOctagon, Sparkles, Skull, LayoutGrid } from "lucide-react";

const quadrants = [
  {
    key: "S",
    title: "Forças",
    sub: "Strengths",
    icon: Shield,
    color: "var(--safe)",
    rgb: "52,199,89",
    items: [
      "Arquitetura resiliente focada nas políticas da Play Store.",
      "VpnService local garante escalabilidade sem depender de nuvem.",
      "Nível de intrusão mínimo.",
    ],
  },
  {
    key: "W",
    title: "Fraquezas",
    sub: "Weaknesses",
    icon: AlertOctagon,
    color: "var(--alert)",
    rgb: "255,59,48",
    items: [
      "Dependência de aprovação do usuário para permissões sensíveis.",
      "Risco de abandono no setup inicial se o onboarding não for perfeito.",
    ],
  },
  {
    key: "O",
    title: "Oportunidades",
    sub: "Opportunities",
    icon: Sparkles,
    color: "var(--neon)",
    rgb: "0,122,255",
    items: [
      "Aumento massivo de golpes de engenharia social.",
      "Idosos precisam de ferramentas reativas.",
      "Forte apelo para adoção indireta (filhos instalando para os pais).",
    ],
  },
  {
    key: "T",
    title: "Ameaças",
    sub: "Threats",
    icon: Skull,
    color: "#FFB020",
    rgb: "255,176,32",
    items: [
      "Novas atualizações do Android bloqueando APIs nativas.",
      "Big players de antivírus entrando no nicho.",
      "Filtros antispam nativos tornando a solução redundante no futuro.",
    ],
  },
];

export function SwotMatrix() {
  return (
    <section id="swot" className="relative mx-auto w-full max-w-7xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/60 backdrop-blur">
          <LayoutGrid className="h-3 w-3" /> Análise Estratégica
        </div>
        <h2 className="mt-5 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          Matriz SWOT
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60 sm:text-base">
          Os pilares estratégicos do Vanguard frente ao cenário atual de cibersegurança móvel.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
        {quadrants.map((q, i) => {
          const Icon = q.icon;
          return (
            <motion.div
              key={q.key}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 110, damping: 18 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-card group relative overflow-hidden rounded-3xl p-6 transition-shadow"
              style={{
                boxShadow: `0 20px 60px -25px rgba(${q.rgb},0.35), inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              {/* hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 30% 0%, rgba(${q.rgb},0.18), transparent 60%)` }}
              />
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-80"
                style={{ background: `rgba(${q.rgb},0.5)` }}
              />

              <div className="relative flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                  style={{
                    background: `rgba(${q.rgb},0.12)`,
                    borderColor: `rgba(${q.rgb},0.4)`,
                    color: q.color,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.25em]" style={{ color: q.color }}>
                    {q.sub}
                  </div>
                  <div className="text-2xl font-bold text-white">{q.title}</div>
                </div>
                <div
                  className="ml-auto text-5xl font-black opacity-30"
                  style={{ color: q.color }}
                >
                  {q.key}
                </div>
              </div>

              <ul className="relative mt-5 space-y-2.5">
                {q.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.15 + idx * 0.07 }}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-white/75"
                  >
                    <span
                      className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: q.color, boxShadow: `0 0 10px ${q.color}` }}
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
