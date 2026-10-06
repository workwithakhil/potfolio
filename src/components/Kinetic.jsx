import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

/** Renders words as nowrap groups of per-character spans (with a --i index). */
function charsByWord(text, start, renderChar) {
  const words = text.split(' ');
  let i = start;
  return words.map((w, wi) => (
    <Fragment key={wi}>
      <span className="kword">{[...w].map((c) => renderChar(c, i++))}</span>
      {wi < words.length - 1 && ' '}
    </Fragment>
  ));
}

/**
 * Section-scale title. Letters rise from behind a mask, rotating and
 * un-stretching into place; each line then drifts sideways with scroll,
 * alternating direction, so the title keeps moving as you read past it.
 */
export function KineticTitle({ lines, as = 'h2', id, className = '', drift = 56, delay = 0 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const on = inView || reduce;
  const Tag = as;
  let start = 0;
  return (
    <Tag ref={ref} id={id} className={`ktitle ${className}`}>
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((line, li) => {
        const s = start;
        start += line.replace(/ /g, '').length;
        return (
          <TitleLine key={li} line={line} li={li} start={s} progress={scrollYProgress} on={on} reduce={reduce} drift={drift} delay={delay} />
        );
      })}
    </Tag>
  );
}

function TitleLine({ line, li, start, progress, on, reduce, drift, delay }) {
  const dir = li % 2 === 0 ? 1 : -1;
  const x = useTransform(progress, [0, 1], reduce || !drift ? [0, 0] : [dir * drift, -dir * drift]);
  return (
    <motion.span className="kline" style={{ x }} aria-hidden="true">
      <span className="kmask">
        {charsByWord(line, start, (c, i) => (
          <motion.span
            key={i}
            className="ch"
            style={{ '--i': i }}
            initial={reduce ? false : { y: '118%', rotate: 14, scaleY: 1.8, opacity: 0 }}
            animate={on ? { y: '0%', rotate: 0, scaleY: 1, opacity: 1 } : undefined}
            transition={{ duration: 1.1, delay: delay + i * 0.026, ease: EASE }}
          >
            {c}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}

/** Characters that thicken in a ripple when their `.wave-host` ancestor is hovered. */
export function HoverWave({ text, className = '' }) {
  return (
    <span className={`wave ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {charsByWord(text, 0, (c, i) => <span key={i} className="ch" style={{ '--i': i }}>{c}</span>)}
      </span>
    </span>
  );
}

/** Label whose letters roll up to a duplicate on hover (link / button text). */
export function RollText({ text }) {
  return (
    <span className="roll">
      <span className="sr-only">{text}</span>
      <span className="roll-inner" aria-hidden="true">
        {[...text].map((c, i) => {
          const ch = c === ' ' ? '\u00a0' : c;
          return <span key={i} className="rch" style={{ '--i': i }} data-c={ch}>{ch}</span>;
        })}
      </span>
    </span>
  );
}

/** Paragraph that "reads itself": each word fills in as you scroll through it. */
export function ScrollWords({ text, as = 'p', className = '' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const words = text.split(' ');
  const Tag = as;
  return (
    <Tag ref={ref} className={`scroll-words ${className}`}>
      {words.map((w, i) => (
        <Word key={i} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduce={reduce}>{w}</Word>
      ))}
    </Tag>
  );
}
function Word({ children, p, range, reduce }) {
  const opacity = useTransform(p, range, reduce ? [1, 1] : [0.14, 1]);
  return <><motion.span style={{ opacity }}>{children}</motion.span>{' '}</>;
}

/** Number that rolls digit by digit (odometer) and gains weight as it lands. */
export function Odometer({ value, className = '' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const on = inView || reduce;
  return (
    <span ref={ref} className={`odo${on ? ' on' : ''} ${className}`}>
      <span className="sr-only">{value}</span>
      <span className="odo-inner" aria-hidden="true">
        {[...value].map((c, i) =>
          /\d/.test(c) ? (
            <span key={i} className="odo-col">
              <motion.span
                className="odo-strip"
                initial={reduce ? false : { y: '0%' }}
                animate={on ? { y: `${-Number(c) * 10}%` } : undefined}
                transition={{ duration: 1.7, delay: i * 0.09, ease: EASE }}
              >
                {'0123456789'.split('').map((d) => <span key={d}>{d}</span>)}
              </motion.span>
            </span>
          ) : (
            <span key={i} className="odo-static">{c}</span>
          ),
        )}
      </span>
    </span>
  );
}

/** Simple editorial reveal for non-type blocks. */
export function FadeIn({ as = 'div', delay = 0, y = 28, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </M>
  );
}

/**
 * Band of large type that never stops moving. Scroll speed skews and
 * stretches the letters; scrolling up reverses the direction.
 */
export function VelocityBand({ items, speed = 50, reverse = false, className = '' }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { damping: 40, stiffness: 260 });
  const skewX = useTransform(smooth, [-2400, 0, 2400], reduce ? [0, 0, 0] : [14, 0, -14]);
  const scaleY = useTransform(smooth, [-2400, 0, 2400], reduce ? [1, 1, 1] : [1.22, 1, 1.22]);
  const dir = useRef(reverse ? -1 : 1);
  const copyRef = useRef(null);
  const width = useRef(0);

  useLayoutEffect(() => {
    const measure = () => { width.current = copyRef.current?.offsetWidth || 0; };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready?.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || !width.current) return;
    const v = vel.get();
    if (v > 8) dir.current = reverse ? -1 : 1;
    else if (v < -8) dir.current = reverse ? 1 : -1;
    const boost = 1 + Math.min(Math.abs(v) / 500, 4);
    const w = width.current;
    const next = x.get() - dir.current * speed * boost * (Math.min(delta, 64) / 1000);
    x.set((((next % w) + w) % w) - w);
  });

  const copy = (k, ref) => (
    <span className="vband-copy" key={k} ref={ref}>
      {items.map((it, i) => (
        <span key={i} className="vband-item">{it}<i aria-hidden="true">✦</i></span>
      ))}
    </span>
  );

  return (
    <div className={`vband ${className}`} role="marquee" aria-label={items.join(', ')}>
      <motion.div className="vband-track" style={{ x, skewX, scaleY }} aria-hidden="true">
        {copy(0, copyRef)}
        {copy(1)}
        {copy(2)}
      </motion.div>
    </div>
  );
}

const shuffle = (arr) => {
  // Deterministic "random-looking" order that is never already sorted.
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  if (out.every((v, i) => v === i)) out.reverse();
  return out;
};

/**
 * Display word whose letters respond to the pointer: letters near the cursor
 * gain weight, stretch taller and lean toward it. With no pointer (touch, or
 * idle), a slow weight wave runs through the word instead.
 * - shuffle: letters arrive scrambled and rearrange into the right order.
 * - split: a 0..1 motion value that pulls the letters apart (used on scroll).
 * - idle: whether the ambient wave runs when the pointer isn't nearby.
 */
export function ProximityText({
  text,
  as = 'span',
  className = '',
  min = 300,
  max = 900,
  radius = 280,
  shuffle: doShuffle = false,
  ready = true,
  split = null,
  idle = true,
  decorative = false,
  ...rest
}) {
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const letters = useRef([]);
  const chars = [...text];
  const [order, setOrder] = useState(() =>
    doShuffle && !reduce ? shuffle(chars.map((_, i) => i)) : chars.map((_, i) => i),
  );
  const [settled, setSettled] = useState(!doShuffle || reduce);

  useEffect(() => {
    if (!doShuffle || reduce || !ready) return;
    const a = setTimeout(() => setOrder(chars.map((_, i) => i)), 950);
    const b = setTimeout(() => setSettled(true), 2100);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reduce || !wrap.current) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    let raf = 0;
    let visible = true;
    let px = -1e4;
    let py = -1e4;
    let lastMove = -1e4;
    const n = chars.length;
    const cur = chars.map(() => ({ w: min + (max - min) * 0.4, s: 1, r: 0 }));

    const tick = (now) => {
      raf = 0;
      if (!visible) return;
      const els = letters.current;
      const rects = els.map((el) => el?.getBoundingClientRect());
      const away = !fine || now - lastMove > 2600;
      const sp = split ? split.get() : 0;
      for (let i = 0; i < n; i++) {
        const el = els[i];
        const r = rects[i];
        if (!el || !r) continue;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        let p;
        let tw;
        let ts;
        let tr = 0;
        if (away) {
          p = idle ? 0.5 + 0.5 * Math.sin(now / 950 - i * 0.75) : 0;
          tw = min + (max - min) * (0.25 + p * 0.5);
          ts = 1 + p * 0.05;
        } else {
          const d = Math.hypot(px - cx, py - cy);
          p = Math.max(0, 1 - d / radius);
          p = p * p * (3 - 2 * p);
          tw = min + (max - min) * (0.18 + p * 0.82);
          ts = 1 + p * 0.16;
          tr = Math.max(-1, Math.min(1, (px - cx) / radius)) * 7 * p;
        }
        const c = cur[i];
        c.w += (tw - c.w) * 0.1;
        c.s += (ts - c.s) * 0.1;
        c.r += (tr - c.r) * 0.1;
        const off = i - (n - 1) / 2;
        const sx = off * sp * 110;
        const sy = (i % 2 ? 1 : -1) * sp * (40 + ((i * 37) % 5) * 18);
        const srot = (i % 2 ? 1 : -1) * sp * (6 + ((i * 13) % 9));
        el.style.fontVariationSettings = `'wght' ${c.w.toFixed(1)}`;
        el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) rotate(${(c.r + srot).toFixed(2)}deg) scaleY(${c.s.toFixed(3)})`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => { px = e.clientX; py = e.clientY; lastMove = performance.now(); };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(wrap.current);
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduce, min, max, radius, split, idle, text]); // eslint-disable-line react-hooks/exhaustive-deps

  const Tag = as;
  return (
    <Tag ref={wrap} className={`prox ${className}`} aria-hidden={decorative || undefined} {...rest}>
      {!decorative && <span className="sr-only">{text}</span>}
      <span className="prox-row" aria-hidden="true">
        {order.map((ci, pos) => (
          <motion.span
            key={ci}
            layout={!settled}
            className="prox-cell"
            initial={doShuffle && !reduce ? { opacity: 0, y: '45%', rotate: (ci % 2 ? 1 : -1) * 20 } : false}
            animate={ready || reduce ? { opacity: 1, y: '0%', rotate: settled ? 0 : (ci % 2 ? 1 : -1) * 9 } : undefined}
            transition={{ layout: { duration: 0.95, ease: EASE }, default: { duration: 0.8, delay: settled ? 0 : pos * 0.07, ease: EASE } }}
          >
            <span className="prox-ch" ref={(el) => { letters.current[ci] = el; }}>
              {chars[ci] === ' ' ? '\u00a0' : chars[ci]}
            </span>
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
