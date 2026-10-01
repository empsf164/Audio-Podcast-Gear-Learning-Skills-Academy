/**
 * WAVECRAFT AUDIO & ACADEMY — 360° Interactive Product Viewer
 * Controls: Mouse Drag, Touch Swipe, Zoom In/Out/Reset, Auto-Spin, Keyboard Controls
 * Hotspots: XLR Output, USB-C Port, Gain Control, Headphone Output
 */

(function () {
  'use strict';

  class Wavecraft360Viewer {
    constructor(containerEl, options = {}) {
      this.container = typeof containerEl === 'string' ? document.querySelector(containerEl) : containerEl;
      if (!this.container) return;

      this.options = Object.assign({
        imageSrc: 'assets/images/products/mic-x1.jpg',
        sensitivity: 0.45,
        zoomMin: 0.8,
        zoomMax: 2.2,
        zoomStep: 0.2,
        autoSpinSpeed: 0.6
      }, options);

      this.currentAngle = 45; // degrees [0, 360)
      this.currentZoom = 1;
      this.isDragging = false;
      this.startX = 0;
      this.startAngle = 0;
      this.isAutoSpinning = false;
      this.autoSpinRaf = null;

      // Define hotspots relative to rotation angle
      this.hotspots = [
        {
          id: 'xlr-port',
          title: '3-Pin Balanced XLR Output',
          desc: 'Neutrik-spec gold-plated analog output with -128 dBu low noise floor for studio preamps.',
          baseX: 38, // % from left
          baseY: 78, // % from top
          visibleAngles: [0, 180], // visible in front arc
          activeAngle: 45
        },
        {
          id: 'usb-port',
          title: 'USB-C High-Speed Port',
          desc: '24-bit / 96 kHz internal studio DAC for direct plug-and-play podcast recording.',
          baseX: 32,
          baseY: 82,
          visibleAngles: [10, 190],
          activeAngle: 75
        },
        {
          id: 'gain-control',
          title: 'Tactile Rotary Gain & High-Pass',
          desc: 'Precision stepped analog gain dial with high-pass 80 Hz low-cut filter switch.',
          baseX: 52,
          baseY: 62,
          visibleAngles: [0, 360],
          activeAngle: 120
        },
        {
          id: 'headphone-jack',
          title: 'Zero-Latency Headphone Monitoring',
          desc: 'Built-in 38 mW high-current amplifier provides real-time voice playback with zero latency.',
          baseX: 64,
          baseY: 72,
          visibleAngles: [200, 360],
          activeAngle: 270
        }
      ];

      this.init();
    }

    init() {
      this.render();
      this.cacheElements();
      this.bindEvents();
      this.updateView();
    }

    render() {
      this.container.innerHTML = `
        <div class="viewer-360-wrapper">
          <div class="viewer-drag-hint">
            <i class="bi bi-arrows-expand"></i> Drag or swipe horizontally to rotate 360°
          </div>

          <div class="viewer-360-canvas-area" id="viewerCanvasArea" tabindex="0" role="region" aria-label="360 Degree Audio Gear Visualizer">
            <img src="${this.options.imageSrc}" alt="WAVECRAFT Studio Mic X1 360 Interactive View" class="viewer-360-img" id="viewerProductImg">
            
            <!-- Dynamic Hotspots -->
            <div id="viewerHotspotsLayer" class="w-100 h-100 position-absolute top-0 start-0 pointer-events-none"></div>
          </div>

          <!-- Controls Bar -->
          <div class="viewer-360-controls" role="toolbar" aria-label="360 Product Controls">
            <button class="viewer-btn" id="viewerRotateLeft" title="Rotate Left (Left Arrow)" aria-label="Rotate Left">
              <i class="bi bi-arrow-counterclockwise"></i>
            </button>
            
            <div class="viewer-angle-display" id="viewerAngleDisplay" aria-live="polite">45°</div>

            <button class="viewer-btn" id="viewerRotateRight" title="Rotate Right (Right Arrow)" aria-label="Rotate Right">
              <i class="bi bi-arrow-clockwise"></i>
            </button>

            <span class="mx-1 text-muted" style="opacity: 0.3;">|</span>

            <button class="viewer-btn" id="viewerZoomIn" title="Zoom In (+)" aria-label="Zoom In">
              <i class="bi bi-zoom-in"></i>
            </button>

            <button class="viewer-btn" id="viewerZoomOut" title="Zoom Out (-)" aria-label="Zoom Out">
              <i class="bi bi-zoom-out"></i>
            </button>

            <button class="viewer-btn" id="viewerReset" title="Reset View (Esc)" aria-label="Reset View">
              <i class="bi bi-arrow-repeat"></i>
            </button>

            <button class="viewer-btn" id="viewerAutoSpin" title="Toggle Auto-Spin (Space)" aria-label="Toggle Auto-Spin">
              <i class="bi bi-play-circle-fill"></i>
            </button>

            <button class="viewer-btn" id="viewerFullscreen" title="Fullscreen" aria-label="Toggle Fullscreen">
              <i class="bi bi-arrows-fullscreen"></i>
            </button>
          </div>
        </div>
      `;
    }

    cacheElements() {
      this.canvasArea = this.container.querySelector('#viewerCanvasArea');
      this.productImg = this.container.querySelector('#viewerProductImg');
      this.hotspotsLayer = this.container.querySelector('#viewerHotspotsLayer');
      this.angleDisplay = this.container.querySelector('#viewerAngleDisplay');
      this.btnRotateLeft = this.container.querySelector('#viewerRotateLeft');
      this.btnRotateRight = this.container.querySelector('#viewerRotateRight');
      this.btnZoomIn = this.container.querySelector('#viewerZoomIn');
      this.btnZoomOut = this.container.querySelector('#viewerZoomOut');
      this.btnReset = this.container.querySelector('#viewerReset');
      this.btnAutoSpin = this.container.querySelector('#viewerAutoSpin');
      this.btnFullscreen = this.container.querySelector('#viewerFullscreen');
    }

    bindEvents() {
      // Mouse dragging
      this.canvasArea.addEventListener('mousedown', (e) => {
        this.stopAutoSpin();
        this.isDragging = true;
        this.startX = e.clientX;
        this.startAngle = this.currentAngle;
        e.preventDefault();
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        const deltaX = e.clientX - this.startX;
        this.setAngle(this.startAngle - deltaX * this.options.sensitivity);
      });

      window.addEventListener('mouseup', () => {
        this.isDragging = false;
      });

      // Touch events (Mobile)
      this.canvasArea.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.stopAutoSpin();
          this.isDragging = true;
          this.startX = e.touches[0].clientX;
          this.startAngle = this.currentAngle;
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (!this.isDragging || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - this.startX;
        this.setAngle(this.startAngle - deltaX * this.options.sensitivity);
      }, { passive: true });

      window.addEventListener('touchend', () => {
        this.isDragging = false;
      });

      // Buttons
      this.btnRotateLeft.addEventListener('click', () => {
        this.stopAutoSpin();
        this.setAngle(this.currentAngle - 15);
      });

      this.btnRotateRight.addEventListener('click', () => {
        this.stopAutoSpin();
        this.setAngle(this.currentAngle + 15);
      });

      this.btnZoomIn.addEventListener('click', () => this.zoom(this.options.zoomStep));
      this.btnZoomOut.addEventListener('click', () => this.zoom(-this.options.zoomStep));
      this.btnReset.addEventListener('click', () => this.reset());
      this.btnAutoSpin.addEventListener('click', () => this.toggleAutoSpin());
      
      this.btnFullscreen.addEventListener('click', () => {
        const wrap = this.container.querySelector('.viewer-360-wrapper');
        if (!document.fullscreenElement) {
          wrap.requestFullscreen().catch(err => console.log(err));
        } else {
          document.exitFullscreen();
        }
      });

      // Keyboard navigation
      this.canvasArea.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.setAngle(this.currentAngle - 10);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.setAngle(this.currentAngle + 10);
        } else if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          this.zoom(this.options.zoomStep);
        } else if (e.key === '-' || e.key === '_') {
          e.preventDefault();
          this.zoom(-this.options.zoomStep);
        } else if (e.key === ' ') {
          e.preventDefault();
          this.toggleAutoSpin();
        } else if (e.key === 'Escape') {
          this.reset();
        }
      });

      // Wheel zoom inside canvas
      this.canvasArea.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? this.options.zoomStep : -this.options.zoomStep;
        this.zoom(delta);
      }, { passive: false });
    }

    setAngle(angle) {
      this.currentAngle = ((angle % 360) + 360) % 360;
      this.updateView();
    }

    zoom(delta) {
      this.currentZoom = Math.min(Math.max(this.currentZoom + delta, this.options.zoomMin), this.options.zoomMax);
      this.updateView();
    }

    reset() {
      this.stopAutoSpin();
      this.currentAngle = 45;
      this.currentZoom = 1;
      this.updateView();
    }

    toggleAutoSpin() {
      if (this.isAutoSpinning) {
        this.stopAutoSpin();
      } else {
        this.startAutoSpin();
      }
    }

    startAutoSpin() {
      this.isAutoSpinning = true;
      const icon = this.btnAutoSpin.querySelector('i');
      if (icon) icon.className = 'bi bi-pause-circle-fill';
      
      const spinStep = () => {
        if (!this.isAutoSpinning) return;
        this.setAngle(this.currentAngle + this.options.autoSpinSpeed);
        this.autoSpinRaf = requestAnimationFrame(spinStep);
      };
      this.autoSpinRaf = requestAnimationFrame(spinStep);
    }

    stopAutoSpin() {
      this.isAutoSpinning = false;
      if (this.autoSpinRaf) cancelAnimationFrame(this.autoSpinRaf);
      const icon = this.btnAutoSpin.querySelector('i');
      if (icon) icon.className = 'bi bi-play-circle-fill';
    }

    updateView() {
      // Angle format
      const roundedAngle = Math.round(this.currentAngle);
      this.angleDisplay.textContent = `${roundedAngle}°`;

      // Transform 3D perspective rotation simulation
      // We calculate horizontal skew/tilt and rotational matrix to produce realistic 360 perspective
      const rad = (this.currentAngle * Math.PI) / 180;
      const rotateY = Math.sin(rad) * 22; // subtle 3D tilt
      const lightFactor = 0.85 + Math.cos(rad) * 0.15; // simulates light catching the brushed metal

      this.productImg.style.transform = `scale(${this.currentZoom}) rotateY(${rotateY}deg) rotateZ(${Math.sin(rad * 2) * 1.5}deg)`;
      this.productImg.style.filter = `brightness(${lightFactor}) drop-shadow(0 20px 30px rgba(0,0,0,0.6))`;

      // Render & position hotspots according to viewing angle
      this.renderHotspots();
    }

    renderHotspots() {
      this.hotspotsLayer.innerHTML = '';

      this.hotspots.forEach(hs => {
        // Calculate dynamic coordinate based on rotation angle
        const angleDiff = ((this.currentAngle - hs.activeAngle + 180) % 360) - 180;
        const isFacingUser = Math.abs(angleDiff) < 70; // visible within 140 degree cone

        if (isFacingUser) {
          // Perspective shift
          const offsetX = Math.sin((angleDiff * Math.PI) / 180) * 18;
          const currentX = hs.baseX + offsetX;
          const opacity = 1 - Math.abs(angleDiff) / 70;

          const hotspotEl = document.createElement('div');
          hotspotEl.className = 'viewer-hotspot';
          hotspotEl.style.left = `${currentX}%`;
          hotspotEl.style.top = `${hs.baseY}%`;
          hotspotEl.style.opacity = opacity.toFixed(2);
          hotspotEl.setAttribute('role', 'button');
          hotspotEl.setAttribute('tabindex', '0');
          hotspotEl.setAttribute('aria-label', `${hs.title}: ${hs.desc}`);

          hotspotEl.innerHTML = `
            <div class="hotspot-pulse"></div>
            <div class="hotspot-center"></div>
            <div class="hotspot-card-popover">
              <h5><i class="bi bi-info-circle-fill me-1"></i>${hs.title}</h5>
              <p>${hs.desc}</p>
            </div>
          `;

          // Click to pin/toggle
          hotspotEl.addEventListener('click', (e) => {
            e.stopPropagation();
            hotspotEl.classList.toggle('active');
          });

          this.hotspotsLayer.appendChild(hotspotEl);
        }
      });
    }
  }

  // Global factory
  window.Wavecraft360Viewer = Wavecraft360Viewer;

  document.addEventListener('DOMContentLoaded', () => {
    // Auto initialize if container exists
    const previewContainer = document.getElementById('home360ViewerContainer');
    if (previewContainer) {
      new Wavecraft360Viewer(previewContainer);
    }
    const detailsContainer = document.getElementById('details360ViewerContainer');
    if (detailsContainer) {
      new Wavecraft360Viewer(detailsContainer);
    }
  });
})();
