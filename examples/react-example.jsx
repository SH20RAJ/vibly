import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'vibly/dist/vibly.css';
import 'vibly';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // Initialize the Video.js player
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, {
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
      player.vibly({
        theme: currentTheme
      });

      // Add event listeners
      player.on('play', () => {
        console.log('Video started playing');
      });

      player.on('pause', () => {
        console.log('Video paused');
      });

      player.on('ended', () => {
        console.log('Video ended');
      });
    }

    // Cleanup function
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  // Update theme when currentTheme changes
  useEffect(() => {
    if (playerRef.current) {
      const player = playerRef.current;

      // Remove existing theme classes
      player.removeClass('vibly-theme-default');
      player.removeClass('vibly-theme-city');
      player.removeClass('vibly-theme-forest');

      // Add selected theme class
      player.addClass(`vibly-theme-${currentTheme}`);
    }
  }, [currentTheme]);

  const handleThemeChange = (event) => {
    setCurrentTheme(event.target.value);
  };

  const handlePlay = () => {
    playerRef.current.play();
  };

  const handlePause = () => {
    playerRef.current.pause();
  };

  const handleMute = () => {
    const player = playerRef.current;
    player.muted(!player.muted());
  };

  const handleFullscreen = () => {
    const player = playerRef.current;
    if (player.isFullscreen()) {
      player.exitFullscreen();
    } else {
      player.requestFullscreen();
    }
  };

  // SVG Logo component
  const ViblySVGLogo = () => (
    <svg width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2196f3;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#4caf50;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#grad1)" />
      <polygon points="80,60 140,100 80,140" fill="white" />
      <text x="100" y="180" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" textAnchor="middle" fill="white">VIBLY</text>
    </svg>
  );

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <ViblySVGLogo />
      </div>

      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Vibly Player - React Example</h1>

      <div className="theme-selector" style={{ marginBottom: '20px' }}>
        <label htmlFor="theme-select">Select Theme: </label>
        <select id="theme-select" value={currentTheme} onChange={handleThemeChange}>
          <option value="default">Default</option>
          <option value="city">City</option>
          <option value="forest">Forest</option>
        </select>
      </div>

      <div className="player-container">
        <div data-vjs-player>
          <video ref={videoRef} className={`video-js vibly-theme-${currentTheme}`}>
            <track kind="captions" src="https://vjs.zencdn.net/v/oceans.vtt" srcLang="en" label="English" default />
          </video>
        </div>
      </div>

      <div className="controls" style={{ marginBottom: '30px' }}>
        <button
          onClick={handlePlay}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            cursor: 'pointer',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Play
        </button>
        <button
          onClick={handlePause}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            cursor: 'pointer',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Pause
        </button>
        <button
          onClick={handleMute}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            cursor: 'pointer',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Mute
        </button>
        <button
          onClick={handleFullscreen}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            cursor: 'pointer',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Fullscreen
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
