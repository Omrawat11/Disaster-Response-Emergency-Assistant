import { useEffect } from 'react';
import useDisasterStore from '../store/disasterStore';

export default function useTickEngine() {
  const tick = useDisasterStore((state) => state.tick);
  const generateAlert = useDisasterStore((state) => state.generateAlert);

  useEffect(() => {
    // Tick the engine every 1500ms
    const interval = setInterval(() => {
      tick();
      
      // Randomly generate new alerts with a lower probability to not flood the system completely
      if (Math.random() > 0.6) {
        generateAlert();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [tick, generateAlert]);
}
