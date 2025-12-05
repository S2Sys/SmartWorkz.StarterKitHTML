# Smart Workz Premium Admin Template

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/smartworkz/premium-admin-template)
[![License](https://img.shields.io/badge/license-Commercial-green.svg)](LICENSE)
[![Bootstrap](https://img.shields.io/badge/bootstrap-5.3.2-7952B3.svg)](https://getbootstrap.com/)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-339933.svg)](https://nodejs.org/)

> **Production-ready, premium HTML admin dashboard template with complete design system, 5 color themes, dark mode, and 50+ components. Perfect for SaaS, CRM, HRMS, ERP, Analytics, E-commerce, and enterprise applications.**

![Template Preview](docs/preview.png)

---

## ✨ Key Features

### 🎨 Design & UI
- **50+ Premium Components** - Buttons, forms, cards, tables, modals, charts, and more
- **25+ Complete Pages** - Authentication, dashboard, CRUD, profile, errors
- **5 Color Themes** - Blue (default), Purple, Green, Orange, Dark
- **Dark Mode** - Complete dark theme with smooth transitions
- **RTL Support** - Full right-to-left layout for Arabic/Hebrew
- **Modern Design** - Clean, professional, enterprise-quality aesthetics
- **Responsive Layout** - Mobile-first, works perfectly from 320px to 2560px

### 🚀 Technology Stack
- **Bootstrap 5.3.2** - Latest stable version with customizations
- **SCSS (7-1 Architecture)** - Modular, maintainable, scalable stylesheets
- **ES6+ JavaScript** - Modern, modular, vanilla JavaScript
- **Gulp Build System** - Automated compilation, minification, optimization
- **Chart.js & ApexCharts** - Beautiful, interactive data visualizations

### ♿ Accessibility & Quality
- **WCAG 2.1 AA Compliant** - Fully accessible to all users
- **Lighthouse Score 90+** - Performance, Accessibility, Best Practices
- **W3C Valid** - Clean, semantic HTML5 and CSS3
- **Cross-browser Compatible** - Chrome, Safari, Firefox, Edge (last 2 versions)
- **SEO Friendly** - Semantic markup, proper heading hierarchy
- **Keyboard Navigation** - Complete keyboard accessibility

### 🔧 Developer Experience
- **Framework Agnostic** - Works with any backend or frontend framework
- **Complete Design System** - Comprehensive design tokens and variables
- **Well Documented** - Extensive documentation with examples
- **Integration Guides** - React, Vue, Angular, .NET, Blazor, Laravel, Django
- **Clean Code** - BEM methodology, organized, maintainable
- **Production Ready** - Optimized, minified, deployment-ready builds

---

## 📦 What's Included

```
smartworkz-premium-admin-template/
├── dist/                        # Production-ready files
│   ├── css/
│   │   ├── vendor.min.css      # Bootstrap, Bootstrap Icons
│   │   ├── app.min.css         # Main application styles
│   │   ├── theme-blue.min.css  # Blue theme (default)
│   │   ├── theme-purple.min.css
│   │   ├── theme-green.min.css
│   │   ├── theme-orange.min.css
│   │   └── theme-dark.min.css  # Dark mode
│   ├── js/
│   │   ├── vendor.min.js       # Bootstrap, Chart.js, ApexCharts
│   │   └── app.min.js          # Custom application logic
│   ├── img/                     # Optimized images
│   ├── fonts/                   # Icon fonts
│   └── *.html                   # All HTML pages
│
├── src/                         # Source files for development
│   ├── scss/                    # SCSS source (7-1 architecture)
│   ├── js/                      # JavaScript modules
│   ├── img/                     # Source images
│   └── pages/                   # HTML page templates
│
├── docs/                        # Documentation site
│   ├── getting-started.html
│   ├── components.html
│   ├── customization.html
│   ├── integration-*.html
│   └── ...
│
├── gulpfile.js                  # Gulp build configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

### 📄 Complete Page List

**Public Pages (3)**
- Landing Page
- About Page (optional)
- Contact Page (optional)

**Authentication (6)**
- Login
- Register
- Forgot Password
- Reset Password
- Email Verification
- Two-Factor Authentication

**Admin Dashboard (10+)**
- Dashboard (Analytics Overview)
- User List (CRUD)
- User Add/Edit Form
- Profile View
- Profile Edit
- Change Password
- Settings
- Notifications
- Search Results
- Blank Page Template

**Error & Utility (5)**
- 404 Not Found
- 403 Forbidden
- 500 Server Error
- Maintenance Mode
- Session Expired

### 🧩 Component Library (50+)

**Form Elements**
- Buttons (6 variants, 5 sizes)
- Text Inputs (7 types)
- Textarea
- Select Dropdowns
- Checkboxes & Switches
- Radio Buttons
- File Upload
- Date Pickers
- Range Sliders

**Layout**
- Responsive Navbar
- Collapsible Sidebar
- Multi-level Navigation
- Sticky Footer
- Grid System
- Containers

**Content Display**
- Cards (5 variants)
- Tables (Sortable, Selectable)
- Lists (Ordered, Unordered, Custom)
- Accordions
- Tabs (4 variants)
- Breadcrumbs
- Pagination

**Feedback**
- Modals (5 sizes)
- Alerts (4 types)
- Toast Notifications
- Progress Bars
- Loading Spinners
- Skeleton Loaders

**Data Visualization**
- Line Charts
- Bar Charts
- Pie/Donut Charts
- Area Charts
- Mixed Charts
- Sparklines

**Utilities**
- Avatars (5 sizes)
- Badges & Pills
- Icons (Bootstrap Icons)
- Tooltips
- Popovers
- Dropdowns
- Search Bar
- Empty States

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

1. **Download and extract** the template files

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   # or
   gulp serve
   ```
   Opens browser at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   # or
   gulp build
   ```
   Outputs optimized files to `dist/` folder

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development with file watching |
| `npm run build` | Production build (minified, optimized) |
| `npm run serve` | Development server with live reload |
| `npm run clean` | Remove dist folder |
| `npm run validate` | Run CSS and JS linters |

---

## 🎨 Customization

### Changing Colors

**Method 1: Use Predefined Themes**

Simply link one of the theme CSS files:

```html
<!-- Blue Theme (Default) -->
<link rel="stylesheet" href="css/theme-blue.min.css">

<!-- Or Purple Theme -->
<link rel="stylesheet" href="css/theme-purple.min.css">
```

**Method 2: Customize Design Tokens**

Edit `src/scss/abstracts/_variables.scss`:

```scss
// Change primary color
$color-primary: #4F46E5;  // Your brand color
$color-secondary: #06B6D4;

// Rebuild
gulp build
```

**Method 3: CSS Custom Properties (Runtime)**

Override CSS variables in your stylesheet:

```css
:root {
  --color-primary: #FF6B6B;
  --color-primary-dark: #EE5A52;
  --color-primary-light: #FF8787;
}
```

### Changing Fonts

Edit `src/scss/abstracts/_variables.scss`:

```scss
$font-family-heading: 'Your Font', system-ui, sans-serif;
$font-family-body: 'Your Font', system-ui, sans-serif;
```

Don't forget to include the font files or link to Google Fonts.

### Enabling Dark Mode

Add the theme switcher component to your page:

```html
<button id="theme-toggle" class="btn btn-icon">
  <i class="bi bi-moon-stars"></i>
</button>

<script src="js/app.min.js"></script>
```

Dark mode persists via localStorage and switches automatically.

### RTL Support

Add `dir="rtl"` to the `<html>` tag:

```html
<html lang="ar" dir="rtl">
```

And include the RTL stylesheet:

```html
<link rel="stylesheet" href="css/app-rtl.min.css">
```

---

## 🔌 Framework Integration

### React

```jsx
// Button.jsx
import React from 'react';

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

See `docs/integration-react.html` for complete guide.

### Vue

```vue
<!-- Button.vue -->
<template>
  <button :class="buttonClasses" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' }
  },
  computed: {
    buttonClasses() {
      return `btn btn-${this.variant} btn-${this.size}`;
    }
  }
}
</script>
```

See `docs/integration-vue.html` for complete guide.

### .NET Razor

```cshtml
@* _Layout.cshtml *@
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewData["Title"]</title>
    <link rel="stylesheet" href="~/css/vendor.min.css">
    <link rel="stylesheet" href="~/css/app.min.css">
</head>
<body>
    @RenderBody()
    <script src="~/js/vendor.min.js"></script>
    <script src="~/js/app.min.js"></script>
</body>
</html>
```

See `docs/integration-dotnet.html` for complete guide.

**Other Frameworks:** Angular, Blazor, Laravel, Django - See `docs/` folder.

---

## 📊 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| Opera | Last 2 versions |
| iOS Safari | 12.2+ |
| Android Chrome | Last 2 versions |

**Note:** IE11 is not supported. Use modern browsers only.

---

## ♿ Accessibility Features

- ✅ **WCAG 2.1 Level AA** compliant
- ✅ **Semantic HTML5** structure
- ✅ **ARIA attributes** on all interactive elements
- ✅ **Keyboard navigation** with visible focus indicators
- ✅ **Screen reader** optimized
- ✅ **Color contrast** ratios meet standards (4.5:1 minimum)
- ✅ **Skip to main content** link
- ✅ **Form labels** properly associated
- ✅ **Alt text** for all images
- ✅ **Focus management** in modals and dropdowns

Test with:
- **NVDA** (Windows screen reader)
- **JAWS** (Windows screen reader)
- **VoiceOver** (macOS/iOS screen reader)
- **axe DevTools** (Browser extension)
- **Lighthouse** (Chrome DevTools)

---

## 🎯 Use Cases

This template is perfect for:

- ✅ **SaaS Applications** - Customer dashboards, admin panels
- ✅ **CRM Systems** - Customer relationship management
- ✅ **HRMS Platforms** - Human resource management
- ✅ **ERP Software** - Enterprise resource planning
- ✅ **Analytics Dashboards** - Data visualization and reporting
- ✅ **E-commerce Admin** - Product, order, customer management
- ✅ **Booking Systems** - Reservation and scheduling platforms
- ✅ **Finance Applications** - Banking, accounting, invoicing
- ✅ **Education Platforms** - Learning management systems
- ✅ **Healthcare Apps** - Patient management, appointments
- ✅ **Real Estate CRM** - Property and client management
- ✅ **Project Management** - Task tracking, team collaboration

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **Getting Started** - Installation and setup
- **Components** - All 50+ components with examples
- **Design Tokens** - Complete design system reference
- **Customization** - How to customize colors, fonts, spacing
- **Themes** - Working with color themes and dark mode
- **Integration Guides** - React, Vue, Angular, .NET, Blazor, Laravel, Django
- **Performance** - Optimization tips and best practices
- **Accessibility** - WCAG compliance and testing guide

View documentation: Open `docs/index.html` in your browser.

---

## 🛠️ Development Workflow

### Project Structure (SCSS 7-1 Architecture)

```
src/scss/
├── abstracts/      # Variables, mixins, functions
├── base/           # Reset, typography, utilities
├── components/     # Buttons, cards, forms, etc.
├── layout/         # Header, sidebar, footer, grid
├── pages/          # Page-specific styles
├── themes/         # Color theme variations
├── vendors/        # Bootstrap overrides
└── main.scss       # Main entry point
```

### Making Changes

1. **Edit source files** in `src/` folder
2. **Gulp watches** and auto-compiles to `dist/`
3. **Browser reloads** automatically (with `gulp serve`)
4. **Test** in multiple browsers and screen sizes
5. **Build** for production with `gulp build`

### Adding New Components

1. Create `src/scss/components/_your-component.scss`
2. Import in `src/scss/main.scss`:
   ```scss
   @import 'components/your-component';
   ```
3. Create HTML example
4. Document in `docs/components.html`

---

## 🏆 Why Choose This Template?

### vs. Free Bootstrap Templates
- ✅ **Premium design** with custom components
- ✅ **5 color themes** + dark mode (not just Bootstrap default)
- ✅ **50+ components** vs. 10-20 in free templates
- ✅ **25+ pages** vs. 5-10 in free templates
- ✅ **Complete design system** with design tokens
- ✅ **Professional support** and regular updates
- ✅ **Production-ready** code, not just demos

### vs. Other Premium Templates
- ✅ **Framework agnostic** - works with ANY backend/frontend
- ✅ **Better documentation** - comprehensive guides for 7 frameworks
- ✅ **WCAG AA accessible** - many premium templates ignore accessibility
- ✅ **RTL support** - often missing in competitors
- ✅ **Gulp build system** - not just static files
- ✅ **Design tokens** - systematic, scalable customization
- ✅ **Clean code** - BEM methodology, well-organized

---

## 📝 Changelog

### Version 1.0.0 (2025-01-15)
- 🎉 Initial release
- ✨ 50+ UI components
- ✨ 25+ HTML pages
- ✨ 5 color themes + dark mode
- ✨ Complete design system
- ✨ WCAG 2.1 AA accessible
- ✨ RTL support
- ✨ Framework integration guides
- ✨ Comprehensive documentation

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

---

## 🤝 Support

### Getting Help

- 📖 **Documentation**: Check `docs/` folder first
- 💬 **Support Forum**: [forum.smartworkz.com](https://forum.smartworkz.com)
- ✉️ **Email Support**: support@smartworkz.com
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/smartworkz/premium-admin-template/issues)

### Support Policy

- **Response Time**: 24-48 hours (business days)
- **Support Duration**: 6 months included with purchase
- **Support Includes**: Bug fixes, installation help, customization guidance
- **Does NOT Include**: Custom development, backend integration, server setup

**Extended Support:** Available for purchase after 6 months.

---

## 📜 License

**Commercial License** - See [LICENSE](LICENSE) file for details.

### Single License
- ✅ Use in **1 end product** (website/application)
- ✅ End product can be for client or personal use
- ✅ Lifetime updates
- ✅ 6 months support

### Extended License
- ✅ Use in **unlimited end products**
- ✅ Create SaaS products
- ✅ Resell as part of your product
- ✅ Lifetime updates
- ✅ 12 months priority support

**Purchase**: [smartworkz.com/templates](https://smartworkz.com/templates)

---

## 🎯 Roadmap

### Version 1.1 (Q1 2025)
- 10 new UI components
- E-commerce pages (products, cart, checkout)
- Advanced chart examples
- Email templates

### Version 1.2 (Q2 2025)
- Kanban board component
- Full calendar component
- File manager page
- Invoice templates

### Version 2.0 (Q3 2025)
- Complete visual refresh option
- 3 additional color themes
- Mobile app pages
- Advanced animations

---

## 🌟 Credits

Built with love by **Smart Workz**

### Technologies Used
- [Bootstrap 5.3](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Chart.js](https://www.chartjs.org/)
- [ApexCharts](https://apexcharts.com/)
- [Gulp](https://gulpjs.com/)
- [Sass](https://sass-lang.com/)

---

## 📧 Contact

- **Website**: [smartworkz.com](https://smartworkz.com)
- **Email**: info@smartworkz.com
- **Twitter**: [@smartworkz](https://twitter.com/smartworkz)
- **GitHub**: [github.com/smartworkz](https://github.com/smartworkz)

---

<div align="center">

**Made with ❤️ by Smart Workz**

If you find this template helpful, please consider giving it a ⭐ star on GitHub!

[Purchase Template](https://smartworkz.com/templates) • [View Demo](https://demo.smartworkz.com) • [Documentation](docs/index.html)

</div>
