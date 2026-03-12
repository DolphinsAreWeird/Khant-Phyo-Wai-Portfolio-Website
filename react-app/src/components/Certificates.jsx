import { useLang } from '../context/LangContext';
import { certificates } from '../data/certificates';

export default function Certificates() {
  const { t } = useLang();
  return (
    <section id="certificates">
      <div className="container">
        <h2 className="section-title">{t('certificates.title')}</h2>
        <div className="certificates-grid">
          {certificates.map(c => (
            <div key={c.id} className="certificate-card">
              <div className="certificate-icon"><i className={`fas ${c.icon}`} /></div>
              <div className="certificate-content">
                <h3>{c.title}</h3>
                <h4>{c.issuer}</h4>
                <p>{c.description}</p>
                <span className="certificate-date">{c.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
