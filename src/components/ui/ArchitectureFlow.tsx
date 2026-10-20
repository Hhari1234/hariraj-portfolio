import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@/components/ui/BrandIcons";

type ArchitectureFlowProps = {
  stages: string[];
};

export function ArchitectureFlow({ stages }: ArchitectureFlowProps) {
  return (
    <div className="card p-4 md:p-5">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint mb-4">
        Pipeline
      </div>

      <div className="space-y-3">
        {stages.map((stage, index) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-3 py-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 font-mono text-[11px] text-gold">
              {index + 1}
            </div>
            <div className="flex-1 text-sm text-text-muted">{stage}</div>
            {index < stages.length - 1 && <ArrowUpRightIcon width={14} height={14} className="text-gold" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
