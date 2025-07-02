
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, ShoppingCart, Users, UserCheck, ArrowRight } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface WelcomeStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const WelcomeStep = ({ data, updateData, onNext }: WelcomeStepProps) => {
  const roles = [
    {
      id: 'exporter',
      title: 'Exporter / Factory',
      description: 'I manufacture or export granite, quartz, and natural stone products',
      icon: Building2,
      color: 'emerald',
      authMethod: 'email',
    },
    {
      id: 'buyer',
      title: 'Buyer / Importer',
      description: 'I purchase stone products for distribution or projects',
      icon: ShoppingCart,
      color: 'sage',
      authMethod: 'email',
    },
    {
      id: 'agent',
      title: "Buyer's Agent",
      description: 'I represent buyers and help them find the right suppliers',
      icon: UserCheck,
      color: 'stone',
      authMethod: 'mobile',
    },
    {
      id: 'trader',
      title: 'Independent Trader',
      description: 'I work individually or with small operations, partnering with exporters for international trade',
      icon: Users,
      color: 'stone',
      authMethod: 'mobile',
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    updateData({ role: roleId });
  };

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900">
          Welcome to <span className="text-gradient">TradeRails</span>
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Join the premium B2B platform for granite and quartz trade. Let's start by understanding your role in the industry.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-stone-800">What best describes you?</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role) => (
            <Card
              key={role.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                data.role === role.id
                  ? 'ring-2 ring-emerald-500 bg-emerald-50/50'
                  : 'hover:bg-stone-50/50'
              }`}
              onClick={() => handleRoleSelect(role.id)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  role.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                  role.color === 'sage' ? 'bg-sage-100 text-sage-600' :
                  'bg-stone-100 text-stone-600'
                }`}>
                  <role.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-2">{role.title}</h3>
                  <p className="text-sm text-stone-600 mb-2">{role.description}</p>
                  <p className="text-xs text-stone-500">
                    Auth: {role.authMethod === 'email' ? 'Email + MFA' : 'Mobile OTP'}
                  </p>
                </div>
                {data.role === role.id && (
                  <div className="text-emerald-600">
                    <div className="w-6 h-6 mx-auto bg-emerald-500 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <Button
          onClick={onNext}
          disabled={!data.role}
          size="lg"
          className="emerald-gradient text-white px-8 py-3 text-lg font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;
