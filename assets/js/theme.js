/**
 * WAVECRAFT AUDIO & ACADEMY — Theme Script
 * Enforces Dark Theme as permanent default across the entire website
 */

(function () {
  'use strict';

  const htmlEl = document.documentElement;

  function setPermanentDarkTheme() {
    htmlEl.setAttribute('data-theme', 'dark');
    htmlEl.setAttribute('data-bs-theme', 'dark');
    try {
      localStorage.setItem('wavecraft_theme', 'dark');
    } catch (e) {}
  }

  setPermanentDarkTheme();
  document.addEventListener('DOMContentLoaded', setPermanentDarkTheme);

  window.WavecraftTheme = {
    get: () => 'dark',
    set: () => setPermanentDarkTheme()
  };
})();
