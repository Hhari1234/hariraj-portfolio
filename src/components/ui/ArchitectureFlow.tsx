import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ArchitectureFlowProps {
  stages: string[];
}

export function ArchitectureFlow({ stages }: ArchitectureFlowProps) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex flex-col items-stretch" aria-label="System architecture flow">
      {stages.map((stage, i) => (
        <div key={stage} className="relative">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative z-10 flex items-center gap-3 rounded-lg border border-line bg-surface/70 px-4 py-3"
          >
            <span className="font-mono text-[10px] text-signal-2">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-mono text-sm text-text">{stage}</span>
          </motion.div>

          {i < stages.length - 1 && (
            <div className="relative flex justify-start pl-[19px]">
              <div className="h-6 w-px bg-line-soft" />
              {!reduced && (
                <motion.div
                  className="absolute top-0 h-2 w-px bg-signal-2"
                  animate={{ y: [0, 24, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
