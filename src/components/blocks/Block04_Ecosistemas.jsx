import React, { useRef, useEffect } from 'react';
import { Section } from '../layout/Section';
import { useInView } from '../../hooks/useInView';

const ecosistemas = [
  { id: 1, title: 'Touch', video: '/videos/ecosistema-touch.mp4', desc: 'Por qué funciona: Captura atención directa mediante interacción física rápida.', ideal: 'Ideal para: Stands pequeños, registro de leads, trivias.', color: 'var(--gl-blue-primary)' },
  { id: 2, title: 'Motion & Vision', video: '/videos/ecosistema-motion.mp4', desc: 'Por qué funciona: Atrae a los espectadores y genera dinámicas sociales alrededor del juego.', ideal: 'Ideal para: Activaciones de marca, ferias grandes, generar recuerdo.', color: 'var(--gl-orange)' },
  { id: 3, title: 'Phygital', video: '/videos/ecosistema-phygital.mp4', desc: 'Por qué funciona: Une lo digital con el movimiento del cuerpo en el mundo físico.', ideal: 'Ideal para: Activaciones deportivas, dinámicas de gran formato.', color: 'var(--gl-teal)' }
];

function EcoCard({ eco, index }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (inView) videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  }, [inView]);

  return (
    <div 
      className="eco-card"
      style={{
        '--base-y': index === 2 ? '2rem' : '0rem',
        flex: '1 1 300px',
        backgroundColor: 'var(--gl-bg-elevated)',
        borderRadius: '1rem',
        overflow: 'hidden',
        borderTop: `4px solid ${eco.color}`
      }}
      onMouseEnter={() => {
        if (videoRef.current && window.innerWidth >= 768) videoRef.current.playbackRate = 1.5;
      }}
      onMouseLeave={() => {
        if (videoRef.current) videoRef.current.playbackRate = 1;
      }}
    >
      <div ref={ref} style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000' }}>
        <video 
          ref={videoRef}
          src={eco.video} 
          muted 
          playsInline 
          loop 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ padding: '2rem' }}>
        <h3 className="text-h3" style={{ marginBottom: '1rem' }}>{eco.title}</h3>
        <p className="text-secondary" style={{ marginBottom: '0.5rem' }}>{eco.desc}</p>
        <p className="text-muted text-small" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eco.ideal}</p>
      </div>
    </div>
  );
}

export function Block04_Ecosistemas() {
  return (
    <Section id="ecosistemas" number="04" title="ECOSISTEMAS">
      <style>{`
        .eco-card {
          transform: translateY(var(--base-y));
          transition: transform 0.3s ease;
        }
        @media (min-width: 768px) {
          .eco-card:hover {
            transform: translateY(calc(var(--base-y) - 8px));
          }
        }
      `}</style>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {ecosistemas.map((eco, i) => (
          <EcoCard key={eco.id} eco={eco} index={i} />
        ))}
      </div>
    </Section>
  );
}