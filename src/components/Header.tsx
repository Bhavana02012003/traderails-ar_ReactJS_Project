
/**
 * Header Component
 * 
 * The main navigation header for the TradeRails application. This component provides
 * primary navigation, user authentication controls, and responsive mobile menu functionality.
 * 
 * Key Features:
 * - Responsive design with mobile hamburger menu
 * - User authentication state management
 * - Role-based navigation and controls
 * - Notification system integration
 * - Dropdown menus for user account management
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onLoginClick - Callback for login modal
 * @param {boolean} props.isLoggedIn - User authentication status
 * @param {string} props.userType - User role type
 * @param {Function} props.onLogout - Logout callback
 * @param {Function} props.onHomeClick - Navigation to home
 * @param {Function} props.onDashboardClick - Navigation to user dashboard
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Menu, X, Bell, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

/**
 * Props interface for Header component
 */
interface HeaderProps {
  /** Function to handle login modal opening */
  onLoginClick: () => void;
  /** Optional function to navigate to home page */
  onHomeClick?: () => void;
  /** Optional function to navigate to user dashboard */
  onDashboardClick?: () => void;
  /** Optional function to navigate to session management */
  onSessionManagementClick?: () => void;
  /** Current active view for navigation highlighting */
  currentView?: 'home' | 'marketplace' | 'about' | 'contact' | 'exporter' | 'buyer' | 'admin' | 'trader' | 'agent' | 'session-management';
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
 * - User authentication controls
 * - Mobile responsive menu
 * - Notification system
 */
const Header = ({ 
  onLoginClick, 
  onHomeClick, 
  onDashboardClick,
  onSessionManagementClick,
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

  /**
   * Handles session management navigation
   */
  const handleSessionManagement = () => {
    onSessionManagementClick?.();
    setIsMenuOpen(false);
  };

  return (
    <header className="relative z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
            <img 
              src="/lovable-uploads/ab167848-cedd-4e49-86de-c1ad8208769d.png" 
              alt="TradeRails - The Invisible Rails of Global Commerce" 
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop User Controls Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Authenticated User Controls */}
            {isLoggedIn && (userType === 'buyer' || userType === 'exporter' || userType === 'agent' || userType === 'trader') ? (
              <>
                {/* Dashboard Button */}
                <Button 
                  variant="ghost" 
                  onClick={onDashboardClick}
                  className="text-stone-700 hover:text-emerald-600 font-medium"
                >
                  Dashboard
                </Button>
                
                {/* Notification Bell with Badge */}
                <Button variant="ghost" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-emerald-500 text-white text-xs flex items-center justify-center">
                    3
                  </Badge>
                </Button>
                
                {/* User Account Dropdown Menu */}
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSessionManagement}>
                      <Shield className="w-4 h-4 mr-2" />
                      Session Management
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              /* Unauthenticated User Controls */
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

          {/* Mobile Menu Toggle Button */}
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

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              
              {/* Dashboard Navigation Link - Only visible when user is logged in */}
              {isLoggedIn && (
                <button 
                  onClick={() => {
                    onDashboardClick?.();
                    setIsMenuOpen(false);
                  }}
                  className="text-left transition-colors font-medium text-stone-700 hover:text-emerald-600"
                >
                  Dashboard
                </button>
              )}
              
              {/* Mobile User Controls Section */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-stone-200">
                {isLoggedIn && (userType === 'buyer' || userType === 'exporter' || userType === 'agent' || userType === 'trader') ? (
                  /* Authenticated Mobile User Options */
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
                    
                    <Button onClick={handleSessionManagement} variant="ghost" className="justify-start text-stone-700">
                      <Shield className="w-4 h-4 mr-2" />
                      Session Management
                    </Button>
                    
                    <Button variant="ghost" onClick={handleLogout} className="justify-start text-stone-700">
                      Logout
                    </Button>
                  </>
                ) : (
                  /* Unauthenticated Mobile User Options */
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
