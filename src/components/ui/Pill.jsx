import React from 'react';
import { cn } from '../../utils/cn';

export function Pill({ active, children, onClick, className }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "btn-pill", 
        active && "active", 
        className
      )}
    >
      {children}
    </button>
  );
}