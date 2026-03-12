import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { projects } from '../data/projects';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI' },
  { key: 'cv', label: 'Computer Vision' },
  { key: 'nlp', label: 'NLP' },
  { key: 'business', label: 'Business' },
  { key: 'design', label: 'Design' },
  { key: 'digital-twin', label: '3D modeling' },
];

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-img">
        <img src={project.image} alt={project.title} />
        <div className="project-overlay" />
      </div>
      <div className="project-content">
        <div className="project-tags">
          {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="skill-tags">
          {project.skillTags.map(s => (
            <span key={s.label} className={`skill-tag skill-tag-${s.type}`}>{s.label}</span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
          <span>View Project</span><i className="fas fa-arrow-right" />
        </a>
      </div>
      <div className="project-hover-details">
        <div className="hover-details-header">
          <h3>{project.hover.title}</h3>
          <p>{project.hover.summary}</p>
        </div>
        {project.hover.sections.map(s => (
          <div key={s.heading} className="hover-section">
            <h4><i className={`fas ${s.icon}`} /> {s.heading}</h4>
            <p>{s.text}</p>
          </div>
        ))}
        <div className="hover-tech-stack">
          {project.hover.tech.map(t => <span key={t} className="hover-tech-item">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLang();
  const [filter, setFilter] = useState('all');

  const visible = filter === 'all'
    ? projects
    : projects.filter(p => p.category.includes(filter));

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">{t('projects.title')}</h2>
        <div className="filter-buttons">
          {FILTERS.map(f => (
            <button key={f.key} className={`filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {visible.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}
