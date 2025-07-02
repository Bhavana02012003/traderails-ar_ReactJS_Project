
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, X } from 'lucide-react';
import WelcomeStep from './steps/WelcomeStep';
import ContactInfoStep from './steps/ContactInfoStep';
import OrganizationProfileStep from './steps/OrganizationProfileStep';
import OrganizationDetailsStep from './steps/OrganizationDetailsStep';
import BankAccountStep from './steps/BankAccountStep';
import FinalizeStep from './steps/FinalizeStep';

export interface OnboardingData {
  role: string;
  email: string;
  password: string;
  mfaOtp: string;
  phone: string;
  otp: string;
  inviteCode: string;
  orgName: string;
  orgType: string;
  contactEmail: string;
  contactPhone: string;
  logo: File | null;
  termsAccepted: boolean;
  legalName: string;
  country: string;
  address: string;
  taxId: string;
  incorporationDate: string;
  bankAccounts: Array<{
    bankName: string;
    accountNumber: string;
    ifscSwift: string;
  }>;
}

interface OnboardingWizardProps {
  onCancel?: () => void;
}

const OnboardingWizard = ({ onCancel }: OnboardingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    role: '',
    email: '',
    password: '',
    mfaOtp: '',
    phone: '',
    otp: '',
    inviteCode: '',
    orgName: '',
    orgType: '',
    contactEmail: '',
    contactPhone: '',
    logo: null,
    termsAccepted: false,
    legalName: '',
    country: '',
    address: '',
    taxId: '',
    incorporationDate: '',
    bankAccounts: [],
  });

  const steps = [
    { title: 'Welcome', component: WelcomeStep },
    { title: 'Contact Info', component: ContactInfoStep },
    { title: 'Organization Profile', component: OrganizationProfileStep },
    { title: 'Organization Details', component: OrganizationDetailsStep },
    { title: 'Bank Account', component: BankAccountStep },
    { title: 'Finalize', component: FinalizeStep },
  ];

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getCurrentStepComponent = () => {
    const StepComponent = steps[currentStep].component;
    return (
      <StepComponent
        data={data}
        updateData={updateData}
        onNext={nextStep}
        onPrev={prevStep}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === steps.length - 1}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-emerald-50/30 to-sage-50/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-sage-500/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-stone-400/3 rounded-full blur-3xl"></div>
      </div>

      {/* Cancel Button */}
      {onCancel && (
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-stone-600 hover:text-stone-900"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  index < currentStep 
                    ? 'bg-emerald-500 text-white' 
                    : index === currentStep 
                    ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-500' 
                    : 'bg-stone-200 text-stone-500'
                }`}>
                  {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 transition-colors duration-300 ${
                    index < currentStep ? 'bg-emerald-500' : 'bg-stone-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-stone-600 font-medium">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-panel border-0 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="animate-fade-in">
                {getCurrentStepComponent()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
