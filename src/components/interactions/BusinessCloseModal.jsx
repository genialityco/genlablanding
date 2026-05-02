import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';

const CHALLENGE_DURATION = 5;
const TARGET_START = 0.3;
const TARGET_END = 0.7;
const INDICATOR_SPEED = 1; //bigger faster (1 completes the indicator path in 1 second)

function SignatureLine({ phase, indicatorRef, lineRef, isMobile }) {
  const indicatorSize = isMobile ? 20 : 16;

  return (
    <div
      ref={lineRef}
      style={{
        position: 'relative',
        width: isMobile ? '100%' : '380px',
        height: isMobile ? '64px' : '60px',
        background: '#F0EDE5',
        border: '1px solid #1A2530',
        borderRadius: '2px',
        margin: '0 auto',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Dashed center line */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '0',
        right: '0',
        height: '0',
        borderTop: '1px dashed rgba(26,37,48,0.35)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      {/* Target zone — solid line segment */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '40%',
        width: '20%',
        height: '0',
        borderTop: '2px solid rgba(251,143,0,0.5)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      {/* Target zone — color bar at bottom */}
      <div style={{
        position: 'absolute',
        bottom: '5px',
        left: '40%',
        width: '20%',
        height: '4px',
        background: '#FB8F00',
        opacity: 0.45,
        borderRadius: '2px',
        pointerEvents: 'none',
        animation: 'targetPulse 600ms ease-in-out infinite alternate',
      }} />

      {/* Moving indicator */}
      {phase !== 'success' && phase !== 'failure' && (
        <div
          ref={indicatorRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            width: `${indicatorSize}px`,
            height: `${indicatorSize}px`,
            background: '#FB8F00',
            border: '2px solid #fff',
            borderRadius: '50%',
            transform: 'translateY(-50%)',
            boxShadow: '0 2px 6px rgba(251,143,0,0.4)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Success: drawn signature SVG */}
      {phase === 'success' && (
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox="0 0 380 60"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 148 30 C 165 16, 185 44, 210 28 C 225 18, 232 36, 232 30"
            stroke="#1A2530"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            className="signature-path"
          />
        </svg>
      )}
    </div>
  );
}

export function BusinessCloseModal({ isVisible, onSuccess, onFailure, isMobile }) {
  const [phase, setPhase] = useState('idle'); // idle | entering | active | success | failure
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const [showBonus, setShowBonus] = useState(false);

  const modalRef = useRef();
  const contractRef = useRef();
  const indicatorRef = useRef();
  const lineRef = useRef();
  const tweenRef = useRef();
  const timerIntervalRef = useRef();

  const hasActedRef = useRef(false);
  const phaseRef = useRef('idle');
  const pausedRef = useRef(false);
  const lastTickRef = useRef(0);
  const remainingRef = useRef(CHALLENGE_DURATION);

  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  const setPhaseSync = useCallback((p) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const cleanup = useCallback(() => {
    if (tweenRef.current) { tweenRef.current.kill(); tweenRef.current = null; }
    if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; }
  }, []);

  const finishAndClose = useCallback((success) => {
    const delay = success ? 1200 : 900;
    setTimeout(() => {
      if (success) onSuccess();
      else onFailure();
    }, delay);
  }, [onSuccess, onFailure]);

  const handleSuccess = useCallback(() => {
    if (hasActedRef.current) return;
    hasActedRef.current = true;
    cleanup();
    setPhaseSync('success');
    setShowBonus(true);

    console.log('TELEMETRY: block2_close_success', {
      time_to_click: Math.round((CHALLENGE_DURATION - remainingRef.current) * 1000),
    });

    if (contractRef.current) {
      gsap.fromTo(contractRef.current,
        { backgroundColor: '#ffffff' },
        { backgroundColor: '#FAFAF7', duration: 0.08, onComplete: () => {
          setTimeout(() => {
            if (contractRef.current) {
              gsap.to(contractRef.current, {
                rotation: 1, duration: 0.06, yoyo: true, repeat: 3, ease: 'none',
                onComplete: () => gsap.set(contractRef.current, { rotation: 0 }),
              });
            }
          }, 300);
        }}
      );
    }

    finishAndClose(true);
  }, [cleanup, setPhaseSync, finishAndClose]);

  const handleFailure = useCallback((reason = 'out_of_zone') => {
    if (hasActedRef.current) return;
    hasActedRef.current = true;
    cleanup();
    setPhaseSync('failure');

    console.log('TELEMETRY: block2_close_failure', {
      reason,
      time_to_click: reason === 'timeout' ? null : Math.round((CHALLENGE_DURATION - remainingRef.current) * 1000),
    });

    finishAndClose(false);
  }, [cleanup, setPhaseSync, finishAndClose]);

  const handleClick = useCallback(() => {
    if (phaseRef.current !== 'active' || hasActedRef.current) return;

    if (reducedMotion) {
      handleSuccess();
      return;
    }

    if (!indicatorRef.current || !lineRef.current) return;

    const indRect = indicatorRef.current.getBoundingClientRect();
    const lineRect = lineRef.current.getBoundingClientRect();
    const indCenter = indRect.left + indRect.width / 2;
    const relPos = (indCenter - lineRect.left) / lineRect.width;

    if (relPos >= TARGET_START && relPos <= TARGET_END) {
      handleSuccess();
    } else {
      handleFailure('out_of_zone');
    }
  }, [reducedMotion, handleSuccess, handleFailure]);

  // Mount/unmount based on visibility
  useEffect(() => {
    if (!isVisible) {
      cleanup();
      setPhaseSync('idle');
      setTimeLeft(CHALLENGE_DURATION);
      setShowBonus(false);
      hasActedRef.current = false;
      remainingRef.current = CHALLENGE_DURATION;
      return;
    }

    hasActedRef.current = false;
    remainingRef.current = CHALLENGE_DURATION;
    setTimeLeft(CHALLENGE_DURATION);
    setPhaseSync('entering');

    const enterAnim = () => {
      if (contractRef.current) {
        gsap.fromTo(contractRef.current,
          { scale: 0.92, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.28, ease: 'back.out(1.4)',
            onComplete: () => {
              setTimeout(() => {
                if (!isVisible) return;
                setPhaseSync('active');
                console.log('TELEMETRY: block2_close_triggered');
              }, 200);
            },
          }
        );
      }
      if (modalRef.current) {
        gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28 });
      }
    };

    // rAF so refs are attached to DOM
    requestAnimationFrame(enterAnim);
  }, [isVisible, cleanup, setPhaseSync]); // eslint-disable-line react-hooks/exhaustive-deps

  // Start indicator + timer when active
  useEffect(() => {
    if (phase !== 'active') return;

    if (!reducedMotion && lineRef.current && indicatorRef.current) {
      const lineWidth = lineRef.current.offsetWidth;
      const indWidth = indicatorRef.current.offsetWidth;
      const maxX = lineWidth - indWidth;

      tweenRef.current = gsap.to(indicatorRef.current, {
        x: maxX,
        duration: 1/INDICATOR_SPEED,
        ease: 'none',
        yoyo: true,
        repeat: -1,
      });
    }

    lastTickRef.current = performance.now();
    timerIntervalRef.current = setInterval(() => {
      if (pausedRef.current) {
        lastTickRef.current = performance.now();
        return;
      }
      const now = performance.now();
      const delta = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      remainingRef.current = Math.max(0, remainingRef.current - delta);
      setTimeLeft(remainingRef.current);

      if (remainingRef.current <= 0) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        handleFailure('timeout');
      }
    }, 50);

    return cleanup;
  }, [phase, reducedMotion, cleanup, handleFailure]);

  // Tab visibility — pause everything
  useEffect(() => {
    const onVisChange = () => {
      if (document.hidden) {
        pausedRef.current = true;
        if (tweenRef.current) tweenRef.current.pause();
      } else {
        pausedRef.current = false;
        if (tweenRef.current) tweenRef.current.resume();
      }
    };
    document.addEventListener('visibilitychange', onVisChange);
    return () => document.removeEventListener('visibilitychange', onVisChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isVisible) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        console.log('TELEMETRY: block2_close_skipped');
        if (!hasActedRef.current) {
          hasActedRef.current = true;
          cleanup();
          setPhaseSync('idle');
          setTimeout(() => onFailure(), 50);
        }
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isVisible, handleClick, cleanup, setPhaseSync, onFailure]);

  if (!isVisible && phase === 'idle') return null;

  const headerText =
    phase === 'success' ? 'CONTRATO FIRMADO' :
    phase === 'failure' ? 'CONTRATO PENDIENTE' :
    'CONTRATO DE ACTIVACIÓN';

  const headerColor = phase === 'success' ? '#FB8F00' : '#1A2530';

  return (
    <div
      ref={modalRef}
      onClick={handleClick}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(10,20,25,0.82)',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: phase === 'active' ? 'pointer' : 'default',
        touchAction: 'manipulation',
      }}
    >
      <div
        ref={contractRef}
        style={{
          background: '#FAFAF7',
          border: '1.5px solid #1A2530',
          borderRadius: '4px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
          padding: isMobile ? '1.5rem 1.25rem' : '2rem 2rem',
          width: isMobile ? '92vw' : '480px',
          maxWidth: '520px',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: isMobile ? '18px' : '22px',
            color: headerColor,
            letterSpacing: '0.08em',
            marginBottom: '8px',
            transition: 'color 0.2s',
          }}>
            {headerText}
          </div>
          <div style={{ width: '60px', height: '2px', background: headerColor, margin: '0 auto', transition: 'background 0.2s' }} />
        </div>

        {/* Contract body */}
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: isMobile ? '12px' : '14px',
          color: '#1A2530',
          lineHeight: '1.7',
          marginBottom: '1.5rem',
        }}>
          <div><span style={{ fontWeight: 600 }}>Cliente: </span><span>Decisor con presupuesto</span></div>
          <div><span style={{ fontWeight: 600 }}>Servicio: </span><span>Activación Gen.Lab</span></div>
          <div><span style={{ fontWeight: 600 }}>Valor del cierre: </span><span style={{ color: '#FB8F00', fontWeight: 600 }}>×5</span></div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(26,37,48,0.12)', margin: '0 0 1.25rem 0' }} />

        {/* "FIRMA AQUÍ" label */}
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: '12px',
          color: 'rgba(26,37,48,0.55)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
          textAlign: 'center',
        }}>
          FIRMA AQUÍ
        </div>

        {/* Signature line or reduced-motion button */}
        {!reducedMotion ? (
          <SignatureLine
            phase={phase}
            indicatorRef={indicatorRef}
            lineRef={lineRef}
            isMobile={isMobile}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            {(phase === 'active' || phase === 'entering') && (
              <button
                onClick={(e) => { e.stopPropagation(); handleClick(); }}
                style={{
                  padding: '0.9rem 2rem',
                  background: '#FB8F00',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  fontFamily: 'Space Grotesk, sans-serif',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                CERRAR NEGOCIO
              </button>
            )}
          </div>
        )}

        {/* Timer */}
        {(phase === 'active' || phase === 'entering') && (
          <div style={{
            textAlign: 'center',
            marginTop: '0.75rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: isMobile ? '14px' : '12px',
            color: 'rgba(26,37,48,0.55)',
          }}>
            Tiempo: {timeLeft.toFixed(1)}s
          </div>
        )}

        {/* Success: +12 floating text */}
        {phase === 'success' && showBonus && (
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '48px',
            color: '#FB8F00',
            textShadow: '0 2px 8px rgba(251,143,0,0.4)',
            animation: 'closeBonusFloat 1.2s ease-out forwards',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}>
            +12
          </div>
        )}

        {/* Failure: stamp */}
        {phase === 'failure' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 5,
          }}>
            <div style={{
              border: '4px solid #DC2626',
              borderRadius: '4px',
              padding: '10px 18px',
              transform: 'rotate(-8deg)',
              background: 'rgba(255,255,255,0.9)',
              animation: 'stampAppear 320ms cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}>
              <span style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: isMobile ? '15px' : '18px',
                color: '#DC2626',
                opacity: 0.85,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'block',
              }}>
                EL CLIENTE LO PENSARÁ
              </span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes closeBonusFloat {
          from { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
          to   { transform: translateX(-50%) translateY(-70px) scale(1.15); opacity: 0; }
        }
        @keyframes stampAppear {
          0%   { transform: rotate(-8deg) scale(0); opacity: 0; }
          70%  { transform: rotate(-8deg) scale(1.08); opacity: 0.9; }
          100% { transform: rotate(-8deg) scale(1); opacity: 0.85; }
        }
        @keyframes targetPulse {
          from { opacity: 0.35; }
          to   { opacity: 0.65; }
        }
        .signature-path {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: drawSignature 400ms ease-out 80ms forwards;
        }
        @keyframes drawSignature {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .signature-path { animation: none; stroke-dashoffset: 0; }
          @keyframes closeBonusFloat { from { opacity: 1; } to { opacity: 0; } }
          @keyframes stampAppear { from { opacity: 0; } to { opacity: 0.85; } }
          @keyframes targetPulse { from { opacity: 0.5; } to { opacity: 0.5; } }
        }
      `}</style>
    </div>
  );
}
