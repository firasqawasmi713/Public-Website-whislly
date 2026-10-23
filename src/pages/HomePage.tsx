import React from 'react';
import { PageType } from '../types';
import { HeroSection } from '../components/HeroSection';
import { OurServicesSection } from '../components/OurServicesSection';
import { ProofOfPromisesSection } from '../components/ProofOfPromisesSection';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenContact: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenContact }) => {
  const { t, isRTL } = useLanguage();

  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO SECTION (FULL-WIDTH BACKGROUND IMAGE OVERLAY)
          ========================================================================= */}
      <HeroSection onNavigate={onNavigate} />

      {/* =========================================================================
          SECTION 2: OUR SERVICES (3-COLUMN LAYOUT WITH 16:9 SUPABASE IMAGES)
          ========================================================================= */}
      <OurServicesSection onNavigate={onNavigate} />

      {/* =========================================================================
          SECTION 3: PROOF OF PROMISES (SIMPLIFIED CASE STUDY CARDS)
          ========================================================================= */}
      <ProofOfPromisesSection
        onSelectService={(serviceName) => {
          if (serviceName.includes('Social') || serviceName.includes('تواصل')) {
            onNavigate('social-media');
          } else {
            scrollToServices();
          }
        }}
      />

      {/* =========================================================================
          AGENCY CALLOUT & ACTION BANNER
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-start`}
          >
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {t('homeBanner.kicker', 'Ready to elevate your market presence?')}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
                {t(
                  'homeBanner.title',
                  'Partner with Whislly to build a distinct brand identity and growth engine.'
                )}
              </h3>
              <p className="text-sm text-neutral-400">
                {t(
                  'homeBanner.description',
                  'Book a discovery session with our senior creative and technology consultants in Amman.'
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-white rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <span>{t('homeBanner.requestProposal', 'Request Agency Proposal')}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
              <button
                onClick={() => onNavigate('social-media')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white border border-neutral-700 hover:border-neutral-500 rounded-xl transition-colors cursor-pointer"
              >
                <span>{t('homeBanner.explorePackages', 'Explore Packages')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
