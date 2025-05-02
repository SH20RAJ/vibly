/**
 * Vibly - Plugin management
 * @module vibly/plugins
 */

/**
 * Initialize plugins for the player
 * @param {Player} player - The Video.js player instance
 * @param {Object} plugins - The plugins configuration
 */
export function initializePlugins(player, plugins = {}) {
  // Initialize each plugin
  Object.keys(plugins).forEach(pluginName => {
    const pluginOptions = plugins[pluginName];
    
    // Check if the plugin is available
    if (typeof player[pluginName] === 'function') {
      // Initialize the plugin with options
      player[pluginName](pluginOptions);
    } else {
      console.warn(`Plugin ${pluginName} is not available.`);
    }
  });
}

/**
 * Register a custom plugin
 * @param {string} name - The plugin name
 * @param {Function} plugin - The plugin implementation
 */
export function registerCustomPlugin(name, plugin) {
  // Use Video.js plugin registration mechanism
  const videojs = require('video.js');
  const registerPlugin = videojs.registerPlugin || videojs.plugin;
  
  // Register the plugin
  registerPlugin(name, plugin);
}

export default {
  initializePlugins,
  registerCustomPlugin
};
