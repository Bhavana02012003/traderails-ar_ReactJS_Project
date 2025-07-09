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
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import TrustSection from '@/components/TrustSection';
import FeaturesSection from '@/components/FeaturesSection';
import MarketplacePreview from '@/components/MarketplacePreview';
import MarketplaceContent from '@/components/MarketplaceContent';
import AboutContent from '@/components/AboutContent';
import ContactContent from '@/components/ContactOverlay';
import AboutOverlay from '@/components/AboutOverlay';
import ContactOverlay from '@/components/ContactOverlay';

// Dashboard components for different user roles
import ExporterDashboard from '@/components/exporter/ExporterDashboard';
import BuyerDashboard from '@/components/buyer/BuyerDashboard';
import AdminDashboard from '@/components/admin/AdminDashboard';
import TraderDashboard from '@/components/trader/TraderDashboard';
import AgentDashboard from '@/components/agent/AgentDashboard';

// Modal and flow components
import LoginModal from '@/components/LoginModal';
import InviteUserFlow from '@/components/invite/InviteUserFlow';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';
import SessionManagement from '@/components/security/SessionManagement';

/**
 * Type definitions for application state management
 */
type ViewType = 'home' | 'marketplace' | 'about' | 'contact' | 'onboarding' | 'exporter' | 'buyer' | 'admin' | 'trader' | 'agent' | 'invite' | 'session-management';
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
   * @param type - The user role type (buyer, exporter, agent, trader, admin)
   */
  const handleLoginSuccess = (type: 'buyer' | 'exporter' | 'agent' | 'trader' | 'admin') => {
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
    } else if (type === 'admin') {
      setCurrentView('admin');
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
   * Navigates to about view
   */
  const handleAboutClick = () => {
    setCurrentView('about');
  };

  /**
   * Navigates to contact view
   */
  const handleContactClick = () => {
    setCurrentView('contact');
  };

  /**
   * Navigates to create account overlay view
   */
  const handleCreateAccountClick = () => {
    setCurrentView('onboarding');
  };

  /**
   * Navigates back to home from onboarding
   */
  const handleCancelOnboarding = () => {
    setCurrentView('home');
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
   * Shows the invite user flow for sending invitations
   */
  const handleShowInviteFlow = () => {
    setCurrentView('invite');
  };

  /**
   * Navigates to session management view
   */
  const handleSessionManagementClick = () => {
    if (isLoggedIn) {
      setCurrentView('session-management');
    }
  };

  /**
   * Handles back navigation from session management to appropriate dashboard
   */
  const handleSessionManagementBack = () => {
    if (isLoggedIn && userType) {
      handleDashboardClick();
    } else {
      setCurrentView('home');
    }
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
   * - invite: User invitation flow
   * - session-management: User session security management
   */
  return (
    <div className="min-h-screen bg-white">
      {/* 
        Conditional Header Rendering
        Header is hidden for certain views (admin, invite, onboarding, session-management) 
        that have their own navigation or are full-screen flows
      */}
      {currentView !== 'admin' && currentView !== 'invite' && currentView !== 'onboarding' && currentView !== 'session-management' && (
        <Header 
          onLoginClick={handleLoginClick} 
          onHomeClick={handleHomeClick}
          onDashboardClick={handleDashboardClick}
          onSessionManagementClick={handleSessionManagementClick}
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
      {currentView === 'session-management' ? (
        /* Session Management view for security and session control */
        <SessionManagement onBack={handleSessionManagementBack} />
      ) : currentView === 'home' ? (
        /* Home page layout with hero section, features, and marketplace preview */
        <main className="overflow-hidden">
          <HeroSection onBrowseClick={handleBrowseClick} onListClick={handleListClick} />
          <TrustSection />
          <FeaturesSection />
          <MarketplacePreview />
          <Footer />
        </main>
      ) : currentView === 'marketplace' ? (
        /* Marketplace view for browsing stone inventory */
        <MarketplaceContent />
      ) : currentView === 'about' ? (
        /* About view using the overlay component as a full page */
        <AboutOverlay onClose={handleHomeClick} />
      ) : currentView === 'contact' ? (
        /* Contact view using the overlay component as a full page */
        <ContactOverlay onClose={handleHomeClick} />
      ) : currentView === 'onboarding' ? (
        /* Onboarding view for creating new accounts */
        <OnboardingWizard onCancel={handleCancelOnboarding} />
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
      ) : (
        /* User invitation flow for onboarding new platform members */
        <InviteUserFlow onBack={handleHomeClick} />
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
        onCreateAccount={handleCreateAccountClick}
      />
    </div>
  );
};

export default Index;
