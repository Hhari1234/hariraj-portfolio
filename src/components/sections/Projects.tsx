import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { featuredProjects, projects } from "@/data/profile";
import { ArrowUpRightIcon, GithubIcon, XIcon } from "@/components/ui/BrandIcons";

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="badge badge-gold mb-2">{project.status}</span>
            <h2 id="modal-title" className="font-display text-2xl md:text-3xl font-medium text-text">
              {project.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-surface-elevated border border-border hover:border-gold/50 transition-colors link-icon"
            aria-label="Close modal"
          >
            <XIcon width={20} height={20} />
          </button>
        </div>

        <p className="text-text-muted text-lg leading-relaxed mb-6">{project.description}</p>

        {project.bullets && (
          <div className="space-y-3 mb-6">
            <h3 className="font-display text-lg font-medium text-text mb-3">Details</h3>
            <ul className="space-y-2">
              {project.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-text-muted leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-display text-lg font-medium text-text mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.stack?.map((tech) => (
              <span key={tech} className="tech-chip">{tech}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-secondary"
            >
              <GithubIcon width={16} height={16} />
              Repository
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary"
            >
              <ArrowUpRightIcon width={16} height={16} />
              Live Demo
            </a>
          )}
          {!project.repoUrl && !project.liveUrl && (
            <span className="btn btn-ghost text-text-faint">Source not public</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [openModal, setOpenModal] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="container relative">
        <SectionHeader
          index="03"
          eyebrow="Projects"
          title="Selected work spanning AI platforms, developer tools, and full-stack applications."
          description="Two featured projects with deep technical detail, plus three additional builds."
          align="center"
        />

        <Reveal>
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            {featuredProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  project={project}
                  onClick={() => setOpenModal(project)}
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="divider" />
        </Reveal>

        <Reveal>
          <h3 className="font-display text-2xl font-medium text-text text-center mb-8">More Projects</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  project={project}
                  onClick={() => setOpenModal(project)}
                />
              </div>
            ))}
          </div>
        </Reveal>

        {openModal && <ProjectModal project={openModal} onClose={() => setOpenModal(null)} />}
      </div>
    </section>
  );
}