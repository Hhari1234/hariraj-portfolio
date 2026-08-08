import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { navLinks, profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : "bg-transparent"
      }`}
    >
      <nav
        className="container-page flex items-center justify-between h-16 md:h-[72px]"
        aria-label="Primary"
      >
        <a
          href="#home"
          className="font-display font-semibold text-lg tracking-tight text-text hover:text-signal-2 transition-colors"
        >
          HK<span className="text-signal-2">.</span>
        </a>

        <ul className="hidden lg:flex items-center gap-1 font-mono text-[13px]">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-3 py-2 rounded-md transition-colors ${
                    isActive ? "text-signal-2" : "text-text-dim hover:text-text"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute left-3 right-3 -bottom-0.5 h-px bg-signal-2"
                    />
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
            className="text-text-dim hover:text-signal-2 transition-colors"
          >
            <GithubIcon width={18} height={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="text-text-dim hover:text-signal-2 transition-colors"
          >
            <LinkedinIcon width={18} height={18} />
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 font-mono text-[13px] text-text hover:border-signal-2/60 hover:text-signal-2 transition-colors"
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden glass border-t border-line overflow-hidden"
          >
            <ul className="container-page py-4 flex flex-col gap-1 font-mono text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-text-dim hover:text-signal-2 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-5 pt-3 mt-2 border-t border-line-soft">
                <a href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub profile" className="text-text-dim hover:text-signal-2">
                  <GithubIcon width={18} height={18} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn profile" className="text-text-dim hover:text-signal-2">
                  <LinkedinIcon width={18} height={18} />
                </a>
                <a href={profile.resumeUrl} download className="ml-auto inline-flex items-center gap-2 text-signal-2">
                  <FileDown size={16} />
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
