import { about, interests } from '../data/portfolio';
import { FadeIn, HoverWave, Odometer, ScrollWords } from './Kinetic';
import { Icon, SectionHead, pad } from './ui';

export default function About() {
  const [lead, ...rest] = about.paragraphs;
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead scene="about" id="about-title" lines={['About me']} />
        <div className="about-grid">
          <ScrollWords className="about-lead" text={lead} />
          <div className="about-rest">
            {rest.map((p, i) => <FadeIn as="p" key={i} delay={i * 0.1}>{p}</FadeIn>)}
          </div>
        </div>

        <dl className="stats">
          {about.stats.map((s) => (
            <div key={s.label} className="stat">
              <dt>{s.label}</dt>
              <dd><Odometer value={s.value} /></dd>
            </div>
          ))}
        </dl>

        <div className="interests">
          <FadeIn as="h3" className="label-row" y={12}>What I like building</FadeIn>
          <div className="interest-grid">
            {interests.map((it, i) => (
              <FadeIn as="article" key={it.title} className="interest wave-host" delay={i * 0.08}>
                <div className="interest-top">
                  <span className="num">{pad(i + 1)}</span>
                  <span className="ico"><Icon name={it.icon} /></span>
                </div>
                <h4><HoverWave text={it.title} /></h4>
                <p>{it.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
