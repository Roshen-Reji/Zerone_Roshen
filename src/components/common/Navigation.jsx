import React from 'react';

const Navigation = ({ currentPage, onNavigate }) => {
  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'technical', label: 'Tech' },
    { id: 'Location', label: 'Location' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-fit">
      {/* ULTRA-GLOSS CONTAINER STYLES:
         - bg-gradient-to-b...: Creates the vertical reflective sheen.
         - backdrop-saturate-150: Makes colors behind the glass pop (refraction effect).
         - border-t-white/20: Simulates a light source hitting the top edge.
         - shadow-[inset...]: Adds an inner "lip" highlight for 3D thickness.
      */}
      <div className="
        flex gap-1 md:gap-2 px-2 py-2 rounded-full
        bg-gradient-to-b from-white/10 to-black/60 
        backdrop-blur-xl backdrop-saturate-150
        border border-white/10 border-t-white/20 border-l-white/10
        shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]
        ring-1 ring-white/5
      ">
        {pages.map(page => {
          const isActive = currentPage === page.id;
          
          return (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              className={`
                relative px-5 py-2.5 rounded-full font-mono text-sm font-medium transition-all duration-300
                group overflow-hidden
                ${isActive 
                  ? 'text-cyan-50 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-cyan-400/30' 
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }
              `}
            >
              {/* Subtle Shimmer Animation on Hover for inactive buttons */}
              {!isActive && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>
              )}
              
              <span className="relative z-10 flex items-center gap-2">
                 {/* Glowing Dot for Active State */}
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_cyan]"></span>
                )}
                {page.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Shimmer Animation Keyframes */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;