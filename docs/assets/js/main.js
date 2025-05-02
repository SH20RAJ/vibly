document.addEventListener('DOMContentLoaded', function() {
  // Installation tabs
  const tabButtons = document.querySelectorAll('.installation-tabs button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Theme selector for demo
  const themeSelect = document.getElementById('theme-select');
  const demoPlayer = document.getElementById('demo-player');

  if (themeSelect && demoPlayer) {
    themeSelect.addEventListener('change', () => {
      // Remove all theme classes
      demoPlayer.classList.remove('vibly-theme-default', 'vibly-theme-city', 'vibly-theme-forest');
      // Add selected theme class
      demoPlayer.classList.add(`vibly-theme-${themeSelect.value}`);
    });
  }

  // Demo player controls
  const playBtn = document.getElementById('play-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const muteBtn = document.getElementById('mute-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  // Initialize Vibly player if videojs is available
  if (typeof videojs !== 'undefined' && demoPlayer) {
    const player = videojs('demo-player');
    
    if (typeof player.vibly === 'function') {
      player.vibly({
        theme: 'default',
        fluid: true,
        aspectRatio: '16:9',
        playbackRates: [0.5, 1, 1.5, 2]
      });
    }

    // Control buttons
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        player.play();
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        player.pause();
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        player.muted(!player.muted());
        muteBtn.textContent = player.muted() ? 'Unmute' : 'Mute';
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        if (player.isFullscreen()) {
          player.exitFullscreen();
        } else {
          player.requestFullscreen();
        }
      });
    }
  }

  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkScroll() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.8) {
        element.classList.add('animate');
      }
    });
  }

  // Initial check
  checkScroll();
  
  // Check on scroll
  window.addEventListener('scroll', checkScroll);
});
