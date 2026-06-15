import React from 'react';
import useDisasterStore from '../../store/disasterStore';
import GlassCard from '../ui/GlassCard';
import { Droplets, Flame, Wind, Mountain } from 'lucide-react';

const simTypes = [
  { type: 'flood', label: 'Flood', icon: Droplets, color: '#9E5B38', desc: 'Rising water simulation' },
  { type: 'wildfire', label: 'Wildfire', icon: Flame, color: '#E84B0A', desc: 'Fire spread pattern' },
  { type: 'cyclone', label: 'Cyclone', icon: Wind, color: '#8A7560', desc: 'Storm trajectory model' },
  { type: 'earthquake', label: 'Earthquake', icon: Mountain, color: '#A67C2E', desc: 'Seismic impact zones' },
];

export default function S12_DisasterSimulation() {
  const { simulation, setSimulation } = useDisasterStore();

  return (
    <section className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Disaster Simulation</h2>
      <p className="text-smoke mb-8 text-sm">Select a scenario to activate real-time simulation</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {simTypes.map((s) => {
          const Icon = s.icon;
          const active = simulation === s.type;
          return (
            <GlassCard
              key={s.type}
              className={`p-6 text-center cursor-pointer transition-all duration-300 ${active ? 'border-2' : ''}`}
              style={active ? { borderColor: s.color, boxShadow: `0 0 30px ${s.color}40` } : {}}
              data-cursor="hover"
              onClick={() => setSimulation(active ? null : s.type)}
            >
              <Icon size={32} className="mx-auto mb-3" style={{ color: active ? s.color : '#5C5650' }} />
              <h4 className="text-ash font-heading font-bold mb-1">{s.label}</h4>
              <p className="text-smoke text-xs">{s.desc}</p>
              {active && (
                <div className="mt-3 text-[10px] font-mono uppercase tracking-wider" style={{ color: s.color }}>
                  ● Active
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
      {simulation && (
        <div className="mt-6 glass rounded-xl p-4 text-center">
          <p className="text-smoke text-sm">
            <span className="text-ember font-bold uppercase">{simulation}</span> simulation active —
            Earth globe, particle field, and alert filters are now responding to this scenario.
          </p>
          <button onClick={() => setSimulation(null)} className="mt-2 text-ember text-xs underline" data-cursor="hover">
            Deactivate Simulation
          </button>
        </div>
      )}
    </section>
  );
}
