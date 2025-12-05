// File: src/js/app.js
// Smart Workz Premium Admin Template - Main JavaScript Entry Point
// Modern ES6+ vanilla JavaScript for all interactive functionality

// ============================================================================
// IMPORTS - Module imports will be added as modules are created
// ============================================================================
// import { initSidebar } from './modules/sidebar.js';
// import { initThemeSwitcher } from './modules/theme-switcher.js';
// import { initFormValidation } from './modules/form-validation.js';
// import { initCharts } from './modules/charts.js';
// import { initNotifications } from './modules/notifications.js';

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================

/**
 * Main application initialization
 * Runs when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Smart Workz Premium Admin Template - Initialized');

  // Initialize all modules
  // initSidebar();
  // initThemeSwitcher();
  // initFormValidation();
  // initCharts();
  // initNotifications();

  // Initialize tooltips (Bootstrap)
  initTooltips();

  // Initialize popovers (Bootstrap)
  initPopovers();

  // Initialize dropdowns
  initDropdowns();

  // Initialize modals
  initModals();

  // Initialize forms
  initForms();

  // Initialize navigation
  initNavigation();

  // Log successful initialization
  console.log('All modules initialized successfully');
});

// ============================================================================
// BOOTSTRAP COMPONENT INITIALIZATION
// ============================================================================

/**
 * Initialize Bootstrap tooltips
 */
function initTooltips() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(
    tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}

/**
 * Initialize Bootstrap popovers
 */
function initPopovers() {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(
    popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl)
  );
}

/**
 * Initialize dropdown functionality
 */
function initDropdowns() {
  // Dropdowns are automatically initialized by Bootstrap
  // Add custom dropdown behavior here if needed
}

/**
 * Initialize modal functionality
 */
function initModals() {
  // Add custom modal behavior
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('shown.bs.modal', function (event) {
      // Focus first input when modal opens
      const firstInput = modal.querySelector('input, textarea, select');
      if (firstInput) {
        firstInput.focus();
      }
    });

    // Trap focus within modal for accessibility
    modal.addEventListener('keydown', function (event) {
      if (event.key === 'Tab') {
        trapFocus(modal, event);
      }
    });
  });
}

/**
 * Initialize form enhancements
 */
function initForms() {
  // Password toggle visibility
  initPasswordToggle();

  // Floating labels
  initFloatingLabels();

  // Character counters
  initCharacterCounters();

  // Auto-resize textareas
  initAutoResizeTextareas();
}

/**
 * Initialize navigation enhancements
 */
function initNavigation() {
  // Mobile menu toggle
  const navbarToggler = document.querySelector('.navbar-toggler');
  if (navbarToggler) {
    navbarToggler.addEventListener('click', function () {
      const navbar = document.querySelector('.navbar-collapse');
      navbar.classList.toggle('show');
    });
  }

  // Active navigation highlighting
  highlightActiveNav();

  // Smooth scrolling for anchor links
  initSmoothScrolling();
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Password visibility toggle
 */
function initPasswordToggle() {
  const toggleButtons = document.querySelectorAll('.password-toggle');
  toggleButtons.forEach(button => {
    button.addEventListener('click', function () {
      const input = this.closest('.input-group').querySelector('input');
      const icon = this.querySelector('i');

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
      }
    });
  });
}

/**
 * Initialize floating labels
 */
function initFloatingLabels() {
  const floatingInputs = document.querySelectorAll('.form-floating input, .form-floating textarea');
  floatingInputs.forEach(input => {
    // Add focus class
    input.addEventListener('focus', function () {
      this.closest('.form-floating').classList.add('focused');
    });

    input.addEventListener('blur', function () {
      this.closest('.form-floating').classList.remove('focused');
    });
  });
}

/**
 * Initialize character counters for textareas
 */
function initCharacterCounters() {
  const textareasWithCounter = document.querySelectorAll('[data-character-counter]');
  textareasWithCounter.forEach(textarea => {
    const maxLength = textarea.getAttribute('maxlength');
    const counter = document.createElement('div');
    counter.className = 'character-counter text-muted small mt-1';
    counter.textContent = `0 / ${maxLength}`;
    textarea.parentNode.appendChild(counter);

    textarea.addEventListener('input', function () {
      const currentLength = this.value.length;
      counter.textContent = `${currentLength} / ${maxLength}`;

      if (currentLength >= maxLength * 0.9) {
        counter.classList.add('text-warning');
      } else {
        counter.classList.remove('text-warning');
      }
    });
  });
}

/**
 * Auto-resize textareas
 */
function initAutoResizeTextareas() {
  const autoResizeTextareas = document.querySelectorAll('[data-auto-resize]');
  autoResizeTextareas.forEach(textarea => {
    textarea.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  });
}

/**
 * Highlight active navigation item
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .sidebar-nav a');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Trap focus within an element (for modals, dropdowns)
 * @param {HTMLElement} element - The element to trap focus within
 * @param {Event} event - The keyboard event
 */
function trapFocus(element, event) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    }
  } else {
    if (document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - The function to debounce
 * @param {number} wait - The wait time in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================================================
// GLOBAL UTILITIES (Available to all scripts)
// ============================================================================

window.SmartWorkz = window.SmartWorkz || {
  // Utility functions exposed globally
  debounce,
  throttle,
  trapFocus,

  // Version info
  version: '1.0.0',

  // Configuration
  config: {
    tooltipDelay: 300,
    toastDuration: 5000,
    animationDuration: 300
  }
};

// ============================================================================
// EXPORT FOR MODULE SYSTEMS (if needed)
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.SmartWorkz;
}
