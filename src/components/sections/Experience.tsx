import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/profile";
import { MapPinIcon, CalendarIcon } from "@/components/ui/BrandIcons";

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="film-grain" aria-hidden="true" />
      <div className="container relative">
        <SectionHeader
          index="02"
          eyebrow="Experience"
          title="Professional experience building and validating backend systems at scale."
        />

        <div className="relative">
          <div className="absolute left-8 md:left-[calc(50%-1px)] top-0 bottom-0 w-px bg-border" aria-hidden="true" />

          {experience.map((job, jobIdx) => (
            <Reveal key={job.company} delay={jobIdx * 0.15}>
              <div className="relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0">
                <div className="relative flex flex-col md:flex-row md:items-start md:justify-between w-full md:w-1/2 pr-8 md:pr-12">
                  <div className="absolute left-8 md:left-[calc(50%-12px)] top-4 w-6 h-6 rounded-full border-4 border-gold bg-ink z-10" aria-hidden="true" />
                  <div className="relative z-10 pt-4 md:pt-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                        <span className="font-display text-xl font-medium text-gold">{job.company.slice(0, 1)}</span>
                      </div>
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-medium text-text">{job.company}</h3>
                        <p className="text-gold font-medium">{job.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm font-mono text-text-muted">
                      <span className="flex items-center gap-1.5">
                        <CalendarIcon width={14} height={14} />
                        {job.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPinIcon width={14} height={14} />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 pl-8 md:pl-12 pt-8 md:pt-0">
                  <div className="card p-6">
                    <ul className="space-y-4" role="list">
                      {job.bullets.map((bullet, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                          className="flex gap-3 text-text-muted leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2.5" aria-hidden="true" />
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}