import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Cursor() {
  const cursorRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    gsap.set(cursorRef.current, { x: -100, y: -100 });
    
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return <div ref={cursorRef} className="custom-cursor" />;
}