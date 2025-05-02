<template>
  <div>
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
// Import Vibly when published
// import 'vibly/dist/vibly.css';
// import 'vibly';

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
.player-container {
  margin-bottom: 20px;
}

.theme-selector {
  margin-bottom: 20px;
}

.controls button {
  margin-right: 10px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
