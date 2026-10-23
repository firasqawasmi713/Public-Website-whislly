import React, { useState } from 'react';
import { PageType, PricingPackage } from '../types';
import { PackageBookingModal } from '../components/PackageBookingModal';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Crown,
  Calendar,
  BarChart3,
  Video,
  Target,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SocialMediaPageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenContact: () => void;
}

export const SocialMediaPage: React.FC<SocialMediaPageProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const { t, isRTL } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);
  const [filterGoal, setFilterGoal] = useState<'all' | 'one-time' | 'monthly' | 'comprehensive'>('all');
  const [openFaqs, setOpenFaqs] = useState<number[]>([0, 1]);

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const currencySymbol = isRTL ? 'د.أ' : 'JOD';

  const packages: PricingPackage[] = [
    {
      id: 'one-time-design',
      name: t('socialPage.pkgs.pkg1.name', 'One-Time Design Package'),
      badge: t('socialPage.pkgs.pkg1.badge', 'Launch Boost'),
      price: 199,
      originalPrice: 250,
      currency: currencySymbol,
      billingPeriod: 'one-time',
      description: t(
        'socialPage.pkgs.pkg1.desc',
        'Ideal for businesses that need a strong boost in visual content and want to establish a consistent, professional look across their social media accounts.'
      ),
      includes: isRTL
        ? [
            '9 تصاميم بوست للشبكة (Feed)',
            '15 تصميم ستوري تفاعلي',
            '4 تصاميم ريلز جاهزة',
            'تنسيق شبكة الحساب وترتيب مظهر الملف الشخصي',
          ]
        : [
            '9 Feed Post Designs',
            '15 Story Designs',
            '4 Reel Designs',
            'Account Grid Design and Profile Layout Coordination',
          ],
      objective: t(
        'socialPage.pkgs.pkg1.objective',
        'Give your social media account a professional, cohesive appearance with a set of ready-to-use designs that reflect your brand identity.'
      ),
      isPopular: false,
    },
    {
      id: 'monthly-subscription',
      name: t('socialPage.pkgs.pkg2.name', 'Monthly Subscription'),
      badge: t('socialPage.pkgs.pkg2.badge', 'Continuous Engagement'),
      price: 100,
      currency: currencySymbol,
      billingPeriod: 'month',
      description: t(
        'socialPage.pkgs.pkg2.desc',
        'Ideal for businesses that need consistent design content to keep their social media accounts active and maintain regular engagement with their audience.'
      ),
      includes: isRTL
        ? [
            '10 تصاميم بوست للشبكة',
            '15 تصميم ستوري',
            'تصميم ريلز احترافي',
            'تنسيق وترتيب شبكة الحساب',
          ]
        : [
            '10 Feed Post Designs',
            '15 Story Designs',
            '1 Reel Design',
            'Account Grid Design and Profile Layout Coordination',
          ],
      objective: t(
        'socialPage.pkgs.pkg2.objective',
        'Maintain a consistent, organized, and professional social media presence for your brand.'
      ),
      isPopular: false,
    },
    {
      id: 'comprehensive-monthly',
      name: t('socialPage.pkgs.pkg3.name', 'Comprehensive Monthly Subscription'),
      badge: t('socialPage.pkgs.pkg3.badge', 'All-In-One Flagship'),
      price: 250,
      currency: currencySymbol,
      billingPeriod: 'month',
      description: t(
        'socialPage.pkgs.pkg3.desc',
        'Our all-in-one package for businesses looking for a more comprehensive approach to visual content, social media marketing, and account growth.'
      ),
      includes: isRTL
        ? [
            '10 تصاميم بوست للشبكة',
            '30 تصميم ستوري شهرياً',
            '4 تصاميم ريلز',
            'تنسيق احترافي لشبكة الحساب والبروفايل',
            'جلسة تصوير فيديو ريلز ميدانية في الموقع',
            'كتابة وصياغة المحتوى والنصوص الإبداعية',
            'إدارة وتنفيذ إعلانات ممولة لمدة 3 أيام',
            'تخطيط جدول وخارطة المحتوى الشهرية',
            'تحليل المنافسين في السوق',
            'تقرير شهري شامل لتحليل الأداء والنتائج',
          ]
        : [
            '10 Feed Post Designs',
            '30 Story Designs',
            '4 Reel Designs',
            'Account Grid Design and Profile Layout Coordination',
            '1 Reel Video Shoot',
            'Content Writing',
            '3 Days of Paid Advertising',
            'Monthly Content Calendar Planning',
            'Competitor Analysis',
            'Monthly Analytics and Performance Report',
          ],
      objective: t(
        'socialPage.pkgs.pkg3.objective',
        'Provide comprehensive support for content creation, strategic planning, and promotion, while monitoring account performance to help improve marketing results and support business growth.'
      ),
      isPopular: true,
    },
  ];

  const faqsData = isRTL
    ? [
        {
          q: 'باقة 1 – التصميم لمرة واحدة (199 د.أ): لمن تناسب؟',
          sub: '199 دينار أردني (استثمار لمرة واحدة)',
          a1: 'باقة 1 – التصميم لمرة واحدة هي الخيار الأمثل للأنشطة التي تحتاج مجموعة تصاميم متقنة لمرة واحدة ترفع بها الجاذبية البصرية لحسابها وتبني مظهراً أنيقاً.',
          a2: 'تناسبك إذا كان فريقك الداخلي يتولى كتابة النصوص والنشر اليومي، ولكنه يحتاج أساساً تصميمياً رفيعاً يتضمن 9 بوستات و15 ستوري و4 ريلز وتنسيقاً جمالياً للبروفايل.',
          pkgIndex: 0,
        },
        {
          q: 'باقة 2 – 100 د.أ شهرياً: ما الذي يجعل هذا الاشتراك خياراً مناسباً؟',
          sub: '100 دينار أردني / شهرياً (اشتراك مستمر)',
          a1: 'باقة 2 – 100 د.أ/شهر مثالية للشركات التي تحتاج محتوى تصميمي شهري مستمر يحافظ على حيوية الحساب والتواصل مع الجمهور بتكلفة اقتصادية مدروسة.',
          a2: 'توفر تدفقاً أسبوعياً من التصاميم المتجددة (10 بوستات، 15 ستوري، وتصميم ريلز) مع تنسيق الحساب ليبقى بروفايلك عصرياً دون الحاجة لتوظيف مصمم داخلي متفرغ.',
          pkgIndex: 1,
        },
        {
          q: 'باقة 3 – 250 د.أ شهرياً: ما الذي يميز باقة الاشتراك الشامل؟',
          sub: '250 دينار أردني / شهرياً (الباقة الرائدة الشاملة)',
          a1: 'باقة 3 – 250 د.أ/شهر هي الخيار الأوسع والأكثر تكاملاً للشركات الراغبة في قسم تسويق وإنتاج كامل يتولى التصميم، تصوير الفيديو الميداني، كتابة المحتوى، وإدارة الإعلانات.',
          a2: 'تشمل تصوير فيديو ريلز في موقعك، 10 بوستات، 30 ستوري، 4 ريلز، 3 أيام إعلانات ممولة، خطة محتوى شهرية، تحليل المنافسين، وتقارير دورية لمتابعة النتائج ونمو المبيعات.',
          pkgIndex: 2,
        },
        {
          q: 'هل يمكنني البدء بباقة التصميم لمرة واحدة ثم الترقية للاشتراك الشهري لاحقاً؟',
          sub: '',
          a1: 'نعم بالتأكيد! العديد من شركائنا يبدأون بباقة التصميم لمرة واحدة (199 د.أ) لترسيخ الهوية وتنسيق البروفايل، وبعد لمس الجودة والسرعة ينتقلون بسلاسة للباقة الشهرية المناسبة لاستمرار النشر.',
          a2: '',
          pkgIndex: null,
        },
        {
          q: 'كيف تتم آلية المراجعة والموافقة على التصاميم قبل النشر؟',
          sub: '',
          a1: 'نعرض جميع التصاميم ومقاطع الريلز في لوحة معاينة خاصة تتيح لفريقك طلب التعديلات أو الموافقة عليها بنقرة واحدة. لا يتم نشر أي منشور دون موافقة فريقكم المسبقة.',
          a2: '',
          pkgIndex: null,
        },
      ]
    : [
        {
          q: 'Package 1 – One-Time Design: Who is it best for?',
          sub: '199 JOD (One-Time Investment)',
          a1: 'Package 1 – One-Time Design is best for businesses that need a one-time set of designs to enhance their brand’s visual appeal and create a polished, professional look.',
          a2: 'It is ideal if your team handles daily caption writing and publishing internally, but requires an elite design foundation, account grid layout coordination, 9 feed post designs, 15 story designs, and 4 reel designs ready to publish.',
          pkgIndex: 0,
        },
        {
          q: 'Package 2 – 100 JOD/Month: What makes this subscription ideal?',
          sub: '100 JOD / month (Retainer)',
          a1: 'Package 2 – 100 JOD/Month is ideal for businesses looking for consistent monthly designs and regular audience engagement on a budget.',
          a2: 'It provides a reliable cadence of fresh visuals every week (10 feed post designs, 15 story designs, and 1 reel design) with profile layout coordination so your brand maintains an organized, modern, and active profile without hiring in-house designers.',
          pkgIndex: 1,
        },
        {
          q: 'Package 3 – 250 JOD/Month: What is included in the comprehensive tier?',
          sub: '250 JOD / month (All-in-One Flagship)',
          a1: 'Package 3 – 250 JOD/Month is the most comprehensive option for businesses seeking a wider range of services, including content writing, strategic planning, video production, paid advertising, performance analysis, and greater audience reach.',
          a2: 'This package acts as your full outsourced marketing department. It covers 10 feed post designs, 30 story designs, 4 reel designs, account grid coordination, 1 on-location reel video shoot, copy, 3 days of paid advertising execution, monthly calendar planning, competitor analysis, and monthly analytics reporting.',
          pkgIndex: 2,
        },
        {
          q: 'Can I start with a One-Time package and upgrade to a monthly subscription later?',
          sub: '',
          a1: 'Yes, definitely! Many brands start with the One-Time Design Package (199 JOD) to establish a pristine visual identity and grid benchmark. Once you experience our speed and design caliber, you can switch seamlessly to the 100 JOD/mo or 250 JOD/mo plan for continuous monthly posting.',
          a2: '',
          pkgIndex: null,
        },
        {
          q: 'How does the review and approval process work before publishing?',
          sub: '',
          a1: 'All graphics, reels, and story sequences are presented in a private client preview board for your review. You can request tweaks, adjust copy, or approve assets with a single click. Nothing is published without your team’s complete authorization.',
          a2: '',
          pkgIndex: null,
        },
      ];

  return (
    <div className="w-full text-start">
      {/* =========================================================================
          HERO SECTION: SOCIAL MEDIA MANAGEMENT
          ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-neutral-900 transition-colors"
              >
                {t('nav.home', 'Home')}
              </button>
              <span aria-hidden="true">/</span>
              <button
                onClick={() => onNavigate('home', 'services')}
                className="hover:text-neutral-900 transition-colors"
              >
                {t('nav.services', 'Services')}
              </button>
              <span aria-hidden="true">/</span>
              <span className="text-neutral-900 font-bold">
                {t('socialPage.title', 'Social Media Management')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 font-display leading-[1.1] text-balance">
              {t('socialPage.title', 'Social Media Management')}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              {t(
                'socialPage.subtitle',
                'Elevate your social channels with bespoke graphic design, cinematic reels, strategic grid curation, and data-backed performance advertising crafted specifically for brands in Jordan and the MENA region.'
              )}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#plans-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <span>{t('socialPage.viewPlans', 'View Subscription Plans')}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>

              <a
                href="#comparison-section"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
              >
                <span>{t('socialPage.howToChoose', 'How to Choose the Right Package')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SUBSCRIPTION PLANS (PRICING CARDS)
          ========================================================================= */}
      <section
        id="plans-section"
        className="py-20 sm:py-28 bg-neutral-50/70 border-b border-neutral-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {t('socialPage.plansKicker', 'Transparent Pricing in JOD')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-display">
                {t('socialPage.plansTitle', 'Subscription Plans')}
              </h2>
              <p className="text-base text-neutral-600">
                {t(
                  'socialPage.plansDesc',
                  'Select from our curated tier offerings. Whether you require a one-time aesthetic overhaul or end-to-end monthly marketing and video production.'
                )}
              </p>
            </div>

            {/* Filter Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-white border border-neutral-200 rounded-xl shrink-0 text-xs">
              <button
                onClick={() => setFilterGoal('all')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  filterGoal === 'all'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {t('socialPage.filters.all', 'All Plans')}
              </button>
              <button
                onClick={() => setFilterGoal('one-time')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  filterGoal === 'one-time'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {t('socialPage.filters.oneTime', 'One-Time')}
              </button>
              <button
                onClick={() => setFilterGoal('monthly')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  filterGoal === 'monthly'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {t('socialPage.filters.monthly', '100 JOD/mo')}
              </button>
              <button
                onClick={() => setFilterGoal('comprehensive')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  filterGoal === 'comprehensive'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {t('socialPage.filters.comprehensive', '250 JOD/mo')}
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => {
              const isFiltered =
                filterGoal === 'all' ||
                (filterGoal === 'one-time' && pkg.id === 'one-time-design') ||
                (filterGoal === 'monthly' && pkg.id === 'monthly-subscription') ||
                (filterGoal === 'comprehensive' && pkg.id === 'comprehensive-monthly');

              const isFlagship = pkg.isPopular;

              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                    isFiltered ? 'opacity-100 scale-100' : 'opacity-40 hover:opacity-80'
                  } ${
                    isFlagship
                      ? 'bg-neutral-900 text-white shadow-2xl border-2 border-neutral-950 p-8 sm:p-10 lg:-translate-y-2'
                      : 'bg-white text-neutral-900 shadow-sm border border-neutral-200 p-8 sm:p-10 hover:shadow-lg'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span
                        className={`text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full ${
                          isFlagship
                            ? 'bg-white/10 text-white border border-white/15'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        {pkg.badge}
                      </span>

                      {isFlagship && (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                          <Crown className="w-3.5 h-3.5 fill-amber-400" />
                          {t('socialPage.recommended', 'Recommended')}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight font-display mb-3">
                      {pkg.name}
                    </h3>

                    <div className="mb-6 pb-6 border-b border-current/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-bold font-mono tracking-tight tabular-nums">
                          {pkg.price}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-base font-semibold">
                            {pkg.currency}
                          </span>
                          <span className="text-xs opacity-70">
                            {pkg.billingPeriod === 'month'
                              ? t('socialPage.perMonth', 'per month')
                              : t('socialPage.oneTimeInv', 'one-time investment')}
                          </span>
                        </div>
                      </div>

                      {pkg.originalPrice && (
                        <div className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400">
                          <span className="line-through tabular-nums opacity-60">
                            {pkg.originalPrice} {pkg.currency}
                          </span>
                          <span className="mx-2 font-bold">
                            {t('socialPage.saveOffer', 'Save 51 JOD today')}
                          </span>
                        </div>
                      )}
                    </div>

                    <p
                      className={`text-sm leading-relaxed mb-6 ${
                        isFlagship ? 'text-neutral-300' : 'text-neutral-600'
                      }`}
                    >
                      {pkg.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider block ${
                          isFlagship ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        {t('socialPage.whatsIncluded', "What's Included:")}
                      </span>
                      <ul className="space-y-3 text-sm">
                        {pkg.includes.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                isFlagship
                                  ? 'bg-white/10 text-emerald-400'
                                  : 'bg-neutral-100 text-neutral-900'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <span className={isFlagship ? 'text-neutral-200' : 'text-neutral-700'}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-current/10 space-y-5">
                    <div>
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider block mb-1.5 ${
                          isFlagship ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        {t('socialPage.objective', 'Package Objective:')}
                      </span>
                      <p
                        className={`text-xs leading-relaxed ${
                          isFlagship ? 'text-neutral-300' : 'text-neutral-600'
                        }`}
                      >
                        {pkg.objective}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedPackage(pkg)}
                      className={`w-full py-3.5 px-6 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-sm ${
                        isFlagship
                          ? 'bg-white text-neutral-950 hover:bg-neutral-100'
                          : 'bg-neutral-900 text-white hover:bg-neutral-800'
                      }`}
                    >
                      <span>
                        {t('socialPage.chooseBtn', 'Choose')} {pkg.name.split(' ')[0]}
                      </span>
                      {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HOW TO CHOOSE THE RIGHT PACKAGE (FAQS)
          ========================================================================= */}
      <section
        id="comparison-section"
        className="py-20 sm:py-28 bg-white border-b border-neutral-200 scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12 text-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {t('socialPage.faqKicker', 'Frequently Asked Questions & Guidance')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-display">
              {t('socialPage.faqTitle', 'How to Choose the Right Package')}
            </h2>
            <p className="text-base text-neutral-600 max-w-2xl leading-relaxed">
              {t(
                'socialPage.faqDesc',
                'Every business is at a distinct stage of digital maturity. Explore answers to our most common pricing, deliverables, and package selection questions.'
              )}
            </p>
          </div>

          <div className="space-y-4">
            {faqsData.map((faq, index) => (
              <div
                key={index}
                className="border border-neutral-200 rounded-2xl overflow-hidden bg-neutral-50/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                  aria-expanded={openFaqs.includes(index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-bold flex items-center justify-center shrink-0">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-950 font-display">
                        {faq.q}
                      </h3>
                      {faq.sub && (
                        <span className="text-xs text-neutral-500 font-mono">{faq.sub}</span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      openFaqs.includes(index)
                        ? 'rotate-180 bg-neutral-900 text-white'
                        : 'text-neutral-500 bg-white'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {openFaqs.includes(index) && (
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-200/60 text-sm text-neutral-600 space-y-4 animate-in fade-in duration-200">
                    <p className="leading-relaxed">{faq.a1}</p>
                    {faq.a2 && (
                      <p className="leading-relaxed text-xs text-neutral-500">{faq.a2}</p>
                    )}
                    {faq.pkgIndex !== null && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedPackage(packages[faq.pkgIndex as number])}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm"
                        >
                          <span>
                            {t('socialPage.selectBtnPrefix', 'Select')}{' '}
                            {packages[faq.pkgIndex as number].name}
                          </span>
                          <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Agency Workflow & Quality Commitment */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-200 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-sm">
                <Calendar className="w-4 h-4 text-neutral-700" />
                <span>{t('socialPage.workflow.step1Title', '1. Monthly Strategy')}</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {t('socialPage.workflow.step1Desc', 'We align on campaigns, offers, and calendar themes at the start of each cycle.')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-sm">
                <Video className="w-4 h-4 text-neutral-700" />
                <span>{t('socialPage.workflow.step2Title', '2. Content Creation')}</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {t('socialPage.workflow.step2Desc', 'Designers and video producers craft on-brand posts, stories, and engaging reels.')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-sm">
                <Target className="w-4 h-4 text-neutral-700" />
                <span>{t('socialPage.workflow.step3Title', '3. Ad Orchestration')}</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {t('socialPage.workflow.step3Desc', 'High-converting creatives are boosted to precise geographic demographics.')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-sm">
                <BarChart3 className="w-4 h-4 text-neutral-700" />
                <span>{t('socialPage.workflow.step4Title', '4. Performance Review')}</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {t('socialPage.workflow.step4Desc', 'Transparent monthly reporting on follower growth, engagement rates, and ROI.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Booking Modal */}
      <PackageBookingModal
        pkg={selectedPackage}
        isOpen={!!selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />
    </div>
  );
};
