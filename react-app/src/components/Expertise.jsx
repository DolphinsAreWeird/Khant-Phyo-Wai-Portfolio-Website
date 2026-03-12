import { useLang } from '../context/LangContext';

const categories = [
  {
    icon: 'fas fa-microchip', titleKey: 'expertise.ai.title', fallback: 'AI & Data Science',
    summary: 'Building applied AI systems — from computer vision pipelines and NLP models to data analysis and LLM integration.',
    tags: ['Computer Vision','Machine Learning','NLP & LLMs','Data Analysis','OCR Pipelines','TTS Systems','PyTorch','TensorFlow','YOLOv8','HuggingFace'],
  },
  {
    icon: 'fas fa-chart-line', titleKey: 'expertise.business.title', fallback: 'Business & Finance',
    summary: 'From startup CFO to strategy consultant — building financial models, go-to-market plans, and data-driven business cases.',
    tags: ['Financial Modeling','Unit Economics','Market Analysis','Business Development','Go-to-Market Strategy','Pricing Strategy','Digital Marketing','Stakeholder Management'],
  },
  {
    icon: 'fas fa-pencil-alt', titleKey: 'expertise.creative.title', fallback: 'Creative & Design',
    summary: 'Creating engaging content and immersive experiences through thoughtful design and compelling storytelling.',
    tags: ['Copywriting','UX Design','Game Development','Content Strategy','Figma','TouchDesigner','Generative Art'],
  },
  {
    icon: 'fas fa-laptop-code', titleKey: 'expertise.web.title', fallback: 'Web Development',
    summary: 'Building functional, responsive websites and web applications tailored to business and user needs.',
    tags: ['React','HTML / CSS','JavaScript','Node.js','UI Implementation','REST APIs','Performance Optimisation'],
  },
  {
    icon: 'fas fa-chalkboard-teacher', titleKey: 'expertise.education.title', fallback: 'Education & Teaching',
    summary: 'Helping students grow through personalised instruction, curriculum development, and exam preparation.',
    tags: ['Mathematics','English Language','Science','Myanmar Matriculation','GED Preparation','Curriculum Design','Workshop Facilitation'],
  },
];

export default function Expertise() {
  const { t } = useLang();
  return (
    <section id="expertise">
      <div className="container">
        <h2 className="section-title">{t('expertise.title')}</h2>
        <div className="expertise-categories">
          {categories.map(({ icon, titleKey, fallback, summary, tags }) => (
            <div key={titleKey} className="expertise-category">
              <div className="expertise-header">
                <div className="expertise-icon"><i className={icon} /></div>
                <h3>{t(titleKey) !== titleKey ? t(titleKey) : fallback}</h3>
                <p className="expertise-summary">{summary}</p>
              </div>
              <div className="expertise-tags">
                {tags.map(tag => <span key={tag} className="expertise-tag">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
