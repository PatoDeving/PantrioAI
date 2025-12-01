# Pantrio AI Design System

## Brand Color Palette

### Primary Colors
```css
Primary:       #3366FF  /* Main brand color - use for CTAs, links, highlights */
Primary Dark:  #1B3FBF  /* Darker variant for hover states */
Primary Light: #5C8CFF  /* Lighter variant for backgrounds */
```

### Accent Colors
```css
Accent 1:      #33CCFF  /* Cyan - use for secondary elements */
Accent 2:      #7A33FF  /* Purple - use for special features */
Accent 3:      #33FFE0  /* Turquoise - use for highlights */
```

### Neutral Colors
```css
Background:    #0A0A0F  /* Main background */
Surface:       #10121A  /* Cards and elevated surfaces */
Card:          #181B26  /* Card backgrounds */
Border:        #1F2433  /* Border color */
Text Primary:  #FFFFFF  /* Main text */
Text Secondary: #A5AEC1  /* Secondary/muted text */
```

## MagicButton Component

### Usage

```jsx
import MagicButton from './components/MagicButton';

// Primary button
<MagicButton onClick={handleClick} size="lg">
  Get Started →
</MagicButton>

// Secondary button
<MagicButton variant="secondary" onClick={handleClick}>
  Learn More
</MagicButton>

// Outline button
<MagicButton variant="outline" onClick={handleClick}>
  Contact Us
</MagicButton>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Button content |
| `onClick` | Function | - | Click handler |
| `variant` | string | 'primary' | 'primary', 'secondary', or 'outline' |
| `size` | string | 'md' | 'sm', 'md', or 'lg' |
| `className` | string | '' | Additional CSS classes |

### Variants

**Primary**
- Background: `#3366FF`
- Glow effect on hover
- Best for main CTAs

**Secondary**
- Background: `#33CCFF`
- Subtle glow effect
- Best for secondary actions

**Outline**
- Transparent background
- Primary border
- Glow on hover
- Best for tertiary actions

### Features

1. **Mouse-following radial gradient**: Creates a spotlight effect that follows your cursor
2. **Smooth hover animations**: Scale and lift effects on hover
3. **Premium glow effects**: Blur and shadow effects for depth
4. **Responsive sizes**: sm, md, lg variants
5. **Framer Motion integration**: Smooth, performant animations

## Tailwind Classes

### Common Patterns

```jsx
// Gradient text
<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-1 to-accent-2">
  Pantrio AI
</span>

// Card with hover effect
<div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors">
  Content
</div>

// Glow effect
<div className="shadow-glow hover:shadow-glow-lg">
  Content
</div>

// Text colors
<p className="text-text-primary">Main text</p>
<p className="text-text-secondary">Secondary text</p>
```

### Custom Animations

```css
/* Available in Tailwind */
animate-float        /* Floating up and down */
animate-pulse-slow   /* Slow pulsing */
animate-glow         /* Pulsing glow effect */
```

### Shadow Utilities

```css
shadow-glow-sm      /* Small glow */
shadow-glow         /* Medium glow */
shadow-glow-lg      /* Large glow */
shadow-glow-accent  /* Accent color glow */
```

## 3D Background Colors

Each page has a unique background with brand-aligned colors:

- **Home**: Primary Blue particles (`#3366FF`)
- **Services**: Accent 1 Cyan waves (`#33CCFF`)
- **Portfolio**: Primary Blue wireframe cubes (`#3366FF`)
- **About**: Accent 2 Purple spiral (`#7A33FF`)
- **Contact**: Accent 3 Turquoise network (`#33FFE0`)

## Best Practices

1. **Hierarchy**: Use Primary for most important actions, outlines for less important ones
2. **Consistency**: Stick to the defined color palette
3. **Accessibility**: Ensure sufficient contrast (all colors meet WCAG AA standards)
4. **Animations**: Use sparingly for key interactions only
5. **Glow effects**: Reserve for premium CTAs and important elements

## Migration Guide

### Old → New Color Mapping

```
neon-blue (#00f3ff)     → primary (#3366FF)
neon-purple (#bf00ff)   → accent-2 (#7A33FF)
dark-bg (#0a0a0a)       → bg-dark (#0A0A0F)
dark-card (#1a1a1a)     → card (#181B26)
```

### Component Updates

Replace old Button components with MagicButton:

```jsx
// Old
<Button onClick={handleClick}>Click Me</Button>

// New
<MagicButton onClick={handleClick}>Click Me</MagicButton>
```

Update color references:

```jsx
// Old
className="text-neon-blue border-neon-blue"

// New
className="text-primary border-primary"
```
