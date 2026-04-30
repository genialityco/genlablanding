import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Pill } from '../ui/Pill';
import { Button } from '../ui/Button';
import { getRecommendation } from '../../data/recommendations';

const questions = [
  {
    id: 'objetivo',
    title: 'Mi objetivo es...',
    options: [
      { id: 'leads', label: 'Captar leads' },
      { id: 'dominar', label: 'Dominar el pasillo' },
      { id: 'educar', label: 'Educar al cliente' },
      { id: 'fidelizar', label: 'Fidelizar canal' }
    ]
  },
  {
    id: 'escala',
    title: 'Mi escala es...',
    options: [
      { id: 'pequeno', label: 'Stand pequeño' },
      { id: 'medio', label: 'Pasillo medio' },
      { id: 'protagonista', label: 'Activación protagonista' }
    ]
  },
  {
    id: 'industria',
    title: 'Mi industria es...',
    options: [
      { id: 'b2c', label: 'B2C masivo' },
      { id: 'b2b', label: 'B2B / Corporativo' },
      { id: 'premium', label: 'Premium / Lujo' },
      { id: 'deportes', label: 'Deportes / Bebidas' },
      { id: 'telecom', label: 'Telecom / Energía' }
    ]
  }
];

export function ActivationBuilder() {
  const [answers, setAnswers] = useState({ objetivo: null, escala: null, industria: null });
  const resultRef = useRef(null);

  const handleAnswer = (qId, optId) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const isComplete = answers.objetivo && answers.escala && answers.industria;
  const recommendation = isComplete ? getRecommendation(answers) : null;

  useEffect(() => {
    if (isComplete && resultRef.current) {
      gsap.fromTo(resultRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [isComplete]);

  return (
    <div style={{ backgroundColor: 'var(--gl-bg-elevated)', borderRadius: '1rem', padding: 'var(--space-block)', border: '1px solid var(--gl-gray-dark)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', marginBottom: isComplete ? '3rem' : 0 }}>
        {questions.map((q, i) => {
          const isAnswered = !!answers[q.id];
          const isNext = i === 0 || !!answers[questions[i-1].id];
          const opacity = isNext || isAnswered ? 1 : 0.4;
          const pointerEvents = isNext || isAnswered ? 'auto' : 'none';
          
          return (
            <div key={q.id} style={{ flex: '1 1 250px', opacity, pointerEvents, transition: 'opacity 0.3s' }}>
              <h3 className="text-body-lg" style={{ marginBottom: '1.5rem', fontWeight: '600' }}>{q.title}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {q.options.map(opt => (
                  <Pill 
                    key={opt.id} 
                    active={answers[q.id] === opt.id}
                    onClick={() => handleAnswer(q.id, opt.id)}
                  >
                    {opt.label}
                  </Pill>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isComplete && recommendation && (
        <div ref={resultRef} style={{ padding: '2rem', backgroundColor: 'var(--gl-bg)', borderRadius: '0.5rem', borderLeft: '4px solid var(--gl-orange)' }}>
          <p className="text-body-lg" style={{ marginBottom: '1.5rem' }}>
            Recomendamos <strong style={{ color: 'var(--gl-orange)' }}>{recommendation.productos.join(' + ')}</strong> en <strong>Modelo {recommendation.modelo}</strong>. 
            <br />Inversión estimada: {recommendation.precio}.
          </p>
          <Button variant="primary" onClick={() => window.location.href = `/agendar?objetivo=${answers.objetivo}`}>
            Agendar 15 minutos con este contexto
          </Button>
        </div>
      )}
    </div>
  );
}