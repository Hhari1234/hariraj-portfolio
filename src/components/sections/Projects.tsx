import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { featuredProjects, projects } from "@/data/profile";
import { ArrowUpRightIcon, GithubIcon, XIcon } from "@/components/ui/BrandIcons";

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
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
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3 text-text-muted leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2" aria-hidden="true" />
                    <span>{bullet}</span>
                  </motion.li>
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Projects() {
  const [openModal, setOpenModal] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="film-grain" aria-hidden="true" />
      <div className="container relative">
        <SectionHeader
          index="04"
          eyebrow="Projects"
          title="Selected work spanning AI platforms, developer tools, and full-stack applications."
          description="Two featured projects with deep technical detail, plus three additional builds."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setOpenModal(project)}
                />
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="divider" />
        </Reveal>

        <Reveal delay={0.3}>
          <h3 className="font-display text-2xl font-medium text-text text-center mb-8">More Projects</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setOpenModal(project)}
                />
              </motion.div>
            ))}
          </div>
        </Reveal>

        {openModal && <ProjectModal project={openModal} onClose={() => setOpenModal(null)} />}
      </div>
    </section>
  );
}