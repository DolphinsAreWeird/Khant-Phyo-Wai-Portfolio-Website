import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LangContext';

const techStack = [
  { icon: 'fab fa-python', label: 'Python' },
  { icon: 'fas fa-brain', label: 'TensorFlow' },
  { icon: 'fas fa-fire', label: 'PyTorch' },
  { icon: 'fab fa-java', label: 'Java' },
  { icon: 'fab fa-js', label: 'JavaScript' },
  { icon: 'fab fa-html5', label: 'HTML5' },
  { icon: 'fab fa-css3-alt', label: 'CSS3' },
  { icon: 'fab fa-react', label: 'React' },
  { icon: 'fas fa-database', label: 'SQL' },
  { icon: 'fab fa-git-alt', label: 'Git' },
  { icon: 'fas fa-server', label: 'MongoDB' },
  { icon: 'fas fa-eye', label: 'YOLOv8' },
];

const stats = [
  { count: 3, label: 'Fully-Funded Scholarships' },
  { count: 12, label: 'Total Projects' },
  { count: 3.8, label: 'GPA / 4.0' },
];

function StatItem({ count, label }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = performance.now();
    const isDecimal = count % 1 !== 0;
    const raf = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * count;
      setVal(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [started, count]);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">{val}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="about-content">
          <div className="about-text">
            <p>I&apos;m the Co-Founder &amp; CFO at <strong>Sonar AI</strong> — a startup using AI and computer vision to transform physical books into professional-quality audiobooks at a fraction of traditional production costs. We built our own OCR pipeline, text-to-speech synthesis, and book-scanning system from the ground up, and have won multiple recognitions for it. As CFO, I own financial modeling, pricing strategy, and business development.</p>
            <p>I&apos;m also an AI Engineer Apprentice at CMKL University, pursuing a Bachelor&apos;s in AI and Computer Engineering. Previously, I was a NOC Data Analyst intern at Agoda, working on QoQ data pipelines at scale. My background spans both startup and enterprise environments, and I split my time between shipping product at Sonar AI and pushing research forward at CMKL.</p>
            <p>Outside of tech, I work as an Education Consultant helping local students. I find myself most alive at the place where AI, business, and data converge — whether that&apos;s building financial models, designing ML pipelines, or thinking through product strategy.</p>
            <div className="tech-stack-grid">
              {techStack.map(({ icon, label }) => (
                <div key={label} className="tech-logo" title={label}>
                  <i className={icon} /><span>{label}</span>
                </div>
              ))}
            </div>
            <div className="stats-grid">
              {stats.map(s => <StatItem key={s.label} {...s} />)}
            </div>
          </div>
          <div className="about-image">
            <div className="image-container">
              <img src="/images/profile.jpg" alt="Khant Phyo Wai" />
            </div>
            <div className="social-links">
              {[
                ['fab fa-github','https://github.com/DolphinsAreWeird'],
                ['fab fa-linkedin-in','https://www.linkedin.com/in/khant-phyo-wai/'],
                ['fab fa-facebook-f','https://www.facebook.com/profile.php?id=100025576650913'],
                ['fab fa-instagram','https://www.instagram.com/khant_p_wai/'],
              ].map(([icon, href]) => (
                <a key={href} href={href} target="_blank" rel="noreferrer"><i className={icon} /></a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
