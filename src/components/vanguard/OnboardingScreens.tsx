import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShieldCheck,
  ArrowLeft,
  AlertTriangle,
  LogOut,
  Activity,
  ExternalLink,
  User,
  Phone,
  IdCard,
  Calendar,
  Check,
  Newspaper,
  QrCode,
  Camera,
  Link2,
  Banknote,
  ChevronRight,
  Clock,
  ScanLine,
  Download,
  MessageSquareWarning,
  Package,
  Trophy,
} from "lucide-react";

export type JourneyScreen =
  | "welcome"
  | "register"
  | "otp"
  | "home"
  | "settings"
  | "scanner"
  | "blog"
  | "pix";

const SCREEN_ORDER: Record<JourneyScreen, number> = {
  welcome: 0,
  register: 1,
  otp: 2,
  home: 3,
  settings: 4,
  scanner: 5,
  blog: 6,
  pix: 7,
};

/* Light theme tokens used across all screens */
const screenBase = "absolute inset-0 px-4 pb-4 pt-4 flex flex-col bg-white text-zinc-900";
const BLUE = "#007AFF";
const LOGO = "#00306d";

/* ---------- WELCOME ---------- */
function WelcomeContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  return (
    <div className={`${screenBase} items-center justify-center gap-6`}>
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#00306d]/25 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[#00306d]/20 bg-[#00306d]/10">
            <ShieldCheck className="h-10 w-10 text-[#00306d]" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-base font-bold tracking-wide text-[#00306d]">Vanguarda</h3>
          <p className="mt-0.5 text-[10px] text-zinc-500">Proteção em tempo real</p>
        </div>
      </div>

      <div className="w-full space-y-2.5">
        <button
          onClick={() => navigate("register")}
          className="w-full rounded-xl bg-[#007AFF] py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.5)] active:opacity-90"
        >
          Cadastrar
        </button>
        <button
          onClick={() => navigate("home")}
          className="w-full rounded-xl border border-[#007AFF]/30 bg-white py-3 text-sm font-semibold text-[#007AFF] active:bg-[#007AFF]/5"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

/* ---------- REGISTER ---------- */
function RegisterContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  const [accepted, setAccepted] = useState(false);
  const fields: { label: string; value: string; icon: typeof User }[] = [
    { label: "Nome Completo", value: "Maria Aparecida", icon: User },
    { label: "Telefone", value: "(11) 9 8821‑0148", icon: Phone },
    { label: "CPF", value: "123.456.789‑00", icon: IdCard },
    { label: "Data de Nascimento", value: "12/04/1958", icon: Calendar },
  ];

  return (
    <div className={screenBase}>
      <h3 className="text-sm font-semibold text-zinc-900">Criar conta</h3>
      <p className="mt-0.5 text-[11px] text-zinc-500">Preencha seus dados para começar</p>

      <div className="mt-3 space-y-2 overflow-y-auto pr-1">
        {fields.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.label}>
              <label className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                {f.label}
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2">
                <Icon className="h-3.5 w-3.5 text-[#007AFF]" />
                <span className="text-[11px] text-zinc-800">{f.value}</span>
              </div>
            </div>
          );
        })}

        <button
          onClick={() => setAccepted(!accepted)}
          className="mt-2 flex w-full items-start gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-left"
        >
          <div
            className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border ${
              accepted ? "border-[#007AFF] bg-[#007AFF]" : "border-zinc-300 bg-white"
            }`}
          >
            {accepted && <Check className="h-3 w-3 text-white" />}
          </div>
          <div className="text-[10px] leading-snug text-zinc-600">
            Li e aceito os{" "}
            <span className="font-semibold text-[#007AFF]">Termos de Uso</span> e a{" "}
            <span className="font-semibold text-[#007AFF]">Política de Privacidade</span>.
          </div>
        </button>
      </div>

      <button
        onClick={() => navigate("otp")}
        className="mt-3 w-full rounded-xl bg-[#007AFF] py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.5)] active:opacity-90"
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

  return (
    <div className={screenBase}>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#007AFF]/10 text-[#007AFF]">
          <Phone className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900">Verificação por SMS</h3>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-zinc-600">
        Enviamos um código por SMS para{" "}
        <span className="font-semibold text-zinc-900">(11) 9 8821‑0148</span>.
      </p>

      <div className="mt-5 flex justify-between gap-2">
        {digits.map((d, i) => {
          const active = i < filled;
          return (
            <motion.button
              key={i}
              onClick={() => setFilled(i + 1)}
              animate={{
                scale: active ? 1 : 0.95,
                borderColor: active ? "rgba(0,122,255,0.7)" : "rgb(228,228,231)",
                backgroundColor: active ? "rgba(0,122,255,0.08)" : "rgb(250,250,250)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className={`flex h-14 w-full items-center justify-center rounded-xl border text-lg font-bold ${
                active ? "text-[#007AFF]" : "text-zinc-300"
              }`}
            >
              {active ? d : "·"}
            </motion.button>
          );
        })}
      </div>

      <button className="mt-3 self-start text-[10px] font-semibold text-[#007AFF]">
        Reenviar código por SMS
      </button>

      {filled === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 rounded-lg border border-[var(--safe)]/30 bg-[var(--safe)]/10 p-2 text-[10px] font-semibold text-[var(--safe)]"
        >
          <ShieldCheck className="h-3 w-3" /> Código correto!
        </motion.div>
      )}

      <button
        onClick={() => navigate("home")}
        className="mt-auto w-full rounded-xl bg-[#007AFF] py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.5)] active:opacity-90"
      >
        Confirmar Código
      </button>
    </div>
  );
}

/* ---------- HOME / DASHBOARD ---------- */
function HomeContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  const tiles: { label: string; icon: typeof Link2; to: JourneyScreen; tint: string }[] = [
    { label: "Verificar Link", icon: Link2, to: "scanner", tint: BLUE },
    { label: "Verificar Pix", icon: QrCode, to: "pix", tint: BLUE },
    { label: "Central de Notícias", icon: Newspaper, to: "blog", tint: BLUE },
    { label: "Ajustes", icon: ShieldCheck, to: "settings", tint: BLUE },
  ];

  const metrics: { label: string; value: number; icon: typeof Link2 }[] = [
    { label: "Links suspeitos", value: 18, icon: Link2 },
    { label: "Pix analisados", value: 7, icon: Banknote },
    { label: "QR codes lidos", value: 4, icon: QrCode },
    { label: "Downloads barrados", value: 3, icon: Download },
    { label: "Phishings detectados", value: 12, icon: AlertTriangle },
    { label: "SMS suspeitos", value: 9, icon: MessageSquareWarning },
  ];
  const total = metrics.reduce((a, m) => a + m.value, 0);

  return (
    <div className={`${screenBase} overflow-y-auto bg-gradient-to-b from-[#EAF3FF] to-white`}>
      {/* Top status */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] text-zinc-500">Status</div>
          <div className="text-[11px] font-bold text-[var(--safe)]">Vanguarda Ativa</div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-[var(--safe)]/10 px-2 py-0.5 text-[9px] font-semibold text-[var(--safe)]">
          <Activity className="h-2.5 w-2.5" /> 3 hoje
        </div>
      </div>

      {/* Gamified score header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className="relative mt-2 overflow-hidden rounded-2xl border border-[#00306d]/20 bg-gradient-to-br from-[#00306d] to-[#0057b8] p-3 text-white shadow-[0_10px_30px_-12px_rgba(0,48,109,0.6)]"
      >
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-white/70">
              <Trophy className="h-2.5 w-2.5" /> Sua proteção
            </div>
            <div className="mt-1 text-2xl font-extrabold leading-none">{total}</div>
            <div className="mt-0.5 text-[10px] text-white/80">ameaças bloqueadas este mês</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-wider text-white/70">Nível</div>
            <div className="text-base font-bold">Guardião</div>
            <div className="mt-1 h-1.5 w-16 overflow-hidden rounded-full bg-white/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-[var(--safe)]"
              />
            </div>
            <div className="mt-0.5 text-[8px] text-white/60">72% p/ Sentinela</div>
          </div>
        </div>
      </motion.div>

      {/* Gamified metrics grid */}
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04 * i, type: "spring", stiffness: 200, damping: 18 }}
              className="relative flex flex-col items-center gap-0.5 rounded-xl border border-[#00306d]/15 bg-white p-1.5 text-center shadow-[0_2px_8px_-4px_rgba(0,48,109,0.2)]"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#00306d]/10 text-[#00306d]">
                <Icon className="h-3 w-3" strokeWidth={2.4} />
              </div>
              <div className="text-[13px] font-extrabold leading-none text-[#00306d]">
                {m.value}
              </div>
              <div className="text-[7.5px] font-medium leading-tight text-zinc-500">
                {m.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Big tiles 2x2 */}
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {tiles.map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.button
              key={t.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, type: "spring", stiffness: 160, damping: 18 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(t.to)}
              className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-[#007AFF]/15 bg-white p-3 shadow-[0_4px_14px_-6px_rgba(0,122,255,0.25)] active:bg-[#007AFF]/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#007AFF]/10">
                <Icon className="h-5 w-5 text-[#007AFF]" strokeWidth={2.2} />
              </div>
              <div className="text-[10px] font-semibold leading-tight text-zinc-800">
                {t.label}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- SETTINGS ---------- */
function SettingsContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  const [url, setUrl] = useState(true);
  const [pix, setPix] = useState(true);
  const [apps, setApps] = useState(true);
  const [sms, setSms] = useState(true);

  const items = [
    {
      key: "url",
      title: "Avisar sobre links suspeitos",
      desc: "Vou checar se um link recebido pode ser golpe antes de abrir.",
      on: url,
      set: setUrl,
      icon: Link2,
    },
    {
      key: "pix",
      title: "Avisar sobre Pix suspeito",
      desc: "Antes de pagar, confirmo se a chave Pix é segura.",
      on: pix,
      set: setPix,
      icon: Banknote,
    },
    {
      key: "apps",
      title: "Avisar sobre apps suspeitos",
      desc: "Aviso se um app instalado pedir permissões perigosas.",
      on: apps,
      set: setApps,
      icon: Package,
    },
    {
      key: "sms",
      title: "Avisar sobre SMS suspeitos",
      desc: "Mensagens com indícios de golpe são marcadas para você.",
      on: sms,
      set: setSms,
      icon: MessageSquareWarning,
    },
  ];

  return (
    <div className={screenBase}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("home")}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 active:bg-zinc-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        <h3 className="text-sm font-semibold text-zinc-900">Ajustes</h3>
      </div>

      <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-[#007AFF]/15 bg-[#007AFF]/5 px-3 py-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#007AFF]/15 text-[#007AFF]">
          <User className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[12px] font-semibold text-zinc-900">Olá, Maria</div>
          <div className="text-[10px] text-zinc-500">Conta verificada</div>
        </div>
      </div>

      <p className="mt-3 text-[10px] uppercase tracking-wider text-zinc-500">
        O que a Vanguarda deve fazer?
      </p>

      <div className="mt-1.5 space-y-2 overflow-y-auto pr-1">
        {items.map((it) => (
          <div
            key={it.key}
            className="flex items-start gap-2.5 rounded-xl border border-zinc-200 bg-white px-2.5 py-2.5"
          >
            <div
              className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                it.on ? "bg-[#007AFF]/10 text-[#007AFF]" : "bg-zinc-100 text-zinc-400"
              }`}
            >
              <it.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-semibold leading-tight text-zinc-900">
                {it.title}
              </div>
              <div className="mt-0.5 text-[10px] leading-snug text-zinc-500">{it.desc}</div>
            </div>
            <button
              onClick={() => it.set(!it.on)}
              className={`relative mt-1 h-6 w-11 flex-shrink-0 rounded-full p-0.5 transition-colors ${
                it.on ? "bg-[var(--safe)]" : "bg-zinc-300"
              }`}
            >
              <motion.div
                animate={{ x: it.on ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="h-5 w-5 rounded-full bg-white shadow"
              />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("welcome")}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--alert)]/30 bg-[var(--alert)]/5 py-2.5 text-xs font-semibold text-[var(--alert)] active:bg-[var(--alert)]/10"
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
    <div className={screenBase}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("home")}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 active:bg-zinc-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        <h3 className="text-sm font-semibold text-zinc-900">Verificar Link</h3>
      </div>

      <p className="mt-3 text-[11px] text-zinc-600">
        Cole um link que recebeu para checar se é seguro.
      </p>

      <div className="mt-2 flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5">
        <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-zinc-400" />
        <input
          type="text"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            setAnalyzed(false);
          }}
          placeholder="https://..."
          className="flex-1 bg-transparent text-[11px] text-zinc-800 placeholder-zinc-400 outline-none"
        />
      </div>

      <button
        onClick={() => setAnalyzed(true)}
        className="mt-3 w-full rounded-xl bg-[#007AFF] py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.5)] active:opacity-90"
      >
        Analisar Link
      </button>

      <AnimatePresence>
        {analyzed && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="mt-3 flex items-start gap-2.5 rounded-xl border border-[var(--alert)]/40 bg-[var(--alert)]/10 p-3"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--alert)]" />
            <div>
              <div className="text-[11px] font-bold text-[var(--alert)]">Cuidado!</div>
              <div className="mt-0.5 text-[10px] text-zinc-700">
                Este link parece ser um golpe (Phishing). Não abra.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!analyzed && (
        <div className="mt-auto space-y-1.5">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Recentes</div>
          {["bit.ly/oferta99", "pagamento-pix.tk"].map((u) => (
            <div
              key={u}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--alert)]" />
              <span className="flex-1 text-[10px] text-zinc-600">{u}</span>
              <span className="text-[9px] font-semibold text-[var(--alert)]">Golpe</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- PIX VERIFIER ---------- */
function PixContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  const [mode, setMode] = useState<"manual" | "qr">("manual");
  const [pix, setPix] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className={screenBase}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("home")}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 active:bg-zinc-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        <h3 className="text-sm font-semibold text-zinc-900">Verificar Pix</h3>
      </div>

      <p className="mt-2 text-[11px] text-zinc-600">
        Antes de pagar, confira se a chave é segura.
      </p>

      {/* Mode toggle */}
      <div className="mt-2 grid grid-cols-2 gap-1 rounded-xl bg-zinc-100 p-1">
        {([
          { k: "manual", l: "Digitar chave", i: Banknote },
          { k: "qr", l: "Ler QR Code", i: QrCode },
        ] as const).map((m) => {
          const active = mode === m.k;
          const Icon = m.i;
          return (
            <button
              key={m.k}
              onClick={() => {
                setMode(m.k);
                setAnalyzed(false);
              }}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[10px] font-semibold transition ${
                active ? "bg-white text-[#007AFF] shadow-sm" : "text-zinc-500"
              }`}
            >
              <Icon className="h-3 w-3" /> {m.l}
            </button>
          );
        })}
      </div>

      {mode === "manual" ? (
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5">
          <Banknote className="h-3.5 w-3.5 flex-shrink-0 text-zinc-400" />
          <input
            type="text"
            value={pix}
            onChange={(e) => {
              setPix(e.target.value);
              setAnalyzed(false);
            }}
            placeholder="Cole a chave Pix aqui"
            className="flex-1 bg-transparent text-[11px] text-zinc-800 placeholder-zinc-400 outline-none"
          />
        </div>
      ) : (
        <div className="mt-3 relative aspect-square overflow-hidden rounded-2xl border-2 border-[#007AFF]/30 bg-zinc-900">
          {/* Camera viewfinder */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,122,255,0.15),transparent_70%)]" />
          <Camera className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white/60" />
          {/* Corner brackets */}
          {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2", "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"].map((p) => (
            <div key={p} className={`absolute h-5 w-5 border-[#007AFF] ${p}`} />
          ))}
          {/* Scanline */}
          <motion.div
            animate={{ y: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-2 h-0.5 bg-[#007AFF] shadow-[0_0_12px_2px_rgba(0,122,255,0.7)]"
          />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-medium text-white">
            <ScanLine className="mr-1 inline h-2.5 w-2.5" />
            Aponte para o QR Code
          </div>
        </div>
      )}

      <button
        onClick={() => setAnalyzed(true)}
        className="mt-3 w-full rounded-xl bg-[#007AFF] py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,122,255,0.5)] active:opacity-90"
      >
        Verificar agora
      </button>

      <AnimatePresence>
        {analyzed && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="mt-3 rounded-xl border border-[var(--alert)]/40 bg-[var(--alert)]/10 p-3"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-[var(--alert)]" />
              <div className="text-[11px] font-bold text-[var(--alert)]">Pix suspeito</div>
            </div>
            <div className="mt-1 text-[10px] text-zinc-700">
              Destinatário: <span className="font-semibold">J. R. SILVA ME</span>
            </div>
            <div className="text-[10px] text-zinc-700">
              Chave criada há 2 dias. Risco alto de golpe.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- BLOG ---------- */
const POSTS = [
  {
    title: "Golpe do Pix: como reconhecer",
    excerpt: "Mensagens urgentes pedindo Pix são quase sempre golpes. Veja os 5 sinais.",
    tag: "Pix",
    time: "3 min",
  },
  {
    title: "Falso boleto do INSS",
    excerpt: "Aposentados estão recebendo boletos falsos por SMS. Saiba como conferir.",
    tag: "SMS",
    time: "4 min",
  },
  {
    title: "WhatsApp clonado",
    excerpt: "Nunca envie códigos de 6 dígitos para ninguém, nem para parentes.",
    tag: "WhatsApp",
    time: "2 min",
  },
  {
    title: "Apps falsos de banco",
    excerpt: "Baixe sempre pela loja oficial. Veja como identificar apps clonados.",
    tag: "Apps",
    time: "3 min",
  },
];

function BlogContent({ navigate }: { navigate: (s: JourneyScreen) => void }) {
  return (
    <div className={screenBase}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("home")}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 active:bg-zinc-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        <h3 className="text-sm font-semibold text-zinc-900">Central de Notícias</h3>
      </div>

      <p className="mt-2 text-[11px] text-zinc-600">
        Aprenda a reconhecer os golpes mais comuns na internet.
      </p>

      <div className="mt-2 flex-1 space-y-2 overflow-y-auto pr-1">
        {POSTS.map((p, i) => (
          <motion.button
            key={p.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-left active:bg-zinc-50"
          >
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-[#007AFF]/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-[#007AFF]">
                {p.tag}
              </span>
              <span className="flex items-center gap-0.5 text-[9px] text-zinc-400">
                <Clock className="h-2.5 w-2.5" /> {p.time}
              </span>
            </div>
            <div className="mt-1 text-[12px] font-semibold leading-tight text-zinc-900">
              {p.title}
            </div>
            <div className="mt-0.5 text-[10px] leading-snug text-zinc-500">{p.excerpt}</div>
            <div className="mt-1.5 flex items-center justify-end text-[10px] font-semibold text-[#007AFF]">
              Ler mais <ChevronRight className="h-3 w-3" />
            </div>
          </motion.button>
        ))}
      </div>
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
  useEffect(() => {
    prevScreen.current = screen;
  }, [screen]);

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
        {screen === "pix" && <PixContent navigate={navigate} />}
        {screen === "blog" && <BlogContent navigate={navigate} />}
      </motion.div>
    </AnimatePresence>
  );
}