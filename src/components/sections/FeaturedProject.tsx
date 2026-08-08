import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Code2, FileText, ShieldCheck, FolderGit2, MessagesSquare } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArchitectureFlow } from "@/components/ui/ArchitectureFlow";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  featuredProject,
  featuredProjectFeatures,
  architectureStages,
} from "@/data/profile";

const featureIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "AI Code Generation": Code2,
  "AI Documentation": FileText,
  "Code Review": ShieldCheck,
  "Repository Analysis": FolderGit2,
  "RAG Chat": MessagesSquare,
  "Project Management": FolderGit2,
  "GitHub Import": GithubIcon,
  "ZIP Upload": FolderGit2,
  "JWT Authentication": ShieldCheck,
  "Workspace Isolation": FileText,
};

function DashboardMockup() {
  return (
    <div className="rounded-xl border border-line-soft bg-void/60 overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-line-soft px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal-2/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal-3/60" />
        <span className="ml-3 font-mono text-[10px] text-text-faint">CodeForge-AI</span>
      </div>
      {/* mock editor */}
      <div className="p-5 font-mono text-[12px] leading-relaxed">
        <div className="flex items-center gap-2 mb-3">
          <span className="rounded bg-signal-2/10 px-2 py-0.5 text-signal-2 text-[10px]">Generate</span>
          <span className="rounded bg-signal-3/10 px-2 py-0.5 text-signal-3 text-[10px]">Review</span>
          <span className="rounded bg-signal/10 px-2 py-0.5 text-signal text-[10px]">Docs</span>
        </div>
        <div className="space-y-1">
          <div className="flex gap-3"><span className="text-text-faint">1</span><span className="text-signal-3">const</span><span className="text-signal-2"> prompt</span><span className="text-text-dim">=</span><span className="text-text-faint">"Build a robust FastAPI service"</span></div>
          <div className="flex gap-3"><span className="text-text-faint">2</span><span className="text-text-dim">import</span><span className="text-signal-2"> app</span><span className="text-text-faint">from "./main";</span></div>
          <div className="flex gap-3"><span className="text-text-faint">3</span><span className="text-text-dim">// AI generates, reviews &amp; documents</span></div>
          <div className="flex gap-3"><span className="text-text-faint">4</span><span className="text-signal-3">export</span><span className="text-text-faint">...</span></div>
        </div>
        <motion.div
          className="mt-4 h-1 rounded-full bg-gradient-to-r from-signal via-signal-2 to-signal-3"
          animate={useReducedMotion() ? {} : { x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

export function FeaturedProject() {
  const reduced = useReducedMotion();

  return (
    <section id="featured-project" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-signal-3/[0.07] blur-[140px]" />

      <div className="container-page relative">
        <SectionHeader index="04" eyebrow="Flagship Build" title="Featured project" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-line glass overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 md:p-10 lg:p-14">
            <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal-3">
              <Sparkles size={13} /> AI-Powered Developer Platform
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-semibold text-text mb-3 tracking-tight"
            >
              {featuredProject.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-dim text-base md:text-lg leading-relaxed max-w-2xl mb-8"
            >
              {featuredProject.description}
            </motion.p>

            <div className="flex flex-wrap gap-2 mb-9">
              {featuredProject.tech.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduced ? 0 : i * 0.06 }}
                  className="rounded-md border border-line-soft px-2.5 py-1 font-mono text-[11.5px] text-text-dim"
                >
                  {t}
                </motion.span>
              ))}
            </div>

            {/* Dashboard mockup */}
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint mb-4">
                  Product
                </div>
                <DashboardMockup />
              </motion.div>

              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint mb-4">
                  System Architecture
                </div>
                <ArchitectureFlow stages={architectureStages} />
              </div>
            </div>

            {/* Features */}
            <div className="mb-10">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint mb-4">
                Capabilities
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {featuredProjectFeatures.map((feature, i) => {
                  const Icon = featureIcons[feature] ?? Sparkles;
                  return (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: reduced ? 0 : i * 0.05 }}
                      className="flex items-center gap-2.5 rounded-md border border-line-soft px-3 py-2.5 text-[13px] text-text-dim transition-colors hover:border-signal-2/40 hover:text-text"
                    >
                      <Icon size={14} className="text-signal-2 shrink-0" />
                      {feature}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {featuredProject.bullets && (
              <ul className="mb-10 space-y-3">
                {featuredProject.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduced ? 0 : i * 0.06 }}
                    className="flex gap-2.5 text-sm text-text-dim leading-relaxed"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-3" />
                    {b}
                  </motion.li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-4">
              <Button href={featuredProject.github} target="_blank" rel="noreferrer noopener" variant="primary" icon={<ArrowUpRight size={15} />}>
                View Project
              </Button>
              <Button href={featuredProject.github} target="_blank" rel="noreferrer noopener" variant="secondary" icon={<GithubIcon width={15} height={15} />}>
                GitHub
              </Button>
              <span className="inline-flex items-center gap-2 rounded-lg border border-line-soft px-5 py-3 font-mono text-sm text-text-faint">
                Live Demo — Coming Soon
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
