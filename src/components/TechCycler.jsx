import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from './Kinetic';
import { pad } from './ui';

const STACK = [
  { label: 'Python', note: 'Backend language across both major projects.' },
  { label: 'React', note: 'Frontends for the ticket assistant and the threat-monitoring dashboard.' },
  { label: 'FastAPI', note: 'REST API layer of the CloudOps ticket assistant.' },
  { label: 'AWS', note: 'Target platform for the ticket assistant’s AWS-ready architecture.' },
  { label: 'MySQL', note: 'Relational storage behind the ticket workflow.' },
  { label: 'Docker', note: 'Containerizes services so they run the same everywhere.' },
  { label: 'AI/ML', note: 'Ticket classification and priority-based processing.' },
  { label: 'Blockchain', note: 'Tamper-evident ledger for insider-threat monitoring.' },
];
const HOLD = 2.6; // seconds per word

const word = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.025 } },
};
const char = {
  hidden: { y: '110%', rotate: 14, opacity: 0, fontWeight: 200 },
  show: { y: '0%', rotate: 0, opacity: 1, fontWeight: 650, transition: { duration: 0.8, ease: EASE } },
  exit: { y: '-105%', rotate: -10, opacity: 0, fontWeight: 900, transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] } },
};

// "I build with ___": the stack word swaps letter by letter, with a note on
// where that technology shows up. Hover / tap / focus a name to jump to it.
export default function TechCycler() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduce || !inView) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % STACK.length), HOLD * 1000);
    return () => clearInterval(t);
  }, [paused, reduce, inView]);

  const pick = (i) => { setIdx(i); setPaused(true); };
  const cur = STACK[idx];

  return (
    <figure className="stackfig" ref={ref} onMouseLeave={() => setPaused(false)}>
      <figcaption className="stackfig-head">
        <span>Fig. 01 — Stack</span>
        <span>{pad(idx + 1)} / {pad(STACK.length)}</span>
      </figcaption>

      <div className="stackfig-stage">
        <p className="stackfig-pre">I build with</p>
        <div className="stackfig-word" aria-live="polite">
          <AnimatePresence initial={false}>
            <motion.span key={cur.label} className="stackfig-current" variants={word} initial="hidden" animate="show" exit="exit">
              <span className="sr-only">{cur.label}</span>
              {[...cur.label].map((c, i) => (
                <motion.span key={i} className="ch" variants={char} aria-hidden="true">{c}</motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={cur.label}
            className="stackfig-note"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {cur.note}
          </motion.p>
        </AnimatePresence>
      </div>

      <span className="stackfig-progress" aria-hidden="true">
        <motion.i
          key={`${idx}-${paused}`}
          initial={{ scaleX: paused || reduce ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: paused || reduce ? 0 : HOLD, ease: 'linear' }}
        />
      </span>

      <ul className="stackfig-list" aria-label="Technologies">
        {STACK.map((t, i) => (
          <li key={t.label}>
            <button
              type="button"
              className={i === idx ? 'on' : ''}
              aria-pressed={i === idx}
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>
    </figure>
  );
}
