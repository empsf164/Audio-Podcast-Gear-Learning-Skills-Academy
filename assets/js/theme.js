/**
 * WAVECRAFT AUDIO & ACADEMY — Theme Switcher
 * Handles Dark / Light mode with localStorage persistence & system preference detection
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'wavecraft_theme';
  const htmlEl = document.documentElement;

  // Retrieve stored theme or detect system preference
  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme) {
      return storedTheme;
    }
    // Default to dark mode for high-end audio laboratory aesthetic
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // Apply theme to document
  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    htmlEl.setAttribute('data-bs-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update all theme toggle buttons on the page
    document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
      const icon = btn.querySelector('i');
      if (theme === 'dark') {
        btn.setAttribute('aria-label', 'Switch to light mode');
        btn.title = 'Switch to light mode';
        if (icon) {
          icon.className = 'bi bi-sun-fill';
        }
      } else {
        btn.setAttribute('aria-label', 'Switch to dark mode');
        btn.title = 'Switch to dark mode';
        if (icon) {
          icon.className = 'bi bi-moon-stars-fill';
        }
      }
    });

    // Dispatch custom event for 360 viewer or canvas to redraw if needed
    window.dispatchEvent(new CustomEvent('wavecraft:theme-changed', { detail: { theme } }));
  }

  // Initial application
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Setup click listeners when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Re-sync button states
    applyTheme(getPreferredTheme());

    document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    });

    // Listen for system preference changes if user hasn't explicitly set preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });

  // Expose globally
  window.WavecraftTheme = {
    get: () => htmlEl.getAttribute('data-theme') || 'dark',
    set: applyTheme
  };
})();
