import React, { useState } from 'react';
import { Download, Globe, Menu, X, Shield, Lock } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/content';
import { useRouter } from '../context/RouterContext';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onLanguageChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath, navigate } = useRouter();
  const t = UI_TRANSLATIONS[currentLang];

  const navLinks = [
    { label: t.navHome, path: '/' },
    { label: t.navFeatures, path: '/features' },
    { label: t.navHowItWorks, path: '/how-it-works' },
    { label: 'Cyber Safety', path: '/learn' },
    { label: t.navAbout, path: '/about' },
    { label: t.navFaq, path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 lg:gap-8">
          
          {/* Zone 1: Brand Wordmark & Official Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick('/', e)}
            className="flex items-center gap-2.5 text-[#123B70] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 group"
          >
            <img 
              src="/assets/aistudio/Suraksha_AI_Cybersecurity_Logo_f45da8e9.png" 
              alt="SURAKSHA AI Logo" 
              className="w-10 h-10 object-contain rounded-xl bg-white p-0.5 border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-[#123B70] leading-none">
                SURAKSHA AI
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                Think Safe · Stay Secure
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(link.path, e)}
                  className={`transition-colors whitespace-nowrap py-1 relative font-semibold text-xs 2xl:text-sm ${
                    isActive
                      ? 'text-[#2563EB] after:w-full font-bold'
                      : 'text-slate-600 hover:text-[#2563EB] after:w-0'
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#2563EB] hover:after:w-full after:transition-all`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Language Selector & Primary CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-100/90 rounded-lg p-1 border border-slate-200 text-xs font-medium text-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1 mr-1" />
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${currentLang === 'en' ? 'bg-white text-[#123B70] font-semibold shadow-xs' : 'hover:text-slate-900'}`}
                title="Switch to English"
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${currentLang === 'hi' ? 'bg-white text-[#123B70] font-semibold shadow-xs' : 'hover:text-slate-900'}`}
                title="हिन्दी में बदलें"
              >
                हिन्दी
              </button>
              <button
                onClick={() => onLanguageChange('as')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${currentLang === 'as' ? 'bg-white text-[#123B70] font-semibold shadow-xs' : 'hover:text-slate-900'}`}
                title="অসমীয়াত চাওক"
              >
                অসমীয়া
              </button>
            </div>

            {/* Primary Action Button: Download App */}
            <a
              href="/download"
              onClick={(e) => handleLinkClick('/download', e)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#123B70] hover:bg-[#194b8e] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadApp}</span>
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="/download"
              onClick={(e) => handleLinkClick('/download', e)}
              className="px-3 py-1.5 bg-[#123B70] text-white text-xs font-semibold rounded-md"
            >
              APK
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-md hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2">
          {/* Mobile Language selector */}
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <span className="font-medium text-slate-600 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-slate-400" />
              Language:
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded ${currentLang === 'en' ? 'bg-[#123B70] text-white font-bold' : 'text-slate-700'}`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1 rounded ${currentLang === 'hi' ? 'bg-[#123B70] text-white font-bold' : 'text-slate-700'}`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => onLanguageChange('as')}
                className={`px-2.5 py-1 rounded ${currentLang === 'as' ? 'bg-[#123B70] text-white font-bold' : 'text-slate-700'}`}
              >
                অসমীয়া
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(link.path, e)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50 text-[#2563EB] font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </a>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <a
              href="/download"
              onClick={(e) => handleLinkClick('/download', e)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#123B70] text-white text-sm font-semibold rounded-lg shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadAndroid}</span>
            </a>

            <a
              href="/admin/login"
              onClick={(e) => handleLinkClick('/admin/login', e)}
              className="flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 py-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
