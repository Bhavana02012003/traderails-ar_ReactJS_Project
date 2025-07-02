
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { QuoteProvider } from './QuoteContext';
import BuyerSelectionStep from './steps/BuyerSelectionStep';
import SlabSelectionStep from './steps/SlabSelectionStep';
import PricingTermsStep from './steps/PricingTermsStep';
import FinanceOptionsStep from './steps/FinanceOptionsStep';
import ReviewSendStep from './steps/ReviewSendStep';
import QuoteSentConfirmation from './QuoteSentConfirmation';

interface QuoteCreationFlowProps {
  onClose?: () => void;
}

const QuoteCreationFlow = ({ onClose }: QuoteCreationFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { id: 1, title: 'Buyer Selection', component: BuyerSelectionStep },
    { id: 2, title: 'Slab Selection', component: SlabSelectionStep },
    { id: 3, title: 'Pricing & Terms', component: PricingTermsStep },
    { id: 4, title: 'Finance Options', component: FinanceOptionsStep },
    { id: 5, title: 'Review & Send', component: ReviewSendStep },
  ];

  const handleStepComplete = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setIsComplete(false);
    onClose?.();
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  if (isComplete) {
    return <QuoteSentConfirmation onCreateNew={() => {
      setCurrentStep(1);
      setIsComplete(false);
    }} onClose={handleClose} />;
  }

  return (
    <QuoteProvider>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 font-['Inter']">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Button 
                variant="ghost" 
                onClick={currentStep === 1 ? handleClose : handleStepBack}
                className="text-stone-600 hover:text-stone-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 1 ? 'Close' : 'Back'}
              </Button>
              <h1 className="text-3xl font-bold text-stone-900">Create Quote</h1>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step.id < currentStep 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : step.id === currentStep
                        ? 'bg-white border-emerald-500 text-emerald-500'
                        : 'bg-stone-100 border-stone-300 text-stone-400'
                    }`}>
                      {step.id < currentStep ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        step.id <= currentStep ? 'text-stone-900' : 'text-stone-500'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      step.id < currentStep ? 'bg-emerald-500' : 'bg-stone-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              {CurrentStepComponent && (
                <CurrentStepComponent 
                  onNext={handleStepComplete}
                  onBack={handleStepBack}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </QuoteProvider>
  );
};

export default QuoteCreationFlow;
