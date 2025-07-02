
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle, Mail, Send, RefreshCw } from 'lucide-react';
import { ContactData } from '../OTPVerificationFlow';

interface OTPInputScreenProps {
  contactData: ContactData;
  onVerified: () => void;
  onError: () => void;
  onBack: () => void;
}

const OTPInputScreen = ({ contactData, onVerified, onError, onBack }: OTPInputScreenProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Countdown timer
    if (resendCountdown > 0 && !canResend) {
      const timer = setTimeout(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resendCountdown === 0) {
      setCanResend(true);
    }
  }, [resendCountdown, canResend]);

  useEffect(() => {
    // Auto-verify when all digits are entered
    if (otp.every(digit => digit !== '') && otp.join('').length === 6) {
      handleVerify();
    }
  }, [otp]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedValue = value.slice(0, 6);
      const newOtp = [...otp];
      for (let i = 0; i < pastedValue.length && i < 6; i++) {
        newOtp[i] = pastedValue[i];
      }
      setOtp(newOtp);
      
      // Focus last filled input or next empty one
      const nextIndex = Math.min(pastedValue.length, 5);
      inputsRef.current[nextIndex]?.focus();
      return;
    }

    // Handle single digit input
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError('');

      // Auto-focus next input
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock verification logic
      const otpValue = otp.join('');
      if (otpValue === '123456' || otpValue === '000000') {
        onVerified();
      } else {
        setError('Invalid verification code. Please try again.');
        // Clear OTP on error
        setOtp(['', '', '', '', '', '']);
        inputsRef.current[0]?.focus();
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setResendCountdown(45);
    setError('');
    
    // Simulate resend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message briefly
    setError('New code sent successfully!');
    setTimeout(() => setError(''), 3000);
  };

  const getContactDisplay = () => {
    if (contactData.type === 'phone') {
      const masked = contactData.value.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
      return `${contactData.countryCode} ${masked}`;
    }
    return contactData.value.replace(/(.{2}).*(@.*)/, '$1***$2');
  };

  const getMethodIcon = () => {
    switch (contactData.method) {
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-green-600" />;
      case 'sms':
        return <Send className="w-4 h-4 text-blue-600" />;
      case 'email':
        return <Mail className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getMethodName = () => {
    switch (contactData.method) {
      case 'whatsapp':
        return 'WhatsApp';
      case 'sms':
        return 'SMS';
      case 'email':
        return 'Email';
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Verify Your {contactData.type === 'phone' ? 'Phone' : 'Email'}
          </h2>
          <div className="flex items-center justify-center space-x-2 text-stone-600">
            {getMethodIcon()}
            <p className="text-sm">
              Code sent to {getContactDisplay()} via {getMethodName()}
            </p>
          </div>
        </div>

        {/* OTP Input */}
        <div className="space-y-4">
          <div className="flex justify-center space-x-2 sm:space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputsRef.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={e => handleInputChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className={`w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 rounded-lg transition-all ${
                  digit
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : error
                    ? 'border-red-300 bg-red-50'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                disabled={isVerifying}
              />
            ))}
          </div>

          {error && (
            <div className={`text-center text-sm p-3 rounded-lg ${
              error.includes('success') 
                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                : 'text-red-700 bg-red-50 border border-red-200'
            }`}>
              {error}
            </div>
          )}
        </div>

        {/* Resend Section */}
        <div className="text-center space-y-3">
          {!canResend ? (
            <p className="text-stone-600 text-sm">
              Resend code in <span className="font-mono font-semibold">{resendCountdown}s</span>
            </p>
          ) : (
            <Button
              variant="ghost"
              onClick={handleResend}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-medium"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Resend Code
            </Button>
          )}
        </div>

        {/* Manual Verify Button */}
        {otp.some(digit => digit !== '') && !isVerifying && (
          <Button
            onClick={handleVerify}
            disabled={otp.join('').length !== 6}
            className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isVerifying ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              'Verify Code'
            )}
          </Button>
        )}

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full text-stone-600 hover:text-stone-900"
          disabled={isVerifying}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Change {contactData.type === 'phone' ? 'Phone Number' : 'Email'}
        </Button>
      </div>
    </div>
  );
};

export default OTPInputScreen;
