import { ArrowUpRightIcon } from "@/components/ui/BrandIcons";

type ArchitectureFlowProps = {
  stages: string[];
};

export function ArchitectureFlow({ stages }: ArchitectureFlowProps) {
  return (
    <div className="card p-4 md:p-5">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle mb-4">
        Pipeline
      </div>

      <div className="space-y-3">
        {stages.map((stage, index) => (
          <div
            key={stage}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface-elevated px-3 py-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 font-mono text-[11px] text-gold">
              {index + 1}
            </div>
            <div className="flex-1 text-sm text-muted">{stage}</div>
            {index < stages.length - 1 && <ArrowUpRightIcon width={14} height={14} className="text-gold" />}
          </div>
        ))}
      </div>
    </div>
  );
}
