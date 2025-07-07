# Cross UI Toolkit

A cross-platform UI component library that works with both React Native and React Web.

## Installation

```bash
npm install @blockit/cross-ui-toolkit
```

## Platform-Specific Dependencies

### React Native Projects

For React Native projects, you'll need to install the following peer dependencies:

```bash
npm install react-native @react-native-community/slider react-native-gesture-handler react-native-modalize react-native-reanimated react-native-svg
```

Or add to your `package.json`:

```json
{
  "dependencies": {
    "react-native": "0.79.3",
    "@react-native-community/slider": "^4.5.7",
    "react-native-gesture-handler": "^2.25.0",
    "react-native-modalize": "^2.1.1",
    "react-native-reanimated": "~3.17.4",
    "react-native-svg": "15.11.2"
  }
}
```

### Web Projects

Web projects only need React - no additional dependencies required!

## Components

- **Alert** - Cross-platform alert component
- **Box** - Container component with styling
- **Button** - Pressable button component
- **Drawer** - Slide-out drawer component
- **Image** - Cross-platform image component
- **ScrollView** - Scrollable container
- **Slider** - Value slider component
- **Svg** - SVG graphics support
- **Text** - Text display component
- **TextInput** - Text input field

## Usage

```tsx
import { Button, Text, Box } from '@blockit/cross-ui-toolkit';

function MyComponent() {
  return (
    <Box className="p-4">
      <Text className="text-lg">Hello World</Text>
      <Button onPress={() => console.log('Pressed!')}>
        <Text>Click me</Text>
      </Button>
    </Box>
  );
}
```

## Styling

This package uses NativeWind (Tailwind CSS for React Native) for styling. Make sure to configure NativeWind in your project if using React Native.