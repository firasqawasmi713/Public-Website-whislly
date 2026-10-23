import React from 'react';
import { PageType } from '../types';
import {
  Globe,
  ShoppingCart,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BusinessSolutionsPageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenContact: () => void;
}

export const BusinessSolutionsPage: React.FC<BusinessSolutionsPageProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const { t, isRTL } = useLanguage();

  const flagshipDeliverables = isRTL
    ? [
        'هندسة القائمة وتحسين معدل تحويل الأصناف',
        'تسعير ديناميكي وتدقيق نسب العمولات والأرباح',
        'إدارة استراتيجيات الحملات والعروض والخصومات',
        'معالجة آلية لكشوفات الحسابات الأسبوعية والشهرية وتحليلات الأرباح والخسائر',
      ]
    : [
        'Menu Architecture & Item Conversion Optimization',
        'Dynamic Pricing & Commission Margin Auditing',
        'Campaign & Discount Strategy Management',
        'Automated Weekly & Monthly Statement Ingestion & P&L Analytics',
      ];

  const secondarySolutions = [
    {
      id: 'websites-design',
      letter: 'A',
      title: t('businessPage.secondary.items.web.title', 'Websites Design'),
      category: t('businessPage.secondary.items.web.category', 'Engineering & Conversion'),
      focus: t('businessPage.secondary.items.web.focus', 'Custom web engineering and performant digital experiences.'),
      description: t(
        'businessPage.secondary.items.web.description',
        'We architect lightning-fast, bespoke digital touchpoints designed for maximum visitor engagement and organic search dominance.'
      ),
      badge: t('businessPage.secondary.items.web.badge', '<0.8s LCP Speed'),
      icon: Globe,
      defaultImageUrl:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Whislly Web Engineering and High-Converting Design Showcase',
      deliverables: isRTL
        ? [
            'مواقع وبوابات شركات متقدمة',
            'صفحات هبوط عالية التحويل',
            'بوابات إلكترونية تفاعلية',
            'ملاءمة كاملة لجميع شاشات الموبايل',
          ]
        : [
            'Custom Corporate Platforms',
            'High-Converting Landing Pages',
            'Interactive Web Portals',
            'Mobile Optimization',
          ],
    },
    {
      id: 'ecommerce-model',
      letter: 'B',
      title: t('businessPage.secondary.items.ecommerce.title', 'E-Commerce Full Business Model'),
      category: t('businessPage.secondary.items.ecommerce.category', 'Storefronts & Architecture'),
      focus: t(
        'businessPage.secondary.items.ecommerce.focus',
        'Complete digital storefront infrastructure from sourcing to checkout.'
      ),
      description: t(
        'businessPage.secondary.items.ecommerce.description',
        'Comprehensive digital commerce infrastructure engineered for high-volume transactions and frictionless user purchasing.'
      ),
      badge: t('businessPage.secondary.items.ecommerce.badge', 'Zero-Friction Checkout'),
      icon: ShoppingCart,
      defaultImageUrl:
        'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Whislly E-Commerce Architecture and Checkout Infrastructure',
      deliverables: isRTL
        ? [
            'هندسة وتصميم متجر إلكتروني مخصص',
            'ربط وتكامل بوابات الدفع الإلكتروني',
            'تحسين خطوات الدفع واسترجاع السلات المتروكة',
            'مزامنة المخزون الآلية',
          ]
        : [
            'Custom Store Architecture',
            'Payment Gateway Integration',
            'Cart Abandonment & Checkout Optimization',
            'Inventory Sync',
          ],
    },
    {
      id: 'automation-systems',
      letter: 'C',
      title: t('businessPage.secondary.items.automation.title', 'Automation & Workflow Systems'),
      category: t('businessPage.secondary.items.automation.category', 'Data Pipelines & APIs'),
      focus: t(
        'businessPage.secondary.items.automation.focus',
        'Eliminating manual friction and connecting operational workflows through automated data pipelines.'
      ),
      description: t(
        'businessPage.secondary.items.automation.description',
        'Reclaim valuable operating hours by automating repetitive administrative burdens.'
      ),
      badge: t('businessPage.secondary.items.automation.badge', '100% Automated Sync'),
      icon: Cpu,
      defaultImageUrl:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Whislly Workflow Automation and Internal Tool Architecture',
      deliverables: isRTL
        ? [
            'لوحات تحكم ومتابعة داخلية مخصصة',
            'أنظمة فوترة وإصدار فواتير تلقائية',
            'مزامنة البيانات بين منصات متعددة',
            'ربط واجهات برمجة التطبيقات (APIs)',
          ]
        : [
            'Custom Internal Dashboards',
            'Automated Invoicing & Billing Workflows',
            'Multi-Platform Data Sync',
            'API Integrations',
          ],
    },
  ];

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950 text-start">
      {/* =========================================================================
          1. HERO SECTION: Full width, spacious padding, clean typography & grid pattern
          ========================================================================= */}
      <section className="relative w-full py-20 sm:py-28 lg:py-32 bg-neutral-950 border-b border-neutral-800/80 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:28px_28px]"
          aria-hidden="true"
        />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

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
            <span className="text-emerald-400 font-medium">
              {t('businessPage.title', 'Business Solutions')}
            </span>
          </div>

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('businessPage.kicker', 'Technology & Growth Infrastructure')}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display leading-[1.08] text-balance">
              {t('businessPage.title', 'Business Solutions & Growth Architecture')}
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl">
              {t(
                'businessPage.subtitle',
                'Bridging the gap between operational workflows and digital technology. We optimize systems, build custom platforms, and scale your brand’s revenue channels.'
              )}
            </p>

            {/* Quick KPI Highlights */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-neutral-400">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {t('businessPage.highlights.audit', 'Aggregator P&L Auditing')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {t('businessPage.highlights.ecommerce', 'Headless E-Commerce Engines')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {t('businessPage.highlights.pipelines', 'Automated Internal Pipelines')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FEATURED FLAGSHIP SERVICE: Full-width bento-style hero card
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-neutral-900/50 relative border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 font-semibold">
                {t('businessPage.flagship.kicker', 'Core Specialization')}
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
                {t('businessPage.flagship.sectionTitle', 'Featured Flagship Solution')}
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md">
              {t(
                'businessPage.flagship.sectionDesc',
                'Engineered specifically for gastronomy brands seeking dominant visibility and maximized margins on regional delivery aggregators.'
              )}
            </p>
          </div>

          {/* Full-width Bento Flagship Card */}
          <article className="relative bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 rounded-3xl border border-neutral-700/70 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Flagship Metadata & Deliverables */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t('businessPage.flagship.badge', 'FLAGSHIP SOLUTION')}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {t('businessPage.flagship.subBadge', 'F&B Aggregator Operations')}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display leading-tight">
                  {t('businessPage.flagship.title', 'Restaurant Management on Food Apps')}
                </h3>

                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
                  {t(
                    'businessPage.flagship.desc',
                    'End-to-end operational optimization and performance management across leading food delivery platforms (Talabat, Careem, and aggregator apps).'
                  )}
                </p>

                {/* Key Deliverables List */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-200 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('businessPage.flagship.deliverablesTitle', 'Operational Deliverables')}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {flagshipDeliverables.map((deliverable, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-neutral-200 bg-neutral-800/60 border border-neutral-700/60 rounded-xl px-4 py-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Flagship CTA Button */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    <span>{t('businessPage.flagship.cta', 'Audit My Restaurant Menus')}</span>
                    {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>

                  <div className="flex items-center gap-2 px-3 py-2 text-xs text-neutral-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{t('businessPage.flagship.guarantee', 'Guaranteed Commission & Margin Clarity')}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Analytics Graphic */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-neutral-950 group/image">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80"
                      alt="Restaurant Management and Delivery Aggregator Analytics Dashboard"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                    {/* Floating Simulated Analytical Dashboard Widgets */}
                    <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                            Talabat · Careem Live
                          </span>
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono text-neutral-300 bg-black/60 backdrop-blur-md border border-white/10 hidden sm:inline-block">
                            {t('businessPage.flagship.metrics.syncRate', 'Sync Rate: 99.8%')}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md text-xs font-mono font-bold">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{t('businessPage.flagship.metrics.marginIncrease', '+28.4% Net Margins')}</span>
                        </div>
                      </div>

                      {/* Bottom Metric Bar */}
                      <div className="bg-neutral-950/85 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-white/10 grid grid-cols-3 gap-3 text-center">
                        <div className="border-r border-white/10 pr-2">
                          <div className="text-[10px] font-mono text-neutral-400 uppercase">
                            {t('businessPage.flagship.metrics.aov', 'Avg Order Value')}
                          </div>
                          <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">
                            {isRTL ? '14.80 د.أ' : '14.80 JOD'}
                          </div>
                        </div>
                        <div className="border-r border-white/10 pr-2">
                          <div className="text-[10px] font-mono text-neutral-400 uppercase">
                            {t('businessPage.flagship.metrics.convRate', 'Menu Conv. Rate')}
                          </div>
                          <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono mt-0.5">
                            22.4%
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-neutral-400 uppercase">
                            {t('businessPage.flagship.metrics.preventedLoss', 'Margin Loss Prevented')}
                          </div>
                          <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">
                            {isRTL ? '3,420 د.أ/شهر' : '3,420 JOD/mo'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-neutral-400 px-2">
                  <span className="font-mono">
                    {t('businessPage.flagship.aggregators', 'Talabat · Careem · Deliveroo · Jahez')}
                  </span>
                  <span className="text-emerald-400 font-medium">
                    {t('businessPage.flagship.realtime', 'Real-Time P&L Auditing')}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================================
          3. SECONDARY SOLUTIONS GRID
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-14 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              {t('businessPage.secondary.kicker', 'Operational & Digital Engineering')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              {t('businessPage.secondary.title', 'Scalable Technology Infrastructure')}
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
              {t(
                'businessPage.secondary.desc',
                'Beyond food aggregator management, we design and build complete technical ecosystems that automate workflows, expand sales channels, and future-proof digital operations.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {secondarySolutions.map((service, index) => {
              const IconComp = service.icon;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="group bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/20"
                >
                  <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-neutral-900 border-b border-neutral-800/80">
                    <img
                      src={service.defaultImageUrl}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-neutral-300 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {service.letter} · 0{index + 1}
                      </span>
                      <span className="font-medium text-emerald-400 bg-emerald-500/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-emerald-500/20">
                        {service.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-4 start-4 z-10 flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-neutral-950/90 border border-white/10 flex items-center justify-center text-emerald-400 shadow-md">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-white/90 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold tracking-tight text-white font-display group-hover:text-emerald-300 transition-colors">
                        {service.title}
                      </h3>

                      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 border-l-2 border-emerald-500/60 ps-3">
                        {service.focus}
                      </div>

                      <p className="text-sm text-neutral-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-neutral-800">
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                        {t('businessPage.secondary.keyDeliverables', 'Key Deliverables')}
                      </div>
                      <ul className="space-y-2">
                        {service.deliverables.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={onOpenContact}
                        className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-xs sm:text-sm font-semibold text-white border border-neutral-700/60 hover:border-emerald-500/40 transition-all duration-200 cursor-pointer group/btn"
                      >
                        <span>
                          {t('businessPage.secondary.inquireAbout', 'Inquire About')} {service.title}
                        </span>
                        {isRTL ? (
                          <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover/btn:-translate-x-1 transition-transform" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover/btn:translate-x-1 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CALL TO ACTION BANNER
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-neutral-950 relative border-t border-neutral-800/80 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="relative rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-8 sm:p-14 lg:p-16 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                <Zap className="w-3.5 h-3.5" />
                <span>{t('businessPage.ctaBanner.badge', 'Operational Diagnosis & Consultation')}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display leading-tight text-balance">
                {t('businessPage.ctaBanner.title', 'Ready to scale your business operations?')}
              </h2>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {t(
                  'businessPage.ctaBanner.desc',
                  'Let’s diagnose your current bottlenecks and engineer a customized digital or operational solution.'
                )}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm sm:text-base tracking-wide transition-all duration-200 active:scale-[0.98] shadow-xl shadow-emerald-500/20 cursor-pointer"
                >
                  <span>{t('businessPage.ctaBanner.scheduleBtn', 'Schedule a Strategic Consultation')}</span>
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => onNavigate('creative-production')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <span>{t('businessPage.ctaBanner.viewCreativeBtn', 'View Creative & Production')}</span>
                  <ArrowUpRight className={`w-4 h-4 text-neutral-400 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>

              <div className="pt-8 border-t border-neutral-800 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('businessPage.ctaBanner.confidential', 'Confidential Data Handling')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('businessPage.ctaBanner.noLockIn', 'No Lock-In Diagnostic')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('businessPage.ctaBanner.roadmaps', 'Tailored Implementation Roadmaps')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
