import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HIGHLIGHTS = [
  "Java Backend Development",
  "SonarQube",
  "UTMT",
  "JaCoCo",
  "Docker",
  "Linux",
  "Gradle",
  "Shell Scripting",
  "Logging",
  "Debugging",
  "Security Compliance",
  "Root Cause Analysis",
  "Code Quality",
  "System Reliability",
];

export function Experience() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_50%_50%_at_10%_50%,black,transparent)]" />
      <div className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full bg-signal/[0.08] blur-[120px]" />

      <div className="container-page relative">
        <SectionHeader index="03" eyebrow="Experience" title="Nokia — Software Engineering Intern" />

        {experience.map((job, jobIdx) => (
          <div key={job.company} className="relative">
            {/* Timeline */}
            <div className="hidden md:flex items-center gap-4 mb-10 font-mono text-xs text-text-faint">
              <span>2025</span>
              <div className="relative flex-1 h-px bg-line-soft">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute inset-0 origin-left bg-gradient-to-r from-signal via-signal-2 to-signal-3"
                />
              </div>
              <span>2026</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl border border-signal/25 bg-gradient-to-br from-surface/80 to-surface/30 p-6 md:p-10 overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-signal/10 blur-3xl" />

              <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-signal/10 text-signal-2 font-display font-bold text-xl">
                    {job.company.slice(0, 1)}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-text">{job.company}</h3>
                    <p className="text-signal-2 font-medium mt-1">{job.role}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 font-mono text-xs text-text-dim md:items-end shrink-0">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> {job.duration}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={13} /> {job.location}</span>
                </div>
              </div>

              {/* Highlight chips — progressive reveal */}
              <div className="relative mb-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint mb-3">
                  Focus Areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {HIGHLIGHTS.map((h, i) => (
                    <motion.span
                      key={h}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.3, delay: reduced ? 0 : (jobIdx * 0.05 + i * 0.04) }}
                      className="rounded-md border border-signal-2/30 bg-signal-2/5 px-3 py-1.5 font-mono text-xs text-signal-2"
                    >
                      {h}
                    </motion.span>
                  ))}
                </div>
              </div>

              <ul className="relative grid md:grid-cols-2 gap-x-8 gap-y-3">
                {job.bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: reduced ? 0 : i * 0.05 }}
                    className="flex gap-2.5 text-sm text-text-dim leading-relaxed"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-2" />
                    {bullet}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
