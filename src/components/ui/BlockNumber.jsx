import React from 'react';

export function BlockNumber({ number, title }) {
  if (!number) return null;
  return (
    <div className="block-number text-muted font-display" style={{ marginBottom: 'var(--space-block)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', gap: '0.5em' }}>
      <span>{number}</span>
      <span>—</span>
      <span style={{ textTransform: 'uppercase' }}>{title}</span>
    </div>
  );
}