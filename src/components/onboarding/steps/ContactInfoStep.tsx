
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Mail, Phone, Key } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface ContactInfoStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const ContactInfoStep = ({ data, updateData, onNext, onPrev }: ContactInfoStepProps) => {
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    if (contactMethod === 'phone' && data.phone) {
      setOtpSent(true);
      // In a real app, this would send the OTP
      console.log('Sending OTP to:', data.phone);
    }
  };

  const canProceed = () => {
    if (contactMethod === 'email') {
      return data.email && data.email.includes('@');
    } else {
      return data.phone && data.otp && data.otp.length === 6;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-stone-900">Contact Information</h2>
        <p className="text-stone-600">
          We'll use this to verify your account and send important updates about your trades.
        </p>
      </div>

      <Card className="border-stone-200/50">
        <CardContent className="p-6 space-y-6">
          {/* Contact Method Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-stone-800">How would you like to verify your account?</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={contactMethod === 'email' ? 'default' : 'outline'}
                onClick={() => setContactMethod('email')}
                className="h-12 justify-start"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                variant={contactMethod === 'phone' ? 'default' : 'outline'}
                onClick={() => setContactMethod('phone')}
                className="h-12 justify-start"
              >
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </Button>
            </div>
          </div>

          {/* Email Input */}
          {contactMethod === 'email' && (
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your business email"
                value={data.email}
                onChange={(e) => updateData({ email: e.target.value })}
                className="h-12"
              />
            </div>
          )}

          {/* Phone Input */}
          {contactMethod === 'phone' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={data.phone}
                    onChange={(e) => updateData({ phone: e.target.value })}
                    className="h-12"
                  />
                  <Button
                    onClick={handleSendOTP}
                    disabled={!data.phone || otpSent}
                    variant="outline"
                    className="h-12 px-6"
                  >
                    {otpSent ? 'Sent' : 'Send OTP'}
                  </Button>
                </div>
              </div>

              {otpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={data.otp}
                    onChange={(e) => updateData({ otp: e.target.value })}
                    maxLength={6}
                    className="h-12"
                  />
                  <p className="text-sm text-stone-600">
                    We've sent a verification code to {data.phone}
                  </p>
                </div>
              )}
            </div>
          )}

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
