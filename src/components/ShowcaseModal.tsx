import React, { useState, useEffect } from 'react';
import { ProofItem } from '../types';
import { X } from 'lucide-react';

// 1. Import Food Photography Images
import food1 from '../assets/food1.png';
import food2 from '../assets/food2.png';
import food3 from '../assets/food3.png';
import food4 from '../assets/food4.png';
import food5 from '../assets/food5.png';
import food6 from '../assets/food6.png';
import food7 from '../assets/food7.png';
import food8 from '../assets/food8.png';
import food9 from '../assets/food9.png';
import food10 from '../assets/food10.png';
import food11 from '../assets/food11.png';

// 2. Import Social Media Campaign Images
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

// 3. Import Visual Identity Images
import hidden1 from '../assets/hidden1.png';
import hidden2 from '../assets/hidden2.png';
import hidden3 from '../assets/hidden3.png';
import hidden4 from '../assets/hidden4.png';

// 4. Map the images to the corresponding ProofItem IDs from your section
const SLIDER_IMAGES_MAP: Record<string, string[]> = {
  '1': [food1, food2, food3, food4, food5, food6, food7, food8, food9, food10, food11],
  '2': [img01, img02, img03, img04, img05, img06, img07, img08, img09, img010],
  '3': [hidden1, hidden2, hidden3, hidden4],
};

interface ShowcaseModalProps {
  item: ProofItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ item, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get the correct array of images for the clicked item (fallback to empty array if none)
  const currentImages = item ? SLIDER_IMAGES_MAP[item.id] || [] : [];

  // Reset slider to the first image whenever the modal opens or the item changes
  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* App-like Card Container */}
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
            {currentImages.map((src, idx) => (
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

          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">
            {currentImages.map((_, idx) => (
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
            className="w-full mt-2 py-4 bg-white text-black rounded-full font-bold text-[15px] hover:bg-gray-100 active:scale-[0.98] transition-all cursor-pointer"
          >
            Explore Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
