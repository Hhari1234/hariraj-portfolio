import { useState, Suspense, lazy } from "react";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

const About = lazy(() => import("@/components/sections/About").then((m) => ({ default: m.About })));
const Skills = lazy(() => import("@/components/sections/Skills").then((m) => ({ default: m.Skills })));
const Experience = lazy(() => import("@/components/sections/Experience").then((m) => ({ default: m.Experience })));
const FeaturedProject = lazy(() => import("@/components/sections/FeaturedProject").then((m) => ({ default: m.FeaturedProject })));
const Projects = lazy(() => import("@/components/sections/Projects").then((m) => ({ default: m.Projects })));
const Certifications = lazy(() => import("@/components/sections/Certifications").then((m) => ({ default: m.Certifications })));
const GitHubActivity = lazy(() => import("@/components/sections/GitHubActivity").then((m) => ({ default: m.GitHubActivity })));
const Contact = lazy(() => import("@/components/sections/Contact").then((m) => ({ default: m.Contact })));

function SectionFallback() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="h-6 w-6 rounded-full border-2 border-line border-t-signal-2 animate-spin" aria-hidden="true" />
      <span className="sr-only">Loading section</span>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
<>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Skills />
          <Experience />
          <FeaturedProject />
          <Projects />
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
