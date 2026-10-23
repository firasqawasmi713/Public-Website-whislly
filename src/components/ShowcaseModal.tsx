import React from 'react';
import { ProofItem } from '../types';
import { VisualShowcaseAsset } from './VisualShowcaseAsset';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ShowcaseModalProps {
  item: ProofItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (serviceName: string) => void;
}

export const ShowcaseModal: React.FC<ShowcaseModalProps> = ({
  item,
  isOpen,
  onClose,
  onSelectService,
}) => {
  const { t, isRTL } = useLanguage();
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col text-start">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/70">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              {t('proofSection.modal.kicker', 'Proof of Promise Case Study')}
            </span>
            <h3 className="text-xl font-bold text-neutral-900 font-display">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Visual Canvas */}
          <div className="w-full">
            <VisualShowcaseAsset type={item.visualType} className="h-64 sm:h-72" />
          </div>

          {/* Key Metric Card */}
          <div className="p-4 bg-neutral-900 text-white rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-400">
                {t('proofSection.modal.impact', 'Validated Impact')}
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                {item.metric}
              </div>
              <p className="text-xs text-neutral-300 mt-0.5">{item.metricLabel}</p>
            </div>
            <div className="text-end">
              <span className="text-xs uppercase tracking-wider text-neutral-400">
                {t('proofSection.modal.client', 'Client Partner')}
              </span>
              <div className="text-sm font-semibold text-white">{item.client}</div>
              <span className="text-xs text-neutral-400">{item.category}</span>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              {t('proofSection.modal.execution', 'Project Execution & Strategy')}
            </h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Tags */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap text-xs text-neutral-500">
              <span className="font-semibold text-neutral-800">
                {t('proofSection.modal.deliverables', 'Deliverables:')}
              </span>
              {item.tags.map((tag, idx) => (
                <span key={idx} className="bg-neutral-100 px-2.5 py-1 rounded text-neutral-700 font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                onClose();
                if (onSelectService) {
                  onSelectService(item.category);
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <span>{t('proofSection.modal.exploreRelated', 'Explore Related Solutions')}</span>
              {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
