/**
 * WAVECRAFT AUDIO & ACADEMY — Product Catalog Data & Utility Functions
 */

(function () {
  'use strict';

  const PRODUCTS_DATA = [
    {
      id: 'mic-x1',
      name: 'WAVECRAFT Studio Mic X1',
      brand: 'WAVECRAFT',
      category: 'microphones',
      subCategory: 'dynamic',
      price: 199,
      rating: 4.9,
      reviewsCount: 184,
      image: 'assets/images/products/mic-x1.jpg',
      badge: 'Flagship',
      badgeClass: 'badge-flagship',
      featured: true,
      inStock: true,
      connectivity: 'USB-C + XLR',
      polarPattern: 'Cardioid (Dynamic)',
      frequencyResponse: '20 Hz – 20 kHz',
      sensitivity: '-54 dBV/Pa (XLR)',
      maxSPL: '135 dB SPL',
      sampleRate: '96 kHz / 24-bit',
      bitDepth: '24-bit',
      einNoise: '-128 dBu EIN',
      monitoring: 'Zero-Latency 3.5mm Headphone Jack',
      weight: '645g',
      included: 'Integrated shockmount, USB-C to USB-C cable (2m), XLR cable (3m), threaded adapter',
      shortHighlight: 'Dual USB-C / XLR Hybrid with 24-bit/96kHz Converter',
      description: 'The definitive hybrid broadcast dynamic microphone for podcasters and streamers. Features pristine dual connectivity, internal pneumatic shock absorption, and broadcast-grade capsule voicing.',
      specs: {
        capsuleType: 'Custom Dynamic Voiced for Spoken Word',
        polarPattern: 'Cardioid with high off-axis rejection',
        sampleRateBitDepth: '48 / 96 kHz, 24-bit',
        frequencyRange: '20 Hz – 20,000 Hz',
        analogOutput: '3-pin XLR male (Neutrik standard)',
        digitalOutput: 'USB Type-C (USB 2.0 compliant)',
        dspModes: 'Speech Clarity, Low-Cut (80Hz), High-Pass Limiter',
        headphoneOut: '3.5 mm TRS stereo, 38 mW @ 32 Ohms'
      }
    },
    {
      id: 'mic-vocal-c3',
      name: 'WAVECRAFT Vocal Pure C3',
      brand: 'WAVECRAFT',
      category: 'microphones',
      subCategory: 'condenser',
      price: 279,
      rating: 4.8,
      reviewsCount: 96,
      image: 'assets/images/products/mic-vocal-c3.jpg',
      badge: 'Studio Pure',
      badgeClass: 'badge-popular',
      featured: true,
      inStock: true,
      connectivity: 'XLR',
      polarPattern: 'Multi-Pattern (Cardioid / Omni / Fig-8)',
      frequencyResponse: '20 Hz – 20 kHz',
      sensitivity: '-34 dBV/Pa',
      maxSPL: '138 dB SPL',
      sampleRate: 'Analog (Host ADC dependent)',
      bitDepth: 'Analog',
      einNoise: '8 dBA Equivalent Self-Noise',
      monitoring: 'Direct via Interface',
      weight: '520g',
      included: 'Heavy-duty suspension shockmount, velvet travel pouch, 5/8" to 3/8" adapter',
      shortHighlight: '1-inch Gold-Sputtered Large-Diaphragm Condenser',
      description: 'Delivers intimate warmth, silky top-end presence, and crystal transparency for treated vocal studios and voiceover artists.',
      specs: {
        capsuleType: '34mm Gold-Sputtered True Condenser',
        polarPattern: 'Switchable: Cardioid, Omnidirectional, Figure-8',
        frequencyRange: '20 Hz – 20,000 Hz',
        analogOutput: '3-pin XLR male',
        phantomPower: '48V DC ±4V required',
        padSwitch: '-10 dB attenuation pad',
        filterSwitch: '80 Hz, 12dB/octave high-pass filter'
      }
    },
    {
      id: 'headphones-hd7',
      name: 'WAVECRAFT Reference Pro HD-7',
      brand: 'WAVECRAFT',
      category: 'headphones',
      subCategory: 'closed-back',
      price: 189,
      rating: 4.9,
      reviewsCount: 142,
      image: 'assets/images/products/headphones-hd7.jpg',
      badge: 'Pro Reference',
      badgeClass: 'badge-popular',
      featured: true,
      inStock: true,
      connectivity: '3.5mm + 6.35mm Gold-Plated Adapter',
      polarPattern: 'Closed-Back Circumaural',
      frequencyResponse: '5 Hz – 32 kHz',
      sensitivity: '102 dB SPL / 1mW',
      maxSPL: '118 dB SPL',
      sampleRate: 'Analog Reference',
      bitDepth: 'Analog',
      einNoise: 'Passive 28 dB Acoustic Isolation',
      monitoring: 'Critical Monitoring & Tracking',
      weight: '280g',
      included: 'Detachable 3m coiled cable, 1.2m straight cable with mic, 6.35mm screw-on adapter',
      shortHighlight: '45mm Neodymium Drivers with 28dB Passive Isolation',
      description: 'Engineered for critical vocal tracking and detailed podcast editing with an ultra-flat response curve that reveals subtle clicks and background rumble.',
      specs: {
        transducerType: 'Dynamic 45mm Neodymium Rare-Earth Magnet',
        acousticDesign: 'Closed-back over-ear (circumaural)',
        impedance: '38 Ohms (easily driven by interfaces & phones)',
        frequencyRange: '5 Hz – 32,000 Hz',
        earpads: 'Replaceable high-density memory foam with breathable velour',
        cableType: 'Dual-sided detachable lock-in 3.5mm connector'
      }
    },
    {
      id: 'interface-core2',
      name: 'WAVECRAFT Core Stream 2x2',
      brand: 'WAVECRAFT',
      category: 'interfaces',
      subCategory: 'usb-interface',
      price: 169,
      rating: 4.9,
      reviewsCount: 118,
      image: 'assets/images/products/interface-core2.jpg',
      badge: 'Best Seller',
      badgeClass: 'badge-flagship',
      featured: true,
      inStock: true,
      connectivity: 'USB-C (High-Speed)',
      polarPattern: 'Dual Combo XLR/TRS Inputs',
      frequencyResponse: '20 Hz – 40 kHz (±0.1 dB)',
      sensitivity: '+65 dB Ultra-Clean Gain Range',
      maxSPL: 'Up to +22 dBu Input Headroom',
      sampleRate: '192 kHz / 24-bit',
      bitDepth: '24-bit / 32-bit Float Internal',
      einNoise: '-129 dBu Ultra-Low EIN',
      monitoring: 'Independent Zero-Latency Direct Monitoring',
      weight: '490g',
      included: 'USB-C to USB-C cable (1.5m), USB-C to USB-A adapter, QuickStart audio guide',
      shortHighlight: '192kHz/24-bit with 65dB Gain & Halo LED VU Meters',
      description: 'The studio-grade USB-C interface built specifically to drive gain-hungry dynamic broadcast microphones without requiring external cloud boosters.',
      specs: {
        preampCount: '2 Discreet Low-Noise Analog Preamps',
        phantomPower: 'Independent +48V Phantom Power Switch',
        dynamicRange: '118 dB(A) ADC / 120 dB(A) DAC',
        gainRange: '+65 dB (supports low-output dynamic mics)',
        chassis: 'Solid brushed aluminum unibody housing',
        compatibility: 'macOS, Windows 10/11, iPadOS, Linux (Class Compliant)'
      }
    },
    {
      id: 'mixer-deck4',
      name: 'WAVECRAFT Broadcast Deck 4',
      brand: 'WAVECRAFT',
      category: 'mixers',
      subCategory: 'podcast-console',
      price: 449,
      rating: 4.95,
      reviewsCount: 88,
      image: 'assets/images/products/mixer-deck4.jpg',
      badge: 'Production Console',
      badgeClass: 'badge-bundle',
      featured: true,
      inStock: true,
      connectivity: 'USB-C + Bluetooth 5.2 + 4x XLR',
      polarPattern: '4 Independent Mic Channels',
      frequencyResponse: '20 Hz – 20 kHz',
      sensitivity: '+72 dB Low-Noise Preamp Gain',
      maxSPL: 'Internal Multi-Stage DSP Limiter',
      sampleRate: '48 kHz / 24-bit Multitrack',
      bitDepth: '24-bit',
      einNoise: '-131 dBu EIN Preamp Circuitry',
      monitoring: '4 Independent Headphone Outputs with Volume Dials',
      weight: '1450g',
      included: 'Power supply adapter, USB-C host cable, Sound bank sample pack, quick guide',
      shortHighlight: '4 Channel Faders, 6 RGB Jingles Pads, Touchscreen Multitrack',
      description: 'The complete broadcast command center. Mix 4 voices, trigger sound effects, route remote phone guests via Bluetooth without echo, and record directly to microSD or computer.',
      specs: {
        faders: '4 x 100mm Smooth Broadcast Audio Faders',
        soundPads: '6 Velocity-Sensitive RGB Backlit Silicone Pads',
        screen: '4.3-inch Full Color Touchscreen with Real-Time Waveforms',
        storage: 'Direct-to-microSD multitrack WAV recording or USB-C DAW',
        dspEffects: 'De-Esser, Noise Gate, Aural Exciter, Compressor, High-Pass'
      }
    },
    {
      id: 'bundle-pro-creator',
      name: 'WAVECRAFT Creator Suite Pro Bundle',
      brand: 'WAVECRAFT',
      category: 'bundles',
      subCategory: 'pro-bundle',
      price: 549,
      rating: 5.0,
      reviewsCount: 64,
      image: 'assets/images/products/bundle-pro-creator.jpg',
      badge: 'Complete Studio',
      badgeClass: 'badge-bundle',
      featured: true,
      inStock: true,
      connectivity: 'Complete XLR + USB-C Ecosystem',
      polarPattern: 'Complete Matched Studio System',
      frequencyResponse: '20 Hz – 20 kHz Full Fidelity',
      sensitivity: 'Optimized Signal Chain Synergy',
      maxSPL: '135 dB SPL with Zero Distortion',
      sampleRate: '192 kHz / 24-bit ADC',
      bitDepth: '24-bit Pristine Quality',
      einNoise: '-129 dBu Ultra-Clean Chain',
      monitoring: 'Zero-Latency Hardware + HD-7 Cans',
      weight: '3.8kg (Complete System)',
      included: 'Mic X1, Core Stream 2x2, HD-7 Headphones, WaveArm Pro, Pop Shield, Braided Cables',
      shortHighlight: 'Everything you need: Mic X1 + Interface + Cans + Low-Profile Arm',
      description: 'The turnkey flagship setup. Eliminate guesswork with a perfectly impedance-matched audio chain that gives your voice broadcast warmth right out of the box.',
      specs: {
        includedMic: 'WAVECRAFT Studio Mic X1 Broadcast Dynamic',
        includedInterface: 'WAVECRAFT Core Stream 2x2 with 65dB Gain',
        includedMonitoring: 'WAVECRAFT Reference Pro HD-7 Studio Headphones',
        includedMounting: 'WAVECRAFT WaveArm Pro Low-Profile Desk Arm',
        cables: 'Neutrik-grade 3m Braided XLR + 2m Gold-plated USB-C'
      }
    }
  ];

  // Public Catalog API
  window.WavecraftProducts = {
    getAll: () => PRODUCTS_DATA,
    getFeatured: () => PRODUCTS_DATA.filter(p => p.featured),
    getById: (id) => PRODUCTS_DATA.find(p => p.id === id),
    getByCategory: (cat) => cat === 'all' ? PRODUCTS_DATA : PRODUCTS_DATA.filter(p => p.category === cat),
    
    // Render standardized product card HTML
    renderCard: function (product, options = {}) {
      const isCompared = window.WavecraftCompare && window.WavecraftCompare.has(product.id);
      
      return `
        <div class="col-12 col-md-6 col-lg-4 d-flex" data-product-id="${product.id}">
          <div class="product-card w-100">
            <div class="product-image-container">
              ${product.badge ? `<span class="product-badge ${product.badgeClass}">${product.badge}</span>` : ''}
              <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            
            <div class="product-brand">${product.brand}</div>
            <h3 class="product-title">
              <a href="product-details.html?id=${product.id}">${product.name}</a>
            </h3>

            <div class="product-rating">
              <div class="stars">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <span class="rating-val font-tech ms-1">${product.rating}</span>
              <span class="rating-count">(${product.reviewsCount})</span>
            </div>

            <div class="product-spec-pills">
              <span class="spec-pill"><i class="bi bi-plug me-1"></i>${product.connectivity}</span>
              <span class="spec-pill"><i class="bi bi-soundwave me-1"></i>${product.sampleRate.split('/')[0]}</span>
              <span class="spec-pill"><i class="bi bi-disc me-1"></i>${product.polarPattern.split(' ')[0]}</span>
            </div>

            <div class="product-footer">
              <div class="product-price">$${product.price}</div>
              
              <div class="d-flex align-items-center gap-2">
                <label class="compare-checkbox-label" title="Add to comparison">
                  <input type="checkbox" class="compare-trigger-checkbox" data-id="${product.id}" ${isCompared ? 'checked' : ''}>
                  <span>Compare</span>
                </label>
                <a href="product-details.html?id=${product.id}" class="btn-wave btn-wave-secondary btn-wave-sm">
                  View Product
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  };
})();
