
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import EnterContactScreen from './otp/EnterContactScreen';
import OTPInputScreen from './otp/OTPInputScreen';
import VerificationResultScreen from './otp/VerificationResultScreen';

export interface ContactData {
  type: 'phone' | 'email';
  value: string;
  countryCode: string;
  method: 'whatsapp' | 'sms' | 'email';
}

export interface OTPFlowProps {
  onVerificationSuccess: (contactData: ContactData) => void;
  onBack: () => void;
  purpose: 'login' | 'onboarding' | 'invite';
  userRole?: string;
}

const OTPVerificationFlow = ({ onVerificationSuccess, onBack, purpose, userRole }: OTPFlowProps) => {
  const [currentStep, setCurrentStep] = useState<'contact' | 'otp' | 'result'>('contact');
  const [contactData, setContactData] = useState<ContactData>({
    type: 'phone',
    value: '',
    countryCode: '+1',
    method: 'sms'
  });
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'error' | null>(null);

  const handleContactSubmit = (data: ContactData) => {
    setContactData(data);
    setCurrentStep('otp');
  };

  const handleOTPVerified = () => {
    setVerificationStatus('success');
    setCurrentStep('result');
    setTimeout(() => {
      onVerificationSuccess(contactData);
    }, 2000);
  };

  const handleOTPError = () => {
    setVerificationStatus('error');
    setCurrentStep('result');
  };

  const handleBackToContact = () => {
    setCurrentStep('contact');
    setVerificationStatus(null);
  };

  const getPurposeTitle = () => {
    switch (purpose) {
      case 'login':
        return 'Secure Login';
      case 'onboarding':
        return 'Account Verification';
      case 'invite':
        return 'Join Organization';
      default:
        return 'Verification';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-4 w-32 h-32 bg-stone-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/3 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="w-16 h-16 emerald-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">TradeRails</h1>
          <p className="text-stone-600 font-medium">{getPurposeTitle()}</p>
        </div>

        {/* Main Content */}
        <Card className="glass-panel border-0 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="animate-fade-in">
              {currentStep === 'contact' && (
                <EnterContactScreen
                  onSubmit={handleContactSubmit}
                  onBack={onBack}
                  purpose={purpose}
                  userRole={userRole}
                />
              )}
              
              {currentStep === 'otp' && (
                <OTPInputScreen
                  contactData={contactData}
                  onVerified={handleOTPVerified}
                  onError={handleOTPError}
                  onBack={handleBackToContact}
                />
              )}
              
              {currentStep === 'result' && (
                <VerificationResultScreen
                  status={verificationStatus}
                  contactData={contactData}
                  onBackToContact={handleBackToContact}
                  onContinue={() => onVerificationSuccess(contactData)}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-stone-500">
          <p>Secure verification powered by TradeRails</p>
          <p className="mt-1">Your information is encrypted and protected</p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationFlow;
