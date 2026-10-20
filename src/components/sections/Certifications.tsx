import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications } from "@/data/profile";
import { AwardIcon, GlobeIcon } from "@/components/ui/BrandIcons";

export function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32 relative">
      <div className="container relative">
        <SectionHeader
          index="05"
          eyebrow="Certifications"
          title="Verified credentials across AI, cloud, and full-stack development."
          align="center"
        />

        <Reveal>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {certifications.map((cert) => (
              <article key={cert.name} className="card p-6 card-gold min-w-0">
                <div className="card-head mb-4">
                  <div className="card-icon">
                    <AwardIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="card-text font-display text-lg font-normal text-text leading-snug">
                    {cert.name}
                  </h3>
                </div>
                <p className="text-muted text-sm mt-3">{cert.issuer}</p>
                {cert.year && (
                  <p className="font-mono text-xs text-gold mt-2">{cert.year}</p>
                )}
                {(cert.url || cert.credentialUrl) && (
                  <a
                    href={cert.credentialUrl || cert.url!}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-gold hover:text-gold/70 transition-colors mt-3"
                    aria-label={`View credential for ${cert.name}`}
                  >
                    Verify
                    <GlobeIcon width={12} height={12} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
