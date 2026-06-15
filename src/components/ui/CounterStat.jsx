import React from 'react';
import useCountUp from '../../hooks/useCountUp';

export default function CounterStat({ label, value, icon, mono = true }) {
  const animated = useCountUp(value);
  return (
    <div className="text-center">
      {icon && <div className="text-ember mb-2">{icon}</div>}
      <div className={`text-2xl md:text-3xl font-bold text-ash ${mono ? 'font-mono' : 'font-heading'}`}>
        {animated.toLocaleString()}
      </div>
      <div className="text-smoke text-xs mt-1 uppercase tracking-wider font-body">{label}</div>
    </div>
  );
}
