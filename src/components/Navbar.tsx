import React, { useState } from 'react';
import { PageType } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t, isRTL } = useLanguage();

  const handleNavClick = (page: PageType, hash?: string) => {
    onNavigate(page, hash);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-neutral-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Clean text without square icon) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-lg p-1"
          aria-label="Whislly Home"
        >
          <span className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors font-display">
            Whislly
          </span>
        </button>

        {/* Zone 2: Navigation Links (Home, Services, About Us, Careers) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              currentPage === 'home'
                ? 'text-neutral-950 font-semibold'
                : 'hover:text-neutral-950'
            }`}
          >
            {t('nav.home', 'Home')}
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('home', 'services')}
            className="whitespace-nowrap transition-colors py-1 hover:text-neutral-950"
          >
            {t('nav.services', 'Services')}
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              currentPage === 'about'
                ? 'text-neutral-950 font-semibold'
                : 'hover:text-neutral-950'
            }`}
          >
            {t('nav.about', 'About Us')}
            {currentPage === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('careers')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              currentPage === 'careers'
                ? 'text-neutral-950 font-semibold'
                : 'hover:text-neutral-950'
            }`}
          >
            {t('nav.careers', 'Careers')}
            {currentPage === 'careers' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Language Toggle ("EN / AR") & Primary Action ("LET'S BUILD ↗") & Mobile Toggle */}
        <div className="flex items-center gap-6">
          {/* Language Toggle: pure elegant typography, not enclosed in a box or button */}
          <span
            onClick={toggleLanguage}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleLanguage();
              }
            }}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer select-none tracking-wide"
            role="button"
            tabIndex={0}
            title={language === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
          >
            <span className={language === 'en' ? 'font-bold text-neutral-950' : 'text-neutral-400'}>
              EN
            </span>
            <span className="text-neutral-300 mx-1">/</span>
            <span className={language === 'ar' ? 'font-bold text-neutral-950' : 'text-neutral-400'}>
              AR
            </span>
          </span>

          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 shadow-sm whitespace-nowrap cursor-pointer"
          >
            <span>{t('nav.cta', "LET'S BUILD")}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
              currentPage === 'home'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {t('nav.home', 'Home')}
          </button>
          <button
            onClick={() => handleNavClick('home', 'services')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            {t('nav.services', 'Services')}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
              currentPage === 'about'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {t('nav.about', 'About Us')}
          </button>
          <button
            onClick={() => handleNavClick('careers')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
              currentPage === 'careers'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {t('nav.careers', 'Careers')}
          </button>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-4">
            <span
              onClick={toggleLanguage}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer select-none px-2 py-1"
              role="button"
              tabIndex={0}
            >
              <span className={language === 'en' ? 'font-bold text-neutral-950' : 'text-neutral-400'}>
                EN
              </span>
              <span className="text-neutral-300 mx-1">/</span>
              <span className={language === 'ar' ? 'font-bold text-neutral-950' : 'text-neutral-400'}>
                AR
              </span>
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <span>{t('nav.cta', "LET'S BUILD")}</span>
              <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
