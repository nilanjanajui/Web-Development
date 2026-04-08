<div align="center">
  <h1>DigiTools</h1>
  <p>A modern digital product marketplace built with React.js - browse, manage, and purchase premium digital tools in one place.</p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-0f172a?style=flat-square&logo=tailwind-css&logoColor=38bdf8" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat-square&logo=daisyui&logoColor=white" />
  </p>
</div>

---

## Overview

DigiTools is a responsive single-page application that simulates a digital product storefront. Users can explore a curated catalog of premium tools, add items to a cart, review their selections, and proceed to checkout - all within a clean, modern interface.

---

## Features

- **Product Catalog** - Displays 10 digital products loaded from a JSON file, each with pricing, feature lists, and category tags (Popular, New, Best Seller).
- **Cart Management** - Add and remove items in real time with live cart count updates in the navbar and toast notifications via React-Toastify.
- **Responsive UI** - Fully optimized for mobile, tablet, and desktop with a hamburger navigation menu and adaptive layouts.

---

## Tech Stack

| Technology | Role |
|---|---|
| React.js | UI component architecture |
| Tailwind CSS | Utility-first styling |
| DaisyUI | Component library |
| JavaScript (ES6+) | Application logic |
| React-Toastify | User notification system |
| Vite | Build tooling and dev server |
| Manrope (Google Fonts) | Typography |

---

## Project Structure

```
digitools/
├── public/
│   └── products.json
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Banner.jsx
│   │   ├── Status.jsx
│   │   ├── MainSection.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CartItem.jsx
│   │   ├── StepsSection.jsx
│   │   ├── PricingSection.jsx
│   │   ├── Workflow.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── index.html
```

---

## Getting Started

**Prerequisites:** Node.js v18+ and npm

```bash
# Clone the repository
git clone https://github.com/yourusername/digitools.git

# Move into the project directory
cd digitools

# Install dependencies
npm install

# Start the development server
npm run dev
```

The website will be available at [https://digitool-platform2.netlify.app/](https://digitool-platform2.netlify.app/).


