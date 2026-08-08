import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/profile";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container-page">
        <SectionHeader
          index="05"
          eyebrow="Projects"
          title="Other things I've built"
          description="Smaller builds spanning full-stack, backend, and computer vision."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
