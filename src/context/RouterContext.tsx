import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppRoute = 
  | '/'
  | '/features'
  | '/how-it-works'
  | '/download'
  | '/learn'
  | '/about'
  | '/faq'
  | '/contact'
  | '/privacy'
  | '/terms'
  | '/admin'
  | '/admin/login'
  | '/admin/pages'
  | '/admin/releases'
  | '/admin/announcements'
  | '/admin/activity-logs'
  | '/admin/settings'
  | string;

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  isAdminRoute: boolean;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
  isAdminRoute: false,
});

export const useRouter = () => useContext(RouterContext);

const PAGE_METADATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'SURAKSHA AI - Think Before You Click. Check Before You Pay',
    description: 'First line of defence against online scams, phishing, and payment traps for Indian citizens.',
  },
  '/features': {
    title: 'Features - SURAKSHA AI Citizen Scam Defense',
    description: 'Explore the Smart Scam Checker, Link Analyzer, Plain Explanations, and Vernacular Support.',
  },
  '/how-it-works': {
    title: 'How It Works - SURAKSHA AI Scam Inspection',
    description: 'Three simple steps to cyber safety: Check suspicious messages, Understand red flags, and Act safely.',
  },
  '/download': {
    title: 'Download App - SURAKSHA AI Android APK',
    description: 'Official SURAKSHA AI Android application package release channel and sideloading instructions.',
  },
  '/learn': {
    title: 'Cyber Safety Portal - SURAKSHA AI Lessons & Quizzes',
    description: 'Bite-sized citizen fraud prevention lessons covering UPI traps, fake jobs, and deceptive APKs.',
  },
  '/about': {
    title: 'About - SURAKSHA AI Hackathon Initiative',
    description: 'Learn about the purpose, public-good philosophy, and zero-storage architecture of SURAKSHA AI.',
  },
  '/faq': {
    title: 'Frequently Asked Questions - SURAKSHA AI',
    description: 'Clear answers on citizen privacy, 1930 cyber fraud helpline coordination, and app capabilities.',
  },
  '/contact': {
    title: 'Contact & Feedback - SURAKSHA AI',
    description: 'Submit suspicious scam patterns, report application bugs, or connect with our safety team.',
  },
  '/privacy': {
    title: 'Privacy Policy - SURAKSHA AI',
    description: 'Our strict zero-storage commitment: no banking data logging, no background spyware, total privacy.',
  },
  '/terms': {
    title: 'Terms of Use - SURAKSHA AI',
    description: 'Educational digital safety tool terms, non-legal advice scope, and citizen guidelines.',
  },
  '/admin/login': {
    title: 'Admin Sign In - SURAKSHA AI Management',
    description: 'Secure administrator authentication for SURAKSHA AI digital safety portal.',
  },
  '/admin': {
    title: 'Admin Dashboard - SURAKSHA AI',
    description: 'System metrics, public page publishing status, APK releases, and activity audit logs.',
  },
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync Document Title & Description
  useEffect(() => {
    const meta = PAGE_METADATA[currentPath] || {
      title: 'SURAKSHA AI - Digital Safety & Cyber Fraud Awareness',
      description: 'Think Before You Click. Check Before You Pay. Indian citizen cybersecurity companion.',
    };

    document.title = meta.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }
  }, [currentPath]);

  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <RouterContext.Provider value={{ currentPath, navigate, isAdminRoute }}>
      {children}
    </RouterContext.Provider>
  );
};
