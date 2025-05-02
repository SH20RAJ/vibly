# Vibly API Documentation

This document provides detailed information about the Vibly API, including methods, options, and events.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [Themes](#themes)
- [Plugins](#plugins)

## Installation

Vibly can be installed via NPM or included via CDN.

### NPM

```bash
npm install vibly
```

Then import in your JavaScript:

```js
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'vibly/dist/vibly.css';
import Vibly from 'vibly';
```

### CDN

```html
<!-- Video.js CSS -->
<link href="https://unpkg.com/video.js/dist/video-js.min.css" rel="stylesheet">
<!-- Vibly CSS -->
<link href="https://unpkg.com/vibly/dist/vibly.css" rel="stylesheet">
<!-- Video.js & Vibly JS -->
<script src="https://unpkg.com/video.js/dist/video.min.js"></script>
<script src="https://unpkg.com/vibly/dist/vibly.min.js"></script>
```

## Basic Usage

### HTML

```html
<video id="my-player" class="video-js vibly-theme-default" controls preload="auto" width="640" height="360">
  <source src="https://example.com/video.mp4" type="video/mp4">
  <track kind="captions" src="https://example.com/captions-en.vtt" srclang="en" label="English" default>
</video>
```

### JavaScript

```js
// Initialize the player
var player = videojs('my-player');
player.vibly({
  theme: 'default',
  fluid: true,
  aspectRatio: '16:9',
  playbackRates: [0.5, 1, 1.5, 2]
});
```

## Options

Vibly accepts the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `theme` | String | `'default'` | The theme to use. Available themes: `'default'`, `'city'`, `'forest'`. |
| `fluid` | Boolean | `true` | Whether to use fluid (responsive) mode. |
| `aspectRatio` | String | `'16:9'` | The aspect ratio to use in fluid mode. |
| `playbackRates` | Array | `[0.5, 1, 1.5, 2]` | The playback rates to show in the menu. |
| `plugins` | Object | `{}` | Configuration for Video.js plugins. |
| `controlBar` | Object | See below | Configuration for the control bar. |

Default `controlBar` configuration:

```js
{
  children: [
    'playToggle',
    'volumePanel',
    'currentTimeDisplay',
    'progressControl',
    'durationDisplay',
    'playbackRateMenuButton',
    'fullscreenToggle'
  ]
}
```

## Methods

Vibly provides the following methods:

### `player.vibly(options)`

Initialize the Vibly plugin with the given options.

```js
player.vibly({
  theme: 'city',
  fluid: true
});
```

### `player.vibly().setTheme(theme)`

Change the theme of the player.

```js
player.vibly().setTheme('forest');
```

### `player.vibly().getAvailableThemes()`

Get an array of available themes.

```js
const themes = player.vibly().getAvailableThemes();
// ['default', 'city', 'forest']
```

## Events

Vibly emits the following events:

| Event | Description |
|-------|-------------|
| `ready` | Fired when the player is ready. |
| `play` | Fired when the player starts playing. |
| `pause` | Fired when the player is paused. |
| `ended` | Fired when the video ends. |

Example:

```js
player.on('vibly.ready', function() {
  console.log('Vibly player is ready');
});
```

## Themes

Vibly comes with three built-in themes:

1. **Default**: A clean, modern theme with blue accents.
2. **City**: An urban theme with orange accents and square corners.
3. **Forest**: A nature-inspired theme with green accents and rounded corners.

To apply a theme, set the `theme` option or add the appropriate class to your video element:

```html
<video id="my-player" class="video-js vibly-theme-city">
  <!-- ... -->
</video>
```

## Plugins

Vibly works with all Video.js plugins. You can configure plugins through the `plugins` option:

```js
player.vibly({
  plugins: {
    hotkeys: {
      volumeStep: 0.1,
      seekStep: 5
    },
    qualitySelector: {
      displayCurrentQuality: true
    }
  }
});
```

For more information about available plugins, see the [Plugins documentation](PLUGINS.md).
