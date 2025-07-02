import { useState } from 'react';
import { Globe } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TrustSection from '@/components/TrustSection';
import FeaturesSection from '@/components/FeaturesSection';
import MarketplacePreview from '@/components/MarketplacePreview';
import MarketplaceContent from '@/components/MarketplaceContent';
import ExporterDashboard from '@/components/exporter/ExporterDashboard';
import BuyerDashboard from '@/components/buyer/BuyerDashboard';
import LoginModal from '@/components/LoginModal';

const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'marketplace' | 'exporter' | 'buyer'>('home');

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleBrowseClick = () => {
    setCurrentView('marketplace');
  };

  const handleHomeClick = () => {
    setCurrentView('home');
  };

  const handleListClick = () => {
    setCurrentView('exporter');
  };

  const handleExporterClick = () => {
    setCurrentView('exporter');
  };

  const handleBuyerClick = () => {
    setCurrentView('buyer');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onLoginClick={handleLoginClick} 
        onMarketplaceClick={handleBrowseClick}
        onHomeClick={handleHomeClick}
        onExporterClick={handleExporterClick}
        onBuyerClick={handleBuyerClick}
        currentView={currentView}
      />
      
      {currentView === 'home' ? (
        <>
          <main>
            <HeroSection 
              onBrowseClick={handleBrowseClick}
              onListClick={handleListClick}
            />
            <TrustSection />
            <FeaturesSection />
            <MarketplacePreview />
          </main>

          <footer className="bg-stone-900 text-white py-12">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 emerald-gradient rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">TradeRails</span>
                  </div>
                  <p className="text-stone-400 text-sm">
                    The premium B2B platform for global stone trading.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Platform</h3>
                  <ul className="space-y-2 text-sm text-stone-400">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Marketplace</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">API</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Support</h3>
                  <ul className="space-y-2 text-sm text-stone-400">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Status</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Company</h3>
                  <ul className="space-y-2 text-sm text-stone-400">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">About</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-stone-800 mt-8 pt-8 text-center text-sm text-stone-400">
                <p>&copy; 2024 TradeRails. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </>
      ) : currentView === 'marketplace' ? (
        <MarketplaceContent />
      ) : currentView === 'exporter' ? (
        <ExporterDashboard />
      ) : (
        <BuyerDashboard />
      )}

      <LoginModal 
        open={isLoginModalOpen} 
        onOpenChange={setIsLoginModalOpen} 
      />
    </div>
  );
};

export default Index;
