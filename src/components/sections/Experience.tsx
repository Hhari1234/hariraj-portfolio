import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/profile";
import { MapPinIcon, CalendarIcon } from "@/components/ui/BrandIcons";

const nokiaStack = [
  "Java",
  "Gradle",
  "Docker",
  "Linux",
  "Shell Scripting",
  "SonarQube",
  "JaCoCo",
  "Jenkins",
  "Unit Testing",
  "Module Testing",
  "Root-Cause Analysis",
  "CI/CD",
];

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container relative">
        <SectionHeader
          index="02"
          eyebrow="Experience"
          title="Professional experience building and validating backend systems at scale."
        />

        {experience.map((job) => (
          <div
            key={job.company}
            className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 lg:gap-12"
          >
            <Reveal>
              <div className="lg:sticky lg:top-[calc(72px+1.5rem)]">
                <article className="card p-6 border-l-2 border-l-gold">
                  <div className="card-head mb-5">
                    <div className="card-icon card-icon--lg">
                      <span className="font-display text-xl font-normal text-gold">
                        {job.company.slice(0, 1)}
                      </span>
                    </div>
                    <div className="card-text">
                      <h3 className="font-display text-2xl font-normal text-text leading-tight">
                        {job.company}
                      </h3>
                      <p className="text-gold text-sm mt-0.5">{job.role}</p>
                    </div>
                  </div>

                  <dl className="space-y-2 font-mono text-sm text-muted">
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Duration</dt>
                      <CalendarIcon width={14} height={14} className="shrink-0 text-subtle" aria-hidden="true" />
                      <dd>{job.duration}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Location</dt>
                      <MapPinIcon width={14} height={14} className="shrink-0 text-subtle" aria-hidden="true" />
                      <dd>{job.location}</dd>
                    </div>
                  </dl>
                </article>
              </div>
            </Reveal>

            <Reveal>
              <div className="min-w-0">
                <ul className="space-y-4" role="list">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-muted leading-[1.75]">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-[11px]"
                        aria-hidden="true"
                      />
                      <span className="min-w-0">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-line">
                  <div className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mb-3">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {nokiaStack.map((tech) => (
                      <span key={tech} className="tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
