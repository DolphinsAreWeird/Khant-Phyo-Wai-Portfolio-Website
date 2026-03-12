import { useLang } from '../context/LangContext';
import { experiences } from '../data/experience';

export default function Experience() {
  const { t } = useLang();
  return (
    <section id="experience">
      <div className="container">
        <h2 className="section-title">{t('experience.title')}</h2>
        <div className="experience-journey">
          <div className="journey-line" />
          {experiences.map(exp => (
            <div key={exp.id} className="experience-item">
              <div className="experience-date"><span>{exp.date}</span></div>
              <div className="experience-content">
                <div className="experience-icon"><i className={`fas ${exp.icon}`} /></div>
                <div className="experience-details">
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  <ul>{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                  <div className="key-skills">
                    {exp.skills.map(s => <span key={s}>{s}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
