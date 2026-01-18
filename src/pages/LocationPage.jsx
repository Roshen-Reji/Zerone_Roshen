import React from 'react';
import MapPin from '../components/icons/MapPin';

const LocationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 pt-20 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />

      {/* Main Glass Container */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10 max-w-6xl w-full shadow-2xl animate-fadeInUp">
        
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white flex items-center gap-3 md:gap-4 drop-shadow-lg">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            Location Details
          </h1>
          <p className="text-white/60 mt-2 ml-1 md:ml-2 text-lg">
            Find your way to the event.
          </p>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full">
          
          {/* LEFT COLUMN: Details Cards */}
          <div className="space-y-6 flex flex-col justify-center">
            
            {/* Venue Card */}
            <div className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:translate-x-2">
              <h2 className="text-xl font-semibold text-blue-300 mb-2 flex items-center gap-2">
                📍 Main Venue
              </h2>
              <p className="text-2xl text-white font-bold mb-1">College Auditorium</p>
              <p className="text-white/70">
                College of Engineering, Kidangoor<br />
                Kidangoor South P.O, Kottayam<br />
                Kerala - 686583
              </p>
            </div>

            {/* Transport Card */}
            <div className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:translate-x-2 delay-100">
              <h2 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                🚀 Getting There
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🚌</span>
                  <div>
                    <strong className="text-white block">By Bus</strong>
                    <span className="text-white/60 text-sm">
                      Alight at Kidangoor Junction. The college is a short distance from the main junction.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">🚆</span>
                  <div>
                    <strong className="text-white block">By Train</strong>
                    <span className="text-white/60 text-sm">
                      Nearest Station: Kottayam (KTYM) or Ettumanoor (ETM).
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Map */}
          <div className="relative h-[400px] lg:h-auto min-h-[400px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
             {/* Map Overlay Gradient (Optional stylistic touch) */}
             <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] z-10 rounded-2xl"></div>
             
             <iframe 
               title="College of Engineering Kidangoor Map"
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: 'grayscale(20%) contrast(1.2) opacity(0.9)' }} 
               loading="lazy" 
               allowFullScreen
               referrerPolicy="no-referrer-when-downgrade"
               // This uses the query method to find the specific college location
               src="https://maps.google.com/maps?q=College+of+Engineering+Kidangoor&t=&z=15&ie=UTF8&iwloc=&output=embed"
               className="group-hover:filter-none transition-all duration-700 scale-100 group-hover:scale-105"
             ></iframe>
          </div>

        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .delay-100 { animation-delay: 100ms; }
      `}</style>
    </div>
  );
};

export default LocationPage;