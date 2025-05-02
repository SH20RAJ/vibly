/**
 * Vibly - Core implementation
 * @module vibly/core
 */

import videojs from 'video.js';
import { initializeThemes, setTheme } from './themes';
import { initializePlugins } from './plugins';
import { mergeOptions, setupAccessibility, detectStreamType, isMobile } from './utils';

// Import streaming libraries if available
let Hls = null;
let dashjs = null;

// We'll load these dynamically when needed
function loadHls() {
  return import('hls.js').then(module => {
    Hls = module.default;
    return Hls;
  }).catch(e => {
    console.warn('HLS.js not available:', e);
    return null;
  });
}

function loadDash() {
  return import('dashjs').then(module => {
    dashjs = module.default;
    return dashjs;
  }).catch(e => {
    console.warn('dash.js not available:', e);
    return null;
  });
}

const Plugin = videojs.getPlugin('plugin');

/**
 * Default options for the Vibly plugin
 */
const DEFAULT_OPTIONS = {
  theme: 'default',
  fluid: true,
  aspectRatio: '16:9',
  playbackRates: [0.5, 1, 1.5, 2],
  plugins: {},
  autoplay: false,
  muted: false,
  loop: false,
  preload: 'auto',
  poster: '',
  controls: true,
  responsive: true,
  fill: false,
  language: 'en',
  sources: [],
  tracks: [],
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
  },
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
  // Accessibility options
  accessibility: {
    enabled: true
  }
};

/**
 * Vibly plugin implementation
 */
class Vibly extends Plugin {
  /**
   * Create a Vibly plugin instance
   * @param {Player} player - The Video.js player instance
   * @param {Object} options - The plugin options
   */
  constructor(player, options) {
    // Call the parent constructor
    super(player);

    // Merge default options with user options
    this.options = mergeOptions(DEFAULT_OPTIONS, options);

    // Add the vibly class to the player
    player.addClass('vibly-player');

    // Initialize the player
    this.initialize();
  }

  /**
   * Initialize the Vibly player
   */
  initialize() {
    // Initialize themes
    initializeThemes(this.player, this.options.theme);

    // Initialize plugins
    initializePlugins(this.player, this.options.plugins);

    // Setup accessibility if enabled
    if (this.options.accessibility.enabled) {
      setupAccessibility(this.player);
    }

    // Setup streaming support
    this.setupStreamingSupport();

    // Setup analytics if enabled
    if (this.options.analytics.enabled) {
      this.setupAnalytics();
    }

    // Apply video.js options
    this.applyVideoJsOptions();

    // Add event listeners
    this.setupEventListeners();
  }

  /**
   * Apply Video.js options to the player
   */
  applyVideoJsOptions() {
    const player = this.player;
    const options = this.options;

    // Apply basic options
    if (options.autoplay) player.autoplay(options.autoplay);
    if (options.muted) player.muted(options.muted);
    if (options.loop) player.loop(options.loop);
    if (options.preload) player.preload(options.preload);
    if (options.poster) player.poster(options.poster);
    if (options.controls !== undefined) player.controls(options.controls);
    if (options.fluid) player.fluid(options.fluid);
    if (options.fill) player.fill(options.fill);
    if (options.aspectRatio) player.aspectRatio(options.aspectRatio);
    if (options.language) player.language(options.language);

    // Apply sources if provided
    if (options.sources && options.sources.length > 0) {
      player.src(options.sources);
    }

    // Apply text tracks if provided
    if (options.tracks && options.tracks.length > 0) {
      options.tracks.forEach(track => {
        player.addRemoteTextTrack(track, false);
      });
    }

    // Apply playback rates if provided
    if (options.playbackRates && options.playbackRates.length > 0) {
      player.playbackRates(options.playbackRates);
    }
  }

  /**
   * Setup streaming support (HLS, DASH)
   */
  setupStreamingSupport() {
    const player = this.player;
    const options = this.options;

    // Setup source change handler
    player.on('sourcechange', async () => {
      const source = player.currentSource();
      if (!source || !source.src) return;

      const type = detectStreamType(source.src, source.type);

      // Handle HLS
      if (type === 'hls' && options.hls.enabled && options.hls.overrideNative) {
        // Clean up previous instance if exists
        if (this.hls) {
          this.hls.destroy();
          this.hls = null;
        }

        // Load HLS.js dynamically if needed
        if (!Hls) {
          await loadHls();
        }

        // Initialize HLS if available
        if (Hls && Hls.isSupported()) {
          const hls = new Hls(options.hls.config);
          hls.loadSource(source.src);
          hls.attachMedia(player.tech().el());

          // Store HLS instance for cleanup
          this.hls = hls;
        }
      }

      // Handle DASH
      if (type === 'dash' && options.dash.enabled && options.dash.overrideNative) {
        // Clean up previous instance if exists
        if (this.dash) {
          this.dash.destroy();
          this.dash = null;
        }

        // Load dash.js dynamically if needed
        if (!dashjs) {
          await loadDash();
        }

        // Initialize DASH if available
        if (dashjs) {
          const dash = dashjs.MediaPlayer().create();
          dash.initialize(player.tech().el(), source.src, false);
          dash.updateSettings(options.dash.config);

          // Store DASH instance for cleanup
          this.dash = dash;
        }
      }
    });
  }

  /**
   * Setup analytics tracking
   */
  setupAnalytics() {
    const player = this.player;
    const options = this.options.analytics;

    if (!options.trackingId) return;

    // Setup event listeners for analytics
    options.events.forEach(eventName => {
      player.on(eventName, () => {
        // Simple analytics tracking - in a real implementation,
        // this would send data to an analytics service
        if (window.ga) {
          window.ga('send', 'event', 'Video', eventName, player.currentSrc());
        } else if (window.gtag) {
          window.gtag('event', eventName, {
            'event_category': 'Video',
            'event_label': player.currentSrc()
          });
        } else {
          console.log(`Analytics event: ${eventName}`, player.currentSrc());
        }
      });
    });
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Ready event
    this.player.on('ready', () => {
      // Player is ready
      this.trigger('ready');
    });

    // Play event
    this.player.on('play', () => {
      // Player started playing
      this.trigger('play');
    });

    // Pause event
    this.player.on('pause', () => {
      // Player paused
      this.trigger('pause');
    });

    // Ended event
    this.player.on('ended', () => {
      // Player ended
      this.trigger('ended');
    });
  }

  /**
   * Set the current theme
   * @param {string} theme - The theme name
   */
  setTheme(theme) {
    setTheme(this.player, theme);
  }

  /**
   * Get the current options
   * @returns {Object} - The current options
   */
  getOptions() {
    return { ...this.options };
  }

  /**
   * Update options
   * @param {Object} options - The new options
   */
  updateOptions(options) {
    this.options = mergeOptions(this.options, options);

    // Re-apply options that can be updated at runtime
    this.applyVideoJsOptions();

    // Update theme if specified
    if (options.theme) {
      this.setTheme(options.theme);
    }

    return this;
  }

  /**
   * Dispose the plugin
   */
  dispose() {
    // Clean up event listeners
    this.player.off('ready');
    this.player.off('play');
    this.player.off('pause');
    this.player.off('ended');
    this.player.off('sourcechange');

    // Clean up HLS instance if exists
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }

    // Clean up DASH instance if exists
    if (this.dash) {
      this.dash.destroy();
      this.dash = null;
    }

    // Call the parent dispose
    super.dispose();
  }
}

// Define plugin version
Vibly.VERSION = '__VERSION__';

export default Vibly;
