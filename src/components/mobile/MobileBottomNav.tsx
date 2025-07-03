
import { useState } from 'react';
import { 
  Home, 
  Package, 
  TrendingUp, 
  MessageCircle, 
  User,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileBottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const MobileBottomNav = ({ activeTab = 'home', onTabChange }: MobileBottomNavProps) => {
  const [active, setActive] = useState(activeTab);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'quotes', label: 'Quotes', icon: TrendingUp },
    { id: 'add', label: 'Add', icon: Plus, isAction: true },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleTabClick = (itemId: string) => {
    if (itemId === 'add') {
      // Handle floating action
      return;
    }
    setActive(itemId);
    onTabChange?.(itemId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 shadow-lg">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          if (item.isAction) {
            return (
              <Button
                key={item.id}
                size="sm"
                className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => handleTabClick(item.id)}
              >
                <Icon className="w-5 h-5 text-white" />
              </Button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex flex-col items-center justify-center px-3 py-2 min-w-[64px] transition-all duration-200 ${
                isActive 
                  ? 'text-emerald-600' 
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 transition-all duration-200 ${
                isActive ? 'scale-110' : ''
              }`} />
              <span className={`text-xs font-medium transition-all duration-200 ${
                isActive ? 'scale-105' : ''
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-emerald-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
