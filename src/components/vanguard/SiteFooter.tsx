import { motion } from "framer-motion";
import { ShieldCheck, GraduationCap } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-10 border-t border-white/5">
      <div className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-[var(--neon)]/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.1 }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
          >
            <ShieldCheck className="h-6 w-6 text-[var(--neon)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-lg font-semibold text-white">
              Projeto <span className="text-[var(--neon)] text-glow-neon">Vanguarda</span>
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.3em] text-white/40">
              Antecipe · Intercepte · Proteja
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card flex max-w-2xl items-center gap-3 rounded-2xl px-5 py-4 text-left"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--neon)]/15 text-[var(--neon)]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              Protótipo navegável criado pelo <span className="font-semibold text-white">Grupo 39</span> da
              {" "}<span className="font-semibold text-white">Pós Tech da FIAP</span> — Curso de{" "}
              <span className="font-semibold text-white">Tech Management</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="text-[10px] uppercase tracking-[0.3em] text-white/30"
          >
            © {new Date().getFullYear()} · Protótipo educacional
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
