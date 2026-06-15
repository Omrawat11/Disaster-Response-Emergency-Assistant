import React from 'react';
import { ExternalLink, Mail, Phone, Globe, MessageSquare } from 'lucide-react';

export default function S20_Footer() {
  return (
    <footer className="border-t border-[rgba(232,224,213,0.08)] mt-20">
      <div className="section py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div>
            <h4 className="text-ash font-heading font-bold text-sm mb-4">Emergency Links</h4>
            <ul className="space-y-2 text-smoke text-xs">
              <li><a href="#alerts" className="hover:text-ember transition-colors">Active Alerts</a></li>
              <li><a href="#shelters" className="hover:text-ember transition-colors">Find Shelter</a></li>
              <li><a href="#report" className="hover:text-ember transition-colors">Report Incident</a></li>
              <li><a href="#" className="hover:text-ember transition-colors">Evacuation Routes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-ash font-heading font-bold text-sm mb-4">Government</h4>
            <ul className="space-y-2 text-smoke text-xs">
              <li><a href="#" className="hover:text-ember transition-colors">NDMA</a></li>
              <li><a href="#" className="hover:text-ember transition-colors">FEMA</a></li>
              <li><a href="#" className="hover:text-ember transition-colors">WHO Emergency</a></li>
              <li><a href="#" className="hover:text-ember transition-colors">Red Cross</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-ash font-heading font-bold text-sm mb-4">Preparedness</h4>
            <ul className="space-y-2 text-smoke text-xs">
              <li><a href="#" className="hover:text-ember transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="hover:text-ember transition-colors">Emergency Kit</a></li>
              <li><a href="#" className="hover:text-ember transition-colors">First Aid Training</a></li>
              <li><a href="#" className="hover:text-ember transition-colors">Family Plan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-ash font-heading font-bold text-sm mb-4">Contact</h4>
            <ul className="space-y-2 text-smoke text-xs">
              <li className="flex items-center gap-2"><Phone size={10} /> Emergency: 112</li>
              <li className="flex items-center gap-2"><Mail size={10} /> ops@rescuenet.org</li>
              <li className="flex items-center gap-2"><ExternalLink size={10} /> rescuenet.org</li>
            </ul>
          </div>
          <div>
            <h4 className="text-ash font-heading font-bold text-sm mb-4">Social</h4>
            <div className="flex gap-3">
              <a href="#" className="text-smoke hover:text-ember transition-colors"><MessageSquare size={18} /></a>
              <a href="#" className="text-smoke hover:text-ember transition-colors"><Globe size={18} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-[rgba(232,224,213,0.08)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-heading text-sm text-ash font-bold">
            RESCUE<span className="text-ember">.</span>NET
          </div>
          <p className="text-smoke text-xs font-mono">© 2026 RescueNet Command Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
