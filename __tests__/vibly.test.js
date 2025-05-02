/**
 * @jest-environment jsdom
 */

import Vibly from '../src/vibly';

// Mock player
const mockPlayer = {
  addClass: jest.fn(),
  removeClass: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  getChild: jest.fn(() => ({
    el: jest.fn(() => ({
      setAttribute: jest.fn()
    }))
  })),
  trigger: jest.fn()
};

describe('Vibly', () => {
  let vibly;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create a new Vibly instance
    vibly = new Vibly(mockPlayer, {});
  });
  
  test('should add vibly-player class to player', () => {
    expect(mockPlayer.addClass).toHaveBeenCalledWith('vibly-player');
  });
  
  test('should set up event listeners', () => {
    expect(mockPlayer.on).toHaveBeenCalledWith('ready', expect.any(Function));
    expect(mockPlayer.on).toHaveBeenCalledWith('play', expect.any(Function));
    expect(mockPlayer.on).toHaveBeenCalledWith('pause', expect.any(Function));
    expect(mockPlayer.on).toHaveBeenCalledWith('ended', expect.any(Function));
  });
  
  test('should clean up event listeners on dispose', () => {
    vibly.dispose();
    
    expect(mockPlayer.off).toHaveBeenCalledWith('ready');
    expect(mockPlayer.off).toHaveBeenCalledWith('play');
    expect(mockPlayer.off).toHaveBeenCalledWith('pause');
    expect(mockPlayer.off).toHaveBeenCalledWith('ended');
  });
});
