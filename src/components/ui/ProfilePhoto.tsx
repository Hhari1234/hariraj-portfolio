export function ProfilePhoto() {
  return (
    <div
      className="relative w-full max-w-[360px] aspect-[4/5] mx-auto"
      role="img"
      aria-label="Hariraj Kuragayala - Software Engineer"
    >
      <div className="absolute inset-0 rounded-2xl border border-gold/30" />
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
          height={450}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
      </picture>
    </div>
  );
}