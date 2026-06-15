import React from 'react';
import GlassCard from '../ui/GlassCard';
import { Phone, Flame, Siren, Building2 } from 'lucide-react';

const contacts = [
  { label: 'Police', number: '100', icon: Siren, desc: 'Law enforcement emergency' },
  { label: 'Fire Department', number: '101', icon: Flame, desc: 'Fire & hazardous materials' },
  { label: 'Ambulance', number: '102', icon: Phone, desc: 'Medical emergencies' },
  { label: 'Disaster Management', number: '1070', icon: Building2, desc: 'National disaster response' },
];

export default function S08_EmergencyContacts() {
  return (
    <section className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Emergency Contacts</h2>
      <p className="text-smoke mb-8 text-sm">Immediate assistance hotlines</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contacts.map((c) => {
          const Icon = c.icon;
          return (
            <GlassCard key={c.number} className="p-6 min-h-[120px] flex flex-col justify-between" data-cursor="hover">
              <div>
                <Icon size={24} className="text-ember mb-3" />
                <h4 className="text-ash font-heading font-bold text-lg">{c.label}</h4>
                <p className="text-smoke text-xs mt-1">{c.desc}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-2xl text-gold font-bold">{c.number}</span>
                <a href={`tel:${c.number}`} className="px-4 py-2 border border-ember text-ember text-sm rounded-lg hover:bg-ember/20 transition-all font-mono" data-cursor="hover">
                  Call Now
                </a>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
