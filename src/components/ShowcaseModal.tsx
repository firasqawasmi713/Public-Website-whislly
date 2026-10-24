import React, { useState, useEffect } from 'react';
import { ProofItem } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// 1. Import your 10 local images for the slider
import img01 from '../assets/01.png';
import img02 from '../assets/02.png';
import img03 from '../assets/03.png';
import img04 from '../assets/04.png';
import img05 from '../assets/05.png';
import img06 from '../assets/06.png';
import img07 from '../assets/07.png';
import img08 from '../assets/08.png';
import img09 from '../assets/09.png';
import img010 from '../assets/010.png';

const SLIDER_IMAGES = [img01, img02, img03, img04, img05, img06, img07, img08, img09, img010];

interface ShowcaseModalProps {
  item: ProofItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ item, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset slider when modal opens
  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? SLIDER_IMAGES.length - 1 : prev - 1));
  };

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* App-like Card Container (matches Image 2 perfectly) */}
      <div 
        className="relative w-full max-w-[380px] bg-[#3e4433] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* TOP HALF: Image Slider */}
        <div className="relative w-full aspect-[4/5] bg-black group overflow-hidden">
          
          {/* Sliding Track */}
          <div 
            className="flex w-full h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {SLIDER_IMAGES.map((src, idx) => (
              <img 
                key={idx}
                src={src} 
                alt={`Slide ${idx + 1}`} 
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* Invisible Left/Right Click Zones for sliding */}
          <div onClick={handlePrev} className="absolute inset-y-0 left-0 w-1/3 cursor-pointer z-20" />
          <div onClick={handleNext} className="absolute inset-y-0 right-0 w-1/3 cursor-pointer z-20" />

          {/* Gradient Overlay (Fades image into the olive background color) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#3e4433] pointer-events-none z-10" />

          {/* Pagination Dots matching Image 2 */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">
            {SLIDER_IMAGES.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* BOTTOM HALF: Content Area */}
        <div className="px-6 pb-6 pt-2 space-y-5 text-white flex-grow z-20">
          
          {/* Title and Price/Metric */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-bold leading-tight">
              {item.title}
            </h3>
            <span className="px-3 py-1 bg-black/30 rounded-full text-sm font-semibold tracking-wide whitespace-nowrap">
              {item.metric}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-white/80 leading-relaxed font-light">
            {item.description}
          </p>

          {/* Pill Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {item.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-[13px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Large CTA Button */}
          <button 
            onClick={onClose}
            className="w-full mt-2 py-4 bg-white text-black rounded-full font-bold text-[15px] hover:bg-gray-100 active:scale-[0.98] transition-all"
          >
            Explore Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
