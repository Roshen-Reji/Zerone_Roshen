import React, { useState } from 'react';

const EventCard = ({ title, description, image, redirectTo, className = "w-80 h-96" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className={`relative ${className} cursor-pointer perspective-1000 group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={redirectTo}
      >
        <div
          className={`relative w-full h-full transition-all duration-700 transform-style-3d ${
            isHovered ? 'rotate-y-10 scale-105' : ''
          }`}
        >
          {/* GLASS CARD CONTAINER 
             - Replaced bg-white with transparent black + blur
             - Added border for definition
          */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* IMAGE SECTION */}
            <div className="relative h-3/5 overflow-hidden">
               {/* Gradient Overlay for better text contrast/blending */}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
               
               <img 
                 src={image} 
                 alt={title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
               />
               
               {/* Decorative Tech Line */}
               <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent z-20"></div>
            </div>

            {/* CONTENT SECTION */}
            <div className="relative h-2/5 p-6 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/60">
              <div>
                {/* Updated text colors for dark mode */}
                <h3 className="text-2xl font-bold text-white mb-2 font-sans tracking-wide group-hover:text-cyan-400 transition-colors">
                  {title}
                </h3>
                <p className="text-blue-100/60 text-sm leading-relaxed font-light">
                  {description}
                </p>
              </div>
              
              {/* Call to Action Pill */}
              <div className="flex justify-end mt-4">
                <span className="text-xs font-mono text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  EXPLORE &rarr;
                </span>
              </div>
            </div>

          </div>
        </div>
        
        {/* Glow effect behind the card */}
        <div className={`absolute -inset-4 bg-cyan-500/20 rounded-[2rem] blur-2xl -z-10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-10 { transform: rotateY(10deg); }
      `}</style>
    </>
  );
};

export default EventCard;