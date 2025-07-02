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
type ViewType = 'home' | 'marketplace' | 'exporter' | 'buyer' | 'admin' | 'trader' | 'agent' | 'onboarding' | 'invite';
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
            About Section
            Company information, mission, and value proposition
            Uses emerald theme with professional layout
          */}
          <section id="about" className="py-20 bg-gradient-to-br from-stone-50 to-emerald-50">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                  About TradeRails
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed mb-8">
                  TradeRails revolutionizes the global stone trading industry by providing 
                  a secure, transparent, and efficient B2B platform that connects exporters, 
                  buyers, agents, and traders worldwide.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {/* Mission Card */}
                <div className="glass-panel p-8 rounded-xl text-center">
                  <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-4">Our Mission</h3>
                  <p className="text-stone-600">
                    To create the most trusted and efficient marketplace for stone trading, 
                    ensuring secure transactions and quality assurance for all participants.
                  </p>
                </div>
                
                {/* Vision Card */}
                <div className="glass-panel p-8 rounded-xl text-center">
                  <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-4">Our Vision</h3>
                  <p className="text-stone-600">
                    To become the invisible rails that power global stone commerce, 
                    making international trade as simple as local transactions.
                  </p>
                </div>
                
                {/* Values Card */}
                <div className="glass-panel p-8 rounded-xl text-center">
                  <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-4">Our Values</h3>
                  <p className="text-stone-600">
                    Transparency, security, and innovation drive everything we do. 
                    We believe in empowering our community with cutting-edge technology.
                  </p>
                </div>
              </div>
              
              {/* Company Stats */}
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
          </section>

          {/* 
            Contact Section
            Contact information, office locations, and contact form
            Professional layout with multiple contact options
          */}
          <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Ready to transform your stone trading business? Contact our team today 
                  to learn how TradeRails can help you grow your business globally.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                  <h3 className="text-2xl font-semibold text-stone-900 mb-8">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Head Office */}
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-stone-900 mb-1">Head Office</h4>
                        <p className="text-stone-600">
                          123 Stone Trade Center<br />
                          Mumbai, Maharashtra 400001<br />
                          India
                        </p>
                      </div>
                    </div>
                    
                    {/* Phone */}
                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-emerald-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-stone-900 mb-1">Phone</h4>
                        <p className="text-stone-600">
                          +91 22 1234 5678<br />
                          +1 (555) 123-4567 (US)
                        </p>
                      </div>
                    </div>
                    
                    {/* Email */}
                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-emerald-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-stone-900 mb-1">Email</h4>
                        <p className="text-stone-600">
                          info@traderails.com<br />
                          support@traderails.com
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Business Hours */}
                  <div className="mt-8 glass-panel p-6 rounded-xl">
                    <h4 className="font-semibold text-stone-900 mb-3">Business Hours</h4>
                    <div className="space-y-2 text-stone-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM IST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span>10:00 AM - 4:00 PM IST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="glass-panel p-8 rounded-xl">
                  <h3 className="text-2xl font-semibold text-stone-900 mb-6">
                    Send us a Message
                  </h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-stone-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Tell us about your stone trading needs..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full emerald-gradient text-white font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-transform"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

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
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Marketplace</a></li>
                    <li><a href="#about" className="hover:text-emerald-400 transition-colors">About</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">API</a></li>
                  </ul>
                </div>
                
                {/* Support Links Column */}
                <div>
                  <h3 className="font-semibold mb-4 text-white text-lg">Support</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                    <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Status</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
                  </ul>
                </div>
                
                {/* Company Information Column */}
                <div>
                  <h3 className="font-semibold mb-4 text-white text-lg">Company</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li><a href="#about" className="hover:text-emerald-400 transition-colors">About</a></li>
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
