# Vibly Theming Guide

This document provides information about Vibly's theming system, including built-in themes and how to create custom themes.

## Built-in Themes

Vibly comes with three built-in themes:

1. **Default**: A clean, modern theme with blue accents.
2. **City**: An urban theme with orange accents and square corners.
3. **Forest**: A nature-inspired theme with green accents and rounded corners.

## Using Built-in Themes

You can apply a built-in theme in two ways:

### 1. Using the `theme` option

```js
player.vibly({
  theme: 'city' // 'default', 'city', or 'forest'
});
```

### 2. Using CSS classes

```html
<video id="my-player" class="video-js vibly-theme-forest">
  <!-- ... -->
</video>
```

## Creating Custom Themes

You can create custom themes by overriding CSS variables or writing your own CSS.

### CSS Variables

Vibly uses CSS variables for theming. You can override these variables to create your own theme:

```css
:root {
  --vibly-color-primary: #ff5722; /* Primary color */
  --vibly-color-secondary: #03a9f4; /* Secondary color */
  --vibly-color-background: rgba(33, 33, 33, 0.8); /* Control bar background */
  --vibly-color-text: #ffffff; /* Text color */
  --vibly-font-family: 'Roboto', Arial, sans-serif; /* Font family */
  --vibly-border-radius: 4px; /* Border radius */
  --vibly-control-spacing: 10px; /* Control spacing */
}
```

### Custom Theme Class

You can create a custom theme by defining a new CSS class:

```css
.vibly-theme-custom {
  --vibly-color-primary: #9c27b0;
  --vibly-color-secondary: #e91e63;
  --vibly-color-background: rgba(0, 0, 0, 0.8);
  --vibly-color-text: #ffffff;
  --vibly-font-family: 'Montserrat', sans-serif;
  --vibly-border-radius: 8px;
  
  .vjs-control-bar {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
  }
  
  .vjs-big-play-button {
    background-color: rgba(156, 39, 176, 0.8);
    border-color: #ffffff;
    
    &:hover {
      background-color: rgba(156, 39, 176, 1);
    }
  }
}
```

Then apply the class to your video element:

```html
<video id="my-player" class="video-js vibly-theme-custom">
  <!-- ... -->
</video>
```

## Theme Components

The following components can be styled in a theme:

- **Control Bar**: The bar containing playback controls.
- **Progress Bar**: The progress/seek bar.
- **Big Play Button**: The large play button shown before playback starts.
- **Volume Control**: The volume slider and mute button.
- **Menu**: Dropdown menus (e.g., playback rate, quality selector).
- **Captions**: Subtitle/caption display.

## Using Video.js Themes

Vibly is compatible with Video.js themes. You can use themes from the [@videojs/themes](https://github.com/videojs/themes) package:

```html
<!-- Video.js CSS -->
<link href="https://unpkg.com/video.js/dist/video-js.min.css" rel="stylesheet">
<!-- Video.js Theme (e.g., City) -->
<link href="https://unpkg.com/@videojs/themes@1/dist/city/index.css" rel="stylesheet">
```

## Responsive Design

Vibly themes are responsive by default. The control bar adapts to different screen sizes, hiding less important controls on smaller screens.

You can customize the responsive behavior by adding media queries to your theme:

```css
@media (max-width: 768px) {
  .vibly-theme-custom {
    .vjs-time-control {
      display: none;
    }
    
    .vjs-control-bar {
      padding: 0 5px;
    }
  }
}
```
