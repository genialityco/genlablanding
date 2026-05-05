const CATALOG_URL = '/catalogo';

import React from 'react';
import { Section } from '../layout/Section';

export function Block05_DosCaminos() {
  return (
    <div style={{ backgroundColor: 'var(--gl-bg-light)', color: 'var(--gl-text-on-light)' }}>
      <Section id="dos-caminos" number="05" title="DOS CAMINOS">
        <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
          Elija de catálogo, o diséñela desde cero.
        </h2>
        <p className="text-body-lg" style={{ color: 'var(--gl-gray-dark)', marginBottom: '3rem', maxWidth: '700px', lineHeight: '1.7' }}>
          No todos los eventos necesitan lo mismo. A veces basta con una experiencia probada que ya funciona — la activa, la brandea, la lanza. Otras veces la idea es tan específica que merece una experiencia construida solo para usted.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          {/* Tarjeta A — Catálogo */}
          <div style={{
            flex: '1 1 300px',
            backgroundColor: 'var(--gl-bg-elevated)',
            borderRadius: '1rem',
            borderTop: '4px solid var(--gl-blue-primary)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span style={{
              fontSize: 'var(--text-tag)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: 'var(--gl-blue-primary)',
              marginBottom: '1rem',
              display: 'block',
            }}>
              LISTAS PARA ACTIVAR
            </span>
            <h3 className="text-h3" style={{ marginBottom: '0.35rem' }}>Catálogo Gen.Lab</h3>
            <p style={{ fontSize: 'var(--text-small)', color: 'var(--gl-text-secondary)', fontWeight: '600', marginBottom: '1rem' }}>
              Experiencias probadas, brandeadas con su marca.
            </p>
            <p className="text-body" style={{ color: 'var(--gl-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Más de 9 experiencias listas en nuestros tres ecosistemas. Usted elige según su objetivo y su espacio; nosotros las brandeamos con sus colores, productos y mensajes. La forma más rápida de activar.
            </p>

            <ul style={{ listStyle: 'none', marginBottom: '1.75rem', flex: 1 }}>
              {[
                'Listas en 5 a 10 días hábiles',
                'Brandeo completo: colores, logos, productos, premios',
                'Desde experiencias en una URL hasta instalaciones con sensores',
                'Probadas en eventos reales',
              ].map((f, i) => (
                <li key={i} style={{
                  padding: '0.45rem 0',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  color: 'var(--gl-text-secondary)',
                  fontSize: 'var(--text-small)',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'flex-start',
                }}>
                  <span style={{ color: 'var(--gl-blue-primary)', flexShrink: 0 }}>✓</span> {f}
                </li>
              ))}
            </ul>

            <div style={{
              backgroundColor: 'rgba(1, 103, 138, 0.08)',
              borderLeft: '3px solid var(--gl-blue-primary)',
              borderRadius: '0 0.5rem 0.5rem 0',
              padding: '1rem',
              marginBottom: '1.5rem',
            }}>
              <p style={{ fontSize: 'var(--text-tag)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gl-text-muted)', marginBottom: '0.4rem' }}>
                Recomendado si
              </p>
              <p className="text-small" style={{ color: 'var(--gl-text-secondary)', lineHeight: '1.6' }}>
                Tiene una fecha cerca, un objetivo claro y quiere certeza de que va a funcionar.
              </p>
            </div>

            <a
              href={CATALOG_URL}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.75rem 1.5rem',
                border: '2px solid var(--gl-blue-primary)',
                borderRadius: '0.5rem',
                color: 'var(--gl-blue-primary)',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 'var(--text-body)',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
                boxSizing: 'border-box',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gl-blue-primary)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gl-blue-primary)'; }}
            >
              Ver catálogo completo →
            </a>
          </div>

          {/* Tarjeta B — A la medida */}
          <div style={{
            flex: '1 1 300px',
            backgroundColor: 'var(--gl-bg-elevated)',
            borderRadius: '1rem',
            borderTop: '4px solid var(--gl-orange)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span style={{
              fontSize: 'var(--text-tag)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: 'var(--gl-orange)',
              marginBottom: '1rem',
              display: 'block',
            }}>
              DISEÑADA DESDE CERO
            </span>
            <h3 className="text-h3" style={{ marginBottom: '0.35rem' }}>Experiencias a la medida</h3>
            <p style={{ fontSize: 'var(--text-small)', color: 'var(--gl-text-secondary)', fontWeight: '600', marginBottom: '1rem' }}>
              Conceptualizada y construida solo para su marca.
            </p>
            <p className="text-body" style={{ color: 'var(--gl-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Cuando la idea es única — un lanzamiento que necesita su propia mecánica, un mensaje que ninguna experiencia genérica comunica, un formato que no existe todavía — la construimos desde el concepto hasta el día del evento.
            </p>

            <ul style={{ listStyle: 'none', marginBottom: '1.75rem', flex: 1 }}>
              {[
                'Concepto, mecánica y narrativa originales',
                'Proceso de 4 a 5 semanas con previsualizaciones',
                'Combinamos hardware, sensores y software según la idea',
                'Soporte completo de operación en sitio',
              ].map((f, i) => (
                <li key={i} style={{
                  padding: '0.45rem 0',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  color: 'var(--gl-text-secondary)',
                  fontSize: 'var(--text-small)',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'flex-start',
                }}>
                  <span style={{ color: 'var(--gl-orange)', flexShrink: 0 }}>✓</span> {f}
                </li>
              ))}
            </ul>

            <div style={{
              backgroundColor: 'rgba(251, 143, 0, 0.08)',
              borderLeft: '3px solid var(--gl-orange)',
              borderRadius: '0 0.5rem 0.5rem 0',
              padding: '1rem',
              marginBottom: '1.5rem',
            }}>
              <p style={{ fontSize: 'var(--text-tag)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gl-text-muted)', marginBottom: '0.4rem' }}>
                Recomendado si
              </p>
              <p className="text-small" style={{ color: 'var(--gl-text-secondary)', lineHeight: '1.6' }}>
                Quiere algo que nadie más tenga, tiene tiempo de diseño, y el evento lo amerita (lanzamiento de producto, activación insignia, campaña).
              </p>
            </div>

            <a
              href="#cierre"
              style={{
                display: 'block',
                width: '100%',
                padding: '0.75rem 1.5rem',
                border: '2px solid var(--gl-orange)',
                borderRadius: '0.5rem',
                color: 'var(--gl-orange)',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 'var(--text-body)',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
                boxSizing: 'border-box',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gl-orange)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gl-orange)'; }}
            >
              Hablar con el equipo →
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
