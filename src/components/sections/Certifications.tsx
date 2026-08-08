import { Award, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { certifications } from "@/data/profile";

export function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32 relative">
      <div className="container-page">
        <SectionHeader index="06" eyebrow="Certifications" title="Credentials" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-line bg-surface/40 p-5 flex flex-col gap-3 transition-colors hover:border-signal-2/50">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-3/10 text-signal-3">
                    <Award size={17} strokeWidth={1.75} />
                  </div>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`View credential for ${cert.name}`}
                      className="text-text-dim hover:text-signal-2 transition-colors"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
                <div>
                  <h3 className="text-text font-medium text-[15px] leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-text-dim text-sm mt-1">{cert.issuer}</p>
                  {cert.year && (
                    <p className="font-mono text-xs text-text-faint mt-2">{cert.year}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
