import React from 'react';
import EventCard from '../components/common/EventCard';

// Images
import sellProductImg from '../assets/images.jpg'; 
import projectAutopsy from '../assets/projectAutopsy.jpeg';
import frogOpsimg from '../assets/frogOps.jpg';

const HomePage = ({ onNavigate }) => {

  const events = [
    {
      id: 1,
      title: "Sell The Product",
      description: "Are You capable of Selling the given product at the highest sum?",
      image: sellProductImg,
      redirectTo: () => { window.location.href = 'https://sell-product-z1.vercel.app'; }
    },
    {
      id: 2,
      title: "Project Autopsy",
      description: "Break the product. Fix the thinking.",
      image: projectAutopsy,
      redirectTo: () => onNavigate('projectAutopsy')
    },
    {
      id: 3,
      title: "FrogOps",
      description: "Hop your way through CSS",
      image: frogOpsimg,
      redirectTo: () => { window.location.href = 'https://frog-ops-z1.vercel.app/'; }
    }
  ];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden bg-[#050505]">
      
      {/* --- AMBIENT BACKGROUND EFFECTS --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse-slow delay-1000"></div>
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
      <div className="relative z-10 text-center mb-16 md:mb-24">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] mb-6 animate-fadeIn">
          ZERONE
          <span className="block text-2xl md:text-4xl font-light tracking-[0.5em] text-cyan-400 mt-2 font-mono">2026</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-200/60 font-light tracking-wide animate-slideUp backdrop-blur-sm py-2 rounded-full border border-white/5 bg-white/5">
          IEEE CE-KGR's Annual Technical Fest
        </p>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-16 mb-20 perspective-container">
        {events.map((event, index) => (
          <div 
            key={event.id}
            className="animate-slideUp hover:z-20 transition-all duration-500"
            style={{ 
              animationDelay: `${index * 0.15}s`,
              opacity: 0
            }}
          >
            <EventCard 
              {...event} 
              // Passing specific gradient colors for each card if desired, or keep uniform
              className="w-80 md:w-96 h-[30rem] md:h-[34rem]" 
            />
          </div>
        ))}
      </div>

      {/* --- FOOTER / CREDIT --- */}
      <div className="relative z-10 w-full max-w-xl animate-slideUp" style={{ animationDelay: '0.6s' }}>
        <div className="group bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center transition-all duration-500 hover:bg-black/50 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <div className="inline-block mb-4 p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 group-hover:scale-110 transition-transform duration-500">
             <span className="text-2xl">👨‍💻</span>
          </div>
          <h2 className="text-white text-xl font-bold tracking-wider mb-1">Coded by <span className="text-cyan-400">Roshen</span></h2>
          <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">2nd Sem // Tech Enthusiast</p>
          <p className="text-white/60 text-sm leading-relaxed font-light">
            "Crafting digital experiences where logic meets creativity. Bringing people together through innovation."
          </p>
        </div>
      </div>
      
      {/* --- STYLES --- */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn { 
          animation: fadeIn 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
        }

        .animate-slideUp {
          animation: slideUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;