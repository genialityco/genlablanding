import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function HeroScene() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 80 : 200;

  if (prefersReducedMotion) {
    return <div style={{ background: 'var(--gl-bg)', width: '100%', height: '100%', position: 'absolute', zIndex: -1 }} />;
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }} dpr={[1, 2]}>
        <ParticleField count={count} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}