import { Fragment, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/portfolio';
import { EASE, HoverWave, ProximityText, RollText } from './Kinetic';
import { pad } from './ui';
import TechCycler from './TechCycler';

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  // As the hero scrolls away, the name's letters split apart.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const split = useTransform(scrollYProgress, [0.05, 0.75], [0, 1], { clamp: true });
  const hiY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  const rise = (i, base = 0.15) => ({
    initial: reduce ? false : { y: '110%', rotate: 10, opacity: 0 },
    animate: { y: '0%', rotate: 0, opacity: 1 },
    transition: { duration: 1, delay: base + i * 0.035, ease: EASE },
  });
  const fade = (d) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.3 : 0.9, delay: reduce ? 0 : d, ease: EASE },
  });

  let ci = 0;
  return (
    <section id="home" ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.div className="container hero-meta" {...fade(0.05)}>
        <span><b>{profile.name}</b></span>
        <span>B.Tech CSE — KL University</span>
        <span>Graduating May 2027</span>
      </motion.div>

      <h1 id="hero-title" className="container hero-title">
        <span className="sr-only">Hi, I&apos;m Akhil.</span>
        <motion.span className="hero-hi" aria-hidden="true" style={{ y: hiY }}>
          <span className="kmask">
            {"Hi, I'm".split(' ').map((w, wi, arr) => (
              <Fragment key={wi}>
                <span className="kword">
                  {[...w].map((c) => <motion.span key={ci} className="ch" {...rise(ci++)}>{c}</motion.span>)}
                </span>
                {wi < arr.length - 1 && ' '}
              </Fragment>
            ))}
          </span>
        </motion.span>
        <ProximityText text={`${profile.shortName}.`} className="hero-name" shuffle split={split} decorative />
      </h1>

      <div className="container hero-grid">
        <motion.ul className="hero-roles" aria-label="Focus areas" {...fade(1.0)}>
          {profile.roles.map((r, i) => (
            <li key={r} className="wave-host">
              <span className="role-num">{pad(i + 1)}</span>
              <HoverWave text={r} />
            </li>
          ))}
        </motion.ul>

        <motion.div className="hero-copy" {...fade(1.15)}>
          <p className="hero-intro">{profile.intro}</p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#projects"><RollText text="View my work" /></a>
            <a className="btn" href="#contact"><RollText text="Let’s connect" /></a>
          </div>
          <div className="hero-links">
            <a className="text-link" href={profile.resumeUrl} download><RollText text="Resume ↓" /></a>
            <a className="text-link" href={profile.github} target="_blank" rel="noopener noreferrer"><RollText text="GitHub ↗" /></a>
            <a className="text-link" href={`mailto:${profile.email}`}><RollText text={profile.email} /></a>
            <a className="text-link" href={profile.phoneHref}><RollText text={profile.phone} /></a>
          </div>
        </motion.div>

        <div className="hero-stack"><TechCycler /></div>
      </div>
    </section>
  );
}
