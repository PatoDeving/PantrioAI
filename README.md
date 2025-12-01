# Pantrio AI - Modern React Website

A modern, professional website built with React, Tailwind CSS, Framer Motion, and Three.js for Pantrio AI.

## Features

- **Modern Tech Stack**: React 18, Tailwind CSS v3, Framer Motion, Three.js
- **3D Interactive Backgrounds**: Animated particle systems and dynamic effects
- **Smooth Animations**: Framer Motion for page transitions and interactions
- **Responsive Design**: Mobile-first approach with fully responsive layout
- **Modern UI**: Dark theme with cyan/purple neon accents
- **Functional Chatbot**: AI assistant with EmailJS integration
- **Contact Form**: Working contact form with email integration
- **Multiple Pages**: Home, Portfolio, About, Contact

## Live Features

✅ **Fully Functional Chatbot**
- Interactive conversation flow
- Schedule calls or ask questions
- EmailJS integration for inquiries

✅ **Working Contact Form**
- Form validation
- Email notifications
- Success/error feedback

✅ **Professional Design**
- Custom logo and branding
- Multiple 3D backgrounds
- Smooth page transitions

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure EmailJS

Update the following files with your EmailJS credentials:
- `src/components/Chatbot.jsx` (lines 190-193)
- `src/pages/Contact.jsx` (lines 34-37)

Current service ID: `service_p579v5u`

### Step 3: Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### Step 4: Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## Project Structure

```
PantrioAI/
├── public/
│   ├── index.html
│   ├── favicon-32x32.png
│   ├── logo.svg
│   ├── logo192.png
│   └── logo512.png
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── MagicButton.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Chatbot.jsx           # Functional chatbot
│   │   ├── SimpleStarfield.jsx
│   │   ├── NetworkBackground.jsx
│   │   ├── SpiralBackground.jsx
│   │   ├── GeometricBackground.jsx
│   │   └── WaveBackground.jsx
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── Portfolio.jsx         # Projects showcase
│   │   ├── About.jsx             # Mission & Vision
│   │   └── Contact.jsx           # Working contact form
│   ├── App.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Technologies Used

- **React 18** - UI library
- **React Router DOM v6** - Client-side routing
- **Tailwind CSS v3** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helpers for React Three Fiber
- **EmailJS** - Client-side email service

## Deployment

### Build the Project

```bash
npm run build
```

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io/pantrio-ai",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

npm run deploy
```

## Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#3366FF',
  'accent-1': '#00f3ff',
  'accent-2': '#bf00ff',
  'dark-bg': '#0a0a0a',
  'dark-card': '#1a1a1a',
}
```

### Content

- Home page: `src/pages/Home.jsx`
- Portfolio: `src/pages/Portfolio.jsx`
- About: `src/pages/About.jsx`
- Contact info: `src/pages/Contact.jsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The site includes multiple 3D backgrounds which are GPU-intensive. For optimal performance:
- Backgrounds are optimized for 60fps
- Particle counts are balanced for performance
- Mobile-responsive with adaptive rendering

## Contact

**Email**: info@pantrioai.com
**Phone**: +52 (446) 242-1428
**Location**: Interlomas, Edo.Mex.

## License

Copyright 2024 Pantrio AI. All rights reserved.
