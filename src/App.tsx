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

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
