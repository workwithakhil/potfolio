import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { MaybeLink } from './ui';
import { EASE, KineticTitle, RollText } from './Kinetic';
import { ArchitectureVisual, ChainVisual } from './ProjectVisuals';

function Body({ project, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const d = project.detail;

  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div ref={dialogRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-head">
        <div className="modal-title-wrap">
          <span className="modal-kicker">Case study</span>
          <KineticTitle as="h2" id="modal-title" lines={[project.title]} drift={0} className="modal-title" />
        </div>
        <button ref={closeRef} type="button" className="btn btn-sm modal-close" onClick={onClose}>
          <RollText text="Close" />
        </button>
      </div>

      <div className="modal-body">
        <div className="m-row"><h3>01 Problem</h3><div><p>{d.problem}</p></div></div>
        <div className="m-row"><h3>02 Solution</h3><div><p>{d.solution}</p></div></div>
        <div className="m-row">
          <h3>03 Architecture</h3>
          <div>
            <div className="proj-visual in-modal">
              {project.visual === 'chain' ? <ChainVisual project={project} /> : <ArchitectureVisual project={project} expanded />}
            </div>
            {d.awsNote && <p className="note-box">NOTE: {d.awsNote}</p>}
          </div>
        </div>
        <div className="m-row">
          <h3>04 Technologies</h3>
          <div><ul className="tag-row">{project.tech.map((t) => <li key={t} className="tag">{t}</li>)}</ul></div>
        </div>
        <div className="m-row">
          <h3>05 Key features</h3>
          <div><ul className="checks">{d.features.map((f) => <li key={f}>{f}</li>)}</ul></div>
        </div>
        <div className="m-row">
          <h3>06 Engineering challenges</h3>
          <div><ul className="checks">{d.challenges.map((c) => <li key={c}>{c}</li>)}</ul></div>
        </div>
        <div className="m-row">
          <h3>07 Engineering areas</h3>
          <div><ul className="tag-row">{project.areas.map((x) => <li key={x} className="tag">{x}</li>)}</ul></div>
        </div>
        <div className="m-row"><h3>08 Results &amp; learning</h3><div><p>{d.learning}</p></div></div>
        <div className="m-foot">
          <a className="btn btn-primary" href={project.githubUrl || profile.github} target="_blank" rel="noopener noreferrer"><RollText text="GitHub ↗" /></a>
          <MaybeLink className="btn" href={project.demoUrl} missingLabel="Live demo not published yet">
            {project.demoUrl ? 'Live demo ↗' : 'Live demo — coming soon'}
          </MaybeLink>
        </div>
      </div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
          <motion.div
            className="modal-shell"
            initial={reduce ? false : { y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 40, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Body project={project} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
