import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField({ count = 200, isMobile = false }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { mouse, viewport } = useThree();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const factor = Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const isOrange = Math.random() > 0.7; // 30% orange
      temp.push({ t: factor, factor, speed, x, y, z, isOrange });
    }
    return temp;
  }, [count]);

  const colorBlue = new THREE.Color('#01678A');
  const colorOrange = new THREE.Color('#FB8F00');
  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      const col = p.isOrange ? colorOrange : colorBlue;
      arr[i * 3] = col.r;
      arr[i * 3 + 1] = col.g;
      arr[i * 3 + 2] = col.b;
    });
    return arr;
  }, [particles, count]);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      let { t, speed, x, y, z } = particle;
      t = particle.t += speed / 2;
      
      let pX = x + Math.cos(t) + Math.sin(t * 1) / 10;
      let pY = y + Math.sin(t) + Math.cos(t * 2) / 10;
      let pZ = z + Math.cos(t);
      
      if (!isMobile) {
        const mX = (mouse.x * viewport.width) / 2;
        const mY = (mouse.y * viewport.height) / 2;
        const dx = pX - mX;
        const dy = pY - mY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2) {
          pX += dx * 0.05;
          pY += dy * 0.05;
        }
      }

      dummy.position.set(pX, pY, pZ);
      const s = 0.05 + Math.sin(t) * 0.02;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </sphereGeometry>
      <meshBasicMaterial vertexColors transparent opacity={0.6} />
    </instancedMesh>
  );
}