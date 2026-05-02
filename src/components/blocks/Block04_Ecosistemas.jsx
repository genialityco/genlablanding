import React, { useRef, useEffect, useState } from 'react';
import { Section } from '../layout/Section';
import { useInView } from '../../hooks/useInView';
import { ChevronDown } from 'lucide-react';

const ecosistemas = [
  {
    id: 1,
    title: 'Touch',
    video: '/videos/ecosistema-touch.mp4',
    color: 'var(--gl-blue-primary)',
    tagline: 'Captura íntima. Fricción cero. El visitante toca, juega y deja sus datos sin sentir que llenó un formulario.',
    paraQue: 'Stands comerciales, espacios pequeños, registro de contactos calificados. Cuando lo importante es construir base de datos sin asustar a la gente con un formulario tradicional.',
    emocion: 'Curiosidad inicial, enganche con la mecánica, satisfacción al ganar, orgullo de mostrar el premio. Una experiencia individual que termina en una conversación con su equipo.',
    juegos: [
      { name: 'Digital Scratch & Win — Rasca y Gana Digital', tag: 'Mayor conversión del portafolio', desc: 'El visitante registra sus datos en el tótem y rasca con el dedo una superficie virtual para descubrir un premio con efectos de casino. Tasas de participación superiores al 85%. Ideal para lanzamientos, ferias B2C y activaciones de canal.' },
      { name: 'Concentrése — Memory Brand Match', tag: 'Recordación de marca', desc: 'Cartas boca abajo con sus productos o logos. El visitante busca parejas. Mientras juega, su cerebro observa repetidamente los mensajes clave. Ideal para marcas con catálogo amplio.' },
      { name: 'Brand Match-3 — Estilo Candy Crush brandeado', tag: 'Engagement de alto retorno', desc: 'Iconos personalizados con su logo se alinean en grupos de tres. Ranking en vivo entre asistentes. La gente vuelve al stand varias veces para recuperar el primer puesto. Ideal para activaciones de 2 o más días.' },
      { name: 'Business Simulator', tag: 'Educación corporativa', desc: 'Convierte procesos complejos en decisiones simples y jugables. El usuario gestiona una versión miniatura de su empresa o caso de uso. Ideal para B2B, sector financiero, energía, telecomunicaciones.' },
    ]
  },
  {
    id: 2,
    title: 'Motion & Vision',
    video: '/videos/ecosistema-motion.mp4',
    color: 'var(--gl-orange)',
    tagline: 'El cuerpo como interfaz. Sin contacto, sin controles, sin guantes. Solo movimiento.',
    paraQue: 'Pasillos de alto tráfico y lanzamientos donde necesita un imán visual que detenga a la gente desde lejos. Cuando lo importante es generar espectáculo y un círculo de espectadores.',
    emocion: 'Sorpresa al verse en pantalla, risa al equivocarse, gritos de los amigos animando, atmósfera de estadio. Cada participante atrae a 5 más.',
    tecnologia: 'Cámaras que leen el cuerpo en 3D — la misma tecnología detrás de los Kinect de videojuegos, pero de grado profesional. El sistema detecta los movimientos del usuario en tiempo real y los traduce en acciones dentro de la pantalla.',
    juegos: [
      { name: 'The Gravity Challenge — Reto de reflejos', tag: 'Generador automático de público', desc: 'El usuario se para frente a una pantalla gigante y ve su silueta. Desde arriba caen objetos virtuales — sus productos, descuentos, premios. Levanta los brazos y se mueve para atraparlos. La experiencia más fotogénica del portafolio. Ideal para centros comerciales, pasillos de feria, lanzamientos masivos.' },
      { name: 'Arquero Penaltis Virtual', tag: 'Emoción deportiva de marca', desc: 'El asistente es portero. La cámara mapea su cuerpo. Cuando se dispara un balón virtual, debe estirarse o lanzarse para atajarlo. Genera filas de espera orgánicas y atmósfera de estadio. Ideal para marcas deportivas, cervezas, snacks, patrocinios.' },
      { name: 'Rhythm & Balance Arcade', tag: 'Precisión y estilo kinestésico', desc: 'El sistema detecta el centro de gravedad del jugador. Tiene que mantener una bandeja virtual en equilibrio o seguir el ritmo de la música con taps en el aire. Su marca queda asociada a una sensación física, no a un mensaje. Ideal para licores premium, automotriz, lujo, estilo de vida.' },
    ]
  },
  {
    id: 3,
    title: 'Phygital',
    video: '/videos/ecosistema-phygital.mp4',
    color: 'var(--gl-teal)',
    tagline: 'Lo físico y lo digital colisionan. Una experiencia que se siente con el cuerpo.',
    paraQue: 'Activaciones donde necesita el formato "Hero" — la atracción protagonista que define el evento entero. Cuando quiere algo que haga ruido, ocupe espacio y sea imposible de ignorar.',
    emocion: 'Adrenalina al lanzar, euforia al acertar, complicidad con quien acompaña. Como todos saben jugar tejo o lanzar dardos, nadie siente pena de participar. Facilita el networking espontáneo entre desconocidos.',
    tecnologia: 'Proyectamos sobre una superficie física. Sensores láser detectan el punto exacto de impacto del objeto real con precisión milimétrica y disparan animaciones, sonidos y puntajes en tiempo real.',
    juegos: [
      { name: 'Tejo y Dardos Virtuales — Tradición 4.0', tag: 'Cero curva de aprendizaje', desc: 'Proyectamos la diana o la cancha de tejo sobre una pared. El usuario lanza un dardo de espuma o tejo de goma con su propia fuerza. El láser detecta el impacto y desata animaciones de fuego, sonidos y puntaje automático. Ideal para eventos corporativos, after-office, integraciones de equipo, marcas de bebidas.' },
      { name: 'Precisión Sphera — Muro Interactivo Gran Formato', tag: 'El formato Hero por excelencia', desc: 'Los asistentes patean un balón de fútbol físico contra los objetivos proyectados en la lona. El sistema lee velocidad y dirección, transformando cada disparo en un golazo digital o en la destrucción de bloques. Exige espacio, hace ruido y garantiza ser el ancla de atención. Ideal para patrocinios premium, ferias grandes, centros comerciales.' },
    ]
  }
];

function EcoCard({ eco, index }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const videoRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (inView) videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  }, [inView]);

  return (
    <div
      className="eco-card"
      style={{
        flex: '1 1 300px',
        backgroundColor: 'var(--gl-bg-elevated)',
        borderRadius: '1rem',
        overflow: 'hidden',
        borderTop: `4px solid ${eco.color}`
      }}
      onMouseEnter={() => { if (videoRef.current && window.innerWidth >= 768) videoRef.current.playbackRate = 1.5; }}
      onMouseLeave={() => { if (videoRef.current) videoRef.current.playbackRate = 1; }}
    >
      <div ref={ref} style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000' }}>
        <video
          ref={videoRef}
          src={eco.video}
          muted
          playsInline
          loop
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ padding: '2rem' }}>
        <h3 className="text-h3" style={{ marginBottom: '0.5rem' }}>{eco.title}</h3>
        <p style={{ color: eco.color, fontWeight: '600', fontSize: 'var(--text-body)', marginBottom: '1rem' }}>{eco.tagline}</p>

        <div style={{ marginBottom: '0.75rem' }}>
          <span style={{ fontSize: 'var(--text-tag)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gl-text-muted)' }}>Para qué sirve</span>
          <p className="text-small" style={{ color: 'var(--gl-text-secondary)', marginTop: '0.25rem', lineHeight: '1.55' }}>{eco.paraQue}</p>
        </div>

        {eco.tecnologia && (
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: 'var(--text-tag)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gl-text-muted)' }}>Cómo funciona</span>
            <p className="text-small" style={{ color: 'var(--gl-text-secondary)', marginTop: '0.25rem', lineHeight: '1.55' }}>{eco.tecnologia}</p>
          </div>
        )}

        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{ fontSize: 'var(--text-tag)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gl-text-muted)' }}>Qué emoción genera</span>
          <p className="text-small" style={{ color: 'var(--gl-text-secondary)', marginTop: '0.25rem', lineHeight: '1.55' }}>{eco.emocion}</p>
        </div>

        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: `1px solid ${eco.color}`,
            color: eco.color, borderRadius: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer',
            fontSize: 'var(--text-small)', fontWeight: '700', width: '100%', justifyContent: 'space-between'
          }}
        >
          <span>{open ? 'Ocultar juegos' : `Ver los ${eco.juegos.length} juegos de este ecosistema`}</span>
          <ChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
        </button>

        {open && (
          <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {eco.juegos.map((j, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '1rem', borderLeft: `3px solid ${eco.color}` }}>
                <p style={{ fontWeight: '700', fontSize: 'var(--text-body)', marginBottom: '0.2rem', color: 'var(--gl-text-primary)' }}>{j.name}</p>
                <p style={{ fontSize: 'var(--text-tag)', color: eco.color, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>{j.tag}</p>
                <p className="text-small" style={{ color: 'var(--gl-text-secondary)', lineHeight: '1.55' }}>{j.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Block04_Ecosistemas() {
  return (
    <Section id="ecosistemas" number="04" title="ECOSISTEMAS">
      <style>{`
        .eco-card { transition: transform 0.3s ease; }
        @media (min-width: 768px) { .eco-card:hover { transform: translateY(-8px); } }
      `}</style>

      <div style={{ marginBottom: '4rem', maxWidth: '800px' }}>
        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>
          Tres caminos distintos para lograr lo mismo: que la gente se acerque, se quede y se vaya hablando.
        </h2>
        <p className="text-body-lg" style={{ color: 'var(--gl-text-secondary)', lineHeight: '1.7' }}>
          Cada ecosistema activa un tipo de emoción y de comportamiento. Algunos visitantes prefieren la calma de un tótem táctil donde explorar a su ritmo. Otros se entusiasman cuando ven a alguien saltando frente a una pantalla y se animan a probar. Otros necesitan el ritual físico de patear un balón o lanzar un dardo para sentirse parte del momento.
        </p>
        <p className="text-body" style={{ color: 'var(--gl-text-secondary)', marginTop: '1rem', lineHeight: '1.7' }}>
          Los tres ecosistemas Gen.Lab cubren ese espectro: de lo íntimo a lo espectacular, de lo individual a lo grupal, de lo digital puro a la fusión con el mundo físico. Combinarlos en un mismo evento multiplica el impacto, porque su audiencia nunca es una sola.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {ecosistemas.map((eco, i) => (
          <EcoCard key={eco.id} eco={eco} index={i} />
        ))}
      </div>
    </Section>
  );
}
