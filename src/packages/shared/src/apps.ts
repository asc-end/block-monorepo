export const UTILITY_APPS = [
    'phone',
    'messages',
    'contacts',
    'calendar',
    'clock',
    'calculator',
    'notes',
    'reminders',
    'health',
    'weather',
    'maps',
    'settings'
];

/**
 * Unified app name mapping for cross-platform consistency
 * Maps various domain names and app names to a single canonical name
 */

interface AppMapping {
    // The canonical name to use across all platforms
    canonicalName: string;
    // Web domains that map to this app
    webDomains: string[];
    // Mobile app package names or app names that map to this app
    mobileApps: string[];
    // Optional category for grouping
    category?: 'social' | 'productivity' | 'entertainment' | 'communication' | 'development' | 'other';
}

export const APP_MAPPINGS: AppMapping[] = [
    {
        canonicalName: 'YouTube',
        webDomains: ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'],
        mobileApps: ['YouTube', 'com.google.android.youtube', 'YouTube Music'],
        category: 'entertainment'
    },
    {
        canonicalName: 'Twitter/X',
        webDomains: ['twitter.com', 'www.twitter.com', 'x.com', 'www.x.com', 'mobile.twitter.com'],
        mobileApps: ['X', 'Twitter', 'com.twitter.android'],
        category: 'social'
    },
    {
        canonicalName: 'Facebook',
        webDomains: ['facebook.com', 'www.facebook.com', 'm.facebook.com', 'fb.com'],
        mobileApps: ['Facebook', 'com.facebook.katana', 'Facebook Lite'],
        category: 'social'
    },
    {
        canonicalName: 'Instagram',
        webDomains: ['instagram.com', 'www.instagram.com'],
        mobileApps: ['Instagram', 'com.instagram.android'],
        category: 'social'
    },
    {
        canonicalName: 'WhatsApp',
        webDomains: ['web.whatsapp.com', 'whatsapp.com'],
        mobileApps: ['WhatsApp', 'WhatsApp Messenger', 'com.whatsapp'],
        category: 'communication'
    },
    {
        canonicalName: 'GitHub',
        webDomains: ['github.com', 'www.github.com', 'gist.github.com'],
        mobileApps: ['GitHub', 'com.github.android'],
        category: 'development'
    },
    {
        canonicalName: 'Gmail',
        webDomains: ['mail.google.com', 'gmail.com'],
        mobileApps: ['Gmail', 'com.google.android.gm'],
        category: 'communication'
    },
    {
        canonicalName: 'Google Docs',
        webDomains: ['docs.google.com', 'drive.google.com'],
        mobileApps: ['Google Docs', 'Google Drive', 'com.google.android.apps.docs'],
        category: 'productivity'
    },
    {
        canonicalName: 'Reddit',
        webDomains: ['reddit.com', 'www.reddit.com', 'old.reddit.com', 'm.reddit.com'],
        mobileApps: ['Reddit', 'com.reddit.frontpage'],
        category: 'social'
    },
    {
        canonicalName: 'LinkedIn',
        webDomains: ['linkedin.com', 'www.linkedin.com'],
        mobileApps: ['LinkedIn', 'com.linkedin.android'],
        category: 'social'
    },
    {
        canonicalName: 'TikTok',
        webDomains: ['tiktok.com', 'www.tiktok.com'],
        mobileApps: ['TikTok', 'com.zhiliaoapp.musically'],
        category: 'entertainment'
    },
    {
        canonicalName: 'Netflix',
        webDomains: ['netflix.com', 'www.netflix.com'],
        mobileApps: ['Netflix', 'com.netflix.mediaclient'],
        category: 'entertainment'
    },
    {
        canonicalName: 'Spotify',
        webDomains: ['spotify.com', 'www.spotify.com', 'open.spotify.com'],
        mobileApps: ['Spotify', 'Spotify Music', 'com.spotify.music'],
        category: 'entertainment'
    },
    {
        canonicalName: 'Discord',
        webDomains: ['discord.com', 'www.discord.com', 'discord.gg'],
        mobileApps: ['Discord', 'com.discord'],
        category: 'communication'
    },
    {
        canonicalName: 'Slack',
        webDomains: ['slack.com', 'app.slack.com'],
        mobileApps: ['Slack', 'com.slack'],
        category: 'communication'
    },
    {
        canonicalName: 'Zoom',
        webDomains: ['zoom.us', 'zoom.com'],
        mobileApps: ['Zoom', 'ZOOM Cloud Meetings', 'us.zoom.videomeetings'],
        category: 'communication'
    },
    {
        canonicalName: 'Amazon',
        webDomains: ['amazon.com', 'www.amazon.com', 'smile.amazon.com'],
        mobileApps: ['Amazon Shopping', 'Amazon', 'com.amazon.mShop.android.shopping'],
        category: 'other'
    },
    {
        canonicalName: 'Twitch',
        webDomains: ['twitch.tv', 'www.twitch.tv'],
        mobileApps: ['Twitch', 'tv.twitch.android.app'],
        category: 'entertainment'
    },
    {
        canonicalName: 'Stack Overflow',
        webDomains: ['stackoverflow.com', 'www.stackoverflow.com'],
        mobileApps: ['Stack Overflow', 'com.stackexchange.stackoverflow'],
        category: 'development'
    },
    {
        canonicalName: 'ChatGPT',
        webDomains: ['chat.openai.com', 'chatgpt.com'],
        mobileApps: ['ChatGPT', 'com.openai.chatgpt'],
        category: 'productivity'
    },
    {
        canonicalName: 'Claude',
        webDomains: ['claude.ai', 'www.claude.ai'],
        mobileApps: ['Claude', 'com.anthropic.claude'],
        category: 'productivity'
    }
];


/**
* Helper function to normalize a domain name
* Removes protocol, www prefix, and trailing slashes
*/
function normalizeDomain(domain: string): string {
    return domain
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '');
}

/**
 * Get the canonical app name for a given web domain
 */
export function getCanonicalName(domain: string, platform: 'web' | 'mobile'): string {
    const normalizedDomain = normalizeDomain(domain);

    if (platform === 'web') {
        const mapping = APP_MAPPINGS.find(app =>
            app.webDomains.some(d => normalizeDomain(d).toLowerCase() === normalizedDomain.toLowerCase())
        );
        return mapping?.canonicalName || domain;
    } else {
        const mapping = APP_MAPPINGS.find(app =>
            app.mobileApps.some(d => d.toLowerCase() === normalizedDomain.toLowerCase())
        );
        return mapping?.canonicalName || domain;
    }
}

/**
 * Get all apps in a specific category
 */
export function getAppsByCategory(category: AppMapping['category']): string[] {
    return APP_MAPPINGS
      .filter(app => app.category === category)
      .map(app => app.canonicalName);
  }