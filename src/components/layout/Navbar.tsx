import { useEffect, useState } from "react";
import { FileDown, Menu, X, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { navLinks, profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setShowBackToTop(y > 600);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (y / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
          scrolled ? "glass shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : "bg-transparent"
        }`}
      >
        <nav
          className="container-page flex items-center justify-between h-16 md:h-[72px]"
          aria-label="Primary"
        >
          <a
            href="#home"
            className="font-display font-normal text-lg md:text-xl tracking-tight text-text hover:text-gold transition-colors pl-4"
          >
            HK<span className="text-gold">.</span>
          </a>

          <ul className="hidden lg:flex items-center gap-1 font-mono text-[13px]">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative px-3 py-2 rounded-md transition-colors ${
                      isActive ? "text-gold" : "text-text-muted hover:text-text"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-gold block" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="btn-icon"
            >
              <GithubIcon width={18} height={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="btn-icon"
            >
              <LinkedinIcon width={18} height={18} />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="btn btn-secondary"
            >
              <FileDown size={15} />
              Resume
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden text-text p-2 -mr-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="lg:hidden glass border-t border-line overflow-hidden fixed inset-x-0 top-[72px] bottom-0 z-40 flex items-center justify-center p-8">
            <ul className="flex flex-col gap-0 font-display text-2xl md:text-3xl lg:text-4xl leading-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-4 text-text-muted hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-5 pt-6 mt-4 border-t border-line-soft">
                <a href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub profile" className="text-text-muted hover:text-gold">
                  <GithubIcon width={22} height={22} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn profile" className="text-text-muted hover:text-gold">
                  <LinkedinIcon width={22} height={22} />
                </a>
                <a href={profile.resumeUrl} download className="ml-auto inline-flex items-center gap-2 text-gold font-mono text-sm">
                  <FileDown size={16} />
                  Resume
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-50 btn-icon shadow-lg transition-all ${
          showBackToTop ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}