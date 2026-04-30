import React from 'react';
import { cn } from '../../utils/cn';
import { BlockNumber } from '../ui/BlockNumber';

export function Section({ id, number, title, children, className, containerClass }) {
  return (
    <section id={id} className={cn("section-block", className)}>
      <div className={cn("container", containerClass)}>
        {(number || title) && <BlockNumber number={number} title={title} />}
        {children}
      </div>
    </section>
  );
}