import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}
    >
      <div
        className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="font-mono text-xs text-signal-2 tracking-wider">
          {index}
        </span>
        <span className="h-px w-8 bg-line" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-text-dim text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
