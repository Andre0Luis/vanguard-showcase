import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareWarning,
  ShieldAlert,
  ShieldCheck,
  Ban,
  AlertTriangle,
  Package,
  Lock,
  RotateCcw,
  Wifi,
  Smartphone,
} from "lucide-react";

export type SimulationKind = "sms" | "app" | "whatsapp";

interface Props {
  kind: SimulationKind;
  onReplay: () => void;
}

/* Phases: 0 idle → 1 notification arrives → 2 user taps → 3 Vanguard intercepts → 4 blocked */
export function ThreatSimulation({ kind, onReplay }: Props) {
  const [phase, setPhase] = useState(0);

  const start = useCallback(() => {
    setPhase(0);
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => setPhase(4), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const cleanup = start();
    return cleanup;
  }, [start, kind]);

  function handleReplay() {
    onReplay();
    start();
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#06111c] to-black">
      {/* Lock screen / home backdrop */}
      <BaseBackdrop kind={kind} />

      {/* Notification heads-up */}
      <AnimatePresence>
        {phase >= 1 && phase < 3 && (
          <NotificationCard kind={kind} tapped={phase >= 2} />
        )}
      </AnimatePresence>

      {/* Vanguard interception overlay */}
      <AnimatePresence>
        {phase >= 3 && <InterceptOverlay kind={kind} confirmed={phase >= 4} />}
      </AnimatePresence>

      {/* Replay button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 4 ? 1 : 0 }}
        transition={{ delay: phase >= 4 ? 0.3 : 0, duration: 0.4 }}
        onClick={handleReplay}
        className="absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/90 backdrop-blur-md active:bg-white/20"
      >
        <RotateCcw className="h-3 w-3" /> Repetir simulação
      </motion.button>
    </div>
  );
}

/* ---------- Backdrop per scenario ---------- */
function BaseBackdrop({ kind }: { kind: SimulationKind }) {
  if (kind === "sms") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-12 text-white/80">
        <div className="text-5xl font-extralight tracking-tight">9:41</div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/40">
          Sexta‑feira, 1 de Maio
        </div>
      </div>
    );
  }
  if (kind === "whatsapp") {
    return (
      <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-[#0b141a] to-[#06111c]">
        <div className="flex items-center gap-2 border-b border-white/5 bg-[#0b141a]/80 px-3 py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--neon)]/20 text-[10px] font-bold text-[var(--neon)]">
            B
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-white">Banco Atendimento</div>
            <div className="text-[9px] text-white/40">online</div>
          </div>
        </div>
        <div className="flex-1 space-y-2 px-3 py-3">
          <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white/5 px-2.5 py-1.5 text-[10px] text-white/80">
            Olá! Detectamos uma compra suspeita.
          </div>
          <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white/5 px-2.5 py-1.5 text-[10px] text-white/80">
            Confirme sua identidade aqui:
            <div className="mt-1 truncate text-[10px] text-[var(--neon)] underline">
              banc0-seguro.tk/auth
            </div>
          </div>
        </div>
      </div>
    );
  }
  // app install
  return (
    <div className="absolute inset-0 grid grid-cols-4 gap-2 px-4 pt-10 content-start">
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-xl border border-white/5 bg-white/[0.03]"
        />
      ))}
      <div className="absolute inset-x-0 top-12 text-center text-[10px] uppercase tracking-[0.3em] text-white/30">
        Tela inicial
      </div>
    </div>
  );
}

/* ---------- Heads‑up notification ---------- */
function NotificationCard({ kind, tapped }: { kind: SimulationKind; tapped: boolean }) {
  const config = {
    sms: {
      icon: MessageSquareWarning,
      app: "Mensagens",
      title: "Banco Central",
      body: "Sua conta foi bloqueada. Regularize aqui: bit.ly/sec-bc",
      tint: "var(--neon)",
    },
    app: {
      icon: Package,
      app: "Play Protect",
      title: "App recém‑instalado",
      body: "“Limpa Memória PRO” solicita acesso à acessibilidade.",
      tint: "#f59e0b",
    },
    whatsapp: {
      icon: MessageSquareWarning,
      app: "WhatsApp",
      title: "Banco Atendimento",
      body: "Confirme sua identidade: banc0-seguro.tk/auth",
      tint: "#22c55e",
    },
  }[kind];

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -40, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: tapped ? 0.97 : 1,
      }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="absolute left-3 right-3 top-10 z-20"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-2.5 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]">
        {tapped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/10"
          />
        )}
        <div className="relative flex items-start gap-2">
          <div
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
            style={{ background: `${config.tint}33`, color: config.tint }}
          >
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] uppercase tracking-wider text-white/50">
                {config.app}
              </span>
              <span className="text-[9px] text-white/30">· agora</span>
            </div>
            <div className="mt-0.5 text-[11px] font-semibold text-white">{config.title}</div>
            <div className="mt-0.5 text-[10px] leading-snug text-white/70">{config.body}</div>
          </div>
        </div>
      </div>

      {/* Tap ripple */}
      {tapped && (
        <motion.div
          initial={{ opacity: 0.7, scale: 0 }}
          animate={{ opacity: 0, scale: 2.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60"
        />
      )}
    </motion.div>
  );
}

/* ---------- Vanguard intercept overlay ---------- */
function InterceptOverlay({
  kind,
  confirmed,
}: {
  kind: SimulationKind;
  confirmed: boolean;
}) {
  const text = {
    sms: {
      title: "Conexão bloqueada",
      sub: "DNS Sinkhole interceptou bit.ly/sec-bc",
      reason: "Domínio associado a phishing bancário (PT‑BR).",
      icon: Wifi,
    },
    app: {
      title: "App suspeito isolado",
      sub: "“Limpa Memória PRO” foi colocado em quarentena",
      reason: "Solicitou permissões críticas de acessibilidade e SMS.",
      icon: Smartphone,
    },
    whatsapp: {
      title: "Link malicioso bloqueado",
      sub: "banc0-seguro.tk neutralizado antes do navegador abrir",
      reason: "Domínio recém‑registrado, padrão de typosquatting.",
      icon: Lock,
    },
  }[kind];

  const Icon = text.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4"
    >
      {/* Red wash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,48,0.35),rgba(5,10,15,0.95))]"
      />
      {/* Scanline */}
      <motion.div
        initial={{ y: "-10%" }}
        animate={{ y: "110%" }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-[var(--alert)]/25 to-transparent"
      />

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-[var(--alert)]/40 blur-2xl"
          />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--alert)]/60 bg-[var(--alert)]/15 text-[var(--alert)]">
            <ShieldAlert className="h-8 w-8" />
          </div>
        </div>

        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--alert)]/50 bg-[var(--alert)]/15 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--alert)]">
          <AlertTriangle className="h-2.5 w-2.5" /> Vanguard · Ameaça interceptada
        </div>

        <h4 className="mt-2 text-sm font-bold text-white">{text.title}</h4>
        <p className="mt-1 max-w-[16rem] text-[10px] leading-snug text-white/70">{text.sub}</p>

        <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5 text-[9px] text-white/60">
          <Icon className="h-3 w-3 text-[var(--alert)]" />
          {text.reason}
        </div>

        <AnimatePresence>
          {confirmed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="mt-3 flex items-center gap-1.5 rounded-full border border-[var(--safe)]/40 bg-[var(--safe)]/10 px-2.5 py-1 text-[9px] font-semibold text-[var(--safe)]"
            >
              <ShieldCheck className="h-3 w-3" /> Você está protegido
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 mt-4 flex w-full max-w-[14rem] flex-col gap-1.5"
      >
        <button className="flex items-center justify-center gap-1.5 rounded-lg bg-[var(--alert)] py-1.5 text-[10px] font-semibold text-white">
          <Ban className="h-3 w-3" /> Manter bloqueado
        </button>
        <button className="rounded-lg border border-white/15 bg-white/5 py-1.5 text-[10px] font-medium text-white/70 backdrop-blur">
          Ver detalhes
        </button>
      </motion.div>
    </motion.div>
  );
}
