import { motion } from "framer-motion";
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
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="film-grain" aria-hidden="true" />
      <div className="container relative">
        <SectionHeader
          index="03"
          eyebrow="Skills"
          title="Technologies and tools I work with across the stack."
          description="Grouped by domain — hover a category to explore."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skillCategories.map((cat, i) => {
              const Icon = categoryIcons[cat.icon] || CodeIcon;
              return (
                <motion.article
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className="card p-6 card-gold group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-gold" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-medium text-text">{cat.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="tech-chip group-hover:border-gold group-hover:text-gold group-hover:bg-gold/10 transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}