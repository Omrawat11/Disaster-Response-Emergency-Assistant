import React, { useState } from 'react';
import alertsData from '../../data/alerts.json';
import useDisasterStore from '../../store/disasterStore';
import GlassCard from '../ui/GlassCard';

const tabs = ['critical', 'high', 'moderate', 'safe'];

export default function S03_AlertSystem() {
  const [activeTab, setActiveTab] = useState('critical');
  const storeAlerts = useDisasterStore((s) => s.alerts);
  const allAlerts = [...storeAlerts, ...alertsData];

  const filtered = allAlerts.filter((a) => a.severity === activeTab);

  return (
    <section id="alerts" className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Alert System</h2>
      <p className="text-smoke mb-8 text-sm">Global disaster monitoring & classification</p>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-mono uppercase tracking-wider rounded-lg transition-all duration-300 border ${
              activeTab === tab
                ? 'bg-ember/20 border-ember text-ember'
                : 'border-[rgba(232,224,213,0.08)] text-smoke hover:text-ash hover:border-smoke'
            }`}
            data-cursor="hover"
          >
            {tab}
            <span className="ml-2 text-[10px] opacity-60">
              ({allAlerts.filter((a) => a.severity === tab).length})
            </span>
          </button>
        ))}
      </div>

      {/* Alert cards */}
      <div className="space-y-3">
        {filtered.slice(0, 10).map((alert, i) => (
          <GlassCard
            key={alert.id || i}
            className={`p-4 ${
              alert.severity === 'critical' ? 'border-l-2 border-l-ember' :
              alert.severity === 'high' ? 'border-l-2 border-l-gold' :
              alert.severity === 'moderate' ? 'border-l-2 border-l-ash' : 'border-l-2 border-l-smoke'
            } ${alert.severity === 'critical' ? 'animate-pulse-ember' : ''}`}
            hover={false}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                    alert.severity === 'critical' ? 'bg-ember/20 text-ember' :
                    alert.severity === 'high' ? 'bg-gold/20 text-gold' : 'bg-smoke/20 text-smoke'
                  }`}>
                    {alert.type}
                  </span>
                  <span className="text-smoke text-xs">{alert.location}</span>
                </div>
                <p className="text-ash text-sm">{alert.message}</p>
              </div>
              <span className="text-smoke text-[10px] font-mono whitespace-nowrap">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </GlassCard>
        ))}
        {filtered.length === 0 && (
          <p className="text-smoke text-sm font-mono py-8 text-center">No {activeTab} alerts active</p>
        )}
      </div>
    </section>
  );
}
