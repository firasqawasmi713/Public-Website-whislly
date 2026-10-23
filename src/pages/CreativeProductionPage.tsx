import React from 'react';
import { PageType } from '../types';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Palette,
  Camera,
  Film,
  PenTool,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CreativeProductionPageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenContact: () => void;
}

interface CreativeService {
  id: string;
  letter: string;
  titleKey: string;
  categoryKey: string;
  focusKey: string;
  descKey: string;
  deliverablesKey: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultImageUrl: string;
  imageAlt: string;
}

const CREATIVE_SERVICES: CreativeService[] = [
  {
    id: 'design',
    letter: 'A',
    titleKey: 'creativePage.services.design.title',
    categoryKey: 'creativePage.services.design.category',
    focusKey: 'creativePage.services.design.focus',
    descKey: 'creativePage.services.design.description',
    deliverablesKey: 'creativePage.services.design.deliverables',
    icon: Layers,
    defaultImageUrl:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Whislly High-End Graphic Design and Motion Graphics Workspace',
  },
  {
    id: 'branding',
    letter: 'B',
    titleKey: 'creativePage.services.branding.title',
    categoryKey: 'creativePage.services.branding.category',
    focusKey: 'creativePage.services.branding.focus',
    descKey: 'creativePage.services.branding.description',
    deliverablesKey: 'creativePage.services.branding.deliverables',
    icon: Palette,
    defaultImageUrl:
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Whislly Brand Architecture and Visual Identity Showcase',
  },
  {
    id: 'photography',
    letter: 'C',
    titleKey: 'creativePage.services.photography.title',
    categoryKey: 'creativePage.services.photography.category',
    focusKey: 'creativePage.services.photography.focus',
    descKey: 'creativePage.services.photography.description',
    deliverablesKey: 'creativePage.services.photography.deliverables',
    icon: Camera,
    defaultImageUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Whislly Commercial and High-Ticket Food Photography Studio',
  },
  {
    id: 'video',
    letter: 'D',
    titleKey: 'creativePage.services.video.title',
    categoryKey: 'creativePage.services.video.category',
    focusKey: 'creativePage.services.video.focus',
    descKey: 'creativePage.services.video.description',
    deliverablesKey: 'creativePage.services.video.deliverables',
    icon: Film,
    defaultImageUrl:
      'https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Whislly Cinematic Commercial Shoots and Video Editing Suite',
  },
  {
    id: 'content',
    letter: 'E',
    titleKey: 'creativePage.services.content.title',
    categoryKey: 'creativePage.services.content.category',
    focusKey: 'creativePage.services.content.focus',
    descKey: 'creativePage.services.content.description',
    deliverablesKey: 'creativePage.services.content.deliverables',
    icon: PenTool,
    defaultImageUrl:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Whislly Content Strategy and Strategic Copywriting Suite',
  },
];

export const CreativeProductionPage: React.FC<CreativeProductionPageProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="w-full bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white text-start">
      {/* =========================================================================
          1. HERO SECTION: Full width, deep padding, typography-focused aesthetic
          ========================================================================= */}
      <section className="relative w-full py-20 sm:py-28 lg:py-32 bg-neutral-950 text-white overflow-hidden border-b border-neutral-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb / Navigation Kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-6">
            <button
              onClick={() => onNavigate('home', 'services')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('nav.services', 'Services')}
            </button>
            <span className="text-neutral-600">/</span>
            <span className="text-amber-400 font-medium">
              {t('creativePage.title', 'Creative & Production')}
            </span>
          </div>

          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display leading-[1.05] text-balance">
              {t('creativePage.title', 'Creative & Production')}
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl">
              {t(
                'creativePage.subtitle',
                'Transforming conceptual ideas into high-impact visual realities. We build the assets that make your brand unforgettable.'
              )}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {t('creativePage.disciplines', '5 Core Disciplines')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {t('creativePage.facilities', 'In-House Studio Facilities')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {t('creativePage.delivery', 'End-to-End Asset Delivery')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SERVICES SHOWCASE: Alternating "Zigzag" Layout for the 5 Services
          ========================================================================= */}
      <section className="py-20 sm:py-28 lg:py-36 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 sm:space-y-32 lg:space-y-40">
          {CREATIVE_SERVICES.map((service, index) => {
            const isReversed = index % 2 !== 0;
            const IconComponent = service.icon;

            const title = t(service.titleKey, service.id);
            const category = t(service.categoryKey, '');
            const focus = t(service.focusKey, '');
            const description = t(service.descKey, '');

            // Deliverables fallback list
            const enDeliverablesMap: Record<string, string[]> = {
              design: ['Digital & Print Graphics', 'Motion Graphics', 'Social Media Assets', 'Marketing Collateral'],
              branding: ['Logo Design', 'Brand Guidelines', 'Typography & Color Systems'],
              photography: ['Studio Shoots', 'On-Location Photography', 'Retouching'],
              video: ['Commercials', 'Social Media Reels', 'Event Coverage'],
              content: ['Brand Voice', 'Ad Copy', 'Social Media Content'],
            };
            const arDeliverablesMap: Record<string, string[]> = {
              design: ['تصاميم رقمية ومطبوعة', 'موشن جرافيكس ورسوم متحركة', 'أصول منصات التواصل', 'مواد تسويقية متكاملة'],
              branding: ['تصميم الشعار والرمز', 'دليل إرشادي شامل للهوية', 'أنظمة الخطوط والألوان'],
              photography: ['تصوير استوديو متقدم', 'تصوير ميداني في الموقع', 'معالجة وتنقيح احترافي'],
              video: ['فيديوهات إعلانية', 'ريلز للسوشيال ميديا', 'تغطية الفعاليات والمناسبات'],
              content: ['نبرة صوت العلامة التجارية', 'نصوص الإعلانات الممولة', 'محتوى منشورات السوشيال ميديا'],
            };

            const deliverables = isRTL ? arDeliverablesMap[service.id] : enDeliverablesMap[service.id];

            return (
              <article
                key={service.id}
                id={service.id}
                className={`flex flex-col ${
                  isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                } items-center gap-10 md:gap-14 lg:gap-20`}
              >
                {/* Text Content Column */}
                <div className="w-full md:w-1/2 space-y-6">
                  {/* Category & Section Index Kicker */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-900 text-white font-mono text-xs font-bold shadow-sm">
                      {service.letter}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      {category}
                    </span>
                  </div>

                  {/* Service Title */}
                  <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 font-display">
                      {title}
                    </h2>
                    <p className="text-sm font-medium text-neutral-500 italic">
                      {focus}
                    </p>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                    {description}
                  </p>

                  {/* Deliverables Bullet List */}
                  <div className="pt-2 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      {t('creativePage.coreDeliverables', 'Core Deliverables')}
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-200/80 rounded-xl px-3.5 py-2.5 shadow-xs"
                        >
                          <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contextual Action Link */}
                  <div className="pt-4">
                    <button
                      onClick={onOpenContact}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-700 group cursor-pointer"
                    >
                      <span>
                        {t('creativePage.inquireAbout', 'Inquire about')} {title}
                      </span>
                      {isRTL ? (
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Image Showcase Column */}
                <div className="w-full md:w-1/2">
                  <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-neutral-200/90 bg-neutral-900">
                    <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={service.defaultImageUrl}
                        alt={service.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white z-10">
                        <div className="flex items-center gap-2.5 bg-neutral-950/75 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-xs">
                          <IconComponent className="w-4 h-4 text-amber-400" />
                          <span className="font-semibold tracking-wide">
                            {title} {t('creativePage.suite', 'Suite')}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-white/80 bg-neutral-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                          Whislly · 2026
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. CALL TO ACTION: Centered, striking block at the bottom
          ========================================================================= */}
      <section className="py-20 sm:py-28 lg:py-32 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neutral-800/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 bg-neutral-900/90 border border-neutral-800 px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('creativePage.ctaKicker', 'Creative Consultation')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-tight text-balance">
            {t('creativePage.ctaTitle', 'Ready to elevate your visual identity?')}
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
            {t(
              'creativePage.ctaDesc',
              'Whether you need a complete brand redesign, commercial food photography, or cinematic video reels, our production team brings vision to life.'
            )}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-neutral-950 bg-white rounded-xl hover:bg-neutral-100 hover:shadow-2xl hover:shadow-white/10 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg"
            >
              <span>{t('creativePage.startProject', 'Start a Project')}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onNavigate('social-media')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>{t('creativePage.explorePlans', 'Explore Social Media Plans')}</span>
              <ArrowUpRight className={`w-4 h-4 text-neutral-400 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>

          <div className="pt-8 border-t border-white/10 max-w-md mx-auto flex items-center justify-center gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('creativePage.ipTransfer', 'Full Commercial IP Transfer')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('creativePage.turnaround', 'Fast Studio Turnarounds')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
