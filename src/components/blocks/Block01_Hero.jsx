import React, { Suspense, lazy, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';

const HeroScene = lazy(() => import('../hero/HeroScene'));

export function Block01_Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current) {
        gsap.to(videoRef.current, { filter: 'saturate(1)', duration: 0.4 });
      }
      window.removeEventListener('pointermove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('pointermove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('pointermove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <section className="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <video 
        ref={videoRef}
        autoPlay 
        muted 
        playsInline 
        loop 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          mixBlendMode: 'screen',
          filter: 'saturate(0.6)',
          opacity: 0.7,
          zIndex: 0
        }}
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 20, 25, 0.5)', zIndex: 0 }} />

      <Container className="hero-content" style={{ position: 'relative', zIndex: 1, paddingBottom: '2rem' }}>
        <div style={{ maxWidth: '900px' }}>
          <h1 className="text-display text-primary" style={{ marginBottom: '1.5rem', color: 'white' }}>
            Convierta su marca en una experiencia que la gente no solo visita... la recuerda.
          </h1>
          <p className="text-body-lg text-secondary" style={{ marginBottom: '3rem', maxWidth: '700px' }}>
            Gen.Lab es el portafolio de experiencias gamificadas de Geniality. Atrae tráfico real, genera interacción significativa y captura datos accionables. La tecnología no es decoración — es el motor de sus ventas.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary">Agendar demo de 15 min</Button>
            <Button variant="outline">Ver experiencias en video</Button>
            <Button variant="outline">Descargar portafolio PDF</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}