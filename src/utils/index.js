/**
 * Vibly - Utility functions
 * @module vibly/utils
 */

/**
 * Merge options with defaults
 * @param {Object} defaults - The default options
 * @param {Object} options - The user options
 * @returns {Object} - The merged options
 */
export function mergeOptions(defaults, options) {
  return Object.assign({}, defaults, options);
}

/**
 * Setup accessibility features
 * @param {Player} player - The Video.js player instance
 */
export function setupAccessibility(player) {
  // Ensure all controls have proper ARIA attributes
  const controlBar = player.getChild('ControlBar');

  if (controlBar) {
    // Make sure the control bar is accessible
    controlBar.el().setAttribute('aria-label', 'Video Player Controls');

    // Add keyboard navigation support
    player.on('keydown', (event) => {
      // Handle keyboard events
      switch (event.key) {
        case ' ':
        case 'k':
          // Space or K key toggles play/pause
          if (player.paused()) {
            player.play();
          } else {
            player.pause();
          }
          event.preventDefault();
          break;
        case 'f':
          // F key toggles fullscreen
          if (player.isFullscreen()) {
            player.exitFullscreen();
          } else {
            player.requestFullscreen();
          }
          event.preventDefault();
          break;
        case 'm':
          // M key toggles mute
          player.muted(!player.muted());
          event.preventDefault();
          break;
        case 'ArrowLeft':
          // Left arrow seeks backward
          player.currentTime(Math.max(0, player.currentTime() - 5));
          event.preventDefault();
          break;
        case 'ArrowRight':
          // Right arrow seeks forward
          player.currentTime(Math.min(player.duration(), player.currentTime() + 5));
          event.preventDefault();
          break;
        case 'ArrowUp':
          // Up arrow increases volume
          player.volume(Math.min(1, player.volume() + 0.1));
          event.preventDefault();
          break;
        case 'ArrowDown':
          // Down arrow decreases volume
          player.volume(Math.max(0, player.volume() - 0.1));
          event.preventDefault();
          break;
      }
    });
  }
}

/**
 * Detect the type of stream from URL or MIME type
 * @param {string} url - The URL of the stream
 * @param {string} type - The MIME type of the stream
 * @returns {string|null} - The stream type ('hls', 'dash', or null)
 */
export function detectStreamType(url, type) {
  // Check MIME type first
  if (type) {
    if (type.includes('application/x-mpegURL') || type.includes('application/vnd.apple.mpegurl')) {
      return 'hls';
    }
    if (type.includes('application/dash+xml')) {
      return 'dash';
    }
  }

  // Check URL extension
  if (url) {
    if (url.includes('.m3u8')) {
      return 'hls';
    }
    if (url.includes('.mpd')) {
      return 'dash';
    }
  }

  return null;
}

/**
 * Check if the current device is mobile
 * @returns {boolean} - True if the device is mobile, false otherwise
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Format time in seconds to HH:MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time
 */
export function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/**
 * Generate a unique ID
 * @returns {string} - Unique ID
 */
export function generateId() {
  return 'vibly-' + Math.random().toString(36).substring(2, 9);
}

/**
 * Check if a feature is supported by the browser
 * @param {string} feature - The feature to check
 * @returns {boolean} - True if the feature is supported, false otherwise
 */
export function isFeatureSupported(feature) {
  switch (feature) {
    case 'hls':
      return document.createElement('video').canPlayType('application/vnd.apple.mpegurl') !== '';
    case 'dash':
      return document.createElement('video').canPlayType('application/dash+xml') !== '';
    case 'fullscreen':
      return !!(
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled
      );
    case 'pictureInPicture':
      return 'pictureInPictureEnabled' in document;
    default:
      return false;
  }
}

export default {
  mergeOptions,
  setupAccessibility,
  detectStreamType,
  isMobile,
  formatTime,
  generateId,
  isFeatureSupported
};
