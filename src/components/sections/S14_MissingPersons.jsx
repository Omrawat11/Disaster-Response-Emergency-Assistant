import React, { useState } from 'react';
import personsData from '../../data/missingPersons.json';
import GlassCard from '../ui/GlassCard';
import { Search, User } from 'lucide-react';

export default function S14_MissingPersons() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const filtered = personsData.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });
  return (
    <section className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Missing Persons</h2>
      <p className="text-smoke mb-8 text-sm">Search & reunification database</p>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-smoke" />
          <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-[rgba(232,224,213,0.08)] rounded-lg pl-10 pr-4 py-3 text-ash text-sm placeholder-smoke focus:border-ember focus:outline-none" />
        </div>
        <div className="flex gap-2">
          {['all', 'missing', 'found', 'searching'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs font-mono uppercase rounded-lg border transition-all ${filter === f ? 'border-ember text-ember bg-ember/10' : 'border-[rgba(232,224,213,0.08)] text-smoke'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <GlassCard key={p.id} className="p-5" data-cursor="hover">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-surface border border-[rgba(232,224,213,0.08)] flex items-center justify-center">
                <User size={20} className="text-smoke" />
              </div>
              <div className="flex-1">
                <h4 className="text-ash font-bold text-sm">{p.name}</h4>
                <p className="text-smoke text-xs">Age: {p.age}</p>
                <p className="text-smoke text-xs font-mono mt-1">Last seen: {p.lastSeen}</p>
                <p className="text-smoke text-[10px] font-mono">{new Date(p.lastSeenDate).toLocaleDateString()}</p>
              </div>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                p.status === 'found' ? 'bg-gold/20 text-gold' :
                p.status === 'missing' ? 'bg-ember/20 text-ember' : 'bg-smoke/20 text-smoke'
              }`}>{p.status}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
