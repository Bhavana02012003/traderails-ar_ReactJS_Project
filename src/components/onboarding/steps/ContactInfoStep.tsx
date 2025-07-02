
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Mail, Phone, Key, Shield } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';
import OTPVerificationFlow, { ContactData } from '../../auth/OTPVerificationFlow';

interface ContactInfoStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const ContactInfoStep = ({ data, updateData, onNext, onPrev }: ContactInfoStepProps) => {
  const [mfaOtpSent, setMfaOtpSent] = useState(false);
  const [showOtpFlow, setShowOtpFlow] = useState(false);
  const [contactVerified, setContactVerified] = useState(false);

  // Determine auth method based on role
  const getAuthMethod = () => {
    if (data.role === 'buyer' || data.role === 'exporter') {
      return 'email';
    }
    return 'mobile';
  };

  const authMethod = getAuthMethod();
  const requiresMfa = data.role === 'buyer' || data.role === 'exporter';

  const handleStartOTPVerification = () => {
    setShowOtpFlow(true);
  };

  const handleOTPVerificationSuccess = (contactData: ContactData) => {
    setContactVerified(true);
    setShowOtpFlow(false);
    
    // Update data based on verification
    if (contactData.type === 'phone') {
      updateData({ phone: contactData.value });
    } else {
      updateData({ email: contactData.value });
    }
  };

  const handleBackFromOTP = () => {
    setShowOtpFlow(false);
  };

  const handleSendMfaOTP = () => {
    if (requiresMfa) {
      setMfaOtpSent(true);
      console.log('Sending MFA OTP');
    }
  };

  const canProceed = () => {
    if (showOtpFlow) return false;
    
    if (authMethod === 'email') {
      const hasCredentials = data.email && data.email.includes('@') && data.password;
      if (requiresMfa) {
        return hasCredentials && (!mfaOtpSent || data.mfaOtp) && contactVerified;
      }
      return hasCredentials && contactVerified;
    } else {
      return contactVerified;
    }
  };

  if (showOtpFlow) {
    return (
      <div className="fixed inset-0 z-50">
        <OTPVerificationFlow
          onVerificationSuccess={handleOTPVerificationSuccess}
          onBack={handleBackFromOTP}
          purpose="onboarding"
          userRole={data.role}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-stone-900">Contact Information</h2>
        <p className="text-stone-600">
          {authMethod === 'email' 
            ? "We'll use email authentication with additional security for your account."
            : "We'll verify your account using your mobile number."
          }
        </p>
      </div>

      <Card className="border-stone-200/50">
        <CardContent className="p-6 space-y-6">
          {authMethod === 'email' ? (
            // Email-based authentication for buyers and exporters
            <>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your business email"
                  value={data.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={data.password}
                  onChange={(e) => updateData({ password: e.target.value })}
                  className="h-12"
                />
              </div>

              {requiresMfa && (
                <div className="space-y-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center text-emerald-700">
                    <Shield className="w-4 h-4 mr-2" />
                    <span className="font-medium">Multi-Factor Authentication</span>
                  </div>
                  
                  {!mfaOtpSent ? (
                    <Button
                      onClick={handleSendMfaOTP}
                      variant="outline"
                      className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                    >
                      Enable MFA (Recommended)
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="mfaOtp">Enter MFA Code</Label>
                      <Input
                        id="mfaOtp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={data.mfaOtp}
                        onChange={(e) => updateData({ mfaOtp: e.target.value })}
                        maxLength={6}
                        className="h-12"
                      />
                      <p className="text-sm text-emerald-600">
                        MFA code sent to your email for additional security
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : null}

          {/* Contact Verification Section */}
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center text-blue-700">
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-medium">Contact Verification Required</span>
            </div>
            
            {!contactVerified ? (
              <div className="space-y-3">
                <p className="text-blue-700 text-sm">
                  Verify your {authMethod === 'email' ? 'email' : 'phone number'} to continue with account setup.
                </p>
                <Button
                  onClick={handleStartOTPVerification}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Verify {authMethod === 'email' ? 'Email' : 'Phone Number'}
                </Button>
              </div>
            ) : (
              <div className="flex items-center text-emerald-700">
                <Shield className="w-4 h-4 mr-2" />
                <span className="font-medium">Contact verified successfully!</span>
              </div>
            )}
          </div>

          {/* Invite Code */}
          <div className="space-y-2">
            <Label htmlFor="inviteCode" className="flex items-center">
              <Key className="w-4 h-4 mr-2" />
              Invite Code (Optional)
            </Label>
            <Input
              id="inviteCode"
              type="text"
              placeholder="Enter invite code if you have one"
              value={data.inviteCode}
              onChange={(e) => updateData({ inviteCode: e.target.value })}
              className="h-12"
            />
            <p className="text-sm text-stone-500">
              Have an invite code from an existing organization? Enter it here.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          variant="outline"
          size="lg"
          className="px-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed()}
          size="lg"
          className="emerald-gradient text-white px-8 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ContactInfoStep;
