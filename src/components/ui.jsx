import {
  Atom, Zap, Cloud, Database, Container, BrainCircuit, Blocks, Code2, Terminal, Layers, Cpu,
  Network, Github, Mail, Phone, MapPin,
} from 'lucide-react';
import { scenes } from '../data/portfolio';
import { FadeIn, KineticTitle } from './Kinetic';

export const icons = {
  Atom, Zap, Cloud, Database, Container, BrainCircuit, Blocks, Code2, Terminal, Layers, Cpu,
  Network, Github, Mail, Phone, MapPin,
};

export function Icon({ name, ...props }) {
  const C = icons[name];
  return C ? <C aria-hidden="true" {...props} /> : null;
}

export const pad = (n) => String(n).padStart(2, '0');

export function MaybeLink({ href, className, children, missingLabel }) {
  if (!href) {
    return <span className={className} aria-disabled="true" title={missingLabel}>{children}</span>;
  }
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

/** Editorial section header: "(02) About ————" then a kinetic title and an offset lede. */
export function SectionHead({ scene, id, lines, lede, drift }) {
  const idx = scenes.findIndex((x) => x.id === scene);
  return (
    <header className="sec-head">
      {idx >= 0 && (
        <FadeIn className="sec-label" y={12}>
          <span className="sec-num">({pad(idx + 1)})</span>
          <span>{scenes[idx].label}</span>
          <span className="sec-rule" aria-hidden="true" />
        </FadeIn>
      )}
      <KineticTitle id={id} lines={lines} className="sec-title" drift={drift} />
      {lede && <FadeIn as="p" className="sec-lede" delay={0.2}>{lede}</FadeIn>}
    </header>
  );
}
