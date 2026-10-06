import { skillGroups } from '../data/portfolio';
import { FadeIn, HoverWave } from './Kinetic';
import { SectionHead, pad } from './ui';

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          scene="skills"
          id="skills-title"
          lines={['Skills &', 'toolkit']}
          lede="The languages, frameworks, and cloud services I use to build and ship, grouped by where they sit in a system."
        />
        <ol className="skill-rows">
          {skillGroups.map((g, i) => (
            <FadeIn as="li" key={g.id} className="skill-row wave-host" delay={i * 0.05} y={20}>
              <span className="row-num" aria-hidden="true">{pad(i + 1)}</span>
              <h3 className="row-title"><HoverWave text={g.title} /></h3>
              <span className="row-count" aria-label={`${g.items.length} skills`}>{pad(g.items.length)}</span>
              <ul className="row-tags">{g.items.map((s) => <li key={s} className="tag">{s}</li>)}</ul>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
