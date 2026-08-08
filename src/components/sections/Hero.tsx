import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RotatingRoles } from "@/components/ui/RotatingRoles";
import { HeroSceneWrapper } from "@/components/3d/HeroSceneWrapper";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { TechBadges } from "@/components/ui/TechBadges";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function SystemStatusPanel() {
  return (
    <div className="glass rounded-xl px-4 py-3 font-mono text-[11px] leading-relaxed lg:absolute lg:-bottom-6 lg:right-2 max-w-[280px] mx-auto lg:mx-0">
      <div className="flex items-center justify-between text-text-faint mb-2">
        <span>SYSTEM.STATUS</span>
        <span className="flex items-center gap-1.5 text-signal-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-signal-2 opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-2" />
          </span>
          ONLINE
        </span>
      </div>
      <div className="text-text-dim grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
        <span>ROLE</span>
        <span className="text-text">SOFTWARE ENGINEER</span>
        <span>FOCUS</span>
        <span className="text-text">AI + BACKEND</span>
        <span>STACK</span>
        <span className="text-text">JAVA / REACT / FASTAPI</span>
        <span>BUILD</span>
        <span className="text-text">{profile.graduationYear}</span>
        <span>LOCATION</span>
        <span className="text-text">INDIA</span>
      </div>
    </div>
  );
}

function ScrollIndicator({ reduced }: { reduced: boolean }) {
  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-text-faint hover:text-signal-2 transition-colors"
      aria-label="Scroll to explore"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
      <span className="h-8 w-px bg-line relative overflow-hidden">
        {!reduced && <span className="absolute inset-0 bg-signal-2 origin-top animate-scroll-line" />}
      </span>
    </motion.a>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven parallax: hero transforms into About as you scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.92]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, reduced ? 1 : 1.4]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] flex items-center pt-24 pb-16 md:pt-28 overflow-hidden"
    >
      {/* Layer 1 — dark background */}
      <div className="absolute inset-0 bg-void" />

      {/* Layer 2 — atmospheric radial gradients */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-signal/10 blur-[130px]"
      />
      <div className="absolute top-1/3 -left-40 w-[520px] h-[520px] rounded-full bg-signal-3/[0.08] blur-[120px]" />
      <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] rounded-full bg-signal-2/[0.07] blur-[120px]" />

      {/* Layer 3 — technical grid */}
      <div className="absolute inset-0 bg-grid-hero opacity-50 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_25%,black,transparent)]" />

      <div className="container-page relative grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center">
        {/* LEFT — foreground typography */}
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal-2 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-2" />
            </span>
            Software Engineer &bull; AI Developer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight"
          >
            Hi, I&apos;m
            <br />
            <span className="text-gradient">Hariraj</span>
            <br />
            Kuragayala
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-6 text-lg text-text-dim"
          >
            <RotatingRoles roles={profile.roles} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="mt-3 max-w-lg text-text-dim text-base md:text-[17px] leading-relaxed"
          >
            {profile.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Button href="#projects" variant="primary">
                View My Work
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button href={profile.resumeUrl} download variant="secondary" icon={<FileDown size={15} />}>
                Download Resume
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            className="mt-8 flex items-center gap-5"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="flex items-center gap-2 text-text-dim hover:text-signal-2 transition-colors font-mono text-sm"
            >
              <GithubIcon width={17} height={17} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="flex items-center gap-2 text-text-dim hover:text-signal-2 transition-colors font-mono text-sm"
            >
              <LinkedinIcon width={17} height={17} /> LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — layered visual: 3D + photo + orbit */}
        <motion.div style={{ scale: photoScale, y: photoY }} className="relative lg:min-h-[520px]">
          <div className="relative flex items-center justify-center">
            <div className="relative w-[min(88vw,400px)] lg:w-[440px] lg:max-w-none">
              {/* Layer 5 — subtle 3D geometry (behind photo, never covers face) */}
              <HeroSceneWrapper />

              {/* Layer 6 — profile photo (always renders, independent of Three.js) */}
              <ProfilePhoto />

              {/* Layer 7 — technology orbit / badges */}
              <TechBadges />
            </div>
          </div>

          {/* Layer 9 — system status panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.35 }}
            className="mt-10 lg:mt-0"
          >
            <SystemStatusPanel />
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator reduced={reduced} />
    </section>
  );
}
