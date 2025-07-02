
/**
 * Contact Content Component
 * 
 * Provides comprehensive contact information and communication channels for
 * TradeRails users. This component includes contact details, office locations,
 * business hours, and a contact form for inquiries.
 * 
 * Key Features:
 * - Multiple contact methods (phone, email, address)
 * - Business hours information
 * - Interactive contact form
 * - Professional layout with responsive design
 * - Office location details
 * 
 * @component
 */

import { MapPin, Phone, Mail } from 'lucide-react';

/**
 * Contact Content Component
 * 
 * Renders the complete Contact page content including:
 * - Contact information and office details
 * - Business hours
 * - Contact form for inquiries
 * - Professional layout with emerald theme
 */
const ContactContent = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 
        Contact Section
        Contact information, office locations, and contact form
        Professional layout with multiple contact options
      */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Ready to transform your stone trading business? Contact our team today 
              to learn how TradeRails can help you grow your business globally.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-stone-900 mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {/* Head Office */}
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
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
                  <Phone className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
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
                  <Mail className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
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

              {/* Additional Office Locations */}
              <div className="mt-8 glass-panel p-6 rounded-xl">
                <h4 className="font-semibold text-stone-900 mb-4">Regional Offices</h4>
                <div className="space-y-4 text-sm text-stone-600">
                  <div>
                    <div className="font-medium text-stone-900">Singapore Office</div>
                    <div>Marina Bay Financial Centre</div>
                    <div>Singapore 018989</div>
                  </div>
                  <div>
                    <div className="font-medium text-stone-900">Dubai Office</div>
                    <div>Dubai International Financial Centre</div>
                    <div>Dubai, UAE</div>
                  </div>
                  <div>
                    <div className="font-medium text-stone-900">Istanbul Office</div>
                    <div>Levent Business District</div>
                    <div>Istanbul, Turkey</div>
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
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
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
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-stone-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="general">General Information</option>
                    <option value="demo">Request Demo</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Questions</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Tell us about your stone trading needs or any questions you have..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full emerald-gradient text-white font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-transform"
                >
                  Send Message
                </button>

                <p className="text-xs text-stone-500 text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactContent;
