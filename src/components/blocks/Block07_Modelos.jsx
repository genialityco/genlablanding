import React from 'react';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';

export function Block07_Modelos() {
  return (
    <Section id="modelos" number="07" title="MODELOS">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <ModeloCard 
          title="Modelo Gen.BOX + Licencia"
          color="var(--gl-blue-primary)"
          recommended="Stands pequeños y giras"
          desc="Hardware plug-and-play con licencia de software anual."
          features={["Pantalla interactiva 43\"", "1 Juego base a elegir", "Dashboard básico"]}
        />
        <ModeloCard 
          title="Llave en Mano"
          color="var(--gl-teal)"
          recommended="Activaciones protagonistas"
          desc="Diseño, desarrollo y montaje completo de una experiencia a medida."
          features={["Conceptualización creativa", "Desarrollo custom", "Montaje físico", "Soporte in-situ"]}
        />
      </div>
    </Section>
  );
}

function ModeloCard({ title, color, recommended, desc, features }) {
  return (
    <div style={{ flex: '1 1 350px', backgroundColor: 'var(--gl-bg-elevated)', borderRadius: '1rem', borderTop: `4px solid ${color}`, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
      <span className="tag" style={{ color, marginBottom: '1rem' }}>RECOMENDADO SI... {recommended}</span>
      <h3 className="text-h2" style={{ marginBottom: '1rem' }}>{title}</h3>
      <p className="text-secondary" style={{ marginBottom: '2rem' }}>{desc}</p>
      
      <ul style={{ listStyle: 'none', marginBottom: '3rem', flex: 1 }}>
        {features.map((f, i) => (
          <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gl-gray-dark)', color: 'var(--gl-text-secondary)' }}>
            ✓ {f}
          </li>
        ))}
      </ul>
      
      <Button variant="outline" style={{ width: '100%' }}>Consultar precios</Button>
    </div>
  );
}