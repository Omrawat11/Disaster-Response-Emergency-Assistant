import React from 'react';
import volunteersData from '../../data/volunteers.json';
import GlassCard from '../ui/GlassCard';

export default function S10_VolunteerCenter() {
  return (
    <section id="volunteer" className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Volunteer Center</h2>
      <p className="text-smoke mb-8 text-sm">Active rescue personnel & field teams</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {volunteersData.map((v) => (
          <GlassCard key={v.id} className="p-5" data-cursor="hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-ember/20 border border-ember/30 flex items-center justify-center text-ember font-heading font-bold text-sm">
                {v.initials}
              </div>
              <div>
                <h4 className="text-ash text-sm font-bold">{v.name}</h4>
                <p className="text-smoke text-xs">{v.location}</p>
              </div>
              <div className={`ml-auto w-2.5 h-2.5 rounded-full ${v.status === 'active' ? 'bg-gold' : 'bg-smoke'}`} title={v.status} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="bg-ember/10 text-ember px-2 py-0.5 rounded font-mono">{v.skill}</span>
              <span className="text-smoke font-mono">{v.missions} missions</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
