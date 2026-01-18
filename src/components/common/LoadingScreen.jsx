import React, { useEffect } from 'react';

const LoadingScreen = ({ onLoadComplete }) => {
  useEffect(() => {
    // Animation takes ~7s total. We wait 6.5s to transition out smoothly.
    const totalDuration = 6500;

    const timer = setTimeout(() => {
      if (onLoadComplete) onLoadComplete();
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div className="zerone-loader-container">
      <style>{`
        .zerone-loader-container {
            position: fixed;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            background: radial-gradient(circle at center, #001144 0%, #000000 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow: hidden;
            z-index: 9999;
        }

        .zerone-wrapper {
            position: relative;
            width: 500px;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* The Liquid Layer (Filtered) */
        .zerone-liquid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            filter: url(#zerone-gooey-filter);
            z-index: 1; 
        }

        .zerone-particle {
            position: absolute;
            top: 50%;
            left: 50%;
            background: #fff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }

        /* The Text Layer (Sharp) */
        .zerone-text {
            position: relative;
            z-index: 10; 
            display: flex;
            align-items: center;
            font-size: 80px;
            font-weight: 900;
            line-height: 1; /* Key fix: Prevents vertical expansion issues */
        }

        /* The 'Z' */
        .zerone-letter-z {
            color: #ffffff;
            opacity: 0;
            transform: scale(0);
            animation: zeronePopZ 7s ease-in-out infinite;
            height: 1em; /* Explicit height to match word-rest */
            display: flex;
            align-items: center;
        }

        /* The 'erone' */
        .zerone-word-rest {
            display: flex;
            align-items: center;
            overflow: hidden;
            width: 0px; 
            height: 1.2em; /* Key fix: Extra height to prevent clipping descenders/edges */
            white-space: nowrap; /* Ensures text doesn't wrap */
            animation: zeroneSlideText 7s ease-in-out infinite;
        }
        
        .zerone-word-rest span { 
            display: block; 
            padding-left: 2px;
            color: #ffffff;
        }

        /* Keyframe Animations */
        @keyframes zeronePopZ {
            0%, 30% { transform: scale(0); opacity: 0; }
            35% { transform: scale(1.1); opacity: 1; } 
            40%, 85% { transform: scale(1); opacity: 1; } 
            90%, 100% { transform: scale(0); opacity: 0; } 
        }

        @keyframes zeroneSlideText {
            0%, 40% { width: 0px; }
            50%, 85% { width: 240px; } /* Slightly increased width to be safe */
            90%, 100% { width: 0px; } 
        }

        /* Particle Movements */
        .zp1 { width: 50px; height: 50px; animation: zeroneMove1 7s ease-in-out infinite; }
        .zp2 { width: 40px; height: 40px; animation: zeroneMove2 7s ease-in-out infinite; }
        .zp3 { width: 45px; height: 45px; animation: zeroneMove3 7s ease-in-out infinite; }

        @keyframes zeroneMove1 {
            0% { transform: translate(-50%, -50%) translate(-80px, -80px); opacity: 0; }
            15% { opacity: 1; }
            30% { transform: translate(-50%, -50%) translate(0, 0); opacity: 1; } 
            35% { opacity: 0; } 
            100% { opacity: 0; }
        }
        
        @keyframes zeroneMove2 {
            0% { transform: translate(-50%, -50%) translate(80px, -60px); opacity: 0; }
            15% { opacity: 1; }
            30% { transform: translate(-50%, -50%) translate(0, 0); opacity: 1; }
            35% { opacity: 0; }
            100% { opacity: 0; }
        }

        @keyframes zeroneMove3 {
            0% { transform: translate(-50%, -50%) translate(0px, 100px); opacity: 0; }
            15% { opacity: 1; }
            30% { transform: translate(-50%, -50%) translate(0, 0); opacity: 1; }
            35% { opacity: 0; }
            100% { opacity: 0; }
        }
      `}</style>

      <div className="zerone-wrapper">
        {/* Liquid Layer */}
        <div className="zerone-liquid">
          <div className="zerone-particle zp1"></div>
          <div className="zerone-particle zp2"></div>
          <div className="zerone-particle zp3"></div>
        </div>

        {/* Text Layer */}
        <div className="zerone-text">
          <div className="zerone-letter-z">Z</div>
          <div className="zerone-word-rest">
            <span>e</span>
            <span>r</span>
            <span>o</span>
            <span>n</span>
            <span>e</span>
          </div>
        </div>
      </div>

      {/* Invisible SVG for Filter Definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="zerone-gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default LoadingScreen;