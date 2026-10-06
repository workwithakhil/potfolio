import { projects } from '../data/portfolio';
import { SectionHead } from './ui';
import ProjectCard from './ProjectCard';

export default function Projects({ onOpen }) {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          scene="projects"
          id="projects-title"
          lines={['Selected', 'projects']}
          lede="Two systems built end to end: one focused on cloud-ready full-stack architecture, the other on security and distributed consensus."
        />
        <div className="projects">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}
