import React, { useState, useEffect } from 'react';
import { ProofItem } from '../types';
import { X, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// 1. Array of 10 high-quality placeholder images for the slider
const SLIDER_IMAGES = [
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
];

// 2. The 3D Coverflow Slider Component
const CoverflowSlider: React.FC<{ resetTrigger: boolean }> = ({ resetTrigger }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset to first slide when modal re-opens
  useEffect(() => {
    if (resetTrigger) setActiveIndex(0);
  }, [resetTrigger]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? SLIDER_IMAGES.length - 1 : prev - 1));

  return (
    <div className="relative w-full h-64 sm:h-80 flex items-center justify-center overflow-hidden bg-neutral-950 rounded-xl group select-none">
      
      {/* Interactive Image Track */}
      <div className="relative w-full h-full flex items-center justify-center">
        {SLIDER_IMAGES.map((src, index) => {
          // Calculate circular offset to make it an infinite loop
          const length = SLIDER_IMAGES.length;
          let offset = (index - activeIndex) % length;
          if (offset > Math.floor(length / 2)) offset -= length;
          if (offset < -Math.floor(length / 2)) offset += length;

          const absOffset = Math.abs(offset);
          
          // Hide images that are far outside the viewport to keep it clean
          if (absOffset > 2) return null;

          // Determine transform and visual styles based on distance from center
          let translateX = '0%';
          let scale = 1;
          let zIndex = 30;
          let filterClass = 'brightness-100 shadow-2xl';

          if (offset === -1) {
            translateX = '-55%';
            scale = 0.85;
            zIndex = 20;
            filterClass = 'brightness-[0.4] shadow-lg hover:brightness-[0.6]';
          } else if (offset === 1) {
            translateX = '55%';
            scale = 0.85;
            zIndex = 20;
            filterClass = 'brightness-[0.4] shadow-lg hover:brightness-[0.6]';
          } else if (offset === -2) {
            translateX = '-95%';
            scale = 0.7;
            zIndex = 10;
            filterClass = 'brightness-[0.2] opacity-60';
          } else if (offset === 2) {
            translateX = '95%';
            scale = 0.7;
            zIndex = 10;
            filterClass = 'brightness-[0.2] opacity-60';
          }

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`absolute w-[60%] sm:w-[50%] h-[80%] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${filterClass}`}
              style={{
                transform: `translateX(${translateX}) scale(${scale})`,
                zIndex: zIndex,
              }}
            >
              <img
                src={src}
                alt={`Showcase ${index + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows (Visible on hover) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 z-40 p-2 bg-black/40 hover:bg-black/70 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 z-40 p-2 bg-black/40 hover:bg-black/70 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Counter Indicator */}
      <div className="absolute bottom-4 z-40 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-[10px] font-mono font-medium tracking-widest uppercase">
        {activeIndex + 1} / {SLIDER_IMAGES.length}
      </div>
    </div>
  );
};

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
          
          {/* 3. The New Coverflow Slider replaces VisualShowcaseAsset */}
          <CoverflowSlider resetTrigger={isOpen} />

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
