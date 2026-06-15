import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function useTilt(options = {}) {
  const elementRef = useRef(null);
  const { max = 8, perspective = 1200, speed = 0.3 } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Apply baseline styles
    gsap.set(el, { transformPerspective: perspective });

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element
      
      const width = rect.width;
      const height = rect.height;

      // Convert coordinate to percentage deviation from center (-0.5 to 0.5)
      const px = (x / width) - 0.5;
      const py = (y / height) - 0.5;

      // Calculate tilt angles (rotation on X depends on Y-mouse coordinate, rotation on Y depends on X-mouse coordinate)
      const rotateX = -py * max;
      const rotateY = px * max;

      gsap.to(el, {
        rotateX,
        rotateY,
        duration: speed,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [max, perspective, speed]);

  return elementRef;
}
