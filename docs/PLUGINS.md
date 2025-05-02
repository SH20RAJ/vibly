# Vibly Plugins Guide

This document provides information about using plugins with Vibly, including recommended plugins and how to create custom plugins.

## Using Plugins

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

## Recommended Plugins

Here are some recommended plugins that work well with Vibly:

### Hotkeys

[videojs-hotkeys](https://github.com/ctd1500/videojs-hotkeys) adds keyboard shortcuts to the player.

```bash
npm install videojs-hotkeys
```

```js
import 'videojs-hotkeys';

player.vibly({
  plugins: {
    hotkeys: {
      volumeStep: 0.1,
      seekStep: 5,
      enableModifiersForNumbers: false
    }
  }
});
```

### Quality Selector

[videojs-hls-quality-selector](https://github.com/chrisboustead/videojs-hls-quality-selector) adds a quality selection menu for HLS streams.

```bash
npm install videojs-hls-quality-selector videojs-contrib-quality-levels
```

```js
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';

player.vibly({
  plugins: {
    qualityLevels: {},
    hlsQualitySelector: {
      displayCurrentQuality: true
    }
  }
});
```

### Playlist

[videojs-playlist](https://github.com/videojs/videojs-playlist) adds playlist functionality to the player.

```bash
npm install videojs-playlist
```

```js
import 'videojs-playlist';

// Initialize the player
const player = videojs('my-player');
player.vibly();

// Set up the playlist
player.playlist([
  {
    sources: [{
      src: 'https://example.com/video1.mp4',
      type: 'video/mp4'
    }],
    poster: 'https://example.com/poster1.jpg'
  },
  {
    sources: [{
      src: 'https://example.com/video2.mp4',
      type: 'video/mp4'
    }],
    poster: 'https://example.com/poster2.jpg'
  }
]);

// Play the playlist
player.playlist.autoadvance(0); // 0 seconds between videos
```

### Analytics

[videojs-google-analytics](https://github.com/tankvn/videojs-google-analytics) adds Google Analytics tracking to the player.

```bash
npm install videojs-google-analytics
```

```js
import 'videojs-google-analytics';

player.vibly({
  plugins: {
    googleAnalytics: {
      trackingId: 'UA-XXXXX-Y',
      events: [
        'play',
        'pause',
        'ended',
        'volumechange',
        'fullscreenchange',
        'error'
      ]
    }
  }
});
```

### Chromecast

[videojs-chromecast](https://github.com/videojs/videojs-chromecast) adds Chromecast support to the player.

```bash
npm install videojs-chromecast
```

```js
import 'videojs-chromecast';

player.vibly({
  plugins: {
    chromecast: {
      receiverAppID: '1234'
    }
  }
});
```

## Creating Custom Plugins

You can create custom plugins for Vibly using the Video.js plugin architecture.

### Basic Plugin Structure

```js
import videojs from 'video.js';

// Define the plugin
const MyPlugin = function(options) {
  const player = this;
  
  // Plugin initialization
  player.on('ready', function() {
    console.log('Plugin initialized with options:', options);
    
    // Add functionality here
  });
};

// Register the plugin
const registerPlugin = videojs.registerPlugin || videojs.plugin;
registerPlugin('myPlugin', MyPlugin);

export default MyPlugin;
```

### Using the Custom Plugin

```js
import 'path/to/my-plugin';

player.vibly({
  plugins: {
    myPlugin: {
      // Plugin options
    }
  }
});
```

### Adding UI Components

You can add UI components to the player using the Video.js Component API:

```js
import videojs from 'video.js';

const Button = videojs.getComponent('Button');

// Create a custom button
class MyButton extends Button {
  constructor(player, options) {
    super(player, options);
    this.controlText('My Button');
  }

  handleClick() {
    console.log('Button clicked!');
    // Add your functionality here
  }
}

// Register the component
videojs.registerComponent('MyButton', MyButton);

// Define the plugin
const MyPlugin = function(options) {
  const player = this;
  
  player.on('ready', function() {
    // Add the button to the control bar
    const controlBar = player.getChild('ControlBar');
    const myButton = player.addChild('MyButton', options);
    controlBar.addChild(myButton);
  });
};

// Register the plugin
const registerPlugin = videojs.registerPlugin || videojs.plugin;
registerPlugin('myPlugin', MyPlugin);

export default MyPlugin;
```

## Plugin Compatibility

Most Video.js plugins are compatible with Vibly. However, some plugins may require specific configuration or may not work with certain features.

If you encounter compatibility issues, check the plugin's documentation or open an issue on the Vibly GitHub repository.
