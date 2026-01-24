import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import CardStreamController from './CardStreamController';
import ParticleSystem from './ParticleSystem';
import ParticleScanner from './ParticleScanner';
import './styles.css';

// 1. Wrap the component in forwardRef to accept a 'ref' from the parent
const EventsPage = forwardRef((props, ref) => {
  const streamRef = useRef(null);
  const systemRef = useRef(null);
  const scannerRef = useRef(null);

  // 2. Define the external API for this component
  useImperativeHandle(ref, () => ({
    setScannerScanning: (active) => {
      // 1. Tell the ParticleScanner (visual laser/particles) to toggle
      if (scannerRef.current) {
        scannerRef.current.setScanningActive(active);
      }
      
      // 2. Tell the CardStreamController (card glitching) to toggle
      if (streamRef.current) {
        streamRef.current.setScanActive(active);
      }

      // 3. Toggle CSS Visibility on Mobile
      // We toggle the 'active' class on the HTML elements so they fade in/out
      const scannerEl = document.querySelector('.scanner');
      const scannerCanvas = document.getElementById('scannerCanvas');
      
      if (active) {
          scannerEl?.classList.add('active');
          scannerCanvas?.classList.add('active');
      } else {
          scannerEl?.classList.remove('active');
          scannerCanvas?.classList.remove('active');
      }
    },
    
    pause: () => {
      if (streamRef.current) streamRef.current.toggleAnimation();
    }
  }));

  useEffect(() => {
    const stream = new CardStreamController();
    const system = new ParticleSystem();
    const scanner = new ParticleScanner();

    streamRef.current = stream;
    systemRef.current = system;
    scannerRef.current = scanner;

    return () => {
      if (streamRef.current) streamRef.current.destroy();
      if (systemRef.current) systemRef.current.destroy();
      if (scannerRef.current) scannerRef.current.destroy();
    };
  }, []);

  return (
    <div className="beam-container">
      <canvas id="particleCanvas"></canvas>
      <canvas id="scannerCanvas"></canvas>
      <div className="scanner"></div>
      <div className="card-stream" id="cardStream">
        <div className="card-line" id="cardLine"></div>
      </div>
    </div>
  );
});

export default EventsPage;