import { motion } from "framer-motion";
import { ArrowUpRightIcon, FileDownIcon, GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function StatusPill() {
  const reduced = useReducedMotion();
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border">
      <span
        className={`w-2 h-2 rounded-full bg-teal ${!reduced ? "animate-pulse-dot" : ""}`}
        aria-hidden="true"
      />
      <span className="font-mono text-xs text-text-muted">{profile.availability}</span>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="GitHub profile"
        className="link-icon p-2 rounded-full bg-surface border border-border hover:border-gold/50 transition-all"
      >
        <GithubIcon width={20} height={20} />
      </a>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="LinkedIn profile"
        className="link-icon p-2 rounded-full bg-surface border border-border hover:border-gold/50 transition-all"
      >
        <LinkedinIcon width={20} height={20} />
      </a>
    </div>
  );
}

function ScrollIndicator({ reduced }: { reduced: boolean }) {
  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-text-muted hover:text-gold transition-colors"
      aria-label="Scroll to explore"
    >
      <span className="font-mono text-xs uppercase tracking-widest">Scroll to explore</span>
      <div className="w-px h-10 bg-border relative overflow-hidden">
        {!reduced && (
          <motion.div
            className="absolute inset-0 bg-gold origin-top"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    </motion.a>
  );
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-20 pb-16 md:pt-28 overflow-hidden">
      <div className="film-grain" aria-hidden="true" />

      <div className="container relative">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-text-muted font-mono text-xs uppercase tracking-widest mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-teal" aria-hidden="true" />
              {profile.primaryTitle} &bull; {profile.roles[1]}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-text"
            >
              Hi, I&apos;m <br />
              <span className="text-gradient-gold">Hariraj</span> <br />
              Kuragayala
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-6 max-w-xl text-text-muted text-base md:text-lg leading-relaxed"
            >
              {profile.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button href="#projects" variant="primary" icon={<ArrowUpRightIcon width={16} height={16} />}>
                View Work
              </Button>
              <Button
                href={profile.resumeUrl}
                download
                variant="secondary"
                icon={<FileDownIcon width={16} height={16} />}
              >
                Download CV
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-8"
            >
              <StatusPill />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-6"
            >
              <SocialLinks />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative lg:min-h-[520px]"
          >
            <ProfilePhoto />
          </motion.div>
        </div>

        <ScrollIndicator reduced={reduced} />
      </div>
    </section>
  );
}