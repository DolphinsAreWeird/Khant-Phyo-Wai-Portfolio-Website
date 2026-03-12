import { useLang } from '../context/LangContext';

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Khant <span className="word-phyo">Phyo</span> <span className="word-wai">Wai</span></h1>
        <div className="hero-roles">
          <span className="role-badge"><i className="fas fa-chart-line" /> Co-Founder & CFO</span>
          <span className="role-badge"><i className="fas fa-brain" /> AI Engineer</span>
          <span className="role-badge"><i className="fas fa-code" /> Developer</span>
        </div>
        <p className="hero-tagline">{t('hero.tagline')}</p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' }); }}>
            {t('hero.projects')}
          </a>
          <a href="/files/KPResume.pdf" download className="btn btn-accent">
            <i className="fas fa-download" /> Download CV
          </a>
          <a href="#contact" className="btn btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' }); }}>
            {t('hero.contact')}
          </a>
        </div>
      </div>
    </section>
  );
}
