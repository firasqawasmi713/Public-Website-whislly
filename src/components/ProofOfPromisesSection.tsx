import React, { useState } from 'react';
import { ProofItem } from '../types';
import { VisualShowcaseAsset } from './VisualShowcaseAsset';
import { ShowcaseModal } from './ShowcaseModal';
import { useLanguage } from '../context/LanguageContext';

interface ProofOfPromisesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ProofOfPromisesSection: React.FC<ProofOfPromisesSectionProps> = ({
  onSelectService,
}) => {
  const { t, isRTL } = useLanguage();
  const [selectedProof, setSelectedProof] = useState<ProofItem | null>(null);

  const proofItems: ProofItem[] = [
    {
      id: 'food-apps',
      title: t('proofSection.case1.title', 'Food Apps Menu Photography'),
      category: t('proofSection.case1.category', 'Creative & Production'),
      client: t('proofSection.case1.client', 'Artisan Culinary Group (Talabat & Careem Partner)'),
      metric: '+148%',
      metricLabel: t('proofSection.case1.metricLabel', 'Increase in High-Ticket Menu Conversions'),
      description: t(
        'proofSection.case1.description',
        'Engineered an appetizing, high-fidelity visual identity for 40+ restaurant menu items. Utilizing directional studio lighting, color psychology, and strict platform specifications to optimize item clicks and direct order cart additions on major delivery platforms across the region.'
      ),
      tags: isRTL
        ? ['تنسيق أطعمة', 'إضاءة إعلانية', 'تحسين كتالوج التطبيقات', 'طلبات وكريم']
        : ['Food Styling', 'Commercial Lighting', 'App Catalog Optimization', 'Talabat & Careem'],
      visualType: 'food',
    },
    {
      id: 'social-campaign',
      title: t('proofSection.case2.title', 'Social Media Campaign'),
      category: t('proofSection.case2.category', 'Social Media Management'),
      client: t('proofSection.case2.client', 'Kinetics Apparel & Lifestyle'),
      metric: '3.4M',
      metricLabel: t('proofSection.case2.metricLabel', 'Organic Video Views & +312% Audience Growth'),
      description: t(
        'proofSection.case2.description',
        'Crafted a cohesive multi-channel content roadmap combining cinematic reels, curated carousel graphics, and community engagement prompts. Paired with precise micro-targeted Meta advertising that drove a 4.2x return on ad spend (ROAS) in under 90 days.'
      ),
      tags: isRTL
        ? ['إنتاج ريلز', 'تنسيق الشبكة', 'إعلانات ميتا الممولة', 'تحليل الأداء']
        : ['Reel Production', 'Feed Layout Coordination', 'Meta Advertising', 'Analytics'],
      visualType: 'social',
    },
    {
      id: 'branding-solutions',
      title: t('proofSection.case3.title', 'Branding Solutions'),
      category: t('proofSection.case3.category', 'Brand Strategy'),
      client: t('proofSection.case3.client', 'Vanguard Ventures & Holdings'),
      metric: '100%',
      metricLabel: t('proofSection.case3.metricLabel', 'Unified System Across 6 Regional Subsidiaries'),
      description: t(
        'proofSection.case3.description',
        'Developed a comprehensive, future-proof visual language comprising bespoke typography pairings, color physics tokens, architectural stationery, and high-end digital design system components tailored for institutional prestige and market differentiation.'
      ),
      tags: isRTL
        ? ['هوية بصرية', 'مواصفات الخطوط', 'دليل العلامة', 'مطبوعات تجارية']
        : ['Visual Identity', 'Typography Specs', 'Brand Guidelines', 'Collateral'],
      visualType: 'branding',
    },
  ];

  return (
    <section
      id="proof-section"
      className="py-20 sm:py-28 bg-white border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-16 max-w-2xl text-start">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {t('proofSection.kicker', 'Demonstrated Case Studies')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-display">
            {t('proofSection.title', 'Proof of Promises')}
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            {t(
              'proofSection.description',
              'We do not rely on speculative promises. Explore verified creative, social, and branding solutions delivered for modern commercial clients.'
            )}
          </p>
        </div>

        {/* Proof Grid - Simplified 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {proofItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedProof(item)}
              className="group bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:border-neutral-400 hover:shadow-xl transition-all duration-300 cursor-pointer text-start"
            >
              <div>
                {/* Visual Preview Container: strict 1:1 square ratio */}
                <div className="w-full aspect-square border-b border-neutral-200 overflow-hidden bg-neutral-950">
                  <VisualShowcaseAsset
                    type={item.visualType}
                    className="w-full h-full aspect-square group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                {/* Clean Body Content: Category, Title, and "Learn more →" */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="font-mono text-neutral-400">
                      {t('proofSection.casePrefix', 'Case')} 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-neutral-950 font-display group-hover:text-neutral-900 transition-colors">
                    {item.title}
                  </h3>

                  {/* Minimalist Call-To-Action */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                      <span>{t('proofSection.learnMore', 'Learn more')}</span>
                      <span
                        className={`inline-block transform ${
                          isRTL
                            ? 'group-hover:-translate-x-1.5'
                            : 'group-hover:translate-x-1.5'
                        } transition-transform duration-200`}
                      >
                        {isRTL ? '←' : '→'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Details Modal */}
      <ShowcaseModal
        item={selectedProof}
        isOpen={!!selectedProof}
        onClose={() => setSelectedProof(null)}
        onSelectService={onSelectService}
      />
    </section>
  );
};
