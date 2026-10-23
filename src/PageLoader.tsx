import React, { useEffect, useState } from 'react';

interface PageLoaderProps {
  isNavigating: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isNavigating }) => {
  const [shouldRender, setShouldRender] = useState(isNavigating);

  useEffect(() => {
    if (isNavigating) {
      setShouldRender(true);
    } else {
      // Delay unmounting slightly to allow fade-out animation
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isNavigating]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950 transition-opacity duration-300 ${
        isNavigating ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Whislly Text Logo */}
        <h2 className="text-4xl font-extrabold tracking-tight text-white font-display animate-pulse">
          Whislly
        </h2>
        
        {/* Sleek Minimalist Spinner */}
        <div className="w-8 h-8 border-2 border-neutral-800 border-t-white rounded-full animate-spin" />
      </div>
    </div>
  );
};
