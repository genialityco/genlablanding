import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Section } from '../layout/Section';

export function Block03_Como() {
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const length = lineRef.current.getTotalLength();
    gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
    
    const tl = gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: '#como',
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: true
      }
    });

    return () => tl.kill();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--gl-bg-light)', color: 'var(--gl-text-on-light)' }}>
      <Section id="como" number="03" title="CÓMO FUNCIONA">
        <h2 className="text-h2" style={{ marginBottom: '4rem', maxWidth: '800px' }}>
          Así de simple para usted. Así de potente para su marca.
        </h2>

        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <svg style={{ position: 'absolute', top: '50px', left: '10%', width: '80%', height: '2px', zIndex: 0 }} preserveAspectRatio="none">
            <line ref={lineRef} x1="0" y1="1" x2="100%" y2="1" stroke="var(--gl-blue-primary)" strokeWidth="2" />
          </svg>

          <Step number="1" text="Elegimos juntos la experiencia ideal según su objetivo." />
          <Step number="2" text="Personalizamos todo con su marca." />
          <Step number="3" text="Su equipo solo se concentra en vender." />
        </div>
      </Section>
    </div>
  );
}

function Step({ number, text }) {
  return (
    <div style={{ flex: '1 1 250px', position: 'relative', zIndex: 1, backgroundColor: 'var(--gl-bg-light)', padding: '1rem', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--gl-blue-primary)', backgroundColor: 'var(--gl-bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '2rem', fontWeight: '700', color: 'var(--gl-blue-primary)' }}>
        {number}
      </div>
      <p className="text-body-lg" style={{ fontWeight: '500' }}>{text}</p>
    </div>
  );
}