import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// 1. Import the local PNG images directly from the assets folder
import socialMediaImg from '../assets/socialmediamanagement.png';
import creativeProductionImg from '../assets/creativeproduction.png';
import businessSolutionsImg from '../assets/business.solutions.png';

interface OurServicesSectionProps {
  onNavigate?: (
    page: 'home' | 'social-media' | 'careers' | 'creative-production' | 'business-solutions',
    hash?: string
  ) => void;
}

export const OurServicesSection: React.FC<OurServicesSectionProps> = ({
  onNavigate,
}) => {
  const { t, isRTL } = useLanguage();

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

  // 2. Add the imported images directly to your data array
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
      image: socialMediaImg, 
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
      image: creativeProductionImg,
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
      image: businessSolutionsImg,
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
            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.id)}
                className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:border-neutral-950 cursor-pointer ring-1 ring-neutral-900/5 text-start"
              >
                {/* 1. Top Section: 16:9 Aspect Ratio Image */}
                <div className="relative w-full overflow-hidden bg-neutral-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="aspect-[16/9] w-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                  />

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
