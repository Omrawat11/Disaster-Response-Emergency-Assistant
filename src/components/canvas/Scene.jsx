import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import useDisasterStore from '../../store/disasterStore';
import { WebGLErrorBoundary } from './ErrorBoundary';

export default function Scene({ children, frameloop = 'always' }) {
  const setParticleCount = useDisasterStore((state) => state.setParticleCount);

  return (
    <WebGLErrorBoundary>
      <div className="w-full h-full absolute inset-0">
        <Canvas
          frameloop={frameloop}
          gl={{
            antialias: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
            powerPreference: 'high-performance',
          }}
          camera={{
            fov: 50,
            position: [0, 0, 6],
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 1.5]}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#D4A853" />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#7A0F0F" />

          <Suspense fallback={null}>
            {children}
          </Suspense>

          {/* Simple fog for depth instead of postprocessing vignette */}
          <fog attach="fog" args={['#06080f', 8, 20]} />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

export { Scene };
