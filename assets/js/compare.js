/**
 * WAVECRAFT AUDIO & ACADEMY — Product Comparison Engine
 * Handles comparison list in localStorage, difference highlighting, and table generation
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'wavecraft_compare_list';
  const MAX_COMPARE_ITEMS = 4;

  // Retrieve current comparison list (array of product IDs)
  function getCompareList() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read comparison storage:', e);
    }
    // Default initial items for rich preview if empty
    return ['mic-x1', 'mic-vocal-c3', 'interface-core2'];
  }

  function saveCompareList(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Could not save comparison storage:', e);
    }
    updateNavBadges();
    window.dispatchEvent(new CustomEvent('wavecraft:compare-updated', { detail: { list } }));
  }

  function updateNavBadges() {
    const list = getCompareList();
    const count = list.length;
    document.querySelectorAll('.compare-badge-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    // Sync all checkboxes on page
    document.querySelectorAll('.compare-trigger-checkbox').forEach(cb => {
      const id = cb.getAttribute('data-id');
      cb.checked = list.includes(id);
    });
  }

  // Toggle item in comparison
  function toggleProduct(productId) {
    let list = getCompareList();
    const index = list.indexOf(productId);

    if (index > -1) {
      list.splice(index, 1);
      window.WavecraftToast && window.WavecraftToast.show('Removed product from comparison');
    } else {
      if (list.length >= MAX_COMPARE_ITEMS) {
        window.WavecraftToast && window.WavecraftToast.show(`You can compare up to ${MAX_COMPARE_ITEMS} products at once`, 'warning');
        return false;
      }
      list.push(productId);
      window.WavecraftToast && window.WavecraftToast.show('Added product to technical comparison', 'success');
    }

    saveCompareList(list);
    return true;
  }

  function removeProduct(productId) {
    let list = getCompareList();
    list = list.filter(id => id !== productId);
    saveCompareList(list);
  }

  function clearAll() {
    saveCompareList([]);
    window.WavecraftToast && window.WavecraftToast.show('Comparison cleared');
  }

  // Generate Comparison Matrix Table HTML
  function renderMatrixTable(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container || !window.WavecraftProducts) return;

    const list = getCompareList();
    const products = list.map(id => window.WavecraftProducts.getById(id)).filter(Boolean);

    if (products.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5">
          <div class="mb-3 text-muted" style="font-size: 3rem;"><i class="bi bi-intersect"></i></div>
          <h4 class="mb-2">No Products in Comparison</h4>
          <p class="text-muted mb-4">Select 2 to 4 audio devices to compare acoustic specifications side by side.</p>
          <a href="shop.html" class="btn-wave btn-wave-primary">Browse Audio Catalog</a>
        </div>
      `;
      return;
    }

    const highlightDiffs = options.highlightDiffs || false;

    // Spec definitions
    const specsList = [
      { key: 'price', label: 'Price', format: (p) => `$${p.price}` },
      { key: 'category', label: 'Category / Type', format: (p) => p.category.toUpperCase() },
      { key: 'polarPattern', label: 'Polar Pattern / Capsule', format: (p) => p.polarPattern },
      { key: 'frequencyResponse', label: 'Frequency Response', format: (p) => p.frequencyResponse },
      { key: 'sensitivity', label: 'Sensitivity / Gain', format: (p) => p.sensitivity },
      { key: 'maxSPL', label: 'Max SPL / Dynamic Range', format: (p) => p.maxSPL },
      { key: 'sampleRate', label: 'Sample Rate / ADC', format: (p) => p.sampleRate },
      { key: 'bitDepth', label: 'Bit Depth', format: (p) => p.bitDepth },
      { key: 'connectivity', label: 'Connection Ports', format: (p) => p.connectivity },
      { key: 'einNoise', label: 'Self-Noise / EIN', format: (p) => p.einNoise },
      { key: 'monitoring', label: 'Hardware Monitoring', format: (p) => p.monitoring },
      { key: 'weight', label: 'Weight', format: (p) => p.weight },
      { key: 'included', label: 'Included Accessories', format: (p) => p.included },
      { key: 'warranty', label: 'Warranty Support', format: () => '2-Year Official + 1-Year Extended with Registration' }
    ];

    let theadHtml = `
      <thead>
        <tr>
          <th style="width: 220px;">Specification</th>
          ${products.map(p => `
            <th class="compare-product-col-header text-center" style="min-width: 200px;">
              <div class="position-relative">
                <button class="btn btn-sm btn-link text-muted position-absolute top-0 end-0 p-1 remove-compare-btn" data-id="${p.id}" title="Remove">
                  <i class="bi bi-x-circle-fill"></i>
                </button>
                <img src="${p.image}" alt="${p.name}" class="img-fluid rounded mb-2" style="max-height: 90px; object-fit: cover;">
                <div class="font-tech text-uppercase" style="font-size: 0.72rem; color: var(--accent-cyan);">${p.brand}</div>
                <h5 class="h6 mb-2">${p.name}</h5>
                <div class="font-tech fw-bold text-light mb-2">$${p.price}</div>
                <a href="product-details.html?id=${p.id}" class="btn-wave btn-wave-secondary btn-wave-sm w-100">
                  View Gear
                </a>
              </div>
            </th>
          `).join('')}
        </tr>
      </thead>
    `;

    let tbodyHtml = '<tbody>';
    specsList.forEach(spec => {
      // Check if values differ across compared products
      const values = products.map(p => spec.format(p));
      const hasDifference = new Set(values).size > 1;
      const rowClass = (highlightDiffs && hasDifference) ? 'compare-diff-highlight' : '';

      tbodyHtml += `
        <tr class="${rowClass}">
          <td class="fw-bold">${spec.label}</td>
          ${products.map(p => `
            <td class="text-center">
              ${spec.format(p)}
            </td>
          `).join('')}
        </tr>
      `;
    });
    tbodyHtml += '</tbody>';

    container.innerHTML = `
      <div class="compare-table-responsive">
        <table class="compare-matrix-table table-bordered mb-0">
          ${theadHtml}
          ${tbodyHtml}
        </table>
      </div>
    `;

    // Attach remove listeners
    container.querySelectorAll('.remove-compare-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        removeProduct(id);
        renderMatrixTable(containerId, options);
      });
    });
  }

  // Initialize events
  document.addEventListener('DOMContentLoaded', () => {
    updateNavBadges();

    // Delegate checkbox changes across any page
    document.addEventListener('change', (e) => {
      if (e.target && e.target.classList.contains('compare-trigger-checkbox')) {
        const id = e.target.getAttribute('data-id');
        toggleProduct(id);
      }
    });

    window.addEventListener('wavecraft:compare-updated', updateNavBadges);
  });

  window.WavecraftCompare = {
    get: getCompareList,
    has: (id) => getCompareList().includes(id),
    toggle: toggleProduct,
    remove: removeProduct,
    clear: clearAll,
    renderTable: renderMatrixTable,
    updateBadges: updateNavBadges
  };
})();
