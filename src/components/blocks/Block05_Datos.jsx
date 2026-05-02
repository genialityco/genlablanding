import React from 'react';
import { Section } from '../layout/Section';
import { Clock, Users, HeartPulse, Download } from 'lucide-react';

const metrics = [
  { icon: Clock, title: 'Dwell Time', desc: 'Tiempo exacto que cada visitante permaneció interactuando con su marca. La métrica que separa una activación memorable (4+ minutos) de un panel publicitario (8 segundos).' },
  { icon: Users, title: 'Perfil Demográfico', desc: 'Rango de edad y género de su audiencia, agregado y anónimo. Le dice quién realmente se acercó — no quién supuso que iría. Cumple Ley 1581 de habeas data.' },
  { icon: HeartPulse, title: 'Análisis de Sentimiento', desc: 'Picos de alegría, sorpresa y emoción detectados durante la experiencia. Útil para identificar qué momentos del juego conectaron y cuáles ajustar la próxima vez.' },
  { icon: Download, title: 'Contactos Exportables', desc: 'Base de datos completa lista para integrar a su CRM (Salesforce, HubSpot, Mailchimp) en CSV o vía API. Con consentimiento explícito de cada participante.' }
];

export function Block05_Datos() {
  return (
    <div style={{ backgroundColor: 'var(--gl-bg-light)', color: 'var(--gl-text-on-light)' }}>
      <Section id="datos" number="05" title="INTELIGENCIA DE DATOS">
        <h2 className="text-h2" style={{ marginBottom: '1.5rem', maxWidth: '800px' }}>
          Usted no adivina resultados. Los mide.
        </h2>

        <p className="text-body-lg" style={{ color: 'var(--gl-gray-dark)', marginBottom: '1rem', maxWidth: '700px', lineHeight: '1.7' }}>
          Cada experiencia Gen.Lab integra cámaras analíticas y trazabilidad completa. Mientras la gente juega, el sistema mide cómo se comporta — sin almacenar imágenes ni identificar a nadie. Al cierre del evento, recibe un reporte ejecutivo con datos auditables que justifican cada peso invertido y le dicen exactamente qué funcionó y qué no.
        </p>
        <p className="text-body" style={{ fontWeight: '700', color: 'var(--gl-blue-primary)', marginBottom: '4rem', maxWidth: '600px' }}>
          Lo que no se mide, no se puede mejorar. Y en eventos, cada peso invertido tiene que poder justificarse.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div style={{ flex: '1 1 500px', position: 'relative' }}>
            <div style={{
              width: '100%', aspectRatio: '16/9',
              backgroundColor: 'var(--gl-bg-elevated)',
              borderRadius: '1rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{ width: '100%', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#0A1419', opacity: 0.9 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1c2b33', paddingBottom: '1rem' }}>
                  <div style={{ color: 'white', fontWeight: 'bold' }}>Gen.Lab Analytics</div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FB8F00' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#01678A' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', height: '100%' }}>
                  <div style={{ flex: 1, backgroundColor: '#122029', borderRadius: '8px', padding: '1rem', position: 'relative' }}>
                    <div style={{ color: '#808285', fontSize: '0.8rem', marginBottom: '1rem' }}>ACTIVE SESSIONS</div>
                    <svg width="100%" height="80%" viewBox="0 0 100 50" preserveAspectRatio="none">
                      <path d="M0,40 Q20,20 40,30 T80,10 L100,20 L100,50 L0,50 Z" fill="rgba(1, 103, 138, 0.2)" />
                      <path d="M0,40 Q20,20 40,30 T80,10 L100,20" fill="none" stroke="#01678A" strokeWidth="2" />
                    </svg>
                    <Callout top="10%" left="40%" text="Dwell time promedio" />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ flex: 1, backgroundColor: '#122029', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '8px solid #3D857B', borderTopColor: '#01678A' }}></div>
                      <Callout top="50%" left="20%" text="Picos de emoción" />
                    </div>
                    <div style={{ flex: 1, backgroundColor: '#122029', borderRadius: '8px', padding: '1rem' }}>
                      <div style={{ height: '15px', width: '100%', backgroundColor: '#1c2b33', borderRadius: '4px', marginBottom: '8px' }}></div>
                      <div style={{ height: '15px', width: '80%', backgroundColor: '#1c2b33', borderRadius: '4px', marginBottom: '8px' }}></div>
                      <div style={{ height: '15px', width: '60%', backgroundColor: '#1c2b33', borderRadius: '4px' }}></div>
                      <Callout top="70%" left="10%" text="Contactos listos" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
              {metrics.map((m, i) => (
                <div key={i}>
                  <m.icon size={32} color="var(--gl-blue-primary)" style={{ marginBottom: '1rem' }} />
                  <h3 className="text-body-lg" style={{ fontWeight: '700', marginBottom: '0.5rem' }}>{m.title}</h3>
                  <p className="text-small" style={{ color: 'var(--gl-gray-dark)', lineHeight: '1.6' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Qué hacemos con esos datos */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 className="text-h3" style={{ marginBottom: '0.5rem', color: 'var(--gl-text-on-light)' }}>
            No le entregamos solo números. Le entregamos decisiones.
          </h3>
          <p className="text-body" style={{ color: 'var(--gl-gray-dark)', marginBottom: '2.5rem' }}>
            Cada reporte ejecutivo que sale de Gen.Lab incluye:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <ReporteCard
              title="Lectura del comportamiento"
              desc="Qué momentos atrajeron más gente. En qué horas hubo más fila. Qué porcentaje de participantes completaron el juego. Cuál fue el tiempo promedio de permanencia y cuántos volvieron por segunda vez."
            />
            <ReporteCard
              title="Recomendaciones específicas"
              desc="Qué afinar en la próxima activación: ajustar dificultad, cambiar premios, mover de ubicación, reforzar el equipo en horas pico. No le damos un PDF para archivar — le damos un plan."
            />
            <ReporteCard
              title="Comparativos contra benchmark"
              desc="Sus números contra el promedio del sector. Si su tasa de participación fue del 78% y el promedio de su industria es 65%, ese dato vale para defender presupuesto interno."
            />
          </div>
        </div>

        {/* Cita de cierre */}
        <div style={{ borderLeft: '4px solid var(--gl-orange)', paddingLeft: '1.5rem' }}>
          <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', color: 'var(--gl-blue-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.2, marginBottom: '0.5rem' }}>80%</p>
          <p className="text-body" style={{ color: 'var(--gl-text-on-light)', marginBottom: '0.25rem' }}>
            de los clientes dicen que la experiencia de marca importa tanto como el producto o servicio en sí mismo.
          </p>
          <p className="text-small" style={{ color: 'var(--gl-gray-mid)', fontStyle: 'italic' }}>Fuente: Salesforce, Reporte 2026</p>
        </div>

      </Section>
    </div>
  );
}

function ReporteCard({ title, desc }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderTop: '3px solid var(--gl-blue-primary)' }}>
      <p style={{ fontWeight: '700', marginBottom: '0.75rem', color: 'var(--gl-text-on-light)' }}>{title}</p>
      <p className="text-small" style={{ color: 'var(--gl-gray-dark)', lineHeight: '1.6' }}>{desc}</p>
    </div>
  );
}

function Callout({ top, left, text }) {
  return (
    <div style={{ position: 'absolute', top, left, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--gl-orange)', border: '2px solid white' }} />
      <div style={{ backgroundColor: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600', color: 'var(--gl-bg)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', whiteSpace: 'nowrap' }}>
        {text}
      </div>
    </div>
  );
}
