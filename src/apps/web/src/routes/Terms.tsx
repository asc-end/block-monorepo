import { Box, Text, Modal } from "@blockit/cross-ui-toolkit";
import { darkColors } from "@blockit/ui";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { Smartphone, Globe, Apple } from "lucide-react";

export default function Terms() {
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
          Terms of Service
        </Text>
        <Text variant="body" className="text-lg mb-12" style={{ color: darkColors.text.soft }}>
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>

        <Box className="space-y-8">
          {/* Introduction */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              1. Introduction
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              Welcome to Blockit ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website, mobile applications, browser extensions, and related services (collectively, the "Service"). By accessing or using Blockit, you agree to be bound by these Terms.
            </Text>
          </Box>

          {/* Account Registration */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              2. Account Registration
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              To use certain features of Blockit, you must create an account by connecting your cryptocurrency wallet. You are responsible for:
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Maintaining the security of your wallet and private keys
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • All activities that occur under your account
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Ensuring your account information is accurate and up-to-date
              </Text>
            </Box>
          </Box>

          {/* Use of Service */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              3. Use of Service
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              You may use Blockit for lawful purposes only. You agree not to:
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Violate any applicable laws or regulations
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Interfere with or disrupt the Service or servers
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Attempt to gain unauthorized access to any portion of the Service
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Use the Service to transmit malware or harmful code
              </Text>
            </Box>
          </Box>

          {/* Blockchain Interactions */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              4. Blockchain Interactions and Stakes
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              When using Blockit's staking features:
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • All blockchain transactions are irreversible
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • You understand that staked SOL may be forfeited if you fail to meet your commitments
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • We charge a 10% protocol fee on forfeited stakes
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • You are responsible for all gas fees and transaction costs
              </Text>
            </Box>
          </Box>

          {/* Data and Privacy */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              5. Data and Privacy
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              Your use of Blockit is also governed by our Privacy Policy. By using the Service, you consent to:
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Collection of app usage data for productivity tracking
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Anonymization and aggregation of data for marketplace features
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Storage of your preferences and settings
              </Text>
            </Box>
          </Box>

          {/* Intellectual Property */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              6. Intellectual Property
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              All content, features, and functionality of Blockit are owned by us or our licensors and are protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
            </Text>
          </Box>

          {/* Disclaimers */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              7. Disclaimers
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
            </Text>
          </Box>

          {/* Limitation of Liability */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              8. Limitation of Liability
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, BLOCKIT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR FUNDS, ARISING FROM YOUR USE OF THE SERVICE.
            </Text>
          </Box>

          {/* Modifications */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              9. Modifications
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of Blockit after changes constitutes acceptance of the modified Terms.
            </Text>
          </Box>

          {/* Governing Law */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              10. Governing Law
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
            </Text>
          </Box>

          {/* Contact */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              11. Contact Information
            </Text>
            <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
              If you have any questions about these Terms, please contact us on Telegram:
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