import React, { useEffect, useRef } from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations, Billboard } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';

export function Avatar({ archetype, paused, isCaptured, ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/Walking-transformed.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  const color = archetype?.color || '#133851';
  const outlineColor = archetype?.outlineColor || '#133851';
  const walkSpeed = archetype?.walkSpeed || 1;
  const symbol = archetype?.symbol || null;

  useEffect(() => {
    const action = actions[Object.keys(actions)[0]];
    if (action) {
      const clip = action.getClip();
      clip.tracks = clip.tracks.filter(track => !track.name.endsWith('.position'));
      
      action.play();
      
      if (isCaptured) {
        action.paused = true;
      } else {
        action.paused = paused;
        action.timeScale = walkSpeed;
      }
    }
  }, [actions, paused, isCaptured, walkSpeed]);

  return (
    <group ref={group} {...props} dispose={null}>
      
      {symbol && (
        <Billboard position={[0, 2, 0]} follow={true} lockX={false} lockY={false} lockZ={false}>
          {symbol === 'circle' && (
            <mesh>
              <ringGeometry args={[0.1, 0.15, 16]} />
              <meshBasicMaterial color={outlineColor} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          )}
          {symbol === 'square' && (
            <mesh>
              <planeGeometry args={[0.2, 0.2]} />
              <meshBasicMaterial color={outlineColor} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          )}
          {symbol === 'star' && (
            <mesh>
              <circleGeometry args={[0.15, 4]} />
              <meshBasicMaterial color={outlineColor} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          )}
        </Billboard>
      )}

      <group name="empty_1" scale={0.01}>
        <group name="FBX_Root">
          <primitive object={nodes.mixamorig_Hips} />
        </group>
        <skinnedMesh name="Beta_Surface" geometry={nodes.Beta_Surface.geometry} skeleton={nodes.Beta_Surface.skeleton}>
           <meshBasicMaterial color={color} />
        </skinnedMesh>
        <skinnedMesh name="Beta_Surface_Outline" geometry={nodes.Beta_Surface.geometry} skeleton={nodes.Beta_Surface.skeleton}>
           <meshBasicMaterial color={outlineColor} wireframe={true} wireframeLinewidth={2} transparent opacity={0.4} />
        </skinnedMesh>
        <skinnedMesh name="Beta_Joints" geometry={nodes.Beta_Joints.geometry} skeleton={nodes.Beta_Joints.skeleton}>
           <meshBasicMaterial color={outlineColor} />
        </skinnedMesh>
      </group>
    </group>
  );
}

useGLTF.preload('/models/Walking-transformed.glb');