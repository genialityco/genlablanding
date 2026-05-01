import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Edges, OrbitControls, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Avatar } from './Avatar';
import gsap from 'gsap';

function Stand({ score, isGameOver }) {
  const isHigh = score >= 8;
  const isMid = score >= 4 && score < 8;

  const baseOutline = useMemo(() => new THREE.Color("#133851"), []);
  const glowOutline = useMemo(() => new THREE.Color("#FB8F00").multiplyScalar(3), []); 
  const outlineColor = (isGameOver && isHigh) ? glowOutline : baseOutline;
  
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

function SuccessParticles({ active }) {
  const mesh = useRef();
  const count = 100;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 15,
        speed: Math.random() * 0.05 + 0.01
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!active || !mesh.current) return;
    particles.forEach((particle, i) => {
      particle.y += particle.speed;
      if (particle.y > 8) particle.y = -5;
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      {/* Using a strong emissive color to trigger bloom */}
      <meshBasicMaterial color={[5, 2.5, 0]} toneMapped={false} />
    </instancedMesh>
  );
}

function AnimatedAvatar({ delay, onCapture, active, xOffset }) {
  const groupRef = useRef();
  const htmlRef = useRef();
  const [captured, setCaptured] = useState(false);
  const [showTarget, setShowTarget] = useState(false);

  useEffect(() => {
    if (!active) {
       // Reset state when game restarts
       setCaptured(false);
       setShowTarget(false);
       if (groupRef.current) {
         groupRef.current.position.z = 20;
         groupRef.current.rotation.y = 0;
         gsap.killTweensOf(groupRef.current.position);
         gsap.killTweensOf(groupRef.current.rotation);
       }
       return;
    }
    
    // Spawn animation starting from far Z to close Z
    gsap.fromTo(groupRef.current.position,
      { z: 20 },
      { z: -10, duration: 8, ease: "none", delay: delay }
    );

    // Show target halfway through
    const timer = setTimeout(() => setShowTarget(true), (delay + 3.5) * 1000);
    const hideTimer = setTimeout(() => setShowTarget(false), (delay + 4.8) * 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    }
  }, [active, delay]);

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
    <group ref={groupRef} position={[xOffset, 0, 20]}>
      {/* Mixamo models face -Z by default, rotate Math.PI so they walk forward */}
      <Avatar rotation={[0, Math.PI, 0]} />
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
          
          <SuccessParticles active={isGameOver && score >= 8} />

          {/* Spawning 10 Avatars to make it challenging */}
          {[...Array(10)].map((_, i) => (
             <AnimatedAvatar 
                key={i} 
                delay={i * 0.8} 
                xOffset={1 + (Math.random() * 2 - 1)} 
                onCapture={() => setScore(s => s + 1)} 
                active={isPlaying} 
             />
          ))}
        </group>
        
        {/* Postprocessing Bloom. Only colors > 1 will glow (our glowing outlines and particles) */}
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>
        
      </Canvas>
    </div>
  );
}
