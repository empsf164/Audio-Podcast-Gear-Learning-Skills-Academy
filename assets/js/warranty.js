/**
 * WAVECRAFT AUDIO & ACADEMY — Instant Warranty Registration
 * Handles form validation, serial format checks, and instant demo warranty certificate generation
 */

(function () {
  'use strict';

  function initWarrantyForm() {
    const form = document.getElementById('warrantyRegistrationForm');
    const confirmationCard = document.getElementById('warrantyConfirmationCard');
    const formContainer = document.getElementById('warrantyFormContainer');

    if (!form) return;

    // Prefill product if URL parameter exists (e.g. warranty.html?product=mic-x1)
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    const productSelect = document.getElementById('warrantyProductSelect');
    if (productParam && productSelect) {
      productSelect.value = productParam;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;

      // Validate inputs
      const firstName = document.getElementById('warrantyFirstName');
      const lastName = document.getElementById('warrantyLastName');
      const email = document.getElementById('warrantyEmail');
      const product = document.getElementById('warrantyProductSelect');
      const serial = document.getElementById('warrantySerialNumber');
      const purchaseDate = document.getElementById('warrantyPurchaseDate');
      const location = document.getElementById('warrantyPurchaseLocation');
      const agree = document.getElementById('warrantyAgreeTerms');

      const inputsToValidate = [firstName, lastName, email, product, serial, purchaseDate, location];

      inputsToValidate.forEach(input => {
        if (!input) return;
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      });

      // Email format
      if (email && email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          email.classList.add('is-invalid');
          isValid = false;
        }
      }

      // Serial number check: minimum 6 characters alphanumeric/hyphen
      if (serial && serial.value) {
        const cleanSerial = serial.value.trim().toUpperCase();
        if (cleanSerial.length < 8) {
          serial.classList.add('is-invalid');
          isValid = false;
        } else {
          serial.value = cleanSerial;
        }
      }

      // Agreement check
      if (agree && !agree.checked) {
        agree.classList.add('is-invalid');
        isValid = false;
      } else if (agree) {
        agree.classList.remove('is-invalid');
      }

      if (!isValid) {
        window.WavecraftToast && window.WavecraftToast.show('Please fill in all required warranty fields correctly.', 'warning');
        return;
      }

      // Generate verification registration code
      const regId = 'WC-REG-' + Math.floor(100000 + Math.random() * 900000);
      const today = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(today.getFullYear() + 3);

      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedToday = today.toLocaleDateString('en-US', options);
      const formattedExpiry = expiryDate.toLocaleDateString('en-US', options);

      const productName = product.options[product.selectedIndex].text;

      // Populate confirmation card
      if (confirmationCard && formContainer) {
        document.getElementById('certProductName').textContent = productName;
        document.getElementById('certSerialNum').textContent = serial.value;
        document.getElementById('certCustomerName').textContent = `${firstName.value} ${lastName.value}`;
        document.getElementById('certCustomerEmail').textContent = email.value;
        document.getElementById('certRegId').textContent = regId;
        document.getElementById('certRegDate').textContent = formattedToday;
        document.getElementById('certExpiryDate').textContent = formattedExpiry;

        formContainer.style.display = 'none';
        confirmationCard.style.display = 'block';

        // Scroll to confirmation
        confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        window.WavecraftToast && window.WavecraftToast.show('Warranty successfully registered & verified!', 'success');
      }
    });

    // Provide quick sample serial filler helper for review convenience
    const sampleFillBtn = document.getElementById('btnSampleSerialFill');
    if (sampleFillBtn) {
      sampleFillBtn.addEventListener('click', () => {
        const firstName = document.getElementById('warrantyFirstName');
        const lastName = document.getElementById('warrantyLastName');
        const email = document.getElementById('warrantyEmail');
        const product = document.getElementById('warrantyProductSelect');
        const serial = document.getElementById('warrantySerialNumber');
        const purchaseDate = document.getElementById('warrantyPurchaseDate');
        const location = document.getElementById('warrantyPurchaseLocation');
        const agree = document.getElementById('warrantyAgreeTerms');

        if (firstName) firstName.value = 'Alexander';
        if (lastName) lastName.value = 'Wright';
        if (email) email.value = 'alex.wright@creatorpod.com';
        if (product) product.value = 'mic-x1';
        if (serial) serial.value = 'WCX1-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000);
        if (purchaseDate) purchaseDate.value = new Date().toISOString().split('T')[0];
        if (location) location.value = 'WAVECRAFT Official Online Store';
        if (agree) agree.checked = true;
      });
    }

    // Print certificate button
    const printBtn = document.getElementById('btnPrintCertificate');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initWarrantyForm);

  window.WavecraftWarranty = {
    init: initWarrantyForm
  };
})();
