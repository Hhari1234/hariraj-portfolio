import { type ReactNode, type AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
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
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {icon}
    </a>
  );
}