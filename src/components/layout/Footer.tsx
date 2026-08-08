import { Mail, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile, navLinks } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line-soft py-14">
      <div className="container-page">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <a href="#home" className="font-display font-semibold text-lg text-text">
              HK<span className="text-signal-2">.</span>
            </a>
            <p className="mt-3 text-text-dim text-sm max-w-xs">
              {profile.name}
              <br />
              Software Engineer &bull; AI Developer
            </p>
          </div>

          <nav aria-label="Footer">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint mb-4">
              Navigate
            </div>
            <ul className="grid grid-cols-2 gap-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-text-dim hover:text-signal-2 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint mb-4">
              Connect
            </div>
            <div className="flex items-center gap-4">
              <a href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub profile" className="text-text-dim hover:text-signal-2 transition-colors">
                <GithubIcon width={18} height={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn profile" className="text-text-dim hover:text-signal-2 transition-colors">
                <LinkedinIcon width={18} height={18} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Send email" className="text-text-dim hover:text-signal-2 transition-colors">
                <Mail size={18} />
              </a>
              <a href={profile.resumeUrl} download aria-label="Download resume" className="text-text-dim hover:text-signal-2 transition-colors">
                <FileDown size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line-soft flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-text-faint">
          <span>&copy; {year} {profile.name}</span>
          <span>Built with React, TypeScript &amp; Three.js</span>
        </div>
      </div>
    </footer>
  );
}
