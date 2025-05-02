<template>
  <div>
    <div class="logo">
      <svg width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2196f3;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#4caf50;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#grad1)" />
        <polygon points="80,60 140,100 80,140" fill="white" />
        <text x="100" y="180" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white">VIBLY</text>
      </svg>
    </div>

    <h1>Vibly Player - Vue Example</h1>

    <div class="theme-selector">
      <label for="theme-select">Select Theme:</label>
      <select id="theme-select" v-model="currentTheme">
        <option value="default">Default</option>
        <option value="city">City</option>
        <option value="forest">Forest</option>
      </select>
    </div>

    <div class="player-container">
      <div data-vjs-player>
        <video ref="videoPlayer" :class="['video-js', `vibly-theme-${currentTheme}`]"></video>
      </div>
    </div>

    <div class="controls">
      <button @click="handlePlay">Play</button>
      <button @click="handlePause">Pause</button>
      <button @click="handleMute">{{ isMuted ? 'Unmute' : 'Mute' }}</button>
      <button @click="handleFullscreen">Fullscreen</button>
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import 'vibly/dist/vibly.css';
import 'vibly';

export default {
  name: 'VideoPlayer',

  data() {
    return {
      player: null,
      currentTheme: 'default',
      isMuted: false
    };
  },

  watch: {
    currentTheme(newTheme) {
      if (this.player) {
        // Remove existing theme classes
        this.player.removeClass('vibly-theme-default');
        this.player.removeClass('vibly-theme-city');
        this.player.removeClass('vibly-theme-forest');

        // Add selected theme class
        this.player.addClass(`vibly-theme-${newTheme}`);
      }
    }
  },

  mounted() {
    // Import videojs dynamically to avoid SSR issues
    import('video.js').then(module => {
      const videojs = module.default;

      // Initialize the Video.js player
      this.player = videojs(this.$refs.videoPlayer, {
        controls: true,
        fluid: true,
        aspectRatio: '16:9',
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [{
          src: 'https://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        }],
        poster: 'https://vjs.zencdn.net/v/oceans.png'
      });

      // Initialize Vibly
      this.player.vibly({
        theme: this.currentTheme
      });

      // Add event listeners
      this.player.on('play', () => {
        console.log('Video started playing');
      });

      this.player.on('pause', () => {
        console.log('Video paused');
      });

      this.player.on('ended', () => {
        console.log('Video ended');
      });

      this.player.on('volumechange', () => {
        this.isMuted = this.player.muted();
      });
    });
  },

  beforeUnmount() {
    // Dispose the player when the component is destroyed
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  },

  methods: {
    handlePlay() {
      this.player.play();
    },

    handlePause() {
      this.player.pause();
    },

    handleMute() {
      this.player.muted(!this.player.muted());
    },

    handleFullscreen() {
      if (this.player.isFullscreen()) {
        this.player.exitFullscreen();
      } else {
        this.player.requestFullscreen();
      }
    }
  }
};
</script>

<style scoped>
.logo {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.player-container {
  margin-bottom: 20px;
}

.theme-selector {
  margin-bottom: 20px;
}

.controls {
  margin-bottom: 30px;
}

.controls button {
  margin-right: 10px;
  padding: 8px 16px;
  cursor: pointer;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
}

.controls button:hover {
  background-color: #0d8aee;
}
</style>
