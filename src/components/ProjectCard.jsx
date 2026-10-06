import { profile } from '../data/portfolio';
import { FadeIn, KineticTitle, RollText } from './Kinetic';
import { pad } from './ui';
import { ArchitectureVisual, ChainVisual } from './ProjectVisuals';

const VISIBLE_AREAS = 8;

export default function ProjectCard({ project, index, onOpen }) {
  const reverse = index % 2 === 1;
  const extra = project.areas.length - VISIBLE_AREAS;
  const handleCardClick = (e) => {
    if (e.target.closest('a, button')) return;
    onOpen(project);
  };

  return (
    <article className={`proj${reverse ? ' reverse' : ''}`} onClick={handleCardClick} aria-labelledby={`${project.id}-title`}>
      <FadeIn className="proj-meta" y={12}>
        <b>Project {pad(index + 1)}</b>
        <span>{project.tagline}</span>
        <span>{project.tech.length} technologies</span>
      </FadeIn>
      <KineticTitle as="h3" id={`${project.id}-title`} lines={[project.title]} className="proj-title" drift={34} />

      <div className="proj-body">
        <FadeIn className="proj-text" delay={0.1}>
          <p className="desc">{project.description}</p>
          <ul className="tag-row" aria-label="Technologies">
            {project.tech.map((t) => <li key={t} className="tag">{t}</li>)}
          </ul>
          <ul className="areas" aria-label="Key engineering areas">
            {project.areas.slice(0, VISIBLE_AREAS).map((a) => <li key={a}>{a}</li>)}
          </ul>
          {extra > 0 && <p className="areas-more">+{extra} more in the case study</p>}
          <div className="proj-actions">
            <button type="button" className="btn btn-primary" onClick={() => onOpen(project)}><RollText text="Read the case study" /></button>
            <a className="btn" href={project.githubUrl || profile.github} target="_blank" rel="noopener noreferrer"><RollText text="GitHub ↗" /></a>
          </div>
        </FadeIn>
        <FadeIn className="proj-visual" delay={0.2}>
          {project.visual === 'chain' ? <ChainVisual project={project} /> : <ArchitectureVisual project={project} />}
        </FadeIn>
      </div>
    </article>
  );
}
