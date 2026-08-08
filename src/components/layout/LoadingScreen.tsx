import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LoadingScreenProps {
  onDone: () => void;
}

/**
 * Short cinematic loader: HK → HARIRAJ KURAGAYALA → INITIALIZING → READY.
 * Max ~1.5s; simplified when prefers-reduced-motion is enabled.
 */
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="relative h-24 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={stages[stage]}
                initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-gradient"
              >
                {stages[stage]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="mt-6 h-[2px] w-44 bg-line-soft overflow-hidden rounded-full">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-r from-signal via-signal-2 to-signal-3"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
