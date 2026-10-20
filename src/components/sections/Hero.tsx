import { ArrowUpRightIcon, FileDownIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { profile } from "@/data/profile";

function StatusPill() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-line">
      <span className="w-2 h-2 rounded-full bg-teal" aria-hidden="true" />
      <span className="font-mono text-xs text-muted">{profile.availability}</span>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="GitHub profile"
        className="p-3 rounded-full bg-surface border border-line hover:border-gold hover:text-gold transition-all"
      >
        <GithubIcon width={20} height={20} />
      </a>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="LinkedIn profile"
        className="p-3 rounded-full bg-surface border border-line hover:border-gold hover:text-gold transition-all"
      >
        <LinkedinIcon width={20} height={20} />
      </a>
      <a
        href={`mailto:${profile.email}`}
        aria-label="Send email"
        className="p-3 rounded-full bg-surface border border-line hover:border-gold hover:text-gold transition-all"
      >
        <MailIcon width={20} height={20} />
      </a>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-start pt-[calc(72px+3rem)] pb-16 overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container relative">
        <div className="grid lg:grid-cols-[7fr_5fr] gap-12 lg:gap-16 items-start">
          <div className="w-full min-w-0">
            <StatusPill />

            <h1 className="mt-6 font-display font-normal leading-[1.05] tracking-[-0.02em] text-text clamp-text-h1">
              Hariraj <br />
              <span className="text-gold">Kuragayala</span>
            </h1>

            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
              Software Engineer . Backend . AI . Full-Stack
            </p>

            <div className="mt-8 space-y-3 max-w-[62ch]">
              <p className="text-muted text-base md:text-lg leading-[1.75]">
                Integrated M.Tech graduate in Software Engineering from VIT Vellore. Experienced in backend development, testing, and DevOps at Nokia.
              </p>
              <p className="text-muted text-base md:text-lg leading-[1.75]">
                Building full-stack applications and AI-powered developer tools with a focus on reliable, maintainable code.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#projects" variant="primary" icon={<ArrowUpRightIcon width={16} height={16} />}>
                View my work
              </Button>
              <Button
                href={profile.resumeUrl}
                download
                variant="secondary"
                icon={<FileDownIcon width={16} height={16} />}
              >
                Download CV
              </Button>
            </div>

            <div className="mt-8">
              <SocialLinks />
            </div>
          </div>

          <div className="relative w-full min-w-0 order-first lg:order-none">
            <ProfilePhoto />
          </div>
        </div>
      </div>
    </section>
  );
}