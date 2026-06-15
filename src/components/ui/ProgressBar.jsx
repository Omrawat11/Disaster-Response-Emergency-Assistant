import React from 'react';

export default function ProgressBar({ value = 0, max = 100, color, className = '' }) {
  const percent = Math.min((value / max) * 100, 100);
  const barColor = color || (percent > 85 ? '#C8410A' : percent > 60 ? '#D4A853' : '#4a7a3a');

  return (
    <div className={`w-full h-2 rounded-full bg-surface overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${percent}%`, background: barColor }}
      />
    </div>
  );
}
