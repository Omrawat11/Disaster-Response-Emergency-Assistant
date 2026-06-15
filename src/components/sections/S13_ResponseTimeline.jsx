import React from 'react';
import timelineData from '../../data/timeline.json';
import { Radar, Radio, Users, Truck, Home, HeartHandshake } from 'lucide-react';

const iconMap = { Radar, Radio, Users, Truck, Home, HeartHandshake };

export default function S13_ResponseTimeline() {
  return (
    <section className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Response Timeline</h2>
      <p className="text-smoke mb-12 text-sm">Standard emergency response protocol</p>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-ember/30" />
        {timelineData.map((node, i) => {
          const Icon = iconMap[node.icon] || Radar;
          const isLeft = i % 2 === 0;
          return (
            <div key={node.id} className={`relative flex items-start mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-ember border-2 border-void z-10" />
              {/* Content */}
              <div className={`ml-14 md:ml-0 md:w-[45%] ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="glass rounded-xl p-5">
                  <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                    <Icon size={16} className="text-ember" />
                    <span className="font-mono text-xs text-gold">{node.time}</span>
                  </div>
                  <h4 className="text-ash font-heading font-bold mb-1">{node.title}</h4>
                  <p className="text-smoke text-xs">{node.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
