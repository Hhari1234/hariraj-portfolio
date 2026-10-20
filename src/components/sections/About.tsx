import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  education,
  profile,
  experience,
  projects,
  featuredProjects,
  certifications,
  nokiaInternshipMonths,
} from "@/data/profile";
import { GraduationCapIcon, SparklesIcon, CodeIcon, ServerIcon, TerminalIcon } from "@/components/ui/BrandIcons";

const totalProjects = projects.length + featuredProjects.length;

const stats = [
  { value: "7.88", label: "CGPA", icon: GraduationCapIcon },
  {
    value: `${nokiaInternshipMonths} months`,
    label: "Nokia Internship",
    icon: SparklesIcon,
    sub: experience[0]?.duration,
  },
  { value: totalProjects.toString(), label: "Projects Built", icon: CodeIcon },
  { value: certifications.length.toString(), label: "Certifications", icon: ServerIcon },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container relative">
        <SectionHeader
          index="01"
          eyebrow="About"
          title="Building reliable software at the intersection of backend, AI, and full-stack engineering."
        />

        <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 lg:gap-16">
          <Reveal>
            <div className="space-y-4">
              <p className="text-muted text-base md:text-lg leading-[1.75]">
                {profile.summary.split(". ").slice(0, 2).join(". ")}.
              </p>
              <p className="text-muted text-base md:text-lg leading-[1.75]">
                {profile.summary.split(". ").slice(2, 4).join(". ")}.
              </p>
              <p className="text-muted text-base md:text-lg leading-[1.75]">
                {profile.summary.split(". ").slice(4).join(". ")}.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <stat.icon className="w-5 h-5 mx-auto mb-3 text-gold" aria-hidden="true" />
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  {stat.sub && (
                    <div className="mt-1 font-mono text-[11px] text-subtle">{stat.sub}</div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16">
          <Reveal>
            <h3 className="font-display text-2xl md:text-3xl font-normal text-text mb-6">Education</h3>
            <ul className="space-y-4" role="list">
              {education.map((edu) => (
                <li key={edu.institution} className="card p-5">
                  <div className="card-head">
                    <div className="card-icon">
                      <GraduationCapIcon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="card-text">
                      <h4 className="font-display text-lg font-normal text-text leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="text-muted text-sm mt-0.5 break-words">{edu.institution}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="badge badge-muted">{edu.duration}</span>
                    <span className="font-mono text-sm text-gold">{edu.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h3 className="font-display text-2xl md:text-3xl font-normal text-text mb-6">Focus Areas</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Backend Engineering", desc: "Spring Boot, FastAPI, REST APIs, Node.js/Express", icon: ServerIcon },
                { title: "AI & RAG Systems", desc: "LLMs, Vector Search, ChromaDB, Sentence Transformers", icon: SparklesIcon },
                { title: "Full-Stack Development", desc: "React, TypeScript, PostgreSQL, MongoDB, Docker", icon: CodeIcon },
                { title: "DevOps & Testing", desc: "Git, Docker, Jenkins, Linux, Gradle, SonarQube, JaCoCo", icon: TerminalIcon },
              ].map((area) => (
                <div key={area.title} className="card p-5 card-gold">
                  <div className="card-head">
                    <div className="card-icon">
                      <area.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="card-text">
                      <h4 className="font-display text-lg font-normal text-text leading-snug">
                        {area.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-muted text-sm mt-3 leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
