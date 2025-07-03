
import React from 'react';
import RealTimeShipmentTracker from './RealTimeShipmentTracker';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ShipmentTrackerDemoProps {
  onBack?: () => void;
}

const ShipmentTrackerDemo = ({ onBack }: ShipmentTrackerDemoProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-stone-50 font-['Inter']">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-stone-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button variant="ghost" onClick={onBack} className="text-stone-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <div>
                <h1 className="text-xl font-bold text-stone-900">Real-Time Shipment Tracking</h1>
                <p className="text-sm text-stone-600">Monitor your trade from quote to payout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RealTimeShipmentTracker />
      </div>
    </div>
  );
};

export default ShipmentTrackerDemo;
