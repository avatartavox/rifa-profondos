# UI Revamp Implementation Guide - Fiesta de la Fantasía 2026

## 📋 Overview

Your website has been redesigned with:
- ✨ **Animated Hero Section** - Modern entrance animations and enhanced visual hierarchy
- 🎪 **Floating Prize Cards** - 6 showcase prizes with floating animation + hover nudge effect
- 📱 **Fully Responsive** - Mobile (1 col), Tablet (2 col), Desktop (3-6 col)
- ♿ **Accessible** - Prefers-reduced-motion support, ARIA labels, contrast compliance
- 🎨 **Carnival Theme** - Maintains your green/purple/orange color palette

## 📁 File Structure

```
src/
├── app/
│   ├── page.tsx (UPDATED - uses new components)
│   └── components/
│       ├── AnimatedHero.tsx (NEW - hero section with animations)
│       ├── FloatingPrizeCard.tsx (NEW - individual prize card)
│       └── PrizeGrid.tsx (NEW - responsive grid layout)
├── styles/
│   └── animations.css (NEW - all floating/entrance animations)
└── globals.css (UPDATED - imports animations.css)

public/prizes/
├── botox/placeholder.svg
├── roomba/placeholder.svg
├── cash/placeholder.svg
├── giftcard/placeholder.svg
├── facial-cleaning/placeholder.svg
└── makeup/placeholder.svg
```

## 🎯 Step 1: Add Prizes to Database

You need to add 6 featured prizes to your database with these exact **isFeatured: true** and order:

```typescript
// Use your admin panel at /admin/prizes/new or add via Prisma:

const prizes = [
  {
    name: "Botox Colocation - Dermaesthetic",
    description: "Tratamiento de belleza premium valorizado en S/1400",
    value: 1400,
    isFeatured: true,
    order: 1,
    providerIg: "dermaesthetic_pe",
  },
  {
    name: "Aspiradora Robot Roomba Essential",
    description: "Robot aspirador valorizado en S/1299",
    value: 1299,
    isFeatured: true,
    order: 2,
    providerIg: "roomba_pe",
  },
  {
    name: "S/. 500 en Efectivo",
    description: "Dinero en efectivo para gastar donde quieras",
    value: 500,
    isFeatured: true,
    order: 3,
    providerIg: "colegio.nivela",
  },
  {
    name: "Giftcard de S/.390 - Boterías Negreiros",
    description: "Tarjeta de compra para tiendas premium",
    value: 390,
    isFeatured: true,
    order: 4,
    providerIg: "boteriasnegreirospy",
  },
  {
    name: "Limpieza Facial Dermatológica - Dermaesthetic",
    description: "Tratamiento facial profesional valorizado en S/250",
    value: 250,
    isFeatured: true,
    order: 5,
    providerIg: "dermaesthetic_pe",
  },
  {
    name: "Maquillaje Social de Michela Infante",
    description: "Servicio de maquillaje profesional valorizado en S/375",
    value: 375,
    isFeatured: true,
    order: 6,
    providerIg: "michela.makeup.artist",
  },
];
```

## 🖼️ Step 2: Replace Placeholder Images

### Option A: Using SVG Placeholders (Current)

Your placeholder SVGs are ready at:
- `public/prizes/botox/placeholder.svg`
- `public/prizes/roomba/placeholder.svg`
- `public/prizes/cash/placeholder.svg`
- `public/prizes/giftcard/placeholder.svg`
- `public/prizes/facial-cleaning/placeholder.svg`
- `public/prizes/makeup/placeholder.svg`

Update your database image URLs to point to these:
```
/prizes/botox/placeholder.svg
/prizes/roomba/placeholder.svg
/prizes/cash/placeholder.svg
/prizes/giftcard/placeholder.svg
/prizes/facial-cleaning/placeholder.svg
/prizes/makeup/placeholder.svg
```

### Option B: Swap with Actual PNG Images (When Ready)

When you have actual product photos (PNG with transparent background):

1. **Save your PNG files** in the appropriate folders:
   ```
   public/prizes/botox/actual.png
   public/prizes/roomba/actual.png
   public/prizes/cash/actual.png
   public/prizes/giftcard/actual.png
   public/prizes/facial-cleaning/actual.png
   public/prizes/makeup/actual.png
   ```

2. **Update database image URLs** to point to the actual images:
   ```
   /prizes/botox/actual.png
   /prizes/roomba/actual.png
   /prizes/cash/actual.png
   /prizes/giftcard/actual.png
   /prizes/facial-cleaning/actual.png
   /prizes/makeup/actual.png
   ```

3. **Recommendations for PNG images**:
   - **Resolution**: 400x300px or 800x600px (will be responsive)
   - **Background**: Transparent PNG (not white)
   - **Format**: Optimized PNG (use TinyPNG or similar)
   - **Aspect ratio**: Landscape (wider than tall)

## 🎨 Step 3: Customization Options

### Change Animation Speed

Edit `/src/styles/animations.css`:

```css
/* Slower floating (5.5s instead of 4.5s) */
.animate-float-gentle {
  animation-duration: 5.5s; /* ← change this */
}

/* Faster hover nudge (300ms instead of 400ms) */
.group:hover .group-hover\:animate-nudge {
  animation-duration: 0.3s; /* ← change this */
}
```

### Change Glow Colors

In `/src/app/components/PrizeGrid.tsx`, modify the `glowColorPattern`:

```typescript
const glowColorPattern: Array<'green' | 'purple' | 'orange'> = [
  'green',   // Botox - change to 'purple' or 'orange'
  'purple',  // Roomba - change to 'green' or 'orange'
  'orange',  // Cash - etc...
  'green',
  'purple',
  'orange',
];
```

### Change Entrance Directions

In `/src/app/components/PrizeGrid.tsx`, modify the `animationPattern`:

```typescript
const animationPattern: Array<'left' | 'right' | 'bottom'> = [
  'left',    // ← all three options: 'left', 'right', 'bottom'
  'right',
  'left',
  'right',
  'bottom',
  'bottom',
];
```

## 🧪 Step 4: Test & Verify

### Local Testing

```bash
npm run dev
# Visit http://localhost:3000
```

**Check these on all breakpoints (375px, 768px, 1024px, 1440px):**

- ✅ Hero section animates on page load
- ✅ Prize cards float gently up/down
- ✅ Hovering over cards triggers nudge up + glow effect
- ✅ Entrance animations stagger from left/right/bottom
- ✅ Images load with placeholder skeleton effect
- ✅ No layout shift during image load
- ✅ Mobile: 1 column, proper spacing
- ✅ Tablet: 2 columns
- ✅ Desktop: 3-6 columns (responsive)
- ✅ Text contrast is readable
- ✅ Animations disabled on prefers-reduced-motion

### Accessibility Check

```bash
# Test with keyboard navigation
# Tab through all interactive elements
# Verify focus rings are visible

# Test with reduced motion:
# Settings → Accessibility → Display → Reduce motion (macOS)
# Or: Settings → Ease of Access → Display → Show animations (Windows)
# Verify animations are disabled
```

## 🚀 Step 5: Deploy

Once images are in place and tested:

```bash
git add .
git commit -m "feat(ui): revamp hero with floating prize cards and carnival animations"
git push origin feat/initial-build
```

## 📊 Animation Details Reference

| Animation | Duration | Direction | Effect |
|-----------|----------|-----------|--------|
| **Entrance** | 600-800ms | Left/Right/Bottom | Staggered, bouncy easing |
| **Float Idle** | 4.5s loop | Up/Down | ±12px movement, gentle |
| **Hover Nudge** | 300ms | Up | -20px lift, scaleUp 1.05 |
| **Hover Glow** | Instant + pulse | - | Glow 20→40px on hover |

## 🎯 Next Steps

1. **Add 6 prizes** to database with images (use placeholders for now)
2. **Test on localhost** across all devices
3. **Provide actual PNG images** when ready (400x300px, transparent bg)
4. **Swap image URLs** in database
5. **Deploy** when satisfied

## 🆘 Troubleshooting

### Images not showing?
- Check image URLs in database match `/prizes/{category}/{filename}`
- Verify images exist in `public/prizes/` folder
- Open browser DevTools Network tab to see if images 404

### Animations stuttering?
- Check browser DevTools Performance tab
- Images should be optimized (<200KB each)
- Disable browser extensions that modify CSS

### Mobile layout broken?
- Check viewport meta tag in `src/app/layout.tsx`
- Should be: `<meta name="viewport" content="width=device-width, initial-scale=1" />`

### Hover effects not working?
- These use CSS `:hover` (desktop only)
- Mobile uses tap/tap-hold, which is different
- Nudge animation only applies on desktop hover

## 📞 Support

If you need to:
- **Add more prize cards** beyond 6: Edit `animationPattern` and `glowColorPattern` in PrizeGrid.tsx
- **Change colors**: Modify `.animate-delay-*` classes or use different glow colors
- **Add new sections**: Build new components following the same pattern (AnimatedHero pattern)
- **Modify text**: Edit content in AnimatedHero.tsx directly

---

**Status**: ✅ Ready to integrate prize data and images

**Last updated**: 2026-07-12
