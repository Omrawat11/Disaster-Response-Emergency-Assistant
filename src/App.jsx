import React, { useState, lazy, Suspense } from 'react';
import useDisasterStore from './store/disasterStore';
import useTickEngine from './hooks/useTickEngine';
import useSmoothScroll from './hooks/useSmoothScroll';
import { Scene } from './components/canvas/Scene';
import EarthGlobe from './components/canvas/EarthGlobe';
import ParticleField from './components/canvas/ParticleField';
import SimOverlay from './components/canvas/SimOverlay';
import Navbar from './components/ui/Navbar';
import S00_Loading from './components/sections/S00_Loading';
import S01_Hero from './components/sections/S01_Hero';
import S02_CommandCenter from './components/sections/S02_CommandCenter';
import S03_AlertSystem from './components/sections/S03_AlertSystem';
import S05_IncidentReport from './components/sections/S05_IncidentReport';
import S06_ShelterLocator from './components/sections/S06_ShelterLocator';
import S07_SafetyGuidelines from './components/sections/S07_SafetyGuidelines';
import S08_EmergencyContacts from './components/sections/S08_EmergencyContacts';
import S09_ResourceDashboard from './components/sections/S09_ResourceDashboard';
import S10_VolunteerCenter from './components/sections/S10_VolunteerCenter';
import S11_AIAssistant from './components/sections/S11_AIAssistant';
import S12_DisasterSimulation from './components/sections/S12_DisasterSimulation';
import S13_ResponseTimeline from './components/sections/S13_ResponseTimeline';
import S14_MissingPersons from './components/sections/S14_MissingPersons';
import S15_Donations from './components/sections/S15_Donations';
import S16_Checklist from './components/sections/S16_Checklist';
import S17_RescueNetwork from './components/sections/S17_RescueNetwork';
import S18_NewsFeed from './components/sections/S18_NewsFeed';
import S19_Analytics from './components/sections/S19_Analytics';
import S20_Footer from './components/sections/S20_Footer';

function App() {
  const [loaded, setLoaded] = useState(false);

  // Start the tick engine
  useTickEngine();

  // Start smooth scroll
  const { scrollProgress } = useSmoothScroll();

  return (
    <div className="relative bg-void text-ash font-body overflow-x-hidden">
      {/* Loading Screen */}
      {!loaded && <S00_Loading onComplete={() => setLoaded(true)} />}

      {/* Navbar */}
      <Navbar />

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[101]"
        style={{
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, #C8410A, #D4A853)',
        }}
      />

      {/* 3D Canvas Background — hero section */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <Scene>
          <EarthGlobe />
          <ParticleField count={800} />
          <SimOverlay />
        </Scene>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* S01 Hero — transparent over 3D canvas */}
        <S01_Hero />

        {/* Opaque background sections */}
        <div className="bg-void relative">
          <S02_CommandCenter />
          <S03_AlertSystem />

          {/* Divider */}
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
          </div>

          <S12_DisasterSimulation />
          <S05_IncidentReport />
          <S06_ShelterLocator />

          <div className="max-w-[1400px] mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
          </div>

          <S07_SafetyGuidelines />
          <S08_EmergencyContacts />
          <S09_ResourceDashboard />
          <S10_VolunteerCenter />

          <div className="max-w-[1400px] mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
          </div>

          <S13_ResponseTimeline />
          <S14_MissingPersons />
          <S15_Donations />
          <S16_Checklist />
          <S17_RescueNetwork />
          <S18_NewsFeed />
          <S19_Analytics />

          <S20_Footer />
        </div>
      </main>

      {/* AI Assistant (floating) */}
      <S11_AIAssistant />
    </div>
  );
}

export default App;
