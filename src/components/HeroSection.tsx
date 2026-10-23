import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PageType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onNavigate: (page: PageType, hash?: string) => void;
  bucketName?: string;
  fileName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  bucketName = 'brand-assets',
  fileName = 'main-hero-bg.jpg',
}) => {
  const { t, isRTL } = useLanguage();
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [, setHasError] = useState<boolean>(false);

  // High-fidelity editorial dark agency studio fallback to prevent broken layout
  const fallbackBg =
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80';

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setHasError(false);

    const fetchHeroBg = async () => {
      try {
        const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

        if (!data?.publicUrl) {
          throw new Error('Public URL could not be resolved from Supabase.');
        }

        const img = new Image();
        img.src = data.publicUrl;

        img.onload = () => {
          if (isMounted) {
            setBgImageUrl(data.publicUrl);
            setIsLoading(false);
          }
        };

        img.onerror = () => {
          if (isMounted) {
            setHasError(true);
            setBgImageUrl(fallbackBg);
            setIsLoading(false);
          }
        };
      } catch {
        if (isMounted) {
          setHasError(true);
          setBgImageUrl(fallbackBg);
          setIsLoading(false);
        }
      }
    };

    fetchHeroBg();

    return () => {
      isMounted = false;
    };
  }, [bucketName, fileName]);

  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeBg = bgImageUrl || (!isLoading ? fallbackBg : null);

  return (
    <section
      id="hero-section"
      className={`relative w-full min-h-[80vh] flex flex-col justify-center overflow-hidden bg-cover bg-center bg-no-repeat transition-colors duration-700 ${
        isLoading ? 'bg-slate-900 animate-pulse' : 'bg-neutral-950'
      }`}
      style={activeBg ? { backgroundImage: `url(${activeBg})` } : undefined}
    >
      {/* Readability Overlay: Dark gradient and tint directly over background image behind text */}
      <div
        className={`absolute inset-0 ${
          isRTL
            ? 'bg-gradient-to-l from-black/90 via-black/75 to-black/50'
            : 'bg-gradient-to-r from-black/90 via-black/75 to-black/50'
        } pointer-events-none`}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Container - Left-aligned (or right in RTL) within max-w-3xl */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl space-y-6 sm:space-y-8 text-start">
          {/* Top Agency Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-300">
            <span className="text-amber-400 font-medium">{t('hero.kicker1', 'Digital Creative')}</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span>{t('hero.kicker2', 'Technology Agency')}</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span className="text-white font-bold">{t('hero.kicker3', 'Amman')}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.1] text-balance">
            {t('hero.titleLine1', 'We Build Brands.')} <br className="hidden sm:inline" />
            {t('hero.titleLine2', 'We Elevate Businesses.')}
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl font-light">
            {t(
              'hero.subtitle',
              'From creative design and digital marketing to technology and business consulting, we bring everything together to help your business stand out, grow, and succeed.'
            )}
          </p>

          {/* CTA Buttons - Dark Mode Aesthetic with balanced padding */}
          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={scrollToServices}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-neutral-950 bg-white rounded-xl hover:bg-neutral-100 active:scale-[0.98] transition-all duration-150 shadow-xl shadow-black/30 cursor-pointer"
            >
              <span>{t('hero.exploreServices', 'Explore Our Services')}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onNavigate('social-media')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
              <span>{t('hero.viewPlans', 'View Social Media Plans')}</span>
              <ArrowUpRight className={`w-4 h-4 text-neutral-300 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
