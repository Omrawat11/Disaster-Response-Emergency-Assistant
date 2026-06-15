import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const bootMessages = [
  'Initializing satellite feed...',
  'Connecting rescue nodes...',
  'Loading disaster intelligence...',
  'SYSTEM READY',
];

export default function S00_Loading({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const containerRef = useRef();
  const logoRef = useRef();
  const progressRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo SVG stroke draw animation
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' });
    }

    // Progress bar filling
    let currentMsg = 0;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 15 + 5, 100);
        const newMsgIdx = Math.min(Math.floor((next / 100) * bootMessages.length), bootMessages.length - 1);
        if (newMsgIdx !== currentMsg) {
          currentMsg = newMsgIdx;
          setMsgIndex(newMsgIdx);
        }
        if (next >= 100) {
          clearInterval(interval);
          // Wipe out the loading screen
          setTimeout(() => {
            if (containerRef.current) {
              gsap.to(containerRef.current, {
                clipPath: 'inset(0 0 100% 0)',
                duration: 0.8,
                ease: 'power3.inOut',
                onComplete: () => onComplete && onComplete(),
              });
            }
          }, 600);
        }
        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center"
      style={{ clipPath: 'inset(0 0 0 0)' }}
    >
      {/* Scan lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,65,10,0.03) 2px, rgba(200,65,10,0.03) 4px)',
        }}
      />

      {/* Logo */}
      <div ref={logoRef} className="mb-12">
        <h1 className="font-heading text-5xl md:text-6xl font-bold gradient-text tracking-wider">
          RESCUE<span className="text-ember">.</span>NET
        </h1>
      </div>

      {/* Progress bar */}
      <div className="w-64 md:w-80">
        <div className="h-[2px] w-full bg-surface rounded-full overflow-hidden mb-4">
          <div
            ref={progressRef}
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #C8410A, #D4A853)',
            }}
          />
        </div>
        <p className="text-smoke text-xs font-mono text-center h-4 transition-opacity duration-200">
          {bootMessages[msgIndex]}
        </p>
      </div>
    </div>
  );
}
