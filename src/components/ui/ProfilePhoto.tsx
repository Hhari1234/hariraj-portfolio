import { motion } from "framer-motion";

/**
 * Circular profile photo with an animated gradient ring, glassmorphism frame,
 * cyan/blue/purple glow and a subtle floating animation.
 *
 * This is a plain, always-rendered component — it does NOT depend on Three.js,
 * so the profile photo always displays even if the 3D layer fails.
 */
export function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-[min(72vw,340px)] h-[min(72vw,340px)] sm:w-[380px] sm:h-[380px] lg:w-[400px] lg:h-[400px] animate-hero-float"
      role="img"
      aria-label="Hariraj Kuragayala - Software Engineer"
    >
      {/* Animated gradient ring */}
      <div className="absolute -inset-3 rounded-full overflow-hidden pointer-events-none animate-gradient-ring">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #22d3ee, #5b7cfa, #a78bfa, #22d3ee)",
          }}
        />
      </div>

      {/* Glow halo */}
      <div className="absolute -inset-6 rounded-full bg-signal/20 blur-2xl pointer-events-none" />
      <div className="absolute -inset-10 rounded-full bg-signal-3/10 blur-3xl pointer-events-none" />

      {/* Glassmorphism frame */}
      <div className="absolute inset-0 rounded-full glass shadow-[0_20px_60px_-15px_rgba(91,124,250,0.5)] ring-1 ring-signal-2/30 overflow-hidden">
        {/* Photo */}
        <img
          src="/assets/profile/profile-photo.webp"
          alt="Hariraj Kuragayala - Software Engineer"
          width={640}
          height={832}
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top"
          onError={(e) => {
            // Fallback to JPG if WebP is not supported/available
            const img = e.currentTarget;
            if (img.src.includes(".webp")) {
              img.src = "/assets/profile/profile-photo.jpg";
            }
          }}
        />
      </div>
    </motion.div>
  );
}
