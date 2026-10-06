/**
 * WAVECRAFT AUDIO & ACADEMY — Main Script
 * Handles Global Navigation, Mobile Menu, Cart Drawer, Toasts, Web Audio Synthesizer, & GSAP Animations
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  const ToastSystem = {
    container: null,
    init() {
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.className = 'wave-toast-container';
        this.container.setAttribute('aria-live', 'polite');
        document.body.appendChild(this.container);
      }
    },
    show(message, type = 'info', duration = 3500) {
      this.init();
      const toast = document.createElement('div');
      toast.className = 'wave-toast';

      let icon = 'bi-info-circle-fill text-info';
      if (type === 'success') icon = 'bi-check-circle-fill text-success';
      if (type === 'warning') icon = 'bi-exclamation-triangle-fill text-warning';

      toast.innerHTML = `
        <i class="bi ${icon}" style="font-size: 1.1rem;"></i>
        <div class="flex-grow-1">${message}</div>
        <button type="button" class="btn-close btn-close-white ms-2" style="font-size: 0.65rem;" aria-label="Close"></button>
      `;

      toast.querySelector('.btn-close').addEventListener('click', () => {
        toast.remove();
      });

      this.container.appendChild(toast);

      setTimeout(() => {
        if (toast.parentNode) {
          toast.style.opacity = '0';
          toast.style.transform = 'translateY(10px)';
          toast.style.transition = 'all 0.3s ease';
          setTimeout(() => toast.remove(), 300);
        }
      }, duration);
    }
  };
  window.WavecraftToast = ToastSystem;

  /* ==========================================================================
     2. CART DRAWER SYSTEM
     ========================================================================== */
  const CartSystem = {
    STORAGE_KEY: 'wavecraft_cart_items',
    get() {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.warn('Cart storage error:', e);
      }
      return [
        { id: 'mic-x1', quantity: 1 }
      ];
    },
    save(cart) {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        console.warn('Cart save error:', e);
      }
      this.updateBadges();
      this.render();
    },
    addItem(productId, qty = 1) {
      const cart = this.get();
      const existing = cart.find(item => item.id === productId);
      if (existing) {
        existing.quantity += qty;
      } else {
        cart.push({ id: productId, quantity: qty });
      }
      this.save(cart);
      const prod = window.WavecraftProducts && window.WavecraftProducts.getById(productId);
      const name = prod ? prod.name : 'Audio Device';
      ToastSystem.show(`Added <strong>${name}</strong> to your studio cart!`, 'success');
      this.open();
    },
    removeItem(productId) {
      let cart = this.get();
      cart = cart.filter(item => item.id !== productId);
      this.save(cart);
    },
    updateQuantity(productId, qty) {
      const cart = this.get();
      const item = cart.find(i => i.id === productId);
      if (item) {
        item.quantity = Math.max(1, qty);
        this.save(cart);
      }
    },
    updateBadges() {
      const cart = this.get();
      const totalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
      document.querySelectorAll('.cart-badge-count').forEach(el => {
        el.textContent = totalCount;
        el.style.display = totalCount > 0 ? 'inline-flex' : 'none';
      });
    },
    open() {
      const drawer = document.getElementById('cartDrawer');
      const overlay = document.getElementById('cartOverlay');
      if (drawer && overlay) {
        this.render();
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    },
    close() {
      const drawer = document.getElementById('cartDrawer');
      const overlay = document.getElementById('cartOverlay');
      if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    },
    render() {
      const body = document.getElementById('cartDrawerBody');
      const subtotalEl = document.getElementById('cartSubtotal');
      if (!body) return;

      const cart = this.get();
      if (cart.length === 0) {
        body.innerHTML = `
          <div class="text-center py-5">
            <div class="mb-3 text-muted" style="font-size: 2.5rem;"><i class="bi bi-cart-x"></i></div>
            <h5>Your Studio Cart is Empty</h5>
            <p class="text-muted small">Explore our precision audio interfaces, microphones, and studio bundles.</p>
            <a href="shop.html" class="btn-wave btn-wave-primary btn-wave-sm mt-2">Explore Shop</a>
          </div>
        `;
        if (subtotalEl) subtotalEl.textContent = '$0.00';
        return;
      }

      let subtotal = 0;
      let html = '';

      cart.forEach(item => {
        const prod = window.WavecraftProducts ? window.WavecraftProducts.getById(item.id) : null;
        if (!prod) return;

        const itemTotal = prod.price * item.quantity;
        subtotal += itemTotal;

        html += `
          <div class="cart-item">
            <img src="${prod.image}" alt="${prod.name}" class="cart-item-img">
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h6 class="mb-1" style="font-size: 0.9rem;">${prod.name}</h6>
                  <div class="font-tech text-muted small">$${prod.price} each</div>
                </div>
                <button class="btn btn-sm btn-link text-muted p-0 remove-cart-item-btn" data-id="${prod.id}" title="Remove">
                  <i class="bi bi-trash"></i>
                </button>
              </div>

              <div class="d-flex justify-content-between align-items-center mt-2">
                <div class="d-flex align-items-center gap-1">
                  <button class="btn btn-sm btn-outline-secondary py-0 px-2 qty-minus-btn" data-id="${prod.id}">-</button>
                  <span class="px-2 font-tech small fw-bold">${item.quantity}</span>
                  <button class="btn btn-sm btn-outline-secondary py-0 px-2 qty-plus-btn" data-id="${prod.id}">+</button>
                </div>
                <span class="font-tech fw-bold" style="color: var(--accent-cyan);">$${itemTotal}</span>
              </div>
            </div>
          </div>
        `;
      });

      body.innerHTML = html;
      if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString('en-US')}.00`;

      // Attach button listeners
      body.querySelectorAll('.remove-cart-item-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.removeItem(btn.getAttribute('data-id'));
        });
      });

      body.querySelectorAll('.qty-minus-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const itm = cart.find(i => i.id === id);
          if (itm) {
            if (itm.quantity > 1) {
              this.updateQuantity(id, itm.quantity - 1);
            } else {
              this.removeItem(id);
            }
          }
        });
      });

      body.querySelectorAll('.qty-plus-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const itm = cart.find(i => i.id === id);
          if (itm) this.updateQuantity(id, itm.quantity + 1);
        });
      });
    }
  };
  window.WavecraftCart = CartSystem;

  /* ==========================================================================
     3. WEB AUDIO ACOUSTIC TEST TONE & NOISE SIMULATOR
     Interactive educational audio tool built on native Web Audio API
     ========================================================================== */
  const AudioLab = {
    ctx: null,
    currentOsc: null,
    currentNoise: null,
    isPlaying: false,

    initContext() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },

    playTone(frequency = 1000) {
      this.initContext();
      this.stop();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime); // gentle safe volume

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();

      this.currentOsc = osc;
      this.isPlaying = true;
    },

    playPinkNoise(hasLowCut = false) {
      this.initContext();
      this.stop();

      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate Pink Noise using Paul Kellet's algorithm
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;
      noiseNode.loop = true;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);

      if (hasLowCut) {
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(80, this.ctx.currentTime); // 80Hz rumble cut
        noiseNode.connect(filter);
        filter.connect(gain);
      } else {
        noiseNode.connect(gain);
      }

      gain.connect(this.ctx.destination);
      noiseNode.start();

      this.currentNoise = noiseNode;
      this.isPlaying = true;
    },

    stop() {
      if (this.currentOsc) {
        try { this.currentOsc.stop(); } catch (e) {}
        this.currentOsc = null;
      }
      if (this.currentNoise) {
        try { this.currentNoise.stop(); } catch (e) {}
        this.currentNoise = null;
      }
      this.isPlaying = false;
    }
  };
  window.WavecraftAudioLab = AudioLab;

  /* ==========================================================================
     4. DOM INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header on Scroll
    const header = document.querySelector('.wave-header');
    if (header) {
      const updateHeaderScroll = () => {
        if (window.scrollY > 10) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', updateHeaderScroll, { passive: true });
      updateHeaderScroll();
    }

    // 2. Mobile Offcanvas Menu
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenuDrawer');
    const mobileClose = document.getElementById('mobileMenuClose');
    const mobileOverlay = document.getElementById('mobileMenuOverlay');

    function openMobile() {
      if (mobileMenu && mobileOverlay) {
        mobileMenu.classList.add('open');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }
    function closeMobile() {
      if (mobileMenu && mobileOverlay) {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openMobile);
    if (mobileClose) mobileClose.addEventListener('click', closeMobile);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobile);

    // Mobile Dropdown Accordions
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.dropdown-caret');
        if (content) {
          content.classList.toggle('open');
          if (icon) {
            icon.classList.toggle('bi-chevron-down');
            icon.classList.toggle('bi-chevron-up');
          }
        }
      });
    });

    // 3. Cart Drawer Triggers
    document.querySelectorAll('.cart-open-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        CartSystem.open();
      });
    });

    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => CartSystem.close());
    if (cartOverlay) cartOverlay.addEventListener('click', () => CartSystem.close());

    // Delegate Add to Cart clicks
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.add-to-cart-btn');
      if (addBtn) {
        e.preventDefault();
        const id = addBtn.getAttribute('data-id') || 'mic-x1';
        CartSystem.addItem(id, 1);
      }
    });

    // Sync Badges
    CartSystem.updateBadges();

    // 4. Keyboard ESC listener for drawers
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobile();
        CartSystem.close();
        AudioLab.stop();
      }
    });

    // 5. Back to Top Button
    let backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) {
      backToTopBtn = document.createElement('button');
      backToTopBtn.id = 'backToTopBtn';
      backToTopBtn.className = 'btn-back-to-top';
      backToTopBtn.setAttribute('aria-label', 'Back to top');
      backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
      document.body.appendChild(backToTopBtn);
    }

    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 250) {
          backToTopBtn.classList.add('show');
        } else {
          backToTopBtn.classList.remove('show');
        }
      }, { passive: true });

      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 6. Password Visibility Toggle (Eye icon)
    document.querySelectorAll('.password-toggle-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const wrap = this.closest('.password-input-wrap') || this.parentElement;
        const input = wrap.querySelector('input');
        const icon = this.querySelector('i');
        if (input) {
          if (input.type === 'password') {
            input.type = 'text';
            if (icon) {
              icon.classList.remove('bi-eye');
              icon.classList.add('bi-eye-slash');
            }
          } else {
            input.type = 'password';
            if (icon) {
              icon.classList.remove('bi-eye-slash');
              icon.classList.add('bi-eye');
            }
          }
        }
      });
    });

    // 7. Active State Highlight Sync for Mobile & Desktop
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });

    // 8. GSAP Entrance Animations (respects prefers-reduced-motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.gsap && !prefersReducedMotion) {
      gsap.from('.hero-content > *', {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      });

      gsap.from('.hero-image-frame', {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from('.trust-item', {
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.4
      });
    }

    // 9. Audio Lab demo buttons handler
    document.querySelectorAll('.audio-demo-tone-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const freq = parseInt(btn.getAttribute('data-freq') || '1000', 10);
        if (AudioLab.isPlaying) {
          AudioLab.stop();
          btn.innerHTML = '<i class="bi bi-play-fill me-1"></i>Play 1kHz Reference Tone';
        } else {
          AudioLab.playTone(freq);
          btn.innerHTML = '<i class="bi bi-stop-fill me-1"></i>Stop Calibration Tone';
        }
      });
    });

    document.querySelectorAll('.audio-demo-noise-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cut = btn.getAttribute('data-lowcut') === 'true';
        if (AudioLab.isPlaying) {
          AudioLab.stop();
          btn.classList.remove('btn-wave-primary');
          btn.classList.add('btn-wave-secondary');
        } else {
          AudioLab.playPinkNoise(cut);
          btn.classList.remove('btn-wave-secondary');
          btn.classList.add('btn-wave-primary');
        }
      });
    });

    // 10. Checkout demo trigger
    const checkoutBtn = document.getElementById('cartCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        ToastSystem.show('Demo Store: Secure checkout flow simulated.', 'info');
      });
    }
  });
})();

