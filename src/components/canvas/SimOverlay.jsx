import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useDisasterStore from '../../store/disasterStore';

export default function SimOverlay() {
  const meshRef = useRef();
  const simulation = useDisasterStore((state) => state.simulation);

  useFrame(() => {
    if (!meshRef.current) return;
    const targetY = simulation === 'flood' ? -0.3 : -3;
    const targetOpacity = simulation === 'flood' ? 0.25 : 0;

    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.02);
    meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, targetOpacity, 0.02);
  });

  return (
    <mesh ref={meshRef} position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[15, 15]} />
      <meshBasicMaterial color="#9E5B38" transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}
