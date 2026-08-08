import { motion } from "framer-motion";
import { Server, Cpu, Layers, Terminal } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { aboutFocusAreas, education, profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const icons = { server: Server, cpu: Cpu, layers: Layers, terminal: Terminal };

export function About() {
  const vitEducation = education[0];
  const reduced = useReducedMotion();

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-grid opacity-[0.1] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,black,transparent)]" />
      <div className="container-page relative">
        <SectionHeader index="01" eyebrow="About" title="Engineering software, one reliable system at a time" />

        {/* Cinematic large statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
          }}
          className="max-w-4xl mb-16"
        >
          {[
            "I build software that connects",
            "engineering, intelligence,",
            "and real-world products.",
          ].map((line) => (
            <motion.span
              key={line}
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
              }}
              className="block text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.15] tracking-tight"
            >
              {line.includes("engineering") ? (
                <span className="text-gradient">{line}</span>
              ) : (
                <span>{line}</span>
              )}
            </motion.span>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16">
          <Reveal>
            <p className="text-text-dim text-base md:text-lg leading-relaxed">
              I&apos;m completing an <span className="text-text">{vitEducation.degree}</span> at{" "}
              <span className="text-text">{vitEducation.institution}</span>, graduating in{" "}
              {profile.graduationYear}. Alongside my degree, I worked as a{" "}
              <span className="text-text">Software Engineering Intern at Nokia</span>, where I
              focused on Java backend development, software testing, and DevOps practices inside
              a large-scale production codebase.
            </p>
            <p className="mt-5 text-text-dim text-base md:text-lg leading-relaxed">
              My interests sit at the intersection of{" "}
              <span className="text-text">backend development</span>,{" "}
              <span className="text-text">artificial intelligence</span>, and{" "}
              <span className="text-text">full-stack engineering</span> — I like building systems
              that are correct, observable, and easy for the next engineer to reason about.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {[
                { label: "Backend Development", value: "Integrated M.Tech Software Engineering" },
                { label: "Artificial Intelligence", value: "VIT Vellore" },
                { label: "Full Stack Development", value: profile.graduationYear },
                { label: "Software Engineering", value: "Nokia · Java · DevOps" },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 0.06}>
                  <div className="rounded-lg border border-line bg-surface/40 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
                      {item.label}
                    </div>
                    <div className="text-text text-sm mt-1 font-medium">{item.value}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 glass rounded-xl p-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint mb-3">
                Education
              </div>
              <ul className="space-y-4">
                {education.map((edu) => (
                  <li key={edu.institution} className="flex flex-col gap-0.5">
                    <span className="text-text text-sm font-medium">{edu.degree}</span>
                    <span className="text-text-dim text-sm">{edu.institution}</span>
                    <span className="font-mono text-xs text-text-faint">
                      {edu.duration}
                      {edu.detail ? ` · ${edu.detail}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {aboutFocusAreas.map((area, i) => {
              const Icon = icons[area.icon as keyof typeof icons];
              return (
                <Reveal key={area.id} delay={i * 0.08}>
                  <div className="group h-full rounded-xl border border-line bg-surface/40 p-5 transition-colors hover:border-signal-2/50 hover:bg-surface/70">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-signal/10 text-signal-2 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={19} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-text font-medium text-[15px] mb-1.5">{area.title}</h3>
                    <p className="text-text-dim text-sm leading-relaxed">{area.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
