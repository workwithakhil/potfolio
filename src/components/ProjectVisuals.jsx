import { Cloud, Link2 } from 'lucide-react';
import { useCycle } from '../hooks/useCycle';

export function ArchitectureVisual({ project, expanded = false }) {
  const [ref, lit] = useCycle(project.layers.length, 1300);
  return (
    <div ref={ref}>
      <div className="visual-label">
        <span>System architecture</span>
        <span className="visual-badge"><Cloud aria-hidden="true" /> AWS-ready</span>
      </div>
      <ol className="stack" aria-label="Request flow from frontend to cloud">
        {project.layers.map((l, i) => (
          <li key={l.label} className={`layer${lit === i ? ' lit' : ''}`}>
            <span className="step" aria-hidden="true">{i + 1}</span>
            <span>
              <b>{l.label}</b>
              {expanded && <small>{l.note}</small>}
            </span>
          </li>
        ))}
      </ol>
      <div className="aws-frame">
        <p>Designed to map onto these AWS services</p>
        <ul className="aws-grid">
          {project.aws.map((a) => <li key={a} className="aws-chip">{a}</li>)}
        </ul>
      </div>
    </div>
  );
}

const BLOCKS = [
  { name: 'Block n−1', hash: 'H(n−1)', prev: 'H(n−2)' },
  { name: 'Block n', hash: 'H(n)', prev: 'H(n−1)' },
  { name: 'Block n+1', hash: 'H(n+1)', prev: 'H(n)' },
];

export function ChainVisual({ project }) {
  const [ref, lit] = useCycle(project.flow.length, 1200);
  // Light up the chain while the flow is at Block / Consensus / Ledger.
  const chainLit = lit >= 2 && lit <= 4 ? Math.min(lit - 2, 2) : -1;
  return (
    <div ref={ref}>
      <div className="visual-label">
        <span>Tamper-evident pipeline</span>
        <span className="visual-badge"><Link2 aria-hidden="true" /> Hash-linked</span>
      </div>
      <div className="chain" aria-label="Each block stores the hash of the previous block">
        {BLOCKS.map((b, i) => (
          <div key={b.name} style={{ display: 'contents' }}>
            {i > 0 && <span className="link" aria-hidden="true" />}
            <div className={`block${chainLit === i ? ' lit' : ''}`}>
              <b>{b.name}</b>
              hash <code>{b.hash}</code><br />
              prev <code>{b.prev}</code>
            </div>
          </div>
        ))}
      </div>
      <ol className="flow" aria-label="From employee activity to the monitoring dashboard">
        {project.flow.map((f, i) => (
          <li key={f} className={`flow-step${lit === i ? ' lit' : ''}`}>
            <small>Step {i + 1}</small>
            {f}
          </li>
        ))}
      </ol>
    </div>
  );
}
