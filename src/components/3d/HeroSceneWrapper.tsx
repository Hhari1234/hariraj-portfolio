import { Suspense, lazy, useState } from "react";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroScene = lazy(() =>
  import("./HeroScene").then((mod) => ({ default: mod.HeroScene }))
);

/**
 * Decorative 3D background layer for the hero.
 * It is intentionally non-blocking: if the WebGL scene fails to load,
 * it simply renders nothing and the profile photo (which is a separate,
 * always-present layer) remains fully visible.
 */
export function HeroSceneWrapper() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <ErrorBoundary
        fallback={null}
        onError={() => setFailed(true)}
      >
        {!failed && (
          <Suspense fallback={null}>
            <HeroScene disableEffects={isMobile || reducedMotion} />
          </Suspense>
        )}
      </ErrorBoundary>
    </div>
  );
}
