import React, { useState } from 'react';
import { ShowcaseModal } from './ShowcaseModal';
import { Camera, Share2, Palette } from 'lucide-react';
import { ProofItem } from '../types';

// 1. Import your local images for the cards
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';

// 2. Updated Data matching your request
const PROMISES_DATA: ProofItem[] = [
  {
    id: '1',
    title: 'Food photography - Menu',
    description: 'High-end commercial food photography capturing rich textures and culinary details for premium dining menus.',
    metric: '70+',
    metricLabel: 'Assets Delivered',
    client: 'Restaurant Partner',
    category: 'Photography',
    tags: ['Food Styling', 'Studio Lighting'],
    image: img3, // Using 3.png as requested
    icon: Camera,
  },
  {
    id: '2',
    title: 'Social Media Campaign',
    description: 'Cohesive multi-channel content roadmap combining cinematic reels, curated graphics, and targeted advertising.',
    metric: '3.4M',
    metricLabel: 'Organic Views',
    client: 'Lifestyle Brand',
    category: 'Social Media',
    tags: ['Meta Ads', 'Viral Growth'],
    image: img1, // Using 1.png as requested
    icon: Share2,
  },
  {
    id: '3',
    title: 'Visual Identity',
    description: 'Complete brand architecture including logo design, typography systems, and market positioning guidelines.',
    metric: '100%',
    metricLabel: 'Brand Cohesion',
    client: 'Corporate Partner',
    category: 'Branding',
    tags: ['Logo Design', 'Brand Book'],
    image: img2, // Using 2.png as requested
    icon: Palette,
  },
];

export const ProofOfPromisesSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ProofItem | null>(null);

  return (
    <section id="proof-section" className="py-24 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
        {/* Updated Header Section */}
        <div className="mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-neutral-500 uppercase bg-white border border-neutral-200 rounded-full shadow-sm">
            Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight font-display">
            Proof of Promises
          </h2>
        </div>

        {/* Staggered 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center max-w-5xl mx-auto">
          {PROMISES_DATA.map((item, index) => {
            // Stagger logic: Push the middle card down
            const isMiddle = index === 1;
            const Icon = item.icon as any;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`relative group w-full aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 ${
                  isMiddle ? 'md:translate-y-8' : 'md:-translate-y-8'
                }`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out bg-neutral-200"
                />
                
                {/* Gradient to ensure bottom text box pops */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* White Floating Info Box at Bottom */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-4 rounded-2xl flex items-start gap-3 transform transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="p-2 bg-neutral-100 rounded-lg shrink-0 text-neutral-900">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-neutral-900">{item.title}</h3>
                    <p className="text-[11px] text-neutral-500 leading-snug mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Integration */}
      <ShowcaseModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </section>
  );
};
