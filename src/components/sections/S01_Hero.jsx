import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useDisasterStore from '../../store/disasterStore';
import CounterStat from '../ui/CounterStat';
import { Shield, AlertTriangle, Home, Users } from 'lucide-react';

export default function S01_Hero() {
  const headlineRef = useRef();
  const subRef = useRef();
  const statsRef = useRef();
  const tickerRef = useRef();
  const { liveStats, alerts } = useDisasterStore();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    // Headline character animation
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.char');
      tl.fromTo(chars,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, stagger: 0.022, duration: 0.7, ease: 'power3.out' }
      );
    }

    // Sub label fade
    if (subRef.current) {
      tl.fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    }

    // Stats bar
    if (statsRef.current) {
      tl.fromTo(statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );
    }
  }, []);

  const headlineText = 'DISASTER RESPONSE';
  const headlineText2 = 'COMMAND CENTER';

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Headline */}
      <div ref={headlineRef} className="mb-6">
        <h1 className="font-heading font-bold text-hero leading-none">
          <span className="block">
            {headlineText.split('').map((ch, i) => (
              <span key={i} className="char inline-block overflow-hidden">
                <span className="inline-block gradient-text">{ch === ' ' ? '\u00A0' : ch}</span>
              </span>
            ))}
          </span>
          <span className="block mt-2">
            {headlineText2.split('').map((ch, i) => (
              <span key={i} className="char inline-block overflow-hidden">
                <span className="inline-block text-ash">{ch === ' ' ? '\u00A0' : ch}</span>
              </span>
            ))}
          </span>
        </h1>
      </div>

      {/* Sub label */}
      <p ref={subRef} className="text-smoke text-base md:text-lg max-w-xl mb-12 font-body opacity-0">
        AI-powered emergency intelligence. Real-time coordination. Life-saving data.
      </p>

      {/* Stats bar */}
      <div ref={statsRef} className="glass rounded-xl px-6 md:px-12 py-5 opacity-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <CounterStat label="People Rescued" value={liveStats.rescued} icon={<Shield size={20} />} />
          <CounterStat label="Active Incidents" value={liveStats.incidents} icon={<AlertTriangle size={20} />} />
          <CounterStat label="Shelters Available" value={liveStats.shelters} icon={<Home size={20} />} />
          <CounterStat label="Volunteers" value={liveStats.volunteers} icon={<Users size={20} />} />
        </div>
      </div>

      {/* Live ticker */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden glass border-t border-[rgba(232,224,213,0.08)]">
        <div ref={tickerRef} className="ticker-track animate-ticker py-2.5 px-4">
          {[...alerts.slice(0, 10), ...alerts.slice(0, 10)].map((alert, i) => (
            <span key={i} className="text-ash text-xs font-mono whitespace-nowrap">
              <span className="text-ember font-bold">[{alert.severity?.toUpperCase()}]</span>{' '}
              {alert.location} — {alert.message?.slice(0, 60)}
              <span className="mx-6 text-smoke">•</span>
            </span>
          ))}
          {alerts.length === 0 && (
            <span className="text-smoke text-xs font-mono">Monitoring global disaster feeds...</span>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-5 h-8 border border-smoke/40 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-ember rounded-full" />
        </div>
      </div>
    </section>
  );
}
