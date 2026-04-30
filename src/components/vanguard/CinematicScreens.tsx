import { motion } from "framer-motion";
import { MessageSquare, ShieldAlert, Search, CheckCircle2, XCircle, Link2 } from "lucide-react";

const screen = "absolute inset-0 px-4 pb-4 pt-3 flex flex-col";

export function AnticipateScreen() {
  return (
    <div className={`${screen} bg-gradient-to-b from-[#06111c] to-black`}>
      {/* Faux home screen */}
      <div className="grid flex-1 grid-cols-4 content-start gap-3 pt-6 opacity-60">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-white/5" />
        ))}
      </div>
      {/* Notification drop-down */}
      <motion.div
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.15 }}
        className="absolute inset-x-3 top-9 rounded-2xl border border-[var(--neon)]/40 bg-[#0b1726]/95 p-2.5 shadow-[0_10px_30px_-8px_rgba(0,122,255,0.6)] backdrop-blur"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--neon)]/20 text-[var(--neon)]">
            <MessageSquare className="h-3.5 w-3.5" />
          </div>
          <div className="text-[10px] font-semibold text-white">Messages · now</div>
        </div>
        <div className="mt-1.5 text-[10px] text-white/80">Unknown · +1 (***) 048-21</div>
        <div className="mt-1 text-[10px] leading-snug text-white/60">
          “Your package is on hold. Confirm here:
          <span className="ml-1 inline-flex items-center gap-0.5 text-[var(--neon)] underline decoration-dotted">
            <Link2 className="h-2.5 w-2.5" /> dhl-track-now.co/x82
          </span>”
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="mt-2 h-[2px] rounded-full bg-gradient-to-r from-[var(--neon)] to-transparent"
        />
        <div className="mt-1 text-[9px] uppercase tracking-wider text-[var(--neon)]">Vanguard scanning…</div>
      </motion.div>
    </div>
  );
}

export function InterceptScreen() {
  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className={`${screen} bg-gradient-to-b from-[#220606] via-[#1a0404] to-black`}
    >
      {/* Scan line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 h-24 animate-scan-sweep bg-gradient-to-b from-transparent via-[var(--alert)]/15 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-[var(--alert)]/40 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--alert)]/60 bg-[var(--alert)]/10">
            <ShieldAlert className="h-10 w-10 text-[var(--alert)]" />
          </div>
        </motion.div>
        <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-[var(--alert)]">Critical Error</div>
        <h4 className="mt-1 text-base font-bold text-white text-glow-alert">Access Blocked</h4>
        <p className="mt-2 text-[10px] leading-snug text-white/70">
          Vanguard severed connection to <span className="font-mono text-[var(--alert)]">dhl-track-now.co</span> — known phishing domain.
        </p>
        <div className="mt-4 w-full rounded-lg border border-[var(--alert)]/30 bg-black/40 p-2 text-left font-mono text-[9px] text-white/70">
          <div><span className="text-[var(--alert)]">DENY</span> · DNS sinkhole</div>
          <div><span className="text-white/40">RULE</span> · phishing.global.v427</div>
          <div><span className="text-white/40">TIME</span> · 0.04ms</div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProtectScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${screen} bg-gradient-to-b from-[#06170d] to-black`}
    >
      <h3 className="text-xs font-semibold text-white">URL Scanner</h3>
      <p className="text-[10px] text-white/50">Verify any link before you tap.</p>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5">
        <Search className="h-3 w-3 text-white/50" />
        <span className="truncate font-mono text-[10px] text-white/80">https://lovable.dev/share</span>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9 }}
        className="mt-2 h-0.5 origin-left rounded bg-gradient-to-r from-[var(--safe)] to-transparent"
      />
      <div className="mt-3 space-y-1.5">
        <ScanRow ok label="Reputation" value="Trusted publisher" />
        <ScanRow ok label="DNS records" value="Verified, age 9y" />
        <ScanRow ok label="Certificate" value="EV · valid" />
        <ScanRow ok={false} label="Trackers" value="2 minor (allowed)" warn />
      </div>
      <div className="mt-auto rounded-xl border border-[var(--safe)]/40 bg-[var(--safe)]/10 p-2.5 text-center">
        <CheckCircle2 className="mx-auto h-5 w-5 text-[var(--safe)]" />
        <div className="mt-1 text-[11px] font-semibold text-[var(--safe)] text-glow-safe">Safe to open</div>
        <div className="text-[9px] text-white/60">No malware · No phishing signals</div>
      </div>
    </motion.div>
  );
}

function ScanRow({ ok, label, value, warn }: { ok: boolean; label: string; value: string; warn?: boolean }) {
  const Icon = ok ? CheckCircle2 : XCircle;
  const color = ok ? "text-[var(--safe)]" : warn ? "text-yellow-400" : "text-[var(--alert)]";
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5">
      <Icon className={`h-3 w-3 ${color}`} />
      <div className="flex-1">
        <div className="text-[10px] font-medium text-white">{label}</div>
        <div className="text-[9px] text-white/40">{value}</div>
      </div>
    </div>
  );
}
