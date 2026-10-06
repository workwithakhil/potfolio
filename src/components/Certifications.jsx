import { certifications } from '../data/portfolio';
import { FadeIn, HoverWave, RollText } from './Kinetic';
import { MaybeLink, SectionHead, pad } from './ui';

export default function Certifications() {
  return (
    <section id="certifications" className="section" aria-labelledby="certs-title">
      <div className="container">
        <SectionHead
          scene="certifications"
          id="certs-title"
          lines={['Certified', 'on AWS']}
          lede="Two AWS Associate certifications, one in cloud architecture and one in machine learning engineering."
        />
        <div className="cert-grid">
          {certifications.map((c, i) => (
            <FadeIn as="article" key={c.name} className="cert wave-host" delay={i * 0.12}>
              <div className="cert-top"><span>Certification {pad(i + 1)}</span><span>{c.issuer}</span></div>
              <div className="cert-aws" aria-hidden="true"><HoverWave text="AWS" /></div>
              <div className="tag-row">
                <span className="tag">{c.level}</span>
                {c.code && <span className="tag">Exam {c.code}</span>}
              </div>
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <MaybeLink className="btn btn-sm" href={c.credentialUrl} missingLabel="Credential link coming soon">
                {c.credentialUrl ? <RollText text="Verify on Credly ↗" /> : 'Credential link coming soon'}
              </MaybeLink>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
