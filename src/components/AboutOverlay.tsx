
import React from 'react';
import { X, Shield, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutOverlayProps {
  onClose: () => void;
}

const AboutOverlay = ({ onClose }: AboutOverlayProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-stone-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-3xl font-bold text-stone-900">About TradeRails</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-12">
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              TradeRails revolutionizes the global stone trading industry by providing 
              a secure, transparent, and efficient B2B platform that connects exporters, 
              buyers, agents, and traders worldwide.
            </p>
          </div>
          
          {/* Mission, Vision, and Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass-panel p-6 rounded-xl text-center">
              <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Our Mission</h3>
              <p className="text-stone-600">
                To create the most trusted and efficient marketplace for stone trading, 
                ensuring secure transactions and quality assurance for all participants.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl text-center">
              <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Our Vision</h3>
              <p className="text-stone-600">
                To become the invisible rails that power global stone commerce, 
                making international trade as simple as local transactions.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl text-center">
              <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Our Values</h3>
              <p className="text-stone-600">
                Transparency, security, and innovation drive everything we do. 
                We believe in empowering our community with cutting-edge technology.
              </p>
            </div>
          </div>
          
          {/* Company Statistics */}
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
  );
};

export default AboutOverlay;
