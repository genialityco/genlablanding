import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePressHold } from '../../hooks/usePressHold';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function PressAndHold() {
  const [isActive, setIsActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const { onPointerDown, onPointerMove, onPointerUp, onPointerCancel } = usePressHold({
    duration: 1500,
    onComplete: () => {
      if (!isActive) {
        setIsActive(true);
        triggerAnimation();
      }
    },
    onCancel: () => {}
  });

  const triggerAnimation = () => {
    if (prefersReducedMotion) {
      gsap.to('.stand-gris', { opacity: 0, duration: 0.4 });
      gsap.to('.stand-color', { opacity: 1, duration: 0.6 });
      document.querySelector('.contador').textContent = '4:12 min';
      return;
    }

    const tl = gsap.timeline();
    const timerObj = { time: 8 };

    tl.to('.stand-gris', { opacity: 0, duration: 0.4 })
      .to('.stand-color', { opacity: 1, duration: 0.6 }, '<')
      .fromTo('.particle', { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1,
        stagger: { amount: 0.5, from: 'center' },
        duration: 0.8, ease: 'power3.out'
      }, '<0.2')
      .to(timerObj, {
        time: 252, // 4 * 60 + 12
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          const m = Math.floor(timerObj.time / 60);
          const s = Math.floor(timerObj.time % 60).toString().padStart(2, '0');
          const el = document.querySelector('.contador');
          if (el) el.textContent = `${m}:${s} min`;
        }
      }, '<');
  };

  useEffect(() => {
    if (isActive) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          if (!isActive && containerRef.current) {
            gsap.to('.hint-pulse', { scale: 1.05, opacity: 0.5, yoyo: true, repeat: 1, duration: 0.3 });
          }
        }, 8000);
      }
    }, { threshold: 0.5 });
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isActive]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div 
      ref={containerRef}
      style={{ position: 'relative', width: '100%', aspectRatio: '4/3', cursor: 'pointer', touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none', borderRadius: '1rem', overflow: 'hidden' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onContextMenu={(e) => e.preventDefault()} // Prevent contextual menu on mobile devices
    >
      <div className="stand-gris" style={{ position: 'absolute', inset: 0, background: 'var(--gl-bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--gl-gray-dark)', pointerEvents: 'none' }}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="var(--gl-gray-mid)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M18 17V9"/>
          <path d="M13 17V5"/>
          <path d="M8 17v-3"/>
        </svg>
      </div>
      <div className="stand-color" style={{ position: 'absolute', inset: 0, background: 'var(--gl-blue-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, border: '1px solid var(--gl-blue-primary)', pointerEvents: 'none' }}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="var(--gl-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M18 17V9"/>
          <path d="M13 17V5"/>
          <path d="M8 17v-3"/>
        </svg>
      </div>

      {!isActive && (
        <div className="tooltip hint-pulse" style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', background: 'var(--gl-bg)', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: 'var(--text-tag)', border: '1px solid var(--gl-gray-mid)', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
          {isMobile ? 'Mantén el dedo presionado' : 'Mantén presionado para activar Gen.Lab'}
        </div>
      )}

      {isActive && !prefersReducedMotion && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
           {Array.from({ length: 30 }).map((_, i) => {
             const angle = Math.random() * Math.PI * 2;
             const distance = 20 + Math.random() * 60;
             return (
              <span key={i} className="particle" style={{
                position: 'absolute',
                left: `calc(50% + ${Math.cos(angle) * distance}%)`,
                top: `calc(50% + ${Math.sin(angle) * distance}%)`,
                width: '6px', height: '6px',
                backgroundColor: 'var(--gl-orange)',
                borderRadius: '50%',
                opacity: 0,
                boxShadow: '0 0 10px var(--gl-orange)'
              }} />
             );
           })}
        </div>
      )}

      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(10, 20, 25, 0.8)', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid var(--gl-gray-dark)', pointerEvents: 'none' }}>
        <span className="font-display text-small" style={{ letterSpacing: '0.05em' }}>ATENCIÓN: <span className="contador text-orange" style={{ color: 'var(--gl-orange)' }}>8s</span></span>
      </div>
    </div>
  );
}