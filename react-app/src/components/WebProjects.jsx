import { webProjects } from '../data/webProjects';

export default function WebProjects() {
  return (
    <section id="web-projects">
      <div className="container">
        <h2 className="section-title">Web Development Projects</h2>
        <p className="section-subtitle">Some of the websites I&apos;ve developed and deployed</p>
        <div className="web-projects-grid">
          {webProjects.map(p => (
            <div key={p.id} className="web-project-card">
              <div className="web-project-img">
                <img src={p.image} alt={p.title} />
                <div className="web-project-overlay">
                  <a href={p.link} target="_blank" rel="noreferrer" className="visit-btn">Visit Website</a>
                </div>
              </div>
              <div className="web-project-info">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="web-project-tech">
                  {p.tech.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
