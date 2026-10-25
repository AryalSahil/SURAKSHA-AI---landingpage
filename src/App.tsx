import React, { useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { SupportedLanguage } from './types';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ApkDownloadSection } from './components/ApkDownloadSection';
import { ThreatLandscapeSection } from './components/ThreatLandscapeSection';
import { FeatureShowcaseSection } from './components/FeatureShowcaseSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AppPreviewSection } from './components/AppPreviewSection';
import { LanguageAccessibilitySection } from './components/LanguageAccessibilitySection';
import { ResponsibleSafetySection } from './components/ResponsibleSafetySection';
import { AboutProjectSection } from './components/AboutProjectSection';
import { FaqSection } from './components/FaqSection';
import { FeedbackBanner } from './components/FeedbackBanner';
import { Footer } from './components/Footer';
import { InstallationModal, FeedbackModal, SafetyChecklistModal } from './components/Modals';

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
  };

  const handleScrollToDownload = () => {
    const el = document.getElementById('download');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Emergency Banner */}
      <EmergencyBanner currentLang={currentLang} />

      {/* 2. Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenDownload={handleScrollToDownload}
      />

      <main className="flex-1">
        {/* 3. Hero Section with Android Mockup */}
        <HeroSection
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onOpenDownload={handleScrollToDownload}
        />

        {/* 4. APK Direct Download Section */}
        <ApkDownloadSection
          currentLang={currentLang}
          onOpenInstructions={() => setIsInstallModalOpen(true)}
        />

        {/* 5. Problem and Threat Landscape */}
        <ThreatLandscapeSection />

        {/* 6. Feature Showcase */}
        <FeatureShowcaseSection />

        {/* 7. How SURAKSHA AI Works & Interactive Simulator */}
        <HowItWorksSection />

        {/* 8. App Preview Mockup Screens */}
        <AppPreviewSection />

        {/* 9. Language and Accessibility */}
        <LanguageAccessibilitySection
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
        />

        {/* 10. Responsible Safety and 1930 Helpline */}
        <ResponsibleSafetySection />

        {/* 11. About Project & Mission */}
        <AboutProjectSection />

        {/* 12. FAQ Section */}
        <FaqSection />

        {/* 13. Feedback & Safety Checklist Banner */}
        <FeedbackBanner
          onOpenFeedback={() => setIsFeedbackModalOpen(true)}
          onOpenChecklist={() => setIsChecklistModalOpen(true)}
        />
      </main>

      {/* 14. Footer */}
      <Footer
        onOpenDownload={handleScrollToDownload}
        onOpenFeedback={() => setIsFeedbackModalOpen(true)}
      />

      {/* Modals & Dialogs */}
      <InstallationModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />

      <SafetyChecklistModal
        isOpen={isChecklistModalOpen}
        onClose={() => setIsChecklistModalOpen(false)}
      />

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}
