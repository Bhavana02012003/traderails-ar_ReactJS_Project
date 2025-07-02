
/**
 * Header Component
 * 
 * The main navigation header for the TradeRails application. This component provides
 * primary navigation, user authentication controls, and responsive mobile menu functionality.
 * 
 * Key Features:
 * - Responsive design with mobile hamburger menu
 * - Dynamic navigation highlighting based on current view
 * - User authentication state management
 * - Role-based navigation and controls
 * - Notification system integration
 * - Dropdown menus for user account management
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onLoginClick - Callback for login modal
 * @param {Function} props.onMarketplaceClick - Navigation to marketplace
 * @param {Function} props.onHomeClick - Navigation to home
 * @param {Function} props.onDashboardClick - Navigation to user dashboard
 * @param {string} props.currentView - Current active view/page
 * @param {boolean} props.isLoggedIn - User authentication status
 * @param {string} props.userType - User role type
 * @param {Function} props.onLogout - Logout callback
 */

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

/**
 * Props interface for Header component
 */
interface HeaderProps {
  /** Function to handle login modal opening */
  onLoginClick: () => void;
  /** Optional function to navigate to marketplace */
  onMarketplaceClick?: () => void;
  /** Optional function to navigate to home page */
  onHomeClick?: () => void;
  /** Optional function to navigate to user dashboard */
  onDashboardClick?: () => void;
  /** Current active view for navigation highlighting */
  currentView?: 'home' | 'marketplace' | 'exporter' | 'buyer' | 'admin' | 'trader' | 'agent';
  /** User authentication status */
  isLoggedIn?: boolean;
  /** User role type for role-based features */
  userType?: 'buyer' | 'exporter' | 'admin' | 'agent' | 'trader' | null;
  /** Function to handle user logout */
  onLogout?: () => void;
}

/**
 * Header Component
 * 
 * Renders the main navigation header with:
 * - Company logo and branding
 * - Primary navigation menu
 * - User authentication controls
 * - Mobile responsive menu
 * - Notification system
 */
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
  // Mobile menu state management
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Handles user logout with menu state cleanup
   * Calls the provided logout function and closes mobile menu
   */
  const handleLogout = () => {
    onLogout?.();
    setIsMenuOpen(false);
  };

  return (
    <header className="relative z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 
            Logo Section
            Company branding with click handler for home navigation
            Uses dark logo variant for light background
          */}
          <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
            <img 
              src="/lovable-uploads/ab167848-cedd-4e49-86de-c1ad8208769d.png" 
              alt="TradeRails - The Invisible Rails of Global Commerce" 
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* 
            Desktop Navigation Menu
            Hidden on mobile devices, visible on medium screens and up
            Includes dynamic highlighting based on current view
          */}
          <nav className="hidden md:flex items-center space-x-8">
            
            {/* Home Navigation Link */}
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
            
            {/* Marketplace Navigation Link */}
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
            
            {/* Dashboard Navigation Link - Only visible when user is logged in */}
            {isLoggedIn && (
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
            )}
            
            {/* About Navigation Link - Using hash link for anchor navigation */}
            <a href="#about" className="text-stone-700 hover:text-emerald-600 transition-colors font-medium">
              About
            </a>
            
            {/* Contact Navigation Link - Using hash link for anchor navigation */}
            <a href="#contact" className="text-stone-700 hover:text-emerald-600 transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* 
            Desktop User Controls Section
            Conditional rendering based on user authentication status
            Hidden on mobile devices
          */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Authenticated User Controls */}
            {isLoggedIn && (userType === 'buyer' || userType === 'exporter' || userType === 'agent' || userType === 'trader') ? (
              <>
                {/* Notification Bell with Badge */}
                <Button variant="ghost" className="relative">
                  <Bell className="w-5 h-5" />
                  {/* Notification count badge */}
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-emerald-500 text-white text-xs flex items-center justify-center">
                    3
                  </Badge>
                </Button>
                
                {/* User Account Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      {/* User Avatar */}
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
              /* Unauthenticated User Controls */
              <>
                {/* Login Button */}
                <Button variant="ghost" onClick={onLoginClick} className="text-stone-700 font-medium">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                {/* Primary CTA Button */}
                <Button onClick={onLoginClick} className="emerald-gradient text-white font-medium">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* 
            Mobile Menu Toggle Button
            Visible only on mobile devices
            Toggles between hamburger and X icon based on menu state
          */}
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

        {/* 
          Mobile Menu Panel
          Conditional rendering based on menu state
          Includes all navigation options and user controls
          Animated appearance with fade-in effect
        */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              
              {/* Mobile Navigation Links */}
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
              
              {/* Dashboard Navigation Link - Only visible when user is logged in */}
              {isLoggedIn && (
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
              )}
              
              {/* About Link - Closes mobile menu on click */}
              <a 
                href="#about" 
                className="text-stone-700 hover:text-emerald-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              
              {/* Contact Link - Closes mobile menu on click */}
              <a 
                href="#contact" 
                className="text-stone-700 hover:text-emerald-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              
              {/* 
                Mobile User Controls Section
                Separated by border, includes authentication-specific options
              */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-stone-200">
                {isLoggedIn && (userType === 'buyer' || userType === 'exporter' || userType === 'agent' || userType === 'trader') ? (
                  /* Authenticated Mobile User Options */
                  <>
                    {/* Mobile Notifications */}
                    <Button variant="ghost" className="justify-start relative">
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                      <Badge className="ml-auto w-5 h-5 p-0 bg-emerald-500 text-white text-xs flex items-center justify-center">
                        3
                      </Badge>
                    </Button>
                    
                    {/* Mobile Dashboard Link */}
                    <Button onClick={() => {
                      onDashboardClick?.();
                      setIsMenuOpen(false);
                    }} variant="ghost" className="justify-start text-stone-700">
                      Dashboard
                    </Button>
                    
                    {/* Mobile Logout Button */}
                    <Button variant="ghost" onClick={handleLogout} className="justify-start text-stone-700">
                      Logout
                    </Button>
                  </>
                ) : (
                  /* Unauthenticated Mobile User Options */
                  <>
                    {/* Mobile Login Button */}
                    <Button variant="ghost" onClick={onLoginClick} className="justify-start text-stone-700">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                    
                    {/* Mobile Get Started Button */}
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
