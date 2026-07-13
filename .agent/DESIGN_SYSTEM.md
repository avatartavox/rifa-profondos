# Fiesta de la Fantasía 2026 - UI Revamp Design System

## Vision
Transform the landing page into a high-energy, visually striking hero experience featuring animated floating prize cards with carnival/fantasy aesthetics. Keep content structure intact while dramatically elevating visual impact.

## Color Palette (Existing - Maintained)
```
Primary Green:    #56E52A (carnival-green) - Neon, energetic
Primary Purple:   #A020F0 (carnival-purple) - Royal, mysterious  
Accent Orange:    #FF5722 (carnival-orange) - Warm, urgent
Dark Background:  #0a0a0a - Deep black, cinematic
Light Foreground: #f4f4f5 - Off-white, high contrast
```

## Typography
- **Headings**: Geist Sans, Bold (900), uppercase tracking
- **Body**: Geist Sans, Regular
- **CTAs**: Bold, uppercase
- **Prize Cards**: Medium weight, sentence case

## Layout Strategy
```
Hero Section (80-90vh)
├── Background pattern (carnival/circus theme)
├── Title + Subtitle (center-top)
├── Date/Cost info cards (center-middle)
├── Floating Prize Grid (center, dynamic)
└── CTA Button (center-bottom)

Featured Prizes Preview (existing, after hero)
└── 3-card grid with updated styling
```

## Animation Library

### Floating Prize Cards
- **Entrance**: Stagger animation from sides (left/right) + bottom
  - Duration: 600-800ms per card
  - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (bounce)
  
- **Idle State**: Gentle floating up/down
  - Duration: 4-5s per cycle
  - Y-axis movement: ±12px
  - Easing: ease-in-out
  
- **Hover State**: Nudge effect
  - Scale: 1.05
  - Y-lift: -20px
  - Duration: 300ms
  - Add glow effect

### Background Pattern
- Subtle animate-pulse on carnival mask pattern
- Opacity: 10-15%
- Prevents visual staleness

## Prize Card Specs

### Visual Design
```
┌─────────────────────┐
│  Image Container    │  400x300px (responsive)
│  (PNG + transparent)│  Rounded corners
├─────────────────────┤
│  Prize Name         │  Bold, left-aligned
│  Provider Info      │  Gray, smaller text
│  "Destacado" Label  │  Colored accent
└─────────────────────┘
```

### States
- **Default**: Subtle shadow, gentle glow
- **Hover**: Scale up, enhanced glow, nudge animation
- **Mobile**: Single column, full-width cards

## Image Placeholder Strategy
Six placeholder categories matching prizes:
1. Botox - Medical/Beauty icon placeholder
2. Roomba - Robot/Home icon placeholder
3. Cash - Money/Wallet icon placeholder
4. Giftcard - Card/Gift icon placeholder
5. Facial Cleaning - Skincare/Face icon placeholder
6. Makeup - Cosmetics/Palette icon placeholder

**Format**: PNG with transparent background, 400x300px base
**Location**: `/public/prizes/{prize-id}/placeholder.png` → `/public/prizes/{prize-id}/actual.png`

## Responsive Breakpoints
- Mobile: 375px (1 column)
- Tablet: 768px (2 columns)
- Desktop: 1024px+ (3-6 columns, based on space)
- Hero height: 80vh minimum

## Accessibility
- ✅ ARIA labels on animated elements
- ✅ `prefers-reduced-motion` support (disable animations)
- ✅ Color contrast ratio 4.5:1+ on all text
- ✅ Focus states visible on all interactive elements
- ✅ Alt text on prize images

## File Structure
```
src/
├── app/
│   ├── page.tsx (updated hero + prize grid)
│   └── components/
│       ├── FloatingPrizeCard.tsx (new)
│       ├── AnimatedHero.tsx (new)
│       └── PrizeGrid.tsx (new)
├── styles/
│   └── animations.css (new - floating, entrance, nudge)
└── types/
    └── prizes.ts (new - type definitions)

public/
├── prizes/
│   ├── botox/
│   │   ├── placeholder.png
│   │   └── actual.png (user provides)
│   ├── roomba/
│   ├── cash/
│   ├── giftcard/
│   ├── facial-cleaning/
│   └── makeup/
└── images/
    └── background-carnival.svg (pattern, optional upgrade)
```

## Implementation Priorities
1. **Phase 1**: Create FloatingPrizeCard component + animations
2. **Phase 2**: Create PrizeGrid with responsive layout
3. **Phase 3**: Update hero section with new animations
4. **Phase 4**: Create placeholder system + documentation
5. **Phase 5**: Verify animations on mobile + tablet

## Performance Considerations
- Use `will-change: transform` on floating cards
- GPU-accelerated animations (transform/opacity only)
- Lazy load prize images with next/image
- Skeleton loader during image load
- Prefers-reduced-motion media query override

## Testing Checklist
- [ ] Mobile: 375px viewport, no layout shifts
- [ ] Tablet: 768px viewport, 2-column grid
- [ ] Desktop: 1024px+, 3-6 column responsive
- [ ] Animations: Smooth, no jank, <60fps
- [ ] Hover: Cards nudge, glow intensifies
- [ ] Reduced motion: Animations disabled
- [ ] Contrast: All text ≥ 4.5:1
- [ ] Images: Load with placeholders, swap to actual
