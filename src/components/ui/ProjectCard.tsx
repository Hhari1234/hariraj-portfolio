import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { ProjectEntry } from "@/types";

interface ProjectCardProps {
  project: ProjectEntry;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface/40 p-6 transition-all duration-300 hover:border-signal-2/50 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_-25px_rgba(91,124,250,0.5)]">
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-signal-2/0 blur-3xl transition-all duration-500 group-hover:bg-signal-2/15" />

      <div className="relative mb-5 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal/10 font-mono text-xs text-signal-2 transition-transform duration-300 group-hover:scale-110">
          {project.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.name} source on GitHub`}
              className="text-text-dim hover:text-signal-2 transition-colors"
            >
              <GithubIcon width={16} height={16} />
            </a>
          )}
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.name} live demo`}
              className="text-text-dim hover:text-signal-2 transition-colors"
            >
              <ArrowUpRight size={16} />
            </a>
          ) : (
            <span
              className="text-text-faint cursor-not-allowed"
              title="Live demo not available"
              aria-hidden="true"
            >
              <ArrowUpRight size={16} />
            </span>
          )}
        </div>
      </div>

      <h3 className="relative text-text font-medium text-[17px] mb-2">{project.name}</h3>
      <p className="relative text-text-dim text-sm leading-relaxed flex-1">{project.description}</p>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-line-soft px-2 py-1 font-mono text-[11px] text-text-faint transition-colors group-hover:border-signal-2/30 group-hover:text-text-dim"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
