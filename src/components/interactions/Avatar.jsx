import React, { useEffect, useRef } from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export function Avatar(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/Walking-transformed.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play the walk animation if available
    const action = actions[Object.keys(actions)[0]];
    if (action) {
      // Force the animation to be "in-place" by removing root motion position tracks.
      const clip = action.getClip();
      clip.tracks = clip.tracks.filter(track => !track.name.endsWith('.position'));
      
      action.play();
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="empty_1" scale={0.01}> {/* Scale down slightly, typical mixamo FBXs are huge */}
        <group name="FBX_Root">
          <primitive object={nodes.mixamorig_Hips} />
        </group>
        <skinnedMesh name="Beta_Surface" geometry={nodes.Beta_Surface.geometry} skeleton={nodes.Beta_Surface.skeleton}>
           <meshBasicMaterial color="#133851" wireframe={true} wireframeLinewidth={1.5} />
        </skinnedMesh>
        <skinnedMesh name="Beta_Joints" geometry={nodes.Beta_Joints.geometry} skeleton={nodes.Beta_Joints.skeleton}>
           <meshBasicMaterial color="#133851" wireframe={true} wireframeLinewidth={1.5} />
        </skinnedMesh>
      </group>
    </group>
  );
}

useGLTF.preload('/models/Walking-transformed.glb');