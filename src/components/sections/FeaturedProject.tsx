import { motion } from "framer-motion";
import { ArrowUpRightIcon, GithubIcon, SparklesIcon, CodeIcon, FileDownIcon, ShieldCheckIcon, ServerIcon, CpuIcon } from "@/components/ui/BrandIcons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArchitectureFlow } from "@/components/ui/ArchitectureFlow";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { featuredProject, featuredProjectFeatures, architectureStages } from "@/data/profile";

const featureIcons = {
  "Code generation": CodeIcon,
  "Documentation": FileDownIcon,
  "Code review": ShieldCheckIcon,
  "Repository analysis": ServerIcon,
  "RAG chat": CpuIcon,
  "Project management": ServerIcon,
} as const;

function DashboardMockup() {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-text-muted/80" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">CodeForge AI</span>
      </div>

      <div className="p-5 font-mono text-[12px] leading-relaxed">
        <div className="flex items-center gap-2 mb-3">
          <span className="rounded bg-gold/10 px-2 py-0.5 text-gold text-[10px]">Generate</span>
          <span className="rounded bg-teal/10 px-2 py-0.5 text-teal text-[10px]">Review</span>
          <span className="rounded bg-surface-elevated px-2 py-0.5 text-text-muted text-[10px]">Docs</span>
        </div>
        <div className="space-y-2 text-text-muted">
          <div className="flex gap-3"><span className="text-text-faint">1</span><span className="text-gold">const</span><span className="text-text"> prompt </span><span className="text-text-faint">=</span><span className="text-text-muted"> "Build a FastAPI service"</span></div>
          <div className="flex gap-3"><span className="text-text-faint">2</span><span className="text-text-muted">import</span><span className="text-text"> app</span><span className="text-text-muted"> from "./main"</span></div>
          <div className="flex gap-3"><span className="text-text-faint">3</span><span className="text-text-faint">// AI reviews and documents code</span></div>
          <div className="flex gap-3"><span className="text-text-faint">4</span><span className="text-teal">return</span><span className="text-text-muted"> response</span></div>
        </div>
        <motion.div
          className="mt-4 h-1 rounded-full bg-gradient-to-r from-gold via-teal to-gold"
          animate={useReducedMotion() ? {} : { x: ["-100%", "90%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

export function FeaturedProject() {
  const reduced = useReducedMotion();

  return (
    <section id="featured-project" className="py-20 md:py-28 relative overflow-hidden">
      <div className="film-grain" aria-hidden="true" />
      <div className="container relative">
        <SectionHeader index="04" eyebrow="Flagship Build" title="CodeForge AI" description="RAG-powered engineering assistant for code generation, review, and repository analysis." align="center" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="card overflow-hidden"
        >
          <div className="p-6 md:p-10">
            <div className="flex items-center gap-2 mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
              <SparklesIcon width={14} height={14} /> 
              AI Developer Platform
            </div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10">
              <div>
                <h3 className="font-display text-4xl md:text-5xl text-text mb-3">{featuredProject.name}</h3>
                <p className="text-text-muted text-base md:text-lg leading-relaxed mb-6 max-w-2xl">{featuredProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredProject.tech.map((item, index) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: reduced ? 0 : index * 0.06 }}
                      className="tech-chip"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                <DashboardMockup />
              </div>

              <div className="flex flex-col justify-between gap-6">
                <ArchitectureFlow stages={architectureStages} />

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint mb-4">Capabilities</div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {featuredProjectFeatures.map((feature, index) => {
                      const IconComponent = featureIcons[feature as keyof typeof featureIcons] ?? SparklesIcon;
                      return (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: reduced ? 0 : index * 0.05 }}
                          className="flex items-center gap-2.5 rounded-md border border-border bg-surface-elevated px-3 py-2.5 text-[13px] text-text-muted"
                        >
                          <IconComponent width={14} height={14} className="text-gold shrink-0" />
                          {feature}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {featuredProject.bullets && (
              <ul className="mt-8 space-y-3">
                {featuredProject.bullets.map((bullet, index) => (
                  <motion.li
                    key={bullet}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduced ? 0 : index * 0.06 }}
                    className="flex gap-2.5 text-sm text-text-muted leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {bullet}
                  </motion.li>
                ))}
              </ul>
            )}

            {featuredProject.repoUrl && (
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={featuredProject.repoUrl} target="_blank" rel="noreferrer noopener" variant="primary" icon={<ArrowUpRightIcon width={15} height={15} />}>
                  View Project
                </Button>
                <Button href={featuredProject.repoUrl} target="_blank" rel="noreferrer noopener" variant="secondary" icon={<GithubIcon width={15} height={15} />}>
                  GitHub
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
