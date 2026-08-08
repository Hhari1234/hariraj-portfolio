import type {
  NavLink,
  SkillCategory,
  ExperienceEntry,
  ProjectEntry,
  CertificationEntry,
  EducationEntry,
} from "@/types";

export const profile = {
  name: "Hariraj Kuragayala",
  initials: "HK",
  location: "Nizamabad, Telangana, India",
  email: "hariraj.kuragayala@gmail.com",
  phone: "+91 9603296028",
  linkedin: "https://www.linkedin.com/in/hariraj-k-63735b261/",
  github: "https://github.com/Hhari1234",
  graduationYear: "2026",
  primaryTitle: "Software Engineer",
  roles: [
    "Software Engineer",
    "AI Developer",
    "Backend Developer",
    "Full Stack Developer",
  ],
  summary:
    "Aspiring Software Engineer with an Integrated M.Tech in Software Engineering and internship experience at Nokia in Java backend development, software testing, and DevOps. Focused on building intelligent software, scalable backend systems, and modern full-stack applications.",
  heroDescription:
    "Build intelligent software, scalable backend systems, and modern full-stack applications.",
  resumeUrl: "/resume.pdf",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const education: EducationEntry[] = [
  {
    degree: "Integrated M.Tech (B.Tech + M.Tech), Software Engineering",
    institution: "Vellore Institute of Technology, Vellore",
    duration: "2021 – 2026",
    detail: "CGPA: 7.88",
  },
  {
    degree: "Higher Secondary Education",
    institution: "Narayana Junior College, Madhapur, Hyderabad",
    duration: "2019 – 2021",
    detail: "Percentage: 92.8%",
  },
  {
    degree: "Secondary Education",
    institution: "Dr. KKR's Gowtham Concept School, Hyderabad",
    duration: "2018 – 2019",
    detail: "GPA: 9.0",
  },
];

export const aboutFocusAreas = [
  {
    id: "backend",
    title: "Backend Engineering",
    description:
      "Java and Spring Boot services, REST APIs, and FastAPI backends built for reliability and clarity.",
    icon: "server",
  },
  {
    id: "ai",
    title: "AI & RAG",
    description:
      "Retrieval-Augmented Generation pipelines, LLM integration, prompt engineering, and vector search with ChromaDB.",
    icon: "cpu",
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    description:
      "End-to-end applications with React, TypeScript, Node.js, and Express across the full request lifecycle.",
    icon: "layers",
  },
  {
    id: "devops",
    title: "DevOps & Testing",
    description:
      "Docker-based pipelines, JUnit/JaCoCo coverage, SonarQube quality gates, and Linux/Gradle build workflows.",
    icon: "terminal",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    icon: "code",
    skills: ["Java", "Python", "C++", "C", "SQL"],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "layout",
    skills: ["React", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "server",
    skills: ["Spring Boot", "FastAPI", "Node.js", "Express.js", "REST APIs"],
  },
  {
    id: "ai-ml",
    label: "AI & ML",
    icon: "cpu",
    skills: ["LLMs", "RAG", "Prompt Engineering", "Vector Search", "ChromaDB"],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    skills: ["Aerospike", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "shield-check",
    skills: ["Docker", "Git", "Linux", "Gradle", "Maven", "Shell Scripting"],
  },
  {
    id: "testing",
    label: "Testing",
    icon: "terminal",
    skills: ["JUnit", "JaCoCo", "SonarQube", "Postman", "JIRA"],
  },
];

export const coreConcepts: string[] = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "DBMS",
  "Operating Systems",
  "Computer Networks",
  "Concurrency",
  "Debugging",
];

export const experience: ExperienceEntry[] = [
  {
    company: "Nokia",
    role: "Software Engineering Intern",
    location: "Bangalore",
    duration: "Aug 2025 – Jun 2026",
    bullets: [
      "Resolved SonarQube-reported code quality issues by fixing bugs, eliminating code smells, and improving maintainability across Java-based application modules.",
      "Executed UTMT (Unit and Module Tests), analyzed execution logs, investigated test failures, and resolved configuration and application-level defects to improve test stability.",
      "Designed and integrated JaCoCo code coverage support into a Docker-based build pipeline, enabling automated coverage report generation as part of the testing workflow.",
      "Improved code coverage reporting accuracy by analyzing zero-coverage packages, configuring exclusions, and validating coverage metrics for meaningful quality assessment.",
      "Enhanced system observability and reliability through logging improvements, root cause analysis, and investigation of race-condition-related issues in concurrent application workflows.",
      "Contributed to security compliance initiatives, including BPT, Anchor Tag, CIS-CAT, and EOL remediation activities by upgrading dependencies, fixing file permissions, and addressing security findings.",
      "Worked extensively with Docker containers, Linux environments, Gradle builds, and Shell scripting to support application development, testing, and deployment activities.",
      "Collaborated with senior engineers to debug software defects, analyze application behavior, and implement fixes that improved overall software quality and system stability.",
    ],
  },
];

export const featuredProject: ProjectEntry = {
  id: "codeforge-ai",
  name: "CodeForge AI",
  description:
    "A full-stack AI developer platform featuring AI-powered code generation, documentation, code review, repository analysis, RAG chat, and project management.",
  tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "ChromaDB", "JWT", "Docker"],
  bullets: [
    "Architected a full-stack AI developer platform with 6 AI-powered modules (code generation, documentation, code review, repository analysis, RAG chat, and project management) using React, TypeScript, FastAPI, and a layered service-oriented backend.",
    "Built a Retrieval-Augmented Generation (RAG) pipeline using custom chunking, sentence-transformer embeddings, ChromaDB vector search, and LLM integration for natural-language codebase Q&A.",
    "Engineered secure authentication and repository ingestion with JWT, bcrypt password hashing, ZIP/GitHub import, zip-bomb protection, per-user workspace isolation, and PostgreSQL-backed persistence.",
    "Containerized the complete application with Docker, enabling reproducible local development, multi-service deployment, and scalable backend/frontend/database orchestration.",
  ],
  github: "https://github.com/Hhari1234",
  liveDemo: null,
  featured: true,
};

export const featuredProjectFeatures: string[] = [
  "AI Code Generation",
  "AI Documentation",
  "Code Review",
  "Repository Analysis",
  "RAG Chat",
  "Project Management",
  "GitHub Import",
  "ZIP Upload",
  "JWT Authentication",
  "Workspace Isolation",
];

export const architectureStages: string[] = [
  "Frontend",
  "FastAPI Backend",
  "AI Services",
  "RAG Pipeline",
  "ChromaDB",
  "PostgreSQL",
];

export const projects: ProjectEntry[] = [
  {
    id: "house-hunt",
    name: "House Hunt",
    description:
      "A full-stack rental property platform with search and filter functionality built using the MERN stack.",
    tech: ["React.js", "Node.js", "MongoDB", "REST APIs"],
    github: "https://github.com/Hhari1234",
    liveDemo: null,
  },
  {
    id: "weather-forecasting",
    name: "Weather Forecasting Application",
    description:
      "A Spring Boot backend integrating the OpenWeather API to serve real-time forecast data through REST endpoints.",
    tech: ["Java", "Spring Boot", "REST APIs", "JSON"],
    github: "https://github.com/Hhari1234",
    liveDemo: null,
  },
  {
    id: "wastescan",
    name: "WasteScan",
    description:
      "A real-time computer-vision waste classification system integrating OpenCV with Arduino-based sorting hardware.",
    tech: ["Python", "OpenCV", "Arduino"],
    github: "https://github.com/Hhari1234",
    liveDemo: null,
  },
];

export const certifications: CertificationEntry[] = [
  {
    name: "Azure AI Fundamentals",
    issuer: "Microsoft",
    url: null,
  },
  {
    name: "MERN Stack Developer",
    issuer: "SmartBridge / MongoDB Smart Internz",
    url: null,
  },
  {
    name: "Data Science",
    issuer: "VIT SCORE Department",
    url: null,
  },
];

export const techBadges: string[] = [
  "Java",
  "Python",
  "React",
  "TypeScript",
  "FastAPI",
  "Spring Boot",
  "Docker",
  "AI / RAG",
];
