/**
 * Hero Section Component
 * 
 * The primary landing section of the TradeRails application that serves as the main
 * call-to-action area. This component showcases the platform's value proposition,
 * key features, and provides primary navigation options for users.
 * 
 * Key Features:
 * - Responsive design with mobile-first approach
 * - Animated elements with CSS transitions
 * - Multiple call-to-action buttons
 * - Trust indicators and feature highlights
 * - Background textures and gradients for visual appeal
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onBrowseClick - Callback for marketplace navigation
 * @param {Function} props.onListClick - Callback for inventory listing
 */

import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Shield, Eye } from 'lucide-react';

/**
 * Props interface for HeroSection component
 */
interface HeroSectionProps {
  /** Function to handle navigation to marketplace/browse view */
  onBrowseClick: () => void;
  /** Function to handle navigation to inventory listing view */
  onListClick: () => void;
}

/**
 * HeroSection Component
 * 
 * Renders the main hero section with:
 * - Company branding and value proposition
 * - Primary call-to-action buttons
 * - Trust indicators and feature highlights
 * - Decorative background elements
 */
const HeroSection = ({ onBrowseClick, onListClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 
        Background Layer System
        Multiple layers create depth and visual interest:
        1. Stone gradient overlay
        2. Stone texture background
        3. Decorative blur elements
      */}
      <div className="absolute inset-0 stone-gradient opacity-50"></div>
      <div className="absolute inset-0 bg-stone-texture"></div>
      
      {/* 
        Main Content Container
        Positioned above background layers with proper z-index
        Uses container classes for responsive layout
      */}
      <div className="relative z-10 w-full mx-auto px-4 md:px-8 lg:px-16 xl:px-24 text-center">
        <div className="max-w-6xl mx-auto animate-fade-in">
          
          {/* 
            Trust Badge
            Social proof element showing global adoption
            Uses glass-panel styling for modern appearance
          */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-panel mb-8">
            <Globe className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-sm font-medium text-stone-700">Trusted by 500+ stone traders globally</span>
          </div>

          {/* 
            Primary Headline
            Main value proposition without specific brand name
            Responsive typography scaling for different screen sizes
          */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 leading-tight">
            Trade Stone with Confidence
          </h1>

          {/* 
            Company Tagline
            Branded messaging that reinforces the platform's core value
            Styled with emerald color to match brand identity
          */}
          <p className="text-lg md:text-xl text-emerald-600 font-medium mb-6 italic">
            The Invisible Rails of Global Commerce
          </p>

          {/* 
            Value Proposition Subtitle
            Detailed explanation of platform benefits and features
            Highlights key differentiators: verification, security, AR technology
          */}
          <p className="text-base md:text-lg text-stone-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with verified suppliers, secure transactions with escrow, and visualize stone slabs in AR. 
            The premium B2B platform for the global stone industry.
          </p>

          {/* 
            Call-to-Action Button Section
            Primary actions for user engagement:
            1. Browse Marketplace - For buyers/explorers
            2. List Inventory - For suppliers/exporters
            
            Responsive layout: stacked on mobile, side-by-side on desktop
          */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {/* Primary CTA - Browse Marketplace */}
            <Button 
              size="lg" 
              onClick={onBrowseClick}
              className="emerald-gradient text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all"
            >
              Browse Marketplace
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            {/* Secondary CTA - List Inventory */}
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onListClick}
              className="px-8 py-4 text-lg font-semibold border-2 border-stone-300 hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              List Your Inventory
            </Button>
          </div>

          {/* 
            Trust Indicators Grid
            Feature highlights that build credibility and trust
            Three main value propositions:
            1. Secure Escrow - Financial protection
            2. AR Visualization - Technology advantage
            3. Global Network - Scale and reach
            
            Responsive grid: single column on mobile, three columns on desktop
            Each card has hover effects for interactivity
          */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            
            {/* Secure Escrow Feature Card */}
            <div className="glass-panel p-6 rounded-xl text-center hover:scale-105 transition-transform">
              <Shield className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-stone-900 mb-2">Secure Escrow</h3>
              <p className="text-sm text-stone-600">Protected transactions with insurance coverage</p>
            </div>
            
            {/* AR Visualization Feature Card */}
            <div className="glass-panel p-6 rounded-xl text-center hover:scale-105 transition-transform">
              <Eye className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-stone-900 mb-2">AR Visualization</h3>
              <p className="text-sm text-stone-600">See slabs in 3D before you buy</p>
            </div>
            
            {/* Global Network Feature Card */}
            <div className="glass-panel p-6 rounded-xl text-center hover:scale-105 transition-transform">
              <Globe className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-stone-900 mb-2">Global Network</h3>
              <p className="text-sm text-stone-600">Connect with verified suppliers worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Decorative Background Elements
        Floating blur elements that add visual depth and movement
        Positioned absolutely with low opacity for subtle effect
        Different sizes and positions create visual balance
      */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-sage-500/10 rounded-full blur-xl"></div>
    </section>
  );
};

export default HeroSection;
