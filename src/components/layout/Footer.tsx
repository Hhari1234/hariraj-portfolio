import { useEffect, useState } from "react";
import { ArrowLeftIcon, GithubIcon, LinkedinIcon, MailIcon, FileDownIcon } from "@/components/ui/BrandIcons";
import { profile, navLinks } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsBackToTopVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border py-12 md:py-16">
      <div className="container relative">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <a href="#home" className="font-display font-semibold text-xl text-text inline-block mb-4">
              HK<span className="text-gold">.</span>
            </a>
            <p className="text-text-muted text-sm max-w-xs leading-relaxed">
              {profile.name}
              <br />
              Software Engineer &bull; AI Developer
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <div className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">Navigate</div>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-text-muted hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">Connect</div>
            <div className="flex items-center gap-3">
              <a href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub profile" className="link-icon p-2 rounded-lg bg-surface-elevated border border-border hover:border-gold/50 transition-all">
                <GithubIcon width={20} height={20} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn profile" className="link-icon p-2 rounded-lg bg-surface-elevated border border-border hover:border-gold/50 transition-all">
                <LinkedinIcon width={20} height={20} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Send email" className="link-icon p-2 rounded-lg bg-surface-elevated border border-border hover:border-gold/50 transition-all">
                <MailIcon width={20} height={20} />
              </a>
              <a href={profile.resumeUrl} download aria-label="Download resume" className="link-icon p-2 rounded-lg bg-surface-elevated border border-border hover:border-gold/50 transition-all">
                <FileDownIcon width={20} height={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <span>&copy; {year} {profile.name}. All rights reserved.</span>
          <span>Built with React, TypeScript, and Tailwind CSS</span>
        </div>

        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-surface border border-border link-icon shadow-lg transition-all ${isBackToTopVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          aria-label="Back to top"
        >
          <ArrowLeftIcon width={20} height={20} />
        </button>
      </div>
    </footer>
  );
}