
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { ContactData } from '../OTPVerificationFlow';

interface EnterContactScreenProps {
  onSubmit: (data: ContactData) => void;
  onBack: () => void;
  purpose: 'login' | 'onboarding' | 'invite';
  userRole?: string;
}

const EnterContactScreen = ({ onSubmit, onBack, purpose, userRole }: EnterContactScreenProps) => {
  const [contactType, setContactType] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [deliveryMethod, setDeliveryMethod] = useState<'whatsapp' | 'sms' | 'email'>('sms');

  const countryCodes = [
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+81', country: 'JP', flag: '🇯🇵' },
    { code: '+55', country: 'BR', flag: '🇧🇷' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const contactData: ContactData = {
      type: contactType,
      value: contactType === 'phone' ? phoneNumber : email,
      countryCode: contactType === 'phone' ? countryCode : '',
      method: contactType === 'phone' ? deliveryMethod : 'email'
    };

    onSubmit(contactData);
  };

  const canSubmit = () => {
    if (contactType === 'phone') {
      return phoneNumber.length >= 10;
    }
    return email.includes('@') && email.includes('.');
  };

  const shouldShowPhone = () => {
    // Show phone for agents, traders, or if explicitly chosen
    return userRole === 'agent' || userRole === 'trader' || contactType === 'phone';
  };

  const shouldShowEmail = () => {
    // Show email for buyers, exporters, or if explicitly chosen
    return userRole === 'buyer' || userRole === 'exporter' || contactType === 'email';
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            {purpose === 'login' ? 'Sign In' : 'Verify Your Identity'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            We'll send you a secure verification code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Type Selection */}
          {(!userRole || (userRole !== 'agent' && userRole !== 'trader' && userRole !== 'buyer' && userRole !== 'exporter')) && (
            <div className="flex rounded-lg bg-stone-100 p-1">
              <button
                type="button"
                onClick={() => setContactType('phone')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                  contactType === 'phone'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Phone</span>
              </button>
              <button
                type="button"
                onClick={() => setContactType('email')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                  contactType === 'email'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </button>
            </div>
          )}

          {/* Phone Input */}
          {(shouldShowPhone() || contactType === 'phone') && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-stone-700 font-medium">Phone Number</Label>
                <div className="flex space-x-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-24 h-12 bg-white border-stone-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-stone-200">
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center space-x-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    placeholder="1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 h-12 bg-white border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 text-lg"
                    maxLength={15}
                  />
                </div>
              </div>

              {/* Delivery Method for Phone */}
              <div className="space-y-3">
                <Label className="text-stone-700 font-medium text-sm">Delivery Method</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('whatsapp')}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                      deliveryMethod === 'whatsapp'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium text-sm">WhatsApp</div>
                      <div className="text-xs opacity-75">Instant delivery</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('sms')}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                      deliveryMethod === 'sms'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium text-sm">SMS</div>
                      <div className="text-xs opacity-75">Standard text</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Email Input */}
          {(shouldShowEmail() || contactType === 'email') && (
            <div className="space-y-2">
              <Label className="text-stone-700 font-medium">Email Address</Label>
              <Input
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 text-lg"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="space-y-4 pt-2">
            <Button
              type="submit"
              disabled={!canSubmit()}
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Verification Code
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="w-full text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterContactScreen;
