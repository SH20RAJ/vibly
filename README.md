<div align="center">
  <img src="https://via.placeholder.com/200x200.png?text=Vibly" alt="Vibly Logo" width="200" height="200">
  <h1>Vibly</h1>
  <p>A modern, feature-rich, customizable Video.js player</p>
  
  <p>
    <a href="https://www.npmjs.com/package/vibly"><img src="https://img.shields.io/npm/v/vibly?style=flat-square" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/vibly"><img src="https://img.shields.io/npm/dm/vibly?style=flat-square" alt="npm downloads"></a>
    <a href="https://bundlephobia.com/package/vibly"><img src="https://img.shields.io/bundlephobia/minzip/vibly?style=flat-square" alt="Bundle Size"></a>
    <a href="https://github.com/SH20RAJ/vibly/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/vibly?style=flat-square" alt="License: MIT"></a>
    <a href="https://github.com/SH20RAJ/vibly/actions"><img src="https://img.shields.io/github/workflow/status/SH20RAJ/vibly/CI?style=flat-square" alt="Build Status"></a>
  </p>
</div>

## ✨ Features

Vibly is a **fully customizable** video player built on top of [Video.js](https://videojs.com) with enhanced features and a modern UI. It's designed to be easy to use while providing powerful customization options.

- **📱 Responsive Design** - Fluid layout that adapts to any screen size
- **🎨 Customizable Themes** - Multiple built-in themes with easy CSS customization
- **📺 Streaming Support** - Native HLS and DASH streaming with fallbacks
- **🔌 Plugin Ecosystem** - Works with all Video.js plugins
- **♿ Accessibility** - ARIA attributes and keyboard navigation
- **🌐 Internationalization** - Multi-language support
- **📊 Analytics Integration** - Track video engagement
- **🔄 Framework Compatibility** - Works with React, Vue, Angular, and more
- **📱 Mobile-Friendly** - Touch controls and fullscreen on mobile devices
- **🔍 Quality Selection** - Automatic and manual quality switching for adaptive streams
- **⚡ Performance Optimized** - Lightweight and fast loading

## 🚀 Quick Start

### Installation

#### NPM

```bash
npm install vibly video.js
```

```js
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'vibly/dist/vibly.css';
import Vibly from 'vibly';
```

#### CDN

```html
<!-- Video.js CSS -->
<link href="https://unpkg.com/video.js/dist/video-js.min.css" rel="stylesheet">
<!-- Vibly CSS -->
<link href="https://unpkg.com/vibly/dist/vibly.css" rel="stylesheet">
<!-- Video.js & Vibly JS -->
<script src="https://unpkg.com/video.js/dist/video.min.js"></script>
<script src="https://unpkg.com/vibly/dist/vibly.min.js"></script>
```

### Basic Usage

```html
<video id="my-player" class="video-js vibly-theme-default" controls>
  <source src="https://example.com/video.mp4" type="video/mp4">
  <track kind="captions" src="https://example.com/captions-en.vtt" srclang="en" label="English" default>
</video>

<script>
  const player = videojs('my-player');
  player.vibly({
    theme: 'default',
    fluid: true,
    aspectRatio: '16:9',
    playbackRates: [0.5, 1, 1.5, 2]
  });
</script>
```

## 🎨 Themes

Vibly comes with multiple built-in themes:

- **Default** - A clean, modern theme with blue accents
- **City** - An urban theme with orange accents and square corners
- **Forest** - A nature-inspired theme with green accents and rounded corners

To apply a theme:

```js
player.vibly({
  theme: 'city' // 'default', 'city', or 'forest'
});
```

Or with CSS classes:

```html
<video id="my-player" class="video-js vibly-theme-forest">
  <!-- ... -->
</video>
```

## 🔧 Configuration

Vibly accepts all Video.js options plus additional options:

```js
player.vibly({
  // Theme options
  theme: 'default',
  
  // Video.js options
  fluid: true,
  aspectRatio: '16:9',
  autoplay: false,
  muted: false,
  loop: false,
  preload: 'auto',
  controls: true,
  
  // Playback options
  playbackRates: [0.5, 1, 1.5, 2],
  
  // Streaming options
  hls: {
    enabled: true,
    overrideNative: true,
    config: {}
  },
  dash: {
    enabled: true,
    overrideNative: true,
    config: {}
  },
  
  // Analytics options
  analytics: {
    enabled: false,
    trackingId: '',
    events: ['play', 'pause', 'ended', 'volumechange', 'fullscreenchange', 'error']
  },
  
  // Control bar configuration
  controlBar: {
    children: [
      'playToggle',
      'volumePanel',
      'currentTimeDisplay',
      'progressControl',
      'durationDisplay',
      'playbackRateMenuButton',
      'qualitySelector',
      'fullscreenToggle'
    ]
  }
});
```

## 🔌 Plugins

Vibly works with all Video.js plugins. Here are some recommended plugins:

### Quality Selector

```js
import 'videojs-hls-quality-selector';
import 'videojs-contrib-quality-levels';

player.vibly({
  plugins: {
    qualityLevels: {},
    hlsQualitySelector: {
      displayCurrentQuality: true
    }
  }
});
```

### Hotkeys

```js
import 'videojs-hotkeys';

player.vibly({
  plugins: {
    hotkeys: {
      volumeStep: 0.1,
      seekStep: 5
    }
  }
});
```

### Analytics

```js
import 'videojs-google-analytics';

player.vibly({
  plugins: {
    googleAnalytics: {
      trackingId: 'UA-XXXXX-Y'
    }
  }
});
```

## 🖥️ Framework Integration

### React

```jsx
import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'vibly/dist/vibly.css';
import 'vibly';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      fluid: true
    });
    
    player.vibly({
      theme: 'default'
    });
    
    return () => {
      if (player) player.dispose();
    };
  }, []);
  
  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vibly-theme-default" />
    </div>
  );
};

export default VideoPlayer;
```

### Vue

```vue
<template>
  <div data-vjs-player>
    <video ref="videoPlayer" class="video-js vibly-theme-default"></video>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import 'vibly/dist/vibly.css';
import 'vibly';

export default {
  mounted() {
    import('video.js').then(module => {
      const videojs = module.default;
      const player = videojs(this.$refs.videoPlayer, {
        controls: true,
        fluid: true
      });
      
      player.vibly({
        theme: 'default'
      });
      
      this.player = player;
    });
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>
```

## 📚 API Reference

### Methods

#### `player.vibly(options)`

Initialize the Vibly plugin with options.

#### `player.vibly().setTheme(theme)`

Change the theme of the player.

```js
player.vibly().setTheme('forest');
```

#### `player.vibly().getOptions()`

Get the current options.

```js
const options = player.vibly().getOptions();
```

#### `player.vibly().updateOptions(options)`

Update options at runtime.

```js
player.vibly().updateOptions({
  theme: 'city',
  playbackRates: [0.5, 1, 1.5, 2, 3]
});
```

### Events

Vibly emits the following events:

```js
player.on('vibly.ready', function() {
  console.log('Vibly player is ready');
});

player.on('vibly.themechange', function(event, theme) {
  console.log('Theme changed to:', theme);
});
```

## 📱 Mobile Support

Vibly is designed to work well on mobile devices:

- Touch-friendly controls
- Responsive layout
- Inline playback on iOS (`playsinline` attribute)
- Fullscreen support
- Mobile-optimized UI

## 🌐 Browser Support

Vibly supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Android Chrome (latest)

## 🤝 Contributing

Contributions are welcome! Please check out our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

Vibly is [MIT licensed](LICENSE).

## 🙏 Acknowledgements

- [Video.js](https://videojs.com) - The core video player
- [HLS.js](https://github.com/video-dev/hls.js) - HLS streaming support
- [dash.js](https://github.com/Dash-Industry-Forum/dash.js) - DASH streaming support
- [videojs-contrib-quality-levels](https://github.com/videojs/videojs-contrib-quality-levels) - Quality level support
