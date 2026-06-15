import React from 'react';
import networkData from '../../data/network.json';

export default function S17_RescueNetwork() {
  const edges = [];
  networkData.forEach((node) => {
    node.connections.forEach((connId) => {
      const target = networkData.find((n) => n.id === connId);
      if (target && node.id < connId) {
        edges.push({ from: node, to: target, key: `${node.id}-${connId}` });
      }
    });
  });

  return (
    <section className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Rescue Network</h2>
      <p className="text-smoke mb-8 text-sm">Interconnected emergency response topology</p>
      <div className="glass rounded-xl p-4 overflow-hidden">
        <svg viewBox="0 0 800 600" className="w-full h-auto">
          {/* Edges */}
          {edges.map((e) => (
            <line key={e.key} x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y}
              stroke="#C8410A" strokeWidth="1" opacity="0.4"
              strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
            </line>
          ))}
          {/* Nodes */}
          {networkData.map((node) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r={node.type === 'hub' ? 20 : 14}
                fill="#0e1018" stroke="#C8410A" strokeWidth="1.5" opacity="0.9">
                <animate attributeName="r" values={`${node.type === 'hub' ? 20 : 14};${node.type === 'hub' ? 23 : 16};${node.type === 'hub' ? 20 : 14}`}
                  dur="3s" repeatCount="indefinite" />
              </circle>
              <text x={node.x} y={node.y + (node.type === 'hub' ? 35 : 28)}
                textAnchor="middle" fill="#E8E0D5" fontSize="10" fontFamily="Inter">
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
