import React from 'react';
import { PageType } from '../types';
import { ArrowUpRight, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800 text-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-neutral-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-start group focus-visible:outline-none cursor-pointer"
              aria-label="Whislly Home"
            >
              <span className="text-2xl font-bold tracking-tight text-white font-display group-hover:text-neutral-200 transition-colors">
                Whislly
              </span>
            </button>
            <p className="text-sm font-medium text-neutral-200">
              {t('footer.tagline', 'We Build Brands. We Elevate Businesses.')}
            </p>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {t(
                'footer.desc',
                'Whislly is a business consulting and technology solutions trademark operating under Diamond Sword Tech Solutions Company, dedicated to helping businesses grow, stand out, and reach their full potential.'
              )}
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/whisllyjordan?mdxt=bGlzb2czdmE2NXNy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                aria-label="Follow Whislly on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                aria-label="Whislly on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                aria-label="Whislly on X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Agency Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              {t('footer.agency', 'Agency')}
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('footer.home', 'Home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('footer.ourServices', 'Our Services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('footer.aboutUs', 'About Us')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'proof')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('footer.proof', 'Proof of Promises')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('careers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('footer.careers', 'Careers & Join Us')}
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions & Practice Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              {t('footer.solutions', 'Solutions')}
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('creative-production')}
                  className="hover:text-white transition-colors text-start cursor-pointer"
                >
                  {t('footer.creativeProd', 'Creative & Production')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('business-solutions')}
                  className="hover:text-white transition-colors text-start cursor-pointer"
                >
                  {t('footer.businessSol', 'Business Solutions & Tech')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('social-media')}
                  className="hover:text-white transition-colors text-start cursor-pointer"
                >
                  {t('footer.socialMedia', 'Social Media Management')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('business-solutions')}
                  className="hover:text-emerald-400 transition-colors text-start text-neutral-400 cursor-pointer"
                >
                  {t('footer.foodAppOps', 'Restaurant Food Apps Ops')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('social-media')}
                  className="hover:text-amber-400 transition-colors text-start text-neutral-400 cursor-pointer"
                >
                  {t('footer.monthlyRetainers', 'Monthly Retainer Plans')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information & HQ */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              {t('footer.getInTouch', 'Get In Touch')}
            </h4>
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span className="text-neutral-300">{t('footer.hq', 'Amman, Jordan')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <a
                  href="mailto:info@whislly.com"
                  className="text-neutral-300 hover:text-white transition-colors font-medium"
                >
                  info@whislly.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                <a
                  href="tel:+962799124684"
                  className="text-neutral-300 hover:text-white transition-colors font-medium"
                  dir="ltr"
                >
                  +962 7 9912 4684
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  <span>{t('footer.requestProposal', 'Request Proposal')}</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>{t('footer.copyright', '© 2026 Whislly. All rights reserved.')}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">
              {t('footer.privacy', 'Privacy Policy')}
            </span>
            <span className="hover:text-neutral-400 cursor-pointer">
              {t('footer.terms', 'Terms of Service')}
            </span>
            <span className="hover:text-neutral-400 cursor-pointer">
              {t('footer.security', 'Security Standards')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
