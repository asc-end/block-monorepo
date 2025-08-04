# AnimatedView Component

A cross-platform animation component that uses `react-native-reanimated` for mobile and `framer-motion` for web.

## Installation

Make sure to install the required peer dependencies:

### For Web
```bash
npm install framer-motion
```

### For Mobile
```bash
npm install react-native-reanimated
```

## Usage

```tsx
import { AnimatedView } from '@blockit/cross-ui-toolkit';

// Basic fade-in animation
<AnimatedView
  animation={{
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 500
  }}
  entering
>
  <Text>Fade in content</Text>
</AnimatedView>

// Slide and scale animation
<AnimatedView
  animation={{
    from: { 
      translateX: -100, 
      scale: 0.8,
      opacity: 0 
    },
    to: { 
      translateX: 0, 
      scale: 1,
      opacity: 1 
    },
    duration: 300,
    easing: 'ease-out'
  }}
  entering
>
  <Box>Sliding content</Box>
</AnimatedView>

// Spring animation with bounce
<AnimatedView
  animation={{
    from: { scale: 0 },
    to: { scale: 1 },
    easing: 'spring',
    bounce: true
  }}
>
  <Button>Bouncy button</Button>
</AnimatedView>

// Looping animation
<AnimatedView
  animation={{
    from: { rotate: 0 },
    to: { rotate: 360 },
    duration: 2000,
    loop: true
  }}
>
  <Icon name="refresh" />
</AnimatedView>

// With gestures (web only for hover)
<AnimatedView
  animation={{
    from: { scale: 1 },
    to: { scale: 1 }
  }}
  gesture={{
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
    onTap: () => console.log('Tapped!')
  }}
>
  <Card>Interactive card</Card>
</AnimatedView>
```

## Props

### AnimatedViewProps

| Prop | Type | Description |
|------|------|-------------|
| `animation` | `AnimationConfig` | Configuration for the animation |
| `entering` | `boolean` | Trigger entering animation |
| `exiting` | `boolean` | Trigger exiting animation |
| `gesture` | `object` | Gesture handlers and animations |
| `style` | `CSSProperties \| any` | Style object |
| `className` | `string` | CSS class name |
| `children` | `ReactNode` | Child elements |

### AnimationConfig

| Property | Type | Description |
|----------|------|-------------|
| `from` | `object` | Initial animation state |
| `to` | `object` | Target animation state |
| `duration` | `number` | Animation duration in milliseconds (default: 300) |
| `delay` | `number` | Animation delay in milliseconds |
| `easing` | `string` | Animation easing: 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'spring' |
| `loop` | `boolean` | Whether to loop the animation |
| `bounce` | `boolean` | Whether to bounce when looping |

### Animation Properties (from/to)

| Property | Type | Description |
|----------|------|-------------|
| `opacity` | `number` | Opacity value (0-1) |
| `translateX` | `number` | Horizontal translation in pixels |
| `translateY` | `number` | Vertical translation in pixels |
| `scale` | `number` | Scale factor (1 = normal size) |
| `rotate` | `number` | Rotation in degrees |

### Gesture Properties

| Property | Type | Description |
|----------|------|-------------|
| `onTap` | `() => void` | Tap/click handler |
| `onDrag` | `(event) => void` | Drag handler |
| `whileHover` | `object` | Animation state while hovering (web only) |
| `whileTap` | `object` | Animation state while pressing |

## Platform Differences

- **Web**: Uses `framer-motion` with full gesture support including hover states
- **Mobile**: Uses `react-native-reanimated` with tap gestures via Pressable
- Hover animations (`whileHover`) only work on web
- Drag gestures have different implementations per platform

## Performance Tips

1. Use `entering` prop for mount animations instead of triggering on mount
2. Keep animations under 500ms for best perceived performance
3. Use `spring` easing for natural-feeling interactions
4. Avoid animating layout properties; prefer transforms (translate, scale, rotate)