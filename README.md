# Pantrio AI - Modern React Website

A modern, techy website built with React, Tailwind CSS, Framer Motion, and Three.js for Pantrio AI.

## Features

- **Modern Tech Stack**: React 18, Tailwind CSS v3, Framer Motion, Three.js
- **3D Interactive Background**: Animated particle system using React Three Fiber
- **Smooth Animations**: Framer Motion for buttons, cards, and page transitions
- **Responsive Design**: Mobile-first approach with responsive navigation
- **Modern UI**: Dark theme with neon blue/purple accents
- **Multiple Pages**: Home, Services, Portfolio, About, Contact
- **Chatbot Placeholder**: Floating chatbot button (ready for integration)

## Project Structure

```
PantrioAI/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Button.jsx          # Animated button with Framer Motion
│   │   ├── Card.jsx            # Animated card component
│   │   ├── Navbar.jsx          # Responsive navigation bar
│   │   ├── Footer.jsx          # Footer with social links
│   │   ├── Chatbot.jsx         # Floating chatbot (placeholder)
│   │   └── HeroBackground.jsx  # 3D particle background
│   ├── pages/
│   │   ├── Home.jsx            # Landing page with hero section
│   │   ├── Services.jsx        # Services showcase
│   │   ├── Portfolio.jsx       # Project portfolio
│   │   ├── About.jsx           # About & team page
│   │   └── Contact.jsx         # Contact form
│   ├── App.js                  # Main app with routing
│   ├── index.js                # Entry point
│   └── index.css               # Global styles & Tailwind imports
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router DOM (for navigation)
- Tailwind CSS (for styling)
- Framer Motion (for animations)
- Three.js, React Three Fiber & Drei (for 3D graphics)

### Step 2: Start Development Server

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

### Step 3: Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Customization Guide

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  'neon-blue': '#00f3ff',      // Change primary color
  'neon-purple': '#bf00ff',    // Change secondary color
  'dark-bg': '#0a0a0a',        // Change background
  'dark-card': '#1a1a1a',      // Change card background
}
```

### 3D Background

Customize the particle effect in `src/components/HeroBackground.jsx`:
- Particle count: Change the array size in `inSphere(new Float32Array(5000), ...)`
- Particle color: Modify the `color` prop in `PointMaterial`
- Rotation speed: Adjust the delta division in `useFrame`

### Animations

Button and Card hover effects can be customized in their respective component files:
- `src/components/Button.jsx` - Button animations
- `src/components/Card.jsx` - Card animations

Modify the `whileHover` and `transition` props from Framer Motion.

### Content

Update content in the page files:
- `src/pages/Home.jsx` - Hero text, stats
- `src/pages/Services.jsx` - Service offerings
- `src/pages/Portfolio.jsx` - Project showcases
- `src/pages/About.jsx` - Team members, company story
- `src/pages/Contact.jsx` - Contact information

### Chatbot Integration

The chatbot is currently a placeholder. To integrate a real chatbot:

1. Open `src/components/Chatbot.jsx`
2. Add your chatbot API integration
3. Replace the placeholder UI with your chat implementation
4. Enable the disabled input and send button

## Available Scripts

- `npm start` - Runs development server
- `npm run build` - Creates production build
- `npm test` - Runs tests
- `npm run eject` - Ejects from Create React App (not recommended)

## Technologies Used

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helpers for React Three Fiber

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. The 3D background is GPU-intensive. For better performance on low-end devices, consider:
   - Reducing particle count in `HeroBackground.jsx`
   - Conditionally rendering based on device capabilities

2. Images: Add actual images to replace emoji placeholders in production

3. Lazy loading: Consider code-splitting for better initial load time

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the build folder to Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io/pantrio-ai",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

npm run deploy
```

## Next Steps

1. Replace placeholder contact information with real data
2. Integrate actual chatbot service
3. Add real project images to Portfolio
4. Add team photos to About page
5. Connect contact form to backend/email service
6. Add Google Analytics or similar
7. Implement SEO optimizations
8. Add a blog section (optional)

## Support

For issues or questions, contact: support@pantrioai.com

## License

Copyright 2024 Pantrio AI. All rights reserved.
