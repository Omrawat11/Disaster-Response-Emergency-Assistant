import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';

export default function useSmoothScroll() {
  const lenisRef = useRef(null);
  const scrollYRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Init Lenis: duration 1.3, easing function, orientation vertical
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Scroll listener to update refs and progress state
    lenis.on('scroll', (e) => {
      scrollYRef.current = e.scroll;
      // Clamp progress between 0 and 1
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(e.scroll / maxScroll, 0), 1) : 0;
      setScrollProgress(progress);
    });

    // 2. gsap.ticker.add((time) => lenis.raf(time * 1000))
    const tickHandler = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);

    // 3. gsap.ticker.lagSmoothing(0)
    gsap.ticker.lagSmoothing(0);

    // Initial trigger
    const initialMaxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (initialMaxScroll > 0) {
      setScrollProgress(lenis.scroll / initialMaxScroll);
    }

    // 5. Cleanup: lenis.destroy() + gsap.ticker.remove()
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
    };
  }, []);

  return {
    lenis: lenisRef.current,
    scrollY: scrollYRef,
    scrollProgress,
  };
}
