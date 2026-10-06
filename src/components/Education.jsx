import { coursework, education } from '../data/portfolio';
import { FadeIn, HoverWave, Odometer } from './Kinetic';
import { SectionHead } from './ui';

export default function Education() {
  return (
    <section id="education" className="section" aria-labelledby="edu-title">
      <div className="container">
        <SectionHead scene="education" id="edu-title" lines={['Education']} />
        <div className="edu-grid">
          <ol className="edu-table">
            {education.map((e, i) => (
              <FadeIn as="li" key={e.school} className={`edu-row wave-host${e.current ? ' current' : ''}`} delay={i * 0.08} y={20}>
                <span className="edu-when">{e.period || e.scoreLabel}</span>
                <div className="edu-main">
                  <h3><HoverWave text={`${e.school}${e.place ? `, ${e.place}` : ''}`} /></h3>
                  <p>{e.degree}</p>
                  {e.note && <p className="edu-note">{e.note}</p>}
                </div>
                <div className="edu-score">
                  <b><Odometer value={e.score} /></b>
                  <small>{e.scoreLabel}</small>
                </div>
              </FadeIn>
            ))}
          </ol>
          <FadeIn className="course" delay={0.15}>
            <h3 className="label-row">Relevant coursework</h3>
            <ul className="tag-row">{coursework.map((c) => <li key={c} className="tag">{c}</li>)}</ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
