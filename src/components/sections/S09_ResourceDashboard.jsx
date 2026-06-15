import React from 'react';
import resourcesData from '../../data/resources.json';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

export default function S09_ResourceDashboard() {
  const data = resourcesData.map((r) => ({ name: r.name, current: r.current, target: r.target }));
  return (
    <section className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Resource Dashboard</h2>
      <p className="text-smoke mb-8 text-sm">Supply chain status & allocation</p>
      <div className="glass rounded-xl p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical" margin={{ left: 100 }}>
            <XAxis type="number" domain={[0, 100]} stroke="#5C5650" tick={{ fill: '#5C5650', fontSize: 12 }} />
            <YAxis type="category" dataKey="name" stroke="#5C5650" tick={{ fill: '#E8E0D5', fontSize: 12, fontFamily: 'Inter' }} />
            <Bar dataKey="current" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.current < 40 ? '#C8410A' : entry.current < 70 ? '#D4A853' : '#E8E0D5'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
