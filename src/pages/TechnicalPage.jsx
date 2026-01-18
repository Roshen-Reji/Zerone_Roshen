import React, { Component } from 'react';
import BezierEasing from 'bezier-easing';
import './TechnicalPage.css';

// --- CONFIGURATION ---
const DATA_CONFIG = {
  brandName: "IEEE CEK's",
  navText: "IEEE CEK-KGR",
  items: [
    {
      id: 1,
      name: "Signature",
      subtitle: "The Flagship",
      desc: "ZERONE stands as the definitive IEEE CEK-KGR signature initiative, engineered to set the annual benchmark for innovation, scale, and student engagement.",
      color: "#06b6d4", // Cyan-500
      stat1: { value: 6, suffix: "yrs", label: "Legacy" },
      stat2: { value: 600, suffix: "+", label: "Footfall" },
      stat3: { value: 4, suffix: "Events", label: "Main Track" },
    },
    {
      id: 2,
      name: "Genesis",
      subtitle: "The Beginning",
      desc: "Designed exclusively for first-year students, ZERONE acts as the starting point of their IEEE journey—shaping mindset, curiosity, and confidence.",
      color: "#ef4444", // Red-500
      stat1: { value: 1, suffix: "st", label: "Step" },
      stat2: { value: 100, suffix: "%", label: "Beginner Friendly" },
      stat3: { value: 1, suffix: "Day", label: "Duration" },
    },
    {
      id: 3,
      name: "CoLab",
      subtitle: "The Synergy",
      desc: "Blending collaborative problem-solving with applied technology. We push participants to think, build, and iterate as teams—mirroring real-world engineering.",
      color: "#22c55e", // Green-500
      stat1: { value: 4, suffix: "+", label: "Societies" },
      stat2: { value: 10, suffix: "Teams", label: "Competition" },
      stat3: { value: 12, suffix: "Hrs", label: "Event" },
    }
  ]
};

// --- HELPER COMPONENTS ---

const animateValue = (render, duration, easing, next = () => null) => {
  const start = Date.now();
  (function loop() {
    const current = Date.now(), delta = current - start, step = delta / duration;
    if (step > 1) { render(1); next(); }
    else { requestAnimationFrame(loop); render(easing(step * 2)); }
  })();
};

const myEasing = BezierEasing(0.4, -0.7, 0.1, 1.5);

class AnimValue extends Component {
  constructor(props) {
    super(props);
    this.node = null;
    this.timeout = null;
  }

  setValue = (value, step) => {
    if (!this.node) return;
    this.node.style.opacity = step === 1 ? 1 : 0.7;
    this.node.innerHTML = value;
  };

  animate(previousValue, newValue, applyFn) {
    window.clearTimeout(this.timeout);
    this.timeout = null;
    const diff = newValue - previousValue;
    const renderFunction = (step) => {
      this.timeout = setTimeout(() => {
        applyFn(this.props.transformFn(previousValue + diff * step, step), step);
      }, this.props.delay);
    };
    animateValue(renderFunction, this.props.duration, myEasing);
  }

  componentDidMount() {
    this.animate(0, this.props.value, this.setValue);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.animate(prevProps.value, this.props.value, this.setValue);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  render() {
    return <span className={this.props.className} ref={node => this.node = node}>0</span>;
  }
}

AnimValue.defaultProps = {
  delay: 0,
  duration: 800,
  transformFn: value => Math.floor(value)
};

const AnimateValue = ({ className, delay, value }) => (
  <AnimValue
    className={className}
    delay={delay}
    value={value}
    transformFn={(val, step) => step === 1 ? (val % 1 !== 0 ? val.toFixed(1) : val) : Math.abs(Math.floor(val))}
  />
);

// --- MAIN COMPONENTS ---

const SlideAside = ({ activeItem }) => {
  return (
    <div className="app-slide-aside w-full max-w-[90%] md:max-w-xl relative z-20 mx-auto md:mx-0">
      
      {/* --- THE BOXY CAPSULE --- */}
      <div className="
        floating-card
        relative overflow-hidden
        bg-black/30 backdrop-blur-md backdrop-saturate-150
        border border-white/10 border-t-white/20 border-l-white/10
        shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]
        rounded-[2rem] p-6 md:p-12
        transition-all duration-500
        group min-h-[280px] md:min-h-[300px] flex flex-col justify-center
      ">
        {/* Internal Glow Effect */}
        <div 
           className="absolute -top-20 -right-20 w-40 h-40 md:w-64 md:h-64 rounded-full blur-[60px] md:blur-[90px] opacity-30 transition-colors duration-1000 pointer-events-none"
           style={{ backgroundColor: activeItem.color }}
        />

        {/* Brand Name */}
        <h3 className="text-white/40 font-mono text-xs md:text-sm tracking-widest mb-2 uppercase">
          {DATA_CONFIG.brandName}
        </h3>

        {/* Animated Content Container */}
        <div key={activeItem.id} className="animate-content-enter relative z-10">
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter mb-3 md:mb-4 leading-tight drop-shadow-xl">
            {activeItem.name}
          </h1>

          {/* Description */}
          <p className="text-white/80 text-xs md:text-sm lg:text-base leading-relaxed font-light max-w-md drop-shadow-md">
            {activeItem.desc}
          </p>

        </div>
      </div>
    </div>
  );
};

const SlideParams = ({ activeItem }) => {
  return (
    <div className="
      absolute bottom-24 md:bottom-20 left-0 right-0 z-30
      flex justify-center items-end pointer-events-none
    ">
      <div className="
        pointer-events-auto
        mx-4
        bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl
        shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        px-4 py-3 md:px-8 md:py-4
      ">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-12">
          {[
            { stat: activeItem.stat1, delay: 200 },
            { stat: activeItem.stat2, delay: 400 },
            { stat: activeItem.stat3, delay: 600 }
          ].map((item, index) => (
            <li key={index} className="text-center group flex flex-col items-center min-w-[50px] md:min-w-[60px]">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-xs md:text-sm text-white/40 font-light">+</span>
                <AnimateValue 
                  className="text-lg md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors" 
                  value={item.stat.value} 
                  delay={item.delay} 
                />
                <span className="text-[8px] md:text-[10px] font-mono text-white/60">{item.stat.suffix}</span>
              </div>
              <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/40 mt-1">{item.stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Slide = ({ activeSlide, animationForward, setAnimationState, ANIMATION_PHASES }) => {
  return (
    <div className={`app-slide flex flex-col items-center justify-center w-full h-full relative ${animationForward ? "animation-forward" : "animation-back"}`}>
      
      {/* Main Content Capsule */}
      <div className="relative z-20 w-full flex justify-center md:justify-start md:pl-4 lg:pl-16 pb-32 md:-translate-y-4">
         <SlideAside activeItem={activeSlide} />
      </div>

      {/* Background Gradient Orb (Behind Card) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center md:justify-end md:pr-20 overflow-hidden">
         <div 
           className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[150px] opacity-40 mix-blend-screen transition-all duration-1000 animate-pulse-slow"
           style={{ backgroundColor: activeSlide.color }}
         />
      </div>

      {/* Stats - Centered at Bottom */}
      <SlideParams activeItem={activeSlide} />
      
    </div>
  );
};

// --- NAVIGATION COMPONENTS ---

const SliderNavigation = ({ activeSlide, setActiveSlide, itemsNames }) => (
  <div className={`
    app-slider-navigation z-40
    /* MOBILE LAYOUT: Top Capsules */
    absolute top-[85px] left-0 right-0 flex justify-center gap-2 px-4
    /* DESKTOP LAYOUT: Right Vertical Cards */
    md:flex-col md:gap-4 md:right-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:left-auto md:justify-start
  `}>
    {itemsNames.map((item, index) => {
      const isActive = activeSlide === index;
      return (
        <button
          key={item.id}
          onClick={() => setActiveSlide(index)}
          className={`
            group relative transition-all duration-500 ease-out overflow-hidden
            
            /* MOBILE STYLES: Small Capsule */
            ${isActive 
               ? 'bg-white/20 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
               : 'bg-black/30 border-white/5 hover:bg-white/10'
            }
            rounded-full px-4 py-2 border backdrop-blur-md
            
            /* DESKTOP STYLES: Large Card Override */
            md:rounded-xl md:w-64 md:p-5 md:text-left
            md:bg-black/40 md:border-white/5 md:hover:bg-white/5 md:hover:border-white/20
            ${isActive && 'md:bg-white/10 md:border-white/30 md:shadow-[0_0_30px_rgba(0,0,0,0.5)] md:-translate-x-4 md:scale-105'}
          `}
        >
          {/* Active Glow Bar (Desktop Only) */}
          <div 
            className={`hidden md:block absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundColor: item.color }}
          />
          
          {/* Ambient Background Fill (Desktop Only) */}
          <div 
            className={`hidden md:block absolute inset-0 transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-20' : 'opacity-0 group-hover:opacity-5'}`}
            style={{ 
              background: `linear-gradient(90deg, ${item.color} 0%, transparent 100%)` 
            }}
          />

          <div className="relative z-10 flex items-center justify-center md:justify-between">
             {/* Mobile: Just the name + Dot */}
             <div className="flex items-center gap-2 md:hidden">
               <div className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? 'bg-white shadow-[0_0_5px_white]' : 'bg-white/30'}`} 
                    style={{ backgroundColor: isActive ? item.color : undefined }}
               />
               <span className={`text-xs font-bold tracking-wide ${isActive ? 'text-white' : 'text-white/60'}`}>
                 {item.name}
               </span>
             </div>

             {/* Desktop Content Structure */}
             <div className="hidden md:block w-full">
                <div className="flex items-center justify-between mb-2">
                   <span className={`text-[10px] font-mono tracking-[0.2em] transition-colors ${isActive ? 'text-white/90' : 'text-white/30 group-hover:text-white/50'}`}>
                     0{index + 1}
                   </span>
                   <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} 
                        style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }} 
                   />
                </div>
                
                <h4 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>
                  {item.name}
                </h4>
                
                <p className={`text-xs font-light transition-colors duration-300 mt-1 ${isActive ? 'text-white/80' : 'text-white/20 group-hover:text-white/40'}`}>
                   {item.subtitle}
                </p>
             </div>
          </div>
        </button>
      );
    })}
  </div>
);

const Header = () => (
  <div className="app-header flex justify-between items-center py-4 px-6 md:py-8 md:px-0 relative z-50">
    <div className="app-header__logo">
       <h1 className="text-2xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
         ZERONE
         <span className="text-cyan-400 font-mono text-base md:text-2xl ml-2 tracking-widest font-light">2026</span>
       </h1>
    </div>
    <div className="app-header__nav font-mono text-xs md:text-sm text-white/50 border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md hidden md:block">
       {DATA_CONFIG.navText}
    </div>
  </div>
);

const ANIMATION_PHASES = { PENDING: "PENDING", STOP: "STOP" };

class TechnicalPage extends Component {
  state = {
    activeSlide: 0,
    animationForward: true,
    slidesCount: DATA_CONFIG.items.length,
    animationState: null
  };

  timeout = null;
  touchStartY = 0;
  touchEndY = 0;

  setAnimationState = (animationState) => this.setState({ animationState });

  setActiveSlide = (slideId) => {
    this.setState({
      activeSlide: slideId,
      animationForward: this.state.activeSlide < slideId,
      animationState: ANIMATION_PHASES.PENDING
    });
  };

  handleScroll = (e) => {
    if (this.state.animationState === ANIMATION_PHASES.PENDING) return;
    
    window.clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (e.deltaY < 0 && this.state.activeSlide > 0) {
        this.setActiveSlide(this.state.activeSlide - 1);
      } else if (e.deltaY > 0 && this.state.activeSlide < this.state.slidesCount - 1) {
        this.setActiveSlide(this.state.activeSlide + 1);
      }
    }, 50);
  };

  // --- TOUCH HANDLERS FOR MOBILE SWIPE ---
  handleTouchStart = (e) => {
    this.touchStartY = e.changedTouches[0].screenY;
  };

  handleTouchEnd = (e) => {
    if (this.state.animationState === ANIMATION_PHASES.PENDING) return;

    this.touchEndY = e.changedTouches[0].screenY;
    this.handleSwipeGesture();
  };

  handleSwipeGesture = () => {
    const swipeDistance = this.touchStartY - this.touchEndY;
    const threshold = 50; // Minimum distance to be considered a swipe

    // Swipe Up (Next Slide)
    if (swipeDistance > threshold && this.state.activeSlide < this.state.slidesCount - 1) {
      this.setActiveSlide(this.state.activeSlide + 1);
    }
    // Swipe Down (Previous Slide)
    else if (swipeDistance < -threshold && this.state.activeSlide > 0) {
      this.setActiveSlide(this.state.activeSlide - 1);
    }
  };

  componentDidMount() {
    this.setState({ activeSlide: 0, animationState: ANIMATION_PHASES.STOP });
    window.addEventListener("wheel", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("wheel", this.handleScroll);
    window.clearTimeout(this.timeout);
  }

  render() {
    return (
      <div 
        className="technical-page-wrapper fixed inset-0 bg-black text-white overflow-hidden font-sans touch-none"
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        
        {/* --- GLOBAL BACKGROUND LAYER --- */}
        <div className="fixed inset-0 z-0">
          
          {/* 1. Deep Gradient Base */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-black opacity-90" />
          
          {/* 2. Cyber Grid Overlay - Brightened for visibility */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(circle_at_center,black_60%,transparent_100%)] pointer-events-none" />

          {/* 3. Floating Ambient Blobs */}
          <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-purple-600/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none mix-blend-screen" style={{ animationDelay: '2s' }} />
        
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 md:px-6 h-full flex flex-col relative z-10 pointer-events-none">
          {/* Header */}
          <div className="pointer-events-auto">
             <Header />
          </div>
          
          <div className="app-slider flex-1 relative flex items-center justify-center pointer-events-auto">
            
            {/* Navigation (Capsules on Mobile, Cards on Desktop) */}
            <SliderNavigation
              activeSlide={this.state.activeSlide}
              setActiveSlide={this.setActiveSlide}
              itemsNames={DATA_CONFIG.items}
            />

            <Slide
              activeSlide={DATA_CONFIG.items[this.state.activeSlide]}
              animationForward={this.state.animationForward}
              setAnimationState={this.setAnimationState}
              ANIMATION_PHASES={ANIMATION_PHASES}
            />
          </div>

          <div className="app-slider__scroll absolute bottom-2 left-0 w-full text-center pb-4 opacity-30 text-[10px] font-mono tracking-[0.4em] animate-pulse">
            <span className="hidden md:inline">SCROLL TO NAVIGATE</span>
            <span className="md:hidden">SWIPE TO NAVIGATE</span>
          </div>
        </div>
      </div>
    );
  }
}

export default TechnicalPage;