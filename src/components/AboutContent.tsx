
/**
 * About Content Component
 * 
 * Displays comprehensive information about TradeRails including company mission,
 * vision, values, and key statistics. This component is used as an overlay view
 * when users navigate to the About section.
 * 
 * Key Features:
 * - Company mission and vision statements
 * - Core values presentation
 * - Key statistics and achievements
 * - Professional layout with emerald theme
 * - Responsive design for all devices
 * 
 * @component
 */

import { Shield, Users, TrendingUp } from 'lucide-react';

/**
 * About Content Component
 * 
 * Renders the complete About page content including:
 * - Company overview and mission
 * - Vision and values cards
 * - Business statistics and achievements
 */
const AboutContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-emerald-50">
      {/* 
        About Section
        Company information, mission, and value proposition
        Uses emerald theme with professional layout
      */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              About TradeRails
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              TradeRails revolutionizes the global stone trading industry by providing 
              a secure, transparent, and efficient B2B platform that connects exporters, 
              buyers, agents, and traders worldwide.
            </p>
          </div>
          
          {/* Mission, Vision, and Values Cards */}
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
          
          {/* Company Statistics */}
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

          {/* Additional Company Information */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="glass-panel p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-stone-900 mb-6 text-center">
                Why Choose TradeRails?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3">Global Reach</h4>
                  <p className="text-stone-600 mb-4">
                    Connect with stone traders across 50+ countries, expanding your 
                    business opportunities beyond geographical boundaries.
                  </p>
                  
                  <h4 className="font-semibold text-stone-900 mb-3">Secure Transactions</h4>
                  <p className="text-stone-600">
                    Our advanced escrow system and AI-powered quality assessment 
                    ensure every transaction is secure and transparent.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3">Quality Assurance</h4>
                  <p className="text-stone-600 mb-4">
                    AI-powered stone grading and quality assessment tools help you 
                    make informed decisions and maintain consistent standards.
                  </p>
                  
                  <h4 className="font-semibold text-stone-900 mb-3">End-to-End Support</h4>
                  <p className="text-stone-600">
                    From discovery to delivery, our platform handles logistics, 
                    payments, and compliance, making global trade effortless.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContent;
