import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Section } from '../layout/Section';
import {
  MessageSquare, Palette, CalendarCheck, Wrench, Zap, FileText,
  Eye, Package, Volume2, Globe, Tag, BarChart2,
  Briefcase, Rocket, Users, Building2, ShoppingBag, UtensilsCrossed
} from 'lucide-react';

const personalizaciones = [
  { icon: Eye, title: 'Identidad visual completa', desc: 'Colores corporativos, logos, tipografía, fondos animados de marca.' },
  { icon: Package, title: 'Productos y catálogo real', desc: 'Los premios, ítems o personajes son sus productos, no genéricos.' },
  { icon: MessageSquare, title: 'Mensajes y tono de voz', desc: 'Integrados naturalmente en pantallas, transiciones e instrucciones.' },
  { icon: Tag, title: 'Premios y probabilidades', desc: 'Usted define qué se gana y nosotros calibramos las probabilidades según su presupuesto.' },
  { icon: Volume2, title: 'Música y sonido', desc: 'Licencia de música acorde a su marca o composición original.' },
  { icon: Globe, title: 'Idioma y accesibilidad', desc: 'Español, inglés, portugués. Modos accesibles para personas con discapacidad visual o motora.' },
];

const tiposEvento = [
  { icon: BarChart2, title: 'Ferias y exposiciones comerciales', desc: 'Captura de contactos calificados con incentivo de juego. Diferenciación frente a stands vecinos. Datos demográficos exportables.' },
  { icon: Rocket, title: 'Lanzamientos de producto', desc: 'Generar expectativa antes, espectáculo durante, contenido para redes después. Convertir el lanzamiento en algo que se cuenta solo.' },
  { icon: Users, title: 'Activaciones de canal y convenciones', desc: 'Fortalecer relaciones con distribuidores, fuerza de ventas, franquiciados. Competencias internas que generan cohesión y ranking visible.' },
  { icon: Building2, title: 'Eventos corporativos internos', desc: 'Fin de año, integraciones, celebraciones de aniversario. Networking espontáneo entre áreas que no se cruzan en el día a día.' },
  { icon: ShoppingBag, title: 'Centros comerciales y retail experiencial', desc: 'Atraer tráfico hacia el local físico. Convertir el shopping en experiencia social. Datos de afluencia útiles para negociar con marcas.' },
  { icon: UtensilsCrossed, title: 'Restaurantes, bares y venues fijos', desc: 'Acá entra Gen.Terac — nuestra línea hermana para pantallas LED en venues con tráfico continuo. Permanencia más larga, mayor consumo, reportes mensuales.' },
];

const hitos = [
  { num: '1', label: 'Descubrimiento', period: 'Semana 1', icon: MessageSquare, desc: 'Reunión inicial de 45 minutos. Entendemos su objetivo, su audiencia, el tipo de evento y los condicionantes de espacio y presupuesto. Salimos con una propuesta concreta de qué experiencia conviene y por qué.' },
  { num: '2', label: 'Diseño y personalización', period: 'Semanas 2 y 3', icon: Palette, desc: 'Adaptamos la mecánica del juego elegido a su universo de marca. Paleta, logos, productos, sonidos, premios, mensajes clave. Le enviamos previsualizaciones para aprobación.' },
  { num: '3', label: 'Pruebas técnicas', period: 'Semana 4', icon: Wrench, desc: 'Probamos cada experiencia con su contenido cargado. Validamos tiempos, niveles de dificultad, calidad de los reportes y la integración con su CRM si aplica.' },
  { num: '4', label: 'Día del evento', period: 'Día D', icon: Zap, desc: 'Llegamos el día anterior para montar. El día del evento un operador propio acompaña la activación. Cualquier incidente técnico se resuelve en menos de 5 minutos. Su equipo no toca un cable.' },
  { num: '5', label: 'Reporte y siguiente paso', period: '3-5 días después', icon: FileText, desc: 'Entregamos un reporte ejecutivo con todos los datos: participantes, permanencia, perfil demográfico, picos de emoción, base exportable. Y le decimos qué funcionó, qué no, y qué probaríamos diferente la próxima vez.' },
];

export function Block03_Como() {
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const length = lineRef.current.getTotalLength();
    gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
    const tl = gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: '#como',
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: true
      }
    });
    return () => tl.kill();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--gl-bg-light)', color: 'var(--gl-text-on-light)' }}>
      <Section id="como" number="03" title="CÓMO FUNCIONA">

        {/* 3 pasos */}
        <h2 className="text-h2" style={{ marginBottom: '4rem', maxWidth: '800px' }}>
          Así de sencillo y eficiente. Así de potente para su marca.
        </h2>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '6rem' }}>
          <svg style={{ position: 'absolute', top: '50px', left: '10%', width: '80%', height: '2px', zIndex: 0 }} preserveAspectRatio="none">
            <line ref={lineRef} x1="0" y1="1" x2="100%" y2="1" stroke="var(--gl-blue-primary)" strokeWidth="2" />
          </svg>
          <Step number="1" title="Conversamos su intención" text="Comprendemos qué quiere lograr: captar contactos, sorprender invitados, fortalecer su equipo, diferenciarse en un pasillo saturado, lanzar un producto con impacto. Cada intención abre un camino distinto en nuestro portafolio." />
          <Step number="2" title="Diseñamos a su medida" text="Adaptamos la experiencia elegida a su identidad: colores, logos, productos, premios, tono de voz. Le mostramos previsualizaciones antes de cualquier ejecución." />
          <Step number="3" title="Su equipo solo vive el evento" text="Nosotros nos encargamos del montaje, del soporte técnico, de operar en sitio y de entregarle el reporte. Su equipo se enfoca en lo importante: conectar con las personas que se acercan." />
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: '6rem' }}>
          <h3 className="text-h3" style={{ marginBottom: '0.5rem', color: 'var(--gl-text-on-light)' }}>
            Detrás de cada experiencia hay un proceso que cuida cada detalle.
          </h3>
          <p className="text-body" style={{ color: 'var(--gl-gray-dark)', marginBottom: '3rem', maxWidth: '600px' }}>
            Una experiencia Gen.Lab no nace el día del evento. Se construye semanas antes y se mide días después.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {hitos.map((h) => (
              <HitoCard key={h.num} {...h} />
            ))}
          </div>
        </div>

        {/* Grid personalizaciones */}
        <div style={{ marginBottom: '6rem' }}>
          <h3 className="text-h3" style={{ marginBottom: '0.5rem', color: 'var(--gl-text-on-light)' }}>
            Cada experiencia se vuelve suya.
          </h3>
          <p className="text-body" style={{ color: 'var(--gl-gray-dark)', marginBottom: '3rem', maxWidth: '640px' }}>
            Un juego Gen.Lab nunca se ve igual entre dos clientes. Lo personalizamos hasta los detalles que el visitante no nota — pero recuerda.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {personalizaciones.map((p, i) => (
              <GridCard key={i} icon={p.icon} title={p.title} desc={p.desc} />
            ))}
          </div>
        </div>

        {/* Grid tipos de evento */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 className="text-h3" style={{ marginBottom: '0.5rem', color: 'var(--gl-text-on-light)' }}>
            No solo ferias. Cualquier momento de marca importa.
          </h3>
          <p className="text-body" style={{ color: 'var(--gl-gray-dark)', marginBottom: '3rem', maxWidth: '640px' }}>
            Donde haya gente, atención en juego y un mensaje que entregar — ahí tiene sentido Gen.Lab.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {tiposEvento.map((t, i) => (
              <GridCard key={i} icon={t.icon} title={t.title} desc={t.desc} />
            ))}
          </div>
        </div>

        {/* Citas */}
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

function Step({ number, title, text }) {
  return (
    <div style={{ flex: '1 1 250px', position: 'relative', zIndex: 1, backgroundColor: 'var(--gl-bg-light)', padding: '1rem', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--gl-blue-primary)', backgroundColor: 'var(--gl-bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '2rem', fontWeight: '700', color: 'var(--gl-blue-primary)' }}>
        {number}
      </div>
      <p className="text-body-lg" style={{ fontWeight: '700', marginBottom: '0.5rem' }}>{title}</p>
      <p className="text-body" style={{ color: 'var(--gl-gray-dark)' }}>{text}</p>
    </div>
  );
}

function HitoCard({ num, label, period, icon: Icon, desc }) {
  return (
    <div style={{ flex: '1 1 200px', backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', borderTop: '3px solid var(--gl-blue-primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--gl-blue-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={16} color="white" />
        </div>
        <div>
          <p style={{ fontWeight: '700', fontSize: 'var(--text-small)', color: 'var(--gl-text-on-light)' }}>{label}</p>
          <p style={{ fontSize: 'var(--text-tag)', color: 'var(--gl-orange)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{period}</p>
        </div>
      </div>
      <p className="text-small" style={{ color: 'var(--gl-gray-dark)', lineHeight: '1.6' }}>{desc}</p>
    </div>
  );
}

function GridCard({ icon: Icon, title, desc }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <Icon size={28} color="var(--gl-blue-primary)" style={{ marginBottom: '0.75rem' }} />
      <p style={{ fontWeight: '700', marginBottom: '0.4rem', color: 'var(--gl-text-on-light)', fontSize: 'var(--text-body)' }}>{title}</p>
      <p className="text-small" style={{ color: 'var(--gl-gray-dark)', lineHeight: '1.5' }}>{desc}</p>
    </div>
  );
}

function StatQuote({ stat, text, source }) {
  return (
    <div style={{ flex: '1 1 280px', borderLeft: '4px solid var(--gl-orange)', paddingLeft: '1.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
      <p style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: 'var(--gl-blue-primary)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{stat}</p>
      <p className="text-body" style={{ color: 'var(--gl-text-on-light)', margin: '0.5rem 0' }}>{text}</p>
      <p className="text-small" style={{ color: 'var(--gl-gray-mid)', fontStyle: 'italic' }}>Fuente: {source}</p>
    </div>
  );
}
