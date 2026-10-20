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
  location: "Telangana, India",
  email: "hariraj.kuragayala@gmail.com",
  phone: "9603296028",
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
    "Integrated M.Tech graduate in Software Engineering from VIT Vellore with software engineering internship experience at Nokia. Experienced in developing and validating backend applications, troubleshooting software issues, investigating test failures, and improving code quality. Contributed to automated testing and build workflows, and developed full-stack applications and developer tools. Strong problem-solving foundation with a focus on writing reliable, maintainable code and following software development best practices.",
  heroDescription:
    "Integrated M.Tech graduate in Software Engineering from VIT Vellore. Experienced in backend development, testing, and DevOps at Nokia. Building full-stack applications and AI-powered developer tools.",
  resumeUrl: "/resume.pdf",
  availability: "Open to Software Engineer roles (Backend / AI)",
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

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming Languages",
    icon: "code",
    skills: ["Java", "Python", "SQL"],
  },
  {
    id: "cs-fundamentals",
    label: "Computer Science Fundamentals",
    icon: "graduation-cap",
    skills: ["Data Structures and Algorithms", "Object-Oriented Programming"],
  },
  {
    id: "backend",
    label: "Backend Development",
    icon: "server",
    skills: ["Spring Boot", "FastAPI", "Node.js", "Express.js", "REST APIs", "JSON"],
  },
  {
    id: "frontend",
    label: "Frontend Development",
    icon: "layout",
    skills: ["React.js", "TypeScript", "HTML", "CSS"],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "ChromaDB"],
  },
  {
    id: "devops",
    label: "DevOps and Tools",
    icon: "shield-check",
    skills: ["Git", "Docker", "Jenkins", "Linux", "Gradle", "Shell Scripting"],
  },
  {
    id: "testing",
    label: "Testing and Code Quality",
    icon: "terminal",
    skills: ["Unit Testing", "Module Testing", "Debugging", "Root-Cause Analysis", "SonarQube", "JaCoCo"],
  },
  {
    id: "ai-llm",
    label: "AI / LLM",
    icon: "cpu",
    skills: ["LLMs", "RAG", "Vector Search", "Sentence-Transformer Embeddings", "Gemini API", "GitHub Actions"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "Nokia",
    role: "Software Engineering Intern",
    location: "Bangalore",
    duration: "Aug 2025 – Jun 2026",
    bullets: [
      "Resolved SonarQube code-quality findings in Java-based backend applications and validated fixes through automated builds and testing workflows.",
      "Executed Unit and Module Tests (UTMT), analyzed execution logs, investigated failing test cases, and performed root-cause analysis to troubleshoot application and environment issues.",
      "Integrated JaCoCo code coverage into Docker-based build and CI/CD workflows to automate coverage report generation and validation.",
      "Updated and validated Component and Applicability attributes in Reset Alarm definitions to support accurate alarm configuration and handling.",
      "Implemented and validated ECR rules for Reset Alarm definitions to match alarm parameters and target the intended alarm instance.",
      "Used Java, Gradle, Docker, Linux, and Shell Scripting to execute tests, investigate build failures, and troubleshoot runtime and environment issues.",
      "Automated development and testing setup tasks using Shell scripts, including environment configuration, test execution, and diagnostic workflows.",
    ],
  },
];

export const featuredProjects: ProjectEntry[] = [
  {
    id: "codeforge-ai",
    name: "CodeForge AI",
    description:
      "A full-stack AI developer platform with six modules for code generation, documentation, code review, repository analysis, RAG-based chat, and project management.",
    tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "ChromaDB", "JWT", "Docker"],
    bullets: [
      "Developed a full-stack developer platform using React, TypeScript, and FastAPI with six modules for code generation, documentation, code review, repository analysis, RAG-based chat, and project management.",
      "Built a Retrieval-Augmented Generation (RAG) pipeline using code chunking, sentence-transformer embeddings, ChromaDB vector search, and LLMs, secured with JWT authentication, bcrypt password hashing, and per-user workspace isolation using PostgreSQL.",
    ],
    repoUrl: null,
    liveUrl: null,
    featured: true,
    status: "Source only",
    highlights: [
      "6 AI-powered modules",
      "RAG pipeline with sentence-transformer embeddings",
      "ChromaDB vector search",
      "JWT auth + bcrypt hashing",
      "Per-user workspace isolation",
      "Docker containerized",
    ],
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "ChromaDB", "JWT", "Docker"],
  },
  {
    id: "ai-code-reviewer",
    name: "AI Code Reviewer",
    description:
      "An automated GitHub pull-request review tool using Python, GitHub Actions, and REST APIs to analyze code changes and publish structured review findings with severity-based and security-focused checks.",
    tech: ["Python", "Gemini API", "GitHub Actions", "GitHub REST API", "Docker"],
    bullets: [
      "Developed an automated GitHub pull-request review tool using Python, GitHub Actions, and REST APIs to analyze code changes and publish structured review findings with severity-based and security-focused checks.",
      "Implemented severity-based and security-focused code analysis, LLM response parsing, GitHub REST API integration, and retry/backoff handling, automated end-to-end using GitHub Actions.",
    ],
    repoUrl: null,
    liveUrl: null,
    featured: true,
    status: "Source only",
    highlights: [
      "Automated PR review via GitHub Actions",
      "Gemini API for code analysis",
      "Severity-based & security-focused checks",
      "LLM response parsing",
      "Retry/backoff handling",
      "Docker containerized",
    ],
    stack: ["Python", "Gemini API", "GitHub Actions", "GitHub REST API", "Docker"],
  },
];

export const projects: ProjectEntry[] = [
  {
    id: "house-hunt",
    name: "House Hunt",
    description:
      "A full-stack rental property application using the MERN stack, with REST APIs for property listings, searching, and filtering.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    bullets: [
      "Developed a full-stack rental property application using the MERN stack, with REST APIs for property listings, searching, and filtering.",
      "Built a React.js frontend connected to an Express.js and MongoDB backend, and deployed the application on Render.",
    ],
    repoUrl: null,
    liveUrl: null,
    featured: false,
    status: "Deployed on Render",
    highlights: [
      "MERN stack (MongoDB, Express.js, React.js, Node.js)",
      "REST APIs for listings, search, filter",
      "Deployed on Render",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    id: "weather-forecasting",
    name: "Weather Forecasting Application",
    description:
      "A Java Spring Boot backend that integrates the OpenWeather API and provides real-time weather forecast data through REST endpoints.",
    tech: ["Java", "Spring Boot", "REST APIs", "JSON"],
    bullets: [
      "Developed a Java Spring Boot backend that integrates the OpenWeather API and provides real-time weather forecast data through REST endpoints.",
      "Parsed JSON responses from the external API into structured results and deployed the application on Render.",
    ],
    repoUrl: null,
    liveUrl: null,
    featured: false,
    status: "Deployed on Render",
    highlights: [
      "Spring Boot backend",
      "OpenWeather API integration",
      "JSON parsing to structured results",
      "Deployed on Render",
    ],
    stack: ["Java", "Spring Boot", "REST APIs", "JSON"],
  },
  {
    id: "wastescan",
    name: "WasteScan",
    description:
      "A computer-vision-based waste sorting system using Python and OpenCV for image processing, integrated with Arduino-controlled sorting hardware.",
    tech: ["Python", "OpenCV", "Arduino"],
    bullets: [
      "Built a computer-vision-based waste sorting system using Python and OpenCV for image processing, integrated with Arduino-controlled sorting hardware.",
      "Processed camera input to identify waste items and triggered the Arduino hardware to sort them automatically.",
    ],
    repoUrl: null,
    liveUrl: null,
    featured: false,
    status: "Hardware project",
    highlights: [
      "Python + OpenCV for computer vision",
      "Arduino-controlled sorting hardware",
      "Real-time camera input processing",
      "Automated waste classification & sorting",
    ],
    stack: ["Python", "OpenCV", "Arduino"],
  },
];

export const certifications: CertificationEntry[] = [
  {
    name: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle University",
    year: null,
    url: null,
    credentialUrl: null,
  },
  {
    name: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    year: null,
    url: null,
    credentialUrl: null,
  },
  {
    name: "Full Stack Developer (MERN Stack)",
    issuer: "SmartBridge / MongoDB Smart Internz",
    year: null,
    url: null,
    credentialUrl: null,
  },
  {
    name: "Data Science",
    issuer: "VIT SCORE Department",
    year: null,
    url: null,
    credentialUrl: null,
  },
];

export const featuredProject = featuredProjects[0];
export const featuredProjectFeatures = [
  "Code generation",
  "Documentation",
  "Code review",
  "Repository analysis",
  "RAG chat",
  "Project management",
];
export const architectureStages = [
  "Prompt + repo context",
  "Code chunking + embeddings",
  "Vector search + retrieval",
  "LLM reasoning",
  "Project workspace output",
];

export const siteUrl = "https://hariraj-portfolio.vercel.app";
