/**
 * Main Index Page Component
 * 
 * This is the primary entry point for the TradeRails application, a B2B stone trading platform.
 * It manages the overall application state, navigation, and renders different views based on user interactions.
 * 
 * Key Features:
 * - Multi-view navigation (home, marketplace, dashboards)
 * - User authentication and role-based access
 * - Modal management for login and onboarding
 * - Responsive design with mobile-first approach
 * 
 * @component
 * @example
 * return <Index />
 */

import { useState } from 'react';
import { Globe, MapPin, Phone, Mail, Shield, Users, TrendingUp } from 'lucide-react';

// Component imports for different sections and views
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TrustSection from '@/components/TrustSection';
import FeaturesSection from '@/components/FeaturesSection';
import MarketplacePreview from '@/components/MarketplacePreview';
import MarketplaceContent from '@/components/MarketplaceContent';
import AboutContent from '@/components/AboutContent';
import ContactContent from '@/components/ContactContent';

// Dashboard components for different user roles
import ExporterDashboard from '@/components/exporter/ExporterDashboard';
import BuyerDashboard from '@/components/buyer/BuyerDashboard';
import AdminDashboard from '@/components/admin/AdminDashboard';
import TraderDashboard from '@/components/trader/TraderDashboard';
import AgentDashboard from '@/components/agent/AgentDashboard';

// Modal and flow components
import LoginModal from '@/components/LoginModal';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';
import InviteUserFlow from '@/components/invite/InviteUserFlow';

/**
 * Type definitions for application state management
 */
type ViewType = 'home' | 'marketplace' | 'about' | 'contact' | 'exporter' | 'buyer' | 'admin' | 'trader' | 'agent' | 'onboarding' | 'invite';
type UserType = 'exporter' | 'buyer' | 'admin' | 'agent' | 'trader' | null;

/**
 * Main Index Component
 * 
 * Manages application-wide state including:
 * - Current view/page navigation
 * - User authentication status
 * - Modal visibility states
 * - User role and permissions
 */
const Index = () => {
  // Authentication and modal state management
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Primary navigation state - determines which view/page is currently active
  const [currentView, setCurrentView] = useState<ViewType>('home');
  
  // User management state
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Authentication Event Handlers
   * These functions manage user login/logout flow and navigation
   */

  /**
   * Opens the login modal when user clicks login/get started buttons
   */
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  /**
   * Handles successful login and redirects user to appropriate dashboard
   * @param type - The user role type (buyer, exporter, agent, trader)
   */
  const handleLoginSuccess = (type: 'buyer' | 'exporter' | 'agent' | 'trader') => {
    setUserType(type);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    
    // Redirect to appropriate dashboard based on user role
    if (type === 'buyer') {
      setCurrentView('buyer');
    } else if (type === 'agent') {
      setCurrentView('agent');
    } else if (type === 'exporter') {
      setCurrentView('exporter');
    } else if (type === 'trader') {
      setCurrentView('trader');
    }
  };

  /**
   * Handles user logout and resets application state
   */
  const handleLogout = () => {
    setUserType(null);
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  /**
   * Navigation Event Handlers
   * These functions handle navigation between different views/pages
   */

  /**
   * Navigates to marketplace view
   */
  const handleBrowseClick = () => {
    setCurrentView('marketplace');
  };

  /**
   * Navigates back to home view
   */
  const handleHomeClick = () => {
    setCurrentView('home');
  };

  /**
   * Navigates to about overlay view
   */
  const handleAboutClick = () => {
    setCurrentView('about');
  };

  /**
   * Navigates to contact overlay view
   */
  const handleContactClick = () => {
    setCurrentView('contact');
  };

  /**
   * Navigates to exporter dashboard (for listing inventory)
   */
  const handleListClick = () => {
    setCurrentView('exporter');
  };

  /**
   * Handles dashboard navigation with authentication check
   * Redirects to appropriate dashboard based on user role
   */
  const handleDashboardClick = () => {
    // Check if user is authenticated
    if (!isLoggedIn || !userType) {
      setIsLoginModalOpen(true);
      return;
    }
    
    // Navigate to role-specific dashboard
    if (userType === 'buyer') {
      setCurrentView('buyer');
    } else if (userType === 'agent') {
      setCurrentView('agent');
    } else if (userType === 'exporter') {
      setCurrentView('exporter');
    } else if (userType === 'trader') {
      setCurrentView('trader');
    } else if (userType === 'admin') {
      setCurrentView('admin');
    }
  };

  /**
   * Initiates user onboarding flow
   */
  const handleCreateAccount = () => {
    setCurrentView('onboarding');
    setIsLoginModalOpen(false);
  };

  /**
   * Shows the invite user flow for sending invitations
   */
  const handleShowInviteFlow = () => {
    setCurrentView('invite');
  };

  /**
   * Main Render Logic
   * 
   * The component renders different content based on the current view state:
   * - home: Landing page with hero, features, etc.
   * - marketplace: Product browsing interface
   * - about: Company information and mission
   * - contact: Contact information and form
   * - Various dashboards: Role-specific user interfaces
   * - onboarding: New user setup flow
   * - invite: User invitation flow
   */
  return (
    <div className="min-h-screen bg-white">
      {/* 
        Conditional Header Rendering
        Header is hidden for certain views (admin, onboarding, invite) 
        that have their own navigation or are full-screen flows
      */}
      {currentView !== 'admin' && currentView !== 'onboarding' && currentView !== 'invite' && (
        <Header 
          onLoginClick={handleLoginClick} 
          onMarketplaceClick={handleBrowseClick}
          onHomeClick={handleHomeClick}
          onDashboardClick={handleDashboardClick}
          onAboutClick={handleAboutClick}
          onContactClick={handleContactClick}
          currentView={currentView}
          isLoggedIn={isLoggedIn}
          userType={userType}
          onLogout={handleLogout}
        />
      )}
      
      {/* 
        Main Content Area - Conditional Rendering Based on Current View
        Each view renders its corresponding component with appropriate props
      */}
      {currentView === 'home' ? (
        <>
          {/* Home Page Layout */}
          <main>
            {/* Hero section with primary call-to-action buttons */}
            <HeroSection 
              onBrowseClick={handleBrowseClick}
              onListClick={handleListClick}
            />
            
            {/* Trust indicators and social proof */}
            <TrustSection />
            
            {/* Feature highlights and value propositions */}
            <FeaturesSection />
            
            {/* Preview of marketplace functionality */}
            <MarketplacePreview />
          </main>

          {/* 
            Footer Section
            Contains company information, navigation links, and branding
            Uses dark theme with emerald accent colors
          */}
          <footer className="bg-slate-900 text-white py-12">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo and Branding Column */}
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    {/* Company logo - larger size for better visibility on dark background */}
                    <img 
                      src="/lovable-uploads/3445b0da-b926-49fc-9f5e-9a14522b14fd.png" 
                      alt="TradeRails - The Invisible Rails of Global Commerce" 
                      className="h-48 w-auto object-contain"
                    />
                  </div>
                </div>
                
                {/* Platform Links Column */}
                <div>
                  <h3 className="font-semibold mb-4 text-white text-lg">Platform</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li><button onClick={handleBrowseClick} className="hover:text-emerald-400 transition-colors">Marketplace</button></li>
                    <li><button onClick={handleAboutClick} className="hover:text-emerald-400 transition-colors">About</button></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">API</a></li>
                  </ul>
                </div>
                
                {/* Support Links Column */}
                <div>
                  <h3 className="font-semibold mb-4 text-white text-lg">Support</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                    <li><button onClick={handleContactClick} className="hover:text-emerald-400 transition-colors">Contact Us</button></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Status</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
                  </ul>
                </div>
                
                {/* Company Information Column */}
                <div>
                  <h3 className="font-semibold mb-4 text-white text-lg">Company</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li><button onClick={handleAboutClick} className="hover:text-emerald-400 transition-colors">About</button></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms</a></li>
                  </ul>
                </div>
              </div>
              
              {/* Copyright Section */}
              <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-300">
                <p>&copy; 2024 TradeRails. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </>
      ) : currentView === 'marketplace' ? (
        /* Marketplace view for browsing stone inventory */
        <MarketplaceContent />
      ) : currentView === 'about' ? (
        /* About view for company information */
        <AboutContent />
      ) : currentView === 'contact' ? (
        /* Contact view for contact information and form */
        <ContactContent />
      ) : currentView === 'exporter' ? (
        /* Exporter dashboard for inventory management and quote creation */
        <ExporterDashboard 
          onShowInviteFlow={handleShowInviteFlow} 
          userType={userType === 'trader' ? 'trader' : 'exporter'}
        />
      ) : currentView === 'buyer' ? (
        /* Buyer dashboard for order management and stone sourcing */
        <BuyerDashboard 
          onShowInviteFlow={handleShowInviteFlow}
          userType={userType === 'agent' ? 'agent' : userType === 'trader' ? 'trader' : 'buyer'}
        />
      ) : currentView === 'trader' ? (
        /* Trader dashboard for managing multiple trading relationships */
        <TraderDashboard onShowInviteFlow={handleShowInviteFlow} />
      ) : currentView === 'agent' ? (
        /* Agent dashboard for representing buyers in transactions */
        <AgentDashboard onShowInviteFlow={handleShowInviteFlow} />
      ) : currentView === 'admin' ? (
        /* Admin dashboard for platform management and oversight */
        <AdminDashboard onLogout={handleLogout} onShowInviteFlow={handleShowInviteFlow} />
      ) : currentView === 'invite' ? (
        /* User invitation flow for onboarding new platform members */
        <InviteUserFlow onBack={handleHomeClick} />
      ) : (
        /* Onboarding wizard for new user setup */
        <OnboardingWizard />
      )}

      {/* 
        Login Modal
        Overlay modal for user authentication
        Conditionally rendered based on isLoginModalOpen state
      */}
      <LoginModal 
        open={isLoginModalOpen} 
        onOpenChange={setIsLoginModalOpen}
        onLoginSuccess={handleLoginSuccess}
        onCreateAccount={handleCreateAccount}
      />
    </div>
  );
};

export default Index;
