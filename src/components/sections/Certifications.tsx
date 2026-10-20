import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications } from "@/data/profile";
import { AwardIcon, GlobeIcon } from "@/components/ui/BrandIcons";

export function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-28 relative">
      <div className="film-grain" aria-hidden="true" />
      <div className="container relative">
        <SectionHeader
          index="05"
          eyebrow="Certifications"
          title="Verified credentials across AI, cloud, and full-stack development."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <motion.article
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className="card p-6 card-gold relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-4">
                  <AwardIcon className="w-6 h-6 text-gold" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-medium text-text mb-2 leading-snug">
                  {cert.name}
                </h3>
                <p className="text-text-muted text-sm mb-2">{cert.issuer}</p>
                {cert.year && (
                  <p className="font-mono text-xs text-gold mb-2">{cert.year}</p>
                )}
                {(cert.url || cert.credentialUrl) && (
                  <a
                    href={cert.credentialUrl || cert.url!}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-gold hover:text-gold/70 transition-colors mt-2"
                    aria-label={`View credential for ${cert.name}`}
                  >
                    Verify
                    <GlobeIcon width={12} height={12} />
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}