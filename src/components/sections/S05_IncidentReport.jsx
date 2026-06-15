import React, { useState } from 'react';
import GlassCard from '../ui/GlassCard';

const steps = [
  { id: 1, title: 'Incident Type', desc: 'Select the type of emergency' },
  { id: 2, title: 'Location & Details', desc: 'Provide location and description' },
  { id: 3, title: 'Severity & Media', desc: 'Rate severity and attach evidence' },
  { id: 4, title: 'Confirmation', desc: 'Review and submit report' },
];

const incidentTypes = [
  { type: 'flood', label: 'Flood', emoji: '🌊' },
  { type: 'wildfire', label: 'Wildfire', emoji: '🔥' },
  { type: 'earthquake', label: 'Earthquake', emoji: '🌍' },
  { type: 'cyclone', label: 'Cyclone', emoji: '🌪️' },
  { type: 'medical', label: 'Medical', emoji: '🏥' },
  { type: 'rescue', label: 'Rescue', emoji: '🚁' },
];

export default function S05_IncidentReport() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ type: '', location: '', description: '', severity: 'moderate', image: null });
  const [caseId, setCaseId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const now = new Date();
    const id = `RESCUE-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    setCaseId(id);
    setSubmitted(true);
  };

  const progressWidth = `${(step / 4) * 100}%`;

  return (
    <section id="report" className="section py-20">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 gradient-text">Incident Report</h2>
      <p className="text-smoke mb-8 text-sm">Report an emergency in 4 steps</p>

      {/* Progress bar */}
      <div className="h-1 bg-surface rounded-full mb-8 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: progressWidth, background: 'linear-gradient(90deg, #C8410A, #D4A853)' }} />
      </div>

      <div className="flex gap-4 mb-8">
        {steps.map((s) => (
          <div key={s.id} className={`flex-1 text-center text-xs font-mono uppercase ${step >= s.id ? 'text-ember' : 'text-smoke'}`}>
            Step {s.id}
          </div>
        ))}
      </div>

      <GlassCard className="p-6 md:p-8" hover={false}>
        {!submitted ? (
          <>
            {step === 1 && (
              <div>
                <h3 className="font-heading text-lg mb-4 text-ash">Select Incident Type</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {incidentTypes.map((t) => (
                    <button
                      key={t.type}
                      onClick={() => { setForm({ ...form, type: t.type }); setStep(2); }}
                      className={`p-4 rounded-lg border text-center transition-all hover:border-ember ${
                        form.type === t.type ? 'border-ember bg-ember/10' : 'border-[rgba(232,224,213,0.08)]'
                      }`}
                    >
                      <div className="text-2xl mb-1">{t.emoji}</div>
                      <div className="text-xs text-ash">{t.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-heading text-lg mb-4 text-ash">Location & Description</h3>
                <input
                  type="text"
                  placeholder="Location (e.g., Mumbai, India)"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-surface border border-[rgba(232,224,213,0.08)] rounded-lg px-4 py-3 text-ash text-sm font-body placeholder-smoke focus:border-ember focus:outline-none transition-colors"
                />
                <textarea
                  placeholder="Describe the emergency..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-surface border border-[rgba(232,224,213,0.08)] rounded-lg px-4 py-3 text-ash text-sm font-body placeholder-smoke focus:border-ember focus:outline-none transition-colors h-32 resize-none"
                />
                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="text-smoke text-sm hover:text-ash">← Back</button>
                  <button onClick={() => setStep(3)} className="px-6 py-2 bg-ember/20 border border-ember text-ember text-sm rounded-lg hover:bg-ember/30 transition-all">Next →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-heading text-lg mb-4 text-ash">Severity & Evidence</h3>
                <div className="flex gap-3">
                  {['safe', 'moderate', 'high', 'critical'].map((sev) => (
                    <button
                      key={sev}
                      onClick={() => setForm({ ...form, severity: sev })}
                      className={`flex-1 py-2 rounded-lg text-xs font-mono uppercase border transition-all ${
                        form.severity === sev ? 'border-ember bg-ember/10 text-ember' : 'border-[rgba(232,224,213,0.08)] text-smoke'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
                <div className="border-2 border-dashed border-ember/40 rounded-lg p-8 text-center">
                  <p className="text-smoke text-sm">Drag & drop image evidence here</p>
                  <p className="text-smoke/50 text-xs mt-1">or click to browse</p>
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setStep(2)} className="text-smoke text-sm hover:text-ash">← Back</button>
                  <button onClick={() => setStep(4)} className="px-6 py-2 bg-ember/20 border border-ember text-ember text-sm rounded-lg hover:bg-ember/30 transition-all">Next →</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 text-center">
                <h3 className="font-heading text-lg mb-4 text-ash">Review & Submit</h3>
                <div className="text-sm text-smoke space-y-2">
                  <p>Type: <span className="text-ash font-mono uppercase">{form.type || 'N/A'}</span></p>
                  <p>Location: <span className="text-ash">{form.location || 'N/A'}</span></p>
                  <p>Severity: <span className="text-ember font-mono uppercase">{form.severity}</span></p>
                </div>
                <div className="flex justify-center gap-4 mt-6">
                  <button onClick={() => setStep(3)} className="text-smoke text-sm hover:text-ash">← Back</button>
                  <button onClick={handleSubmit} className="px-8 py-3 bg-ember text-void font-bold text-sm rounded-lg hover:bg-gold transition-all">
                    Submit Report
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full border-2 border-ember flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-ember" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-heading text-xl text-ash mb-2">Report Submitted</h3>
            <p className="font-mono text-lg text-gold">{caseId}</p>
            <p className="text-smoke text-sm mt-2">Emergency teams have been notified</p>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ type: '', location: '', description: '', severity: 'moderate', image: null }); }}
              className="mt-6 text-ember text-sm underline"
            >
              File Another Report
            </button>
          </div>
        )}
      </GlassCard>
    </section>
  );
}
