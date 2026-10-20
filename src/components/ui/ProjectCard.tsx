import { ArrowUpRightIcon, GithubIcon } from "@/components/ui/BrandIcons";
import type { ProjectEntry } from "@/types";

interface ProjectCardProps {
  project: ProjectEntry;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const isFeatured = project.featured;

  return (
    <article
      className={`card card-gold relative overflow-hidden group ${isFeatured ? "col-span-1 row-span-2 md:col-span-2" : ""}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30">
            <span className="font-mono text-xs font-medium text-gold">
              {project.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.name} repository`}
                className="link-icon p-1"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon width={18} height={18} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.name} live demo`}
                className="link-icon p-1"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRightIcon width={18} height={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-display text-xl md:text-2xl font-medium text-text mb-3 group-hover:text-gold transition-colors">
          {project.name}
        </h3>

        <p className="text-text-muted text-sm md:text-base leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {project.status && (
          <span className="badge badge-gold mb-4 self-start">{project.status}</span>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack?.slice(0, 6).map((tech) => (
            <span key={tech} className="tech-chip">{tech}</span>
          ))}
          {project.stack && project.stack.length > 6 && (
            <span className="tech-chip text-text-faint">+{project.stack.length - 6} more</span>
          )}
        </div>

        {project.highlights && (
          <ul className="space-y-2 text-sm text-text-muted">
            {project.highlights.slice(0, 4).map((highlight, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}