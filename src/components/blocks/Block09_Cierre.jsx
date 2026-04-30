import React from 'react';
import { Section } from '../layout/Section';
import { ActivationBuilder } from '../interactions/ActivationBuilder';
import { Button } from '../ui/Button';

export function Block09_Cierre() {
  return (
    <Section id="cierre" number="09" title="CIERRE">
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', marginInline: 'auto' }}>
        <h2 className="text-display" style={{ marginBottom: '1.5rem' }}>
          Hoy en un evento, la atención es el recurso más escaso.
        </h2>
        <p className="text-body-lg text-secondary" style={{ marginBottom: '2rem' }}>
          Las marcas que ganan no son las que más invierten en espacio. Son las que logran que las personas se detengan, participen y recuerden.
        </p>
        <Button variant="outline" style={{ display: 'inline-flex', marginBottom: '2rem' }}>
          Hablemos de su próxima activación
        </Button>
      </div>

      <h3 className="text-h2" style={{ marginBottom: '2rem', textAlign: 'center' }}>Construya su activación en 30 segundos</h3>
      <ActivationBuilder />
    </Section>
  );
}