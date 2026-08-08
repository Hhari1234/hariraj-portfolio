export interface NavLink {
  label: string;
  href: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: string[];
}

export interface ExperienceBullet {
  text: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  duration: string;
  bullets: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  tech: string[];
  bullets?: string[];
  github?: string;
  liveDemo?: string | null;
  featured?: boolean;
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  year?: string;
  url?: string | null;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  duration: string;
  detail?: string;
}
