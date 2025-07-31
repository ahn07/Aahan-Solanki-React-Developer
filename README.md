# React + Vite

ThemeApp

A modern, dynamic React application built with Vite, featuring a theme switcher with multiple layouts (Minimalist, Dark Sidebar, Colorful Cards), responsive design, and smooth animations. The app fetches products from the Fake Store API and displays them in a visually appealing grid, with a customizable header and theme-aware components.

Features

Dynamic Theming: Switch between three themes (Minimalist, Dark Sidebar, Colorful Cards) with persistent storage using localStorage.


Responsive Design: Fully responsive layout with Tailwind CSS, optimized for mobile, tablet, and desktop devices.


Smooth Animations: Custom animations for hero section, product cards, and feature cards, including fade-in, slide-up, and gradient flow effects.


API Integration: Fetches product data from the Fake Store API.


Accessible UI: Includes ARIA attributes and focus states for improved accessibility.

Modern Styling: Uses glassmorphism, gradients, and hover effects for a premium look and feel.

Prerequisites

Before you begin, ensure you have the following installed:

Node.js (v16 or higher recommended)

npm (comes with Node.js) or Yarn

A modern web browser (e.g., Chrome, Firefox)

Clone the Repository
git clone https://github.com/your-username/themeapp.git
cd themeapp


Dependencies

npm install


React: Frontend library for building UI components.


React Router: For client-side routing (react-router-dom).


Tailwind CSS: Utility-first CSS framework for styling.


Vite: Build tool for fast development and production builds.


Fake Store API: External API for fetching product data (https://fakestoreapi.com).

Install these dependencies if not already included:

npm install react react-dom react-router-dom

Notes

Theme Switching: The app supports three themes (Minimalist, Dark Sidebar, Colorful Cards) accessible via the header dropdown. Themes are stored in localStorage for persistence.



API Dependency: The app fetches data from the Fake Store API. Ensure an internet connection or consider adding mock data for offline development.



Custom Animations: The index.css file includes custom animations (fade-in, slide-up, spin-slow, pulse-slow, gradient-flow) used across the app.



ProductCard Styling: Ensure the ProductCard component is styled with theme.colors.secondary, rounded-lg, shadow-md, and hover effects for consistency. Update it to match the app's aesthetic if needed.



Fonts: The app uses font-sans, font-serif, and font-mono. Import these via a CDN (e.g., Google Fonts) in index.html or index.css to avoid fallback issues:

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Roboto+Mono:wght@400;700&family=Roboto+Serif:wght@700&display=swap" rel="stylesheet">



Accessibility: The app includes ARIA attributes and focus states for better accessibility. Test with screen readers to ensure compatibility.


Start the Development Server
npm run dev

Open http://localhost:5173 in your browser to view the app.

Build for Production (Optional)
npm run build

The built files will be in the dist directory.

Preview Production Build (Optional)
npm run preview


