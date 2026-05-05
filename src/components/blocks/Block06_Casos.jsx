import React from 'react';
import { Section } from '../layout/Section';
import { ScratchCard } from '../interactions/ScratchCard';

const casos = [
  { id: 1, category: "Marca de bebidas, Feria Anato 2025", metric: "2.847 contactos en 3 días", quote: "Transformamos un pasillo vacío en el stand con más filas de la feria. Los vecinos nos preguntaban qué estábamos haciendo.", eco: "TOUCH" },
  { id: 2, category: "Telecomunicaciones, Evento Corporativo", metric: "Dwell time prom. 4:12 min", quote: "La gente no solo se detuvo, se quedó jugando y compitiendo. Generó conversación entre personas que no se conocían.", eco: "MOTION & VISION" },
  { id: 3, category: "Financiero, Activación en C.C.", metric: "78% completaron el reto", quote: "8 de cada 10 visitantes terminaron el juego. Esa es la mejor prueba de que la experiencia conectó — la gente no se rinde a mitad de camino cuando algo realmente le importa.", eco: "PHYGITAL" }
];

export function Block06_Casos() {
  return (
    <Section id="casos" number="09" title="CASOS DE ÉXITO">
      <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
        Marcas que ya midieron el impacto.
      </h2>
      <p className="text-body" style={{ color: 'var(--gl-text-secondary)', marginBottom: '3rem' }}>
        Tres casos reales con sus métricas. Raspe cada tarjeta para revelar el resultado.
      </p>

      <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
        {casos.map(caso => (
          <ScratchCard key={caso.id} {...caso} />
        ))}
      </div>
    </Section>
  );
}
