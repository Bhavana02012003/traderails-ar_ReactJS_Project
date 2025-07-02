
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { ContactData } from '../OTPVerificationFlow';

interface VerificationResultScreenProps {
  status: 'success' | 'error' | null;
  contactData: ContactData;
  onBackToContact: () => void;
  onContinue: () => void;
}

const VerificationResultScreen = ({ 
  status, 
  contactData, 
  onBackToContact, 
  onContinue 
}: VerificationResultScreenProps) => {
  useEffect(() => {
    if (status === 'success') {
      // Auto-continue after success animation
      const timer = setTimeout(() => {
        onContinue();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, onContinue]);

  if (status === 'success') {
    return (
      <div className="p-6 sm:p-8">
        <div className="text-center space-y-6">
          <div className="animate-scale-in">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="space-y-2 animate-fade-in">
            <h2 className="text-2xl font-bold text-stone-900">
              Verification Successful!
            </h2>
            <p className="text-stone-600">
              Your {contactData.type} has been verified successfully
            </p>
          </div>

          <div className="animate-pulse">
            <div className="w-8 h-1 bg-emerald-500 rounded-full mx-auto"></div>
          </div>

          <p className="text-sm text-stone-500">
            Redirecting you to continue...
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-6 sm:p-8">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <XCircle className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-stone-900">
              Verification Failed
            </h2>
            <p className="text-stone-600">
              We couldn't verify your {contactData.type}. This might be due to:
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Expired verification code</li>
              <li>• Too many incorrect attempts</li>
              <li>• Network connectivity issues</li>
              <li>• Invalid {contactData.type} address</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onBackToContact}
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button
              variant="ghost"
              onClick={onBackToContact}
              className="w-full text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Change {contactData.type === 'phone' ? 'Phone Number' : 'Email'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default VerificationResultScreen;
