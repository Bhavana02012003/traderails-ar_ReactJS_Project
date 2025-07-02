
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Shield, Users, Zap, Award } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface FinalizeStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const FinalizeStep = ({ data }: FinalizeStepProps) => {
  const handleFinish = () => {
    // In a real app, this would redirect to the dashboard
    console.log('Onboarding completed with data:', data);
    // Redirect to dashboard or pending approval page
    window.location.href = '/dashboard';
  };

  const benefits = [
    {
      icon: Shield,
      title: 'Secure Escrow',
      description: 'All transactions protected with insurance coverage',
      color: 'emerald',
    },
    {
      icon: Users,
      title: 'Verified Network',
      description: 'Connect with pre-verified suppliers and buyers',
      color: 'sage',
    },
    {
      icon: Zap,
      title: 'Instant Trading',
      description: 'Start trading immediately with our streamlined process',
      color: 'stone',
    },
    {
      icon: Award,
      title: 'Premium Support',
      description: '24/7 dedicated support for all your trading needs',
      color: 'emerald',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-center">
      {/* Success Animation */}
      <div className="space-y-6">
        <div className="w-20 h-20 mx-auto bg-emerald-500 rounded-full flex items-center justify-center animate-scale-in">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900">
            Welcome to <span className="text-gradient">TradeRails</span>! 🎉
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Congratulations! Your organization profile has been created successfully. 
            You're now part of the premium B2B network for granite and quartz trade.
          </p>
        </div>
      </div>

      {/* Organization Summary */}
      <Card className="glass-panel border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="text-left space-y-4">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Organization Overview</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-stone-600">Organization:</span>
                <p className="font-medium text-stone-900">{data.orgName}</p>
              </div>
              <div>
                <span className="text-stone-600">Type:</span>
                <p className="font-medium text-stone-900 capitalize">{data.orgType}</p>
              </div>
              <div>
                <span className="text-stone-600">Contact:</span>
                <p className="font-medium text-stone-900">{data.contactEmail}</p>
              </div>
              <div>
                <span className="text-stone-600">Bank Accounts:</span>
                <p className="font-medium text-stone-900">{data.bankAccounts.length} added</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-stone-900">What's Next?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-left hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    benefit.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    benefit.color === 'sage' ? 'bg-sage-100 text-sage-600' :
                    'bg-stone-100 text-stone-600'
                  }`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-stone-600">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Status Information */}
      <Card className="border-2 border-emerald-200 bg-emerald-50/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-emerald-800">Account Under Review</h3>
          </div>
          <p className="text-sm text-emerald-700 mb-4">
            Our compliance team is reviewing your KYC documents. This typically takes 1-2 business days. 
            You'll receive an email notification once your account is fully verified.
          </p>
          <p className="text-xs text-emerald-600">
            In the meantime, you can explore the marketplace and start connecting with potential trading partners.
          </p>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="pt-8">
        <Button
          onClick={handleFinish}
          size="lg"
          className="emerald-gradient text-white px-12 py-4 text-lg font-semibold hover:scale-105 transition-all shadow-lg"
        >
          Start Exploring TradeRails
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-sm text-stone-500 mt-4">
          You can always update your profile information from your dashboard
        </p>
      </div>
    </div>
  );
};

export default FinalizeStep;
