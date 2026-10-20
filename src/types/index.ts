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
  repoUrl?: string | null;
  liveUrl?: string | null;
  status?: string;
  highlights?: string[];
  stack?: string[];
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  year?: string | null;
  url?: string | null;
  credentialUrl?: string | null;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  duration: string;
  detail?: string;
}

export interface Profile {
  name: string;
  initials: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  graduationYear: string;
  primaryTitle: string;
  roles: string[];
  summary: string;
  heroDescription: string;
  resumeUrl: string;
  availability?: string;
}