import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLang } from '../context/LangContext';

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await emailjs.send(
        'Yservice_071tgwi',
        'YOUR_TEMPLATE_ID',
        { to_email: 'kelvinwai.khantphyo@gmail.com', ...form },
        'QNyoNjMgEzvt60yOZ'
      );
      setStatus('success');
      setForm({ name:'', email:'', subject:'', message:'' });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>
        <div className="contact-content">
          <div className="contact-info">
            {[
              { icon: 'fa-map-marker-alt', title: 'Location', value: t('contact.location') },
              { icon: 'fa-envelope', title: 'Email', value: 'kelvinwai.khantphyo@gmail.com' },
              { icon: 'fa-phone', title: 'Phone', value: '+66920910228' },
            ].map(({ icon, title, value }) => (
              <div key={title} className="contact-item">
                <div className="contact-icon"><i className={`fas ${icon}`} /></div>
                <div><h3>{title}</h3><p>{value}</p></div>
              </div>
            ))}
            <div className="contact-social">
              <h3>Connect with me</h3>
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

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" value={form.name} onChange={set('name')} placeholder={t('contact.form.name')} required />
            </div>
            <div className="form-group">
              <input type="email" value={form.email} onChange={set('email')} placeholder={t('contact.form.email')} required />
            </div>
            <div className="form-group">
              <input type="text" value={form.subject} onChange={set('subject')} placeholder={t('contact.form.subject')} />
            </div>
            <div className="form-group">
              <textarea value={form.message} onChange={set('message')} placeholder={t('contact.form.message')} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? <><i className="fas fa-spinner fa-spin" /> Sending…</> : t('contact.form.submit')}
            </button>
            {status === 'success' && <div id="form-status" className="success">Message sent! I&apos;ll get back to you soon.</div>}
            {status === 'error' && <div id="form-status" className="error">Something went wrong. Please try again.</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
