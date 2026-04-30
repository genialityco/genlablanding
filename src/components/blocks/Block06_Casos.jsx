import React from 'react';
import { Section } from '../layout/Section';
import { ScratchCard } from '../interactions/ScratchCard';

const casos = [
  { id: 1, category: "Marca de bebidas, Feria Anato 2025", metric: "2.847 leads en 3 días", quote: "Transformamos un pasillo vacío en el stand con más filas de la feria.", eco: "TOUCH" },
  { id: 2, category: "Telecomunicaciones, Evento Corporativo", metric: "Dwell time prom. 4:12 min", quote: "La gente no solo se detuvo, se quedó jugando y compitiendo.", eco: "MOTION & VISION" },
  { id: 3, category: "Financiero, Activación en C.C.", metric: "+340% recordación", quote: "El costo por lead bajó un 60% comparado con pauta tradicional.", eco: "PHYGITAL" }
];

export function Block06_Casos() {
  return (
    <Section id="casos" number="06" title="CASOS DE ÉXITO">
      <h2 className="text-h2" style={{ marginBottom: '3rem' }}>
        Marcas que ya midieron el impacto.
      </h2>

      <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
        {casos.map(caso => (
          <ScratchCard key={caso.id} {...caso} />
        ))}
      </div>
    </Section>
  );
}