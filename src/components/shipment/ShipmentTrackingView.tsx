
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import ShipmentOverviewCard from './ShipmentOverviewCard';
import ShipmentTimeline from './ShipmentTimeline';
import SlabDetailsGrid from './SlabDetailsGrid';
import LogisticsInfo from './LogisticsInfo';
import ComplianceDocuments from './ComplianceDocuments';

interface ShipmentTrackingViewProps {
  shipmentId?: string;
  userRole?: 'buyer' | 'agent' | 'trader' | 'exporter';
  onBack?: () => void;
}

const ShipmentTrackingView = ({ 
  shipmentId = 'CNT-0983',
  userRole = 'buyer',
  onBack 
}: ShipmentTrackingViewProps) => {
  const [showDispute, setShowDispute] = useState(false);

  // Mock shipment data
  const shipmentData = {
    containerId: 'CNT-0983',
    status: 'In Transit',
    exporter: 'Shivani Granites',
    buyer: 'Rohan Imports (NY, USA)',
    shippingLine: 'Maersk Line',
    etd: '2024-12-15',
    eta: '2025-01-18',
    vesselName: 'MSC Isabella',
    originPort: 'INNSA - Mumbai (Nhava Sheva)',
    destinationPort: 'USNYC - New York',
    trackingNumber: 'MSKU4569871',
    currentLocation: 'Red Sea',
    progressPercentage: 65
  };

  const handleReportIssue = () => {
    setShowDispute(true);
    console.log('Opening dispute flow for shipment:', shipmentId);
  };

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
                <h1 className="text-xl font-bold text-stone-900">Shipment Tracking</h1>
                <p className="text-sm text-stone-600">{shipmentData.containerId}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge 
                className={`${
                  shipmentData.status === 'In Transit' 
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : shipmentData.status === 'Delivered'
                    ? 'bg-green-100 text-green-800 border-green-200'
                    : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                }`}
              >
                {shipmentData.status}
              </Badge>
              
              {(userRole === 'buyer' || userRole === 'agent') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReportIssue}
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Shipment Overview */}
          <ShipmentOverviewCard shipmentData={shipmentData} userRole={userRole} />

          {/* Timeline */}
          <ShipmentTimeline shipmentData={shipmentData} />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <SlabDetailsGrid containerId={shipmentData.containerId} />
              <LogisticsInfo shipmentData={shipmentData} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <ComplianceDocuments 
                shipmentId={shipmentId} 
                userRole={userRole}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTrackingView;
