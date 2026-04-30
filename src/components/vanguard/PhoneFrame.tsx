import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      className={`relative mx-auto ${className}`}
      style={{ width: "min(320px, 78vw)" }}
    >
      {/* Outer glow */}
      <div className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(0,122,255,0.25),transparent_70%)] blur-2xl" />
      {/* Frame */}
      <div className="relative aspect-[9/19] rounded-[2.6rem] border border-white/15 bg-gradient-to-b from-zinc-800/80 to-black p-[6px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-black">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10">
            <div className="absolute right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-zinc-700" />
          </div>
          {/* Status bar */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-1.5 text-[10px] font-medium text-white/80">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--safe)]" /> 5G
            </span>
          </div>
          {/* Screen content */}
          <div className="relative h-full w-full pt-7">{children}</div>
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-zinc-700" />
      <div className="absolute -left-[3px] top-40 h-16 w-[3px] rounded-l bg-zinc-700" />
      <div className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r bg-zinc-700" />
    </motion.div>
  );
}
