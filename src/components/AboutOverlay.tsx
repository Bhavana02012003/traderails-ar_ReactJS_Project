
import React from 'react';
import { ArrowLeft, Shield, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutOverlayProps {
  onClose: () => void;
}

const AboutOverlay = ({ onClose }: AboutOverlayProps) => {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header - Fixed positioning */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-stone-900">About TradeRails</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              TradeRails revolutionizes the global stone trading industry by providing 
              a secure, transparent, and efficient B2B platform that connects exporters, 
              buyers, agents, and traders worldwide.
            </p>
          </div>
          
          {/* Mission, Vision, and Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 text-center">
              <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Our Mission</h3>
              <p className="text-stone-600">
                To create the most trusted and efficient marketplace for stone trading, 
                ensuring secure transactions and quality assurance for all participants.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 text-center">
              <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Our Vision</h3>
              <p className="text-stone-600">
                To become the invisible rails that power global stone commerce, 
                making international trade as simple as local transactions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 text-center">
              <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Our Values</h3>
              <p className="text-stone-600">
                Transparency, security, and innovation drive everything we do. 
                We believe in empowering our community with cutting-edge technology.
              </p>
            </div>
          </div>
          
          {/* Company Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
            <h3 className="text-2xl font-semibold text-stone-900 mb-8 text-center">Our Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
                <div className="text-stone-600">Active Traders</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">50+</div>
                <div className="text-stone-600">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">$10M+</div>
                <div className="text-stone-600">Trade Volume</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">99.9%</div>
                <div className="text-stone-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="bg-stone-100 border-t border-stone-200 py-6 mt-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-stone-600 text-sm">
                <span className="font-semibold text-emerald-600">Trusted platform</span> for global stone commerce
              </p>
              <p className="text-stone-500 text-xs mt-1">
                Secure transactions • Quality assurance • Global reach
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-stone-600">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOverlay;
