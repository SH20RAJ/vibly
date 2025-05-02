/**
 * Vibly - A modern, customizable Video.js player
 * @module vibly
 */

import videojs from 'video.js';
import Vibly from './vibly';
import './scss/vibly.scss';

// Register the plugin with Video.js
const registerPlugin = videojs.registerPlugin || videojs.plugin;
registerPlugin('vibly', Vibly);

// Export the plugin
export default Vibly;
