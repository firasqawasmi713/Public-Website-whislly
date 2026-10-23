import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Share2,
  Camera,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServiceItem {
  id: string;
  imageFile: string;
  linkPage?: string;
  isClickable?: boolean;
}

const SERVICES_BASE: ServiceItem[] = [
  {
    id: 'social-media',
    imageFile: 'social-media-management.jpg',
    linkPage: '/social-media',
    isClickable: true,
  },
  {
    id: 'creative-production',
    imageFile: 'creative-production.jpg',
    linkPage: '/creative-production',
    isClickable: true,
  },
  {
    id: 'business-solutions',
    imageFile: 'business-solutions.jpg',
    linkPage: '/business-solutions',
    isClickable: true,
  },
];

interface OurServicesSectionProps {
  onNavigate?: (
    page: 'home' | 'social-media' | 'careers' | 'creative-production' | 'business-solutions',
    hash?: string
  ) => void;
  bucketName?: string;
}

export const OurServicesSection: React.FC<OurServicesSectionProps> = ({
  onNavigate,
  bucketName = 'services-bucket',
}) => {
  const { t, isRTL } = useLanguage();
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchServiceImages = async () => {
      try {
        const loadedUrls: Record<string, string> = {};
        const errors: Record<string, boolean> = {};

        const promises = SERVICES_BASE.map(async (service) => {
          try {
            const { data } = supabase.storage
              .from(bucketName)
              .getPublicUrl(service.imageFile);

            if (!data?.publicUrl) {
              errors[service.id] = true;
              return;
            }

            await new Promise<void>((resolve) => {
              const img = new Image();
              img.src = data.publicUrl;

              img.onload = () => {
                loadedUrls[service.id] = data.publicUrl;
                resolve();
              };

              img.onerror = () => {
                errors[service.id] = true;
                resolve();
              };
            });
          } catch {
            errors[service.id] = true;
          }
        });

        await Promise.all(promises);

        if (isMounted) {
          setImageUrls(loadedUrls);
          setFailedImages(errors);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchServiceImages();

    return () => {
      isMounted = false;
    };
  }, [bucketName]);

  const handleCardClick = (serviceId: string) => {
    if (onNavigate) {
      if (serviceId === 'creative-production') {
        onNavigate('creative-production');
      } else if (serviceId === 'social-media') {
        onNavigate('social-media');
      } else if (serviceId === 'business-solutions') {
        onNavigate('business-solutions');
      }
    }
  };

  const renderFallbackPlaceholder = (serviceId: string) => {
    if (serviceId === 'social-media') {
      return (
        <div className="aspect-[16/9] w-full rounded-t-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-neutral-950 p-6 flex flex-col justify-between text-white relative overflow-hidden select-none border-b border-neutral-100">
          <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 text-xs">
            <span className="font-semibold text-indigo-300">Social Channel Hub</span>
            <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
              +312% Reach
            </span>
          </div>

          <div className="relative z-10 my-auto space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-indigo-300 mx-auto">
              <Share2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <div className="text-sm font-bold text-white">Curated Content Engine</div>
              <p className="text-[11px] text-neutral-300 leading-tight">
                9:16 Reels · Carousel Slides · Profile Grid Layouts
              </p>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1 text-[11px] text-neutral-300">
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>Engagement Index</span>
                <span className="text-emerald-400 font-mono font-bold">98.4%</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[84%]" />
              </div>
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-neutral-400 border-t border-white/10 pt-2 flex justify-between">
            <span>Instagram · TikTok</span>
            <span className="text-indigo-300">Meta Verified</span>
          </div>
        </div>
      );
    }

    if (serviceId === 'creative-production') {
      return (
        <div className="aspect-[16/9] w-full rounded-t-2xl bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950 p-6 flex flex-col justify-between text-white relative overflow-hidden select-none border-b border-neutral-100">
          <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 text-xs">
            <span className="font-semibold text-amber-300">Studio & Film Production</span>
            <span className="font-mono text-[10px] text-amber-200/80">4K HDR · 50mm</span>
          </div>

          <div className="relative z-10 my-auto space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-amber-300 mx-auto">
              <Camera className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <div className="text-sm font-bold text-white">Commercial Photography</div>
              <p className="text-[11px] text-neutral-300 leading-tight">
                Menu Styling · Brand Shoots · Packaging Architecture
              </p>
            </div>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <div className="bg-white/10 rounded p-1.5 text-center text-[10px]">
                <span className="text-neutral-400 block text-[8px] uppercase">Lighting</span>
                <span className="font-bold text-white">Diffused</span>
              </div>
              <div className="bg-white/10 rounded p-1.5 text-center text-[10px]">
                <span className="text-neutral-400 block text-[8px] uppercase">Shutter</span>
                <span className="font-bold text-white">1/250s</span>
              </div>
              <div className="bg-white/10 rounded p-1.5 text-center text-[10px]">
                <span className="text-neutral-400 block text-[8px] uppercase">Color</span>
                <span className="font-bold text-amber-300">Film LUT</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-neutral-400 border-t border-white/10 pt-2 flex justify-between">
            <span>Commercial Sets</span>
            <span className="text-amber-300">Amman Studio</span>
          </div>
        </div>
      );
    }

    // Business Solutions Fallback
    return (
      <div className="aspect-[16/9] w-full rounded-t-2xl bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-950 p-6 flex flex-col justify-between text-white relative overflow-hidden select-none border-b border-neutral-100">
        <div className="absolute bottom-0 right-0 w-44 h-44 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 text-xs">
          <span className="font-semibold text-neutral-300">Systems & Technology</span>
          <span className="font-mono text-[10px] text-neutral-400 uppercase">ENTERPRISE</span>
        </div>

        <div className="relative z-10 my-auto space-y-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white mx-auto">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="text-center space-y-1">
            <div className="text-sm font-bold text-white">Business Consulting & Web</div>
            <p className="text-[11px] text-neutral-300 leading-tight">
              Custom Web Apps · Funnel Optimization · ERP Integrations
            </p>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1 text-[11px] text-neutral-300">
            <div className="flex justify-between text-[10px]">
              <span className="text-neutral-400">System Uptime & Velocity</span>
              <span className="text-emerald-400 font-mono font-bold">99.9%</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-neutral-400">Digital Transformation</span>
              <span className="text-white font-mono font-bold">Validated ROI</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-neutral-400 border-t border-white/10 pt-2 flex justify-between">
          <span>React · Cloud SQL</span>
          <span className="text-neutral-300">Enterprise Ready</span>
        </div>
      </div>
    );
  };

  const servicesData = [
    {
      id: 'social-media',
      title: t('servicesSection.socialTitle', 'Social Media Management'),
      category: t('servicesSection.socialCategory', 'Growth & Content'),
      description: t(
        'servicesSection.socialDesc',
        'End-to-end social media growth. From curated monthly feed and reel designs to full-funnel paid advertising, account grid coordination, and audience conversion.'
      ),
      badgeText: t('servicesSection.socialBadge', 'Tier Packages: 100 to 250 JOD'),
      actionText: t('servicesSection.socialAction', 'Explore Plans'),
    },
    {
      id: 'creative-production',
      title: t('servicesSection.creativeTitle', 'Creative & Production'),
      category: t('servicesSection.creativeCategory', 'Visual & Media'),
      description: t(
        'servicesSection.creativeDesc',
        'Transforming conceptual brand stories into high-impact visual realities. We direct full commercial shoots, product videography, bespoke packaging, and comprehensive brand collateral.'
      ),
      badgeText: t('servicesSection.creativeBadge', '5 Disciplines (Design, Photo, Video...)'),
      actionText: t('servicesSection.creativeAction', 'View Showcase'),
    },
    {
      id: 'business-solutions',
      title: t('servicesSection.businessTitle', 'Business Solutions'),
      category: t('servicesSection.businessCategory', 'Consulting & Technology'),
      description: t(
        'servicesSection.businessDesc',
        'Bridging the gap between creative marketing and operational excellence. Digital workflows, custom web applications, analytics intelligence, and strategic business consulting.'
      ),
      badgeText: t('servicesSection.businessBadge', 'Flagship: Food Apps Mgmt & Automation'),
      actionText: t('servicesSection.businessAction', 'Explore Solutions'),
    },
  ];

  return (
    <section
      id="services-section"
      className="py-20 sm:py-28 bg-neutral-50/70 border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl text-start">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {t('servicesSection.kicker', 'Capabilities & Practice Areas')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-display">
              {t('servicesSection.title', 'Our Services')}
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              {t(
                'servicesSection.description',
                'Strategic capabilities designed to accelerate your brand equity, customer engagement, and technological efficiency.'
              )}
            </p>
          </div>

          <div className="shrink-0">
            {onNavigate && (
              <button
                onClick={() => onNavigate('social-media')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-700 underline underline-offset-4 cursor-pointer"
              >
                <span>{t('servicesSection.browsePricing', 'Browse Social Media Pricing Packages')}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* 3-Column Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {servicesData.map((service, index) => {
            const hasImageUrl = imageUrls[service.id];
            const hasError = failedImages[service.id];

            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.id)}
                className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:border-neutral-950 cursor-pointer ring-1 ring-neutral-900/5 text-start"
              >
                {/* 1. Top Section: 16:9 Aspect Ratio Image / Fallback */}
                <div className="relative w-full overflow-hidden bg-neutral-100">
                  {loading ? (
                    <div
                      className="aspect-[16/9] w-full animate-pulse bg-gray-200 flex flex-col justify-between p-6 rounded-t-2xl"
                      aria-busy="true"
                    >
                      <div className="flex justify-between items-center">
                        <div className="h-4 w-24 bg-gray-300 rounded" />
                        <div className="h-4 w-8 bg-gray-300 rounded" />
                      </div>
                      <div className="space-y-3 my-auto">
                        <div className="w-12 h-12 bg-gray-300 rounded-xl mx-auto" />
                        <div className="h-5 w-3/4 bg-gray-300 rounded mx-auto" />
                        <div className="h-3 w-1/2 bg-gray-300 rounded mx-auto" />
                      </div>
                      <div className="h-3 w-1/3 bg-gray-300 rounded" />
                    </div>
                  ) : hasImageUrl && !hasError ? (
                    <img
                      src={hasImageUrl}
                      alt={service.title}
                      className="aspect-[16/9] w-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    renderFallbackPlaceholder(service.id)
                  )}

                  {/* Category Pill Tag Overlay on Image */}
                  <div className="absolute top-4 start-4 z-10">
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-white border border-white/20">
                      {service.category}
                    </span>
                  </div>

                  {/* Corner Index */}
                  <div className="absolute top-4 end-4 z-10">
                    <span className="text-xs font-mono font-bold text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* 2. Bottom Section: Card UI (Title, Description) */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold tracking-tight text-neutral-950 font-display group-hover:text-neutral-900 transition-colors">
                        {service.title}
                      </h3>
                      <span className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-neutral-800 transition-colors">
                        {isRTL ? (
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        ) : (
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        )}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-900">
                    <span className="truncate max-w-[180px] sm:max-w-none">{service.badgeText}</span>
                    <span className="inline-flex items-center gap-1 text-neutral-950 underline underline-offset-2 shrink-0">
                      {service.actionText}
                      {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
