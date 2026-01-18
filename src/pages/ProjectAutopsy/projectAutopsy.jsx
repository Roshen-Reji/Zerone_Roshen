import React from 'react';

const ProjectAutopsy = ({ onNavigate }) => {
  return (
    <div className="min-h-screen text-white p-4 md:p-8 pt-24 font-sans selection:bg-red-500 selection:text-white">
      
      {/* --- Navigation Header --- */}
      <div className="max-w-6xl mx-auto mb-12 flex justify-between items-center">
        <button 
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-mono text-sm uppercase tracking-wider">Abort / Return</span>
        </button>
        <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-8"></div>
        <div className="font-mono text-xs text-white/50 tracking-widest">CASE_ID: ZERONE_2026</div>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* --- Hero Section --- */}
        <header className="mb-16 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight relative z-10">
            PROJECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">AUTOPSY</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Break the product. Fix the thinking.
          </p>
          <div className="mt-6 inline-block bg-red-500/10 border border-red-500/30 px-4 py-1 rounded text-red-400 font-mono text-sm">
            STATUS: CRITICAL // REASONING UNDER PRESSURE
          </div>
        </header>

        {/* --- Team Setup Grid --- */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold font-mono">01 // TEAM_SETUP</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <RoleCard 
              role="Analyst" 
              desc="Breaks down the problem." 
              icon={<path d="M2 20h20M5 20v-9.172a2 2 0 01.586-1.414l5-5A2 2 0 0112 3h0a2 2 0 011.414.586l5 5a2 2 0 01.586 1.414V20" />}
            />
            <RoleCard 
              role="User Advocate" 
              desc="Thinks from user POV." 
              icon={<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
            />
            <RoleCard 
              role="Engineer" 
              desc="Feasibility & constraints." 
              icon={<path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />}
            />
            <RoleCard 
              role="Product Lead" 
              desc="Final call & pitch." 
              icon={<path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />}
            />
          </div>
          
          <div className="mt-4 flex justify-between items-center bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm text-gray-400">
             <span>SIZE: 4-5 Members</span>
             <span className="text-white">NO FREELOADERS. SKIN IN THE GAME.</span>
             <span>TIME: 25 Mins</span>
          </div>
        </section>

        {/* --- Game Flow Timeline --- */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-10">
             <h2 className="text-2xl font-bold font-mono">02 // GAME_FLOW</h2>
             <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <div className="space-y-6">
            <PhaseCard 
              number="01" 
              title="The Case File" 
              time="5 MIN"
              content="Analyze the failure brief. Identify user numbers, the misleading metric, and the hidden constraint (Budget/Time/Tech)."
              details={['Campus App', 'EdTech Platform', 'Food Delivery']}
            />

            <PhaseCard 
              number="02" 
              title="The Autopsy" 
              time="10 MIN"
              content="Answer only three questions. No fluff. Penalty for listing symptoms instead of root causes."
              highlight="1. Primary Failure Point? 2. What Assumption was wrong? 3. Where did execution break?"
            />

            <PhaseCard 
              number="03" 
              title="Fix or Kill" 
              time="07 MIN"
              content="Propose 3 ranked fixes (High Impact, Medium Impact, Long-term Bet). Or kill the product with logical justification."
            />

            <PhaseCard 
              number="04" 
              title="Boardroom Pitch" 
              time="90 SEC"
              isLast={true}
              content="Hard stop. Present 1 Failure, 1 Wrong Assumption, and 1 Decisive Action."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

// --- Sub Components ---

const RoleCard = ({ role, desc, icon }) => (
  <div className="bg-white/5 hover:bg-white/10 border border-white/10 p-6 rounded-xl backdrop-blur-sm transition-all group">
    <div className="w-10 h-10 mb-4 text-red-400 group-hover:text-red-300">
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
    </div>
    <h3 className="text-lg font-bold mb-1">{role}</h3>
    <p className="text-sm text-gray-400">{desc}</p>
  </div>
);

const PhaseCard = ({ number, title, time, content, highlight, details, isLast }) => (
  <div className="relative pl-8 md:pl-0">
    {/* Connector Line */}
    {!isLast && (
      <div className="absolute left-0 md:left-[9.5rem] top-16 bottom-[-24px] w-px bg-white/10 hidden md:block"></div>
    )}

    <div className="flex flex-col md:flex-row gap-6 md:gap-10 group">
      {/* Time & Number */}
      <div className="md:w-32 flex-shrink-0 flex md:flex-col items-baseline md:items-end md:text-right gap-2 md:gap-0">
        <span className="text-4xl font-bold font-mono text-white/20 group-hover:text-red-500/50 transition-colors">{number}</span>
        <span className="font-mono text-sm text-red-400 border border-red-400/30 px-2 py-0.5 rounded bg-red-500/10">{time}</span>
      </div>

      {/* Content Card */}
      <div className="flex-1 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:border-white/20 transition-all">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 leading-relaxed">{content}</p>
        
        {highlight && (
          <div className="bg-black/40 p-3 rounded border-l-2 border-red-500 text-sm font-mono text-gray-300">
            {highlight}
          </div>
        )}

        {details && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {details.map((d, i) => (
              <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">{d}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ProjectAutopsy;