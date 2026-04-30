import { motion, MotionValue, useTransform } from "framer-motion";

type Tone = "neutral" | "neon" | "alert" | "safe";

const palette: Record<Tone, { a: string; b: string; c: string }> = {
  neutral: { a: "rgba(0,122,255,0.35)", b: "rgba(80,80,160,0.25)", c: "rgba(0,180,255,0.18)" },
  neon: { a: "rgba(0,122,255,0.55)", b: "rgba(0,80,200,0.45)", c: "rgba(80,160,255,0.35)" },
  alert: { a: "rgba(255,59,48,0.55)", b: "rgba(180,30,30,0.45)", c: "rgba(255,90,80,0.35)" },
  safe: { a: "rgba(52,199,89,0.55)", b: "rgba(20,140,60,0.45)", c: "rgba(120,220,140,0.30)" },
};

interface Props {
  tone?: Tone;
  scrollProgress?: MotionValue<number>;
}

export function DynamicBackground({ tone = "neutral", scrollProgress }: Props) {
  const colors = palette[tone];

  // Defaults if no scroll provided
  const fallback = useTransform([0] as unknown as MotionValue<number>[], () => 0);
  const sp = scrollProgress ?? fallback;

  const orb1X = useTransform(sp, [0, 1], ["-10%", "20%"]);
  const orb1Y = useTransform(sp, [0, 1], ["0%", "40%"]);
  const orb2X = useTransform(sp, [0, 1], ["60%", "30%"]);
  const orb2Y = useTransform(sp, [0, 1], ["20%", "60%"]);
  const orb3Y = useTransform(sp, [0, 1], ["-10%", "30%"]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050A0F]">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <motion.div
        className="absolute h-[55vw] w-[55vw] rounded-full blur-3xl"
        style={{ x: orb1X, y: orb1Y, left: "0%", top: "0%" }}
        animate={{ background: `radial-gradient(circle at center, ${colors.a}, transparent 60%)` }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[50vw] w-[50vw] rounded-full blur-3xl"
        style={{ x: orb2X, y: orb2Y, right: "0%", top: "10%" }}
        animate={{ background: `radial-gradient(circle at center, ${colors.b}, transparent 60%)` }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 h-[45vw] w-[45vw] rounded-full blur-3xl"
        style={{ y: orb3Y }}
        animate={{ background: `radial-gradient(circle at center, ${colors.c}, transparent 60%)` }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050A0F]" />
    </div>
  );
}
