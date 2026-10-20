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
    <div
      className={`section-header ${isCenter ? "section-header--center" : ""} mb-12 md:mb-16 w-full min-w-0 ${isCenter ? "mx-auto max-w-3xl" : ""}`}
    >
      <div className="section-label" style={style}>
        <span>{eyebrow}</span>
      </div>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}