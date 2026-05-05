import React from 'react';
import { Section } from '../layout/Section';
import {
  MessageSquare,
  Palette,
  Wrench,
  Zap,
  FileText,
  Eye,
  Package,
  Volume2,
  Globe,
  Tag,
} from 'lucide-react';

const hitos = [
  {
    num: '1',
    label: 'Descubrimiento',
    period: 'Semana 1',
    icon: MessageSquare,
    desc: 'Reunión inicial de 45 minutos. Entendemos su objetivo, su audiencia, el tipo de evento y los condicionantes de espacio y presupuesto. Salimos con una propuesta concreta de qué experiencia conviene y por qué.',
  },
  {
    num: '2',
    label: 'Diseño y personalización',
    period: 'Semanas 2 y 3',
    icon: Palette,
    desc: 'Adaptamos la mecánica del juego a su universo de marca. Paleta, logos, productos, sonidos, premios, mensajes clave. Le enviamos previsualizaciones para aprobación.',
  },
  {
    num: '3',
    label: 'Pruebas técnicas',
    period: 'Semana 4',
    icon: Wrench,
    desc: 'Probamos cada experiencia con su contenido cargado. Validamos tiempos, niveles de dificultad, calidad de los reportes y la integración con su CRM si aplica.',
  },
  {
    num: '4',
    label: 'Día del evento',
    period: 'Día D',
    icon: Zap,
    desc: 'Llegamos el día anterior para montar. El día del evento un operador propio acompaña la activación. Cualquier incidente técnico se resuelve en menos de 5 minutos. Su equipo no toca un cable.',
  },
  {
    num: '5',
    label: 'Reporte y siguiente paso',
    period: '3-5 días después',
    icon: FileText,
    desc: 'Entregamos un reporte ejecutivo con todos los datos: participantes, permanencia, perfil demográfico, picos de emoción, base exportable. Y le decimos qué funcionó, qué no, y qué probaríamos diferente la próxima vez.',
  },
];

const personalizaciones = [
  { icon: Eye, title: 'Identidad visual completa', desc: 'Colores, logos, tipografía, fondos animados de marca.' },
  { icon: Package, title: 'Productos y catálogo real', desc: 'Los premios, ítems o personajes son sus productos, no genéricos.' },
  { icon: MessageSquare, title: 'Mensajes y tono de voz', desc: 'Integrados en pantallas, transiciones e instrucciones.' },
  { icon: Tag, title: 'Premios y probabilidades', desc: 'Usted define qué se gana; nosotros calibramos las probabilidades.' },
  { icon: Volume2, title: 'Música y sonido', desc: 'Licencia de música acorde a su marca o composición original.' },
  { icon: Globe, title: 'Idioma y accesibilidad', desc: 'Español, inglés, portugués. Modos accesibles.' },
];

const ventajasBox = [
  {
    title: 'Predecible',
    desc: 'La misma experiencia se ve y responde igual en Bogotá, Medellín o Ciudad de México. Sin sorpresas el día del evento, sin diferencias entre proveedores.',
  },
  {
    title: 'Modular',
    desc: 'Si la experiencia necesita sensores de movimiento, cámara 3D o pantalla táctil, se conectan al mismo equipo base. No cambia toda la infraestructura — solo lo que se le enchufa.',
  },
  {
    title: 'Reutilizable',
    desc: 'Si activa varios eventos al año, la inversión se amortiza desde el segundo evento. Por eso uno de nuestros modelos de contratación es justamente ese: hardware una vez, licencia por evento.',
  },
];

export function Block06_Tecnologia() {
  return (
    <Section id="tecnologia" number="06" title="TECNOLOGÍA">

      {/* 6A — Gen.Box */}
      <div style={{ marginBottom: '6rem' }}>
        <h2 className="text-h2" style={{ marginBottom: '1.5rem', maxWidth: '800px' }}>
          La tecnología no debería ser su problema.
        </h2>
        <p className="text-body" style={{ color: 'var(--gl-text-secondary)', marginBottom: '1rem', maxWidth: '660px', lineHeight: '1.7' }}>
          Detrás de cada activación hay decisiones técnicas que el cliente no debería tener que tomar. ¿Necesita tarjeta gráfica dedicada? ¿Sensores de movimiento? ¿Cámara 3D? ¿Solo un navegador web? Nosotros ya las tomamos por usted.
        </p>
        <p className="text-body" style={{ color: 'var(--gl-text-secondary)', marginBottom: '3rem', maxWidth: '660px', lineHeight: '1.7' }}>
          <strong style={{ color: 'var(--gl-text-primary)' }}>Gen.Box es nuestro enfoque de estandarización técnica.</strong> Cualquier experiencia Gen.Lab — del catálogo o a la medida — puede correr sobre una infraestructura predecible que lleva la potencia justa para que funcione fluido en cualquier parte del mundo. Llega lista, se conecta, opera.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {ventajasBox.map((v, i) => (
            <div key={i} style={{
              backgroundColor: 'var(--gl-bg-elevated)',
              borderRadius: '1rem',
              padding: '1.5rem',
              borderTop: '3px solid var(--gl-blue-primary)',
            }}>
              <p style={{ fontWeight: '700', marginBottom: '0.5rem', color: 'var(--gl-text-primary)', fontSize: 'var(--text-body)' }}>
                {v.title}
              </p>
              <p className="text-small" style={{ color: 'var(--gl-text-secondary)', lineHeight: '1.6' }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6B — Proceso para experiencias a la medida */}
      <div style={{ marginBottom: '6rem' }}>
        <h3 className="text-h3" style={{ marginBottom: '0.5rem' }}>
          Proceso para experiencias a la medida.
        </h3>

        <div style={{
          borderLeft: '3px solid var(--gl-orange)',
          paddingLeft: '1rem',
          backgroundColor: 'rgba(251, 143, 0, 0.06)',
          borderRadius: '0 0.5rem 0.5rem 0',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          maxWidth: '660px',
        }}>
          <p className="text-small" style={{ color: 'var(--gl-text-muted)', lineHeight: '1.6' }}>
            Las experiencias del catálogo se brandean en 5–10 días, sin pasar por las fases 1–3. Esta línea de tiempo aplica a desarrollos originales.
          </p>
        </div>

        <p className="text-body" style={{ color: 'var(--gl-text-secondary)', marginBottom: '2rem', maxWidth: '600px', lineHeight: '1.7' }}>
          Una experiencia a la medida no nace el día del evento. Se construye semanas antes y se mide días después.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {hitos.map((h) => (
            <HitoCard key={h.num} {...h} />
          ))}
        </div>
      </div>

      {/* 6C — Cada experiencia se vuelve suya */}
      <div>
        <h3 className="text-h3" style={{ marginBottom: '0.5rem' }}>
          Cada experiencia se vuelve suya.
        </h3>
        <p className="text-body" style={{ color: 'var(--gl-text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.7' }}>
          Un juego Gen.Lab nunca se ve igual entre dos clientes. Lo personalizamos hasta los detalles que el visitante no nota — pero recuerda.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {personalizaciones.map((p, i) => (
            <PersonalizacionCard key={i} icon={p.icon} title={p.title} desc={p.desc} />
          ))}
        </div>
      </div>

    </Section>
  );
}

function HitoCard({ num, label, period, icon: Icon, desc }) {
  return (
    <div style={{
      flex: '1 1 200px',
      backgroundColor: 'var(--gl-bg-elevated)',
      borderRadius: '1rem',
      padding: '1.5rem',
      borderTop: '3px solid var(--gl-blue-primary)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'var(--gl-blue-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={16} color="white" />
        </div>
        <div>
          <p style={{ fontWeight: '700', fontSize: 'var(--text-small)', color: 'var(--gl-text-primary)' }}>{label}</p>
          <p style={{
            fontSize: 'var(--text-tag)',
            color: 'var(--gl-orange)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {period}
          </p>
        </div>
      </div>
      <p className="text-small" style={{ color: 'var(--gl-text-secondary)', lineHeight: '1.6' }}>
        {desc}
      </p>
    </div>
  );
}

function PersonalizacionCard({ icon: Icon, title, desc }) {
  return (
    <div style={{
      backgroundColor: 'var(--gl-bg-elevated)',
      borderRadius: '1rem',
      padding: '1.25rem',
    }}>
      <Icon size={24} color="var(--gl-blue-primary)" style={{ marginBottom: '0.5rem' }} />
      <p style={{ fontWeight: '700', marginBottom: '0.25rem', color: 'var(--gl-text-primary)', fontSize: 'var(--text-small)' }}>
        {title}
      </p>
      <p style={{ fontSize: 'var(--text-tag)', color: 'var(--gl-text-secondary)', lineHeight: '1.5' }}>
        {desc}
      </p>
    </div>
  );
}
