import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Known app domain mappings
const appDomainMappings: Record<string, {
  domains: string[];
  androidPackageName?: string;
  iosBundleId?: string;
  category?: string;
}> = {
  'YouTube': {
    domains: ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'],
    androidPackageName: 'com.google.android.youtube',
    iosBundleId: 'com.google.ios.youtube',
    category: 'Entertainment'
  },
  'Twitter': {
    domains: ['twitter.com', 'www.twitter.com', 'mobile.twitter.com', 'x.com', 'www.x.com'],
    androidPackageName: 'com.twitter.android',
    iosBundleId: 'com.atebits.Tweetie2',
    category: 'Social Media'
  },
  'X': {
    domains: ['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com'],
    androidPackageName: 'com.twitter.android',
    iosBundleId: 'com.atebits.Tweetie2',
    category: 'Social Media'
  },
  'Instagram': {
    domains: ['instagram.com', 'www.instagram.com'],
    androidPackageName: 'com.instagram.android',
    iosBundleId: 'com.burbn.instagram',
    category: 'Social Media'
  },
  'Facebook': {
    domains: ['facebook.com', 'www.facebook.com', 'm.facebook.com', 'fb.com'],
    androidPackageName: 'com.facebook.katana',
    iosBundleId: 'com.facebook.Facebook',
    category: 'Social Media'
  },
  'TikTok': {
    domains: ['tiktok.com', 'www.tiktok.com'],
    androidPackageName: 'com.ss.android.ugc.trill',
    iosBundleId: 'com.ss.iphone.ugc.Aweme',
    category: 'Social Media'
  },
  'Reddit': {
    domains: ['reddit.com', 'www.reddit.com', 'old.reddit.com'],
    androidPackageName: 'com.reddit.frontpage',
    iosBundleId: 'com.reddit.Reddit',
    category: 'Social Media'
  },
  'LinkedIn': {
    domains: ['linkedin.com', 'www.linkedin.com'],
    androidPackageName: 'com.linkedin.android',
    iosBundleId: 'com.linkedin.LinkedIn',
    category: 'Social Media'
  },
  'Snapchat': {
    domains: ['snapchat.com', 'www.snapchat.com'],
    androidPackageName: 'com.snapchat.android',
    iosBundleId: 'com.toyopagroup.picaboo',
    category: 'Social Media'
  },
  'WhatsApp': {
    domains: ['web.whatsapp.com', 'whatsapp.com'],
    androidPackageName: 'com.whatsapp',
    iosBundleId: 'net.whatsapp.WhatsApp',
    category: 'Messages'
  },
  'Telegram': {
    domains: ['telegram.org', 'web.telegram.org'],
    androidPackageName: 'org.telegram.messenger',
    iosBundleId: 'org.telegram.Telegraph',
    category: 'Messages'
  },
  'Discord': {
    domains: ['discord.com', 'www.discord.com', 'discord.gg'],
    androidPackageName: 'com.discord',
    iosBundleId: 'com.hammerandchisel.discord',
    category: 'Messages'
  },
  'Twitch': {
    domains: ['twitch.tv', 'www.twitch.tv'],
    androidPackageName: 'tv.twitch.android.app',
    iosBundleId: 'tv.twitch',
    category: 'Entertainment'
  },
  'Netflix': {
    domains: ['netflix.com', 'www.netflix.com'],
    androidPackageName: 'com.netflix.mediaclient',
    iosBundleId: 'com.netflix.Netflix',
    category: 'Entertainment'
  },
  'Spotify': {
    domains: ['spotify.com', 'www.spotify.com', 'open.spotify.com'],
    androidPackageName: 'com.spotify.music',
    iosBundleId: 'com.spotify.client',
    category: 'Entertainment'
  },
  'Pinterest': {
    domains: ['pinterest.com', 'www.pinterest.com'],
    androidPackageName: 'com.pinterest',
    iosBundleId: 'pinterest',
    category: 'Social Media'
  },
  // Productivity & Work
  'Slack': {
    domains: ['slack.com', 'app.slack.com'],
    androidPackageName: 'com.Slack',
    iosBundleId: 'com.tinyspeck.chatlyio',
    category: 'Productivity'
  },
  'Teams': {
    domains: ['teams.microsoft.com', 'teams.live.com'],
    androidPackageName: 'com.microsoft.teams',
    iosBundleId: 'com.microsoft.skype.teams',
    category: 'Productivity'
  },
  'Zoom': {
    domains: ['zoom.us', 'zoom.com'],
    androidPackageName: 'us.zoom.videomeetings',
    iosBundleId: 'us.zoom.videomeetings',
    category: 'Productivity'
  },
  'Gmail': {
    domains: ['mail.google.com', 'gmail.com'],
    androidPackageName: 'com.google.android.gm',
    iosBundleId: 'com.google.Gmail',
    category: 'Productivity'
  },
  'Outlook': {
    domains: ['outlook.com', 'outlook.live.com', 'outlook.office365.com'],
    androidPackageName: 'com.microsoft.office.outlook',
    iosBundleId: 'com.microsoft.Office.Outlook',
    category: 'Productivity'
  },
  // News & Reading
  'Medium': {
    domains: ['medium.com'],
    androidPackageName: 'com.medium.reader',
    iosBundleId: 'com.medium.reader',
    category: 'News'
  },
  'CNN': {
    domains: ['cnn.com', 'www.cnn.com'],
    androidPackageName: 'com.cnn.mobile.android.phone',
    iosBundleId: 'com.cnn.iphone',
    category: 'News'
  },
  'BBC': {
    domains: ['bbc.com', 'www.bbc.com', 'bbc.co.uk'],
    androidPackageName: 'bbc.mobile.news.ww',
    iosBundleId: 'uk.co.bbc.news',
    category: 'News'
  },
  'The New York Times': {
    domains: ['nytimes.com', 'www.nytimes.com'],
    androidPackageName: 'com.nytimes.android',
    iosBundleId: 'com.nytimes.NYTimes',
    category: 'News'
  },
  // Gaming
  'Steam': {
    domains: ['store.steampowered.com', 'steamcommunity.com'],
    androidPackageName: 'com.valvesoftware.android.steam.community',
    iosBundleId: 'com.valvesoftware.Steam',
    category: 'Games'
  },
  'Epic Games': {
    domains: ['epicgames.com', 'www.epicgames.com'],
    androidPackageName: 'com.epicgames.portal',
    iosBundleId: 'com.epicgames.ue4',
    category: 'Games'
  },
  'Roblox': {
    domains: ['roblox.com', 'www.roblox.com'],
    androidPackageName: 'com.roblox.client',
    iosBundleId: 'com.roblox.robloxmobile',
    category: 'Games'
  },
  // Shopping
  'Amazon': {
    domains: ['amazon.com', 'www.amazon.com', 'smile.amazon.com'],
    androidPackageName: 'com.amazon.mShop.android.shopping',
    iosBundleId: 'com.amazon.Amazon',
    category: 'Shopping'
  },
  'eBay': {
    domains: ['ebay.com', 'www.ebay.com'],
    androidPackageName: 'com.ebay.mobile',
    iosBundleId: 'com.ebay.iphone',
    category: 'Shopping'
  },
  'Etsy': {
    domains: ['etsy.com', 'www.etsy.com'],
    androidPackageName: 'com.etsy.android',
    iosBundleId: 'com.etsy.etsyinc',
    category: 'Shopping'
  },
  // Video/Streaming
  'Hulu': {
    domains: ['hulu.com', 'www.hulu.com'],
    androidPackageName: 'com.hulu.plus',
    iosBundleId: 'com.hulu.plus',
    category: 'Entertainment'
  },
  'Disney+': {
    domains: ['disneyplus.com', 'www.disneyplus.com'],
    androidPackageName: 'com.disney.disneyplus',
    iosBundleId: 'com.disney.disneyplus',
    category: 'Entertainment'
  },
  'HBO Max': {
    domains: ['hbomax.com', 'www.hbomax.com', 'max.com'],
    androidPackageName: 'com.hbo.hbonow',
    iosBundleId: 'com.hbo.hbonow',
    category: 'Entertainment'
  },
  'Prime Video': {
    domains: ['primevideo.com', 'www.primevideo.com'],
    androidPackageName: 'com.amazon.avod.thirdpartyclient',
    iosBundleId: 'com.amazon.aiv.AIVApp',
    category: 'Entertainment'
  },
  'Peacock': {
    domains: ['peacocktv.com', 'www.peacocktv.com'],
    androidPackageName: 'com.peacocktv.peacockandroid',
    iosBundleId: 'com.peacocktv.ios',
    category: 'Entertainment'
  },
  // Other Popular Apps
  'GitHub': {
    domains: ['github.com', 'www.github.com'],
    androidPackageName: 'com.github.android',
    iosBundleId: 'com.github.stormbreaker.prod',
    category: 'Productivity'
  },
  'Stack Overflow': {
    domains: ['stackoverflow.com', 'www.stackoverflow.com'],
    androidPackageName: 'com.stackexchange.marvin',
    iosBundleId: 'com.stackoverflow.stackoverflow',
    category: 'Productivity'
  },
  'Quora': {
    domains: ['quora.com', 'www.quora.com'],
    androidPackageName: 'com.quora.android',
    iosBundleId: 'com.quora.app',
    category: 'Social Media'
  },
  'Tumblr': {
    domains: ['tumblr.com', 'www.tumblr.com'],
    androidPackageName: 'com.tumblr',
    iosBundleId: 'com.tumblr.tumblr',
    category: 'Social Media'
  },
  'Vimeo': {
    domains: ['vimeo.com', 'www.vimeo.com'],
    androidPackageName: 'com.vimeo.android.videoapp',
    iosBundleId: 'com.vimeo',
    category: 'Entertainment'
  }
};

async function updateAppDomains() {
  console.log('Starting app domain update...');
  
  try {
    // Get all apps
    const apps = await prisma.app.findMany();
    console.log(`Found ${apps.length} apps in database`);
    
    let updatedCount = 0;
    let mergedCount = 0;
    let createdCount = 0;
    
    // Track which apps we've processed
    const processedApps = new Set<string>();
    
    for (const app of apps) {
      // Try to match by name (case insensitive)
      const matchingKey = Object.keys(appDomainMappings).find(
        key => key.toLowerCase() === app.name.toLowerCase()
      );
      
      if (matchingKey) {
        const domainInfo = appDomainMappings[matchingKey];
        
        // Check if we need to merge with existing app
        if (domainInfo.androidPackageName && app.androidPackageName !== domainInfo.androidPackageName) {
          const existingApp = await prisma.app.findUnique({
            where: { androidPackageName: domainInfo.androidPackageName }
          });
          
          if (existingApp && existingApp.id !== app.id) {
            // Merge: update all routine references to point to the existing app
            console.log(`Merging ${app.name} (${app.id}) into existing app (${existingApp.id})`);
            
            // Get all routine references for the duplicate app
            const routineApps = await prisma.routineApp.findMany({
              where: { appId: app.id }
            });
            
            for (const routineApp of routineApps) {
              // Check if this routine already has the existing app
              const existingRoutineApp = await prisma.routineApp.findUnique({
                where: {
                  routineId_appId: {
                    routineId: routineApp.routineId,
                    appId: existingApp.id
                  }
                }
              });
              
              if (existingRoutineApp) {
                // Routine already has the app, just delete the duplicate reference
                await prisma.routineApp.delete({
                  where: {
                    routineId_appId: {
                      routineId: routineApp.routineId,
                      appId: app.id
                    }
                  }
                });
              } else {
                // Update the reference to point to the existing app
                await prisma.routineApp.update({
                  where: {
                    routineId_appId: {
                      routineId: routineApp.routineId,
                      appId: app.id
                    }
                  },
                  data: { appId: existingApp.id }
                });
              }
            }
            
            // Delete the duplicate app
            await prisma.app.delete({
              where: { id: app.id }
            });
            
            mergedCount++;
            continue;
          }
        }
        
        // Update app with domain information
        const updateData: any = {
          domains: domainInfo.domains,
          isUserSubmitted: false
        };
        
        if (domainInfo.androidPackageName) {
          updateData.androidPackageName = domainInfo.androidPackageName;
        }
        if (domainInfo.iosBundleId) {
          updateData.iosBundleId = domainInfo.iosBundleId;
        }
        if (domainInfo.category) {
          updateData.category = domainInfo.category;
        }
        
        await prisma.app.update({
          where: { id: app.id },
          data: updateData
        });
        
        console.log(`Updated ${app.name} with domains: ${domainInfo.domains.join(', ')}`);
        updatedCount++;
        processedApps.add(matchingKey);
      } else {
        console.log(`No domain mapping found for: ${app.name}`);
      }
    }
    
    // After processing existing apps, create new apps for any missing ones
    console.log('\nChecking for apps to create...');
    for (const [appName, domainInfo] of Object.entries(appDomainMappings)) {
      if (!processedApps.has(appName)) {
        // Check if app exists with the package name
        let existingApp = null;
        if (domainInfo.androidPackageName) {
          existingApp = await prisma.app.findUnique({
            where: { androidPackageName: domainInfo.androidPackageName }
          });
        }
        if (!existingApp && domainInfo.iosBundleId) {
          existingApp = await prisma.app.findUnique({
            where: { iosBundleId: domainInfo.iosBundleId }
          });
        }
        
        if (!existingApp) {
          // Create new app
          await prisma.app.create({
            data: {
              name: appName,
              domains: domainInfo.domains,
              androidPackageName: domainInfo.androidPackageName,
              iosBundleId: domainInfo.iosBundleId,
              category: domainInfo.category,
              isUserSubmitted: false
            }
          });
          console.log(`Created new app: ${appName}`);
          createdCount++;
        }
      }
    }
    
    console.log(`\nUpdate complete!`);
    console.log(`- Updated: ${updatedCount} apps`);
    console.log(`- Merged: ${mergedCount} duplicate apps`);
    console.log(`- Created: ${createdCount} new apps`);
    
  } catch (error) {
    console.error('Error updating app domains:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the update
updateAppDomains();