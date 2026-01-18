// !!! IMPORTANT: Check your file paths !!!
import Bingo from '../../assets/Bingo.jpg';
import PitchTheProject from '../../assets/PitchTheProduct.png';
import TreasureHunt from '../../assets/treasureHunt.jpg';

class CardStreamController {
  constructor() {
    this.container = document.getElementById("cardStream");
    this.cardLine = document.getElementById("cardLine");
    this.speedIndicator = document.getElementById("speedValue");
    
    // Physics State
    this.position = 0;
    this.velocity = 60; 
    this.direction = -1; // -1 = Left, 1 = Right
    
    // Interaction State
    this.isAnimating = true;
    this.isDragging = false;
    this.lastTime = 0;
    this.lastMouseX = 0;
    this.mouseVelocity = 0;
    this.friction = 0.95;
    this.minVelocity = 20; 
    
    // Layout
    this.containerWidth = 0;
    this.cardLineWidth = 0;
    
    // Timers
    this.animationFrameId = null;
    this.intervalId = null;

    // Binding
    this.handleMouseDown = this.startDrag.bind(this);
    this.handleMouseMove = (e) => this.onDrag(e);
    this.handleMouseUp = this.endDrag.bind(this);
    this.handleTouchStart = (e) => this.startDrag(e.touches[0]);
    this.handleTouchMove = (e) => this.onDrag(e.touches[0]);
    this.handleTouchEnd = this.endDrag.bind(this);
    this.handleWheel = (e) => this.onWheel(e);
    this.handleResize = () => this.calculateDimensions();

    this.init();
  }

  init() {
    if (!this.cardLine) return;
    this.populateCardLine();
    this.calculateDimensions();
    this.setupEventListeners();
    this.updateCardPosition();
    this.animate();
    this.startPeriodicUpdates();
  }

  destroy() {
    if (this.cardLine) {
      this.cardLine.removeEventListener("mousedown", this.handleMouseDown);
      this.cardLine.removeEventListener("touchstart", this.handleTouchStart);
      this.cardLine.removeEventListener("wheel", this.handleWheel);
    }
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("touchmove", this.handleTouchMove);
    document.removeEventListener("touchend", this.handleTouchEnd);
    window.removeEventListener("resize", this.handleResize);

    cancelAnimationFrame(this.animationFrameId);
    clearInterval(this.intervalId);
  }

  calculateDimensions() {
    if (!this.container || !this.cardLine) return;
    this.containerWidth = this.container.offsetWidth;
    const cardWidth = 400;
    const cardGap = 60;
    const cardCount = this.cardLine.children.length;
    this.cardLineWidth = (cardWidth + cardGap) * cardCount;
  }

  setupEventListeners() {
    this.cardLine.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
    this.cardLine.addEventListener("touchstart", this.handleTouchStart, { passive: false });
    document.addEventListener("touchmove", this.handleTouchMove, { passive: false });
    document.addEventListener("touchend", this.handleTouchEnd);
    this.cardLine.addEventListener("wheel", this.handleWheel, { passive: false });
    window.addEventListener("resize", this.handleResize);
  }

  startDrag(e) {
    if (e.preventDefault) e.preventDefault(); 
    this.isDragging = true;
    this.isAnimating = false;
    this.lastMouseX = e.clientX;
    this.mouseVelocity = 0;
    
    const transform = window.getComputedStyle(this.cardLine).transform;
    if (transform !== "none") {
      const matrix = new DOMMatrix(transform);
      this.position = matrix.m41;
    }
    
    this.cardLine.classList.add("dragging");
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  }

  onDrag(e) {
    if (!this.isDragging) return;
    
    const deltaX = e.clientX - this.lastMouseX;
    
    if (deltaX !== 0) {
      this.direction = deltaX > 0 ? 1 : -1;
    }

    this.position += deltaX;
    this.mouseVelocity = deltaX * 60; 
    this.lastMouseX = e.clientX;
    
    this.cardLine.style.transform = `translateX(${this.position}px)`;
    this.updateCardClipping();
    
    this.updateSpeedIndicator(); 
  }

  endDrag() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.cardLine.classList.remove("dragging");

    if (Math.abs(this.mouseVelocity) > this.minVelocity) {
        this.velocity = Math.abs(this.mouseVelocity);
    } else {
        this.velocity = 120;
    }

    this.isAnimating = true;
    this.updateSpeedIndicator();
    
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }

  onWheel(e) {
    e.preventDefault();
    
    const wheelDelta = e.deltaY;
    const moveAmount = wheelDelta > 0 ? -40 : 40; 

    this.position += moveAmount;
    
    this.direction = moveAmount > 0 ? 1 : -1;
    this.velocity = 120; 

    this.updateCardPosition();
    this.updateCardClipping();
    this.updateSpeedIndicator();
  }

  animate() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    if (this.isAnimating && !this.isDragging) {
      if (this.velocity > this.minVelocity) {
        this.velocity *= this.friction;
      } else {
        this.velocity = Math.max(this.minVelocity, this.velocity); 
      }

      this.position += this.velocity * this.direction * deltaTime;
      this.updateCardPosition();
      this.updateSpeedIndicator();
    }
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  updateCardPosition() {
    if (!this.cardLine) return;
    
    if (this.position < -this.cardLineWidth) {
      this.position = this.containerWidth; 
    } 
    else if (this.position > this.containerWidth) {
      this.position = -this.cardLineWidth;
    }

    this.cardLine.style.transform = `translateX(${this.position}px)`;
    this.updateCardClipping();
  }

  updateSpeedIndicator() {
    if (this.speedIndicator) {
        const displaySpeed = Math.round(this.velocity * this.direction);
        this.speedIndicator.textContent = displaySpeed;
    }
  }

  toggleAnimation() {
    this.isAnimating = !this.isAnimating;
  }

  generateCode(width, height) {
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const pick = (arr) => arr[randInt(0, arr.length - 1)];
    const library = [
      "// ACCESS DENIED",
      "ZERONE PROTOCOL",
      "0x4F 0x50 0x45 0x4E",
      "ENCRYPTING...",
      "class Event { init() }",
      "const SECRET = true;"
    ];
    let flow = library.join(" ");
    flow = flow.replace(/\s+/g, " ").trim();
    const totalChars = width * height;
    while (flow.length < totalChars + width) {
      flow += " " + pick(library).replace(/\s+/g, " ").trim();
    }
    let out = "";
    let offset = 0;
    for (let row = 0; row < height; row++) {
      let line = flow.slice(offset, offset + width);
      if (line.length < width) line = line + " ".repeat(width - line.length);
      out += line + (row < height - 1 ? "\n" : "");
      offset += width;
    }
    return out;
  }

  calculateCodeDimensions(cardWidth, cardHeight) {
    return {
      width: Math.floor(cardWidth / 7), // Adjusted for monospace
      height: Math.floor(cardHeight / 12),
      fontSize: 10,
      lineHeight: 12
    };
  }

  createCardWrapper(index) {
    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";
    
    const normalCard = document.createElement("div");
    normalCard.className = "card card-normal";
    
    const eventDefinitions = [
      {title: "Bingo", image: Bingo},
      {title: "Pitch The Product", image: PitchTheProject},
      {title: "Treasure Hunt", image: TreasureHunt}
    ];
    const eventData = eventDefinitions[index % eventDefinitions.length];

    // UPDATED: Use CSS class for styling
    const title = document.createElement("div");
    title.className = "card-title";
    title.innerText = eventData.title;
    
    normalCard.appendChild(title);
    
    const cardImage = document.createElement("img");
    cardImage.className = "card-image";
    cardImage.src = eventData.image;
    normalCard.appendChild(cardImage);

    const asciiCard = document.createElement("div");
    asciiCard.className = "card card-ascii";
    const asciiContent = document.createElement("div");
    asciiContent.className = "ascii-content";
    const { width, height, fontSize, lineHeight } = this.calculateCodeDimensions(400, 250);
    asciiContent.style.fontSize = fontSize + "px";
    asciiContent.style.lineHeight = lineHeight + "px";
    asciiContent.textContent = this.generateCode(width, height);
    asciiCard.appendChild(asciiContent);
    
    wrapper.appendChild(normalCard);
    wrapper.appendChild(asciiCard);
    
    return wrapper;
  }

  updateCardClipping() {
    const scannerX = window.innerWidth / 2;
    const scannerWidth = 4; // Thinner scanner
    const scannerLeft = scannerX - scannerWidth / 2;
    const scannerRight = scannerX + scannerWidth / 2;
    let anyScanningActive = false;
    
    document.querySelectorAll(".card-wrapper").forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const cardLeft = rect.left;
      const cardRight = rect.right;
      const cardWidth = rect.width;
      const normalCard = wrapper.querySelector(".card-normal");
      const asciiCard = wrapper.querySelector(".card-ascii");

      if (cardLeft < scannerRight && cardRight > scannerLeft) {
        anyScanningActive = true;
        const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
        const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);
        const normalClipRight = (scannerIntersectLeft / cardWidth) * 100;
        const asciiClipLeft = (scannerIntersectRight / cardWidth) * 100;
        
        normalCard.style.setProperty("--clip-right", `${normalClipRight}%`);
        asciiCard.style.setProperty("--clip-left", `${asciiClipLeft}%`);
        
        if (!wrapper.hasAttribute("data-scanned") && scannerIntersectLeft > 0) {
          wrapper.setAttribute("data-scanned", "true");
          const scanEffect = document.createElement("div");
          scanEffect.className = "scan-effect";
          // Position the beam exactly at the cut point
          scanEffect.style.left = `${scannerIntersectLeft}px`; 
          wrapper.appendChild(scanEffect);
          setTimeout(() => {
            if (scanEffect.parentNode) scanEffect.parentNode.removeChild(scanEffect);
          }, 400);
        }
      } else {
        if (cardRight < scannerLeft) {
          normalCard.style.setProperty("--clip-right", "100%");
          asciiCard.style.setProperty("--clip-left", "100%");
        } else if (cardLeft > scannerRight) {
          normalCard.style.setProperty("--clip-right", "0%");
          asciiCard.style.setProperty("--clip-left", "0%");
        }
        wrapper.removeAttribute("data-scanned");
      }
    });
    if (window.setScannerScanning) window.setScannerScanning(anyScanningActive);
  }

  updateAsciiContent() {
    document.querySelectorAll(".ascii-content").forEach((content) => {
      if (Math.random() < 0.1) { // Lower jitter frequency
        const { width, height } = this.calculateCodeDimensions(400, 250);
        content.textContent = this.generateCode(width, height);
      }
    });
  }

  populateCardLine() {
    this.cardLine.innerHTML = "";
    for (let i = 0; i < 15; i++) {
      this.cardLine.appendChild(this.createCardWrapper(i));
    }
  }

  startPeriodicUpdates() {
    this.intervalId = setInterval(() => {
      this.updateAsciiContent();
    }, 150);
    const updateClipping = () => {
      this.updateCardClipping();
      this.animationFrameId = requestAnimationFrame(updateClipping);
    };
    updateClipping();
  }
}

export default CardStreamController;