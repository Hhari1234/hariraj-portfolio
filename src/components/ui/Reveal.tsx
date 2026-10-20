import type { ReactNode } from "react";

interface RevealProps {
  children?: ReactNode;
  className?: string;
}

export function Reveal({ children, className = "" }: RevealProps) {
  return <div className={['w-full min-w-0', className].filter(Boolean).join(' ')}>{children}</div>;
}
