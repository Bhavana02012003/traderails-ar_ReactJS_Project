
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building, Shield, CheckCircle, ArrowLeft, Camera, User } from 'lucide-react';
import { InviteData } from '../InviteUserFlow';

interface InviteAcceptanceStepProps {
  data: InviteData;
  updateData: (data: Partial<InviteData>) => void;
  onAccepted: () => void;
  onBack: () => void;
}

const InviteAcceptanceStep = ({ data, updateData, onAccepted, onBack }: InviteAcceptanceStepProps) => {
  const [step, setStep] = useState<'welcome' | 'otp' | 'profile'>('welcome');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setStep('otp');
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setStep('profile');
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate profile creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    onAccepted();
  };

  const getRoleDisplay = (role: string) => {
    const roleMap: { [key: string]: string } = {
      'factory-user': 'Factory User',
      'independent-trader': 'Independent Trader',
      'buyer-agent': 'Buyer Agent',
      'finance-manager': 'Finance Manager',
      'compliance-officer': 'Compliance Officer',
    };
    return roleMap[role] || role;
  };

  if (step === 'welcome') {
    return (
      <div className="p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Building className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Welcome to TradeRails!</h2>
            <p className="text-stone-600 text-lg">You've been invited to join an organization</p>
          </div>

          {/* Invitation Details */}
          <div className="bg-gradient-to-r from-emerald-50 to-stone-50 rounded-2xl p-8 mb-8 border border-emerald-100">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-left">
                  <p className="text-stone-900 font-semibold">{data.inviterName}</p>
                  <p className="text-stone-600 text-sm">from {data.orgName}</p>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-stone-800 font-medium">You're invited as:</p>
                <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-emerald-200">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-emerald-700">{getRoleDisplay(data.role)}</span>
                </div>
              </div>

              {data.notes && (
                <div className="bg-white/70 rounded-lg p-4 border border-stone-200">
                  <p className="text-stone-700 text-sm">{data.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleContinue}
              className="w-full h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Accept Invitation & Continue
            </Button>
            
            <Button
              variant="ghost"
              onClick={onBack}
              className="w-full text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Invite Form
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="p-8 md:p-12">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Verify Your Identity</h2>
            <p className="text-stone-600">Enter the OTP sent to {data.phoneNumber}</p>
          </div>

          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="otp" className="text-base font-semibold text-stone-800">
                Verification Code
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={data.otp}
                onChange={(e) => updateData({ otp: e.target.value })}
                maxLength={6}
                className="text-center text-xl tracking-widest h-14 bg-white/70 border-stone-200 focus:border-emerald-500"
              />
              <p className="text-sm text-stone-600">Didn't receive it? Check WhatsApp or SMS</p>
            </div>

            <Button
              type="submit"
              disabled={data.otp.length !== 6 || isLoading}
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify & Continue'
              )}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Complete Your Profile</h2>
          <p className="text-stone-600">Set up your display name and avatar (optional)</p>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-r from-emerald-100 to-stone-100 text-emerald-700 text-xl font-semibold">
                  {data.displayName.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-emerald-600 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-stone-600">Click to upload profile picture</p>
          </div>

          {/* Display Name */}
          <div className="space-y-3">
            <Label htmlFor="displayName" className="text-base font-semibold text-stone-800">
              Display Name
            </Label>
            <Input
              id="displayName"
              type="text"
              placeholder="How should others see your name?"
              value={data.displayName}
              onChange={(e) => updateData({ displayName: e.target.value })}
              className="h-12 bg-white/70 border-stone-200 focus:border-emerald-500"
            />
          </div>

          <div className="flex space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onAccepted()}
              className="flex-1 h-12 border-stone-200 text-stone-600 hover:bg-stone-50"
            >
              Skip for Now
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Setup
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteAcceptanceStep;
