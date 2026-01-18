import React, { useRef, useState } from 'react';
import EventsPage from './index';

const Dashboard = () => {
  const eventsPageRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  const toggleScan = () => {
    const newState = !isScanning;
    setIsScanning(newState);
    if (eventsPageRef.current) {
      eventsPageRef.current.setScannerScanning(newState);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-mono text-white selection:bg-cyan-500 selection:text-black">
      
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Grid Overlay (Cyberpunk Mesh) */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]"></div>

      {/* 2. Ambient Glow Spots */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* --- 3D SCENE CONTENT --- */}
      <div className="absolute inset-0 z-0">
        <EventsPage ref={eventsPageRef} />
      </div>

      {/* --- HUD INTERFACE LAYER --- */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12">
        
        {/* HEADER: System Stats */}
        <header className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">
              EVENTS_LOG
            </h1>
            <div className="flex items-center gap-3 text-xs md:text-sm text-cyan-400/80 tracking-[0.2em] font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              SYSTEM_ONLINE // V.2026
            </div>
          </div>
          
          <div className="hidden md:block text-right opacity-80">
             <div className="text-[10px] text-cyan-500/60 mb-1 tracking-widest">SECTOR COORDINATES</div>
             <div className="font-mono text-cyan-300 text-sm">34.0522° N, 118.2437° W</div>
             <div className="font-mono text-cyan-300 text-sm">ELEVATION: 1200FT</div>
          </div>
        </header>

        {/* FOOTER: Controls & Status */}
        <footer className="flex items-end justify-between pointer-events-auto">
           <div className="flex flex-col gap-4">
              {/* Decorative Bar */}
              <div className="w-48 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent opacity-60"></div>
              
              <p className="max-w-md text-xs text-cyan-200/60 leading-relaxed hidden md:block backdrop-blur-sm bg-black/20 p-2 rounded border-l-2 border-cyan-500/30">
                <strong className="text-cyan-400">INSTRUCTION:</strong> Drag horizontally to navigate the data stream. 
                Activate the <span className="text-white">Neural Scanner</span> to decrypt event details and hidden data.
              </p>
           </div>

           {/* MAIN CONTROL BUTTON */}
           <button 
             onClick={toggleScan}
             className={`
               group relative px-8 py-4 overflow-hidden rounded-sm border border-cyan-500/40 bg-black/60 backdrop-blur-xl transition-all duration-300 
               hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] active:scale-95
             `}
           >
             {/* Hover Fill Effect */}
             <div className={`absolute inset-0 bg-cyan-500/10 transition-transform duration-500 origin-left ${isScanning ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
             
             <div className="relative flex items-center gap-4">
               {/* Status Icon */}
               <div className={`w-3 h-3 border border-cyan-400 transition-all duration-300 ${isScanning ? 'bg-cyan-400 shadow-[0_0_10px_cyan]' : 'rotate-45'}`}></div>
               
               <div className="text-left">
                 <div className="text-[10px] text-cyan-500/80 tracking-widest mb-0.5">COMMAND</div>
                 <span className="font-mono font-bold tracking-widest text-cyan-100 text-lg">
                   {isScanning ? 'ABORT SCAN' : 'INITIATE SCAN'}
                 </span>
               </div>
             </div>
           </button>
        </footer>
      </div>

      {/* --- DECORATIVE CORNER BRACKETS --- */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg z-30 pointer-events-none"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-lg z-30 pointer-events-none"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-lg z-30 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg z-30 pointer-events-none"></div>

      {/* --- SCANLINES ANIMATION --- */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] opacity-20"></div>

    </div>
  );
};

export default Dashboard;