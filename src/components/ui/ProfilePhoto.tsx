import { motion } from "framer-motion";

export function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full max-w-[360px] aspect-square mx-auto"
      role="img"
      aria-label="Hariraj Kuragayala - Software Engineer"
    >
      <div className="absolute inset-0 rounded-2xl border border-gold/30 shadow-gold" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 via-transparent to-teal/5" />
      <picture className="relative rounded-2xl overflow-hidden">
        <source
          srcSet="
            /assets/profile/profile-400w.avif 400w,
            /assets/profile/profile-800w.avif 800w,
            /assets/profile/profile-1200w.avif 1200w
          "
          type="image/avif"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
        />
        <source
          srcSet="
            /assets/profile/profile-400w.webp 400w,
            /assets/profile/profile-800w.webp 800w,
            /assets/profile/profile-1200w.webp 1200w
          "
          type="image/webp"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
        />
        <img
          src="/assets/profile/profile-1200w.jpg"
          srcSet="
            /assets/profile/profile-400w.jpg 400w,
            /assets/profile/profile-800w.jpg 800w,
            /assets/profile/profile-1200w.jpg 1200w
          "
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
          alt="Hariraj Kuragayala - Software Engineer"
          width={360}
          height={360}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
      </picture>
      <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-2xl border-2 border-gold bg-surface/80 backdrop-blur-sm flex items-center justify-center" />
      <div className="absolute -top-4 -left-4 w-2 h-2 rounded-full bg-gold animate-pulse-dot" />
    </motion.div>
  );
}