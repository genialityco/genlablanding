import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Edges, OrbitControls, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Avatar } from './Avatar';
import gsap from 'gsap';
import { BusinessCloseModal } from './BusinessCloseModal';

// Optional: you can hook into a real reduced motion hook if available
// import { useReducedMotion } from 'framer-motion';

const ARCHETYPES = {
  GRAY:   { id: 'GRAY', color: '#8F9194', outlineColor: '#6D6E71', value: 1, walkDuration: 6.0, symbol: 'circle' },
  BLUE:   { id: 'BLUE', color: '#346783', outlineColor: '#133851', value: 2, walkDuration: 5.0, symbol: 'square' },
  ORANGE: { id: 'ORANGE', color: '#FB8F00', outlineColor: '#C97300', value: 3, walkDuration: 4.0, symbol: 'star' },
};

const DIFFICULTY_PRESETS = {
  TRANQUILO: { speedMultiplier: 1.0, scoreMultiplier: 1.0, storageKey: 'genlab_block2_best_tranquilo' },
  NORMAL:    { speedMultiplier: 1.3, scoreMultiplier: 1.5, storageKey: 'genlab_block2_best_normal' },
  EXTREMO:   { speedMultiplier: 1.7, scoreMultiplier: 2.5, storageKey: 'genlab_block2_best_extremo' },
};

function buildSpawnQueue(isMobile) {
  const grays = isMobile ? 4 : 6;
  const blues = isMobile ? 3 : 4;
  const oranges = isMobile ? 1 : 2;

  let queue = [
    ...Array(grays).fill(ARCHETYPES.GRAY),
    ...Array(blues).fill(ARCHETYPES.BLUE),
    ...Array(oranges).fill(ARCHETYPES.ORANGE),
  ];
  
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
  
  // Constraint: no orange in first 4 spawns
  for (let i = 0; i < Math.min(4, queue.length); i++) {
    if (queue[i].id === 'ORANGE') {
      const grayIdx = queue.findIndex((a, idx) => idx > i && a.id === 'GRAY');
      if (grayIdx !== -1) {
        [queue[i], queue[grayIdx]] = [queue[grayIdx], queue[i]];
      }
    }
  }

  if (!isMobile && queue.filter((q, i) => i >= queue.length - 4).every(q => q.id !== 'ORANGE')) {
      const firstOrange = queue.findIndex(q => q.id === 'ORANGE');
      if (firstOrange !== -1) {
          const target = queue.length - 1 - Math.floor(Math.random() * 3);
          [queue[firstOrange], queue[target]] = [queue[target], queue[firstOrange]];
      }
  }
  return queue;
}

function Stand({ score, isGameOver, streak }) {
  const isHigh = score >= 19;
  const isMid = score >= 9 && score < 19;

  const baseOutline = useMemo(() => new THREE.Color("#133851"), []);
  const glowOutline = useMemo(() => new THREE.Color("#FB8F00").multiplyScalar(3), []); 
  const outlineColor = (isGameOver && isHigh) ? glowOutline : baseOutline;
  
  const mainColor = (isGameOver && (isMid || isHigh)) ? "#01678A" : "#8F9194";

  const groupRef = useRef();
  
  // Streak vibration
  useFrame(({ clock }) => {
    if (groupRef.current) {
       if (streak >= 3) {
         groupRef.current.position.y = -2 + Math.sin(clock.getElapsedTime() * 40) * 0.05;
       } else {
         groupRef.current.position.y = -2;
       }
    }
  });

  return (
    <group ref={groupRef} position={[-5, -2, -2]}>
      <mesh position={[2, 1, 2]}>
        <boxGeometry args={[2, 2, 6]} />
        <meshBasicMaterial color={mainColor} />
        <Edges color={outlineColor} scale={1.01} />
      </mesh>
      <mesh position={[0, 3, 2]}>
        <boxGeometry args={[0.5, 6, 6]} />
        <meshBasicMaterial color={mainColor} />
        <Edges color={outlineColor} scale={1.01} />
      </mesh>
      <mesh position={[0.26, 4, 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial color={isGameOver && isHigh ? "#FB8F00" : "#0A1419"} />
        <Edges color={outlineColor} scale={1.01} />
      </mesh>
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
      <meshBasicMaterial color={[5, 2.5, 0]} toneMapped={false} />
    </instancedMesh>
  );
}

function CaptureZone({ isPlaying }) {
  const matRef = useRef();
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.opacity = isPlaying ? 0.25 + Math.sin(clock.getElapsedTime() * 4) * 0.05 : 0.2;
    }
  });
  return (
    <mesh position={[1, 0.01, -2]} rotation={[-Math.PI/2, 0, Math.PI/4]}>
      <planeGeometry args={[3, 3]} />
      <meshBasicMaterial ref={matRef} color="#FB8F00" transparent opacity={0.2} />
      <Edges color="#FB8F00" transparent opacity={isPlaying ? 1 : 0.6} />
    </mesh>
  );
}

function CooldownRing() {
  const circumference = 163.36;
  return (
    <svg className="cooldown-ring" viewBox="0 0 60 60" width="56" height="56" style={{ overflow: 'visible' }}>
      <circle cx="30" cy="30" r="26" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="6" fill="none" />
      <circle cx="30" cy="30" r="26" stroke="#FB8F00" strokeWidth="6" fill="none"
        strokeDasharray={circumference} strokeDashoffset="0" strokeLinecap="round"
        transform="rotate(-90 30 30)" className="cooldown-progress" />
    </svg>
  );
}

const MagnetButton = React.forwardRef(({ isMobile, buttonBg, stripeStyle, onPress, isPlaying, cooldown, setCooldown }, ref) => {
  const [justPressed, setJustPressed] = useState(false);
  const [readyFlash, setReadyFlash] = useState(false);
  const [shake, setShake] = useState(false);

  const handlePress = useCallback(() => {
    if (!isPlaying) return;
    
    if (cooldown) {
      setShake(true);
      setTimeout(() => setShake(false), 200);
      console.log('TELEMETRY: block2_cooldown_blocked');
      return;
    }

    setJustPressed(true);
    setTimeout(() => setJustPressed(false), 160);

    onPress();

    setCooldown(true);
    setTimeout(() => {
      setCooldown(false);
      setReadyFlash(true);
      setTimeout(() => setReadyFlash(false), 240);
    }, 700);
  }, [isPlaying, cooldown, onPress, setCooldown]);

  React.useImperativeHandle(ref, () => ({
      trigger: () => handlePress()
  }));

  return (
    <button 
      className={`magnet-button ${justPressed ? 'just-pressed' : ''} ${shake ? 'shake' : ''} ${readyFlash ? 'ready-flash' : ''}`}
      onClick={handlePress}
      style={{
          width: '100%',
          height: isMobile ? '88px' : '80px',
          background: buttonBg,
          border: 'none',
          borderRadius: isMobile ? '16px 16px 0 0' : '12px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          touchAction: 'manipulation'
      }}
    >
      <div style={{ width: '100%', height: '6px', ...stripeStyle, transition: 'background 0.2s ease' }} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         {cooldown ? (
            <div className="cooldown-content">
              <CooldownRing />
              <span className="cooldown-label">RECARGANDO</span>
            </div>
         ) : (
            <span className="button-label" style={{ color: '#fff', fontSize: isMobile ? '28px' : '24px', fontWeight: 'bold', fontFamily: 'Space Grotesk, sans-serif' }}>
               ACTIVAR IMÁN
            </span>
         )}
      </div>
    </button>
  );
});

function MagnetBlasts({ blasts }) {
  return (
    <>
      {blasts.map(b => (
        <BlastRing key={b.id} />
      ))}
    </>
  );
}

function BlastRing() {
  const ringRef = useRef();
  const materialRef = useRef();
  
  useFrame((state, delta) => {
    if (ringRef.current && materialRef.current) {
      ringRef.current.scale.x += delta * 15;
      ringRef.current.scale.y += delta * 15;
      materialRef.current.opacity -= delta * 2;
    }
  });

  return (
    <mesh ref={ringRef} position={[1, 0.02, -2]} rotation={[-Math.PI/2, 0, Math.PI/4]}>
      <ringGeometry args={[1, 1.2, 32]} />
      <meshBasicMaterial ref={materialRef} color="#FB8F00" transparent opacity={0.8} depthWrite={false} />
    </mesh>
  );
}

function AvatarMesh({ data, reducedMotion, difficulty, isGamePaused }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
       groupRef.current.visible = data.visible;
       if (data.visible) {
           groupRef.current.position.z = data.z;
           groupRef.current.position.x = data.x;
           if (data.captured) {
               groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, -Math.PI/2, 0.1);
           } else {
               groupRef.current.rotation.y = 0;
           }
       }
    }
  });

  const config = difficulty ? DIFFICULTY_PRESETS[difficulty] : DIFFICULTY_PRESETS.TRANQUILO;
  const timeScale = (4.0 / data.type.walkDuration) * config.speedMultiplier;

  return (
    <group ref={groupRef} position={[data.x, 0, data.z]} visible={false}>
      <Avatar
        rotation={[0, Math.PI, 0]}
        archetype={{ ...data.type, walkSpeed: timeScale }}
        paused={data.paused || isGamePaused || (reducedMotion && !data.captured)}
        isCaptured={data.captured}
      />
    </group>
  );
}

function GameEngine({ isPlaying, isGamePausedRef, pauseStartClockRef, totalPausedTimeRef, avatarsRef, reducedMotion, onUiStateChange, onMiss, endGame, startTimeRef, difficulty, timerUiRef, hasAutoActivatedRef, onAutoActivate }) {
   useFrame((state, delta) => {
     if (!isPlaying) return;

     if (isGamePausedRef.current) {
       if (pauseStartClockRef.current === 0) {
         pauseStartClockRef.current = state.clock.elapsedTime;
       }
       return;
     }

     if (pauseStartClockRef.current > 0) {
       totalPausedTimeRef.current += state.clock.elapsedTime - pauseStartClockRef.current;
       pauseStartClockRef.current = 0;
     }

     if (startTimeRef.current === 0) {
         startTimeRef.current = state.clock.elapsedTime;
     }
     const gameTime = state.clock.elapsedTime - startTimeRef.current - totalPausedTimeRef.current;
     
     if (gameTime >= 4.45 && !hasAutoActivatedRef.current) {
         hasAutoActivatedRef.current = true;
         if (onAutoActivate) onAutoActivate();
     }
     
     const config = difficulty ? DIFFICULTY_PRESETS[difficulty] : DIFFICULTY_PRESETS.TRANQUILO;
     const gameDuration = 20.0; // Strictly 20s
     const timeLeft = Math.max(0, gameDuration - gameTime);

     if (timerUiRef.current) {
         timerUiRef.current.innerText = timeLeft.toFixed(1) + 's';
     }
     
     if (gameTime >= gameDuration) {
         endGame('timer_end');
         return;
     }

     let active = null;
     let next = null;
     const avatars = avatarsRef.current;
     
     avatars.forEach((av) => {
       if (av.captured || av.exited) return;
       
       if (gameTime < av.spawnTime) return;
       av.visible = true;
       
       if (reducedMotion) {
           if (gameTime < av.spawnTime + 1.5) {
               av.z = -2;
               av.x = 1;
           } else {
               av.exited = true;
               av.visible = false;
           }
       } else {
           const pathLength = 30; // Z=20 to Z=-10
           const speed = (pathLength / av.type.walkDuration) * config.speedMultiplier;
           
           if (av.type.id === 'ORANGE' && !av.hasFaked && (av.z - (-2)) > 1.0 && (av.z - (-2)) < 2.0) {
              if (av.fakeTimer === 0) av.fakeTimer = 0.3 / config.speedMultiplier;
           }
           
           if (av.fakeTimer > 0) {
             av.fakeTimer -= delta;
             av.paused = true;
           } else {
             av.paused = false;
             av.hasFaked = true;
             
             av.z -= speed * delta;
             const timeOffset = gameTime + av.id * 10;
             av.x = av.baseX + Math.sin(timeOffset * 3) * 0.05; // very subtle wobble
           }
           
           if (av.z < -10) {
             av.exited = true;
             av.visible = false;
           }
       }
     });

     const CAPTURE_Z = -2;
     
     const uncaptured = avatars.filter(a => a.visible && !a.captured && !a.exited);
     uncaptured.sort((a, b) => a.z - b.z); 
     
     const inZone = uncaptured.find(a => {
         const speed = (30 / a.type.walkDuration) * config.speedMultiplier;
         const windowTolerance = (speed * 0.4) / 2;
         return Math.abs(a.z - CAPTURE_Z) <= windowTolerance;
     });
     active = inZone || null;
     
     if (active) {
       next = uncaptured.find(a => a.id !== active.id) || null;
     } else {
       next = uncaptured[0] || null;
     }

     const recentlyExited = avatars.find(a => a.exited && !a.captured && !a.missLogged);
     if (recentlyExited) {
       recentlyExited.missLogged = true;
       onMiss(recentlyExited);
     }
     
     onUiStateChange(active, next);
   });

   return null;
}

export function AttentionChallenge() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [captures, setCaptures] = useState({ GRAY: 0, BLUE: 0, ORANGE: 0 });
  const [missedOrange, setMissedOrange] = useState(0);
  
  const [activeAvatar, setActiveAvatar] = useState(null);
  const [nextAvatar, setNextAvatar] = useState(null);
  
  const [feedbacks, setFeedbacks] = useState([]);
  const [blasts, setBlasts] = useState([]);
  const [flashColor, setFlashColor] = useState(null);
  
  const avatarsRef = useRef([]);
  const startTimeRef = useRef(0);
  const timerUiRef = useRef(null);
  const magnetButtonRef = useRef(null);
  const hasAutoActivatedRef = useRef(false);

  // Business close challenge
  const [businessChallengeActive, setBusinessChallengeActive] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const isGamePausedRef = useRef(false);
  const pauseStartClockRef = useRef(0);
  const totalPausedTimeRef = useRef(0);
  
  const isMobile = window.innerWidth < 768;
  const reducedMotion = false; // Could hook to useReducedMotion()

  const [cooldown, setCooldown] = useState(false);
  const [scoreFlash, setScoreFlash] = useState(false);

  const [difficulty, setDifficulty] = useState(null);
  const [showDifficultySelector, setShowDifficultySelector] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const endGame = useCallback((reason = 'timer_end') => {
    setIsPlaying(false);
    setIsGameOver(true);
    
    setScore(currentScore => {
        setFinalScore(prev => {
           const calc = Math.round(currentScore * (difficulty ? DIFFICULTY_PRESETS[difficulty].scoreMultiplier : 1.0));
           const key = difficulty ? DIFFICULTY_PRESETS[difficulty].storageKey : 'genlab_block2_best_tranquilo';
           const saved = parseInt(localStorage.getItem(key) || '0', 10);
           if (calc > saved) {
               localStorage.setItem(key, calc.toString());
           }
           return calc;
        });
        return currentScore;
    });
  }, [difficulty]);

  const handleInitiate = () => {
      setIsGameOver(false);
      setShowInstructions(true);
  };

  const handleStartFromInstructions = () => {
      setShowInstructions(false);
      setShowDifficultySelector(true);
  };

  const onAutoActivate = useCallback(() => {
      if (magnetButtonRef.current) {
          magnetButtonRef.current.trigger();
      }
  }, []);

  const startGame = useCallback((selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setShowDifficultySelector(false);

    const config = DIFFICULTY_PRESETS[selectedDifficulty];
    const queue = buildSpawnQueue(isMobile);
    const totalAvatars = queue.length;
    
    // Partida de 20s. Llegadas separadas uniformemente de 4.5s a 19.0s.
    const baseArrival = 4.5;
    const lastArrival = 19.0;
    const spacing = (lastArrival - baseArrival) / Math.max(1, totalAvatars - 1);
    
    avatarsRef.current = queue.map((type, i) => {
       const arrivalTime = baseArrival + (i * spacing);
       
       let timeToReach = (type.walkDuration * (22 / 30)) / config.speedMultiplier;
       if (type.id === 'ORANGE') {
           timeToReach += (0.3 / config.speedMultiplier); // Amague
       }

       let spawnTime = arrivalTime - timeToReach;
       if (spawnTime < 0) spawnTime = 0;

       return {
         id: i,
         type,
         spawnTime,
         z: 20,
         baseX: 1 + (Math.random() * 0.4 - 0.2),
         x: 1,
         visible: false,
         captured: false,
         exited: false,
         paused: false,
         hasFaked: false,
         fakeTimer: 0,
         missLogged: false
       };
    });

    hasAutoActivatedRef.current = false;
    startTimeRef.current = 0;
    pauseStartClockRef.current = 0;
    totalPausedTimeRef.current = 0;
    isGamePausedRef.current = false;
    setIsGamePaused(false);
    setBusinessChallengeActive(false);
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setStreak(0);
    setCooldown(false);
    setCaptures({ GRAY: 0, BLUE: 0, ORANGE: 0 });
    setMissedOrange(0);
    setFeedbacks([]);
    setBlasts([]);
  }, [isMobile]);

  const onUiStateChange = useCallback((active, next) => {
      setActiveAvatar(active);
      setNextAvatar(next);
  }, []);

  const onMiss = useCallback((av) => {
      if (av.type.id === 'ORANGE') {
          setMissedOrange(m => m + 1);
      }
      addFeedback('PERDIDO', av.x, av.z, 'gray');
      setStreak(0);
  }, []);

  const addFeedback = (text, x, z, color) => {
      const id = Math.random();
      setFeedbacks(prev => [...prev, { id, text, x, z, color }]);
      setTimeout(() => {
          setFeedbacks(prev => prev.filter(f => f.id !== id));
      }, 600);
  };

  const subtractPoints = (amount) => {
      setScore(s => Math.max(0, s - amount));
      setScoreFlash(true);
      setTimeout(() => setScoreFlash(false), 250);
  };

  const openBusinessChallenge = useCallback(() => {
    if (businessChallengeActive) return;
    isGamePausedRef.current = true;
    setIsGamePaused(true);
    setBusinessChallengeActive(true);
  }, [businessChallengeActive]);

  const onBusinessSuccess = useCallback(() => {
    setBusinessChallengeActive(false);
    isGamePausedRef.current = false;
    setIsGamePaused(false);
    // +12 bonus: base was +3, target is x5 = 15, so bonus = 12
    setScore(s => s + 12);
    setScoreFlash(true);
    setTimeout(() => setScoreFlash(false), 250);
  }, []);

  const onBusinessFailure = useCallback(() => {
    setBusinessChallengeActive(false);
    isGamePausedRef.current = false;
    setIsGamePaused(false);
  }, []);

  const evaluateCapture = () => {
      const blastId = Math.random();
      setBlasts(prev => [...prev, { id: blastId }]);
      setTimeout(() => {
          setBlasts(prev => prev.filter(b => b.id !== blastId));
      }, 500);

      const closestAvatar = avatarsRef.current
           .filter(a => a.visible && !a.captured && !a.exited)
           .sort((a,b) => Math.abs(a.z - (-2)) - Math.abs(b.z - (-2)))[0];

      if (closestAvatar) {
         const dist = Math.abs(closestAvatar.z - (-2));
         const speed = 30 / closestAvatar.type.walkDuration;
         const windowTolerance = (speed * 0.4) / 2; // exactly 0.4s window
         
         if (dist <= windowTolerance) {
            // In zone!
            const isExcelente = dist <= (windowTolerance * 0.3);
            const mult = streak >= 3 ? streak : 1;
            const points = closestAvatar.type.value * mult * (isExcelente ? 3 : 1);

            closestAvatar.captured = true;
            setScore(s => s + points);
            setStreak(s => s + 1);
            setCaptures(c => ({ ...c, [closestAvatar.type.id]: c[closestAvatar.type.id] + 1 }));

            addFeedback(`${isExcelente ? 'EXCELENTE' : 'BIEN'} +${points}`, closestAvatar.x, closestAvatar.z, closestAvatar.type.color);
            setFlashColor(isExcelente ? 'white' : 'rgba(255,255,255,0.5)');
            setTimeout(() => setFlashColor(null), 80);

            // Trigger business close challenge on PERFECT ORANGE capture
            if (isExcelente && closestAvatar.type.id === 'ORANGE') {
              setTimeout(() => openBusinessChallenge(), 120);
            }

         } else if (dist < windowTolerance * 3.0) {
            // CERCA (TEMPRANO o tarde cercano)
            subtractPoints(1);
            setStreak(0);
            addFeedback('CERCA -1', closestAvatar.x, closestAvatar.z, 'red');
            setFlashColor('rgba(255,0,0,0.2)');
            setTimeout(() => setFlashColor(null), 100);
         } else {
            // TARDE o muy temprano
            const isTarde = closestAvatar.z < -2;
            const pen = isTarde ? 2 : 1;
            subtractPoints(pen);
            setStreak(0);
            addFeedback(isTarde ? 'TARDE -2' : 'TEMPRANO -1', closestAvatar.x, closestAvatar.z, 'red');
         }
      } else {
          // SIN VISITANTE
          subtractPoints(1);
          setStreak(0);
          addFeedback('SIN VISITANTE -1', 1, -2, 'red');
      }
  };

  // Button colors
  const stripeColor = activeAvatar?.type.color || nextAvatar?.type.color || '#8F9194';
  const isDualColor = activeAvatar && nextAvatar && activeAvatar.type.id !== nextAvatar.type.id;
  const stripeStyle = isDualColor 
    ? { background: `linear-gradient(to right, ${activeAvatar.type.color}, ${nextAvatar.type.color})` }
    : { background: stripeColor };

  const buttonBg = streak >= 3 
    ? 'linear-gradient(90deg, #133851 0%, #FB8F00 100%)'
    : '#0A1419';

  return (
    <div style={{ width: '100%', height: isMobile ? '80vh' : '580px', backgroundColor: 'var(--gl-bg-light)', borderRadius: '1rem', overflow: 'hidden', position: 'relative', touchAction: 'pan-y' }}>
      
      {!isPlaying && !isGameOver && !showDifficultySelector && !showInstructions && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '3rem 1rem', zIndex: 10, background: 'rgba(244,245,246,0.6)' }}>
           <div style={{ textAlign: 'center', maxWidth: '80%', background: 'rgba(255,255,255,0.8)', padding: '1rem', borderRadius: '8px' }}>
             <h3 style={{ color: '#133851', fontSize: '1.2rem', lineHeight: '1.4', margin: '0 0 0.75rem 0' }}>
               Prueba el reto de atraer la mayor cantidad de asistentes a tu stand. ¿Cuántos podrás conseguir?
             </h3>
             <p style={{ color: 'rgba(19,56,81,0.7)', fontSize: '0.875rem', fontStyle: 'italic', margin: 0, lineHeight: '1.4' }}>
               Captura los visitantes correctos. Y cuando atrapes a un decisor, prepárate para cerrar negocio en vivo.
             </p>
           </div>
           <button onClick={handleInitiate} className="btn btn-primary" style={{ cursor: 'pointer', pointerEvents: 'auto', padding: '1rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '2rem' }}>INICIAR EL RETO</button>
        </div>
      )}

      {showInstructions && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 1rem 2rem', zIndex: 10, background: 'transparent', pointerEvents: 'none' }}>
          <div style={{ textAlign: 'center', maxWidth: '480px', width: '100%', background: 'rgba(255,255,255,0.95)', padding: '1rem 1.25rem', borderRadius: '12px', pointerEvents: 'auto' }}>
            <p style={{ color: '#133851', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Puedes atraer <strong>3 tipos de asistentes</strong> que te darán puntajes diferentes. El naranja te da más puntos, pero es más difícil de atraer. Para atraerlos, pulsa <strong>ACTIVAR IMÁN</strong> cuando el avatar está pasando por el centro del rombo frente al stand, y listo.
            </p>
          </div>
          <button onClick={handleStartFromInstructions} className="btn btn-primary" style={{ cursor: 'pointer', padding: '0.9rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold', pointerEvents: 'auto' }}>
            ARRANCAR EL JUEGO
          </button>
        </div>
      )}

      {showDifficultySelector && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(255,255,255,0.85)' }}>
           <h3 style={{ color: '#0A1419', marginBottom: '0.5rem' }}>Elige tu nivel de reto:</h3>
           <p style={{ color: '#133851', marginBottom: '2rem', textAlign: 'center', maxWidth: '300px', fontSize: '0.9rem', lineHeight: '1.4' }}>
              Presiona ACTIVAR IMÁN exactamente cuando un visitante cruce el rombo frente a tu stand.
           </p>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '300px' }}>
              <button onClick={() => startGame('TRANQUILO')} style={{ padding: '1rem', background: '#F4F5F6', border: '2px solid #E3E4E5', borderRadius: '8px', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#133851' }}>TRANQUILO</div>
                  <div style={{ fontSize: '0.8rem', color: '#6D6E71' }}>Velocidad normal · x1 pts</div>
              </button>
              <button onClick={() => startGame('NORMAL')} style={{ padding: '1rem', background: '#F4F5F6', border: '2px solid #346783', borderRadius: '8px', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#133851' }}>NORMAL</div>
                  <div style={{ fontSize: '0.8rem', color: '#6D6E71' }}>+30% velocidad · x1.5 pts</div>
              </button>
              <button onClick={() => startGame('EXTREMO')} style={{ padding: '1rem', background: '#F4F5F6', border: '2px solid #FB8F00', borderRadius: '8px', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#FB8F00' }}>EXTREMO</div>
                  <div style={{ fontSize: '0.8rem', color: '#6D6E71' }}>+70% velocidad · x2.5 pts</div>
              </button>
           </div>
           <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#6D6E71', textAlign: 'center' }}>
              <div style={{ marginBottom: '1rem', color: '#133851' }}>
                  <b>Puntos:</b> Gris (1) · Azul (2) · Naranja (3)
              </div>
              <div>
                  Tus mejores: 
                  T: {localStorage.getItem('genlab_block2_best_tranquilo') || 0} · 
                  N: {localStorage.getItem('genlab_block2_best_normal') || 0} · 
                  E: {localStorage.getItem('genlab_block2_best_extremo') || 0}
              </div>
           </div>
        </div>
      )}

      {isGameOver && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(255,255,255,0.9)' }}>
          <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '400px' }}>
            {score <= 8 && (
                <>
                  <h2 style={{ color: '#FB8F00', marginBottom: '0.5rem' }}>Capturaste tráfico. No leads.</h2>
                  <h3 style={{ marginBottom: '1rem' }}>Puntaje: {score}</h3>
                  <p style={{ marginBottom: '2rem' }}>La mayoría eran curiosos de paso. El cliente potencial pasó frente a tu stand y no lo viste.</p>
                </>
            )}
            {score > 8 && score < 19 && (
                <>
                  <h2 style={{ color: '#133851', marginBottom: '0.5rem' }}>Buen ojo. Pero dejaste ir al decisor.</h2>
                  <h3 style={{ marginBottom: '1rem' }}>Puntaje: {score}</h3>
                  <p style={{ marginBottom: '2rem' }}>Capturaste a clientes potenciales. Pero los decisores exigen timing perfecto.</p>
                </>
            )}
            {score >= 19 && (
                <>
                  <h2 style={{ color: '#FB8F00', marginBottom: '0.5rem' }}>Atrapaste a los decisores en su momento exacto.</h2>
                  <h3 style={{ marginBottom: '1rem' }}>Puntaje: {score}</h3>
                  <p style={{ marginBottom: '2rem' }}>Esto es lo que Gen.Lab hace en cada feria, automatizando la precisión.</p>
                </>
            )}
            
            <div style={{ background: '#F4F5F6', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
               <div style={{ fontWeight: 'bold', color: '#133851' }}>Score crudo: {score}</div>
               <div style={{ fontSize: '0.8rem', color: '#6D6E71', marginBottom: '0.5rem' }}>
                  Modo: {difficulty} (x{DIFFICULTY_PRESETS[difficulty]?.scoreMultiplier})
               </div>
               <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#FB8F00' }}>
                  Score final: {finalScore}
               </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#6D6E71', marginBottom: '2rem' }}>
              Tus mejores: T: {localStorage.getItem('genlab_block2_best_tranquilo') || 0} · 
              N: {localStorage.getItem('genlab_block2_best_normal') || 0} · 
              E: {localStorage.getItem('genlab_block2_best_extremo') || 0}
            </p>

            <button onClick={handleInitiate} className="btn btn-primary" style={{ marginBottom: '1rem', width: '100%', padding: '1rem' }}>Repetir reto</button>
            <br />
            <a href="#ecosistemas" style={{ color: '#346783', textDecoration: 'underline', cursor: 'pointer' }}>Ver cómo lo resolvemos →</a>
          </div>
        </div>
      )}

      {flashColor && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: flashColor, zIndex: 5, pointerEvents: 'none' }} />
      )}

      {isPlaying && (
         <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', zIndex: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ background: '#133851', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', width: '80px', textAlign: 'center' }}>
                <span ref={timerUiRef}>20.0s</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ background: '#fff', color: scoreFlash ? 'red' : '#0A1419', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'color 0.1s' }}>
                    SCORE: {score}
                </div>
                {streak >= 3 && (
                    <div style={{ background: '#FB8F00', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        STREAK x{streak}
                    </div>
                )}
            </div>
         </div>
      )}

      <Canvas dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault fov={15} position={[40, 30, 40]} />
        <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} target={[0, 2, 0]} />
        
        <group position={[0, -2, 0]}>
          <FloorGrid />
          <Stand score={score} isGameOver={isGameOver} streak={streak} />
          <CaptureZone isPlaying={isPlaying} />
          <MagnetBlasts blasts={blasts} />
          <SuccessParticles active={isGameOver && score >= 19} />

          <GameEngine
             isPlaying={isPlaying}
             isGamePausedRef={isGamePausedRef}
             pauseStartClockRef={pauseStartClockRef}
             totalPausedTimeRef={totalPausedTimeRef}
             avatarsRef={avatarsRef}
             reducedMotion={reducedMotion}
             onUiStateChange={onUiStateChange}
             onMiss={onMiss}
             endGame={endGame}
             startTimeRef={startTimeRef}
             difficulty={difficulty}
             timerUiRef={timerUiRef}
             hasAutoActivatedRef={hasAutoActivatedRef}
             onAutoActivate={onAutoActivate}
          />

          {avatarsRef.current.map((av) => (
             <AvatarMesh key={av.id} data={av} reducedMotion={reducedMotion} difficulty={difficulty} isGamePaused={isGamePaused} />
          ))}

          {!isPlaying && !isGameOver && !showInstructions && (
             <AvatarMesh
                data={{ id: 'dummy', type: ARCHETYPES.BLUE, visible: true, z: -2, x: 1, captured: false, paused: false }}
                reducedMotion={reducedMotion}
                difficulty={null}
             />
          )}

          {showInstructions && (
            <>
              <AvatarMesh data={{ id: 'dummy-gray',   type: ARCHETYPES.GRAY,   visible: true, z: -2, x: -1, captured: false, paused: false }} reducedMotion={reducedMotion} difficulty={null} />
              <AvatarMesh data={{ id: 'dummy-blue',   type: ARCHETYPES.BLUE,   visible: true, z: -2, x: 1,  captured: false, paused: false }} reducedMotion={reducedMotion} difficulty={null} />
              <AvatarMesh data={{ id: 'dummy-orange', type: ARCHETYPES.ORANGE, visible: true, z: -2, x: 3,  captured: false, paused: false }} reducedMotion={reducedMotion} difficulty={null} />
              {[
                { type: ARCHETYPES.GRAY,   name: 'GRIS',    diff: 'Fácil',    x: -1 },
                { type: ARCHETYPES.BLUE,   name: 'AZUL',    diff: 'Medio',    x: 1  },
                { type: ARCHETYPES.ORANGE, name: 'NARANJA', diff: 'Difícil',  x: 3  },
              ].map(({ type, name, diff, x }) => (
                <Html key={`lbl-${type.id}`} position={[x, 5, -2]} center zIndexRange={[20, 15]}>
                  <div style={{ background: 'rgba(255,255,255,0.96)', border: `2px solid ${type.color}`, borderRadius: '8px', padding: '0.3rem 0.5rem', textAlign: 'center', minWidth: '62px', boxShadow: '0 2px 8px rgba(0,0,0,0.18)', pointerEvents: 'none', fontFamily: 'Space Grotesk, sans-serif' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: type.color, margin: '0 auto 0.2rem' }} />
                    <div style={{ fontWeight: 700, color: '#0A1419', fontSize: '0.65rem', letterSpacing: '0.04em' }}>{name}</div>
                    <div style={{ color: type.color, fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.1 }}>{type.value} pt{type.value > 1 ? 's' : ''}</div>
                    <div style={{ color: '#6D6E71', fontSize: '0.6rem', marginTop: '0.1rem' }}>{diff}</div>
                  </div>
                </Html>
              ))}
            </>
          )}

          {feedbacks.map(f => (
             <Html key={f.id} position={[f.x, 5, f.z]} center>
                <div style={{ 
                  color: f.color, 
                  fontWeight: 'bold', 
                  fontSize: '2rem',
                  textShadow: '0px 2px 4px rgba(0,0,0,0.3)',
                  animation: 'floatUp 0.6s ease-out forwards' 
                }}>
                  {f.text}
                </div>
             </Html>
          ))}
        </group>
        
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>

      {/* CSS Animations */}
      <style>{`
        @keyframes floatUp {
          from { transform: translateY(0) scale(1); opacity: 1; }
          to { transform: translateY(-40px) scale(1.4); opacity: 0; }
        }
        
        .magnet-button {
          transition: transform 80ms ease-out, background-color 80ms, border-color 200ms;
          position: relative;
          overflow: hidden;
        }
        .magnet-button.just-pressed {
          transform: scale(0.94);
        }
        .magnet-button.just-pressed::after {
          content: '';
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0.4;
          pointer-events: none;
          animation: pressFlash 160ms ease-out forwards;
        }
        @keyframes pressFlash {
          0%   { opacity: 0.4; }
          100% { opacity: 0; }
        }
        
        .cooldown-ring {
          display: block;
        }
        .cooldown-progress {
          animation: cooldownDrain 700ms linear forwards;
        }
        @keyframes cooldownDrain {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 163.36; }
        }
        
        .cooldown-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0px;
          margin-top: 4px;
        }
        .cooldown-label {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        
        .magnet-button.ready-flash {
          animation: readyFlash 240ms ease-out forwards;
        }
        @keyframes readyFlash {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.9); }
          100% { box-shadow: 0 0 0 8px rgba(255, 255, 255, 0); }
        }
        
        .button-label {
          animation: fadeInLabel 200ms ease-out;
        }
        @keyframes fadeInLabel {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .magnet-button.shake {
          animation: shakeBlocked 200ms ease-in-out;
        }
        @keyframes shakeBlocked {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .magnet-button.just-pressed {
            background: #FB8F00 !important;
            transform: none;
          }
          .magnet-button.just-pressed::after {
            display: none;
          }
          .magnet-button.shake {
            animation: none;
            box-shadow: inset 0 0 0 4px #DC2626 !important;
          }
          .magnet-button.ready-flash {
            animation: none;
            box-shadow: inset 0 0 0 4px white !important;
          }
        }
      `}</style>

      {/* Business Close Challenge overlay */}
      <BusinessCloseModal
        isVisible={businessChallengeActive}
        onSuccess={onBusinessSuccess}
        onFailure={onBusinessFailure}
        isMobile={isMobile}
      />

      {/* Magnet Button */}
      {isPlaying && (
        <div style={{ 
            position: 'absolute', 
            bottom: isMobile ? 'max(0px, env(safe-area-inset-bottom))' : '1.5rem', 
            left: '50%', 
            transform: 'translateX(-50%)',
            width: isMobile ? '100%' : '320px',
            zIndex: 10
        }}>
           <MagnetButton 
               ref={magnetButtonRef}
               isMobile={isMobile}
               buttonBg={buttonBg}
               stripeStyle={stripeStyle}
               onPress={evaluateCapture}
               isPlaying={isPlaying}
               cooldown={cooldown}
               setCooldown={setCooldown}
           />
        </div>
      )}
    </div>
  );
}
