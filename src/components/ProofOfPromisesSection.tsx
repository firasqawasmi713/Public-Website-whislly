import React, { useState } from 'react';
import { ShowcaseModal } from './ShowcaseModal';
import { Camera, Users, Zap } from 'lucide-react';
import { ProofItem } from '../types';

// Dummy data matching your 3-card layout
const PROMISES_DATA: ProofItem[] = [
  {
    id: '1',
    title: 'Event-goers',
    description: 'Use it to discover what’s happening now and share live moments from the crowd.',
    metric: '3.4M',
    metricLabel: 'Organic Views',
    client: 'Nightlife Culture',
    category: 'Social Media',
    tags: ['Top Rated', 'High Engagement'],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    icon: Camera,
  },
  {
    id: '2',
    title: 'Clubbers & Festival lovers',
    description: 'Capture entire days through connected stories without losing the moment.',
    metric: '+312%',
    metricLabel: 'Growth',
    client: 'Kinetics Apparel',
    category: 'Campaign',
    tags: ['Trending', '5 Day stay'],
    image: 'https://images.unsplash.com/photo-1533174000273-70c7934b160b?auto=format&fit=crop&w=800&q=80',
    icon: Zap,
  },
  {
    id: '3',
    title: 'Social Crews & Creators',
    description: 'Share authentic nightlife content in real time, without pressure to be perfect.',
    metric: '4.2x',
    metricLabel: 'ROAS',
    client: 'Orbix Studio',
    category: 'Content',
    tags: ['Creator Pick', 'Viral'],
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80',
    icon: Users,
  },
];

export const ProofOfPromisesSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ProofItem | null>(null);

  return (
    <section id="proof-section" className="py-24 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
        {/* Header matching Image 1 */}
        <div className="mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-neutral-500 uppercase bg-white border border-neutral-200 rounded-full shadow-sm">
            Audience Section
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            Built for Nightlife <br />
            <span className="text-black">Culture</span>
          </h2>
        </div>

        {/* Staggered 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center max-w-5xl mx-auto">
          {PROMISES_DATA.map((item, index) => {
            // Stagger logic: Push the middle card down (or left/right cards up)
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
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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

      {/* Modal matching Image 2 */}
      <ShowcaseModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </section>
  );
};
