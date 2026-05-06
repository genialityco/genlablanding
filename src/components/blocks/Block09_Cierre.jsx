import React from 'react';
import { Section } from '../layout/Section';
import { ActivationBuilder } from '../interactions/ActivationBuilder';
import { Button } from '../ui/Button';
import { Mail, MessageCircle, FileDown } from 'lucide-react';

export function Block09_Cierre() {
  return (
    <Section id="cierre" number="09" title="CIERRE">
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', marginInline: 'auto' }}>
        <h2 className="text-display" style={{ marginBottom: '1.5rem' }}>
          La atención es el recurso más escaso en cualquier espacio.
        </h2>
        <p className="text-body-lg text-secondary" style={{ marginBottom: '2rem' }}>
          Las marcas que ganan no son las que más invierten en espacio. Son las que logran que las personas se detengan, participen y recuerden.
        </p>
        <Button variant="outline" style={{ display: 'inline-flex', marginBottom: '2rem' }}>
          Hablemos de su próxima activación
        </Button>
      </div>

      {/* Puente humano */}
      <div style={{ maxWidth: '700px', marginInline: 'auto', marginBottom: '6rem', textAlign: 'center' }}>
        <h3 className="text-h3" style={{ marginBottom: '2rem' }}>Geniality es una empresa de comunicación.</h3>
        <p className="text-body-lg" style={{ color: 'var(--gl-text-secondary)', lineHeight: '1.8', marginBottom: '1.25rem' }}>
          Llevamos años creando momentos donde las personas se detienen, participan y recuerdan. Algunos de esos momentos terminan en contactos para nuestros clientes. Otros terminan en una foto que un invitado le manda a su familia. Otros terminan en un equipo comercial que vuelve cohesionado de su convención anual.
        </p>
        <p className="text-body-lg" style={{ color: 'var(--gl-text-secondary)', lineHeight: '1.8', marginBottom: '1.25rem' }}>
          Para nosotros los tres importan. Porque la pregunta de fondo no es solo "¿cuántos contactos capté?". Es: ¿hizo la gente algo que no esperaba hacer? ¿Se sorprendió alguien? ¿Se quedó hablando del evento al día siguiente? ¿Volvió alguien al stand sin que se lo pidieran?
        </p>
        <p className="text-body-lg" style={{ color: 'var(--gl-text-secondary)', lineHeight: '1.8' }}>
          Si la respuesta es sí, hicimos bien nuestro trabajo. Y si además los datos lo demuestran, mejor todavía.
        </p>
      </div>

      {/* Constructor */}
      <h3 className="text-h2" style={{ marginBottom: '0.75rem', textAlign: 'center' }}>Construya su activación en 30 segundos.</h3>
      <p className="text-body" style={{ color: 'var(--gl-text-secondary)', textAlign: 'center', marginBottom: '3rem' }}>
        Tres preguntas. Una recomendación a su medida. Y de ahí, una conversación con nosotros.
      </p>
      <ActivationBuilder />

      {/* Canales alternativos */}
      <div style={{ marginTop: '5rem', textAlign: 'center' }}>
        <p className="text-body" style={{ color: 'var(--gl-text-muted)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 'var(--text-tag)', fontWeight: '700' }}>
          ¿Prefiere otro canal para empezar la conversación?
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          <ContactOption
            icon={Mail}
            title="Email"
            desc="Le respondemos en menos de 24 horas con una propuesta inicial."
            action="hola@geniality.com.co"
            href="mailto:hola@geniality.com.co"
          />
          <ContactOption
            icon={MessageCircle}
            title="WhatsApp"
            desc="Para coordinar una reunión rápida o resolver una duda específica."
            action="Escribir ahora"
            href="https://wa.me/573001234567"
          />
          <ContactOption
            icon={FileDown}
            title="Portafolio en PDF"
            desc="Descargue el catálogo completo con todos los juegos, casos y precios actualizados."
            action="Descargar catálogo"
            href="#"
          />
        </div>
      </div>
    </Section>
  );
}

function ContactOption({ icon: Icon, title, desc, action, href }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{
        flex: '1 1 220px', maxWidth: '280px',
        backgroundColor: 'var(--gl-bg-elevated)',
        borderRadius: '1rem',
        padding: '1.75rem',
        textDecoration: 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gl-orange)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none'; }}
    >
      <Icon size={28} color="var(--gl-orange)" />
      <p style={{ fontWeight: '700', color: 'var(--gl-text-primary)', fontSize: 'var(--text-body)' }}>{title}</p>
      <p className="text-small" style={{ color: 'var(--gl-text-secondary)', textAlign: 'center', lineHeight: '1.5' }}>{desc}</p>
      <span style={{ color: 'var(--gl-orange)', fontWeight: '700', fontSize: 'var(--text-small)' }}>{action} →</span>
    </a>
  );
}
