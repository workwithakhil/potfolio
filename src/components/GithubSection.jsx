import { useEffect, useState } from 'react';
import { githubConfig, profile, projects } from '../data/portfolio';
import { SectionHead, pad } from './ui';
import { FadeIn, HoverWave, RollText } from './Kinetic';

function useRepos() {
  const [state, setState] = useState({ status: githubConfig.fetchRepos ? 'loading' : 'off', repos: [] });
  useEffect(() => {
    if (!githubConfig.fetchRepos) return;
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 7000);
    fetch(`https://api.github.com/users/${profile.githubHandle}/repos?sort=updated&per_page=30`, {
      signal: ctrl.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`GitHub responded ${r.status}`))))
      .then((data) => {
        const repos = (Array.isArray(data) ? data : [])
          .filter((r) => !r.fork && !r.archived)
          .slice(0, githubConfig.maxRepos)
          .map((r) => ({ name: r.name, description: r.description, language: r.language, url: r.html_url }));
        setState({ status: repos.length ? 'ok' : 'empty', repos });
      })
      .catch(() => setState({ status: 'error', repos: [] }))
      .finally(() => clearTimeout(timeout));
    return () => { clearTimeout(timeout); ctrl.abort(); };
  }, []);
  return state;
}

export default function GithubSection() {
  const { status, repos } = useRepos();

  return (
    <section id="github" className="section gh" aria-labelledby="gh-title">
      <div className="container">
        <SectionHead
          scene="github"
          id="gh-title"
          lines={['Building.', 'Learning.', 'Improving.']}
          lede="Source code, experiments, and work in progress live on GitHub."
        />
        <FadeIn className="gh-cta">
          <a className="btn btn-primary" href={profile.github} target="_blank" rel="noopener noreferrer">
            <RollText text={`github.com/${profile.githubHandle} ↗`} />
          </a>
        </FadeIn>

        <h3 className="label-row">Selected projects</h3>
        <div className="repo-table">
          {projects.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.06} y={16}>
              <a className="repo-row wave-host" href={p.githubUrl || profile.github} target="_blank" rel="noopener noreferrer">
                <span className="repo-num">{pad(i + 1)}</span>
                <span className="repo-name"><HoverWave text={p.title} /></span>
                <span className="repo-desc">{p.tagline}</span>
                <span className="repo-lang">{p.tech.slice(0, 3).join(' / ')}</span>
                <span className="repo-arrow" aria-hidden="true">↗</span>
              </a>
            </FadeIn>
          ))}
        </div>

        {status !== 'off' && (
          <div className="repo-live" aria-live="polite">
            <h3 className="label-row">Recently updated on GitHub</h3>
            {status === 'loading' && (
              <div className="repo-table" aria-label="Loading repositories">
                {[0, 1, 2].map((k) => <div key={k} className="repo-row skeleton" />)}
              </div>
            )}
            {status === 'ok' && (
              <div className="repo-table">
                {repos.map((r, i) => (
                  <a key={r.name} className="repo-row wave-host" href={r.url} target="_blank" rel="noopener noreferrer">
                    <span className="repo-num">{pad(i + 1)}</span>
                    <span className="repo-name"><HoverWave text={r.name} /></span>
                    <span className="repo-desc">{r.description || 'No description yet.'}</span>
                    <span className="repo-lang">{r.language || '—'}</span>
                    <span className="repo-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}
            {(status === 'error' || status === 'empty') && (
              <p className="gh-fallback">
                The live repository list couldn’t load here.{' '}
                <a href={profile.github} target="_blank" rel="noopener noreferrer">Browse all repositories on GitHub ↗</a>
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
