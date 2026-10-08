/**
 * WAVECRAFT AUDIO & ACADEMY — Academy Hub & Course Interactions
 */

(function () {
  'use strict';

  const COURSES_DATA = [
    {
      id: 'course-podcasting-fundamentals',
      title: 'Podcasting Fundamentals: From Concept to Published Episode',
      level: 'Beginner',
      levelClass: 'level-beginner',
      topic: 'podcasting',
      duration: '2h 45m',
      lessons: 8,
      instructor: 'Elena Vance',
      instructorRole: 'Executive Podcast Producer',
      instructorAvatar: 'EV',
      price: 'Free with Gear',
      image: 'assets/images/academy/course-podcasting-fundamentals.jpg',
      featured: true,
      description: 'Master the essential workflow of modern podcasting: structuring your show, selecting the right gear, audio levels, and RSS hosting distribution.',
      outcomes: [
        'Understand speech acoustics and room setup',
        'Learn microphone handling and optimal speech distance',
        'Master loudness standards (-16 to -19 LUFS for podcasting)',
        'Configure your hosting feed and show metadata'
      ],
      curriculum: [
        { num: '01', title: 'Show Structure & Format Architecture', duration: '18m', preview: true },
        { num: '02', title: 'Demystifying Audio Gear: Mics, Interfaces & Cables', duration: '24m', preview: true },
        { num: '03', title: 'The 3:1 Distance Rule & Proximity Effect', duration: '20m', preview: false },
        { num: '04', title: 'Recording Clean Vocal Tracks', duration: '22m', preview: false },
        { num: '05', title: 'Basic Noise Reduction & Headroom Management', duration: '25m', preview: false },
        { num: '06', title: 'Editing Dialogue Without Losing Natural Cadence', duration: '28m', preview: false },
        { num: '07', title: 'Mastering to Broadcast Loudness (-16 LUFS)', duration: '16m', preview: false },
        { num: '08', title: 'Publishing to Apple Podcasts & Spotify', duration: '12m', preview: false }
      ]
    },
    {
      id: 'course-mic-technique',
      title: 'Professional Microphone Technique & Precision Gain Staging',
      level: 'Intermediate',
      levelClass: 'level-intermediate',
      topic: 'recording',
      duration: '3h 30m',
      lessons: 10,
      instructor: 'Marcus Chen',
      instructorRole: 'Grammy-Nominated Audio Engineer',
      instructorAvatar: 'MC',
      price: '$49 / Free with Mic X1',
      image: 'assets/images/academy/course-mic-technique.jpg',
      featured: true,
      description: 'Stop fixing muffled or distorted audio in post-production. Learn how acoustic placement, polar patterns, and analog gain staging yield crystal clarity at the source.',
      outcomes: [
        'Harness the proximity effect for broadcast warmth',
        'Calculate off-axis rejection null points to eliminate room reflections',
        'Calibrate analog preamps to reach optimal -18 dBFS digital target',
        'Prevent plosives, sibilance, and comb filtering in multi-speaker setups'
      ],
      curriculum: [
        { num: '01', title: 'Physics of Sound: Air Pressure & Transducer Types', duration: '22m', preview: true },
        { num: '02', title: 'Dynamic vs Condenser: Acoustic Rejection Realities', duration: '25m', preview: true },
        { num: '03', title: 'Cardioid, Supercardioid & Bi-Directional Polar Geometry', duration: '30m', preview: false },
        { num: '04', title: 'The Proximity Effect: Bass Boost vs Intelligibility', duration: '18m', preview: false },
        { num: '05', title: 'Gain Staging 101: Noise Floor, Headroom & Preamp Sweet Spots', duration: '26m', preview: false },
        { num: '06', title: 'Taming Plosives: Pop Filters, Windshields & Axis Offsetting', duration: '19m', preview: false },
        { num: '07', title: 'Managing Two Mics in One Room Without Phase Issues', duration: '32m', preview: false },
        { num: '08', title: 'Boom Arm Ergonomics & Shockmount Mechanical Isolation', duration: '15m', preview: false },
        { num: '09', title: 'Real-Time Hardware Zero-Latency Monitoring', duration: '20m', preview: false },
        { num: '10', title: 'Hands-On Calibration Lab with WAVECRAFT X1', duration: '23m', preview: false }
      ]
    },
    {
      id: 'course-audio-editing',
      title: 'Dialogue Audio Editing, Breath Control & Voice Restoration',
      level: 'Intermediate',
      levelClass: 'level-intermediate',
      topic: 'editing',
      duration: '4h 15m',
      lessons: 12,
      instructor: 'Sarah Jenkins',
      instructorRole: 'Dialogue Editor & Sound Designer',
      instructorAvatar: 'SJ',
      price: '$69',
      image: 'assets/images/academy/course-audio-editing.jpg',
      featured: true,
      description: 'Turn raw dialogue recordings into cohesive, broadcast-ready episodes using spectral repair, surgical equalization, and naturalistic dialogue pacing.',
      outcomes: [
        'Master ripple editing, split edits, and seamless room-tone crossfades',
        'Remove unwanted mouth clicks, plosives, and sibilance with spectral tools',
        'Use surgical parametric EQ to remove muddy resonances and boxiness',
        'Maintain natural speech pacing without sounding robotic'
      ],
      curriculum: [
        { num: '01', title: 'DAW Workspace Configuration & Audio Routing', duration: '20m', preview: true },
        { num: '02', title: 'Pacing & Cadence: The Art of Invisible Editing', duration: '28m', preview: true },
        { num: '03', title: 'Room Tone Extraction & Continuous Background Matching', duration: '22m', preview: false },
        { num: '04', title: 'Spectral Editing for Click & Lip Smack Removal', duration: '31m', preview: false },
        { num: '05', title: 'De-Essing: Taming Harsh High-End Frequencies (4-8kHz)', duration: '24m', preview: false },
        { num: '06', title: 'Automated Dialogue Leveling vs Manual Gain Riding', duration: '27m', preview: false },
        { num: '07', title: 'Equalization for Spoken Word Clarity', duration: '25m', preview: false },
        { num: '08', title: 'Vocal Compression: Glueing Dynamics Transparently', duration: '29m', preview: false },
        { num: '09', title: 'Handling Bleed Across Multiple Microphones', duration: '26m', preview: false },
        { num: '10', title: 'Adding Theme Music, Sound Design & Sidechain Ducking', duration: '34m', preview: false },
        { num: '11', title: 'Final QC Checklist for Dialogue Tracks', duration: '18m', preview: false },
        { num: '12', title: 'Export Presets for WAV & MP3 Delivery', duration: '15m', preview: false }
      ]
    },
    {
      id: 'course-mixing-mastering',
      title: 'Podcast Mixing & Loudness Mastering Standards',
      level: 'Advanced',
      levelClass: 'level-advanced',
      topic: 'mixing',
      duration: '5h 00m',
      lessons: 14,
      instructor: 'David Reynolds',
      instructorRole: 'Mastering Engineer',
      instructorAvatar: 'DR',
      price: '$89',
      image: 'assets/images/academy/course-mixing-mastering.jpg',
      featured: true,
      description: 'Learn the advanced dynamics processing, multiband containment, true-peak limiting, and international broadcast loudness standards (AES TD1004, EBU R128).',
      outcomes: [
        'Understand Integrated, Short-Term, and Momentary LUFS measurement',
        'Implement multiband compression to tame aggressive voice spikes',
        'Prevent lossy codec distortion (MP3/AAC inter-sample peaks)',
        'Calibrate monitor headphones and speakers for reliable mix decisions'
      ],
      curriculum: [
        { num: '01', title: 'Loudness Explained: RMS vs LUFS vs Peak dBFs', duration: '25m', preview: true },
        { num: '02', title: 'Podcast Delivery Standards: Apple (-16 LUFS) vs Spotify', duration: '22m', preview: true },
        { num: '03', title: 'Multi-Bus Routing Architecture in Studio DAWs', duration: '30m', preview: false },
        { num: '04', title: 'Dynamic EQ: Correcting Frequencies Only When They Offend', duration: '28m', preview: false },
        { num: '05', title: 'Parallel Voice Compression for Intimacy and Density', duration: '26m', preview: false },
        { num: '06', title: 'Stereo Imaging & Phase Coherence Checks', duration: '21m', preview: false },
        { num: '07', title: 'Limiting & Inter-Sample True Peak Ceiling (-1.0 dBTP)', duration: '29m', preview: false }
      ]
    },
    {
      id: 'course-noise-control',
      title: 'Noise Control, Acoustic Reflection & Home Studio Acoustics',
      level: 'Intermediate',
      levelClass: 'level-intermediate',
      topic: 'noise-control',
      duration: '2h 15m',
      lessons: 7,
      instructor: 'Elena Vance & Dr. K. Holst',
      instructorRole: 'Acoustic Architect',
      instructorAvatar: 'KH',
      price: 'Free Resource',
      image: 'assets/images/academy/course-noise-control.jpg',
      featured: true,
      description: 'Understanding why equipment cannot fix a bad room. Learn mechanical isolation, absorption vs diffusion, and smart microphone positioning.',
      outcomes: [
        'Identify HVAC, computer fan, and structural rumble paths',
        'Distinguish soundproofing (mass isolation) from sound treatment (absorption)',
        'Build effective DIY bass traps and acoustic absorption panels',
        'Calibrate software noise suppression without creating phase artifacts'
      ],
      curriculum: [
        { num: '01', title: 'The Signal-to-Noise Ratio (SNR) in Non-Treated Rooms', duration: '18m', preview: true },
        { num: '02', title: 'Flutter Echo vs Room Modes vs Boundary Interference', duration: '24m', preview: true },
        { num: '03', title: 'Mechanical Vibration: Boom Arm Clamps & Desk Decoupling', duration: '16m', preview: false },
        { num: '04', title: 'Microphone Polar Null Points as Acoustic Shields', duration: '22m', preview: false },
        { num: '05', title: 'Strategic Placement of Absorption Panels on First Reflection Points', duration: '28m', preview: false },
        { num: '06', title: 'Software Noise Gates: Threshold, Attack & Release Ratios', duration: '25m', preview: false },
        { num: '07', title: 'The Trade-offs of AI Noise Reduction (Robotic Artifacts)', duration: '22m', preview: false }
      ]
    },
    {
      id: 'course-live-streaming',
      title: 'Live Streaming Audio Routing, OBS & Sidechain Voice Ducking',
      level: 'Beginner',
      levelClass: 'level-beginner',
      topic: 'streaming',
      duration: '3h 10m',
      lessons: 9,
      instructor: 'Alex Rivera',
      instructorRole: 'Broadcast Stream Technical Director',
      instructorAvatar: 'AR',
      price: '$49',
      image: 'assets/images/academy/course-live-streaming.jpg',
      featured: false,
      description: 'Configure rock-solid multi-track audio inside OBS Studio, mix discord voice chat, spotify background music, and microphone with automatic ducking.',
      outcomes: [
        'Setup virtual audio cables and multi-bus routing in OBS',
        'Configure low-latency sidechain compression for automatic music ducking',
        'Prevent stream clipping with two-stage broadcast limiters',
        'Manage live guest audio without hearing yourself in an echo loop'
      ],
      curriculum: [
        { num: '01', title: 'OBS Audio Architecture & Sample Rate Synchronization', duration: '22m', preview: true },
        { num: '02', title: 'Eliminating Audio Latency & Desync in Live Video', duration: '20m', preview: true },
        { num: '03', title: 'Setting Up Virtual Audio Cables & Submixes', duration: '26m', preview: false },
        { num: '04', title: 'Real-Time VST Filter Chains Inside OBS', duration: '24m', preview: false },
        { num: '05', title: 'Auto-Ducking: Music Lowers Automatically When You Speak', duration: '28m', preview: false },
        { num: '06', title: 'Live Sound Effects Triggering & Headphone Routing', duration: '21m', preview: false }
      ]
    }
  ];

  function getAllCourses() {
    return COURSES_DATA;
  }

  function getFeaturedCourses() {
    return COURSES_DATA.filter(c => c.featured);
  }

  function getCourseById(id) {
    return COURSES_DATA.find(c => c.id === id);
  }

  function renderCourseCard(course) {
    return `
      <div class="col-12 col-md-6 col-lg-4 d-flex" data-course-id="${course.id}" data-level="${course.level.toLowerCase()}" data-topic="${course.topic}">
        <div class="course-card w-100">
          <div class="course-thumb-wrap">
            <span class="course-level-badge ${course.levelClass}">${course.level}</span>
            <img src="${course.image}" alt="${course.title}" loading="lazy">
          </div>
          
          <div class="course-content">
            <div class="course-meta">
              <span><i class="bi bi-clock"></i> ${course.duration}</span>
              <span><i class="bi bi-collection-play"></i> ${course.lessons} Lessons</span>
            </div>

            <h3 class="course-title">
              <a href="course-details.html?id=${course.id}">${course.title}</a>
            </h3>

            <p class="course-desc">${course.description}</p>

            <div class="course-footer">
              <div class="course-instructor">
                <div class="instructor-avatar">${course.instructorAvatar}</div>
                <div>
                  <div class="fw-bold" style="color: var(--text-primary); font-size: 0.85rem;">${course.instructor}</div>
                  <div class="text-muted" style="font-size: 0.725rem;">${course.instructorRole}</div>
                </div>
              </div>

              <a href="course-details.html?id=${course.id}" class="btn-wave btn-wave-secondary btn-wave-sm">
                View Course
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  window.WavecraftAcademy = {
    getAll: getAllCourses,
    getFeatured: getFeaturedCourses,
    getById: getCourseById,
    renderCard: renderCourseCard
  };
})();
