# Holographic Trading Card Components

A modular, componentized holographic trading card system that makes it easy to customize and add images while maintaining the stunning holographic effects.

## Component Structure

```
holographic-card/
├── HolographicCard.tsx      # Main wrapper component
├── CardBackground.tsx       # Base background layer
├── HolographicOverlay.tsx   # Interactive holographic gradient
├── AnimatedGradient.tsx    # Animated background gradient
├── LightReflection.tsx      # Light reflection effect
├── CardShine.tsx           # Shine effect overlay
├── CardBorder.tsx          # Border glow effect
├── CardContent.tsx         # Content area (supports images)
├── useMouseTracking.ts     # Mouse tracking hook
├── types.ts                # TypeScript types
└── index.ts                # Exports
```

## Usage

### Basic Usage with Content Props

```tsx
import { HolographicCard } from "@/components/holographic-card";

<HolographicCard
  content={{
    topSection: <div>Top Content</div>,
    middleSection: <div>Middle Content</div>,
    bottomSection: <div>Bottom Content</div>,
  }}
/>
```

### With Image

```tsx
<HolographicCard
  content={{
    imageUrl: "/path-to-image.jpg",
    imageAlt: "Card image",
    topSection: <div>Card Title</div>,
    bottomSection: <div>Card Info</div>,
  }}
/>
```

### Custom Size

```tsx
<HolographicCard
  width={500}
  height={700}
  content={{ ... }}
/>
```

### Custom Background Gradient

```tsx
<HolographicCard
  backgroundGradient={{
    from: "from-blue-900",
    via: "via-indigo-900",
    to: "to-purple-900",
  }}
  content={{ ... }}
/>
```

### Using Individual Components

You can also use the individual layer components for maximum customization:

```tsx
import {
  CardBackground,
  HolographicOverlay,
  AnimatedGradient,
  LightReflection,
  CardShine,
  CardBorder,
  CardContent,
  useMouseTracking,
} from "@/components/holographic-card";

function CustomCard() {
  const { cardRef, mousePosition, isHovering } = useMouseTracking();
  
  return (
    <div ref={cardRef}>
      <CardBackground />
      <HolographicOverlay mousePosition={mousePosition} isHovering={isHovering} />
      {/* ... other layers */}
    </div>
  );
}
```

## Props

### HolographicCard

- `width?: number` - Card width in pixels (default: 400)
- `height?: number` - Card height in pixels (default: 600)
- `className?: string` - Additional CSS classes
- `content?: CardContentProps` - Content configuration
- `backgroundGradient?: { from?, via?, to? }` - Custom background gradient colors
- `children?: React.ReactNode` - Custom content (overrides content prop)

### CardContentProps

- `topSection?: React.ReactNode` - Content for top section
- `middleSection?: React.ReactNode` - Content for middle section (or use imageUrl)
- `bottomSection?: React.ReactNode` - Content for bottom section
- `imageUrl?: string` - Image URL (local or external)
- `imageAlt?: string` - Image alt text
- `className?: string` - Additional CSS classes

## Features

- ✅ **Modular Architecture** - Each layer is a separate component
- ✅ **Easy Image Integration** - Simply pass `imageUrl` prop
- ✅ **Customizable** - All layers can be customized or replaced
- ✅ **TypeScript Support** - Full type safety
- ✅ **Holographic Effects** - All effects preserved and working
- ✅ **Mouse Tracking** - Interactive parallax effects
- ✅ **Responsive** - Easy to make responsive with custom sizes

## Examples

See `app/page.tsx` for a complete example.

