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
  },
});