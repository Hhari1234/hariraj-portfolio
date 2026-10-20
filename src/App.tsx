import { Suspense, lazy } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/layout/Footer";

const About = lazy(() => import("@/components/sections/About").then((m) => ({ default: m.About })));
const Skills = lazy(() => import("@/components/sections/Skills").then((m) => ({ default: m.Skills })));
const Experience = lazy(() => import("@/components/sections/Experience").then((m) => ({ default: m.Experience })));
const Projects = lazy(() => import("@/components/sections/Projects").then((m) => ({ default: m.Projects })));
const Certifications = lazy(() => import("@/components/sections/Certifications").then((m) => ({ default: m.Certifications })));
const GitHubActivity = lazy(() => import("@/components/sections/GitHubActivity").then((m) => ({ default: m.GitHubActivity })));
const Contact = lazy(() => import("@/components/sections/Contact").then((m) => ({ default: m.Contact })));

function SectionFallback() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="h-6 w-6 rounded-full border-2 border-border border-t-gold animate-spin" aria-hidden="true" />
      <span className="sr-only">Loading section</span>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <GitHubActivity />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;