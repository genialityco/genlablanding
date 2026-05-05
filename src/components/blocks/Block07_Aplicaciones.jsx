import React from 'react';
import { Section } from '../layout/Section';
import { BarChart2, Rocket, Users, Building2, ShoppingBag, UtensilsCrossed } from 'lucide-react';

const tiposEvento = [
  {
    icon: BarChart2,
    title: 'Ferias y exposiciones comerciales',
    desc: 'Captura de contactos calificados con incentivo de juego. Diferenciación frente a stands vecinos. Datos demográficos exportables.',
  },
  {
    icon: Rocket,
    title: 'Lanzamientos de producto',
    desc: 'Generar expectativa antes, espectáculo durante, contenido para redes después. Convertir el lanzamiento en algo que se cuenta solo.',
  },
  {
    icon: Users,
    title: 'Activaciones de canal y convenciones',
    desc: 'Fortalecer relaciones con distribuidores, fuerza de ventas, franquiciados. Competencias internas que generan cohesión y ranking visible.',
  },
  {
    icon: Building2,
    title: 'Eventos corporativos internos',
    desc: 'Fin de año, integraciones, celebraciones de aniversario. Networking espontáneo entre áreas que no se cruzan en el día a día.',
  },
  {
    icon: ShoppingBag,
    title: 'Centros comerciales y retail experiencial',
    desc: 'Atraer tráfico hacia el local físico. Convertir el shopping en experiencia social. Datos de afluencia útiles para negociar con marcas.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurantes, bares y venues fijos',
    desc: 'Acá entra Gen.Terac — nuestra línea hermana para pantallas LED en venues con tráfico continuo. Permanencia más larga, mayor consumo, reportes mensuales.',
  },
];

export function Block07_Aplicaciones() {
  return (
    <div style={{ backgroundColor: 'var(--gl-bg-light)', color: 'var(--gl-text-on-light)' }}>
      <Section id="aplicaciones" number="07" title="APLICACIONES">
        <h2 className="text-h2" style={{ marginBottom: '0.5rem', maxWidth: '800px' }}>
          No solo ferias. Cualquier momento de marca importa.
        </h2>
        <p className="text-body" style={{ color: 'var(--gl-gray-dark)', marginBottom: '3rem', maxWidth: '640px' }}>
          Donde haya gente, atención en juego y un mensaje que entregar — ahí tiene sentido Gen.Lab.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {tiposEvento.map((t, i) => (
            <div key={i} style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <t.icon size={28} color="var(--gl-blue-primary)" style={{ marginBottom: '0.75rem' }} />
              <p style={{
                fontWeight: '700',
                marginBottom: '0.4rem',
                color: 'var(--gl-text-on-light)',
                fontSize: 'var(--text-body)',
              }}>
                {t.title}
              </p>
              <p className="text-small" style={{ color: 'var(--gl-gray-dark)', lineHeight: '1.5' }}>
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
