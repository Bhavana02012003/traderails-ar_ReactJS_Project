
import { Button } from '@/components/ui/button';
import { Home, ShoppingBag, Info, Mail } from 'lucide-react';

interface NavigationSectionProps {
  onHomeClick: () => void;
  onMarketplaceClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
  currentView: string;
}

const NavigationSection = ({
  onHomeClick,
  onMarketplaceClick,
  onAboutClick,
  onContactClick,
  currentView
}: NavigationSectionProps) => {
  const navigationItems = [
    {
      id: 'home',
      title: 'Home',
      description: 'Return to main page',
      icon: Home,
      onClick: onHomeClick,
      isActive: currentView === 'home'
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      description: 'Browse stone inventory',
      icon: ShoppingBag,
      onClick: onMarketplaceClick,
      isActive: currentView === 'marketplace'
    },
    {
      id: 'about',
      title: 'About',
      description: 'Learn about TradeRails',
      icon: Info,
      onClick: onAboutClick,
      isActive: currentView === 'about'
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch with us',
      icon: Mail,
      onClick: onContactClick,
      isActive: currentView === 'contact'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Explore TradeRails
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Navigate through our platform to discover global stone trading opportunities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  item.isActive
                    ? 'bg-emerald-50 border-emerald-200 shadow-lg'
                    : 'bg-white border-stone-200 hover:border-emerald-300 shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-stone-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    item.isActive
                      ? 'bg-emerald-500 text-white'
                      : 'bg-stone-100 text-stone-600 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                  }`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    item.isActive
                      ? 'text-emerald-700'
                      : 'text-stone-900 group-hover:text-emerald-700'
                  }`}>
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-stone-600 group-hover:text-stone-700 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
                
                {/* Active indicator */}
                {item.isActive && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NavigationSection;
