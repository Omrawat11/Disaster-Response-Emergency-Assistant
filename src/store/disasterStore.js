import { create } from 'zustand';

const initialStats = {
  rescued: 14832,
  incidents: 47,
  shelters: 312,
  volunteers: 2840,
};

const useDisasterStore = create((set, get) => ({
  // Simulation state
  simulation: null, // null | 'flood' | 'wildfire' | 'cyclone' | 'earthquake'
  
  // Alert level
  alertLevel: 'moderate', // 'safe' | 'moderate' | 'high' | 'critical'
  
  // Live statistics
  liveStats: { ...initialStats },
  
  // Previous stats (for animation deltas)
  prevStats: { ...initialStats },
  
  // Alerts feed
  alerts: [],
  
  // Loading state
  isLoaded: false,
  
  // Particle count (performance adaptive)
  particleCount: 120000,
  
  // Actions
  setSimulation: (type) => {
    set({ simulation: type });
    // Set body data attribute for CSS simulation overrides
    if (type) {
      document.body.dataset.sim = type;
    } else {
      delete document.body.dataset.sim;
    }
  },
  
  setAlertLevel: (level) => set({ alertLevel: level }),
  
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  
  setParticleCount: (count) => set({ particleCount: count }),
  
  addAlert: (alert) => set((state) => ({
    alerts: [alert, ...state.alerts].slice(0, 50), // Keep last 50
  })),
  
  // Tick update — called by useTickEngine every 1500ms
  tick: () => {
    const { liveStats, simulation } = get();
    
    // Randomized deltas
    const rescuedDelta = Math.floor(Math.random() * 4) + 1; // +1 to +4
    const incidentDelta = Math.random() > 0.5 ? 1 : -1;
    const shelterDelta = (Math.random() - 0.5) * 1; // ±0.5% occupancy change
    const volunteerDelta = Math.floor((Math.random() - 0.5) * 4); // ±2
    
    // Simulation-specific modifiers
    let simMultiplier = 1;
    if (simulation === 'wildfire') simMultiplier = 1.5;
    if (simulation === 'earthquake') simMultiplier = 2;
    if (simulation === 'cyclone') simMultiplier = 1.3;
    if (simulation === 'flood') simMultiplier = 1.2;
    
    set({
      prevStats: { ...liveStats },
      liveStats: {
        rescued: liveStats.rescued + Math.floor(rescuedDelta * simMultiplier),
        incidents: Math.max(0, liveStats.incidents + incidentDelta),
        shelters: Math.max(0, liveStats.shelters + Math.round(shelterDelta)),
        volunteers: Math.max(0, liveStats.volunteers + volunteerDelta),
      },
    });
  },
  
  // Generate random alert
  generateAlert: () => {
    const types = ['flood', 'wildfire', 'cyclone', 'earthquake', 'medical', 'rescue'];
    const severities = ['critical', 'high', 'moderate', 'safe'];
    const locations = [
      'Mumbai, India', 'Tokyo, Japan', 'San Francisco, USA',
      'Jakarta, Indonesia', 'Manila, Philippines', 'Dhaka, Bangladesh',
      'Istanbul, Turkey', 'Mexico City, Mexico', 'Lima, Peru',
      'Kathmandu, Nepal', 'Port-au-Prince, Haiti', 'Christchurch, NZ',
    ];
    const messages = [
      'Flash flood warning issued for coastal areas',
      'Wildfire spreading rapidly — evacuation in progress',
      'Cyclone Category 4 approaching eastern coast',
      'Earthquake magnitude 6.2 detected — aftershocks expected',
      'Medical emergency — multiple casualties reported',
      'Search and rescue operation initiated',
      'Shelter capacity reaching critical levels',
      'Volunteer deployment requested for disaster zone',
      'Emergency supply airdrop scheduled',
      'Structural damage assessment underway',
    ];
    
    const alert = {
      id: `ALERT-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
      type: types[Math.floor(Math.random() * types.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date().toISOString(),
      coordinates: {
        lat: (Math.random() * 140 - 70).toFixed(2),
        lng: (Math.random() * 360 - 180).toFixed(2),
      },
    };
    
    get().addAlert(alert);
    return alert;
  },
}));

export default useDisasterStore;
