import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const style = { ["--index" as string]: index } as CSSProperties;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`section-header ${isCenter ? "section-header--center" : ""} mb-12 md:mb-16 ${isCenter ? "mx-auto max-w-3xl" : ""}`}
    >
      <div className="section-label" style={style}>
        <span>{eyebrow}</span>
      </div>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </motion.div>
  );
}