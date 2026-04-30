import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Fingerprint, KeyRound, Home, Settings2 } from "lucide-react";
import { PhoneFrame } from "./PhoneFrame";
import { LoginScreen, SetupScreen, HomeScreen, SettingsScreen } from "./MiniAppScreens";

type ScreenKey = "login" | "setup" | "home" | "settings";

const tabs: { key: ScreenKey; label: string; icon: typeof Home }[] = [
  { key: "login", label: "Login", icon: Fingerprint },
  { key: "setup", label: "Setup", icon: KeyRound },
  { key: "home", label: "Dashboard", icon: Home },
  { key: "settings", label: "Settings", icon: Settings2 },
];

export function InteractiveSandbox() {
  const [active, setActive] = useState<ScreenKey>("home");

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-6 pb-24 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--safe)]" /> Live Prototype
        </div>
        <h1 className="mt-5 bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
          Project <span className="text-[var(--neon)] text-glow-neon">Vanguard</span>
        </h1>
        <p className="mt-4 text-base text-white/60 sm:text-lg">
          <span className="text-white text-glow-neon">Anticipate</span>, <span className="text-white text-glow-neon">intercept</span>, and <span className="text-white text-glow-neon">protect</span>.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/50">
          A next-generation Android security suite that neutralizes phishing,
          malware and surveillance threats in real time.
        </p>
      </motion.div>

      <div className="mt-14 grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
        {/* Left buttons */}
        <div className="flex flex-row flex-wrap justify-center gap-3 lg:flex-col lg:items-end">
          {tabs.slice(0, 2).map((t) => (
            <SandboxButton key={t.key} active={active === t.key} onClick={() => setActive(t.key)} icon={<t.icon className="h-4 w-4" />} label={t.label} />
          ))}
        </div>

        {/* Phone */}
        <PhoneFrame>
          <AnimatePresence mode="wait">
            {active === "login" && <LoginScreen />}
            {active === "setup" && <SetupScreen />}
            {active === "home" && <HomeScreen />}
            {active === "settings" && <SettingsScreen />}
          </AnimatePresence>
        </PhoneFrame>

        {/* Right buttons */}
        <div className="flex flex-row flex-wrap justify-center gap-3 lg:flex-col lg:items-start">
          {tabs.slice(2).map((t) => (
            <SandboxButton key={t.key} active={active === t.key} onClick={() => setActive(t.key)} icon={<t.icon className="h-4 w-4" />} label={t.label} />
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-16 text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        Scroll for the cinematic tour ↓
      </motion.div>
    </section>
  );
}

function SandboxButton({
  active, onClick, icon, label,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
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
