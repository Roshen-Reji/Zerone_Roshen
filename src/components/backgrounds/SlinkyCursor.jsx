import React, { useRef, useEffect } from 'react';

const SlinkyCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    
    const ctx = c.getContext('2d');
    const m = [];

    // Set canvas size
    const setSize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      ctx.lineCap = "round";
    };

    setSize();
    window.addEventListener('resize', setSize);

    // Initialize points with GSAP physics
    for (let i = 0; i < 40; i++) {
      m[i] = { x: window.innerWidth / 2, y: window.innerHeight / 1.33 };
      // We use gsap.quickTo for performant mouse tracking
      m[i].moveX = window.gsap.quickTo(m[i], "x", { 
        duration: 0.25 + 0.03 * i, 
        ease: 'elastic.out(' + (i / 80) + ')' 
      });
      m[i].moveY = window.gsap.quickTo(m[i], "y", { 
        duration: 0.25 + 0.03 * i, 
        ease: 'elastic.out(' + (i / 80) + ')' 
      });
      
      // Initial entrance animation
      window.gsap.to(m[i], { 
        duration: 1.1, 
        y: window.innerHeight / 4, 
        ease: 'elastic.out(0.7)', 
        delay: 0.0025 * i 
      });
    }

    // Animation Loop
    const update = () => {
      ctx.clearRect(0, 0, c.width, c.height);

      m.forEach((pt, i) => {
        if (i === m.length - 1) return;

        ctx.lineWidth = 1.5;
        // Color logic: 350 hue (red/pink range), low saturation
        ctx.strokeStyle = 'hsl(' + (350 - i * 0.2) + ',20%,' + (60 - (i / 50 * 25)) + '%)';
        ctx.beginPath();
        // Dynamic circle drawing based on index and window position
        ctx.arc(
          m[i].x - i * 2 * (0.5 - m[i].x / window.innerWidth), 
          m[i].y - i * 4 * (0.5 - m[i].y / window.innerHeight), 
          50 + i * 0.1, 
          0, 
          2 * Math.PI
        );
        ctx.stroke();
      });
    };

    // Add to GSAP ticker for synchronized animation frames
    window.gsap.ticker.add(update);

    // Pointer tracking
    const handlePointerMove = (e) => {
      // Fallback to clientX/Y if x/y not present
      const x = e.x || e.clientX;
      const y = e.y || e.clientY;
      m.forEach(pt => {
        pt.moveX(x);
        pt.moveY(y);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.gsap.ticker.remove(update);
    };
  }, []);

  // z-50 ensures it's on top, pointer-events-none ensures clicks go through to buttons
  return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none" />;
};

export default SlinkyCursor;