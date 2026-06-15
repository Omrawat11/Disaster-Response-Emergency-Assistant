import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Command', href: '#command-center' },
    { label: 'Alerts', href: '#alerts' },
    { label: 'Map', href: '#disaster-map' },
    { label: 'Shelters', href: '#shelters' },
    { label: 'Report', href: '#report' },
    { label: 'Volunteer', href: '#volunteer' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-[20px] bg-[rgba(232,224,213,0.04)] border-b border-[rgba(232,224,213,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="font-heading text-xl font-bold text-ash tracking-wider flex items-center gap-0">
            RESCUE
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-ember mx-1 animate-pulse" />
            NET
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-smoke hover:text-ash text-sm font-body transition-colors duration-300"
                data-cursor="hover"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#report"
              className="flex items-center gap-2 px-4 py-2 border border-ember text-ash text-sm font-body rounded-md animate-border-pulse hover:bg-ember/20 transition-all duration-300"
              data-cursor="hover"
            >
              ⚡ Emergency
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-cursor="hover"
          >
            <span className={`w-5 h-[2px] bg-ash transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`w-5 h-[2px] bg-ash transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-[2px] bg-ash transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99] bg-void flex flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-ash text-2xl font-heading"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
