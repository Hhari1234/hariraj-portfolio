import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { education, profile, skillCategories, experience, projects, featuredProjects } from "@/data/profile";
import { GraduationCapIcon, SparklesIcon, CodeIcon, ServerIcon, TerminalIcon } from "@/components/ui/BrandIcons";

const stats = [
  { value: "7.88", label: "CGPA", icon: GraduationCapIcon },
  { value: "10", label: "Months at Nokia", icon: SparklesIcon },
  { value: skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0).toString(), label: "Technologies", icon: CodeIcon },
  { value: (experience.length + projects.length + featuredProjects.length).toString(), label: "Projects Built", icon: ServerIcon },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="film-grain" aria-hidden="true" />
      <div className="container relative">
        <SectionHeader
          index="01"
          eyebrow="About"
          title="Building reliable software at the intersection of backend, AI, and full-stack engineering."
        />

        <Reveal>
          <p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-3xl mb-12">
            {profile.summary}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                <div className="stat-card">
                  <stat.icon className="w-6 h-6 mx-auto mb-3 text-gold" aria-hidden="true" />
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="divider" />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16">
          <Reveal delay={0.3}>
            <h3 className="font-display text-2xl md:text-3xl font-medium text-text mb-6">Education</h3>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="card p-6 relative"
                >
                  <div className="absolute top-4 right-4 badge badge-gold text-xs">
                    {edu.duration}
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                      <GraduationCapIcon className="w-6 h-6 text-gold" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-medium text-text">{edu.degree}</h4>
                      <p className="text-text-muted text-sm">{edu.institution}</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm text-gold">{edu.detail}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <h3 className="font-display text-2xl md:text-3xl font-medium text-text mb-6">Focus Areas</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Backend Engineering", desc: "Spring Boot, FastAPI, REST APIs, Node.js/Express", icon: ServerIcon },
                { title: "AI & RAG Systems", desc: "LLMs, Vector Search, ChromaDB, Sentence Transformers", icon: SparklesIcon },
                { title: "Full-Stack Development", desc: "React, TypeScript, PostgreSQL, MongoDB, Docker", icon: CodeIcon },
                { title: "DevOps & Testing", desc: "Git, Docker, Jenkins, Linux, Gradle, SonarQube, JaCoCo", icon: TerminalIcon },
              ].map((area, i) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="card p-6 card-gold"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center mb-4">
                    <area.icon className="w-5 h-5 text-gold" aria-hidden="true" />
                  </div>
                  <h4 className="font-display text-lg font-medium text-text mb-2">{area.title}</h4>
                  <p className="text-text-muted text-sm">{area.desc}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}