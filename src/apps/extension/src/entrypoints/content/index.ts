import { browser, ContentScriptContext } from "wxt/browser";

// Add type declaration for WXT auto-imports
declare function defineContentScript(config: any): any;


// Blocked domains will be loaded from storage
let blockedDomains: string[] = [];
let activeRoutines: any[] = [];

// Helper to check if current site is blocked
const isBlockedSite = (hostname: string, sites: string[]): boolean => {
  return sites.some(site => {
    // Handle both www and non-www versions
    return hostname === site || 
           hostname === `www.${site}` || 
           hostname.endsWith(`.${site}`);
  });
};

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_end',
  main(ctx: ContentScriptContext) {
    // Skip certain contexts silently
    if (ctx.isIframe || ctx.isExtensionPage || ctx.isDevToolsPage) {
      return;
    }
    if (ctx.isInvalidPage) {
      // Skip invalid pages without reloading
      return;
    }

    
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(248, 243, 255, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #5A12FF;
      text-align: center;
      pointer-events: auto;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    `;

    // Create dynamic content based on whether it's a routine or focus session
    const getBlockContent = () => {
      if (activeRoutines.length > 0) {
        const routineNames = activeRoutines.map(r => r.name).join(', ');
        return `
          <div style="font-size: 4rem; margin-bottom: 1rem;">🚫</div>
          <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Blocked by Routine</h1>
          <p style="font-size: 1.2rem; max-width: 600px; line-height: 1.6;">
            This website is blocked during your active routine${activeRoutines.length > 1 ? 's' : ''}: <strong>${routineNames}</strong>
          </p>
          <div style="font-size: 1.5rem; margin-top: 2rem; font-weight: 500;">Routine Active</div>
        `;
      } else {
        return `
          <div style="font-size: 4rem; margin-bottom: 1rem;">🚫</div>
          <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Time to Focus!</h1>
          <p style="font-size: 1.2rem; max-width: 600px; line-height: 1.6;">
            This website is blocked during your focus session. Take a deep breath and return to your important tasks.
          </p>
          <div style="font-size: 1.5rem; margin-top: 2rem; font-weight: 500;">Focus Session Active</div>
        `;
      }
    };

    const content = getBlockContent();

    overlay.innerHTML = content;

    // Store original title
    let originalTitle = document.title;

    // Function to pause all media elements
    const pauseAllMedia = () => {
      // Pause all video elements
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        if (!video.paused) {
          video.pause();
        }
      });

      // Pause all audio elements
      const audios = document.querySelectorAll('audio');
      audios.forEach(audio => {
        if (!audio.paused) {
          audio.pause();
        }
      });

      // Try to pause YouTube specifically (if it's a YouTube page)
      if (window.location.hostname.includes('youtube.com')) {
        const ytPlayer = document.querySelector('.html5-main-video') as HTMLVideoElement;
        if (ytPlayer && !ytPlayer.paused) {
          ytPlayer.pause();
        }
        
        // Also try clicking the pause button as a fallback
        const pauseButton = document.querySelector('.ytp-play-button[aria-label*="Pause"]') as HTMLButtonElement;
        if (pauseButton) {
          pauseButton.click();
        }
      }
      
      // Handle iframes that might contain media
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            const iframeVideos = iframeDoc.querySelectorAll('video');
            iframeVideos.forEach(video => {
              if (!video.paused) {
                video.pause();
              }
            });
          }
        } catch (e) {
          // Cross-origin iframes will throw an error - silently ignore
        }
      });
    };
    
    // Mutation observer to continuously pause media
    let mediaObserver: MutationObserver | null = null;
    
    const startMediaObserver = () => {
      if (mediaObserver) return;
      
      mediaObserver = new MutationObserver(() => {
        // Re-pause any media that starts playing
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          if (!video.paused) {
            video.pause();
          }
        });
        
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
          if (!audio.paused) {
            audio.pause();
          }
        });
      });
      
      mediaObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'playing']
      });
    };
    
    const stopMediaObserver = () => {
      if (mediaObserver) {
        mediaObserver.disconnect();
        mediaObserver = null;
      }
    };

    // Block page by adding overlay and preventing interactions
    const blockPage = () => {
      pauseAllMedia();
      startMediaObserver(); // Keep media paused
      
      // Add a small delay to ensure media elements are loaded
      setTimeout(pauseAllMedia, 100);
      setTimeout(pauseAllMedia, 500);
      
      document.body.appendChild(overlay);
      document.title = '🚫 Focus Mode Active';

      // Prevent scrolling
      document.body.style.overflow = 'hidden';

      // Prevent any clicks from reaching the page
      document.addEventListener('click', preventInteraction, true);
      document.addEventListener('keydown', preventInteraction, true);
      document.addEventListener('mouseover', preventInteraction, true);
      document.addEventListener('mouseenter', preventInteraction, true);
      document.addEventListener('mouseleave', preventInteraction, true);
      document.addEventListener('mouseout', preventInteraction, true);
    };

    // Unblock page by removing overlay and restoring interactions
    const unblockPage = () => {
      stopMediaObserver(); // Stop monitoring media
      
      if (overlay.parentNode) {
        overlay.remove();
      }
      document.title = originalTitle;
      document.body.style.overflow = '';
      document.removeEventListener('click', preventInteraction, true);
      document.removeEventListener('keydown', preventInteraction, true);
      document.removeEventListener('mouseover', preventInteraction, true);
      document.removeEventListener('mouseenter', preventInteraction, true);
      document.removeEventListener('mouseleave', preventInteraction, true);
      document.removeEventListener('mouseout', preventInteraction, true);
    };

    // Prevent any interaction with the page
    const preventInteraction = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Load blocked domains from storage
    const loadBlockedDomains = async () => {
      try {
        const storage = browser?.storage?.local;
        if (!storage) return;
        
        const result = await storage.get(['blockedDomains', 'activeRoutines']);
        if (result.blockedDomains) {
          blockedDomains = result.blockedDomains;
        }
        if (result.activeRoutines) {
          activeRoutines = result.activeRoutines;
        }
      } catch (error) {
        console.error('Error loading blocked domains:', error);
      }
    };

    // Function to check and apply blocking
    const checkAndApplyBlocking = async () => {
      try {
        const storage = browser?.storage?.local;
        if (!storage) return;

        // Load blocked domains first
        await loadBlockedDomains();

        const result = await storage.get(['currentFocusSession', 'authToken']);
        const { currentFocusSession, authToken } = result;

        // Only check for blocking if user is authenticated
        if (!authToken) {
          unblockPage();
          return;
        }

        const currentHostname = window.location.hostname;
        
        // Check if blocked by routine
        const isBlockedByRoutine = blockedDomains.length > 0 && isBlockedSite(currentHostname, blockedDomains);
        
        // Check if blocked by focus session (using hardcoded sites for now)
        const focusBlockedSites = ['tiktok.com', 'youtube.com', 'twitter.com', 'x.com'];
        const isBlockedByFocusSession = currentFocusSession && isBlockedSite(currentHostname, focusBlockedSites);
        
        if (isBlockedByRoutine || isBlockedByFocusSession) {
          // Update content if needed
          overlay.innerHTML = getBlockContent();
          blockPage();
        } else {
          unblockPage();
        }
      } catch (error) {
        console.error('Error checking blocking status:', error);
      }
    };


    checkAndApplyBlocking();

    // Listen for messages from popup/background
    if (browser?.runtime?.onMessage) {
      browser.runtime.onMessage.addListener((message: any) => {
        const currentHostname = window.location.hostname;

        if (message.type === "AUTH_TOKEN_RECEIVED") {
          // User just authenticated, re-check for focus sessions
          checkAndApplyBlocking();
        }
        else if (message.action == "STOP_FOCUS_SESSION") {
          checkAndApplyBlocking();
        }
        else if (message.action == "BEGIN_FOCUS_SESSION") {
          checkAndApplyBlocking();
        }
        else if (message.action == "UPDATE_BLOCKED_DOMAINS") {
          // Update blocked domains from routine changes
          if (message.blockedDomains) {
            blockedDomains = message.blockedDomains;
          }
          checkAndApplyBlocking();
        }
      });
    }

    let startTime = Date.now();
    let isActive = document.hasFocus() && document.visibilityState === 'visible';

    if (isActive) {
      startTime = Date.now();
    }

    // Function to track time spent
    const trackTimeSpent = () => {
      if (isActive && startTime > 0) {
        const timeSpent = Date.now() - startTime;
        if (timeSpent > 0) { // Only track if there's actual time spent
          const url = window.location.href;
          const storage = browser?.storage?.local;
          const domain = new URL(url).hostname;

          if (storage) {
            storage.get('websiteStats').then((result: { websiteStats?: Record<string, number> }) => {
              const stats = result.websiteStats || {};
              stats[domain] = (stats[domain] || 0) + timeSpent;
              storage.set({ websiteStats: stats });
            });
          }

          browser.runtime.sendMessage({ type: "TRACK_TIME", timeSpent, domain })
            .catch(err => console.error('Failed to send message:', err))
        }
        // Don't set isActive to false here - let the event handlers manage it
        startTime = 0; // Reset start time
      }
    };

    window.addEventListener('focus', () => {
      if (document.visibilityState === 'visible') {
        startTime = Date.now();
        isActive = true;
      }
    });

    window.addEventListener('blur', () => {
      trackTimeSpent();
      isActive = false;
    });

    // Also listen for page focus/blur events which can be more reliable for tab switching
    window.addEventListener('pageshow', () => {
      if (document.hasFocus() && document.visibilityState === 'visible') {
        startTime = Date.now();
        isActive = true;
      }
    });

    window.addEventListener('pagehide', (event) => {
      trackTimeSpent();
      isActive = false;

      // Force sync if the page is being unloaded (not just hidden)
      if (event && (event as PageTransitionEvent).persisted === false) {
        browser.runtime.sendMessage({ type: "FORCE_SYNC" }).catch(() => {
          // Ignore errors if extension is being unloaded
        });
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        trackTimeSpent();
        isActive = false;
      } else if (document.hasFocus()) {
        // When tab becomes visible and document has focus, start tracking
        startTime = Date.now();
        isActive = true;
      }
    });

    // Track time when user navigates away or closes tab
    window.addEventListener('beforeunload', () => {
      trackTimeSpent();
      // Send a message to background script to force immediate sync
      browser.runtime.sendMessage({ type: "FORCE_SYNC" }).catch(() => {
        // Ignore errors if extension is being unloaded
      });
    });

    // const periodicTracker = setInterval(() => {
    //   console.log(`Periodic check - isActive: ${isActive}, startTime: ${startTime}, focused: ${document.hasFocus()}, visible: ${document.visibilityState}`);

    //   if (isActive && startTime > 0) {
    //     const tempTime = Date.now();
    //     const timeSpent = tempTime - startTime;
    //     if (timeSpent > 1000) { // Only track if more than 1 second
    //       const domain = new URL(window.location.href).hostname;
    //       console.log(`Periodic sync: ${timeSpent}ms on ${domain}`);
    //       browser.runtime.sendMessage({ type: "TRACK_TIME", timeSpent, domain })
    //         .then(() => {
    //           console.log('Periodic message sent successfully');
    //           startTime = tempTime; // Reset start time to now for next period
    //         })
    //         .catch(err => console.error('Failed to send periodic message:', err));
    //     }
    //   } else {
    //     console.log(`Not tracking - isActive: ${isActive}, startTime: ${startTime}`);
    //     // If the page is visible and focused but not active, restart tracking
    //     if (document.hasFocus() && document.visibilityState === 'visible' && !isActive) {
    //       console.log('Restarting tracking - page became active');
    //       isActive = true;
    //       isFocused = true;
    //       startTime = Date.now();
    //     }
    //   }
    // }, 10000);

    // return () => {
    //   clearInterval(periodicTracker);
    // };

  },

});