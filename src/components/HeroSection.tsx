/**
 * Hero Section Component
 * 
 * High-conviction B2B trade infrastructure landing page hero section featuring
 * animated global trade network visualization, dark theme with emerald highlights,
 * and comprehensive trust indicators for maximum conversion impact.
 */

import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Shield, Eye, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  onBrowseClick: () => void;
  onListClick: () => void;
}

const HeroSection = ({ onBrowseClick, onListClick }: HeroSectionProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll-based micro-interactions
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden flex items-center justify-center">
      {/* Animated Global Trade Network Background */}
      <div className="absolute inset-0">
        {/* Primary Network Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tradeFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
              <stop offset="50%" stopColor="rgba(16, 185, 129, 0.6)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>
          </defs>
          
          {/* Animated Trade Routes */}
          <g className="animate-pulse">
            <path d="M50,100 Q400,50 800,200" stroke="url(#tradeFlow)" strokeWidth="2" fill="none" className="animate-[draw_4s_ease-in-out_infinite]" />
            <path d="M100,300 Q500,150 900,400" stroke="url(#tradeFlow)" strokeWidth="2" fill="none" className="animate-[draw_4s_ease-in-out_infinite_0.5s]" />
            <path d="M200,500 Q600,300 1000,600" stroke="url(#tradeFlow)" strokeWidth="2" fill="none" className="animate-[draw_4s_ease-in-out_infinite_1s]" />
          </g>
          
          {/* Port Nodes */}
          <circle cx="200" cy="150" r="8" fill="rgba(16, 185, 129, 0.8)" className="animate-pulse" />
          <circle cx="600" cy="250" r="6" fill="rgba(16, 185, 129, 0.6)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="800" cy="400" r="10" fill="rgba(16, 185, 129, 0.9)" className="animate-pulse" style={{ animationDelay: '1s' }} />
        </svg>

        {/* Floating Network Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-emerald-300 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-emerald-500 rounded-full animate-float opacity-80" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div 
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        {/* Live Activity Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/60 backdrop-blur-sm border border-emerald-500/20 mb-8 animate-fade-in">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-3"></div>
          <span className="text-sm font-medium text-emerald-400">Live: $2.3M in trades today</span>
        </div>

        {/* Main Headlines */}
        <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Connect Global
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            {" "}Stone Commerce
          </span>
        </h1>

        {/* Tagline */}
        <p className={`text-xl md:text-2xl text-emerald-400 font-medium mb-4 italic transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          The Invisible Rails of Global Commerce
        </p>

        {/* Value Proposition */}
        <p className={`text-base md:text-lg text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          The world's first infrastructure platform for B2B stone trading. Connect verified suppliers, 
          secure transactions with escrow, and scale your operations globally.
        </p>

        {/* Primary CTA */}
        <div className={`mb-16 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Button 
            size="lg" 
            onClick={onBrowseClick}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-6 text-xl font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-2xl shadow-emerald-500/25"
          >
            Explore the Marketplace
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>

        {/* Trust Indicators Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-all hover:scale-105">
            <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">$2M</div>
            <div className="text-sm text-slate-400">Escrow Protection</div>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-all hover:scale-105">
            <Globe className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">45+</div>
            <div className="text-sm text-slate-400">Countries</div>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-all hover:scale-105">
            <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">$2.5B+</div>
            <div className="text-sm text-slate-400">Total Volume</div>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-all hover:scale-105">
            <Users className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">500+</div>
            <div className="text-sm text-slate-400">Verified Traders</div>
          </div>
        </div>

        {/* Social Proof Banner */}
        <div className={`flex flex-wrap justify-center items-center gap-8 text-slate-400 transition-all duration-1000 delay-1200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-sm">ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-sm">Lloyd's Insured</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-sm">99.8% Uptime</span>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/60 to-slate-900/90 pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
