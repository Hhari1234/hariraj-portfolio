import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { Contact } from "@/components/sections/Contact";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

function ErrorFallback() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <h1 className="font-display text-3xl font-normal text-text mb-4">
          Something went wrong.
        </h1>
        <p className="text-muted text-base leading-[1.75] mb-6">
          This section could not be rendered. The rest of the site is unaffected - try
          reloading, or reach out directly if the problem persists.
        </p>
        <a href="mailto:hariraj.kuragayala@gmail.com" className="btn btn-secondary">
          Email me
        </a>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ErrorBoundary fallback={<ErrorFallback />}>
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <GitHubActivity />
          <Contact />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

export default App;
