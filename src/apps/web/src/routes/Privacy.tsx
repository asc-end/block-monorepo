import { Box, Text, Modal } from "@blockit/cross-ui-toolkit";
import { darkColors } from "@blockit/ui";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { Smartphone, Globe, Apple } from "lucide-react";

export default function Privacy() {
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
          Privacy Policy
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
              At Blockit, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our productivity tracking and app blocking service. By using Blockit, you consent to the data practices described in this policy.
            </Text>
          </Box>

          {/* Information We Collect */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              2. Information We Collect
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              We collect information to provide and improve our services:
            </Text>
            
            <Text variant="h3" className="text-xl font-medium mb-3 mt-6" style={{ color: darkColors.text.main }}>
              2.1 Information You Provide
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Wallet address when you connect to authenticate
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Focus session preferences and blocked app lists
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Staking commitments and goals
              </Text>
            </Box>

            <Text variant="h3" className="text-xl font-medium mb-3 mt-6" style={{ color: darkColors.text.main }}>
              2.2 Information Collected Automatically
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • App and website usage data (time spent, frequency of use)
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Focus session performance metrics
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Blockchain transaction data related to stakes
              </Text>
            </Box>
          </Box>

          {/* How We Use Information */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              3. How We Use Your Information
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              We use collected information to:
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Provide app blocking and focus session functionality
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Track your productivity and generate insights
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Process staking transactions and commitments
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Sync your settings across devices
              </Text>
            </Box>
          </Box>

          {/* Data Marketplace */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              4. Data Marketplace Participation
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              Blockit offers an optional data marketplace where you can monetize your anonymized usage data:
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Participation is entirely voluntary and opt-in
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • All data is anonymized and aggregated before sale
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Personal identifiers are removed from all datasets
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • You receive 100% of revenue from your data sales
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • You can opt out at any time
              </Text>
            </Box>
          </Box>

          {/* Data Security */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              5. Data Security
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              We implement appropriate technical and organizational measures to protect your information:
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Encryption of data in transit and at rest
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Regular security audits and updates
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Access controls and authentication measures
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Secure infrastructure and hosting
              </Text>
            </Box>
          </Box>

          {/* Data Sharing */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              6. Data Sharing and Disclosure
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              We do not sell or rent your personal information. We may share data only in these circumstances:
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • With your explicit consent (e.g., data marketplace)
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • To comply with legal obligations
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • To protect our rights and prevent fraud
              </Text>
            </Box>
          </Box>

          {/* Your Rights */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              7. Your Rights and Choices
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              You have control over your information:
            </Text>
            <Box className="ml-6 space-y-2">
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Access and export your data at any time
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Update or correct your information
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Delete your account and associated data
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Opt out of data marketplace participation
              </Text>
              <Text variant="body" className="leading-relaxed" style={{ color: darkColors.text.soft }}>
                • Manage notification preferences
              </Text>
            </Box>
          </Box>

          {/* Data Retention */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              8. Data Retention
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              We retain your information only as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will delete or anonymize your personal information within 30 days, except where retention is required by law.
            </Text>
          </Box>

          {/* Children's Privacy */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              9. Children's Privacy
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              Blockit is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected data from a child under 13, we will take steps to delete such information.
            </Text>
          </Box>

          {/* International Data Transfers */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              10. International Data Transfers
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
            </Text>
          </Box>

          {/* Changes to Policy */}
          <Box>
            <Text variant="h2" className="text-2xl font-semibold mb-4" style={{ color: darkColors.text.main }}>
              11. Changes to This Policy
            </Text>
            <Text variant="body" className="leading-relaxed mb-4" style={{ color: darkColors.text.soft }}>
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
            </Text>
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