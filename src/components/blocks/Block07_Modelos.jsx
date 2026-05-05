import React from 'react';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';

export function Block07_Modelos() {
  return (
    <Section id="modelos" number="10" title="MODELOS">
      <div style={{ marginBottom: '4rem', maxWidth: '760px' }}>
        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>
          Tres formas de trabajar con nosotros. Elija según su operación y su frecuencia.
        </h2>
        <p className="text-body-lg" style={{ color: 'var(--gl-text-secondary)', lineHeight: '1.7' }}>
          No todos los clientes necesitan lo mismo. Una marca que activa una vez al año necesita un servicio distinto del de una agencia que monta cuatro eventos al mes, y muy distinto del de un restaurante que necesita su pantalla LED viva todas las noches. Por eso Geniality opera tres modelos.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <ModeloCard
          title="Gen.BOX + Licencia"
          color="var(--gl-blue-primary)"
          badge="RECOMENDADO SI... maneja varios eventos al año"
          subtitle="Para agencias BTL, productoras y marcas con infraestructura propia."
          desc="Compra el hardware Gen.BOX una vez y opera múltiples eventos pagando solo licencia por activación. Maximiza rentabilidad si maneja varios clientes al año."
          features={[
            'Hardware Gen.BOX (pantalla, computadora, periféricos)',
            'Licencia de juego brandeado por evento',
            'Soporte técnico remoto',
            'Actualizaciones de software incluidas',
            'Acceso al panel de gestión de contenido',
          ]}
          pricing={[
            { label: 'Hardware', value: 'desde $8.500.000 COP', note: 'pago único' },
            { label: 'Licencia por evento', value: 'desde $2.800.000 COP' },
          ]}
          ctaLabel="Cotizar este modelo"
        />
        <ModeloCard
          title="Llave en Mano"
          color="var(--gl-teal)"
          badge="RECOMENDADO SI... quiere resultados sin operar logística"
          subtitle="Para marcas finales que buscan ejecución impecable y se concentran en su evento."
          desc="Nos encargamos de todo: hardware, branding, transporte, montaje, operación en sitio, soporte técnico y reporte final. Usted recibe el resultado."
          features={[
            'Alquiler de pantallas, tótems o estructura phygital',
            'Personalización completa de marca',
            'Transporte, montaje y desmontaje',
            'Operador propio en sitio durante todo el evento',
            'Reporte de métricas post-evento',
            'Eventos de 1 a 3 días',
            'Kit de respaldo técnico in situ',
          ]}
          pricing={[
            { label: 'Touch', value: 'desde $4.500.000 COP' },
            { label: 'Motion & Vision', value: 'desde $7.000.000 COP' },
            { label: 'Phygital', value: 'desde $9.500.000 COP' },
          ]}
          ctaLabel="Cotizar este modelo"
        />
        <ModeloCard
          title="Gen.Terac — Pantallas vivas"
          color="var(--gl-orange)"
          badge="RECOMENDADO SI... tiene un venue fijo con pantalla LED"
          subtitle="Para restaurantes, bares, centros de entretenimiento y venues con tráfico continuo."
          desc="Nuestra plataforma de fidelización para venues fijos. Convierte una pantalla LED tradicional en un ecosistema vivo con experiencias interactivas activables desde un panel, métricas de comportamiento del público y biblioteca de contenido inteligente que reacciona a la cantidad de personas en el lugar."
          features={[
            'Experiencias interactivas activables desde un panel',
            'Mapas de calor, permanencia y atención',
            'Biblioteca de contenido inteligente',
            'Suscripción mensual por punto',
            'Piloto inicial de 30 días disponible',
          ]}
          pricing={[
            { label: 'Plan Bronce', value: 'desde $480.000 COP/mes', note: 'métricas básicas + biblioteca base' },
            { label: 'Plan Plata', value: 'desde $780.000 COP/mes', note: 'métricas avanzadas + interactivas ligeras' },
            { label: 'Plan Oro', value: 'desde $1.200.000 COP/mes', note: 'full interactivo + biblioteca completa' },
            { label: 'Piloto 30 días', value: '$12.200.000 COP', note: 'hardware comodato + instalación incluidos' },
          ]}
          ctaLabel="Conocer Gen.Terac"
          highlight
        />
      </div>
    </Section>
  );
}

function ModeloCard({ title, color, badge, subtitle, desc, features, pricing, ctaLabel, highlight }) {
  return (
    <div style={{
      flex: '1 1 320px',
      backgroundColor: 'var(--gl-bg-elevated)',
      borderRadius: '1rem',
      borderTop: `4px solid ${color}`,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      outline: highlight ? `2px solid ${color}` : 'none',
      outlineOffset: '2px',
    }}>
      <span style={{ fontSize: 'var(--text-tag)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', color, marginBottom: '1rem', display: 'block' }}>{badge}</span>
      <h3 className="text-h3" style={{ marginBottom: '0.35rem' }}>{title}</h3>
      <p style={{ fontSize: 'var(--text-small)', color: 'var(--gl-text-secondary)', fontWeight: '600', marginBottom: '1rem' }}>{subtitle}</p>
      <p className="text-body" style={{ color: 'var(--gl-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>{desc}</p>

      <ul style={{ listStyle: 'none', marginBottom: '1.75rem', flex: 1 }}>
        {features.map((f, i) => (
          <li key={i} style={{ padding: '0.45rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--gl-text-secondary)', fontSize: 'var(--text-small)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <span style={{ color, flexShrink: 0 }}>✓</span> {f}
          </li>
        ))}
      </ul>

      <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: 'var(--text-tag)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gl-text-muted)', marginBottom: '0.75rem' }}>Inversión</p>
        {pricing.map((p, i) => (
          <div key={i} style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: 'var(--text-small)', color: 'var(--gl-text-secondary)' }}>{p.label}: </span>
            <span style={{ fontWeight: '700', color: 'var(--gl-text-primary)', fontSize: 'var(--text-body)' }}>{p.value}</span>
            {p.note && <span style={{ fontSize: 'var(--text-tag)', color: 'var(--gl-text-muted)', marginLeft: '0.4rem' }}>({p.note})</span>}
          </div>
        ))}
      </div>

      <Button variant="outline" style={{ width: '100%', borderColor: color, color }}>{ctaLabel}</Button>
    </div>
  );
}
