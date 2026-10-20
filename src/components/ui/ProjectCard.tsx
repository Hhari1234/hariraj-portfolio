import { ArrowUpRightIcon, GithubIcon } from "@/components/ui/BrandIcons";
import { ArchitectureFlow } from "@/components/ui/ArchitectureFlow";
import type { ProjectEntry } from "@/types";

interface ProjectCardProps {
  project: ProjectEntry;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const hasLinks = Boolean(project.repoUrl || project.liveUrl);

  return (
    <article className="card card-gold relative overflow-hidden min-w-0 h-full flex flex-col">
      <div className="relative p-6 md:p-7 flex flex-col h-full min-w-0">
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className="font-mono text-xs font-medium text-gold border border-gold/30 bg-gold/10 rounded-full px-3 py-1.5 shrink-0">
            {project.name.slice(0, 2).toUpperCase()}
          </span>
          {project.status && (
            <span className="badge badge-muted shrink-0">{project.status}</span>
          )}
        </div>

        <h3 className="font-display text-xl md:text-2xl font-normal text-text mb-3 leading-tight">
          {project.name}
        </h3>

        <p className="text-muted text-sm md:text-base leading-relaxed mb-5">
          {project.description}
        </p>

        {featured && project.pipeline && (
          <div className="mb-5">
            <ArchitectureFlow stages={project.pipeline} />
          </div>
        )}

        {project.bullets && (
          <ul className="space-y-2.5 mb-5" role="list">
            {project.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm text-muted leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-[9px]" aria-hidden="true" />
                <span className="min-w-0">{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-chip">{tech}</span>
          ))}
        </div>

        <div className="mt-auto pt-5 border-t border-line flex flex-wrap items-center gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-secondary !min-h-[40px] !px-4 !py-2"
            >
              <GithubIcon width={15} height={15} />
              Repository
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary !min-h-[40px] !px-4 !py-2"
            >
              <ArrowUpRightIcon width={15} height={15} />
              Live demo
            </a>
          )}
          {!hasLinks && (
            <span className="font-mono text-xs text-subtle">Case study coming soon</span>
          )}
        </div>
      </div>
    </article>
  );
}
