/**
 * Smart Workz Premium Admin Template
 * Main Application JavaScript
 * @version 1.0.0
 */

(function () {
  'use strict';

  // ============================================================================
  // CONFIGURATION
  // ============================================================================

  const CONFIG = {
    storagePrefix: 'smartworkz_',
    animationDuration: 300,
    toastDuration: 5000,
    sidebarBreakpoint: 992,
  };

  // ============================================================================
  // DOM UTILITIES
  // ============================================================================

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  // ============================================================================
  // STORAGE UTILITIES
  // ============================================================================

  const Storage = {
    get(key) {
      try {
        const value = localStorage.getItem(CONFIG.storagePrefix + key);
        return value ? JSON.parse(value) : null;
      } catch (e) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(CONFIG.storagePrefix + key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    },
    remove(key) {
      localStorage.removeItem(CONFIG.storagePrefix + key);
    },
  };

  // ============================================================================
  // THEME MANAGER
  // ============================================================================

  const ThemeManager = {
    init() {
      // Get theme from storage or system preference
      const savedTheme = Storage.get('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');
      
      this.setTheme(theme, false);
      this.bindEvents();
    },

    setTheme(theme, save = true) {
      const html = document.documentElement;
      const body = document.body;
      
      if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        body.classList.add('dark-mode');
      } else {
        html.setAttribute('data-theme', 'light');
        body.classList.remove('dark-mode');
      }

      // Update toggle button icon
      const toggleBtn = $('#themeToggle');
      if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
        }
      }

      if (save) {
        Storage.set('theme', theme);
      }

      // Dispatch event for other components
      document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    },

    toggle() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    },

    bindEvents() {
      const toggleBtn = $('#themeToggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggle());
      }

      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!Storage.get('theme')) {
          this.setTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    },
  };

  // ============================================================================
  // COLOR SCHEME MANAGER
  // ============================================================================

  const ColorSchemeManager = {
    schemes: ['blue', 'purple', 'green', 'orange'],
    
    init() {
      const savedScheme = Storage.get('colorScheme') || 'blue';
      this.setScheme(savedScheme, false);
      this.bindEvents();
    },

    setScheme(scheme, save = true) {
      const html = document.documentElement;
      
      // Remove all scheme classes
      this.schemes.forEach(s => html.classList.remove(`theme-${s}`));
      
      // Add new scheme
      html.classList.add(`theme-${scheme}`);
      html.setAttribute('data-color-scheme', scheme);

      if (save) {
        Storage.set('colorScheme', scheme);
      }

      document.dispatchEvent(new CustomEvent('colorschemechange', { detail: { scheme } }));
    },

    bindEvents() {
      // Color scheme selector in settings
      $$('input[name="color"]').forEach(input => {
        input.addEventListener('change', (e) => {
          this.setScheme(e.target.value);
        });
      });
    },
  };

  // ============================================================================
  // SIDEBAR MANAGER
  // ============================================================================

  const SidebarManager = {
    sidebar: null,
    overlay: null,
    isOpen: false,

    init() {
      this.sidebar = $('#sidebar');
      this.overlay = $('#sidebarOverlay');
      
      if (!this.sidebar) return;

      this.bindEvents();
      this.handleResize();
      this.initSubmenus();
    },

    open() {
      if (!this.sidebar) return;
      
      this.sidebar.classList.add('sidebar--open');
      this.overlay?.classList.add('active');
      document.body.classList.add('sidebar-open');
      this.isOpen = true;

      // Trap focus inside sidebar on mobile
      if (window.innerWidth < CONFIG.sidebarBreakpoint) {
        this.trapFocus();
      }
    },

    close() {
      if (!this.sidebar) return;
      
      this.sidebar.classList.remove('sidebar--open');
      this.overlay?.classList.remove('active');
      document.body.classList.remove('sidebar-open');
      this.isOpen = false;
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    handleResize() {
      if (window.innerWidth >= CONFIG.sidebarBreakpoint) {
        this.close();
      }
    },

    initSubmenus() {
      const submenuTogggles = $$('.sidebar__nav-item--has-submenu > .sidebar__nav-link', this.sidebar);
      
      submenuTogggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          const parent = toggle.parentElement;
          const submenu = $('.sidebar__submenu', parent);
          const isOpen = parent.classList.contains('sidebar__nav-item--open');

          // Close other submenus
          $$('.sidebar__nav-item--open', this.sidebar).forEach(item => {
            if (item !== parent) {
              item.classList.remove('sidebar__nav-item--open');
              const otherSubmenu = $('.sidebar__submenu', item);
              if (otherSubmenu) {
                otherSubmenu.style.maxHeight = null;
              }
            }
          });

          // Toggle current submenu
          parent.classList.toggle('sidebar__nav-item--open');
          
          if (submenu) {
            if (!isOpen) {
              submenu.style.maxHeight = submenu.scrollHeight + 'px';
            } else {
              submenu.style.maxHeight = null;
            }
          }
        });
      });

      // Set initial state for active submenus
      $$('.sidebar__nav-item--open .sidebar__submenu', this.sidebar).forEach(submenu => {
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
      });
    },

    trapFocus() {
      const focusableElements = this.sidebar.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      this.sidebar.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      });
    },

    bindEvents() {
      const openBtn = $('#sidebarOpen');
      const closeBtn = $('#sidebarClose');

      openBtn?.addEventListener('click', () => this.open());
      closeBtn?.addEventListener('click', () => this.close());
      this.overlay?.addEventListener('click', () => this.close());

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });

      // Handle resize
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => this.handleResize(), 100);
      });
    },
  };

  // ============================================================================
  // TOAST NOTIFICATIONS
  // ============================================================================

  const Toast = {
    container: null,

    init() {
      // Create toast container if not exists
      if (!$('.toast-container')) {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
      } else {
        this.container = $('.toast-container');
      }
    },

    show(message, type = 'info', duration = CONFIG.toastDuration) {
      if (!this.container) this.init();

      const toast = document.createElement('div');
      toast.className = `toast toast--${type}`;
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'polite');

      const icons = {
        success: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
        info: 'bi-info-circle-fill',
      };

      toast.innerHTML = `
        <i class="bi ${icons[type] || icons.info} toast__icon"></i>
        <span class="toast__message">${message}</span>
        <button class="toast__close" aria-label="Close">
          <i class="bi bi-x"></i>
        </button>
      `;

      // Add to container
      this.container.appendChild(toast);

      // Trigger animation
      requestAnimationFrame(() => {
        toast.classList.add('toast--visible');
      });

      // Close button
      toast.querySelector('.toast__close').addEventListener('click', () => {
        this.hide(toast);
      });

      // Auto hide
      if (duration > 0) {
        setTimeout(() => this.hide(toast), duration);
      }

      return toast;
    },

    hide(toast) {
      toast.classList.remove('toast--visible');
      toast.addEventListener('transitionend', () => {
        toast.remove();
      });
    },

    success(message, duration) {
      return this.show(message, 'success', duration);
    },

    error(message, duration) {
      return this.show(message, 'error', duration);
    },

    warning(message, duration) {
      return this.show(message, 'warning', duration);
    },

    info(message, duration) {
      return this.show(message, 'info', duration);
    },
  };

  // ============================================================================
  // ACCORDION COMPONENT
  // ============================================================================

  const Accordion = {
    init() {
      $$('.accordion__header').forEach(header => {
        header.addEventListener('click', () => this.toggle(header));
        
        // Keyboard support
        header.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggle(header);
          }
        });
      });
    },

    toggle(header) {
      const item = header.closest('.accordion__item');
      const collapse = item.querySelector('.accordion__collapse');
      const isOpen = item.classList.contains('accordion__item--open');

      // Close other items in the same accordion (if not independent)
      const accordion = header.closest('.accordion');
      if (accordion && !accordion.classList.contains('accordion--independent')) {
        $$('.accordion__item--open', accordion).forEach(openItem => {
          if (openItem !== item) {
            this.closeItem(openItem);
          }
        });
      }

      // Toggle current item
      if (isOpen) {
        this.closeItem(item);
      } else {
        this.openItem(item);
      }
    },

    openItem(item) {
      const collapse = item.querySelector('.accordion__collapse');
      const content = item.querySelector('.accordion__body-wrapper');
      
      item.classList.add('accordion__item--open');
      collapse.style.maxHeight = content.scrollHeight + 'px';
      
      item.querySelector('.accordion__header').setAttribute('aria-expanded', 'true');
    },

    closeItem(item) {
      const collapse = item.querySelector('.accordion__collapse');
      
      item.classList.remove('accordion__item--open');
      collapse.style.maxHeight = null;
      
      item.querySelector('.accordion__header').setAttribute('aria-expanded', 'false');
    },
  };

  // ============================================================================
  // TABS COMPONENT
  // ============================================================================

  const Tabs = {
    init() {
      $$('.tabs').forEach(tabContainer => {
        const tabs = $$('.tabs__item', tabContainer);
        const panels = $$('.tabs__panel', tabContainer);

        tabs.forEach((tab, index) => {
          tab.addEventListener('click', () => {
            this.activate(tabContainer, index);
          });

          // Keyboard navigation
          tab.addEventListener('keydown', (e) => {
            let newIndex = index;

            if (e.key === 'ArrowRight') {
              newIndex = (index + 1) % tabs.length;
            } else if (e.key === 'ArrowLeft') {
              newIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (e.key === 'Home') {
              newIndex = 0;
            } else if (e.key === 'End') {
              newIndex = tabs.length - 1;
            } else {
              return;
            }

            e.preventDefault();
            this.activate(tabContainer, newIndex);
            tabs[newIndex].focus();
          });
        });
      });
    },

    activate(container, index) {
      const tabs = $$('.tabs__item', container);
      const panels = $$('.tabs__panel', container);

      tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
        tab.setAttribute('aria-selected', i === index);
        tab.setAttribute('tabindex', i === index ? '0' : '-1');
      });

      panels.forEach((panel, i) => {
        panel.classList.toggle('active', i === index);
        panel.setAttribute('hidden', i !== index);
      });
    },
  };

  // ============================================================================
  // DROPDOWN COMPONENT
  // ============================================================================

  const Dropdown = {
    activeDropdown: null,

    init() {
      $$('[data-dropdown]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggle(trigger);
        });
      });

      // Close on outside click
      document.addEventListener('click', () => {
        this.closeAll();
      });

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAll();
        }
      });
    },

    toggle(trigger) {
      const dropdown = trigger.closest('.dropdown');
      const menu = dropdown.querySelector('.dropdown__menu');
      const isOpen = dropdown.classList.contains('dropdown--open');

      this.closeAll();

      if (!isOpen) {
        dropdown.classList.add('dropdown--open');
        trigger.setAttribute('aria-expanded', 'true');
        this.activeDropdown = dropdown;

        // Position dropdown
        this.position(dropdown, menu);
      }
    },

    position(dropdown, menu) {
      const rect = dropdown.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      
      // Check if menu goes off screen
      if (rect.bottom + menuRect.height > window.innerHeight) {
        dropdown.classList.add('dropdown--up');
      } else {
        dropdown.classList.remove('dropdown--up');
      }

      if (rect.left + menuRect.width > window.innerWidth) {
        dropdown.classList.add('dropdown--end');
      } else {
        dropdown.classList.remove('dropdown--end');
      }
    },

    closeAll() {
      $$('.dropdown--open').forEach(dropdown => {
        dropdown.classList.remove('dropdown--open');
        dropdown.querySelector('[data-dropdown]')?.setAttribute('aria-expanded', 'false');
      });
      this.activeDropdown = null;
    },
  };

  // ============================================================================
  // FORM UTILITIES
  // ============================================================================

  const FormUtils = {
    init() {
      this.initPasswordToggles();
      this.initFloatingLabels();
      this.initValidation();
    },

    initPasswordToggles() {
      $$('.btn-toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
          const input = btn.closest('.input-group').querySelector('input');
          const icon = btn.querySelector('i');
          
          if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('bi-eye', 'bi-eye-slash');
          } else {
            input.type = 'password';
            icon.classList.replace('bi-eye-slash', 'bi-eye');
          }
        });
      });
    },

    initFloatingLabels() {
      $$('.form-floating input, .form-floating textarea').forEach(input => {
        const checkValue = () => {
          input.classList.toggle('has-value', input.value !== '');
        };
        
        input.addEventListener('input', checkValue);
        input.addEventListener('blur', checkValue);
        checkValue();
      });
    },

    initValidation() {
      $$('form[data-validate]').forEach(form => {
        form.addEventListener('submit', (e) => {
          if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
          }
          form.classList.add('was-validated');
        });
      });
    },
  };

  // ============================================================================
  // SCROLL UTILITIES
  // ============================================================================

  const ScrollUtils = {
    init() {
      this.initSmoothScroll();
      this.initScrollSpy();
      this.initBackToTop();
    },

    initSmoothScroll() {
      $$('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
          const targetId = link.getAttribute('href');
          if (targetId === '#') return;
          
          const target = $(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    },

    initScrollSpy() {
      const header = $('.header, .navbar');
      if (!header) return;

      let lastScroll = 0;

      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class
        if (currentScroll > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
          header.classList.add('header--hidden');
        } else {
          header.classList.remove('header--hidden');
        }

        lastScroll = currentScroll;
      });
    },

    initBackToTop() {
      const btn = $('#backToTop');
      if (!btn) return;

      window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.pageYOffset > 300);
      });

      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
  };

  // ============================================================================
  // MOBILE NAVIGATION
  // ============================================================================

  const MobileNav = {
    init() {
      const toggle = $('#navToggle');
      const navbar = $('.navbar');
      
      if (!toggle || !navbar) return;

      toggle.addEventListener('click', () => {
        navbar.classList.toggle('navbar--open');
        toggle.setAttribute('aria-expanded', navbar.classList.contains('navbar--open'));
        
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.className = navbar.classList.contains('navbar--open') ? 'bi bi-x-lg' : 'bi bi-list';
        }
      });
    },
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  const App = {
    init() {
      // Core modules
      ThemeManager.init();
      ColorSchemeManager.init();
      SidebarManager.init();
      Toast.init();

      // UI Components
      Accordion.init();
      Tabs.init();
      Dropdown.init();
      FormUtils.init();
      ScrollUtils.init();
      MobileNav.init();

      // Expose utilities globally
      window.SmartWorkz = {
        theme: ThemeManager,
        colorScheme: ColorSchemeManager,
        sidebar: SidebarManager,
        toast: Toast,
      };

      console.log('Smart Workz Admin Template initialized');
    },
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }

})();
