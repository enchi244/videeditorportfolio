import { useEffect, useRef, useState } from 'react';

/**
 * useReveal - lightweight scroll-triggered reveal hook (no dependencies).
 *
 * Watches an element with IntersectionObserver and flips `isVisible` to true
 * the first time it enters the viewport. Used by <Reveal> to drive the
 * .reveal / .reveal.is-visible CSS animation classes in styles/index.css.
 */
export default function useReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who've asked for reduced motion - just show content.
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
