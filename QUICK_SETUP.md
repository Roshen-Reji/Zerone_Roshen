# Quick Setup Guide

## 🚀 Fast Track Installation

### Option 1: Fresh Install (Recommended)

```bash
# 1. Create new React app
npx create-react-app event-hub
cd event-hub

# 2. Install dependencies
npm install three gsap

# 3. Create folder structure
mkdir -p src/components/common src/components/backgrounds src/components/icons
mkdir -p src/pages/EventsPage src/pages/ContactPage
mkdir -p src/styles

# 4. Copy files from artifacts into folders
# See file list below

# 5. Start development server
npm start
```

### Option 2: Existing Project

```bash
# 1. Navigate to your project
cd your-project

# 2. Install dependencies if not already installed
npm install three gsap

# 3. Create folders and copy files
# Follow the folder structure below
```

## 📁 File Checklist

Copy these files from the artifacts:

### Root Files
- [ ] `package.json` → Root directory
- [ ] `README.md` → Root directory

### Public Folder
- [ ] `public/index.html` → Replace existing

### Src Folder
- [ ] `src/index.jsx` → Replace existing
- [ ] `src/App.jsx` → Replace existing

### Components
- [ ] `src/components/common/Navigation.jsx`
- [ ] `src/components/common/LoadingScreen.jsx`
- [ ] `src/components/common/EventCard.jsx`
- [ ] `src/components/backgrounds/ThreeBackground.jsx`
- [ ] `src/components/backgrounds/SlinkyCursor.jsx`
- [ ] `src/components/icons/MapPin.jsx`

### Pages
- [ ] `src/pages/HomePage.jsx`
- [ ] `src/pages/TechnicalPage.jsx`
- [ ] `src/pages/LocationPage.jsx`

### EventsPage (Complex Page)
- [ ] `src/pages/EventsPage/index.jsx`
- [ ] `src/pages/EventsPage/CardStreamController.js`
- [ ] `src/pages/EventsPage/ParticleSystem.js`
- [ ] `src/pages/EventsPage/ParticleScanner.js`
- [ ] `src/pages/EventsPage/styles.css`

### ContactPage
- [ ] `src/pages/ContactPage/index.jsx`
- [ ] `src/pages/ContactPage/styles.css`

### Styles
- [ ] `src/styles/global.css`

## ⚠️ Important Notes

### CDN Scripts in index.html
The `public/index.html` file includes these CDN scripts:
- Tailwind CSS
- Three.js
- GSAP

**Note:** In production, you might want to install Tailwind CSS properly:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then update `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

And update `src/index.css` to include:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### File Imports
Make sure all imports in the files use the correct paths based on your folder structure.

### Three.js and GSAP
The components access Three.js and GSAP via `window.THREE` and `window.gsap` because they're loaded via CDN in the HTML. If you prefer npm packages, you'll need to:

1. Remove CDN scripts from `index.html`
2. Update imports in components:
   ```jsx
   import * as THREE from 'three';
   import gsap from 'gsap';
   ```

## 🧪 Testing

After copying all files:

```bash
# Start the dev server
npm start

# The app should open at http://localhost:3000
# Check browser console for any errors
```

## 🔧 Common Issues

### Issue: Module not found
**Solution:** Check that all files are in the correct folders and imports match the structure.

### Issue: Three.js or GSAP not working
**Solution:** Make sure the CDN scripts are in `public/index.html` or install via npm.

### Issue: Styles not applying
**Solution:** 
1. Check that CSS files are imported in the components
2. Verify Tailwind CSS CDN is loaded
3. Clear cache and restart dev server

### Issue: Blank page
**Solution:**
1. Check browser console for errors
2. Verify all imports are correct
3. Make sure `src/index.jsx` renders `<App />`

## 📝 Next Steps

After successful setup:

1. **Customize content** - Update event data, social links, etc.
2. **Add new pages** - Follow the guide in README.md
3. **Modify styles** - Change colors, fonts, animations
4. **Deploy** - Build and deploy to your hosting service

## 🎯 Quick Test

After running `npm start`, you should see:

1. ✅ Loading screen (3-5 seconds)
2. ✅ Animated background
3. ✅ Slinky cursor effect
4. ✅ Bottom navigation
5. ✅ Event cards on home page
6. ✅ All navigation buttons work

If any of these don't work, check the Common Issues section above.

## 💡 Pro Tips

1. **Keep components small** - If a component gets too large, split it
2. **Use the folder structure** - Complex pages get their own folders
3. **CSS organization** - Keep styles close to components
4. **Git commits** - Commit after each major feature
5. **Test responsiveness** - Check on mobile, tablet, desktop

## 📞 Need Help?

- Check README.md for detailed documentation
- Review individual component files
- Check browser console for errors
- Verify all dependencies are installed

Happy coding! 🎉