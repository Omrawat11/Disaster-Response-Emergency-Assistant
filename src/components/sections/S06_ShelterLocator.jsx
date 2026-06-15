import React, { useState } from 'react';
import sheltersData from '../../data/shelters.json';
import GlassCard from '../ui/GlassCard';
import ProgressBar from '../ui/ProgressBar';
import { Search, MapPin, Wifi, Heart, Coffee, Zap, Dog, Baby } from 'lucide-react';

const facilityIcons = { medical: Heart, wifi: Wifi, food: Coffee, power: Zap, pets: Dog, childcare: Baby };

export default function S06_ShelterLocator() {
  const [search, setSearch] = useState('');
  const filtered = sheltersData
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.location.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.distance - b.distance);

  return (
    <section id="shelters" className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Shelter Locator</h2>
      <p className="text-smoke mb-8 text-sm">Find nearest emergency shelters</p>

      <div className="relative mb-8">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-smoke" />
        <input
          type="text"
          placeholder="Search shelters by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-surface border border-[rgba(232,224,213,0.08)] rounded-lg pl-10 pr-4 py-3 text-ash text-sm font-body placeholder-smoke focus:border-ember focus:outline-none transition-colors"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((shelter) => {
          const occupancyPct = (shelter.occupied / shelter.capacity) * 100;
          return (
            <GlassCard key={shelter.id} className="p-5" data-cursor="hover">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-ash font-heading font-bold text-sm">{shelter.name}</h4>
                  <div className="flex items-center gap-1 text-smoke text-xs mt-1">
                    <MapPin size={10} /> {shelter.location}
                  </div>
                </div>
                <span className="font-mono text-xs text-gold bg-gold/10 px-2 py-1 rounded">{shelter.distance} km</span>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-smoke">Occupancy</span>
                  <span className="font-mono text-ash">{shelter.occupied}/{shelter.capacity}</span>
                </div>
                <ProgressBar value={shelter.occupied} max={shelter.capacity} />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {shelter.facilities.map((f) => {
                  const Icon = facilityIcons[f];
                  return Icon ? <Icon key={f} size={14} className="text-smoke" title={f} /> : null;
                })}
                <span className={`ml-auto text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                  shelter.status === 'critical' ? 'bg-ember/20 text-ember' :
                  shelter.status === 'active' ? 'bg-gold/20 text-gold' : 'bg-smoke/20 text-smoke'
                }`}>
                  {shelter.status}
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
