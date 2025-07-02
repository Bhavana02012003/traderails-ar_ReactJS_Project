
import React, { useState } from 'react';
import { ArrowLeft, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import InviteFormStep from './steps/InviteFormStep';
import InviteAcceptanceStep from './steps/InviteAcceptanceStep';
import InviteSuccessStep from './steps/InviteSuccessStep';
import PendingInvitesPanel from './PendingInvitesPanel';

export interface InviteData {
  role: string;
  phoneNumber: string;
  email: string;
  notes: string;
  orgName: string;
  inviterName: string;
  otp: string;
  displayName: string;
  avatar: File | null;
}

interface InviteUserFlowProps {
  onBack: () => void;
}

const InviteUserFlow = ({ onBack }: InviteUserFlowProps) => {
  const [currentStep, setCurrentStep] = useState<'form' | 'acceptance' | 'success' | 'pending'>('form');
  const [data, setData] = useState<InviteData>({
    role: '',
    phoneNumber: '',
    email: '',
    notes: '',
    orgName: 'Stone Craft Co.',
    inviterName: 'Sarah Chen',
    otp: '',
    displayName: '',
    avatar: null,
  });

  const updateData = (newData: Partial<InviteData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const handleInviteSent = () => {
    setCurrentStep('acceptance');
  };

  const handleInviteAccepted = () => {
    setCurrentStep('success');
  };

  const showPendingInvites = () => {
    setCurrentStep('pending');
  };

  const backToForm = () => {
    setCurrentStep('form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-emerald-50/30 to-stone-100/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-stone-500/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-900">TradeRails</h1>
                <p className="text-stone-600 text-sm">Team Management</p>
              </div>
            </div>
          </div>

          {currentStep === 'form' && (
            <Button 
              variant="outline" 
              onClick={showPendingInvites}
              className="border-stone-200 text-stone-600 hover:bg-stone-50"
            >
              <Users className="w-4 h-4 mr-2" />
              Pending Invites
            </Button>
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-panel border-0 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="animate-fade-in">
                {currentStep === 'form' && (
                  <InviteFormStep
                    data={data}
                    updateData={updateData}
                    onInviteSent={handleInviteSent}
                  />
                )}
                
                {currentStep === 'acceptance' && (
                  <InviteAcceptanceStep
                    data={data}
                    updateData={updateData}
                    onAccepted={handleInviteAccepted}
                    onBack={backToForm}
                  />
                )}
                
                {currentStep === 'success' && (
                  <InviteSuccessStep
                    data={data}
                    onCreateAnother={backToForm}
                    onGoToDashboard={onBack}
                  />
                )}
                
                {currentStep === 'pending' && (
                  <PendingInvitesPanel
                    onBack={backToForm}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InviteUserFlow;
