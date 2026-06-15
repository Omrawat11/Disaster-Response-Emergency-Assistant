import React from 'react';
import donationsData from '../../data/donations.json';
import GlassCard from '../ui/GlassCard';

export default function S15_Donations() {
  return (
    <section className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Donations</h2>
      <p className="text-smoke mb-8 text-sm">Support disaster relief efforts</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {donationsData.map((d) => {
          const circumference = 2 * Math.PI * 40;
          const offset = circumference - (d.raised / d.target) * circumference;
          return (
            <GlassCard key={d.id} className="p-6 text-center" data-cursor="hover">
              <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto mb-4">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#0e1018" strokeWidth="6" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#C8410A" strokeWidth="6"
                  strokeDasharray={circumference} strokeDashoffset={offset}
                  strokeLinecap="round" transform="rotate(-90 50 50)"
                  className="transition-all duration-1000" />
                <text x="50" y="54" textAnchor="middle" fill="#E8E0D5" fontSize="16" fontFamily="JetBrains Mono">{d.raised}%</text>
              </svg>
              <h4 className="text-ash font-heading font-bold mb-1">{d.category}</h4>
              <p className="text-smoke text-xs mb-2">{d.donors.toLocaleString()} donors</p>
              <p className="text-smoke/60 text-[10px]">{d.impact}</p>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
