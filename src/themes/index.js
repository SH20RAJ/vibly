/**
 * Vibly - Theme management
 * @module vibly/themes
 */

/**
 * Available themes
 */
const AVAILABLE_THEMES = ['default', 'city', 'forest'];

/**
 * Initialize themes for the player
 * @param {Player} player - The Video.js player instance
 * @param {string} theme - The theme name
 */
export function initializeThemes(player, theme) {
  // Remove any existing theme classes
  AVAILABLE_THEMES.forEach(themeName => {
    player.removeClass(`vibly-theme-${themeName}`);
  });

  // Add the selected theme class
  if (AVAILABLE_THEMES.includes(theme)) {
    player.addClass(`vibly-theme-${theme}`);
  } else {
    // Default to the default theme if the specified theme is not available
    player.addClass('vibly-theme-default');
  }
}

/**
 * Get available themes
 * @returns {Array} - Array of available theme names
 */
export function getAvailableThemes() {
  return [...AVAILABLE_THEMES];
}

/**
 * Set theme for the player
 * @param {Player} player - The Video.js player instance
 * @param {string} theme - The theme name
 */
export function setTheme(player, theme) {
  initializeThemes(player, theme);
}

export default {
  initializeThemes,
  getAvailableThemes,
  setTheme
};
