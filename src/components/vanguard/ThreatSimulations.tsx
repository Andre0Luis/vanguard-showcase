import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Wifi,
  Smartphone,
  Lock,
  Banknote,
  MessageSquareWarning,
  Package,
  Link2,
  UserCheck,
  X,
  Check,
} from "lucide-react";

export type SimulationKind = "link" | "app" | "sms" | "pix";

interface Props {
  kind: SimulationKind;
  onReplay: () => void;
}

/* Phases: 0 idle → 1 notification arrives → 2 user taps → 3 Vanguard intercepts → 4 confirmed */
export function ThreatSimulation({ kind, onReplay }: Props) {
  const [phase, setPhase] = useState(0);
  const [trustedAdded, setTrustedAdded] = useState(false);

  const start = useCallback(() => {
    setPhase(0);
    setTrustedAdded(false);
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
      {/* "External" tag — make it obvious this is OUTSIDE the Vanguard app */}
      <div className="absolute left-1/2 top-1 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur">
        <span className="h-1 w-1 rounded-full bg-[var(--alert)]" />
        Fora do app · sistema Android
      </div>

      <BaseBackdrop kind={kind} />

      <AnimatePresence>
        {phase >= 1 && phase < 3 && (
          <NotificationCard kind={kind} tapped={phase >= 2} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 3 && (
          <InterceptOverlay
            kind={kind}
            confirmed={phase >= 4}
            trustedAdded={trustedAdded}
            onTrust={() => setTrustedAdded(true)}
          />
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 4 ? 1 : 0 }}
        transition={{ delay: phase >= 4 ? 0.3 : 0, duration: 0.4 }}
        onClick={handleReplay}
        className="absolute bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/90 backdrop-blur-md active:bg-white/20"
      >
        <RotateCcw className="h-3 w-3" /> Repetir simulação
      </motion.button>
    </div>
  );
}

/* ---------- Backdrop per scenario ---------- */
function BaseBackdrop({ kind }: { kind: SimulationKind }) {
  if (kind === "sms" || kind === "link") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-12 text-white/80">
        <div className="text-5xl font-extralight tracking-tight">9:41</div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/40">
          Sexta‑feira, 1 de Maio
        </div>
        <div className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/30">
          Tela de bloqueio
        </div>
      </div>
    );
  }
  if (kind === "pix") {
    // Banking app mock
    return (
      <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-[#0a1d12] to-[#06111c]">
        <div className="flex items-center justify-between border-b border-white/5 bg-[#0b1f15]/80 px-3 py-2">
          <div className="text-[11px] font-bold text-white">Banco · Pix</div>
          <div className="rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] text-white/60">
            App externo
          </div>
        </div>
        <div className="flex-1 px-3 py-3">
          <div className="text-[9px] uppercase tracking-wider text-white/40">
            Chave Pix copiada
          </div>
          <div className="mt-1 truncate rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-[10px] text-white/70">
            00020126580014BR.GOV.BCB.PIX0136a3f8...
          </div>
          <div className="mt-3 text-[9px] uppercase tracking-wider text-white/40">
            Pagar para
          </div>
          <div className="mt-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
            <div className="text-[11px] font-semibold text-white">J. R. SILVA ME</div>
            <div className="text-[9px] text-white/40">CNPJ ••.•••.•••/0001-•• · R$ 1.450,00</div>
          </div>
        </div>
      </div>
    );
  }
  // app install / play store
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
type NotifConfig = {
  icon: typeof Link2;
  app: string;
  title: string;
  body: string;
  tint: string;
};

function NotificationCard({ kind, tapped }: { kind: SimulationKind; tapped: boolean }) {
  const config: Record<SimulationKind, NotifConfig> = {
    link: {
      icon: Link2,
      app: "Navegador",
      title: "Abrir link compartilhado",
      body: "banc0-seguro.tk/auth — toque para abrir",
      tint: "#007AFF",
    },
    sms: {
      icon: MessageSquareWarning,
      app: "Mensagens",
      title: "Banco Central",
      body: "Sua conta foi bloqueada. Regularize: bit.ly/sec-bc",
      tint: "#007AFF",
    },
    app: {
      icon: Package,
      app: "Play Protect",
      title: "App recém‑instalado",
      body: "“Limpa Memória PRO” solicita acessibilidade.",
      tint: "#f59e0b",
    },
    pix: {
      icon: Banknote,
      app: "Área de transferência",
      title: "Chave Pix copiada",
      body: "Pagamento de R$ 1.450,00 para J. R. SILVA ME",
      tint: "#22c55e",
    },
  };
  const c = config[kind];
  const Icon = c.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-20 flex items-center justify-center px-4"
    >
      {/* Dim backdrop — the user's screen darkens for the priority alert */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 20 }}
        animate={{
          scale: tapped ? 0.97 : 1,
          opacity: 1,
          y: 0,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        className="relative w-full"
      >
        {/* Priority pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -inset-1.5 rounded-[1.5rem]"
          style={{ boxShadow: `0 0 0 2px ${c.tint}` }}
        />

        <div
          className="relative overflow-hidden rounded-2xl border bg-white/[0.10] p-3 backdrop-blur-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)]"
          style={{ borderColor: `${c.tint}80` }}
        >
          {/* Priority header strip */}
          <div
            className="-mx-3 -mt-3 mb-2.5 flex items-center justify-between px-3 py-1"
            style={{ background: `${c.tint}33` }}
          >
            <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.2em] text-white">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: c.tint }}
              />
              Alerta prioritário
            </div>
            <span className="text-[8px] text-white/60">agora</span>
          </div>

          {tapped && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-white/10"
            />
          )}

          <div className="relative flex items-start gap-2.5">
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${c.tint}33`, color: c.tint }}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] uppercase tracking-wider text-white/50">{c.app}</div>
              <div className="mt-0.5 text-[12px] font-bold leading-snug text-white">
                {c.title}
              </div>
              <div className="mt-1 text-[10px] leading-snug text-white/75">{c.body}</div>
            </div>
          </div>

          <div className="relative mt-2.5 flex items-center gap-1 text-[9px] text-white/50">
            <span className="inline-block h-1 w-1 rounded-full bg-white/40" />
            Toque para ver — esta notificação requer atenção
          </div>
        </div>

        {tapped && (
          <motion.div
            initial={{ opacity: 0.7, scale: 0 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Vanguard intercept overlay ---------- */
type InterceptText = {
  title: string;
  sub: string;
  reason: string;
  icon: typeof Wifi;
  recipient?: string;
};

function InterceptOverlay({
  kind,
  confirmed,
  trustedAdded,
  onTrust,
}: {
  kind: SimulationKind;
  confirmed: boolean;
  trustedAdded: boolean;
  onTrust: () => void;
}) {
  const text: Record<SimulationKind, InterceptText> = {
    link: {
      title: "Link bloqueado",
      sub: "banc0-seguro.tk neutralizado antes de abrir",
      reason: "Domínio recém‑registrado, padrão de typosquatting.",
      icon: Lock,
    },
    sms: {
      title: "SMS de phishing",
      sub: "DNS Sinkhole interceptou bit.ly/sec-bc",
      reason: "Mensagem associada a golpe bancário (PT‑BR).",
      icon: Wifi,
    },
    app: {
      title: "App suspeito isolado",
      sub: "“Limpa Memória PRO” colocado em quarentena",
      reason: "Solicitou permissões críticas de acessibilidade e SMS.",
      icon: Smartphone,
    },
    pix: {
      title: "Pix suspeito detectado",
      sub: "Antes de você colar a chave, verificamos o destinatário",
      reason: "Conta criada há 2 dias, sem histórico, valor incomum.",
      icon: Banknote,
      recipient: "J. R. SILVA ME",
    },
  };
  const t = text[kind];
  const Icon = t.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,48,0.35),rgba(5,10,15,0.95))]"
      />
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
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--alert)]/60 bg-[var(--alert)]/15 text-[var(--alert)]">
            <ShieldAlert className="h-7 w-7" />
          </div>
        </div>

        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--alert)]/50 bg-[var(--alert)]/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-[var(--alert)]">
          <AlertTriangle className="h-2.5 w-2.5" /> Vanguard interceptou
        </div>

        <h4 className="mt-1.5 text-sm font-bold text-white">{t.title}</h4>
        <p className="mt-1 max-w-[16rem] text-[10px] leading-snug text-white/70">{t.sub}</p>

        {t.recipient && (
          <div className="mt-2 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1.5">
            <div className="text-[8px] uppercase tracking-wider text-white/50">
              Destinatário do Pix
            </div>
            <div className="text-[11px] font-bold text-white">{t.recipient}</div>
          </div>
        )}

        <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] text-white/60">
          <Icon className="h-3 w-3 text-[var(--alert)]" />
          {t.reason}
        </div>

        <AnimatePresence>
          {confirmed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="mt-2 flex items-center gap-1.5 rounded-full border border-[var(--safe)]/40 bg-[var(--safe)]/10 px-2.5 py-0.5 text-[9px] font-semibold text-[var(--safe)]"
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
        className="relative z-10 mt-3 flex w-full max-w-[15rem] flex-col gap-1.5"
      >
        <button className="flex items-center justify-center gap-1.5 rounded-lg bg-[var(--alert)] py-1.5 text-[10px] font-semibold text-white">
          <X className="h-3 w-3" /> Cancelar / bloquear
        </button>

        {kind === "pix" && (
          <button
            onClick={onTrust}
            disabled={trustedAdded}
            className={`flex items-center justify-center gap-1.5 rounded-lg border py-1.5 text-[10px] font-semibold backdrop-blur transition ${
              trustedAdded
                ? "border-[var(--safe)]/50 bg-[var(--safe)]/15 text-[var(--safe)]"
                : "border-white/20 bg-white/10 text-white"
            }`}
          >
            {trustedAdded ? (
              <>
                <Check className="h-3 w-3" /> Adicionado às pessoas seguras
              </>
            ) : (
              <>
                <UserCheck className="h-3 w-3" /> É pessoa de confiança
              </>
            )}
          </button>
        )}

        <button className="rounded-lg border border-white/15 bg-white/5 py-1.5 text-[10px] font-medium text-white/70 backdrop-blur">
          Ver detalhes
        </button>

        {kind === "pix" && trustedAdded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[9px] leading-snug text-white/60"
          >
            Não vou mais te avisar sobre Pix para essa pessoa.
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}