import { Box, Text, Button, Modal } from "@blockit/cross-ui-toolkit";
import { Brain, Smartphone, Globe, Apple, Lock, Sparkles, ArrowRight, Clock as ClockIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Rays } from "@blockit/ui";
import { darkColors } from "@blockit/ui";
import { Header, Footer, FeatureCard, PlatformBadge, MarketplaceFeatureCard } from "../components";

export default function Home() {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [barsOpen, setBarsOpen] = useState(false);
  const [focusProgress, setFocusProgress] = useState(0);
  const [dataProgress, setDataProgress] = useState({ instagram: 0, twitter: 0, youtube: 0 });
  const ctaRef = useRef<HTMLDivElement>(null);
  const focusSectionRef = useRef<HTMLDivElement>(null);
  const dataSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBarsOpen(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate focus session progress
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate progress bar
            const timer = setTimeout(() => {
              setFocusProgress(40);
            }, 300);
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (focusSectionRef.current) {
      observer.observe(focusSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate data usage bars
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the animations
            const timer1 = setTimeout(() => {
              setDataProgress(prev => ({ ...prev, instagram: 75 }));
            }, 200);
            const timer2 = setTimeout(() => {
              setDataProgress(prev => ({ ...prev, twitter: 50 }));
            }, 400);
            const timer3 = setTimeout(() => {
              setDataProgress(prev => ({ ...prev, youtube: 35 }));
            }, 600);
            return () => {
              clearTimeout(timer1);
              clearTimeout(timer2);
              clearTimeout(timer3);
            };
          }
        });
      },
      { threshold: 0.3 }
    );

    if (dataSectionRef.current) {
      observer.observe(dataSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Header */}
      <Header showDownloadModal={() => setShowDownloadModal(true)} />

      <Box className="min-h-screen w-full overflow-x-hidden flex flex-col justify-start" style={{ backgroundColor: darkColors.background }}>
        {/* Dynamic Gradient Background */}
        <div className="fixed inset-0" style={{ backgroundColor: darkColors.background }}>
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, ${darkColors.pop.purple}15 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, ${darkColors.pop.violet}10 0%, transparent 40%),
              radial-gradient(circle at 50% 0%, ${darkColors.secondary[500]}08 0%, transparent 60%)
            `
          }} />
          {/* Rays Background */}
          <Box className="absolute inset-0 opacity-5">
            <Rays size={1000} color={darkColors.pop.purple} />
          </Box>
        </div>
        {/* Hero Section */}
        <Box id="hero" className="relative min-h-screen flex items-center justify-center px-4 py-20 md:py-0">
          <Box className="max-w-7xl mx-auto w-full">
            <Box className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left side - Text content */}
              <Box className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">

                <Text variant="h1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight relative" style={{
                  fontFamily: 'ClashDisplay',
                  color: darkColors.text.main
                }}>
                  Block the noise,
                  <Box className="block mt-2">
                    <span className="bg-clip-text text-transparent" style={{
                      backgroundImage: `linear-gradient(135deg, ${darkColors.pop.purple}, ${darkColors.pop.violet}, ${darkColors.pop.magenta})`,
                    }}>earn the time.</span>
                  </Box>
                </Text>
                <Text variant="body" className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-xl leading-relaxed" style={{
                  color: darkColors.text.soft
                }}>
                  The only focus app that puts your money where your goals are.
                  Block distractions, stake SOL, and build unbreakable habits.
                </Text>
                <Box>
                  <Button
                    onPress={() => setShowDownloadModal(true)}
                    variant="primary"
                    title="Download Now"
                    className="group"
                    rightIcon={<ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} color="white" />}
                  />
                </Box>


                {/* Platform availability */}
                <Box className="flex flex-row gap-4 items-center justify-center pt-4">
                  <PlatformBadge icon={<Globe size={18} />} name="Chrome" iconColor={darkColors.pop.indigo} />
                  <PlatformBadge icon={<Globe size={18} />} name="Firefox" iconColor={darkColors.pop.yellow} />
                  <PlatformBadge icon={<Apple size={18} />} name="iOS" iconColor={darkColors.secondary[400]} />
                  <PlatformBadge icon={<Smartphone size={18} />} name="Android" iconColor={darkColors.primary[400]} />
                  <Box className="text-nowrap">
                    <PlatformBadge icon={<Smartphone size={18} />} name="Solana Mobile" iconColor={darkColors.pop.purple} />
                  </Box>
                </Box>
              </Box>

              {/* Right side - Visual element - Hidden on mobile */}
              <Box className="hidden lg:block lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2 xl:w-[100%]">
                <Box className="relative w-full max-w-3xl mx-auto lg:mx-0 lg:ml-auto">
                  <img 
                    src="/onboarding.png" 
                    className="w-full h-auto lg:scale-125 xl:scale-[1.75] 2xl:scale-[2] translate-y-[10%] lg:translate-y-[50%] xl:translate-y-[25%] xl:-translate-x-[25%] 2xl:translate-y-[5%] 2xl:-translate-x-[25%]"
                    style={{
                      filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))'
                    }}
                  />
                  {/* Gradient overlay */}
                  <Box className="absolute inset-0 rounded-full opacity-20 blur-3xl pointer-events-none" style={{
                    background: `radial-gradient(circle at 50% 50%, ${darkColors.pop.purple}40, ${darkColors.pop.violet}20, transparent)`
                  }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Focus Sessions Section */}
        <Box ref={focusSectionRef} id="focus-sessions" className="relative py-16 md:py-32 overflow-hidden" >
          <Box className="max-w-7xl mx-auto px-4">
            <Box className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <Box className="relative">
                <Box className="absolute -inset-20 opacity-20 blur-3xl" style={{
                  background: `radial-gradient(circle, ${darkColors.pop.purple}40, transparent)`
                }} />
                <FeatureCard
                  icon={<ClockIcon className="text-white" size={24} />}
                  title="Focus Sessions"
                  description="Create custom focus sessions tailored to your workflow. Set specific time blocks where distracting apps and websites are automatically blocked, helping you maintain deep focus."
                  gradientFrom={darkColors.pop.purple}
                  gradientTo={darkColors.pop.violet}
                  features={[
                    "Pomodoro timer with customizable intervals",
                    "Schedule recurring focus blocks",
                    "Track focus time and build streaks"
                  ]}
                  featureColors={[darkColors.pop.purple, darkColors.pop.violet, darkColors.pop.magenta]}
                />
              </Box>
              <Box className="relative">
                <Box className="relative animate-float">
                  <Box className="w-full h-64 md:h-96 rounded-2xl p-6 md:p-8 flex flex-col justify-center backdrop-blur-2xl" style={{
                    background: `linear-gradient(135deg, ${darkColors.pop.purple}10, ${darkColors.pop.violet}10)`,
                    border: `2px solid ${darkColors.pop.purple}30`,
                    boxShadow: `0 20px 40px ${darkColors.pop.purple}10`
                  }}>
                    {/* Timer Display */}
                    <Box className="text-center mb-6">
                      <Text variant="h1" className="text-5xl md:text-7xl font-bold mb-2" style={{
                        color: darkColors.pop.purple,
                        textShadow: `0 0 20px ${darkColors.pop.purple}40`
                      }}>25:00</Text>
                      <Text variant="caption" className="text-sm uppercase tracking-wider" style={{ color: darkColors.pop.violet }}>
                        Deep Work Mode
                      </Text>
                    </Box>

                    {/* Blocked Apps */}
                    <Box className="flex gap-3 justify-center mb-6">
                      <Box className="px-3 py-1.5 rounded-lg" style={{
                        backgroundColor: darkColors.pop.purple + '20',
                        border: `1px solid ${darkColors.pop.purple}30`
                      }}>
                        <Text className="text-xs font-medium" style={{ color: darkColors.text.soft }}>
                          Instagram
                        </Text>
                      </Box>
                      <Box className="px-3 py-1.5 rounded-lg" style={{
                        backgroundColor: darkColors.pop.violet + '20',
                        border: `1px solid ${darkColors.pop.violet}30`
                      }}>
                        <Text className="text-xs font-medium" style={{ color: darkColors.text.soft }}>
                          Twitter
                        </Text>
                      </Box>
                      <Box className="px-3 py-1.5 rounded-lg" style={{
                        backgroundColor: darkColors.pop.magenta + '20',
                        border: `1px solid ${darkColors.pop.magenta}30`
                      }}>
                        <Text className="text-xs font-medium" style={{ color: darkColors.text.soft }}>
                          YouTube
                        </Text>
                      </Box>
                    </Box>

                    {/* Progress Ring */}
                    <Box className="relative w-full">
                      <Box className="w-full rounded-full h-3 overflow-hidden" style={{
                        backgroundColor: darkColors.neutral[800]
                      }}>
                        <Box className="h-full rounded-full transition-all duration-1000 ease-out" style={{
                          width: `${focusProgress}%`,
                          background: `linear-gradient(90deg, ${darkColors.pop.purple}, ${darkColors.pop.violet})`,
                          boxShadow: `0 0 10px ${darkColors.pop.purple}40`
                        }} />
                      </Box>
                      <Box className="flex justify-between mt-3">
                        <Text className="text-xs" style={{ color: darkColors.text.soft }}>
                          10:00 elapsed
                        </Text>
                        <Text className="text-xs" style={{ color: darkColors.text.soft }}>
                          15:00 remaining
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Uncheatable Stakes Section */}
        <Box id="stakes" className="relative py-16 md:py-32 overflow-hidden" >
          <Box className="max-w-7xl mx-auto px-4">
            <Box className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <Box className="order-2 lg:order-1 relative">
                <Box className="relative animate-float">
                  <Box className="w-full h-64 md:h-96 rounded-2xl p-6 md:p-8 flex flex-col justify-center" style={{
                    background: `linear-gradient(135deg, ${darkColors.pop.yellow}20, ${darkColors.pop.magenta}20)`,
                    border: `1px solid ${darkColors.pop.yellow}50`
                  }}>
                    <Text variant="h2" className="text-3xl md:text-4xl font-bold mb-4" style={{ color: darkColors.text.main }}>1.0 SOL</Text>
                    <Text variant="body" className="mb-6" style={{ color: darkColors.text.soft }}>
                      No Instagram for 30 days
                    </Text>
                    <Box className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
                      <Box className="h-full rounded-full transition-all" style={{
                        width: '73%',
                        background: `linear-gradient(90deg, ${darkColors.pop.yellow}, ${darkColors.pop.magenta})`
                      }} />
                    </Box>
                    <Text variant="caption" className="mt-2" style={{ color: darkColors.text.soft }}>22 of 30 days completed</Text>
                  </Box>
                </Box>
              </Box>
              <Box className="order-1 lg:order-2 relative">
                <Box className="absolute -inset-20 opacity-20 blur-3xl" style={{
                  background: `radial-gradient(circle, ${darkColors.pop.yellow}40, transparent)`
                }} />
                <FeatureCard
                  icon={<Lock className="text-white" size={24} />}
                  title="Uncheatable Stakes"
                  description="Put your money where your goals are. Stake SOL on your commitments - one stake per challenge. Complete it and get 100% back. Fail, and lose it all."
                  gradientFrom={darkColors.pop.yellow}
                  gradientTo={darkColors.pop.magenta}
                  features={[
                    "100% return on success",
                    "0% return on failure",
                    "Automatic forfeit on cheating"
                  ]}
                  featureColors={[darkColors.pop.yellow, darkColors.pop.magenta, darkColors.pop.purple]}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Cross-Platform Section */}
        <Box id="cross-platform" className="relative py-16 md:py-32" style={{ backgroundColor: darkColors.surface.elevated + "40" }}>
          <Box className="max-w-7xl mx-auto px-4">
            <Box className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <Box className="relative">
                <Box className="absolute -inset-20 opacity-20 blur-3xl" style={{
                  background: `radial-gradient(circle, ${darkColors.primary[500]}40, transparent)`
                }} />
                <FeatureCard
                  icon={<Globe className="text-white" size={24} />}
                  title="Cross-Platform"
                  description="One account, all your devices. Blockit works seamlessly across iOS, Android, Solana Mobile, Chrome, Firefox, and web, ensuring you stay focused no matter which device you're using."
                  gradientFrom={darkColors.primary[500]}
                  gradientTo={darkColors.primary[600]}
                  features={[
                    "Real-time sync across devices",
                    "Native mobile app blocking",
                    "Browser extension for web blocking"
                  ]}
                  featureColors={[darkColors.primary[500], darkColors.primary[600], darkColors.pop.indigo]}
                />
              </Box>
              <Box className="relative">
                <Box className="relative">
                  {/* MacBook Image */}
                  <img
                    src="/macbook.png"
                    alt="Blockit on MacBook"
                    className="w-full h-auto"
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))' }}
                  />

                  {/* Seeker Phone Image floating independently */}
                  <Box className="absolute -bottom-6 md:-bottom-10 right-0 lg:-right-24 w-1/3 md:w-1/2">
                    <img
                      src="/seeker.png"
                      alt="Blockit on Phone"
                      className="w-full h-auto"
                      style={{
                        filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))'
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Digital Life Insights Section */}
        <Box ref={dataSectionRef} id="insights" className="relative py-16 md:py-32">
          <Box className="max-w-7xl mx-auto px-4">
            <Box className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <Box className="order-2 lg:order-1 relative">
                <Box className="relative animate-float">
                  <Box className="w-full h-64 md:h-96 rounded-2xl p-6 md:p-8" style={{
                    background: darkColors.surface.card,
                    border: `1px solid ${darkColors.neutral[800]}`
                  }}>
                    <Box className="flex justify-between items-start mb-6">
                      <Text variant="caption" className="text-xs font-medium uppercase tracking-widest" style={{ color: darkColors.text.soft }}>Cross-Platform Insights</Text>
                      <Box className="flex gap-2">
                        <Box className="w-2 h-2 rounded-full" style={{ backgroundColor: darkColors.pop.indigo }} title="Desktop" />
                        <Box className="w-2 h-2 rounded-full" style={{ backgroundColor: darkColors.primary[400] }} title="Mobile" />
                      </Box>
                    </Box>
                    <Box className="space-y-4">
                      <Box>
                        <Box className="flex justify-between mb-2">
                          <Box className="flex items-center gap-2">
                            <Text variant="body" style={{ color: darkColors.text.main }}>Instagram</Text>
                            <Box className="flex gap-1">
                              <Globe size={12} style={{ color: darkColors.pop.indigo }} />
                              <Smartphone size={12} style={{ color: darkColors.primary[400] }} />
                            </Box>
                          </Box>
                          <Text variant="body" style={{ color: darkColors.pop.magenta }}>12h 30m</Text>
                        </Box>
                        <Box className="w-full rounded-full h-2 overflow-hidden" style={{
                          backgroundColor: darkColors.neutral[900]
                        }}>
                          <Box className="h-full rounded-full relative transition-all duration-1000 ease-out" style={{
                            width: `${dataProgress.instagram}%`,
                            backgroundColor: darkColors.pop.magenta
                          }}>
                            <Box className="absolute inset-0 flex">
                              <Box className="h-full" style={{ width: '40%', backgroundColor: darkColors.pop.indigo, opacity: 0.3 }} />
                              <Box className="h-full" style={{ width: '60%', backgroundColor: darkColors.primary[400], opacity: 0.3 }} />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Box className="flex justify-between mb-2">
                          <Box className="flex items-center gap-2">
                            <Text variant="body" style={{ color: darkColors.text.main }}>Twitter</Text>
                            <Box className="flex gap-1">
                              <Globe size={12} style={{ color: darkColors.pop.indigo }} />
                            </Box>
                          </Box>
                          <Text variant="body" style={{ color: darkColors.pop.purple }}>8h 15m</Text>
                        </Box>
                        <Box className="w-full rounded-full h-2 overflow-hidden" style={{
                          backgroundColor: darkColors.neutral[900]
                        }}>
                          <Box className="h-full rounded-full transition-all duration-1000 ease-out" style={{
                            width: `${dataProgress.twitter}%`,
                            backgroundColor: darkColors.pop.purple,
                            transitionDelay: '200ms'
                          }} />
                        </Box>
                      </Box>
                      <Box>
                        <Box className="flex justify-between mb-2">
                          <Box className="flex items-center gap-2">
                            <Text variant="body" style={{ color: darkColors.text.main }}>YouTube</Text>
                            <Box className="flex gap-1">
                              <Globe size={12} style={{ color: darkColors.pop.indigo }} />
                              <Smartphone size={12} style={{ color: darkColors.primary[400] }} />
                            </Box>
                          </Box>
                          <Text variant="body" style={{ color: darkColors.pop.indigo }}>5h 45m</Text>
                        </Box>
                        <Box className="w-full rounded-full h-2 overflow-hidden" style={{
                          backgroundColor: darkColors.neutral[900]
                        }}>
                          <Box className="h-full rounded-full relative transition-all duration-1000 ease-out" style={{
                            width: `${dataProgress.youtube}%`,
                            backgroundColor: darkColors.pop.indigo,
                            transitionDelay: '400ms'
                          }}>
                            <Box className="absolute inset-0 flex">
                              <Box className="h-full" style={{ width: '70%', backgroundColor: darkColors.pop.indigo, opacity: 0.3 }} />
                              <Box className="h-full" style={{ width: '30%', backgroundColor: darkColors.primary[400], opacity: 0.3 }} />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box className="mt-6 pt-4 border-t" style={{ borderColor: darkColors.neutral[800] }}>
                      <Text variant="caption" className="text-xs" style={{ color: darkColors.text.verySoft }}>
                        Synced across all your devices
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className="order-1 lg:order-2 relative">
                <Box className="absolute -inset-20 opacity-20 blur-3xl" style={{
                  background: `radial-gradient(circle, ${darkColors.pop.indigo}40, transparent)`
                }} />
                <FeatureCard
                  icon={<Brain className="text-white" size={24} />}
                  title="Digital Life Insights"
                  description="Understand your digital habits with detailed analytics. Track time spent on apps and websites, identify patterns, and make informed decisions about your digital life."
                  gradientFrom={darkColors.pop.indigo}
                  gradientTo={darkColors.secondary[500]}
                  features={[
                    "Weekly and monthly reports",
                    "Usage trends and patterns",
                    "Export data for deeper analysis"
                  ]}
                  featureColors={[darkColors.pop.indigo, darkColors.secondary[500], darkColors.pop.purple]}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Data Marketplace Section */}
        <Box id="marketplace" className="relative py-16 md:py-32 overflow-hidden" style={{
          background: `linear-gradient(180deg, ${darkColors.background} 0%, ${darkColors.surface.elevated}50 50%, ${darkColors.background} 100%)`
        }}>
          {/* Animated background elements */}
          <Box className="absolute inset-0">
            <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] animate-pulse" style={{
              background: `radial-gradient(circle, ${darkColors.pop.yellow}30, ${darkColors.pop.purple}10, transparent)`,
              filter: 'blur(100px)'
            }} />
            <Box className="absolute top-20 left-10 w-64 h-64 animate-float" style={{
              background: `radial-gradient(circle, ${darkColors.pop.magenta}20, transparent)`,
              filter: 'blur(80px)'
            }} />
            <Box className="absolute bottom-20 right-10 w-96 h-96 animate-float" style={{
              background: `radial-gradient(circle, ${darkColors.pop.purple}20, transparent)`,
              filter: 'blur(80px)',
              animationDelay: '2s'
            }} />
          </Box>

          <Box className="relative max-w-7xl mx-auto px-4 z-10">
            <Box className="text-center mb-20">

              <Text variant="h1" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-none" style={{
                fontFamily: 'ClashDisplay',
                letterSpacing: '-0.02em'
              }}>
                <Box className="block mb-2">
                  <span className="bg-clip-text text-transparent" style={{
                    backgroundImage: `linear-gradient(90deg, ${darkColors.text.main}, ${darkColors.pop.yellow})`,
                  }}>YOUR DATA</span>
                </Box>
                <Box className="block">
                  <span className="bg-clip-text text-transparent animate-gradient" style={{
                    backgroundImage: `linear-gradient(90deg, ${darkColors.pop.yellow}, ${darkColors.pop.purple}, ${darkColors.pop.magenta}, ${darkColors.pop.yellow})`,
                    backgroundSize: '200% 100%'
                  }}>IS GOLD</span>
                </Box>
              </Text>

              <Text variant="h3" className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed" style={{
                color: darkColors.text.soft,
                fontWeight: 300
              }}>
                Big Tech made <span style={{ color: darkColors.pop.yellow }}>billions</span> from your clicks.
                <Box className="block mt-2">
                  Time to <span className="font-bold" style={{ color: darkColors.text.main }}>flip the script</span> and get your cut.
                </Box>
              </Text>
            </Box>

            {/* Key Features Grid */}
            <Box className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
              <MarketplaceFeatureCard
                icon={<Lock size={32} />}
                title="Sell Usage Data"
                description="Your app usage patterns are valuable. Sell aggregated, anonymized data while maintaining complete privacy."
                gradientFrom={darkColors.pop.yellow}
                gradientTo={darkColors.pop.purple}
                borderColor={darkColors.pop.yellow}
                iconColor={darkColors.pop.yellow}
              />
              <MarketplaceFeatureCard
                icon={<Globe size={32} />}
                title="Time-Limited Access"
                description="Buyers purchase access to aggregated insights for specific time periods. Your data stays secure and valuable."
                gradientFrom={darkColors.pop.purple}
                gradientTo={darkColors.pop.magenta}
                borderColor={darkColors.pop.purple}
                iconColor={darkColors.pop.purple}
              />
              <MarketplaceFeatureCard
                icon={<Sparkles size={32} />}
                title="Claim Your Revenue"
                description="Get your fair share directly. No platform fees, no hidden cuts. 100% of revenue goes to your wallet."
                gradientFrom={darkColors.pop.magenta}
                gradientTo={darkColors.pop.yellow}
                borderColor={darkColors.pop.magenta}
                iconColor={darkColors.pop.magenta}
              />
            </Box>
          </Box>
        </Box>

        {/* CTA Section */}
        <Box ref={ctaRef} className="relative py-16 md:py-32 overflow-hidden" style={{
          background: `linear-gradient(135deg, ${darkColors.pop.purple}, ${darkColors.pop.magenta})`,
        }}>
          {/* Prison bars */}
          <Box className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            <Box className="absolute inset-0 flex justify-between">
              {[...Array(10)].map((_, i) => {
                // Calculate delay based on distance from center
                const centerIndex = 4.5;
                const distanceFromCenter = Math.abs(i - centerIndex);
                const delay = distanceFromCenter * 150;

                return (
                  <Box
                    key={i}
                    className="transition-transform duration-2000 ease-in-out"
                    style={{
                      position: 'relative',
                      width: '40px',
                      height: '100%',
                      background: `linear-gradient(90deg, 
                        ${darkColors.neutral[900]} 0%, 
                        ${darkColors.neutral[800]} 15%, 
                        ${darkColors.neutral[600]} 40%, 
                        ${darkColors.neutral[500]} 50%, 
                        ${darkColors.neutral[600]} 60%, 
                        ${darkColors.neutral[800]} 85%, 
                        ${darkColors.neutral[900]} 100%)`,
                      boxShadow: `
                        inset 0 0 20px rgba(0, 0, 0, 0.8),
                        0 0 30px rgba(0, 0, 0, 0.6),
                        -2px 0 4px rgba(255, 255, 255, 0.2),
                        2px 0 4px rgba(0, 0, 0, 0.4)
                      `,
                      transform: barsOpen
                        ? i < 5
                          ? `translateX(calc(-100vw - 100px))`
                          : `translateX(calc(100vw + 100px))`
                        : 'translateX(0)',
                      transitionDelay: `${delay}ms`
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          <Box className="relative mx-auto px-4 py-16 text-center z-10">
            <Box className="relative">
              <Text variant="h1" className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 md:mb-8 leading-none transition-all duration-1000" style={{
                fontFamily: 'ClashDisplay',
                letterSpacing: '-0.03em',
                color: darkColors.white,
                opacity: barsOpen ? 1 : 0.3,
                transform: barsOpen ? 'scale(1)' : 'scale(0.9)',
                transitionDelay: '800ms'
              }}>
                <Box className="block">
                  TIME TO
                </Box>
                <Box className="block">
                  BREAK FREE
                </Box>
              </Text>

              <Text variant="h3" className="text-2xl md:text-3xl max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000" style={{
                fontWeight: 400,
                color: darkColors.white,
                opacity: barsOpen ? 0.9 : 0,
                transform: barsOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '1200ms'
              }}>
                Your focus is worth more than their algorithms.
                <Box className="block mt-2">
                  <span className="font-bold">Take it back.</span>
                </Box>
              </Text>

              <Box className="inline-block" style={{
                opacity: barsOpen ? 1 : 0,
                transform: barsOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 1s ease-out',
                transitionDelay: '1400ms'
              }}>
                <Button
                  onPress={() => setShowDownloadModal(true)}
                  title="START YOUR REVOLUTION"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={24} style={{ color: "#FFF" }} />}
                  style={{
                    backgroundColor: darkColors.surface.card,
                    color: darkColors.white
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>

      {/* Download Modal - Outside main container */}
      <Modal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        size="md"
        closeOnOverlayClick={true}
        showCloseButton={true}
      >

            <Text variant="h2" className="text-3xl font-bold mb-6" style={{
              fontFamily: 'ClashDisplay',
              color: darkColors.text.main
            }}>
              Download Blockit
            </Text>

            <Box className="space-y-4">
              {/* iOS */}
              <Box className="relative flex items-center gap-4 p-4 rounded-xl opacity-80 cursor-not-allowed" style={{
                backgroundColor: darkColors.surface.card,
                border: `1px solid ${darkColors.neutral[800]}`
              }}>
                <Box className="absolute top-2 right-2 px-2 py-1 rounded-md" style={{
                  backgroundColor: darkColors.neutral[800],
                  fontSize: '10px'
                }}>
                  <Text className="text-xs font-medium" style={{ color: darkColors.text.soft }}>COMING SOON</Text>
                </Box>
                <Apple size={32} style={{ color: darkColors.secondary[400], opacity: 0.7 }} />
                <Box className="flex-1">
                  <Text variant="body" className="font-semibold" style={{ color: darkColors.text.soft }}>iOS App</Text>
                  <Text variant="caption" className="text-sm" style={{ color: darkColors.text.verySoft }}>Download from App Store</Text>
                </Box>
              </Box>

              {/* Android */}
              <Box className="relative flex items-center gap-4 p-4 rounded-xl opacity-80 cursor-not-allowed" style={{
                backgroundColor: darkColors.surface.card,
                border: `1px solid ${darkColors.neutral[800]}`
              }}>
                <Box className="absolute top-2 right-2 px-2 py-1 rounded-md" style={{
                  backgroundColor: darkColors.neutral[800],
                  fontSize: '10px'
                }}>
                  <Text className="text-xs font-medium" style={{ color: darkColors.text.soft }}>COMING SOON</Text>
                </Box>
                <Smartphone size={32} style={{ color: darkColors.primary[400], opacity: 0.7 }} />
                <Box className="flex-1">
                  <Text variant="body" className="font-semibold" style={{ color: darkColors.text.soft }}>Android App</Text>
                  <Text variant="caption" className="text-sm" style={{ color: darkColors.text.verySoft }}>Get it on Google Play</Text>
                </Box>
              </Box>


              {/* Solana Mobile */}
              <Box className="relative flex items-center gap-4 p-4 rounded-xl opacity-80 cursor-not-allowed" style={{
                backgroundColor: darkColors.surface.card,
                border: `1px solid ${darkColors.neutral[800]}`
              }}>
                <Box className="absolute top-2 right-2 px-2 py-1 rounded-md" style={{
                  backgroundColor: darkColors.neutral[800],
                  fontSize: '10px'
                }}>
                  <Text className="text-xs font-medium" style={{ color: darkColors.text.soft }}>COMING SOON</Text>
                </Box>
                <Smartphone size={32} style={{ color: darkColors.pop.purple, opacity: 0.7 }} />
                <Box className="flex-1">
                  <Text variant="body" className="font-semibold" style={{ color: darkColors.text.soft }}>Solana Mobile</Text>
                  <Text variant="caption" className="text-sm" style={{ color: darkColors.text.verySoft }}>Get on Solana dApp Store</Text>
                </Box>
              </Box>

              {/* Chrome */}
              <Box className="relative flex items-center gap-4 p-4 rounded-xl opacity-80 cursor-not-allowed" style={{
                backgroundColor: darkColors.surface.card,
                border: `1px solid ${darkColors.neutral[800]}`
              }}>
                <Box className="absolute top-2 right-2 px-2 py-1 rounded-md" style={{
                  backgroundColor: darkColors.neutral[800],
                  fontSize: '10px'
                }}>
                  <Text className="text-xs font-medium" style={{ color: darkColors.text.soft }}>COMING SOON</Text>
                </Box>
                <Globe size={32} style={{ color: darkColors.pop.indigo, opacity: 0.7 }} />
                <Box className="flex-1">
                  <Text variant="body" className="font-semibold" style={{ color: darkColors.text.soft }}>Chrome Extension</Text>
                  <Text variant="caption" className="text-sm" style={{ color: darkColors.text.verySoft }}>Add to Chrome</Text>
                </Box>
              </Box>

              {/* Firefox */}
              <Box className="relative flex items-center gap-4 p-4 rounded-xl opacity-80 cursor-not-allowed" style={{
                backgroundColor: darkColors.surface.card,
                border: `1px solid ${darkColors.neutral[800]}`
              }}>
                <Box className="absolute top-2 right-2 px-2 py-1 rounded-md" style={{
                  backgroundColor: darkColors.neutral[800],
                  fontSize: '10px'
                }}>
                  <Text className="text-xs font-medium" style={{ color: darkColors.text.soft }}>COMING SOON</Text>
                </Box>
                <Globe size={32} style={{ color: darkColors.pop.yellow, opacity: 0.7 }} />
                <Box className="flex-1">
                  <Text variant="body" className="font-semibold" style={{ color: darkColors.text.soft }}>Firefox Add-on</Text>
                  <Text variant="caption" className="text-sm" style={{ color: darkColors.text.verySoft }}>Add to Firefox</Text>
                </Box>
              </Box>
            </Box>
      </Modal>
    </>
  );
}