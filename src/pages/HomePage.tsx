import React from 'react';
import { SupportedLanguage } from '../types';
import { HeroSection } from '../components/HeroSection';
import { ApkDownloadSection } from '../components/ApkDownloadSection';
import { ThreatLandscapeSection } from '../components/ThreatLandscapeSection';
import { FeatureShowcaseSection } from '../components/FeatureShowcaseSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { AppPreviewSection } from '../components/AppPreviewSection';
import { LanguageAccessibilitySection } from '../components/LanguageAccessibilitySection';
import { ResponsibleSafetySection } from '../components/ResponsibleSafetySection';
import { AboutProjectSection } from '../components/AboutProjectSection';
import { FaqSection } from '../components/FaqSection';
import { FeedbackBanner } from '../components/FeedbackBanner';

interface HomePageProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenInstructions: () => void;
  onOpenFeedback: () => void;
  onOpenChecklist: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  onLanguageChange,
  onOpenInstructions,
  onOpenFeedback,
  onOpenChecklist,
}) => {
  return (
    <>
      {/* 1. Hero Section with Android Mockup and GSAP entrance */}
      <HeroSection
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onOpenDownload={() => {}}
      />

      {/* 2. Direct APK Download Section */}
      <ApkDownloadSection
        currentLang={currentLang}
        onOpenInstructions={onOpenInstructions}
      />

      {/* 3. Problem and Threat Landscape */}
      <ThreatLandscapeSection />

      {/* 4. Feature Showcase */}
      <FeatureShowcaseSection />

      {/* 5. How SURAKSHA AI Works & Interactive Simulator */}
      <HowItWorksSection />

      {/* 6. Authentic App Preview Mockup Screens */}
      <AppPreviewSection />

      {/* 7. Language and Accessibility */}
      <LanguageAccessibilitySection
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
      />

      {/* 8. Responsible Safety and 1930 Helpline */}
      <ResponsibleSafetySection />

      {/* 9. About Project & Mission */}
      <AboutProjectSection />

      {/* 10. FAQ Section */}
      <FaqSection />

      {/* 11. Feedback Banner */}
      <FeedbackBanner
        onOpenFeedback={onOpenFeedback}
        onOpenChecklist={onOpenChecklist}
      />
    </>
  );
};
