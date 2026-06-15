import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useDisasterStore from '../../store/disasterStore';
import alertsData from '../../data/alerts.json';

// Atmospheric Glow Shaders — ember-orange rim, NOT blue
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  uniform vec3 glowColor;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_FragColor = vec4(glowColor, 1.0) * intensity * 1.2;
  }
`;

// Convert lat/lng to 3D position on sphere
function latLngToVec3(lat, lng, radius = 2.02) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.sin(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.cos(theta)
  );
}

function getSeverityColor(severity) {
  switch (severity) {
    case 'critical': return '#C8410A';
    case 'high': return '#D4A853';
    case 'moderate': return '#E8E0D5';
    default: return '#5C5650';
  }
}

function getSimGlowColor(simulation) {
  switch (simulation) {
    case 'flood': return new THREE.Color('#9E5B38');
    case 'wildfire': return new THREE.Color('#E84B0A');
    case 'cyclone': return new THREE.Color('#8A7560');
    case 'earthquake': return new THREE.Color('#A67C2E');
    default: return new THREE.Color('#C8410A');
  }
}

export default function EarthGlobe({ onHotspotClick }) {
  const earthRef = useRef();
  const groupRef = useRef();
  const simulation = useDisasterStore((state) => state.simulation);
  const glowColor = useMemo(() => getSimGlowColor(simulation), [simulation]);

  // Mouse parallax — simple approach using the R3F pointer
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0015;
    }
    if (groupRef.current) {
      const mx = state.pointer.x * 0.25;
      const my = state.pointer.y * 0.15;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mx, 0.03);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -my, 0.03);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          color="#1a2a1a"
          emissive="#0d1f0d"
          specular="#223322"
          shininess={10}
        />
      </mesh>

      {/* Wireframe overlay for NASA aesthetic */}
      <mesh>
        <sphereGeometry args={[2.005, 36, 36]} />
        <meshBasicMaterial color="#E8E0D5" wireframe transparent opacity={0.03} />
      </mesh>

      {/* Atmosphere glow rim */}
      <mesh>
        <sphereGeometry args={[2.15, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          uniforms={{ glowColor: { value: glowColor } }}
        />
      </mesh>

      {/* Hotspot markers */}
      {alertsData.slice(0, 16).map((alert, i) => {
        const pos = latLngToVec3(
          parseFloat(alert.coordinates.lat),
          parseFloat(alert.coordinates.lng)
        );
        const color = getSeverityColor(alert.severity);
        return <HotspotDot key={alert.id || i} position={pos} color={color} alert={alert} onClick={onHotspotClick} />;
      })}
    </group>
  );
}

function HotspotDot({ position, color, alert, onClick }) {
  const ref = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      const t = state.clock.getElapsedTime();
      const s = 1 + Math.sin(t * 3 + position.x * 10) * 0.3;
      ringRef.current.scale.setScalar(s);
      ringRef.current.material.opacity = 0.5 - Math.sin(t * 3 + position.x * 10) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Beacon dot */}
      <mesh
        ref={ref}
        onClick={(e) => { e.stopPropagation(); onClick && onClick(alert); }}
      >
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Pulsing ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.07, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
