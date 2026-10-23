import React from 'react';
import { PageType } from '../types';
import {
  Compass,
  Target,
  Layers,
  Sparkles,
  Cpu,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Building2,
  Code2,
  Palette,
  CheckCircle2,
  Award,
  ChevronRight,
  ChevronLeft,
  UserCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutUsPageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenContact: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const { t, isRTL } = useLanguage();

  const defaultTeamImageUrl =
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
  const defaultFounderImageUrl =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';

  const differentiators = [
    {
      title: t('aboutPage.diff1Title', 'All-in-One Solutions'),
      icon: Layers,
      description: t(
        'aboutPage.diff1Desc',
        'From branding to cloud software, we eliminate the need to juggle multiple disconnected agencies. Everything is unified under one strategic umbrella.'
      ),
      accent: 'border-blue-200 hover:border-blue-400 bg-blue-50/30',
      iconBg: 'bg-blue-100 text-blue-700',
    },
    {
      title: t('aboutPage.diff2Title', 'Creative Excellence'),
      icon: Sparkles,
      description: t(
        'aboutPage.diff2Desc',
        'World-class visual design, videography, and storytelling that capture attention and elevate brand prestige across all commercial touchpoints.'
      ),
      accent: 'border-purple-200 hover:border-purple-400 bg-purple-50/30',
      iconBg: 'bg-purple-100 text-purple-700',
    },
    {
      title: t('aboutPage.diff3Title', 'Smart Technology'),
      icon: Cpu,
      description: t(
        'aboutPage.diff3Desc',
        'Custom software, high-performance web applications, and seamless system integrations built with modern architecture to scale with your volume.'
      ),
      accent: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/30',
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: t('aboutPage.diff4Title', 'Growth-Driven Approach'),
      icon: TrendingUp,
      description: t(
        'aboutPage.diff4Desc',
        'Every campaign, deliverable, and line of code is engineered with your bottom-line business metrics, conversion efficiency, and ROI in mind.'
      ),
      accent: 'border-amber-200 hover:border-amber-400 bg-amber-50/30',
      iconBg: 'bg-amber-100 text-amber-700',
    },
  ];

  return (
    <div className="w-full bg-white text-neutral-900 text-start">
      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: ABOUT WHISLLY (HERO & INTRO)                        */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:py-24 border-b border-neutral-200/80 bg-gradient-to-b from-neutral-50/80 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb indicator */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-8">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-neutral-900 transition-colors"
            >
              Whislly
            </button>
            {isRTL ? (
              <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            )}
            <span className="text-neutral-900">{t('aboutPage.breadcrumb', 'About Us')}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 text-white shadow-sm">
                <Building2 className="w-3.5 h-3.5 text-neutral-300" />
                <span>{t('aboutPage.badge', 'Diamond Sword Tech Solutions Co. Trademark')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.15]">
                {t('aboutPage.titleLine1', 'We Build Brands.')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-500">
                  {t('aboutPage.titleLine2', 'We Elevate Businesses.')}
                </span>
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
                <p className="font-medium text-neutral-800">
                  {t(
                    'aboutPage.p1',
                    'Whislly is a business consulting and technology solutions trademark operating under Diamond Sword Tech Solutions Company, dedicated to helping businesses grow, stand out, and reach their full potential.'
                  )}
                </p>

                <p>
                  {t(
                    'aboutPage.p2',
                    "We bring creativity, technology, marketing, and business expertise together to deliver tailored solutions that meet each client's needs."
                  )}
                </p>

                <p>
                  {t(
                    'aboutPage.p3',
                    'Our all-in-one approach simplifies the way businesses access the services they need, providing a reliable partner for every stage of their journey.'
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-neutral-950 text-white font-medium text-sm hover:bg-neutral-800 active:scale-[0.99] transition-all shadow-md group cursor-pointer"
                >
                  <span>{t('aboutPage.startConvo', 'Start a Conversation')}</span>
                  {isRTL ? (
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>

                <button
                  onClick={() => onNavigate('business-solutions')}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white border border-neutral-300 text-neutral-800 font-medium text-sm hover:bg-neutral-50 hover:border-neutral-400 transition-colors shadow-sm cursor-pointer"
                >
                  <span>{t('aboutPage.exploreSolutions', 'Explore Solutions')}</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-neutral-200">
                <div>
                  <div className="text-2xl font-bold text-neutral-900 font-display">100%</div>
                  <div className="text-xs text-neutral-500 font-medium mt-0.5">
                    {t('aboutPage.highlights.ownership', 'End-to-End Ownership')}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900 font-display">4 Core</div>
                  <div className="text-xs text-neutral-500 font-medium mt-0.5">
                    {t('aboutPage.highlights.disciplines', 'Service Disciplines')}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900 font-display">Enterprise</div>
                  <div className="text-xs text-neutral-500 font-medium mt-0.5">
                    {t('aboutPage.highlights.architecture', 'Grade Architecture')}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Placeholder */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-neutral-200 to-neutral-100 -z-10 blur-sm opacity-70" />

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200 shadow-xl group">
                  <img
                    src={defaultTeamImageUrl}
                    alt="Whislly agency collaborative workspace and digital strategy team"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-neutral-900">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                        {t('aboutPage.studioCaption', 'Whislly Creative Studio & Tech Lab')}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-1">
                      {t('aboutPage.studioSub', 'Collaborative engineering and brand consulting in action.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2 & 3: OUR MISSION & OUR VISION (SIDE-BY-SIDE)         */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 lg:py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700 mb-3">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('aboutPage.valuesKicker', 'Foundational Values')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-display text-white">
              {t('aboutPage.valuesTitle', 'Guiding Our Journey & Your Success')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Our Mission Card */}
            <div className="relative p-8 sm:p-10 rounded-2xl bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 transition-all shadow-xl flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <div className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-400">
                  {t('aboutPage.mission.kicker', 'Purpose & Purposefulness')}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {t('aboutPage.mission.title', 'Our Mission')}
                </h3>
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed pt-2">
                  {t(
                    'aboutPage.mission.text',
                    '“To empower businesses with integrated creative, marketing, and technology solutions that drive real results. We aim to be a trusted partner that transforms ambitious ideas into impactful digital realities.”'
                  )}
                </p>
              </div>

              <div className="pt-8 border-t border-neutral-800/80 mt-6 flex items-center gap-2 text-xs font-medium text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>{t('aboutPage.mission.badge', 'Pragmatic Execution • Measurable Impact')}</span>
              </div>
            </div>

            {/* Our Vision Card */}
            <div className="relative p-8 sm:p-10 rounded-2xl bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 transition-all shadow-xl flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="inline-block text-xs font-semibold uppercase tracking-wider text-purple-400">
                  {t('aboutPage.vision.kicker', 'Long-Term Horizon')}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {t('aboutPage.vision.title', 'Our Vision')}
                </h3>
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed pt-2">
                  {t(
                    'aboutPage.vision.text',
                    '“To become a leading regional force in business growth and digital transformation—recognized for innovation, creative excellence, and measurable impact across every industry we touch.”'
                  )}
                </p>
              </div>

              <div className="pt-8 border-t border-neutral-800/80 mt-6 flex items-center gap-2 text-xs font-medium text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>{t('aboutPage.vision.badge', 'Regional Leadership • Enduring Innovation')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: WHY WHISLLY?                                       */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 lg:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {t('aboutPage.whyTitle', 'Why Whislly?')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 font-display mt-2">
              {t('aboutPage.whyTitle', 'Why Whislly?')}
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg mt-3">
              {t(
                'aboutPage.whySubtitle',
                'We eliminate silos by fusing creative vision, computational engineering, and strategic commercial acumen into one cohesive force.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {differentiators.map((diff, index) => {
              const IconComponent = diff.icon;
              return (
                <div
                  key={index}
                  className={`p-8 rounded-2xl border transition-all duration-300 ${diff.accent} shadow-sm hover:shadow-md flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${diff.iconBg} font-bold`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-neutral-400 tracking-wider font-mono">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-display">
                      {diff.title}
                    </h3>

                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                      {diff.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center text-xs font-semibold text-neutral-700">
                    <span>{t('aboutPage.diffFooter', 'Delivered with rigorous quality control')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 max-w-3xl mx-auto text-center p-6 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-200/90 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-3 text-xs font-bold">
              ✓
            </div>
            <p className="text-base sm:text-lg font-medium text-neutral-800 leading-relaxed">
              {t(
                'aboutPage.closingQuote',
                '“At Whislly, our commitment goes beyond delivering services. We build enduring partnerships rooted in transparency, innovation, and measurable business growth.”'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: LEADERSHIP / MEET THE FOUNDER                       */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-neutral-50/70 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-200/80 text-neutral-800 mb-3">
              <UserCheck className="w-3.5 h-3.5 text-neutral-700" />
              <span>{t('aboutPage.founderSection.kicker', 'Leadership & Vision')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 font-display">
              {t('aboutPage.founderSection.title', 'Meet the Founder')}
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg mt-2">
              {t(
                'aboutPage.founderSection.subtitle',
                'Driven by a deep passion for digital architecture, craftsmanship, and entrepreneurial acceleration.'
              )}
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              <div className="md:col-span-5 relative bg-neutral-900">
                <div className="relative aspect-[3/4] w-full h-full overflow-hidden">
                  <img
                    src={defaultFounderImageUrl}
                    alt="Firas Mohammad Alqawasmi - Founder & CEO of Whislly"
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-60" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md border border-white/30 text-white">
                      {t('aboutPage.founderSection.badge', 'Executive Profile')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      {t('aboutPage.founderSection.visionary', 'Visionary Behind Whislly')}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display tracking-tight mt-1">
                      {t('aboutPage.founderSection.name', 'Firas Mohammad Alqawasmi')}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-neutral-700 mt-1">
                      {t(
                        'aboutPage.founderSection.role',
                        'Founder & CEO | Full-Stack Developer & Software Designer'
                      )}
                    </p>
                  </div>

                  <blockquote className="p-4 rounded-xl bg-neutral-50 border-l-4 border-neutral-900 text-neutral-800 text-sm italic font-medium">
                    {t(
                      'aboutPage.founderSection.quote',
                      '“Bridging engineering precision with creative vision to construct platforms that don’t just exist online, but dominate their market.”'
                    )}
                  </blockquote>

                  <div className="space-y-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    <p>
                      {t(
                        'aboutPage.founderSection.bio1',
                        'With dual expertise spanning modern software engineering and commercial business strategy, Firas leads Whislly’s technical architecture, software design, and digital marketing strategies.'
                      )}
                    </p>
                    <p>
                      {t(
                        'aboutPage.founderSection.bio2',
                        'Under his direction, Whislly acts as a dedicated venture accelerator—helping brands construct bespoke business applications, enterprise web platforms, and automated delivery aggregations that convert visitors into enduring customer relationships.'
                      )}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                      {t('aboutPage.founderSection.coreSpecialization', 'Core Areas of Specialization')}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-200">
                        <Code2 className="w-3.5 h-3.5 text-neutral-600" />
                        {t('aboutPage.founderSection.spec1', 'Full-Stack Architecture')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-200">
                        <Palette className="w-3.5 h-3.5 text-neutral-600" />
                        {t('aboutPage.founderSection.spec2', 'UI/UX & Product Design')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-200">
                        <TrendingUp className="w-3.5 h-3.5 text-neutral-600" />
                        {t('aboutPage.founderSection.spec3', 'Digital Marketing & Growth')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-200">
                        <Cpu className="w-3.5 h-3.5 text-neutral-600" />
                        {t('aboutPage.founderSection.spec4', 'Custom Business Software')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>{t('aboutPage.founderSection.company', 'Diamond Sword Tech Solutions Company')}</span>
                  </div>

                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-700 group transition-colors cursor-pointer"
                  >
                    <span>{t('aboutPage.founderSection.connectDirectly', 'Connect directly')}</span>
                    {isRTL ? (
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FINAL CALL TO ACTION BANNER                                   */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-neutral-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-neutral-300 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Ready for the next stage?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
            {t('aboutPage.ctaTitle', 'Let’s Build Something Exceptional Together')}
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t(
              'aboutPage.ctaDesc',
              'Whether you need bespoke software development, high-impact branding, or comprehensive food app restaurant operations, Whislly is your single partner for sustainable growth.'
            )}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-100 active:scale-[0.99] transition-all shadow-lg group cursor-pointer"
            >
              <span>{t('aboutPage.scheduleBtn', 'Schedule a Strategy Session')}</span>
              {isRTL ? (
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              )}
            </button>

            <button
              onClick={() => onNavigate('home', 'services')}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-semibold text-sm hover:bg-neutral-850 hover:border-neutral-700 transition-colors cursor-pointer"
            >
              <span>{t('aboutPage.viewAllBtn', 'View All Services')}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
