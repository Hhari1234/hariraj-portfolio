import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { featuredProjects, projects } from "@/data/profile";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container relative">
        <SectionHeader
          index="03"
          eyebrow="Projects"
          title="Selected work spanning AI platforms, developer tools, and full-stack applications."
          description="Two featured projects with deep technical detail, plus three additional builds."
        />

        <Reveal>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 mb-16">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="divider" />
        </Reveal>

        <Reveal>
          <h3 className="font-display text-2xl font-normal text-text mb-8">More Projects</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
