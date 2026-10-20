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
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  ...rest
}: ButtonProps) {
  const base = "btn inline-flex items-center justify-center gap-2";
  const variants: Record<Variant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
  };

  return (
    <motion.a
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      {icon}
    </motion.a>
  );
}