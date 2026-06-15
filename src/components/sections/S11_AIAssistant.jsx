import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const responses = {
  shelter: 'The nearest shelter is Central Relief Center, 2.3 km away. Capacity: 500, currently at 68% occupancy.',
  help: 'Emergency services have been notified. Stay calm, move to higher ground if flooding, and keep your phone charged.',
  water: 'Drinking water is available at all active shelters. Boil water before consumption if supply lines are damaged.',
  safety: 'Safety tip: Keep an emergency kit ready with water, food, flashlight, first aid, and important documents.',
  default: 'I can help with shelter locations, safety tips, resource availability, and emergency contacts. What do you need?',
};

function getReply(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('shelter') || lower.includes('near')) return responses.shelter;
  if (lower.includes('help') || lower.includes('emergency')) return responses.help;
  if (lower.includes('water') || lower.includes('drink')) return responses.water;
  if (lower.includes('safe') || lower.includes('tip')) return responses.safety;
  return responses.default;
}

export default function S11_AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'ai', text: 'RescueNet AI online. How can I assist you?' }]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { from: 'user', text: userMsg }]);
    setInput('');
    setThinking(true);

    setTimeout(() => {
      setMessages((m) => [...m, { from: 'ai', text: getReply(userMsg) }]);
      setThinking(false);
    }, 800);
  };

  return (
    <>
      {/* Floating orb */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center shadow-lg animate-pulse-ember"
        style={{ background: 'radial-gradient(circle, #C8410A, #7A0F0F)' }}
        data-cursor="hover"
      >
        {open ? <X size={20} className="text-ash" /> : <MessageCircle size={20} className="text-ash" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[90] w-80 max-h-[420px] glass rounded-xl border border-ember/30 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-[rgba(232,224,213,0.08)] flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-ember animate-pulse" />
            <span className="text-ash text-sm font-heading font-bold">RescueNet AI</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-72">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-lg text-xs ${
                  m.from === 'user' ? 'bg-ember/20 text-ash' : 'bg-surface text-smoke'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-1 px-3 py-2">
                <span className="w-1.5 h-1.5 bg-ember rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-ember rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-ember rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          <div className="p-3 border-t border-[rgba(232,224,213,0.08)] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-surface border border-[rgba(232,224,213,0.08)] rounded-lg px-3 py-2 text-xs text-ash placeholder-smoke focus:border-ember focus:outline-none"
            />
            <button onClick={handleSend} className="text-ember hover:text-gold transition-colors" data-cursor="hover">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
