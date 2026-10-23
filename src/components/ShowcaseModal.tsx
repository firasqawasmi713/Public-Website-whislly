import React, { useState, useEffect } from 'react';
import { ProofItem } from '../types';
import { X, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// 1. Import your 10 local images
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

// 2. Set them in the slider array
const SLIDER_IMAGES = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  img08,
  img09,
  img010,
];

// The 3D Coverflow Slider Component
const CoverflowSlider: React.FC<{ resetTrigger: boolean }> = ({ resetTrigger }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset to first slide when modal re-opens
  useEffect(() => {
    if (resetTrigger) setActiveIndex(0);
  }, [resetTrigger]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? SLIDER_IMAGES.length - 1 : prev - 1));

  return (
    // Increased height to accommodate the taller 4:5 images beautifully
    <div className="relative w-full h-80 sm:h-[26rem] flex items-center justify-center overflow-hidden bg-neutral-950 rounded-xl group select-none">
      
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
          // Adjusted X translations to spread out the narrower 4:5 images properly
          let translateX = '0%';
          let scale = 1;
          let zIndex = 30;
          let filterClass = 'brightness-100 shadow-2xl';

          if (offset === -1) {
            translateX = '-70%';
            scale = 0.85;
            zIndex = 20;
            filterClass = 'brightness-[0.4] shadow-lg hover:brightness-[0.6]';
          } else if (offset === 1) {
            translateX = '70%';
            scale = 0.85;
            zIndex = 20;
            filterClass = 'brightness-[0.4] shadow-lg hover:brightness-[0.6]';
          } else if (offset === -2) {
            translateX = '-130%';
            scale = 0.7;
            zIndex = 10;
            filterClass = 'brightness-[0.2] opacity-60';
          } else if (offset === 2) {
            translateX = '130%';
            scale = 0.7;
            zIndex = 10;
            filterClass = 'brightness-[0.2] opacity-60';
          }

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              // Changed to aspect-[4/5] and anchored by height (h-[85%]) to prevent vertical overflow
              className={`absolute h-[85%] aspect-[4/5] rounded-xl overflow-hidden
