import { Box, Text, Button } from "@blockit/cross-ui-toolkit";
import { darkColors } from "@blockit/ui";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface HeaderProps {
  showDownloadModal?: () => void;
}

export function Header({ showDownloadModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Check initial scroll position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll state when location changes
  useEffect(() => {
    setScrolled(window.scrollY > 20);
  }, [location]);

  return (
    <Box className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
      backgroundColor: scrolled ? `${darkColors.background}95` : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${darkColors.neutral[800]}` : 'none',
      transform: scrolled ? 'translateY(0)' : 'translateY(-2px)'
    }}>
      <Box className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src="/icon.png" alt="Blockit" className="w-8 h-8 md:w-10 md:h-10" />
          <Text variant="h3" className="text-xl md:text-2xl font-bold" style={{
            fontFamily: 'ClashDisplay',
            color: darkColors.text.main
          }}>Blockit</Text>
        </Link>

        {/* Navigation - Only show on home page */}
        {isHomePage && (
          <Box className="hidden md:flex items-center gap-8">
            <a href="#focus-sessions" className="transition-all hover:opacity-80" style={{ color: darkColors.text.soft }}>
              Focus Sessions
            </a>
            <a href="#stakes" className="transition-all hover:opacity-80" style={{ color: darkColors.text.soft }}>
              Stakes
            </a>
            <a href="#cross-platform" className="transition-all hover:opacity-80" style={{ color: darkColors.text.soft }}>
              Cross-Platform
            </a>
            <a href="#insights" className="transition-all hover:opacity-80" style={{ color: darkColors.text.soft }}>
              Insights
            </a>
            <a href="#marketplace" className="transition-all hover:opacity-80" style={{ color: darkColors.text.soft }}>
              Marketplace
            </a>
          </Box>
        )}

        {/* CTA Button */}
        <Box className="w-auto">
          {showDownloadModal ? (
            <Button
              onPress={showDownloadModal}
              title="Get Started"
              variant="primary"
              size="md"
            />
          ) : (
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                title="Get Started"
                variant="primary"
                size="md"
              />
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
}