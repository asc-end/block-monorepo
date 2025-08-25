import { Box, Text, Modal } from "@blockit/cross-ui-toolkit";
import { darkColors } from "@blockit/ui";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { Smartphone, Globe, Apple } from "lucide-react";

export default function License() {
  const [showDownloadModal, setShowDownloadModal] = useState(false);

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
        </div>

        {/* Content */}
        <Box className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 z-10">
        <Text variant="h1" className="text-4xl md:text-5xl font-bold mb-4" style={{
          fontFamily: 'ClashDisplay',
          color: darkColors.text.main
        }}>
          License & Copyright
        </Text>
        <Text variant="body" className="text-lg mb-12" style={{ color: darkColors.text.soft }}>
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>

        <Box className="space-y-8">
          {/* Copyright Notice */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              Copyright Notice
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              © {new Date().getFullYear()} Blockit. All rights reserved.
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              The Blockit name, logo, and all related product and service names, design marks, and slogans are trademarks or service marks of Blockit. All other product and service names mentioned are the trademarks of their respective owners.
            </Text>
          </Box>

          {/* License Grant */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              1. License Grant
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              Subject to the terms and conditions of this Agreement, Blockit hereby grants you a limited, non-exclusive, non-transferable, revocable license to use the Blockit software (the "Software") solely for your personal or internal business purposes.
            </Text>
          </Box>

          {/* Scope of License */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              2. Scope of License
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              This license allows you to:
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Install and use the Software on multiple devices you own or control
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Access all features available in your subscription tier
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Sync your data across all supported platforms
              </Text>
            </Box>
            <Text variant="body" className="leading-relaxed mt-4" style={{ color: darkColors.text.soft }}>
              This license does not allow you to:
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Modify, reverse engineer, or decompile the Software
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Sell, rent, lease, or sublicense the Software
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Remove or alter any proprietary notices
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Use the Software for any illegal or unauthorized purpose
              </Text>
            </Box>
          </Box>

          {/* Open Source Components */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              3. Open Source Components
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              The Software may include open source components licensed under various open source licenses. These components are governed by their respective licenses, which can be found in the Software documentation or source code.
            </Text>
          </Box>

          {/* Intellectual Property */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              4. Intellectual Property Rights
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              Blockit and its licensors retain all right, title, and interest in and to the Software, including all intellectual property rights. This Agreement does not grant you any rights to use Blockit's trademarks, logos, or other brand elements without prior written consent.
            </Text>
            <Text variant="body" className="leading-relaxed mb-4 mt-4" style={{ color: darkColors.text.soft }}>
              All content including but not limited to software code, user interface designs, documentation, graphics, logos, and algorithms is protected by copyright laws and international treaty provisions. Unauthorized reproduction or distribution of this content may result in severe civil and criminal penalties.
            </Text>
          </Box>

          {/* Updates and Support */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              5. Updates and Support
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              Blockit may provide updates, upgrades, bug fixes, and other modifications to the Software at its sole discretion. You agree that such updates may be automatically installed without prior notice. Support services, if any, are provided according to your subscription tier.
            </Text>
          </Box>

          {/* Data Collection */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              6. Data Collection and Privacy
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              The Software collects and processes data as described in our Privacy Policy. By using the Software, you consent to such data collection and processing. You retain ownership of your personal data and content.
            </Text>
          </Box>

          {/* Termination */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              7. Termination
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              This license is effective until terminated. Your rights under this license will terminate automatically without notice if you fail to comply with any of its terms. Upon termination, you must cease all use of the Software and destroy all copies.
            </Text>
          </Box>

          {/* Warranty Disclaimer */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              8. Warranty Disclaimer
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. BLOCKIT DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </Text>
          </Box>

          {/* Limitation of Liability */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              9. Limitation of Liability
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              IN NO EVENT SHALL BLOCKIT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SOFTWARE, EVEN IF BLOCKIT HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </Text>
          </Box>

          {/* Governing Law */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              10. Governing Law
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              This Agreement shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </Text>
          </Box>

          {/* Entire Agreement */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              11. Entire Agreement
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              This Agreement constitutes the entire agreement between you and Blockit regarding the Software and supersedes all prior or contemporaneous understandings regarding such subject matter.
            </Text>
          </Box>

          {/* DMCA Compliance */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              12. DMCA Compliance
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              Blockit respects the intellectual property rights of others. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with a notice containing the required information under the Digital Millennium Copyright Act.
            </Text>
          </Box>

          {/* Contact */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              13. Contact Information
            </Text>
            <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
              If you have any questions about this License Agreement, please contact us on Telegram:
            </Text>
            <a href="https://t.me/swaggy_marie" target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.primary[400] }}>
                @swaggy_marie
              </Text>
            </a>
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