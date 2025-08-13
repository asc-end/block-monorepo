import { Box, Text } from "@blockit/cross-ui-toolkit";
import { darkColors } from "@blockit/ui";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <Box className="relative border-t py-12 md:py-24 px-4 overflow-hidden" style={{ borderColor: darkColors.neutral[800], backgroundColor: darkColors.background }}>
      {/* Background decoration */}
      <Box className="absolute inset-0 opacity-5">
        <Box className="absolute -top-24 -right-24 w-96 h-96 rounded-full" style={{
          background: `radial-gradient(circle, ${darkColors.primary[500]}, transparent)`
        }} />
        <Box className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full" style={{
          background: `radial-gradient(circle, ${darkColors.secondary[500]}, transparent)`
        }} />
      </Box>

      <Box className="max-w-7xl mx-auto relative">
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-8 md:mb-16">
          {/* Brand Section */}
          <Box>
            <Text variant="h2" className="text-4xl font-bold mb-6" style={{
              fontFamily: 'ClashDisplay',
              color: darkColors.text.main
            }}>Blockit</Text>
            <Text variant="body" className="mb-6 md:mb-8 max-w-md leading-relaxed" style={{ color: darkColors.text.soft }}>
              Take control of your digital life. Block distractions, build better habits, and own your data.
            </Text>
            <Box className="flex items-center gap-6">
              <Box className="flex gap-3">
                <a href="https://x.com/blockit_sh" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:rotate-6" style={{
                  backgroundColor: darkColors.surface.card,
                  border: `1px solid ${darkColors.neutral[800]}`
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill={darkColors.text.main} />
                  </svg>
                </a>
                <a href="https://github.com/asc-end/blockit-monorepo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:rotate-6" style={{
                  backgroundColor: darkColors.surface.card,
                  border: `1px solid ${darkColors.neutral[800]}`
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill={darkColors.text.main} />
                  </svg>
                </a>
              </Box>
              <Box className="h-8 w-px" style={{ backgroundColor: darkColors.neutral[800] }} />
              <Text variant="caption" className="font-medium" style={{ color: darkColors.text.soft }}>
                Built on Solana
              </Text>
            </Box>
          </Box>

          {/* Links and Data Partnerships */}
          <Box className="flex flex-col md:flex-row gap-12 md:justify-end">
            {/* Legal Links */}
            <Box>
              <Text variant="caption" className="font-semibold mb-4 uppercase tracking-wider" style={{ color: darkColors.text.verySoft }}>
                Legal
              </Text>
              <Box className="space-y-3">
                <Link to="/privacy" className="block transition-all hover:translate-x-1" style={{ color: darkColors.text.soft }}>
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block transition-all hover:translate-x-1" style={{ color: darkColors.text.soft }}>
                  Terms of Service
                </Link>
              </Box>
            </Box>

            {/* Data Partnerships */}
            <Box>
              <Text variant="caption" className="font-semibold mb-4 uppercase tracking-wider" style={{ color: darkColors.text.verySoft }}>
                For Data Buyers
              </Text>
              <Box className="p-4 rounded-xl" style={{
                backgroundColor: darkColors.surface.card,
                border: `1px solid ${darkColors.neutral[800]}`
              }}>
                <Text variant="body" className="text-sm mb-2" style={{ color: darkColors.text.soft }}>
                  Interested in app usage insights?
                </Text>
                <a href="https://t.me/swaggy_marie" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3" style={{ color: darkColors.primary[400] }}>
                  @swaggy_marie
                  <ChevronRight size={16} />
                </a>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Box className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: darkColors.neutral[800] }}>
          <Text variant="caption" style={{ color: darkColors.text.verySoft }}>
            © 2025 Blockit. All rights reserved.
          </Text>
          <Box className="flex items-center gap-2">
            <Box className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: darkColors.primary[500] }} />
            <Text variant="caption" style={{ color: darkColors.text.verySoft }}>
              Blocking distractions since 2025
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}