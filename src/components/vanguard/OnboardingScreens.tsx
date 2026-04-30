import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShieldCheck,
  ArrowLeft,
  Settings2,
  AlertTriangle,
  Wifi,
  BellDot,
  LogOut,
  Activity,
  ExternalLink,
  User,
} from "lucide-react";

export type JourneyScreen = "welcome" | "register" | "otp" | "home" | "settings" | "scanner";

const SCREEN_ORDER: Record<JourneyScreen, number> = {
  welcome: 0,
  register: 1,
  otp: 2,
  home: 3,
  settings: 4,
  scanner: 5,
};

const screenBase = "absolute inset-0 px-4 pb-4 pt-3 flex flex-col";

/* ---------- WELCOME ---------- */
function WelcomeContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  return (
    <div
      className={`${screenBase} items-center justify-center gap-6 bg-gradient-to-b from-[#06111c] to-black`}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[var(--neon)]/40 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <ShieldCheck className="h-10 w-10 text-[var(--neon)]" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-base font-bold tracking-wide text-white">Vanguard</h3>
          <p className="mt-0.5 text-[10px] text-white/50">Proteção em tempo real</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full space-y-2.5">
        <button
          onClick={() => navigate("register")}
          className="w-full rounded-xl bg-[var(--neon)] py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.7)] active:opacity-90"
        >
          Cadastrar
        </button>
        <button
          onClick={() => navigate("home")}
          className="w-full rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white/80 backdrop-blur active:bg-white/10"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

/* ---------- REGISTER ---------- */
function RegisterContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  return (
    <div className={`${screenBase} bg-gradient-to-b from-[#06111c] to-black`}>
      <h3 className="text-sm font-semibold text-white">Criar conta</h3>
      <p className="mt-0.5 text-[11px] text-white/50">Preencha seus dados para começar</p>

      <div className="mt-4 space-y-2.5">
        <div>
          <label className="text-[10px] uppercase tracking-wider text-white/50">
            Nome Completo
          </label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-[11px] text-white/60">Maria Aparecida</span>
            <span className="ml-auto inline-block h-3.5 w-px animate-pulse bg-white/70" />
          </div>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider text-white/50">E-mail</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-[11px] text-white/60">maria@email.com</span>
          </div>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider text-white/50">Senha</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-[11px] tracking-[0.3em] text-white/60">••••••••</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("otp")}
        className="mt-auto w-full rounded-xl bg-[var(--neon)] py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.7)] active:opacity-90"
      >
        Criar Conta
      </button>
    </div>
  );
}

/* ---------- OTP ---------- */
function OTPContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  const [filled, setFilled] = useState(0);
  const digits = ["7", "3", "9", "1"];

  function handleDigit(i: number) {
    setFilled(i + 1);
  }

  return (
    <div className={`${screenBase} bg-gradient-to-b from-[#06111c] to-black`}>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--neon)]">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold text-white">Verificação</h3>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-white/60">
        Enviamos um código para seu e-mail.
      </p>

      <div className="mt-5 flex justify-between gap-2">
        {digits.map((d, i) => {
          const active = i < filled;
          return (
            <motion.button
              key={i}
              onClick={() => handleDigit(i)}
              animate={{
                scale: active ? 1 : 0.95,
                borderColor: active ? "rgba(0,122,255,0.7)" : "rgba(255,255,255,0.10)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className={`flex h-14 w-full items-center justify-center rounded-xl border bg-white/5 text-lg font-bold ${
                active ? "text-white shadow-[0_0_18px_-4px_rgba(0,122,255,0.7)]" : "text-white/25"
              }`}
            >
              {active ? d : "·"}
            </motion.button>
          );
        })}
      </div>

      {filled === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 rounded-lg border border-[var(--safe)]/30 bg-[var(--safe)]/10 p-2 text-[10px] text-[var(--safe)]"
        >
          <ShieldCheck className="h-3 w-3" /> Código correto!
        </motion.div>
      )}

      <button
        onClick={() => navigate("home")}
        className="mt-auto w-full rounded-xl bg-[var(--neon)] py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.7)] active:opacity-90"
      >
        Confirmar Código
      </button>
    </div>
  );
}

/* ---------- HOME / DASHBOARD ---------- */
function HomeContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  return (
    <div className={`${screenBase} bg-gradient-to-b from-[#04130a] via-[#06111c] to-black`}>
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] text-white/50">Status</div>
          <div className="text-[11px] font-semibold text-[var(--safe)]">Proteção Ativa</div>
        </div>
        <button
          onClick={() => navigate("settings")}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 active:bg-white/10"
        >
          <Settings2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Pulsing shield */}
      <div className="relative my-2 flex flex-1 items-center justify-center">
        <div className="absolute inset-0 m-auto h-36 w-36 rounded-full border border-[var(--safe)]/20" />
        <motion.div
          animate={{ scale: [1, 1.07, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 m-auto h-36 w-36 rounded-full border border-[var(--safe)]/40"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute inset-0 m-auto h-24 w-24 rounded-full border border-[var(--safe)]/60"
        />
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ShieldCheck className="h-16 w-16 text-[var(--safe)]" strokeWidth={1.6} />
        </motion.div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
          <div className="flex items-center gap-1 text-[9px] text-white/50">
            <Activity className="h-2.5 w-2.5" /> Hoje
          </div>
          <div className="text-sm font-bold text-white">
            3 <span className="text-[9px] font-normal text-white/50">bloqueadas</span>
          </div>
          <div className="text-[9px] text-white/40">Ameaças bloqueadas hoje</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
          <div className="flex items-center gap-1 text-[9px] text-white/50">
            <ShieldCheck className="h-2.5 w-2.5" /> Verificação
          </div>
          <div className="text-sm font-bold text-[var(--safe)]">Agora</div>
          <div className="text-[9px] text-white/40">Última verificação</div>
        </div>
      </div>

      {/* Scanner CTA */}
      <button
        onClick={() => navigate("scanner")}
        className="mt-2 flex w-full items-center justify-between rounded-xl border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-3 py-2.5 text-xs font-semibold text-[var(--neon)] active:bg-[var(--neon)]/20"
      >
        <span className="flex items-center gap-1.5">
          <ExternalLink className="h-3.5 w-3.5" />
          Verificador de Links
        </span>
        <span className="text-white/40">→</span>
      </button>
    </div>
  );
}

/* ---------- SETTINGS ---------- */
function SettingsContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  const [dns, setDns] = useState(true);
  const [smsRead, setSmsRead] = useState(true);

  return (
    <div className={`${screenBase} bg-gradient-to-b from-[#06111c] to-black`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("home")}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 active:bg-white/10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        <h3 className="text-sm font-semibold text-white">Configurações</h3>
      </div>

      {/* Profile */}
      <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--neon)]/20 text-[var(--neon)]">
          <User className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[11px] font-semibold text-white">Olá, Usuário</div>
          <div className="text-[9px] text-white/40">Conta verificada</div>
        </div>
      </div>

      {/* Toggles */}
      <div className="mt-3 space-y-2">
        {/* DNS Toggle */}
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2.5">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${dns ? "bg-[var(--neon)]/20 text-[var(--neon)]" : "bg-white/5 text-white/40"}`}
          >
            <Wifi className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-white">Filtro DNS Local (VPN)</div>
            <div className="text-[9px] text-white/40">Bloqueio em nível de rede</div>
          </div>
          <button
            onClick={() => setDns(!dns)}
            className={`relative h-6 w-11 flex-shrink-0 rounded-full p-0.5 transition-colors ${dns ? "bg-[var(--safe)]" : "bg-white/15"}`}
          >
            <motion.div
              animate={{ x: dns ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="h-5 w-5 rounded-full bg-white shadow"
            />
          </button>
        </div>

        {/* SMS Toggle */}
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2.5">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${smsRead ? "bg-[var(--neon)]/20 text-[var(--neon)]" : "bg-white/5 text-white/40"}`}
          >
            <BellDot className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-white">
              Leitura de Notificações (SMS)
            </div>
            <div className="text-[9px] text-white/40">Detecção de phishing</div>
          </div>
          <button
            onClick={() => setSmsRead(!smsRead)}
            className={`relative h-6 w-11 flex-shrink-0 rounded-full p-0.5 transition-colors ${smsRead ? "bg-[var(--safe)]" : "bg-white/15"}`}
          >
            <motion.div
              animate={{ x: smsRead ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="h-5 w-5 rounded-full bg-white shadow"
            />
          </button>
        </div>
      </div>

      {/* Sign out */}
      <button
        onClick={() => navigate("welcome")}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--alert)]/30 bg-[var(--alert)]/10 py-2.5 text-xs font-semibold text-[var(--alert)] active:bg-[var(--alert)]/20"
      >
        <LogOut className="h-3.5 w-3.5" />
        Sair da Conta
      </button>
    </div>
  );
}

/* ---------- LINK SCANNER ---------- */
function ScannerContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  const [analyzed, setAnalyzed] = useState(false);
  const [link, setLink] = useState("");

  return (
    <div className={`${screenBase} bg-gradient-to-b from-[#06111c] to-black`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("home")}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 active:bg-white/10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        <h3 className="text-sm font-semibold text-white">Verificador de Links</h3>
      </div>

      <p className="mt-3 text-[11px] text-white/60">Cole um link suspeito para análise.</p>

      {/* Input */}
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
        <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-white/40" />
        <input
          type="text"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            setAnalyzed(false);
          }}
          placeholder="https://..."
          className="flex-1 bg-transparent text-[11px] text-white/80 placeholder-white/25 outline-none"
        />
      </div>

      {/* Analyze button */}
      <button
        onClick={() => setAnalyzed(true)}
        className="mt-3 w-full rounded-xl bg-[var(--neon)] py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.7)] active:opacity-90"
      >
        Analisar Link
      </button>

      {/* Alert result */}
      <AnimatePresence>
        {analyzed && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="mt-3 flex items-start gap-2.5 rounded-xl border border-[var(--alert)]/50 bg-[var(--alert)]/15 p-3"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--alert)]" />
            <div>
              <div className="text-[11px] font-bold text-[var(--alert)]">Ameaça Detectada</div>
              <div className="mt-0.5 text-[10px] text-white/70">Possível Phishing</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!analyzed && (
        <div className="mt-auto space-y-1.5">
          <div className="text-[9px] uppercase tracking-wider text-white/30">
            Verificações recentes
          </div>
          {["bit.ly/oferta99", "pagamento-pix.tk"].map((url) => (
            <div
              key={url}
              className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--alert)]" />
              <span className="flex-1 text-[10px] text-white/50">{url}</span>
              <span className="text-[9px] text-[var(--alert)]">Phishing</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- MAIN JOURNEY COMPONENT ---------- */
interface OnboardingJourneyProps {
  screen: JourneyScreen;
  onNavigate: (screen: JourneyScreen) => void;
}

export function OnboardingJourney({ screen, onNavigate }: OnboardingJourneyProps) {
  const prevScreen = useRef<JourneyScreen>(screen);
  const direction = SCREEN_ORDER[screen] >= SCREEN_ORDER[prevScreen.current] ? 1 : -1;
  prevScreen.current = screen;

  const variants = {
    enter: (d: number) => ({ x: d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -60, opacity: 0 }),
  };

  function navigate(to: JourneyScreen) {
    onNavigate(to);
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={screen}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        className="absolute inset-0"
      >
        {screen === "welcome" && <WelcomeContent navigate={navigate} />}
        {screen === "register" && <RegisterContent navigate={navigate} />}
        {screen === "otp" && <OTPContent navigate={navigate} />}
        {screen === "home" && <HomeContent navigate={navigate} />}
        {screen === "settings" && <SettingsContent navigate={navigate} />}
        {screen === "scanner" && <ScannerContent navigate={navigate} />}
      </motion.div>
    </AnimatePresence>
  );
}
