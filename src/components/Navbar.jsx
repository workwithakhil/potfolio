import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { navItems, profile } from '../data/portfolio';
import { useActiveSection, useScrolled } from '../hooks/useActiveSection';
import { EASE, RollText } from './Kinetic';
import { pad } from './ui';

const ids = navItems.map((n) => n.id);

function currentTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr) return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function Navbar() {
  const scrolled = useScrolled();
  const active = useActiveSection(ids);
  const { scrollYProgress } = useScroll();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => setTheme(currentTheme()), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggleTheme = () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    setTheme(next);
  };
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <>
    <header className={`nav${scrolled || open ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">{profile.initials}</span>
          <RollText text="Akhil Damaramadugu" />
        </a>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={active === item.id ? 'active' : ''} aria-current={active === item.id ? 'true' : undefined}>
                  <RollText text={item.label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            <ThemeIcon />
          </button>
          <a className="btn btn-primary btn-sm nav-resume" href={profile.resumeUrl} download><RollText text="Resume" /></a>
          <button type="button" className="btn btn-sm menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            <RollText text={open ? 'Close' : 'Menu'} />
          </button>
        </div>
      </div>
      <motion.span className="nav-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

    </header>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[...navItems, { id: 'resume', label: 'Resume' }].map((item, i) => (
              <motion.a
                key={item.id}
                href={item.id === 'resume' ? profile.resumeUrl : `#${item.id}`}
                {...(item.id === 'resume' ? { download: true } : {})}
                className={active === item.id ? 'active' : ''}
                onClick={() => setOpen(false)}
                initial={{ y: 40, opacity: 0, skewY: 6 }}
                animate={{ y: 0, opacity: 1, skewY: 0 }}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.05, ease: EASE }}
              >
                <small>{pad(i + 1)}</small>
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
