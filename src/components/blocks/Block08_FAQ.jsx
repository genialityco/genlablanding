import React, { useState } from 'react';
import { Section } from '../layout/Section';
import { faqData } from '../../data/faq';

export function Block08_FAQ() {
  const [openCount, setOpenCount] = useState(0);

  const handleToggle = (e) => {
    const details = e.target.closest('details');
    if (!details) return;
    
    setTimeout(() => {
      const openItems = document.querySelectorAll('details[open]').length;
      setOpenCount(openItems);
    }, 10);
  };

  return (
    <Section id="faq" number="11" title="FAQ">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 300px', position: 'sticky', top: '100px' }}>
          <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Preguntas frecuentes</h2>
          <div style={{ padding: '1rem', backgroundColor: 'var(--gl-bg-elevated)', borderRadius: '0.5rem', display: 'inline-block' }}>
            <span className="text-orange" style={{ color: 'var(--gl-orange)', fontWeight: '700', fontSize: '1.5rem' }}>{openCount}</span>
            <span className="text-secondary"> / 13 resueltas</span>
          </div>
        </div>
        
        <div style={{ flex: '1 1 500px' }} onClick={handleToggle}>
          <style>{`
            details { border-bottom: 1px solid var(--gl-gray-dark); padding: 1.5rem 0; }
            details summary { cursor: pointer; font-weight: 700; font-family: var(--font-display); font-size: 1.25rem; outline: none; list-style: none; display: flex; justify-content: space-between; align-items: center; }
            details summary::-webkit-details-marker { display: none; }
            details summary::after { content: '+'; color: var(--gl-orange); font-size: 1.5rem; transition: transform 0.3s; }
            details[open] summary::after { content: '-'; transform: rotate(180deg); }
            details p { margin-top: 1rem; color: var(--gl-text-secondary); line-height: 1.6; }
          `}</style>
          
          {faqData.map((faq, i) => (
            <details key={i}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}