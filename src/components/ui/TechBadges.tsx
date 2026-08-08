import { useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Badge {
  label: string;
  className: string;
  accent: string;
  depth: number;
}

// Positioned around the hero photo with different depths (scale/blur/opacity).
const BADGES: Badge[] = [
  { label: "Java", className: "top-0 -left-2 sm:top-3 sm:-left-7", accent: "text-amber-300", depth: 0.85 },
  { label: "Python", className: "top-5 -right-1 sm:top-9 sm:-right-9", accent: "text-cyan-300", depth: 1 },
  { label: "React", className: "top-1/2 -left-4 sm:-left-11", accent: "text-blue-300", depth: 1.1 },
  { label: "TypeScript", className: "top-1/2 -right-4 sm:-right-11", accent: "text-blue-300", depth: 0.9 },
  { label: "FastAPI", className: "bottom-20 -left-3 sm:bottom-24 sm:-left-9", accent: "text-emerald-300", depth: 0.8 },
  { label: "Docker", className: "bottom-5 -right-2 sm:bottom-8 sm:-right-7", accent: "text-violet-300", depth: 1.05 },
  { label: "AI", className: "bottom-0 left-1/2 -translate-x-1/2", accent: "text-violet-300", depth: 1.2 },
];

export function TechBadges() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  if (isMobile) {
    return (
      <div className="relative mt-8 flex flex-wrap justify-center gap-2">
        {BADGES.map((b) => (
          <span
            key={b.label}
            className="glass rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-signal-2"
          >
            {b.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <>
      {BADGES.map((b) => {
        const isActive = hovered === b.label;
        return (
          <motion.span
            key={b.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            onMouseEnter={() => setHovered(b.label)}
            onMouseLeave={() => setHovered(null)}
            className={`absolute ${b.className} z-10 select-none cursor-default`}
            style={{
              zIndex: isActive ? 20 : undefined,
            }}
          >
            <motion.span
              animate={{
                scale: isActive ? 1.18 : b.depth,
                opacity: hovered && !isActive ? 0.4 : 1,
                y: [0, -6, 0],
                filter: reduced ? "blur(0px)" : `blur(${(1 - b.depth) * 3}px)`,
              }}
              transition={{
                scale: { type: "spring", stiffness: 260, damping: 18 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className={`glass rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest ${b.accent} shadow-[0_8px_24px_-8px_rgba(34,211,238,0.4)] ${
                isActive ? "border-signal-2/70 shadow-[0_0_28px_rgba(34,211,238,0.55)]" : "border-line"
              }`}
            >
              {b.label}
            </motion.span>
          </motion.span>
        );
      })}
    </>
  );
}
