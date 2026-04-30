import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Edges, OrbitControls, Html } from '@react-three/drei';
import { Avatar } from './Avatar';
import gsap from 'gsap';
import { useState, useEffect } from 'react';

function Stand({ score, isGameOver }) {
  const isHigh = score >= 8;
  const isMid = score >= 4 && score < 8;

  const outlineColor = (isGameOver && isHigh) ? "#FB8F00" : "#133851";
  const mainColor = (isGameOver && isMid) ? "#01678A" : "#8F9194";

  return (
    <group position={[-5, 0, -2]}>
      {/* Base counter */}
      <mesh position={[2, 1, 2]}>
        <boxGeometry args={[2, 2, 6]} />
        <meshBasicMaterial color={mainColor} />
        <Edges color={outlineColor} scale={1.01} />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 3, 2]}>
        <boxGeometry args={[0.5, 6, 6]} />
        <meshBasicMaterial color={mainColor} />
        <Edges color={outlineColor} scale={1.01} />
      </mesh>

      {/* Screen Placeholder */}
      <mesh position={[0.26, 4, 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial color="#0A1419" />
        <Edges color={outlineColor} scale={1.01} />
      </mesh>

      {/* Top Roof / Header */}
      <mesh position={[2, 6, 2]}>
        <boxGeometry args={[4, 0.5, 6]} />
        <meshBasicMaterial color={mainColor} />
        <Edges color={outlineColor} scale={1.01} />
      </mesh>
    </group>
  );
}

function FloorGrid() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial color="#F4F5F6" />
      </mesh>
      {/* Draw floor grid lines */}
      <gridHelper args={[200, 100, '#E3E4E5', '#E3E4E5']} position={[0, 0, 0]} />
    </group>
  );
}

function AnimatedAvatar({ delay, onCapture, active }) {
  const groupRef = useRef();
  const htmlRef = useRef();
  const [captured, setCaptured] = useState(false);
  const [showTarget, setShowTarget] = useState(false);

  useEffect(() => {
    if (!active || captured) return;
    
    // Spawn animation starting from far Z to close Z
    gsap.fromTo(groupRef.current.position,
      { z: 15 },
      { z: -5, duration: 6, ease: "none", delay: delay }
    );

    // Show target halfway through
    const timer = setTimeout(() => setShowTarget(true), (delay + 3) * 1000);
    const hideTimer = setTimeout(() => setShowTarget(false), (delay + 4.2) * 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    }
  }, [active, captured, delay]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (showTarget && !captured && active) {
      setCaptured(true);
      setShowTarget(false);
      onCapture();
      gsap.killTweensOf(groupRef.current.position);
      // Turn to face the stand (left)
      gsap.to(groupRef.current.rotation, { y: -Math.PI/2, duration: 0.5 });
    }
  };

  return (
    <group ref={groupRef} position={[2, 0, 15]}>
      <Avatar />
      {showTarget && (
        <Html ref={htmlRef} position={[0, 4, 0]} center>
          <div 
            onClick={handleClick}
            style={{
              width: '40px', height: '40px', 
              borderRadius: '50%', 
              border: '3px solid #FB8F00',
              backgroundColor: 'rgba(251, 143, 0, 0.2)',
              cursor: 'pointer',
              pointerEvents: 'auto',
              animation: 'pulse 1s infinite'
            }}
          />
        </Html>
      )}
    </group>
  );
}

export function AttentionChallenge() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setIsGameOver(false);
    setTimeout(() => {
      setIsPlaying(false);
      setIsGameOver(true);
    }, 10000);
  };

  return (
    <div style={{ width: '100%', height: '500px', backgroundColor: 'var(--gl-bg-light)', borderRadius: '1rem', overflow: 'hidden', position: 'relative' }}>
      
      {!isPlaying && !isGameOver && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(244,245,246,0.5)' }}>
           <button onClick={startGame} className="btn btn-primary" style={{ cursor: 'pointer', pointerEvents: 'auto' }}>INICIAR EL RETO</button>
        </div>
      )}

      {isGameOver && (
        <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10, background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#01678A', marginBottom: '0.5rem' }}>Puntaje: {score}</h3>
          {score <= 3 && <p className="text-secondary text-small">Esto es lo que pasa con un stand pasivo. La gente cruza el pasillo y sigue de largo.</p>}
          {score > 3 && score < 8 && <p className="text-secondary text-small">Mejor que el promedio. Pero dejas ir prospectos.</p>}
          {score >= 8 && <p className="text-secondary text-small">Capturaste a casi todos. Esto es Gen.Lab en una feria real: 85% de participación.</p>}
        </div>
      )}

      <Canvas>
        {/* Very low FOV to mimic isometric/orthographic feel, placed far back and above */}
        <PerspectiveCamera makeDefault fov={15} position={[40, 30, 40]} />
        
        {/* Enforce looking at exactly [0,0,0] to maintain isometric illusion */}
        <OrbitControls 
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
          target={[0, 2, 0]} 
        />
        
        <group position={[0, -2, 0]}>
          <FloorGrid />
          <Stand score={score} isGameOver={isGameOver} />
          
          {/* Spawning Avatars */}
          <AnimatedAvatar delay={0} onCapture={() => setScore(s => s + 1)} active={isPlaying} />
          <AnimatedAvatar delay={1.5} onCapture={() => setScore(s => s + 1)} active={isPlaying} />
          <AnimatedAvatar delay={3} onCapture={() => setScore(s => s + 1)} active={isPlaying} />
          <AnimatedAvatar delay={4.5} onCapture={() => setScore(s => s + 1)} active={isPlaying} />
          <AnimatedAvatar delay={6} onCapture={() => setScore(s => s + 1)} active={isPlaying} />
        </group>
        
      </Canvas>
    </div>
  );
}
