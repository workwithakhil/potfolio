import { useEffect, useRef } from 'react';

// Minimal cursor: an 8px dot in difference blend, so it simply inverts what
// it sits on and blends into either theme. It grows a little over links and
// buttons, hides over text fields, and while you scroll it stretches into a
// thin vertical line that settles back into a dot when scrolling stops.
// Fine pointers only; off with reduced motion.
export default function Cursor() {
  const el = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce || !el.current || !dot.current) return;
    const root = document.documentElement;
    root.classList.add('has-cursor', 'cursor-out');

    let mx = 0;
    let my = 0;
    let x = 0;
    let y = 0;
    let first = true;
    let raf = 0;
    let lastY = window.scrollY;
    let stretch = 0;
    let press = 1;
    let pressTarget = 1;
    let state = '';

    const setState = (target) => {
      const t = target?.closest?.('a, button, input, textarea, select, label, [role="button"]');
      const s = !t ? '' : t.matches('input, textarea, select') ? 'text' : 'link';
      if (s !== state) { state = s; el.current.dataset.state = s; }
    };

    const loop = () => {
      x += (mx - x) * 0.32;
      y += (my - y) * 0.32;
      const sy = window.scrollY;
      const v = sy - lastY;
      lastY = sy;
      stretch += (Math.min(Math.abs(v) / 16, 1) - stretch) * 0.18;
      press += (pressTarget - press) * 0.25;
      if (Math.abs(v) > 0) setState(document.elementFromPoint(mx, my));
      el.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      dot.current.style.transform =
        `translate(-50%, -50%) scale(${((1 - stretch * 0.7) * press).toFixed(3)}, ${((1 + stretch * 2.6) * press).toFixed(3)})`;
      const busy = Math.abs(mx - x) + Math.abs(my - y) > 0.15 || stretch > 0.005 || Math.abs(pressTarget - press) > 0.005 || v !== 0;
      raf = busy ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (first) { x = mx; y = my; first = false; }
      root.classList.remove('cursor-out');
      setState(e.target);
      kick();
    };
    const down = () => { pressTarget = 0.7; kick(); };
    const up = () => { pressTarget = 1; kick(); };
    const out = (e) => { if (!e.relatedTarget) root.classList.add('cursor-out'); };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerout', out);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-cursor', 'cursor-out');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerout', out);
    };
  }, []);

  return (
    <div ref={el} className="cursor" aria-hidden="true">
      <span ref={dot} className="cursor-dot" />
    </div>
  );
}
