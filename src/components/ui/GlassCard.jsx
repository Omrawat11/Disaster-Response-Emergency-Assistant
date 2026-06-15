import React from 'react';
import useTilt from '../../hooks/useTilt';

export default function GlassCard({ children, className = '', hover = true, ...props }) {
  const tiltRef = useTilt({ max: 8, perspective: 1200, speed: 0.3 });

  return (
    <div
      ref={hover ? tiltRef : null}
      className={`
        bg-[rgba(232,224,213,0.04)] 
        border border-[rgba(232,224,213,0.08)] 
        backdrop-blur-[20px] 
        rounded-xl 
        transition-shadow duration-300
        ${hover ? 'hover:shadow-[0_0_20px_rgba(200,65,10,0.15)]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
