import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import WebProjects from './components/WebProjects';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button className={`scroll-top-btn${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
      aria-label="Back to top">
      <i className="fas fa-arrow-up" />
    </button>
  );
}

export default function App() {
  return (
    <>
      {/* Background decoration */}
      <div className="bg-elements">
        <div className="bg-circle circle-1" />
        <div className="bg-circle circle-2" />
        <div className="bg-circle circle-3" />
      </div>

      <Nav />
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <WebProjects />
      <Certificates />
      <Experience />
      <Contact />
      <Footer />
      <ScrollTopBtn />
    </>
  );
}
