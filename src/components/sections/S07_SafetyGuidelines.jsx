import React, { useState } from 'react';
import guidelinesData from '../../data/safetyGuidelines.json';
import GlassCard from '../ui/GlassCard';
import { ChevronDown, Droplets, Activity, Flame, Wind, Heart } from 'lucide-react';

const iconMap = { Droplets, Activity, Flame, Wind, Heart };

export default function S07_SafetyGuidelines() {
  const [openId, setOpenId] = useState(null);
  return (
    <section className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Safety Guidelines</h2>
      <p className="text-smoke mb-8 text-sm">Essential survival protocols by disaster type</p>
      <div className="space-y-3">
        {guidelinesData.map((g) => {
          const Icon = iconMap[g.icon] || Activity;
          const isOpen = openId === g.id;
          return (
            <GlassCard key={g.id} className="overflow-hidden" hover={false}>
              <button
                onClick={() => setOpenId(isOpen ? null : g.id)}
                className="w-full flex items-center justify-between p-5 text-left"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className="text-ember" />
                  <span className="text-ash font-heading font-bold">{g.title}</span>
                </div>
                <ChevronDown size={18} className={`text-smoke transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
                <ul className="px-5 space-y-2">
                  {g.guidelines.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-smoke">
                      <span className="text-ember mt-1 text-xs">▸</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
