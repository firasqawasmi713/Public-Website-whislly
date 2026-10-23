import React from 'react';
import { Camera, Layers, Share2, Sparkles, TrendingUp, Grid, Palette, Film } from 'lucide-react';

interface VisualShowcaseAssetProps {
  type: 'food' | 'social' | 'branding' | 'hero';
  className?: string;
  interactive?: boolean;
}

export const VisualShowcaseAsset: React.FC<VisualShowcaseAssetProps> = ({
  type,
  className = '',
}) => {
  if (type === 'food') {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950 overflow-hidden p-6 flex flex-col justify-between text-white select-none ${className}`}>
        {/* Background decorative grid & light spill */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent opacity-70 pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Camera HUD overlay */}
        <div className="relative z-10 flex items-center justify-between text-xs text-amber-200/70 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-amber-400" />
            <span className="font-mono tracking-wider">CANON R5C · 50mm f/1.2L</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>1/320s</span>
            <span>f/2.0</span>
            <span className="text-amber-400 font-semibold">ISO 160</span>
          </div>
        </div>

        {/* Center culinary showcase art */}
        <div className="relative z-10 my-4 flex items-center justify-center">
          <div className="relative w-full max-w-[320px]">
            {/* Delivery App Card Mockup */}
            <div className="bg-neutral-900/90 backdrop-blur-md border border-white/15 rounded-xl p-4 shadow-2xl transform transition hover:scale-[1.02] duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">App Menu Hero Feature</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">4.9 ★ (2.4k+)</span>
              </div>

              {/* Graphic Dish Plate Mockup */}
              <div className="h-28 w-full bg-gradient-to-tr from-amber-900/60 via-stone-800 to-orange-950/40 rounded-lg relative overflow-hidden flex items-center justify-center border border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/25 via-transparent to-transparent" />
                <div className="relative text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-600 to-orange-400 p-0.5 shadow-lg shadow-orange-500/30 flex items-center justify-center">
                    <div className="w-full h-full bg-stone-900 rounded-full flex items-center justify-center text-amber-300 text-lg font-bold">
                      🍽️
                    </div>
                  </div>
                  <p className="text-[11px] font-medium text-stone-200 mt-1.5">Artisanal Truffle Brioche Burger</p>
                </div>
              </div>

              {/* Specs & App conversion stats */}
              <div className="mt-3 pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-neutral-400 block text-[9px] uppercase">Menu Conversion</span>
                  <span className="font-semibold text-emerald-400">+148% Orders</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[9px] uppercase">App Platforms</span>
                  <span className="font-semibold text-stone-200">Talabat · Careem · Jahez</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom meta strip */}
        <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/10">
          <span>Commercial Food Photography & Styling</span>
          <span className="text-amber-400/90 font-medium">Whislly Production Studio</span>
        </div>
      </div>
    );
  }

  if (type === 'social') {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-neutral-950 overflow-hidden p-6 flex flex-col justify-between text-white select-none ${className}`}>
        {/* Ambient glows */}
        <div className="absolute -top-12 -right-12 w-52 h-52 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-medium">
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span>Multi-Channel Growth Campaign</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+312% Reach</span>
          </div>
        </div>

        {/* Mock Social Feed Carousel */}
        <div className="relative z-10 my-4 grid grid-cols-3 gap-2.5">
          {/* Reel Frame 1 */}
          <div className="bg-slate-800/90 border border-white/15 rounded-xl p-2.5 flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between text-[10px] text-neutral-400">
              <span className="text-indigo-300 font-bold">REEL #01</span>
              <Film className="w-3 h-3 text-indigo-400" />
            </div>
            <div className="my-2 h-16 bg-gradient-to-br from-indigo-600/30 to-purple-800/40 rounded flex items-center justify-center text-center p-1">
              <span className="text-[10px] font-semibold text-slate-100 leading-tight">Brand Story Anthem</span>
            </div>
            <div className="text-[10px] text-neutral-300 font-mono">94.2k views</div>
          </div>

          {/* Carousel Frame 2 */}
          <div className="bg-slate-800/90 border border-indigo-400/30 rounded-xl p-2.5 flex flex-col justify-between shadow-xl ring-1 ring-indigo-500/20">
            <div className="flex items-center justify-between text-[10px] text-neutral-400">
              <span className="text-indigo-300 font-bold">CAROUSEL</span>
              <Grid className="w-3 h-3 text-indigo-400" />
            </div>
            <div className="my-2 h-16 bg-gradient-to-br from-indigo-500/40 to-blue-600/30 rounded flex items-center justify-center text-center p-1">
              <span className="text-[10px] font-semibold text-white leading-tight">10-Slide Value Drop</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono font-bold">+18.4% saves</div>
          </div>

          {/* Story Frame 3 */}
          <div className="bg-slate-800/90 border border-white/15 rounded-xl p-2.5 flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between text-[10px] text-neutral-400">
              <span className="text-indigo-300 font-bold">STORY AD</span>
              <Sparkles className="w-3 h-3 text-indigo-400" />
            </div>
            <div className="my-2 h-16 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded flex items-center justify-center text-center p-1">
              <span className="text-[10px] font-semibold text-slate-100 leading-tight">Interactive Poll</span>
            </div>
            <div className="text-[10px] text-neutral-300 font-mono">4.2% CTR</div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/10">
          <span>Instagram · TikTok · LinkedIn Ads</span>
          <span className="text-indigo-300 font-medium">Meta Verified Strategy</span>
        </div>
      </div>
    );
  }

  if (type === 'branding') {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br from-stone-900 via-neutral-900 to-stone-950 overflow-hidden p-6 flex flex-col justify-between text-white select-none ${className}`}>
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Top header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 text-xs">
          <div className="flex items-center gap-2 text-stone-300 font-medium">
            <Palette className="w-4 h-4 text-stone-200" />
            <span>Complete Identity System</span>
          </div>
          <span className="font-mono text-[11px] text-stone-400 uppercase tracking-widest">SPEC: v2.4</span>
        </div>

        {/* Center brand identity layout sheet */}
        <div className="relative z-10 my-4 bg-stone-950/80 border border-white/15 rounded-xl p-4 shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white inline-block"></span>
                WHISLLY
              </div>
              <p className="text-[10px] text-neutral-400 mt-0.5 tracking-wider uppercase">Identity Guidelines & Collateral</p>
            </div>
            <div className="flex gap-1">
              <span className="w-5 h-5 rounded bg-neutral-950 border border-neutral-700 block" title="#0A0A0A" />
              <span className="w-5 h-5 rounded bg-stone-100 border border-neutral-400 block" title="#F5F5F4" />
              <span className="w-5 h-5 rounded bg-amber-600 block" title="#D97706" />
              <span className="w-5 h-5 rounded bg-blue-600 block" title="#2563EB" />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/5 rounded p-2">
              <span className="text-[9px] uppercase text-neutral-400 block">Typography</span>
              <span className="text-xs font-bold text-white">Plus Jakarta</span>
            </div>
            <div className="bg-white/5 rounded p-2">
              <span className="text-[9px] uppercase text-neutral-400 block">System Assets</span>
              <span className="text-xs font-bold text-white">48+ Components</span>
            </div>
            <div className="bg-white/5 rounded p-2">
              <span className="text-[9px] uppercase text-neutral-400 block">Packaging</span>
              <span className="text-xs font-bold text-white">Die-Cuts Ready</span>
            </div>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/10">
          <span>Stationery · Digital Tokens · Guidelines</span>
          <span className="text-stone-300 font-medium">Bespoke Brand System</span>
        </div>
      </div>
    );
  }

  // Hero interactive graphic
  return (
    <div className={`relative w-full h-full min-h-[360px] lg:min-h-[460px] bg-gradient-to-br from-neutral-900 via-neutral-950 to-stone-950 rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-white border border-neutral-800 shadow-2xl select-none ${className}`}>
      {/* Background illumination */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-neutral-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top agency cockpit */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
          <span className="text-sm font-semibold tracking-wide text-neutral-200">Whislly Design & Engineering Engine</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
          <span>Amman Studio</span>
          <span className="text-neutral-600">/</span>
          <span>Global Delivery</span>
        </div>
      </div>

      {/* Center dynamic agency cards preview */}
      <div className="relative z-10 my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Capability card 1 */}
        <div className="bg-neutral-800/80 backdrop-blur border border-white/10 rounded-xl p-5 hover:border-neutral-600 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Brand Experience</span>
            <Layers className="w-4 h-4 text-neutral-300" />
          </div>
          <h4 className="text-base font-semibold text-white">Visual Identity & Creative</h4>
          <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
            From logo architecture and packaging design to bespoke photography that commands attention.
          </p>
          <div className="mt-4 flex items-center gap-2 text-[11px] text-neutral-300">
            <span className="px-2 py-0.5 rounded bg-white/10">360° Identity</span>
            <span className="px-2 py-0.5 rounded bg-white/10">Art Direction</span>
          </div>
        </div>

        {/* Capability card 2 */}
        <div className="bg-neutral-800/80 backdrop-blur border border-white/10 rounded-xl p-5 hover:border-neutral-600 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Growth & Performance</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h4 className="text-base font-semibold text-white">Social & Digital Scale</h4>
          <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
            Curated social media subscriptions starting at 100 JOD with production, reels, and analytics.
          </p>
          <div className="mt-4 flex items-center gap-2 text-[11px] text-neutral-300">
            <span className="px-2 py-0.5 rounded bg-white/10">Meta Ads</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">Real ROI</span>
          </div>
        </div>
      </div>

      {/* Bottom metrics banner */}
      <div className="relative z-10 pt-4 border-t border-white/10 grid grid-cols-3 gap-4 text-center sm:text-left">
        <div>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white tabular-nums">120+</div>
          <div className="text-xs text-neutral-400 mt-0.5">Brands Built & Scaled</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white tabular-nums">4.2M+</div>
          <div className="text-xs text-neutral-400 mt-0.5">Social Impressions</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white tabular-nums">99.4%</div>
          <div className="text-xs text-neutral-400 mt-0.5">Client Satisfaction</div>
        </div>
      </div>
    </div>
  );
};
