import { useEffect, useState } from "react";
import { FileDown, Menu, X, ArrowUp } from "lucide-react";
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
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
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
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
          scrolled ? "glass border-b border-line" : "bg-transparent"
        }`}
      >
        <nav className="container-page" aria-label="Primary">
          <div className="nav-grid h-16 md:h-[72px]">
            <a
              href="#home"
              className="nav-logo font-display font-normal text-lg md:text-xl leading-none tracking-tight text-text hover:text-gold transition-colors"
            >
              HK<span className="text-gold">.</span>
            </a>

            <ul className="nav-links hidden lg:flex font-mono text-[13px]">
              {navLinks.map((link) => {
                const isActive = active === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`relative px-3 py-2 rounded-md transition-colors ${
                        isActive ? "text-gold" : "text-muted hover:text-text"
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

            <div className="nav-actions hidden lg:flex">
              <a
                href={profile.resumeUrl}
                download
                className="btn btn-secondary !px-4 !min-h-[40px] !py-2"
              >
                <FileDown size={15} />
                Resume
              </a>
            </div>

            <button
              type="button"
              className="lg:hidden col-start-3 justify-self-end text-text p-2 -mr-2 leading-none"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 md:top-[72px] z-40 bg-bg flex items-center justify-center p-8">
            <ul className="flex flex-col font-display text-3xl leading-tight">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-4 text-muted hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-6 mt-4 border-t border-line">
                <a
                  href={profile.resumeUrl}
                  download
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 text-gold font-mono text-sm"
                >
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
        className={`btn-icon back-to-top shadow-lg transition-opacity ${
          showBackToTop ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
