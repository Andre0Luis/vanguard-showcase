import { motion } from "framer-motion";
import {
  Fingerprint, Phone, ShieldCheck, KeyRound, UserPlus, Activity,
  Wifi, MessageSquareWarning, Accessibility, ChevronRight, Radar,
} from "lucide-react";

const screen = "absolute inset-0 px-4 pb-4 pt-3 flex flex-col";

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
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[var(--neon)]/40 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <ShieldCheck className="h-10 w-10 text-[var(--neon)]" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-base font-semibold text-white">Welcome to Vanguard</h3>
          <p className="mt-1 text-[11px] text-white/60">Secure your device in seconds</p>
        </div>
        <div className="w-full space-y-2">
          <label className="text-[10px] uppercase tracking-wider text-white/50">Phone</label>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <Phone className="h-3.5 w-3.5 text-white/60" />
            <span className="text-xs text-white/90">+1 (555) 014‑8821</span>
            <span className="ml-auto inline-block h-3 w-px animate-blink bg-white/70" />
          </div>
        </div>
        <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--neon)] py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.7)]">
          <Fingerprint className="h-4 w-4" /> Continue with Biometric
        </button>
        <p className="text-[10px] text-white/40">FaceID · Touch · PIN</p>
      </div>
    </motion.div>
  );
}

export function SetupScreen() {
  return (
    <motion.div
      key="setup"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 130, damping: 20 }}
      className={`${screen} bg-gradient-to-b from-[#06111c] to-black`}
    >
      <h3 className="text-sm font-semibold text-white">Verify & Setup</h3>
      <p className="mt-0.5 text-[11px] text-white/50">Enter the code sent to your device</p>
      <div className="mt-4 flex justify-between gap-1.5">
        {["4", "8", "1", "2", "9", "0"].map((d, i) => (
          <div
            key={i}
            className={`flex h-10 w-9 items-center justify-center rounded-lg border text-sm font-semibold ${
              i < 4 ? "border-[var(--neon)]/60 bg-[var(--neon)]/10 text-white" : "border-white/10 bg-white/5 text-white/30"
            }`}
          >
            {i < 4 ? d : ""}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <h4 className="text-xs font-semibold text-white">Emergency contacts</h4>
        <button className="flex items-center gap-1 text-[10px] text-[var(--neon)]"><UserPlus className="h-3 w-3" /> Add</button>
      </div>
      <div className="mt-2 space-y-1.5">
        {[
          { n: "Alex Rivera", r: "Spouse", t: "AR" },
          { n: "Mom", r: "Family", t: "M" },
          { n: "James K.", r: "Friend", t: "JK" },
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
      <button className="mt-auto w-full rounded-xl bg-[var(--neon)] py-2 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.7)]">
        <span className="inline-flex items-center gap-1.5"><KeyRound className="h-3.5 w-3.5" /> Activate Vanguard</span>
      </button>
    </motion.div>
  );
}

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
          <div className="text-[11px] font-semibold text-[var(--safe)]">Protected</div>
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
        <div className="text-[11px] font-medium text-white">VPN DNS Protection Active</div>
        <div className="text-[9px] text-white/40">Sinkhole engaged · 4 nodes</div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
          <div className="flex items-center gap-1 text-[9px] text-white/50"><Activity className="h-2.5 w-2.5" /> Today</div>
          <div className="text-sm font-bold text-white">12 <span className="text-[9px] font-normal text-white/50">blocked</span></div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
          <div className="flex items-center gap-1 text-[9px] text-white/50"><ShieldCheck className="h-2.5 w-2.5" /> Total</div>
          <div className="text-sm font-bold text-white">1,284</div>
        </div>
      </div>
    </motion.div>
  );
}

export function SettingsScreen() {
  const items = [
    { icon: Wifi, label: "Network Sinkhole", desc: "DNS-level blocking", on: true },
    { icon: MessageSquareWarning, label: "SMS Monitoring", desc: "Phishing detection", on: true },
    { icon: Accessibility, label: "Accessibility", desc: "On‑screen scanning", on: false },
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
      <h3 className="text-sm font-semibold text-white">Protection Modules</h3>
      <p className="mt-0.5 text-[11px] text-white/50">Tune Vanguard to your threat model</p>
      <div className="mt-3 space-y-2">
        {items.map(({ icon: Icon, label, desc, on }) => (
          <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${on ? "bg-[var(--neon)]/20 text-[var(--neon)]" : "bg-white/5 text-white/40"}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-medium text-white">{label}</div>
              <div className="text-[9px] text-white/40">{desc}</div>
            </div>
            <div className={`relative h-5 w-9 rounded-full p-0.5 transition-colors ${on ? "bg-[var(--safe)]" : "bg-white/15"}`}>
              <div className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : "translate-x-0"}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-[var(--neon)]/30 bg-[var(--neon)]/10 p-2.5">
        <div className="text-[10px] font-semibold text-[var(--neon)]">Threat Model: Aggressive</div>
        <div className="text-[9px] text-white/60">Realtime kernel‑level interception enabled.</div>
      </div>
    </motion.div>
  );
}
