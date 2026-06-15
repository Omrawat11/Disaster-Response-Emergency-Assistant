import React, { useState, useEffect } from 'react';
import checklistData from '../../data/checklist.json';
import GlassCard from '../ui/GlassCard';
import ProgressBar from '../ui/ProgressBar';

const STORAGE_KEY = 'rescuenet_checklist';

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}

export default function S16_Checklist() {
  const [checked, setChecked] = useState(loadState);
  const allItems = checklistData.flatMap((c) => c.items);
  const total = allItems.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = total > 0 ? (done / total) * 100 : 0;

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); }, [checked]);

  const toggle = (id) => setChecked((s) => ({ ...s, [id]: !s[id] }));

  return (
    <section className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Emergency Checklist</h2>
      <p className="text-smoke mb-4 text-sm">Track your disaster preparedness</p>
      <div className="mb-8">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-smoke">Progress</span>
          <span className="font-mono text-ash">{done}/{total} ({Math.round(pct)}%)</span>
        </div>
        <ProgressBar value={done} max={total} color={pct > 80 ? '#C8410A' : pct > 40 ? '#D4A853' : '#5C5650'} />
      </div>
      <div className="space-y-6">
        {checklistData.map((cat) => (
          <GlassCard key={cat.id} className="p-5" hover={false}>
            <h4 className="text-ash font-heading font-bold mb-3">{cat.category}</h4>
            <div className="space-y-2">
              {cat.items.map((item) => (
                <label key={item.id} className="flex items-start gap-3 cursor-pointer group" data-cursor="hover">
                  <input type="checkbox" checked={!!checked[item.id]} onChange={() => toggle(item.id)}
                    className="mt-0.5 w-4 h-4 accent-ember rounded border-smoke bg-surface" />
                  <span className={`text-sm transition-colors ${checked[item.id] ? 'text-smoke line-through' : 'text-ash group-hover:text-gold'}`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
      {pct >= 100 && (
        <div className="mt-8 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-gold font-heading font-bold text-lg">Fully Prepared!</p>
          <p className="text-smoke text-sm">Your emergency checklist is complete</p>
        </div>
      )}
    </section>
  );
}
