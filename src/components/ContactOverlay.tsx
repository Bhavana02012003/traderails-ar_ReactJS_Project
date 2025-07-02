
import React from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactOverlayProps {
  onClose: () => void;
}

const ContactOverlay = ({ onClose }: ContactOverlayProps) => {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header - Fixed positioning */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-stone-900">Contact Us</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-stone-600 leading-relaxed">
              Ready to transform your stone trading business? Get in touch with our team 
              and discover how TradeRails can help you connect with global markets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-stone-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-2">Office Address</h4>
                    <p className="text-stone-600">
                      TradeRails Global HQ<br />
                      123 Business District<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-2">Phone</h4>
                    <p className="text-stone-600">
                      +91 98765 43210<br />
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-2">Email</h4>
                    <p className="text-stone-600">
                      hello@traderails.com<br />
                      support@traderails.com
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-2">Global Presence</h4>
                    <p className="text-stone-600">
                      Serving 50+ countries worldwide<br />
                      24/7 customer support
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
              <h3 className="text-2xl font-semibold text-stone-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="john@company.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Your Company Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Tell us about your stone trading needs..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="bg-stone-100 border-t border-stone-200 py-6 mt-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-stone-600 text-sm">
                <span className="font-semibold text-emerald-600">Get in touch</span> with our expert team
              </p>
              <p className="text-stone-500 text-xs mt-1">
                Quick response • Expert guidance • Global support
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-stone-600">
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactOverlay;
