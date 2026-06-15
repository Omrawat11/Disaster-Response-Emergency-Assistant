import React from 'react';
import useDisasterStore from '../../store/disasterStore';
import GlassCard from '../ui/GlassCard';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Shield, AlertTriangle, Home, Users, Activity, Radio } from 'lucide-react';

const iconMap = {
  rescued: Shield,
  incidents: AlertTriangle,
  shelters: Home,
  volunteers: Users,
  response: Activity,
  comms: Radio,
};

const cardData = [
  { key: 'rescued', label: 'People Rescued', icon: 'rescued' },
  { key: 'incidents', label: 'Active Incidents', icon: 'incidents' },
  { key: 'shelters', label: 'Shelters Active', icon: 'shelters' },
  { key: 'volunteers', label: 'Field Volunteers', icon: 'volunteers' },
  { key: 'response', label: 'Avg Response', value: '4.2 min', icon: 'response' },
  { key: 'comms', label: 'Comms Online', value: '99.7%', icon: 'comms' },
];

// Fake mini chart data
const miniData = Array.from({ length: 12 }, (_, i) => ({ v: Math.random() * 40 + 30 }));

export default function S02_CommandCenter() {
  const { liveStats, alerts } = useDisasterStore();

  const getStatValue = (key) => {
    if (key === 'response') return '4.2 min';
    if (key === 'comms') return '99.7%';
    return (liveStats[key] || 0).toLocaleString();
  };

  return (
    <section id="command-center" className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Command Center</h2>
      <p className="text-smoke mb-10 text-sm">Real-time operational dashboard</p>

      {/* 6 stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {cardData.map((card) => {
          const Icon = iconMap[card.icon];
          return (
            <GlassCard key={card.key} className="p-4 text-center" data-cursor="hover">
              <Icon size={20} className="text-ember mx-auto mb-2" />
              <div className="text-xs text-smoke mb-1 uppercase tracking-wider">{card.label}</div>
              <div className="text-xl font-mono font-bold text-ash">{getStatValue(card.key)}</div>
              <div className="mt-3 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={miniData}>
                    <Line type="monotone" dataKey="v" stroke="#C8410A" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Emergency Status Feed */}
      <GlassCard className="p-6" hover={false}>
        <h3 className="font-heading text-lg font-bold text-ash mb-4">Emergency Status Feed</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {alerts.slice(0, 8).map((alert, i) => (
            <div
              key={alert.id || i}
              className={`flex items-start gap-3 p-3 rounded-lg bg-surface/50 border-l-2 ${
                alert.severity === 'critical' ? 'border-ember' :
                alert.severity === 'high' ? 'border-gold' : 'border-smoke'
              }`}
            >
              <AlertTriangle size={14} className={alert.severity === 'critical' ? 'text-ember' : 'text-gold'} />
              <div className="flex-1 min-w-0">
                <div className="text-ash text-sm truncate">{alert.message}</div>
                <div className="text-smoke text-xs font-mono mt-1">{alert.location} • {new Date(alert.timestamp).toLocaleTimeString()}</div>
              </div>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                alert.severity === 'critical' ? 'bg-ember/20 text-ember' : 'bg-gold/20 text-gold'
              }`}>
                {alert.severity}
              </span>
            </div>
          ))}
          {alerts.length === 0 && <p className="text-smoke text-sm font-mono">No alerts yet — monitoring...</p>}
        </div>
      </GlassCard>
    </section>
  );
}
