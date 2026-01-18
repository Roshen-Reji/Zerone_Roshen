# Event Hub

A modern, interactive event management platform with stunning visual effects and smooth animations.

## Features

- 🎨 **Interactive 3D Background** - Shader-based animated background
- 🖱️ **Slinky Cursor Effect** - Elastic cursor trail animation
- 📅 **Event Cards** - 3D transforming event cards
- 🎬 **Events Scanner** - Unique card scanning effect with ASCII art
- 📍 **Location Page** - Venue information and directions
- 💬 **Contact Page** - Social media grid with hover effects
- 📱 **Responsive Design** - Works on all device sizes

## Project Structure

```
event-hub/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navigation.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── EventCard.jsx
│   │   ├── backgrounds/
│   │   │   ├── ThreeBackground.jsx
│   │   │   └── SlinkyCursor.jsx
│   │   └── icons/
│   │       └── MapPin.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── EventsPage/
│   │   │   ├── index.jsx
│   │   │   ├── CardStreamController.js
│   │   │   ├── ParticleSystem.js
│   │   │   ├── ParticleScanner.js
│   │   │   └── styles.css
│   │   ├── TechnicalPage.jsx
│   │   ├── LocationPage.jsx
│   │   └── ContactPage/
│   │       ├── index.jsx
│   │       └── styles.css
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── index.jsx
├── package.json
└── README.md
```

## Installation

### 1. Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### 2. Create React App

```bash
npx create-react-app event-hub
cd event-hub
```

### 3. Install Dependencies

```bash
npm install three gsap
```

### 4. Replace Files

Copy all the provided files into your project following the structure above.

### 5. Run Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Adding New Pages

### Step 1: Create Page Component

Create a new file in `src/pages/`:

```jsx
// src/pages/MyNewPage.jsx
import React from 'react';

const MyNewPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-5xl text-white">My New Page</h1>
    </div>
  );
};

export default MyNewPage;
```

### Step 2: Import in App.jsx

```jsx
import MyNewPage from './pages/MyNewPage';
```

### Step 3: Add to renderPage Function

```jsx
const renderPage = () => {
  switch (currentPage) {
    case 'home': return <HomePage onNavigate={setCurrentPage} />;
    case 'mynewpage': return <MyNewPage />;
    // ... other cases
  }
};
```

### Step 4: Add to Navigation

Update `src/components/common/Navigation.jsx`:

```jsx
const pages = [
  { id: 'home', label: 'Home' },
  { id: 'mynewpage', label: 'My New Page' },
  // ... other pages
];
```

## Technologies Used

- **React** - UI framework
- **Three.js** - 3D graphics and shaders
- **GSAP** - Animation library
- **Tailwind CSS** - Utility-first CSS framework

## File Descriptions

### Components

- **Navigation.jsx** - Bottom navigation bar with page switching
- **LoadingScreen.jsx** - Initial loading animation
- **EventCard.jsx** - Reusable 3D card component
- **ThreeBackground.jsx** - Animated shader background
- **SlinkyCursor.jsx** - Interactive cursor trail effect

### Pages

- **HomePage.jsx** - Landing page with event cards and about section
- **EventsPage/** - Complex page with card scanner effect
- **TechnicalPage.jsx** - Technical requirements page
- **LocationPage.jsx** - Venue location and directions
- **ContactPage/** - Social media grid with hover effects

### EventsPage Components

- **CardStreamController.js** - Manages card scrolling and interactions
- **ParticleSystem.js** - Three.js particle background
- **ParticleScanner.js** - Scanner beam effect with particles

## Customization

### Colors

Edit colors in:
- `src/components/backgrounds/ThreeBackground.jsx` - Background gradient
- `src/styles/global.css` - Global styles
- Individual page components

### Event Cards

Modify events in `src/pages/HomePage.jsx`:

```jsx
const events = [
  {
    id: 1,
    title: "Your Event",
    description: "Your description",
    image: "🎉"
  },
  // Add more events
];
```

### Social Links

Update links in `src/pages/ContactPage/index.jsx`:

```jsx
<div className="sg-card">
  <svg onClick={() => window.open('YOUR_LINK', '_blank')}>
    {/* SVG code */}
  </svg>
</div>
```

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.