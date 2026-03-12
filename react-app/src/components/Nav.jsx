import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';
import { useScrollSpy } from '../hooks/useScrollSpy';

const NAV_IDS = ['hero','about','expertise','projects','web-projects','certificates','experience','contact'];

export default function Nav() {
  const { isDark, toggle } = useTheme();
  const { lang, t, changeLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const active = useScrollSpy(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: 'hero', key: 'nav.home' },
    { id: 'about', key: 'nav.about' },
    { id: 'expertise', key: 'nav.expertise' },
    { id: 'projects', key: 'nav.projects' },
    { id: 'web-projects', key: 'nav.webprojects' },
    { id: 'certificates', key: 'nav.certificates' },
    { id: 'experience', key: 'nav.experience' },
    { id: 'contact', key: 'nav.contact' },
  ];

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo"><span>KP</span></div>

        <button className="menu-toggle" onClick={() => setMenuOpen(p => !p)} aria-label="Menu">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </button>

        <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
          {navLinks.map(({ id, key }) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(id); }}>
                {t(key)}
              </a>
            </li>
          ))}

          <li className="lang-dropdown" style={{ position: 'relative' }}>
            <button className="lang-btn" onClick={() => setLangOpen(p => !p)}>
              {lang.toUpperCase()} <i className="fas fa-chevron-down" style={{ fontSize: '0.65rem' }} />
            </button>
            {langOpen && (
              <div className="lang-options" onClick={() => setLangOpen(false)}>
                {['en','my','th'].map(l => (
                  <a key={l} href="#" onClick={e => { e.preventDefault(); changeLang(l); }}>
                    {l === 'en' ? 'English' : l === 'my' ? 'မြန်မာ' : 'ไทย'}
                  </a>
                ))}
              </div>
            )}
          </li>

          <li>
            <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
