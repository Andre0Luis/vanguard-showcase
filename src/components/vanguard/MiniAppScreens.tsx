import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Fingerprint, Phone, ShieldCheck, KeyRound, UserPlus, Activity,
  Wifi, MessageSquareWarning, Accessibility, ChevronRight, Radar, IdCard,
  Eye, Ban, ScanLine, Sparkles,
} from "lucide-react";

const screen = "absolute inset-0 px-4 pb-4 pt-3 flex flex-col";

/* ---------- LOGIN ---------- */
export function LoginScreen() {
  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 130, damping: 20 }}
      className={`${screen} bg-gradient-to-b from-[#06111c] to-black`}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[var(--neon)]/40 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <ShieldCheck className="h-10 w-10 text-[var(--neon)]" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-base font-semibold text-white">Bem-vindo ao Vanguarda</h3>
          <p className="mt-1 text-[11px] text-white/60">Proteção em poucos toques</p>
        </div>

        <div className="w-full space-y-2">
          <label className="text-[10px] uppercase tracking-wider text-white/50">Telefone</label>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
            <Phone className="h-4 w-4 text-white/60" />
            <span className="text-sm text-white/90">(11) 9 8821‑0148</span>
            <span className="ml-auto inline-block h-3.5 w-px animate-blink bg-white/70" />
          </div>
          <label className="pt-1 text-[10px] uppercase tracking-wider text-white/50">CPF</label>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
            <IdCard className="h-4 w-4 text-white/60" />
            <span className="text-sm text-white/90">123.456.789‑00</span>
          </div>
        </div>

        <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--neon)] py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.7)]">
          <Fingerprint className="h-4 w-4" /> Entrar com biometria
        </button>
        <p className="text-[10px] text-white/40">Ou criar uma nova conta</p>
      </div>
    </motion.div>
  );
}

/* ---------- SETUP / OTP ---------- */
export function SetupScreen() {
  const fullCode = ["4", "8", "1", "2", "9", "0"];
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    setFilled(0);
    const t = setInterval(() => {
      setFilled((f) => (f >= 6 ? 0 : f + 1));
    }, 550);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      key="setup"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 130, damping: 20 }}
      className={`${screen} bg-gradient-to-b from-[#06111c] to-black`}
    >
      <h3 className="text-sm font-semibold text-white">Verificação por SMS</h3>
      <p className="mt-0.5 text-[11px] text-white/50">
        Enviamos um código para <span className="text-white/80">(11) 9 8821‑0148</span>
      </p>

      <div className="mt-5 flex justify-between gap-2">
        {fullCode.map((d, i) => {
          const active = i < filled;
          return (
            <motion.div
              key={i}
              animate={{
                scale: active ? 1 : 0.95,
                borderColor: active ? "rgba(0,122,255,0.7)" : "rgba(255,255,255,0.10)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className={`flex h-12 w-10 items-center justify-center rounded-xl border bg-white/5 text-base font-semibold ${
                active ? "text-white shadow-[0_0_18px_-4px_rgba(0,122,255,0.7)]" : "text-white/30"
              }`}
            >
              {active ? d : "•"}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-[var(--safe)]/30 bg-[var(--safe)]/10 p-2 text-[10px] text-[var(--safe)]">
        <ShieldCheck className="h-3 w-3" /> Código verificado automaticamente
      </div>

      <div className="mt-5 flex items-center justify-between">
        <h4 className="text-xs font-semibold text-white">Contatos de emergência</h4>
        <button className="flex items-center gap-1 text-[10px] text-[var(--neon)]">
          <UserPlus className="h-3 w-3" /> Adicionar
        </button>
      </div>
      <div className="mt-2 space-y-1.5">
        {[
          { n: "Alex Rivera", r: "Cônjuge", t: "AR" },
          { n: "Mãe", r: "Família", t: "M" },
        ].map((c) => (
          <div key={c.n} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--neon)]/20 text-[10px] font-semibold text-[var(--neon)]">{c.t}</div>
            <div className="min-w-0">
              <div className="truncate text-[11px] font-medium text-white">{c.n}</div>
              <div className="text-[9px] text-white/40">{c.r}</div>
            </div>
            <ChevronRight className="ml-auto h-3 w-3 text-white/30" />
          </div>
        ))}
      </div>
      <button className="mt-auto w-full rounded-xl bg-[var(--neon)] py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.7)]">
        <span className="inline-flex items-center justify-center gap-1.5"><KeyRound className="h-3.5 w-3.5" /> Ativar Vanguarda</span>
      </button>
    </motion.div>
  );
}

/* ---------- TUTORIAL (auto carousel) ---------- */
const tutorialSlides = [
  {
    icon: Eye,
    color: "var(--neon)",
    title: "Vigilância silenciosa",
    text: "O Vanguarda analisa cada mensagem e link em segundo plano, sem interromper o seu uso.",
  },
  {
    icon: Ban,
    color: "var(--alert)",
    title: "Bloqueio automático",
    text: "Conexões maliciosas são cortadas localmente em milissegundos, antes de causarem dano.",
  },
  {
    icon: ScanLine,
    color: "var(--safe)",
    title: "Verificação sob demanda",
    text: "Compartilhe qualquer link com o Vanguarda e receba um diagnóstico de segurança imediato.",
  },
  {
    icon: Sparkles,
    color: "var(--neon)",
    title: "Pronto para usar",
    text: "Tudo pronto! Sua proteção já está ativa. Você pode usar o celular tranquilamente.",
  },
];

export function TutorialScreen() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % tutorialSlides.length), 2600);
    return () => clearInterval(t);
  }, []);
  const s = tutorialSlides[idx];
  const Icon = s.icon;
  return (
    <motion.div
      key="tutorial"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 130, damping: 20 }}
      className={`${screen} bg-gradient-to-b from-[#06111c] to-black`}
    >
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Tutorial · {idx + 1}/{tutorialSlides.length}</div>
      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: `${s.color === "var(--neon)" ? "rgba(0,122,255,0.4)" : s.color === "var(--alert)" ? "rgba(255,59,48,0.4)" : "rgba(52,199,89,0.4)"}` }}
              />
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl border bg-white/5"
                style={{ borderColor: s.color, color: s.color }}
              >
                <Icon className="h-8 w-8" />
              </div>
            </div>
            <h4 className="mt-4 text-sm font-semibold text-white">{s.title}</h4>
            <p className="mt-2 max-w-[14rem] text-[11px] leading-snug text-white/65">{s.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mb-1 flex items-center justify-center gap-1.5">
        {tutorialSlides.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === idx ? 22 : 6, opacity: i === idx ? 1 : 0.4 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="h-1 rounded-full bg-white"
          />
        ))}
      </div>
      <button className="mt-2 w-full rounded-xl bg-[var(--neon)] py-2 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.7)]">
        Continuar
      </button>
    </motion.div>
  );
}

/* ---------- HOME ---------- */
export function HomeScreen() {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 130, damping: 20 }}
      className={`${screen} bg-gradient-to-b from-[#04130a] via-[#06111c] to-black`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] text-white/50">Status</div>
          <div className="text-[11px] font-semibold text-[var(--safe)]">Proteção Ativa</div>
        </div>
        <Radar className="h-4 w-4 text-[var(--safe)]" />
      </div>

      <div className="relative my-3 flex flex-1 items-center justify-center">
        <div className="absolute inset-0 m-auto h-40 w-40 rounded-full border border-[var(--safe)]/20" />
        <div className="absolute inset-0 m-auto h-40 w-40 animate-pulse-radar rounded-full border border-[var(--safe)]/40" />
        <div className="absolute inset-0 m-auto h-28 w-28 animate-pulse-radar rounded-full border border-[var(--safe)]/60" style={{ animationDelay: "0.6s" }} />
        <div className="relative animate-shield-pulse">
          <ShieldCheck className="h-20 w-20 text-[var(--safe)]" strokeWidth={1.6} />
        </div>
      </div>

      <div className="text-center">
        <div className="text-[11px] font-medium text-white">Você está protegido</div>
        <div className="text-[9px] text-white/40">Última verificação: Hoje · 09:41</div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
          <div className="flex items-center gap-1 text-[9px] text-white/50"><Activity className="h-2.5 w-2.5" /> Esta semana</div>
          <div className="text-sm font-bold text-white">12 <span className="text-[9px] font-normal text-white/50">bloqueadas</span></div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
          <div className="flex items-center gap-1 text-[9px] text-white/50"><ShieldCheck className="h-2.5 w-2.5" /> Total</div>
          <div className="text-sm font-bold text-white">1.284</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- SETTINGS ---------- */
export function SettingsScreen() {
  const items = [
    { icon: ShieldCheck, label: "Ativar Vanguarda", desc: "Proteção geral do dispositivo", on: true, big: true },
    { icon: Wifi, label: "Proteção de Rede (DNS)", desc: "Bloqueio em nível de DNS", on: true },
    { icon: MessageSquareWarning, label: "Monitoramento de SMS", desc: "Detecção de phishing", on: true },
    { icon: Accessibility, label: "Acessibilidade", desc: "Análise de tela", on: false },
  ];
  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 130, damping: 20 }}
      className={`${screen} bg-gradient-to-b from-[#06111c] to-black`}
    >
      <h3 className="text-sm font-semibold text-white">Módulos de proteção</h3>
      <p className="mt-0.5 text-[11px] text-white/50">Ajuste o Vanguarda ao seu perfil</p>
      <div className="mt-3 space-y-2">
        {items.map(({ icon: Icon, label, desc, on, big }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.01 }}
            className={`flex items-center gap-2.5 rounded-xl border p-2.5 ${
              big ? "border-[var(--neon)]/40 bg-[var(--neon)]/5" : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${on ? "bg-[var(--neon)]/20 text-[var(--neon)]" : "bg-white/5 text-white/40"}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold text-white">{label}</div>
              <div className="text-[9px] text-white/40">{desc}</div>
            </div>
            <div className={`relative h-6 w-11 rounded-full p-0.5 transition-colors ${on ? "bg-[var(--safe)]" : "bg-white/15"}`}>
              <motion.div
                animate={{ x: on ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="h-5 w-5 rounded-full bg-white shadow"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
