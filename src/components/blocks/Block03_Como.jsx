import React from 'react';
import { Section } from '../layout/Section';
import experienciaImg from '../../assets/images/03 LA EXPERIENCIA.png';

export function Block03_Como() {
  return (
    <div style={{ backgroundColor: 'var(--gl-bg-light)', color: 'var(--gl-text-on-light)' }}>
      <Section id="como" number="03" title="LA EXPERIENCIA">
        <h2 className="text-h2" style={{ marginBottom: '4rem', maxWidth: '800px' }}>
          No es lo mismo ver que vivir.
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start', marginBottom: '4rem' }}>
          <div style={{ flex: '1 1 340px' }}>
            <p className="text-body" style={{ color: 'var(--gl-gray-dark)', marginBottom: '1rem' }}>
              Para ser espectador ya están el cine y Netflix. Lo que la gente recuerda de un evento no es lo que leyó en
              un pendón — es lo que sintió. Lo que la hizo decidir, equivocarse, ganar, mostrarle al de al lado.
            </p>
            <p className="text-body" style={{ color: 'var(--gl-gray-dark)', marginBottom: '1rem' }}>
              ¿Recuerda el último material impreso que le entregaron en una feria? ¿Recuerda algo que lo hizo emocionarse?
              Esa diferencia es lo que construimos.
            </p>
            <h3 className="text-h3" style={{ margin: '0.5rem', color: 'var(--gl-text-on-light)' }}>
              Una experiencia Gen.Lab le permite al visitante interactuar, dejar su sello y recibir algo personalizado —
            </h3>
            <p className="text-body" style={{ color: 'var(--gl-gray-dark)', marginTop: '2rem' }}>
              Saber que su forma de pensar importa, que no todo es genérico. Puede tocar, retar, explorar, fabricar,
              competir, fotografiarse, llevarse un avatar suyo. Y mientras lo hace, su marca está alrededor — no encima.
              Detrás hay un ecosistema completo: un catálogo de experiencias listas para usar, desarrollo a la medida
              cuando lo necesita, y hardware modular que opera en cualquier parte del mundo. Sensores de movimiento,
              pantallas táctiles, proyección, cámaras 3D, impresión instantánea — la herramienta correcta para el momento
              que quiere crear.
            </p>
          </div>

          <div style={{ flex: '1 1 300px', maxWidth: '480px' }}>
            <img
              src={experienciaImg}
              alt="La experiencia Gen.Lab"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          <StatQuote
            stat="64%"
            text="de los asistentes a eventos en 2026 dicen que las experiencias inmersivas son el elemento más importante de un evento."
            source="Bizzabo, Reporte 2026"
          />
          <StatQuote
            stat="87%"
            text="de los consumidores recuerdan las experiencias de marca por encima de los anuncios tradicionales."
            source="DesignRush, Tendencias 2026"
          />
        </div>
      </Section>
    </div>
  );
}

function StatQuote({ stat, text, source }) {
  return (
    <div style={{
      flex: '1 1 280px',
      borderLeft: '4px solid var(--gl-orange)',
      paddingLeft: '1.5rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    }}>
      <p style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: '800',
        color: 'var(--gl-blue-primary)',
        fontFamily: 'var(--font-display)',
        lineHeight: 1,
      }}>
        {stat}
      </p>
      <p className="text-body" style={{ color: 'var(--gl-text-on-light)', margin: '0.5rem 0' }}>
        {text}
      </p>
      <p className="text-small" style={{ color: 'var(--gl-gray-mid)', fontStyle: 'italic' }}>
        Fuente: {source}
      </p>
    </div>
  );
}
