import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LoadingScreenProps {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      onDone();
      setVisible(false);
      return;
    }
    const stageTimer = setInterval(() => {
      setStage((s) => Math.min(s + 1, 3));
    }, 420);
    const hideTimer = setTimeout(() => setVisible(false), 1500);
    const doneTimer = setTimeout(onDone, 1600);
    return () => {
      clearInterval(stageTimer);
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone, reducedMotion]);

  const stages = ["HK.", "HARIRAJ KURAGAYALA", "INITIALIZING PORTFOLIO...", "READY."];

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0C0F]"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="relative h-24 flex items-center justify-center overflow-hidden">
        <span className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-gradient-gold">
          {stages[stage]}
        </span>
      </div>
      <div className="mt-6 h-[2px] w-44 bg-white/10 overflow-hidden rounded-full">
        <div className="h-full w-full bg-gradient-to-r from-gold via-teal to-gold" />
      </div>
    </div>
  );
}
