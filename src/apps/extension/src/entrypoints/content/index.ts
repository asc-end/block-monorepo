import { browser, ContentScriptContext } from "wxt/browser";
import { colors } from '@blockit/ui';

// Add type declaration for WXT auto-imports
declare function defineContentScript(config: any): any;


// Blocked domains will be loaded from storage
let blockedDomains: string[] = [];
let activeRoutines: any[] = [];
let currentFocusSession: any = null;
let countdownInterval: any = null;

// Helper to check if current site is blocked
const isBlockedSite = (hostname: string, sites: string[]): boolean => {
  return sites.some(site => {
    // Handle both www and non-www versions
    return hostname === site || 
           hostname === `www.${site}` || 
           hostname.endsWith(`.${site}`);
  });
};

// Helper to format time for display
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
};

// Calculate time remaining for focus session
const getFocusSessionTimeRemaining = (): number | null => {
  if (!currentFocusSession || !currentFocusSession.startTime || !currentFocusSession.duration) {
    return null;
  }
  
  const startTime = new Date(currentFocusSession.startTime).getTime();
  const endTime = startTime + (currentFocusSession.duration * 60 * 1000);
  const now = Date.now();
  const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
  
  return remaining;
};

// Calculate time remaining for routines (blocking mode)
const getRoutineTimeRemaining = (): number | null => {
  if (!activeRoutines.length) return null;
  
  // Find the first blocking mode routine
  const blockingRoutine = activeRoutines.find(r => r.timeMode === 'blocking' && r.endTime);
  if (!blockingRoutine) return null;
  
  const now = new Date();
  const [endHour, endMin] = blockingRoutine.endTime.split(':').map(Number);
  
  // Create end time for today
  const endTime = new Date();
  endTime.setHours(endHour, endMin, 0, 0);
  
  // Check if we need to handle midnight crossing
  if (blockingRoutine.startTime) {
    const [startHour, startMin] = blockingRoutine.startTime.split(':').map(Number);
    const startTimeInMinutes = startHour * 60 + startMin;
    const endTimeInMinutes = endHour * 60 + endMin;
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
    
    // If end time is before start time (spans midnight)
    if (endTimeInMinutes < startTimeInMinutes) {
      // If current time is after start time, end time is today
      if (currentTimeInMinutes >= startTimeInMinutes) {
        endTime.setDate(endTime.getDate() + 1);
      }
      // If current time is before end time, we're already in tomorrow
    } else {
      // Normal case: if end time has passed today, the routine is not active
      if (endTime < now) {
        return null;
      }
    }
  }
  
  const remaining = Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / 1000));
  return remaining;
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
      background: linear-gradient(135deg, ${colors.background}F2 0%, ${colors.surface.card}F2 50%, ${colors.surface.elevated}F2 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: ${colors.text.main};
      text-align: center;
      pointer-events: auto;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
        }
        to {
          opacity: 1;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      }
      @keyframes pulseGlow {
        0%, 100% {
          transform: scale(1);
          opacity: 0.8;
        }
        50% {
          transform: scale(1.05);
          opacity: 1;
        }
      }
      @keyframes slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      @keyframes bounceRotate {
        0%, 100% {
          transform: scale(1) rotate(0deg);
        }
        25% {
          transform: scale(1.05) rotate(2deg);
        }
        75% {
          transform: scale(1.05) rotate(-2deg);
        }
      }
      @keyframes floatBadge {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }
    `;
    document.head.appendChild(style);

    // Create dynamic content based on whether it's a routine or focus session
    const getBlockContent = () => {
      if (activeRoutines.length > 0) {
        const routineNames = activeRoutines.map(r => r.name).join(', ');
        return `
          <div style="
            position: relative;
            width: 100px;
            height: 100px;
            margin: 0 auto 2rem;
            animation: bounceRotate 2s ease-in-out infinite;
          ">
          <h1 style="
            font-size: 3rem; 
            margin-bottom: 1.5rem; 
            font-weight: 800; 
            color: ${colors.text.main};
            animation: slideUp 0.6s ease-out;
            letter-spacing: -0.02em;
          ">Blocked by Routine</h1>
          <p style="
            font-size: 1.25rem; 
            max-width: 500px; 
            line-height: 1.8; 
            color: ${colors.text.soft}; 
            margin-bottom: 2rem;
            animation: slideUp 0.8s ease-out;
          ">
            This website is blocked during your active routine${activeRoutines.length > 1 ? 's' : ''}:
          </p>
          <div style="
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            margin-bottom: 3rem;
            animation: slideUp 1s ease-out;
          ">
            ${activeRoutines.map(r => `
              <span style="
                background: ${colors.surface.elevated};
                color: ${colors.pop.violet};
                padding: 0.5rem 1rem;
                border-radius: 1rem;
                font-weight: 600;
                border: 2px solid ${colors.pop.violet}20;
              ">${r.name}</span>
            `).join('')}
          </div>
          <div id="countdown-timer" style="
            font-size: 2rem;
            font-weight: 600;
            color: ${colors.pop.violet};
            margin-bottom: 2rem;
            animation: slideUp 1.1s ease-out;
            font-variant-numeric: tabular-nums;
          ">
            <!-- Timer will be inserted here -->
          </div>
          <div style="
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.75rem; 
            font-weight: 600;
            background: ${colors.pop.violet}15;
            color: ${colors.pop.violet};
            padding: 0.5rem 1rem;
            border-radius: 0.75rem;
            border: 1px solid ${colors.pop.violet}25;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            animation: slideUp 1.2s ease-out;
          ">
            <div style="
              width: 6px;
              height: 6px;
              background: ${colors.pop.violet};
              border-radius: 50%;
              animation: pulseGlow 2s ease-in-out infinite;
            "></div>
            Routine Active
          </div>
        `;
      } else {
        return `
          <div style="
            position: relative;
            width: 100px;
            height: 100px;
            margin: 0 auto 2rem;
            animation: bounceRotate 2s ease-in-out infinite;
          ">
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              background: linear-gradient(135deg, ${colors.primary['600']} 0%, ${colors.primary['400']} 100%);
              clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
              box-shadow: 0 8px 32px ${colors.primary['500']}40;
            "></div>
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: white;
              font-size: 2rem;
              font-weight: 900;
              text-shadow: 0 2px 4px rgba(0,0,0,0.2);
              letter-spacing: 0.1em;
            ">STOP</div>
          </div>
          <h1 style="
            font-size: 3rem; 
            margin-bottom: 1.5rem; 
            font-weight: 800; 
            color: ${colors.text.main};
            animation: slideUp 0.6s ease-out;
            letter-spacing: -0.02em;
          ">Time to Focus!</h1>
          <p style="
            font-size: 1.25rem; 
            max-width: 500px; 
            line-height: 1.8; 
            color: ${colors.text.soft}; 
            margin-bottom: 3rem;
            animation: slideUp 0.8s ease-out;
          ">
            This website is blocked during your focus session.<br/>
            Take a deep breath and return to your important tasks.
          </p>
          <div id="countdown-timer" style="
            font-size: 2rem;
            font-weight: 600;
            color: ${colors.primary['600']};
            margin-bottom: 2rem;
            animation: slideUp 0.9s ease-out;
            font-variant-numeric: tabular-nums;
          ">
            <!-- Timer will be inserted here -->
          </div>
          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            animation: slideUp 1s ease-out;
          ">
            <div style="
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              font-size: 0.75rem; 
              font-weight: 600;
              background: ${colors.primary['500']}15;
              color: ${colors.primary['700']};
              padding: 0.5rem 1rem;
              border-radius: 0.75rem;
              border: 1px solid ${colors.primary['500']}25;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            ">
              <div style="
                width: 6px;
                height: 6px;
                background: ${colors.primary['600']};
                border-radius: 50%;
                animation: pulseGlow 2s ease-in-out infinite;
              "></div>
              Focus Session Active
            </div>
            <p style="
              font-size: 0.875rem;
              color: ${colors.text.verySoft};
              margin: 0;
            ">Stay focused, you've got this! 💪</p>
          </div>
          <button onclick="window.location.reload()" style="
            margin-top: 3rem;
            background: none;
            border: 1px solid ${colors.text.verySoft}40;
            color: ${colors.text.verySoft};
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s;
          " onmouseover="this.style.borderColor='${colors.text.soft}'; this.style.color='${colors.text.soft}'" 
             onmouseout="this.style.borderColor='${colors.text.verySoft}40'; this.style.color='${colors.text.verySoft}'">
            Session ended? Click to refresh
          </button>
        `;
      }
    };

    const content = getBlockContent();

    overlay.innerHTML = content;

    // Function to update countdown timer
    const updateCountdown = () => {
      const timerElement = document.getElementById('countdown-timer');
      if (!timerElement) return;
      
      let timeRemaining = null;
      
      // Check if focus session is active
      if (currentFocusSession) {
        timeRemaining = getFocusSessionTimeRemaining();
      } else if (activeRoutines.length > 0) {
        timeRemaining = getRoutineTimeRemaining();
      }
      
      if (timeRemaining !== null && timeRemaining > 0) {
        timerElement.innerHTML = `
          <div style="margin-bottom: 0.5rem; font-size: 1rem; color: ${colors.text.soft};">Time Remaining</div>
          <div>${formatTime(timeRemaining)}</div>
        `;
      } else {
        timerElement.innerHTML = `
          <div style="font-size: 1rem; color: ${colors.text.soft};">Session ending soon...</div>
        `;
      }
    };

    // Start countdown timer
    updateCountdown();
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    countdownInterval = setInterval(updateCountdown, 1000);

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
      
      // Start countdown timer with a small delay to ensure DOM is ready
      setTimeout(() => {
        updateCountdown();
        if (!countdownInterval) {
          countdownInterval = setInterval(updateCountdown, 1000);
        }
      }, 100);
    };

    // Unblock page by removing overlay and restoring interactions
    const unblockPage = () => {
      stopMediaObserver(); // Stop monitoring media
      
      // Clear countdown timer
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      
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

    // Fetch active focus session details from background
    const fetchFocusSessionDetails = async () => {
      try {
        const response = await browser.runtime.sendMessage({ type: 'GET_FOCUS_SESSION_DETAILS' });
        if (response && response.session) {
          currentFocusSession = response.session;
        }
      } catch (error) {
        console.error('Error fetching focus session details:', error);
      }
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

        const result = await storage.get(['currentFocusSession', 'authToken', 'focusSessionDetails']);
        const { currentFocusSession: sessionActive, authToken, focusSessionDetails } = result;
        
        // Set focus session details if available
        if (sessionActive && focusSessionDetails) {
          currentFocusSession = focusSessionDetails;
        } else if (sessionActive && !focusSessionDetails) {
          // If we know there's a session but no details, fetch them
          await fetchFocusSessionDetails();
        }

        // Only check for blocking if user is authenticated
        if (!authToken) {
          unblockPage();
          return;
        }

        const currentHostname = window.location.hostname;
        
        // Check if blocked by routine
        const isBlockedByRoutine = blockedDomains.length > 0 && isBlockedSite(currentHostname, blockedDomains);
        
        // Check if blocked by focus session
        const focusBlockedSites = ['tiktok.com', 'youtube.com', 'twitter.com', 'x.com'];
        let isBlockedByFocusSession = sessionActive && isBlockedSite(currentHostname, focusBlockedSites);
        
        // If no focus session data in storage but user is authenticated, check with backend
        if (!sessionActive && authToken && isBlockedSite(currentHostname, focusBlockedSites)) {
          try {
            const response = await browser.runtime.sendMessage({ type: 'CHECK_FOCUS_SESSION' });
            if (response && response.inFocusSession) {
              isBlockedByFocusSession = true;
              // Update storage for future checks
              await storage.set({ currentFocusSession: true });
              // Also fetch focus session details for timer
              await fetchFocusSessionDetails();
            }
          } catch (error) {
            console.error('Error checking focus session status:', error);
          }
        }
        
        if (isBlockedByRoutine || isBlockedByFocusSession) {
          // If blocked by focus session but we don't have details yet, fetch them
          if (isBlockedByFocusSession && !currentFocusSession) {
            await fetchFocusSessionDetails();
          }
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

    // Periodic refresh to ensure state stays synchronized (every 30 seconds)
    setInterval(() => {
      checkAndApplyBlocking();
    }, 30000);

    // Listen for messages from popup/background
    if (browser?.runtime?.onMessage) {
      browser.runtime.onMessage.addListener(async (message: any) => {
        if (message.type === "AUTH_TOKEN_RECEIVED") {
          // User just authenticated, re-check for focus sessions
          checkAndApplyBlocking();
        }
        else if (message.action == "STOP_FOCUS_SESSION") {
          // Clear the storage immediately to ensure state is updated
          await browser.storage.local.remove('currentFocusSession');
          currentFocusSession = null;
          checkAndApplyBlocking();
        }
        else if (message.action == "BEGIN_FOCUS_SESSION") {
          // Set the storage immediately to ensure state is updated
          await browser.storage.local.set({ currentFocusSession: true });
          // Use session details from message if available
          if (message.session) {
            currentFocusSession = message.session;
          } else {
            // Otherwise fetch focus session details for timer
            await fetchFocusSessionDetails();
          }
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