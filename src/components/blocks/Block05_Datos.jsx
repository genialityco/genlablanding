import React from 'react';
import { Section } from '../layout/Section';
import { Clock, Users, HeartPulse, Download } from 'lucide-react';

const metrics = [
  { icon: Clock, title: 'Dwell Time', desc: 'Medimos el tiempo exacto que un usuario interactúa.' },
  { icon: Users, title: 'Perfil Demográfico', desc: 'Rango de edad y género de los participantes.' },
  { icon: HeartPulse, title: 'Análisis de Sentimiento', desc: 'Detección de emociones durante la experiencia.' },
  { icon: Download, title: 'Leads Exportables', desc: 'Base de datos lista para su CRM en un clic.' }
];

export function Block05_Datos() {
  return (
    <div style={{ backgroundColor: 'var(--gl-bg-light)', color: 'var(--gl-text-on-light)' }}>
      <Section id="datos" number="05" title="INTELIGENCIA DE DATOS">
        <h2 className="text-h2" style={{ marginBottom: '4rem', maxWidth: '800px' }}>
          Usted no adivina resultados. Los mide.
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 500px', position: 'relative' }}>
            <div style={{ 
              width: '100%', aspectRatio: '16/9', 
              backgroundColor: 'var(--gl-bg-elevated)', 
              borderRadius: '1rem', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
               {/* Custom Dashboard UI Mockup to avoid generic stock photos */}
               <div style={{ width: '100%', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#0A1419', opacity: 0.9 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1c2b33', paddingBottom: '1rem' }}>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>Gen.Lab Analytics</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}><div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FB8F00' }}/><div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#01678A' }}/></div>
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
                         <Callout top="70%" left="10%" text="Leads listos" />
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
                  <p className="text-small" style={{ color: 'var(--gl-gray-dark)' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
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