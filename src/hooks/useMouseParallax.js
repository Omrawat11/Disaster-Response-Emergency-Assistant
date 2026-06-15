import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function useMouseParallax(lerpFactor = 0.05) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Let's use GSAP's ticker for consistent frame rate tracking
    const updateParallax = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      // Lerp logic
      current.x += (target.x - current.x) * lerpFactor;
      current.y += (target.y - current.y) * lerpFactor;

      setCoords({ x: current.x, y: current.y });
    };

    gsap.ticker.add(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(updateParallax);
    };
  }, [lerpFactor]);

  return coords;
}
