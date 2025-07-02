
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, LayoutDashboard, UserPlus } from 'lucide-react';
import { InviteData } from '../InviteUserFlow';

interface InviteSuccessStepProps {
  data: InviteData;
  onCreateAnother: () => void;
  onGoToDashboard: () => void;
}

const InviteSuccessStep = ({ data, onCreateAnother, onGoToDashboard }: InviteSuccessStepProps) => {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-scale-in">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Welcome to {data.orgName}!</h2>
            <p className="text-stone-600 text-lg">Your account has been successfully created</p>
          </div>
        </div>

        {/* Success Details */}
        <div className="bg-gradient-to-r from-emerald-50 to-stone-50 rounded-2xl p-8 mb-8 border border-emerald-100">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-stone-900 font-semibold">You're now part of the team!</p>
                <p className="text-stone-600 text-sm">Access granted to TradeRails platform</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/70 rounded-lg p-4 border border-stone-200">
                <h4 className="font-semibold text-stone-800 mb-1">Organization</h4>
                <p className="text-stone-600 text-sm">{data.orgName}</p>
              </div>
              <div className="bg-white/70 rounded-lg p-4 border border-stone-200">
                <h4 className="font-semibold text-stone-800 mb-1">Your Role</h4>
                <p className="text-stone-600 text-sm">{data.role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-stone-900 mb-4">What's Next?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/50 rounded-xl p-6 border border-stone-200 hover:shadow-md transition-shadow">
              <LayoutDashboard className="w-8 h-8 text-emerald-600 mb-3 mx-auto" />
              <h4 className="font-semibold text-stone-800 mb-2">Explore Dashboard</h4>
              <p className="text-stone-600 text-sm">Access your personalized workspace and start managing operations</p>
            </div>
            
            <div className="bg-white/50 rounded-xl p-6 border border-stone-200 hover:shadow-md transition-shadow">
              <UserPlus className="w-8 h-8 text-emerald-600 mb-3 mx-auto" />
              <h4 className="font-semibold text-stone-800 mb-2">Invite More Team</h4>
              <p className="text-stone-600 text-sm">Help grow your organization by inviting additional team members</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={onGoToDashboard}
              className="flex-1 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Go to Dashboard
            </Button>
            
            <Button
              onClick={onCreateAnother}
              variant="outline"
              className="flex-1 h-14 border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-semibold text-lg"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Invite Another Member
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-stone-200">
          <p className="text-stone-500 text-sm">
            Need help getting started? Check out our{' '}
            <a href="#" className="text-emerald-600 hover:text-emerald-700 underline">
              Getting Started Guide
            </a>{' '}
            or contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InviteSuccessStep;
