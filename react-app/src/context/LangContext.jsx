import { createContext, useContext, useState } from 'react';

const strings = {
  en: {
    'nav.home': 'Home', 'nav.about': 'About', 'nav.expertise': 'Expertise',
    'nav.projects': 'Projects', 'nav.webprojects': 'Web Projects',
    'nav.certificates': 'Certificates', 'nav.experience': 'Experience', 'nav.contact': 'Contact',
    'hero.tagline': 'Building at the intersection of AI and finance — turning intelligent systems into real business outcomes.',
    'hero.projects': 'View Projects', 'hero.contact': 'Contact Me',
    'about.title': 'About Me',
    'expertise.title': 'My Expertise',
    'projects.title': 'Featured Projects',
    'certificates.title': 'Certificates & Achievements',
    'experience.title': 'Work Experience',
    'contact.title': 'Get In Touch',
    'contact.location': 'Lat Krabang, Bangkok, Thailand',
    'contact.form.name': 'Your Name', 'contact.form.email': 'Your Email',
    'contact.form.subject': 'Subject', 'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
  },
  my: {
    'nav.home': 'ပင်မ', 'nav.about': 'ကျွန်ုပ်', 'nav.expertise': 'ကျွမ်းကျင်မှု',
    'nav.projects': 'စီမံကိန်းများ', 'nav.webprojects': 'ဝဘ်ဆိုက်',
    'nav.certificates': 'အောင်လက်မှတ်', 'nav.experience': 'အတွေ့အကြုံ', 'nav.contact': 'ဆက်သွယ်',
    'hero.tagline': 'နည်းပညာ၊ စီးပွားရေးနှင့် ဖန်တီးမှုတို့၏ ပေါင်းစည်းမှုမှ ဆန်းသစ်သောဖြေရှင်းချက်များ',
    'hero.projects': 'စီမံကိန်းများ', 'hero.contact': 'ဆက်သွယ်ရန်',
    'about.title': 'ကျွန်ုပ်အကြောင်း',
    'expertise.title': 'ကျွမ်းကျင်မှုများ',
    'projects.title': 'စီမံကိန်းများ',
    'certificates.title': 'အောင်လက်မှတ်များ',
    'experience.title': 'အလုပ်အကိုင်',
    'contact.title': 'ဆက်သွယ်ရန်',
    'contact.location': 'လတ်ကရာဘန်၊ ဘန်ကောက်၊ ထိုင်းနိုင်ငံ',
    'contact.form.name': 'နာမည်', 'contact.form.email': 'အီးမေးလ်',
    'contact.form.subject': 'အကြောင်းအရာ', 'contact.form.message': 'သင်၏ message',
    'contact.form.submit': 'ပို့ပါ',
  },
  th: {
    'nav.home': 'หน้าแรก', 'nav.about': 'เกี่ยวกับ', 'nav.expertise': 'ความเชี่ยวชาญ',
    'nav.projects': 'โปรเจกต์', 'nav.webprojects': 'เว็บไซต์',
    'nav.certificates': 'ประกาศนียบัตร', 'nav.experience': 'ประสบการณ์', 'nav.contact': 'ติดต่อ',
    'hero.tagline': 'สร้างนวัตกรรมที่จุดตัดของ AI และการเงิน — เปลี่ยนระบบอัจฉริยะให้เป็นผลลัพธ์ทางธุรกิจ',
    'hero.projects': 'ดูโปรเจกต์', 'hero.contact': 'ติดต่อฉัน',
    'about.title': 'เกี่ยวกับฉัน',
    'expertise.title': 'ความเชี่ยวชาญ',
    'projects.title': 'โปรเจกต์เด่น',
    'certificates.title': 'ประกาศนียบัตร',
    'experience.title': 'ประสบการณ์การทำงาน',
    'contact.title': 'ติดต่อ',
    'contact.location': 'ลาดกระบัง กรุงเทพฯ ประเทศไทย',
    'contact.form.name': 'ชื่อของคุณ', 'contact.form.email': 'อีเมล',
    'contact.form.subject': 'หัวข้อ', 'contact.form.message': 'ข้อความ',
    'contact.form.submit': 'ส่งข้อความ',
  },
};

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('preferredLanguage') || 'en');
  const t = (key) => strings[lang]?.[key] ?? strings.en[key] ?? key;
  const changeLang = (l) => { setLang(l); localStorage.setItem('preferredLanguage', l); };
  return <LangContext.Provider value={{ lang, t, changeLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
