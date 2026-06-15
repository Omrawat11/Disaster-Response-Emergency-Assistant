import React from 'react';
import newsData from '../../data/news.json';
import useDisasterStore from '../../store/disasterStore';
import { Newspaper } from 'lucide-react';

export default function S18_NewsFeed() {
  const alerts = useDisasterStore((s) => s.alerts);
  const liveNews = alerts.slice(0, 5).map((a, i) => ({
    id: `live-${i}`, headline: a.message, source: 'Live Feed', timestamp: a.timestamp, urgency: a.severity,
  }));
  const allNews = [...liveNews, ...newsData];

  return (
    <section className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">News Feed</h2>
      <p className="text-smoke mb-8 text-sm">Latest disaster intelligence reports</p>
      <div className="space-y-3 relative">
        {/* Scan line overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(200,65,10,0.1) 3px, rgba(200,65,10,0.1) 4px)' }} />
        {allNews.slice(0, 12).map((item, i) => (
          <div key={item.id || i} className="glass rounded-lg p-4 flex items-start gap-3 border-l-2 border-l-ember/50">
            <Newspaper size={14} className="text-ember mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-ash text-sm">{item.headline}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-smoke text-[10px] font-mono">{item.source}</span>
                <span className="text-smoke/50 text-[10px] font-mono">{new Date(item.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
