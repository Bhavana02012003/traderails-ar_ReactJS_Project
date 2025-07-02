
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Menu, X, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onLoginClick: () => void;
  onMarketplaceClick?: () => void;
  onHomeClick?: () => void;
  onDashboardClick?: () => void;
  currentView?: 'home' | 'marketplace' | 'exporter' | 'buyer' | 'admin' | 'trader' | 'agent';
  isLoggedIn?: boolean;
  userType?: 'buyer' | 'exporter' | 'admin' | 'agent' | 'trader' | null;
  onLogout?: () => void;
}

const Header = ({ 
  onLoginClick, 
  onMarketplaceClick, 
  onHomeClick, 
  onDashboardClick, 
  currentView = 'home',
  isLoggedIn = false,
  userType,
  onLogout
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout?.();
    setIsMenuOpen(false);
  };

  return (
    <header className="relative z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
            <div className="bg-white p-3 rounded-xl shadow-lg border-2 border-emerald-100">
              <img 
                src="/lovable-uploads/3445b0da-b926-49fc-9f5e-9a14522b14fd.png" 
                alt="Company Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={onHomeClick}
              className={`transition-colors font-medium ${
                currentView === 'home' 
                  ? 'text-emerald-600 font-semibold' 
                  : 'text-stone-700 hover:text-emerald-600'
              }`}
            >
              Home
            </button>
            <button 
              onClick={onMarketplaceClick}
              className={`transition-colors font-medium ${
                currentView === 'marketplace' 
                  ? 'text-emerald-600 font-semibold' 
                  : 'text-stone-700 hover:text-emerald-600'
              }`}
            >
              Marketplace
            </button>
            <button 
              onClick={onDashboardClick}
              className={`transition-colors font-medium ${
                currentView === 'exporter' || currentView === 'buyer' || currentView === 'admin' || currentView === 'trader' || currentView === 'agent'
                  ? 'text-emerald-600 font-semibold' 
                  : 'text-stone-700 hover:text-emerald-600'
              }`}
            >
              Dashboard
            </button>
            <a href="#features" className="text-stone-700 hover:text-emerald-600 transition-colors font-medium">
              Features
            </a>
            <a href="#about" className="text-stone-700 hover:text-emerald-600 transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-stone-700 hover:text-emerald-600 transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && (userType === 'buyer' || userType === 'exporter' || userType === 'agent' || userType === 'trader') ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-emerald-500 text-white text-xs flex items-center justify-center">
                    3
                  </Badge>
                </Button>
                
                {/* Account Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="hidden sm:block">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={onDashboardClick}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={onLoginClick} className="text-stone-700 font-medium">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button onClick={onLoginClick} className="emerald-gradient text-white font-medium">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-stone-700" />
            ) : (
              <Menu className="w-6 h-6 text-stone-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  onHomeClick?.();
                  setIsMenuOpen(false);
                }}
                className={`text-left transition-colors font-medium ${
                  currentView === 'home' 
                    ? 'text-emerald-600 font-semibold' 
                    : 'text-stone-700 hover:text-emerald-600'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => {
                  onMarketplaceClick?.();
                  setIsMenuOpen(false);
                }}
                className={`text-left transition-colors font-medium ${
                  currentView === 'marketplace' 
                    ? 'text-emerald-600 font-semibold' 
                    : 'text-stone-700 hover:text-emerald-600'
                }`}
              >
                Marketplace
              </button>
              <button 
                onClick={() => {
                  onDashboardClick?.();
                  setIsMenuOpen(false);
                }}
                className={`text-left transition-colors font-medium ${
                  currentView === 'exporter' || currentView === 'buyer' || currentView === 'admin' || currentView === 'trader' || currentView === 'agent'
                    ? 'text-emerald-600 font-semibold' 
                    : 'text-stone-700 hover:text-emerald-600'
                }`}
              >
                Dashboard
              </button>
              <a href="#features" className="text-stone-700 hover:text-emerald-600 transition-colors font-medium">
                Features
              </a>
              <a href="#about" className="text-stone-700 hover:text-emerald-600 transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="text-stone-700 hover:text-emerald-600 transition-colors font-medium">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-stone-200">
                {isLoggedIn && (userType === 'buyer' || userType === 'exporter' || userType === 'agent' || userType === 'trader') ? (
                  <>
                    <Button variant="ghost" className="justify-start relative">
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                      <Badge className="ml-auto w-5 h-5 p-0 bg-emerald-500 text-white text-xs flex items-center justify-center">
                        3
                      </Badge>
                    </Button>
                    <Button onClick={() => {
                      onDashboardClick?.();
                      setIsMenuOpen(false);
                    }} variant="ghost" className="justify-start text-stone-700">
                      Dashboard
                    </Button>
                    <Button variant="ghost" onClick={handleLogout} className="justify-start text-stone-700">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" onClick={onLoginClick} className="justify-start text-stone-700">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                    <Button onClick={onLoginClick} className="emerald-gradient text-white">
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
