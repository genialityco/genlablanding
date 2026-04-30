import React from 'react';
import { Section } from '../layout/Section';
import { PressAndHold } from '../interactions/PressAndHold';

export function Block02_Reto() {
  return (
    <Section id="reto" number="02" title="EL RETO">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>
            En un evento, la atención es el recurso más escaso.
          </h2>
          <p className="text-body-lg text-secondary" style={{ marginBottom: '1rem' }}>
            Las pantallas pasivas no detienen a nadie. El material POP termina en la basura. Y los formularios tradicionales espantan a los leads antes de capturarlos.
          </p>
          <p className="text-body-lg text-secondary">
            Gen.Lab resuelve esto con una premisa simple: el visitante deja de observar su marca y empieza a descubrirla jugando.
          </p>
        </div>
        <div style={{ flex: '1 1 500px' }}>
          <PressAndHold />
        </div>
      </div>
    </Section>
  );
}