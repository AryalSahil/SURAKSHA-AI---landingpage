import React, { useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { SupportedLanguage } from './types';

// Public Chrome Components
import { EmergencyBanner } from './components/EmergencyBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InstallationModal, FeedbackModal, SafetyChecklistModal } from './components/Modals';

// Public Pages
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { DownloadPage } from './pages/DownloadPage';
import { LearnPage } from './pages/LearnPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Components & Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminPagesPage } from './pages/admin/AdminPagesPage';
import { AdminReleasesPage } from './pages/admin/AdminReleasesPage';
import { AdminAnnouncementsPage } from './pages/admin/AdminAnnouncementsPage';
import { AdminFeedbacksPage } from './pages/admin/AdminFeedbacksPage';
import { AdminActivityLogsPage } from './pages/admin/AdminActivityLogsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

function AppContent() {
  const { currentPath, isAdminRoute, navigate } = useRouter();
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);

  // Normalize path by stripping trailing slash (except root)
  const normalizedPath = currentPath.length > 1 && currentPath.endsWith('/') 
    ? currentPath.slice(0, -1) 
    : currentPath;

  // 1. ADMIN ROUTING BRANCH
  if (isAdminRoute) {
    if (normalizedPath === '/admin/login') {
      return <AdminLoginPage />;
    }

    if (normalizedPath === '/admin') {
      return (
        <AdminLayout activeTab="overview">
          <AdminOverviewPage />
        </AdminLayout>
      );
    }

    if (normalizedPath === '/admin/pages') {
      return (
        <AdminLayout activeTab="pages">
          <AdminPagesPage />
        </AdminLayout>
      );
    }

    if (normalizedPath === '/admin/releases') {
      return (
        <AdminLayout activeTab="releases">
          <AdminReleasesPage />
        </AdminLayout>
      );
    }

    if (normalizedPath === '/admin/announcements') {
      return (
        <AdminLayout activeTab="announcements">
          <AdminAnnouncementsPage />
        </AdminLayout>
      );
    }

    if (normalizedPath === '/admin/feedbacks') {
      return (
        <AdminLayout activeTab="feedbacks">
          <AdminFeedbacksPage />
        </AdminLayout>
      );
    }

    if (normalizedPath === '/admin/activity-logs') {
      return (
        <AdminLayout activeTab="activity-logs">
          <AdminActivityLogsPage />
        </AdminLayout>
      );
    }

    if (normalizedPath === '/admin/settings') {
      return (
        <AdminLayout activeTab="settings">
          <AdminSettingsPage />
        </AdminLayout>
      );
    }

    // Default admin fallback to overview
    return (
      <AdminLayout activeTab="overview">
        <AdminOverviewPage />
      </AdminLayout>
    );
  }

  // 2. PUBLIC ROUTING BRANCH
  const renderPublicPage = () => {
    switch (normalizedPath) {
      case '/':
      case '/home':
        return (
          <HomePage
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
            onOpenInstructions={() => setIsInstallModalOpen(true)}
            onOpenFeedback={() => setIsFeedbackModalOpen(true)}
            onOpenChecklist={() => setIsChecklistModalOpen(true)}
          />
        );
      case '/features':
        return <FeaturesPage />;
      case '/how-it-works':
        return <HowItWorksPage />;
      case '/download':
        return <DownloadPage />;
      case '/learn':
      case '/safety':
        return <LearnPage />;
      case '/about':
        return <AboutPage />;
      case '/faq':
        return <FaqPage />;
      case '/contact':
      case '/feedback':
        return <ContactPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Citizen Emergency Cyber Advisory & 1930 Helpline Banner */}
      <EmergencyBanner currentLang={currentLang} />

      {/* Primary Sticky Navigation Header */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {renderPublicPage()}
      </main>

      {/* Standard Public Footer */}
      <Footer />

      {/* Global Citizen Modals */}
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
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
