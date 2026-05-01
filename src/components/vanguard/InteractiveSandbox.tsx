import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  UserPlus,
  KeyRound,
  Home,
  Settings2,
  ScanLine,
  Siren,
  MessageSquareWarning,
  Package,
  Link2,
  Banknote,
  Newspaper,
  QrCode,
} from "lucide-react";
import { PhoneFrame } from "./PhoneFrame";
import { OnboardingJourney, type JourneyScreen } from "./OnboardingScreens";
import { ThreatSimulation, type SimulationKind } from "./ThreatSimulations";

type TabKey = JourneyScreen | "threats";

const tabs: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: "welcome", label: "Início", icon: ShieldCheck },
  { key: "register", label: "Cadastro", icon: UserPlus },
  { key: "otp", label: "Verificação", icon: KeyRound },
  { key: "home", label: "Painel", icon: Home },
  { key: "settings", label: "Ajustes", icon: Settings2 },
  { key: "scanner", label: "Scanner", icon: ScanLine },
  { key: "pix", label: "Pix", icon: QrCode },
  { key: "blog", label: "Blog", icon: Newspaper },
  { key: "threats", label: "Simulações", icon: Siren },
];

const simulations: { key: SimulationKind; label: string; icon: typeof Home }[] = [
  { key: "link", label: "Link suspeito", icon: Link2 },
  { key: "app", label: "App malicioso", icon: Package },
  { key: "sms", label: "SMS de phishing", icon: MessageSquareWarning },
  { key: "pix", label: "Cópia de chave Pix", icon: Banknote },
];

export function InteractiveSandbox() {
  const [active, setActive] = useState<TabKey>("welcome");
  const [sim, setSim] = useState<SimulationKind>("link");
  const [simKey, setSimKey] = useState(0); // bump to replay

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-6 pb-24 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--safe)]" /> Protótipo Interativo
        </div>
        <h1 className="mt-5 bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
          Project <span className="text-[var(--neon)] text-glow-neon">Vanguard</span>
        </h1>
        <p className="mt-4 text-base text-white/60 sm:text-lg">
          <span className="text-white text-glow-neon">Antecipe</span>,{" "}
          <span className="text-white text-glow-neon">intercepte</span> e{" "}
          <span className="text-white text-glow-neon">proteja</span>.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/50">
          Um sistema de segurança Android de nova geração que neutraliza phishing, malwares e
          tentativas de fraude em tempo real.
        </p>
      </motion.div>

      <div className="mt-14 grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
        {/* Left buttons */}
        <div className="flex flex-row flex-wrap justify-center gap-3 lg:flex-col lg:items-end">
          {tabs.slice(0, 5).map((t, i) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, type: "spring", stiffness: 140, damping: 18 }}
            >
              <SandboxButton
                active={active === t.key}
                onClick={() => setActive(t.key)}
                icon={<t.icon className="h-4 w-4" />}
                label={t.label}
              />
            </motion.div>
          ))}
        </div>

        {/* Phone — fully self-contained journey */}
        <PhoneFrame>
          {active === "threats" ? (
            <ThreatSimulation
              key={`${sim}-${simKey}`}
              kind={sim}
              onReplay={() => setSimKey((k) => k + 1)}
            />
          ) : (
            <OnboardingJourney
              screen={active as JourneyScreen}
              onNavigate={(s) => setActive(s)}
            />
          )}
        </PhoneFrame>

        {/* Right buttons */}
        <div className="flex flex-row flex-wrap justify-center gap-3 lg:flex-col lg:items-start">
          {tabs.slice(5).map((t, i) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, type: "spring", stiffness: 140, damping: 18 }}
            >
              <SandboxButton
                active={active === t.key}
                onClick={() => setActive(t.key)}
                icon={<t.icon className="h-4 w-4" />}
                label={t.label}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scenario selector — only visible in Simulations mode */}
      {active === "threats" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          className="mt-10 flex w-full max-w-2xl flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2 rounded-full border border-[var(--alert)]/40 bg-[var(--alert)]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--alert)]">
            <Siren className="h-3 w-3" /> Simulação · cenário externo ao app
          </div>
          <p className="max-w-md text-center text-[11px] text-white/50">
            As notificações abaixo aparecem fora do Vanguard, no sistema do celular.
            O Vanguard intercepta antes que o usuário caia no golpe.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
          {simulations.map((s) => {
            const isActive = sim === s.key;
            return (
              <motion.button
                key={s.key}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSim(s.key);
                  setSimKey((k) => k + 1);
                }}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "border-[var(--alert)]/60 bg-[var(--alert)]/15 text-white shadow-[0_0_24px_-6px_rgba(255,59,48,0.6)]"
                    : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                <s.icon className="h-3.5 w-3.5" />
                {s.label}
              </motion.button>
            );
          })}
          </div>
        </motion.div>
      )}

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-16 text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        Role para o tour cinematográfico ↓
      </motion.div>
    </section>
  );
}

function SandboxButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`glass-card group relative flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
        active ? "text-white" : "text-white/70 hover:text-white"
      }`}
    >
      {active && (
        <motion.span
          layoutId="sandbox-active"
          className="absolute inset-0 -z-0 rounded-2xl border border-[var(--neon)]/60 bg-[var(--neon)]/15 shadow-[0_0_30px_-4px_rgba(0,122,255,0.55)]"
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {label}
      </span>
    </motion.button>
  );
}
