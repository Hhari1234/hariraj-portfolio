import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  LayoutGrid,
  Server,
  Cpu,
  Database,
  ShieldCheck,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillCategories, coreConcepts } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

const icons: Record<string, typeof Code2> = {
  code: Code2,
  layout: LayoutGrid,
  server: Server,
  cpu: Cpu,
  database: Database,
  "shield-check": ShieldCheck,
  terminal: Terminal,
};

export function Skills() {
  const [activeId, setActiveId] = useState<string>(skillCategories[0]?.id ?? "");
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const select = (id: string) => {
    if (isMobile) return; // on mobile show all tiles
    setActiveId(id);
  };

  // Mobile: grid of category tiles.
  if (isMobile) {
    return (
      <section id="skills" className="py-24 md:py-32 relative">
        <div className="container-page">
          <SectionHeader
            index="02"
            eyebrow="Skills"
            title="A toolkit built across backend, AI, and full-stack work"
          />
          <div className="grid grid-cols-1 gap-4">
            {skillCategories.map((cat) => {
              const Icon = icons[cat.icon] ?? Code2;
              return (
                <div key={cat.id} className="rounded-xl border border-line bg-surface/40 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal/10 text-signal-2">
                      <Icon size={17} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-text font-medium text-[15px]">{cat.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="rounded-md border border-line-soft px-2.5 py-1 font-mono text-[11.5px] text-text-dim">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <div className="rounded-xl border border-line-soft bg-surface/20 p-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint mb-3">Core Concepts</div>
              <div className="flex flex-wrap gap-2">
                {coreConcepts.map((c) => (
                  <span key={c} className="rounded-md px-3 py-1.5 text-xs font-mono text-text-dim border border-line-soft">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: interactive category selector.
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-grid opacity-[0.1] [mask-image:radial-gradient(ellipse_50%_50%_at_90%_50%,black,transparent)]" />
      <div className="container-page relative">
        <SectionHeader
          index="02"
          eyebrow="Skills"
          title="A toolkit built across backend, AI, and full-stack work"
        />

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Category list */}
          <div className="flex flex-col gap-1.5">
            {skillCategories.map((cat) => {
              const Icon = icons[cat.icon] ?? Code2;
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => select(cat.id)}
                  aria-pressed={isActive}
                  className={`group flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? "border-signal-2/50 bg-signal-2/5 text-signal-2"
                      : "border-line bg-surface/30 text-text-dim hover:border-line-soft hover:text-text"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.75} className={isActive ? "text-signal-2" : ""} />
                  <span className="font-mono text-sm">{cat.label}</span>
                  <ArrowRight size={14} className={`ml-auto transition-transform ${isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`} />
                </button>
              );
            })}
          </div>

          {/* Animated technologies */}
          <div className="rounded-2xl border border-line bg-surface/30 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-signal-2/[0.07] blur-3xl" />
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal/10 text-signal-2">
                {(() => {
                  const ActiveIcon = icons[active.icon] ?? Code2;
                  return <ActiveIcon size={17} strokeWidth={1.75} />;
                })()}
              </div>
              <h3 className="text-lg font-semibold text-text">{active.label}</h3>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-2.5"
              >
                {active.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: reduced ? 0 : i * 0.05, duration: 0.3 }}
                    className="rounded-md border border-signal-2/40 bg-signal-2/5 px-3 py-1.5 font-mono text-[13px] text-signal-2"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-xl border border-line-soft bg-surface/20 p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint mb-3">Core Concepts</div>
            <div className="flex flex-wrap gap-2">
              {coreConcepts.map((c) => (
                <span key={c} className="rounded-md px-3 py-1.5 text-xs font-mono text-text-dim border border-line-soft">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
