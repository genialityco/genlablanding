import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Marquee({ text }) {
  const textRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !textRef.current) return;
    
    const tl = gsap.to(textRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1
    });

    return () => tl.kill();
  }, [prefersReducedMotion]);

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: 'var(--space-block) 0', borderTop: '1px solid var(--gl-gray-dark)', borderBottom: '1px solid var(--gl-gray-dark)', backgroundColor: 'var(--gl-bg)' }}>
      <div ref={textRef} style={{ display: 'inline-block', width: 'fit-content' }}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="font-display text-h2" style={{ paddingRight: '50px', textTransform: 'uppercase', color: 'var(--gl-text-secondary)' }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}