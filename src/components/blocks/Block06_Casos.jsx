import React from 'react';
import { Section } from '../layout/Section';
import { ScratchCard } from '../interactions/ScratchCard';
import imgAndicom from '../../assets/images/caso_de_exito_ANDICOM.jpeg';
import imgBetplay from '../../assets/images/caso_de_exito_betplay.jpeg';
import imgSured from '../../assets/images/caso_de_exito_SURED.jpeg';

const casos = [
  { id: 1, category: "Lenovo, ANDICOM", metric: "Más de 1.000 contactos y entrevistas", quote: "Transformamos su presencia en un laboratorio vivo con su propia tecnología.", eco: "Pygital, Motion & Vision, and more", image: imgAndicom },
  { id: 2, category: "Betplay, Activaciones en varios eventos", metric: "Tiempo permanencia +de 5 minutos", quote: "La gente no solo se detuvo, se quedó jugando y compitiendo. Generó conversación entre personas que no se conocían.", eco: "MOTION & VISION", image: imgBetplay },
  { id: 3, category: "SuRed, Lanzamiento USDT", metric: "Todos los invitados satisfechos y sorprendidos", quote: "Actividades interactivas moviles, mezcladas con alimentos y bebidas temáticos, un lanzamiento para siempre recordar", eco: "PHYGITAL", image: imgSured }
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
