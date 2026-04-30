import React from 'react';
import { cn } from '../../utils/cn';

export function Container({ children, className }) {
  return (
    <div className={cn("container", className)}>
      {children}
    </div>
  );
}