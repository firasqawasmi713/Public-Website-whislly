import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Camera, Sparkles, ImageOff } from 'lucide-react';

interface HeroImageProps {
  bucketName?: string;
  fileName?: string;
  altText?: string;
  className?: string;
  fallbackUrl?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({
  bucketName = 'brand-assets',
  fileName = 'hero-showcase.jpg',
  altText = 'Whislly Agency Creative Studio Showcase',
  className = '',
  fallbackUrl,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setHasError(false);

    const loadHeroImage = async () => {
      try {
        // 1. Supabase Integration: Fetch public URL from Supabase storage bucket
        const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

        if (!data?.publicUrl) {
          throw new Error('Public URL could not be resolved from Supabase storage.');
        }

        // Verify the image over the network before displaying
        const img = new Image();
        img.src = data.publicUrl;

        img.onload = () => {
          if (isMounted) {
            setImageUrl(data.publicUrl);
            setIsLoading(false);
          }
        };

        img.onerror = () => {
          if (isMounted) {
            // File does not exist yet or bucket permission is restricted
            setHasError(true);
            setIsLoading(false);
          }
        };
      } catch (err) {
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    loadHeroImage();

    return () => {
      isMounted = false;
    };
  }, [bucketName, fileName]);

  // Loading State: Skeleton loader with animate-pulse and matching rounded-2xl footprint
  if (isLoading) {
    return (
      <div
        className={`w-full h-full min-h-[360px] lg:min-h-[460px] bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800 animate-pulse flex flex-col justify-between p-6 sm:p-8 ${className}`}
        aria-busy="true"
        aria-label="Loading hero visual from Supabase"
      >
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-neutral-800 rounded-md" />
          <div className="h-4 w-12 bg-neutral-800 rounded-md" />
        </div>
        <div className="space-y-4 my-auto">
          <div className="h-8 w-3/4 bg-neutral-800 rounded-lg" />
          <div className="h-4 w-1/2 bg-neutral-800 rounded-md" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
          <div className="h-3 w-28 bg-neutral-800 rounded" />
          <div className="h-3 w-16 bg-neutral-800 rounded" />
        </div>
      </div>
    );
  }

  // Error State: Beautifully styled fallback placeholder to prevent layout shifts
  if (hasError || !imageUrl) {
    if (fallbackUrl) {
      return (
        <img
          src={fallbackUrl}
          alt={altText}
          className={`w-full h-full min-h-[360px] lg:min-h-[460px] object-cover rounded-2xl shadow-2xl border border-neutral-200/20 ${className}`}
        />
      );
    }

    // Styled editorial agency visual fallback
    return (
      <div
        className={`relative w-full h-full min-h-[360px] lg:min-h-[460px] bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-950 rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden flex flex-col justify-between p-6 sm:p-8 text-white select-none ${className}`}
      >
        {/* Subtle ambient lighting gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top meta */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <Camera className="w-4 h-4 text-amber-400" />
            <span className="font-semibold tracking-wide">Whislly Creative Studio</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
            Amman · Studio A1
          </span>
        </div>

        {/* Center composition */}
        <div className="relative z-10 my-auto text-center space-y-3 py-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-bold font-display text-white">
              Brand Architecture & Production
            </h4>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
              Bespoke visual identity systems, commercial photography, and high-performance digital engineering.
            </p>
          </div>
        </div>

        {/* Bottom meta strip */}
        <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400 pt-4 border-t border-white/10">
          <span className="font-mono text-[11px]">Supabase Storage: brand-assets/hero-showcase.jpg</span>
          <span className="text-emerald-400 font-medium">Ready</span>
        </div>
      </div>
    );
  }

  // Active Loaded Image: Occupies exact same footprint as the old box with sleek styling
  return (
    <img
      src={imageUrl}
      alt={altText}
      className={`w-full h-full min-h-[360px] lg:min-h-[460px] object-cover rounded-2xl shadow-2xl border border-neutral-200/20 ${className}`}
    />
  );
};
