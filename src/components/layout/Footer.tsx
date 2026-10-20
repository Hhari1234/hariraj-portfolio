import { GithubIcon, LinkedinIcon, MailIcon, FileDownIcon } from "@/components/ui/BrandIcons";
import { profile, navLinks } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line py-12 md:py-16">
      <div className="container relative">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div className="min-w-0">
            <a href="#home" className="font-display font-normal text-xl text-text inline-block mb-4">
              HK<span className="text-gold">.</span>
            </a>
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              {profile.name}
              <br />
              Software Engineer &bull; AI Developer
            </p>
          </div>

          <nav aria-label="Footer navigation" className="min-w-0">
            <div className="font-mono text-xs uppercase tracking-wider text-muted mb-4">Navigate</div>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-muted hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <div className="font-mono text-xs uppercase tracking-wider text-muted mb-4">Connect</div>
            <div className="flex items-center gap-3">
              <a href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub profile" className="btn-icon">
                <GithubIcon width={18} height={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn profile" className="btn-icon">
                <LinkedinIcon width={18} height={18} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Send email" className="btn-icon">
                <MailIcon width={18} height={18} />
              </a>
              <a href={profile.resumeUrl} download aria-label="Download resume" className="btn-icon">
                <FileDownIcon width={18} height={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
          <span>&copy; {year} {profile.name}. All rights reserved.</span>
          <span>Built with React, TypeScript, and Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
