// Mock Video.js
global.videojs = {
  registerPlugin: jest.fn(),
  plugin: jest.fn(),
  getPlugin: jest.fn(() => class {}),
  getComponent: jest.fn(() => class {})
};

// Mock window properties used by Video.js
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock HTMLMediaElement methods
HTMLMediaElement.prototype.load = jest.fn();
HTMLMediaElement.prototype.play = jest.fn();
HTMLMediaElement.prototype.pause = jest.fn();
HTMLMediaElement.prototype.addTextTrack = jest.fn();
