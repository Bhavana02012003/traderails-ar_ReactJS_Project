
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 emerald-gradient rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-stone-900">StoneFlow</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#marketplace" className="text-stone-600 hover:text-emerald-600 transition-colors">
              Marketplace
            </a>
            <a href="#features" className="text-stone-600 hover:text-emerald-600 transition-colors">
              Features
            </a>
            <a href="#about" className="text-stone-600 hover:text-emerald-600 transition-colors">
              About
            </a>
            <a href="#contact" className="text-stone-600 hover:text-emerald-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={onLoginClick} className="text-stone-600">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button onClick={onLoginClick} className="emerald-gradient text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-stone-600" />
            ) : (
              <Menu className="w-6 h-6 text-stone-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a href="#marketplace" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Marketplace
              </a>
              <a href="#features" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Features
              </a>
              <a href="#about" className="text-stone-600 hover:text-emerald-600 transition-colors">
                About
              </a>
              <a href="#contact" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-stone-200">
                <Button variant="ghost" onClick={onLoginClick} className="justify-start text-stone-600">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button onClick={onLoginClick} className="emerald-gradient text-white">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
