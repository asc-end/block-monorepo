import { browser } from "wxt/browser";

const blockedSites = ['tiktok.com', 'youtube.com', 'twitter.com', 'x.com'];

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_idle',
  main() {

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

    const content = `
      <div style="font-size: 4rem; margin-bottom: 1rem;">🚫</div>
      <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Time to Focus!</h1>
      <p style="font-size: 1.2rem; max-width: 600px; line-height: 1.6;">
        This website is blocked during your focus session. Take a deep breath and return to your important tasks.
      </p>
      <div style="font-size: 1.5rem; margin-top: 2rem; font-weight: 500;">Focus Session Active</div>
    `;

    overlay.innerHTML = content;

    // Store original title
    let originalTitle = document.title;

    // Block page by adding overlay and preventing interactions
    const blockPage = () => {
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
      overlay.remove();
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

    // Function to check and apply blocking
    const checkAndApplyBlocking = async () => {
      try {
        const storage = browser?.storage?.local;
        if (!storage) return;

        const result = await storage.get(['blockedSites', 'activeFocusSession']);
        const { blockedSites, activeFocusSession } = result;

        if (activeFocusSession && blockedSites) {
          const currentHostname = window.location.hostname;
          console.log('Current hostname:', currentHostname);
          console.log('Blocked sites:', blockedSites);

          if (blockedSites.some((site: string) => currentHostname.includes(site))) {
            console.log('Site is blocked, applying blocking...');
            blockPage();
            console.log('Blocking applied successfully');
          } else {
            console.log('Site is not blocked');
            unblockPage();
          }
        } else {
          console.log('No active focus session or no blocked sites');
          unblockPage();
        }
      } catch (error) {
        console.error('Error checking blocking status:', error);
      }
    };


    checkAndApplyBlocking();

    // Listen for messages from popup/background
    if (browser?.runtime?.onMessage) {
      browser.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
        const currentHostname = window.location.hostname;

        console.log("message", message)
        if (message.action == "STOP_FOCUS_SESSION") {
          if (blockedSites.some((site: string) => currentHostname.includes(site)))
            unblockPage();

        }
        else if (message.action == "BEGIN_FOCUS_SESSION") {
          if (blockedSites.some((site: string) => currentHostname.includes(site)))
            blockPage();
        }
      });
    }

    let startTime = Date.now();
    let isActive = document.hasFocus() && document.visibilityState === 'visible';
    let isFocused = document.hasFocus();

    if (isActive) {
      startTime = Date.now();
      console.log('Page is already active, starting tracking');
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

          console.log(`SENDING MESSAGE: ${timeSpent}ms on ${domain}`)
          browser.runtime.sendMessage({ type: "TRACK_TIME", timeSpent, domain })
            .then(() => console.log('Message sent successfully'))
            .catch(err => console.error('Failed to send message:', err))
        }
        // Don't set isActive to false here - let the event handlers manage it
        startTime = 0; // Reset start time
      }
    };

    window.addEventListener('focus', () => {
      console.log('Window focused');
      isFocused = true;
      if (document.visibilityState === 'visible') {
        startTime = Date.now();
        isActive = true;
        console.log('Started tracking time on focus');
      }
    });

    window.addEventListener('blur', () => {
      console.log('Window blurred');
      isFocused = false;
      trackTimeSpent();
      isActive = false;
    });

    // Also listen for page focus/blur events which can be more reliable for tab switching
    window.addEventListener('pageshow', () => {
      console.log('Page shown (tab switch or navigation)');
      if (document.hasFocus() && document.visibilityState === 'visible') {
        startTime = Date.now();
        isActive = true;
        isFocused = true;
        console.log('Started tracking time on page show');
      }
    });

    window.addEventListener('pagehide', (event) => {
      console.log('Page hidden (tab switch or navigation)');
      trackTimeSpent();
      isActive = false;
      
      // Force sync if the page is being unloaded (not just hidden)
      if (event && (event as PageTransitionEvent).persisted === false) {
        console.log('Page being unloaded, forcing sync');
        browser.runtime.sendMessage({ type: "FORCE_SYNC" }).catch(() => {
          // Ignore errors if extension is being unloaded
        });
      }
    });

    document.addEventListener('visibilitychange', () => {
      console.log(`Visibility changed to: ${document.visibilityState}`);
      if (document.hidden) {
        trackTimeSpent();
        isActive = false;
      } else if (document.hasFocus()) {
        // When tab becomes visible and document has focus, start tracking
        startTime = Date.now();
        isActive = true;
        isFocused = true; // Update the focused state
        console.log('Started tracking time on visibility change');
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

    const periodicTracker = setInterval(() => {
      console.log(`Periodic check - isActive: ${isActive}, startTime: ${startTime}, focused: ${document.hasFocus()}, visible: ${document.visibilityState}`);
      
      if (isActive && startTime > 0) {
        const tempTime = Date.now();
        const timeSpent = tempTime - startTime;
        if (timeSpent > 1000) { // Only track if more than 1 second
          const domain = new URL(window.location.href).hostname;
          console.log(`Periodic sync: ${timeSpent}ms on ${domain}`);
          browser.runtime.sendMessage({ type: "TRACK_TIME", timeSpent, domain })
            .then(() => {
              console.log('Periodic message sent successfully');
              startTime = tempTime; // Reset start time to now for next period
            })
            .catch(err => console.error('Failed to send periodic message:', err));
        }
      } else {
        console.log(`Not tracking - isActive: ${isActive}, startTime: ${startTime}`);
        // If the page is visible and focused but not active, restart tracking
        if (document.hasFocus() && document.visibilityState === 'visible' && !isActive) {
          console.log('Restarting tracking - page became active');
          isActive = true;
          isFocused = true;
          startTime = Date.now();
        }
      }
    }, 10000);

    // return () => {
    //   clearInterval(periodicTracker);
    // };

  },

});