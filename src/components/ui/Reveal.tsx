import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children?: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 20, className = "" }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}