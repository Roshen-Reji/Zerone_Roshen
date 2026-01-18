class ParticleScanner {
  constructor() {
    this.canvas = document.getElementById("scannerCanvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.animationId = null;
    
    // Configuration
    this.config = {
      color: "0, 255, 128", // Electric Green (R, G, B)
      particleLife: 0.02,
      particleSpeed: 1.5,
      lineThickness: 2,
    };

    this.w = window.innerWidth;
    this.h = 300;
    this.particles = [];
    this.scanningActive = false;

    if (this.ctx) this.init();
  }

  init() {
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    
    // Handle High DPI displays (Retina) for crisp lines
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.w * dpr;
    this.canvas.height = this.h * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${this.w}px`;
    this.canvas.style.height = `${this.h}px`;

    this.animate();
    
    window.addEventListener("resize", () => {
      this.w = window.innerWidth;
      this.canvas.width = this.w * dpr;
      this.canvas.style.width = `${this.w}px`;
      this.ctx.scale(dpr, dpr);
    });
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    // 1. Clear Canvas
    this.ctx.clearRect(0, 0, this.w, this.h);

    const centerX = this.w / 2;
    const { color, lineThickness } = this.config;

    // 2. Draw Central Scanner Line (The "Laser")
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${color}, ${this.scanningActive ? 1 : 0.3})`;
    
    // Add a glow effect to the line itself using shadow
    this.ctx.shadowBlur = this.scanningActive ? 15 : 0;
    this.ctx.shadowColor = `rgb(${color})`;
    
    this.ctx.fillRect(centerX - (lineThickness / 2), 0, lineThickness, this.h);
    
    // Reset shadow for particles to save performance
    this.ctx.shadowBlur = 0;

    // 3. Spawn Particles logic
    if (this.scanningActive && Math.random() > 0.4) {
      this.spawnParticles(centerX);
    }

    // 4. Update and Draw Particles
    this.updateParticles();
  }

  spawnParticles(centerX) {
    this.particles.push({
      x: centerX,
      y: Math.random() * this.h,
      // Explode outwards from center
      vx: (Math.random() - 0.5) * 4, 
      vy: (Math.random() - 0.5) * 4,
      life: 1,
      size: Math.random() * 2 + 1
    });
  }

  updateParticles() {
    const { color, particleLife } = this.config;

    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      
      // Move
      p.x += p.vx;
      p.y += p.vy;
      
      // Decay
      p.life -= particleLife;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
      } else {
        // Draw
        this.ctx.fillStyle = `rgba(${color}, ${p.life})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  setScanningActive(active) {
    this.scanningActive = active;
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    // Remove event listeners if necessary
  }
}

export default ParticleScanner;