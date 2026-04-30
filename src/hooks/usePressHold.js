import { useRef } from 'react';

export function usePressHold({ duration = 1500, onComplete, onCancel }) {
  const timerRef = useRef(null);
  const startPosRef = useRef(null);

  const onPointerDown = (e) => {
    startPosRef.current = { x: e.clientX, y: e.clientY };
    timerRef.current = setTimeout(onComplete, duration);
  };

  const onPointerMove = (e) => {
    if (!startPosRef.current) return;
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    // Increased tolerance to 30px so natural finger/mouse tremors don't cancel it
    if (Math.sqrt(dx*dx + dy*dy) > 30) {
      clearTimeout(timerRef.current);
      onCancel?.();
      startPosRef.current = null;
    }
  };

  const onPointerUp = () => {
    clearTimeout(timerRef.current);
    startPosRef.current = null;
    onCancel?.();
  };

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp };
}