# Hero Section - Aceternity UI Inspired Design

## Overview
The home page features a full-screen hero section inspired by Aceternity UI with modern animations, strong visual hierarchy, and a focus on clarity and trust.

## Key Features

### 1. **Visual Hierarchy**
- **Badge**: Pulsing indicator with "Empowering learners worldwide"
- **Two-Line Headline**: 
  - Line 1: "Transform Your" (white, bold)
  - Line 2: "Learning Journey" (gradient: blue → cyan → purple)
- **Subtitle**: Clear value proposition in light slate
- **Primary CTA**: "Get Started Now" with prominent glow effect
- **Secondary CTA**: "Browse Classes" with subtle styling
- **Trust Indicators**: Stats section at bottom (years, students, instructors, success rate)

### 2. **Background Design**
- **Gradient Base**: Dark gradient from slate-950 → blue-950 → slate-900
- **Radial Overlays**: Subtle blue and purple radial gradients
- **Grid Pattern**: Semi-transparent grid overlay
- **Floating Orbs**: Two animated blur orbs (blue and purple)

### 3. **Animations**

#### Entrance Animations
All content animates in with a smooth fade-in-up effect:
- Badge: 0ms delay
- Headline: 100ms delay
- Subtitle: 200ms delay
- CTA buttons: 300ms delay
- Trust indicators: 400ms delay

#### Interactive Animations
- **Primary CTA Hover**: Scale up, translate up, blue glow effect (0-40px blur)
- **Secondary CTA Hover**: Scale up, translate up, subtle glow
- **Floating Orbs**: Continuous 8s/10s float animations
- **Scroll Indicator**: Bouncing animation at bottom

### 4. **Button Design**
- **Rounded**: Fully rounded (rounded-full)
- **Gradient Primary**: Blue to cyan gradient
- **Glow Effect**: On hover, buttons emit a colored glow using box-shadow
- **Smooth Transitions**: 300ms duration for all hover states
- **Scale & Transform**: Buttons grow and lift on hover

### 5. **Responsive Design**
- Text sizes scale appropriately across breakpoints:
  - Mobile: 5xl
  - Small: 6xl
  - Medium: 7xl
  - Large: 8xl
- Buttons stack vertically on mobile, horizontal on desktop
- Trust indicators: 2 columns on mobile, 4 on desktop

### 6. **Navigation Integration**
The navbar adapts to the hero section:
- **Transparent** on home page (dark text → white text)
- **Backdrop blur** when scrolled
- **Color transitions** for logo and menu items
- **Glassmorphism** effect on scroll

## CSS Animations

All animations are defined in `src/index.css`:

```css
@keyframes fadeInUp - Smooth entrance from below
@keyframes float - Gentle floating motion for orbs
@keyframes floatDelayed - Delayed floating for second orb
@keyframes scrollIndicator - Bouncing scroll indicator
```

## Color Palette
- **Primary**: Blue (blue-600, blue-500, blue-400)
- **Secondary**: Cyan (cyan-500, cyan-400, cyan-300)
- **Accent**: Purple (purple-500, purple-400)
- **Background**: Slate (slate-950, slate-900)
- **Text**: White, slate-300, slate-400

## Accessibility
- High contrast text on dark background
- Clear focus states on interactive elements
- Semantic HTML structure
- Screen reader friendly

## Performance
- CSS animations (hardware accelerated)
- Optimized blur effects
- Lazy loading ready
- Minimal JavaScript overhead

## Trust Elements
The hero includes trust-building elements:
- Live status indicator (pulsing badge)
- Social proof metrics (10+ years, 5000+ students)
- Clear value proposition
- Professional design aesthetic

## Single Primary Action
The design emphasizes **"Get Started Now"** as the primary action:
- More prominent styling
- Stronger glow effect
- Positioned first
- Gradient background
- Clear call to action

This creates a clear conversion funnel and reduces decision fatigue for users.
