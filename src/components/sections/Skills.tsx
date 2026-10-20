import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillCategories } from "@/data/profile";
import { CodeIcon, GraduationCapIcon, ServerIcon, LayoutIcon, DatabaseIcon, ShieldCheckIcon, TerminalIcon, CpuIcon } from "@/components/ui/BrandIcons";

const categoryIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  code: CodeIcon,
  "graduation-cap": GraduationCapIcon,
  server: ServerIcon,
  layout: LayoutIcon,
  database: DatabaseIcon,
  "shield-check": ShieldCheckIcon,
  terminal: TerminalIcon,
  cpu: CpuIcon,
};

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="container relative">
        <SectionHeader
          index="04"
          eyebrow="Skills"
          title="Technologies and tools I work with across the stack."
          description="Grouped by domain."
          align="center"
        />

        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skillCategories.map((cat) => {
              const Icon = categoryIcons[cat.icon] || CodeIcon;
              return (
                <article key={cat.id} className="card p-6 card-gold">
                  <div className="card-head mb-4">
                    <div className="card-icon">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="card-text font-display text-lg font-normal text-text leading-snug">
                      {cat.label}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="tech-chip">{skill}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}