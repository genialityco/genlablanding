import React from 'react';
import { cn } from '../../utils/cn';

export function Button({ variant = 'primary', className, children, ...props }) {
  const baseClass = "btn";
  
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
    pill: "btn-pill"
  };

  return (
    <button className={cn(baseClass, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}