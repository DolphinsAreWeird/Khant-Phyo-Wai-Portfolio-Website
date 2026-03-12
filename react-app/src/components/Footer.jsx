import { useLang } from '../context/LangContext';

export default function Footer() {
  const { t } = useLang();
  const scroll = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Khant Phyo Wai</h3>
            <p>Co-Founder &amp; CFO · AI Engineer</p>
          </div>
          <div className="footer-links">
            {[['hero','nav.home'],['about','nav.about'],['expertise','nav.expertise'],['projects','nav.projects'],['web-projects','nav.webprojects'],['certificates','nav.certificates'],['contact','nav.contact']].map(([id,key]) => (
              <a key={id} href={`#${id}`} onClick={scroll(id)}>{t(key)}</a>
            ))}
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
        <div className="footer-bottom">
          <p>&copy; 2026 Khant Phyo Wai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
