import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import GlassCard from '../ui/GlassCard';

const COLORS = ['#C8410A', '#D4A853', '#E8E0D5', '#7A0F0F'];

const pieData = [
  { name: 'Earthquake', value: 35 }, { name: 'Flood', value: 28 },
  { name: 'Wildfire', value: 22 }, { name: 'Cyclone', value: 15 },
];
const lineData = Array.from({ length: 7 }, (_, i) => ({ day: `Day ${i+1}`, incidents: Math.floor(Math.random() * 30 + 20) }));
const barData = [
  { name: 'Medical', amt: 78 }, { name: 'Water', amt: 45 },
  { name: 'Food', amt: 62 }, { name: 'Equipment', amt: 88 }, { name: 'Blankets', amt: 34 },
];
const areaData = Array.from({ length: 7 }, (_, i) => ({ day: `D${i+1}`, occupancy: Math.floor(Math.random() * 30 + 50) }));

export default function S19_Analytics() {
  return (
    <section className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Analytics</h2>
      <p className="text-smoke mb-8 text-sm">Operational intelligence & trend analysis</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard className="p-5" hover={false}>
          <h4 className="text-ash text-sm font-bold mb-3">Disaster Types</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name }) => name}>
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie></PieChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-5" hover={false}>
          <h4 className="text-ash text-sm font-bold mb-3">Weekly Incidents</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}><XAxis dataKey="day" stroke="#5C5650" tick={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="incidents" stroke="#C8410A" strokeWidth={2} dot={false} /></LineChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-5" hover={false}>
          <h4 className="text-ash text-sm font-bold mb-3">Resource Levels</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}><XAxis dataKey="name" stroke="#5C5650" tick={{ fontSize: 10 }} />
              <Bar dataKey="amt" fill="#C8410A" radius={[4, 4, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-5" hover={false}>
          <h4 className="text-ash text-sm font-bold mb-3">Shelter Occupancy</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={areaData}><XAxis dataKey="day" stroke="#5C5650" tick={{ fontSize: 10 }} />
              <Area type="monotone" dataKey="occupancy" stroke="#C8410A" fill="#C8410A" fillOpacity={0.15} /></AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </section>
  );
}
