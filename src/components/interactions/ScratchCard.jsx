import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export function ScratchCard({ category, metric, quote, eco, image }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      fillCanvas();
    };
    
    const fillCanvas = () => {
      if (isRevealed) return;
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#9CA3AF');
      grad.addColorStop(0.5, '#D1D5DB');
      grad.addColorStop(1, '#6B7280');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#374151';
      ctx.font = 'bold 24px Space Grotesk';
      ctx.textAlign = 'center';
      ctx.fillText('RASPE PARA REVELAR', canvas.width/2, canvas.height/2);
    };

    resize();
    window.addEventListener('resize', resize);

    let isDrawing = false;
    let lastCheck = 0;

    const getRevealedPercent = () => {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0, total = 0;
      for (let i = 3; i < data.length; i += 40) {
        total++;
        if (data[i] < 50) cleared++;
      }
      return cleared / total;
    };

    const draw = (e) => {
      if (!isDrawing || isRevealed) return;
      
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();

      const now = Date.now();
      if (now - lastCheck > 200) {
        lastCheck = now;
        const pct = getRevealedPercent();
        if (pct > 0.6) {
          setIsRevealed(true);
          gsap.to(canvas, { opacity: 0, duration: 0.5, onComplete: () => {
            canvas.style.pointerEvents = 'none';
          }});
        }
      }
    };

    canvas.addEventListener('pointerdown', () => isDrawing = true);
    window.addEventListener('pointerup', () => isDrawing = false);
    canvas.addEventListener('pointermove', draw);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isRevealed) {
        setTimeout(() => {
          if (!isRevealed && canvas) {
             ctx.globalCompositeOperation = 'destination-out';
             ctx.beginPath();
             ctx.lineWidth = 40;
             ctx.lineCap = 'round';
             ctx.moveTo(canvas.width - 50, 50);
             ctx.lineTo(canvas.width - 150, 100);
             ctx.stroke();
          }
        }, 6000);
      }
    }, { threshold: 0.5 });
    
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerup', () => isDrawing = false);
      observer.disconnect();
    };
  }, [isRevealed]);

  return (
    <div ref={containerRef} style={{ position: 'relative', flex: '0 0 80vw', maxWidth: '400px', aspectRatio: '3/4', borderRadius: '1rem', overflow: 'hidden', scrollSnapAlign: 'start', backgroundColor: 'var(--gl-bg-elevated)', border: '1px solid var(--gl-gray-dark)' }}>
      {image && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <span className="tag text-secondary" style={{ marginBottom: '1rem', display: 'block' }}>{category}</span>
          <h3 className="text-h2 text-orange" style={{ color: 'var(--gl-orange)', marginBottom: '1rem' }}>{metric}</h3>
        </div>
        <div>
          <p className="text-body" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>"{quote}"</p>
          <span className="tag" style={{ color: 'var(--gl-teal)' }}>ECOSISTEMA: {eco}</span>
        </div>
      </div>

      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', touchAction: 'none', cursor: 'crosshair', opacity: isRevealed ? 0 : 1 }} 
      />
    </div>
  );
}