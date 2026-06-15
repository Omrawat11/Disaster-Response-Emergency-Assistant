import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function useCountUp(targetValue, duration = 1.5) {
  const [value, setValue] = useState(0);
  const valRef = useRef({ val: 0 });

  useEffect(() => {
    // If target value changes or is initialized, tween the value ref to target
    gsap.to(valRef.current, {
      val: targetValue,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        setValue(Math.floor(valRef.current.val));
      },
      overwrite: 'auto',
    });
  }, [targetValue, duration]);

  return value;
}
