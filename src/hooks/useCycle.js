import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Steps an index 0..length-1 on an interval while the element is on screen.
// Returns [ref, index]. With reduced motion, the index stays at -1 (no highlight).
export function useCycle(length, interval = 1400) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !visible) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => clearInterval(id);
  }, [reduce, visible, length, interval]);

  return [ref, reduce ? -1 : index];
}
