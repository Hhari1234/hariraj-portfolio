import { type ReactNode, type AnchorHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

type SafeAnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof HTMLMotionProps<"a">
>;

interface ButtonProps extends SafeAnchorProps, Omit<HTMLMotionProps<"a">, "children"> {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium font-mono transition-all duration-200 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-void hover:bg-signal-2 shadow-[0_0_0_1px_rgba(91,124,250,0.4)] hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]",
  secondary:
    "border border-line text-text hover:border-signal-2/60 hover:text-signal-2 bg-surface/60",
  ghost: "text-text-dim hover:text-text",
};

export function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      {icon}
    </motion.a>
  );
}
