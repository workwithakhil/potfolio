import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Certifications from './components/Certifications';
import Education from './components/Education';
import GithubSection from './components/GithubSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import { VelocityBand } from './components/Kinetic';
import { marquee } from './data/portfolio';

export default function App() {
  const [openProject, setOpenProject] = useState(null);
  const close = useCallback(() => setOpenProject(null), []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="app">
        <Navbar />
        <main id="main">
          <Hero />
          <VelocityBand items={marquee} />
          <About />
          <Skills />
          <Projects onOpen={setOpenProject} />
          <Certifications />
          <Education />
          <GithubSection />
          <VelocityBand
            items={['Open to opportunities', 'Software engineering', 'Cloud', 'AI/ML', 'Say hello']}
            reverse
            speed={42}
            className="outline"
          />
          <Contact />
        </main>
        <Footer />
      </div>
      <ProjectModal project={openProject} onClose={close} />
      <div className="grain" aria-hidden="true" />
      <Cursor />
    </MotionConfig>
  );
}
