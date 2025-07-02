
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Ship, Calendar, ExternalLink } from 'lucide-react';

interface LogisticsInfoProps {
  shipmentData: {
    originPort: string;
    destinationPort: string;
    vesselName: string;
    trackingNumber: string;
    etd: string;
    eta: string;
  };
}

const LogisticsInfo = ({ shipmentData }: LogisticsInfoProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-stone-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-stone-900">
          <Ship className="w-5 h-5 mr-2 text-blue-600" />
          Port & Logistics Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Route */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div>
                <p className="font-semibold text-stone-900">Origin Port</p>
                <p className="text-sm text-stone-600">{shipmentData.originPort}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-stone-500">
              <Calendar className="w-4 h-4 mr-1" />
              ETD: {new Date(shipmentData.etd).toLocaleDateString()}
            </div>
          </div>

          {/* Route Line */}
          <div className="flex items-center ml-6">
            <div className="flex-1 border-t-2 border-dashed border-stone-300"></div>
            <Ship className="w-5 h-5 mx-4 text-blue-500" />
            <div className="flex-1 border-t-2 border-dashed border-stone-300"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-semibold text-stone-900">Destination Port</p>
                <p className="text-sm text-stone-600">{shipmentData.destinationPort}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-stone-500">
              <Calendar className="w-4 h-4 mr-1" />
              ETA: {new Date(shipmentData.eta).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Vessel Information */}
        <div className="bg-blue-50/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-stone-900">Vessel Name</p>
              <p className="text-sm text-stone-700">{shipmentData.vesselName}</p>
            </div>
            <div>
              <p className="font-semibold text-stone-900">Tracking Number</p>
              <p className="text-sm text-stone-700 font-mono">{shipmentData.trackingNumber}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Track on Maersk Line
          </Button>
        </div>

        {/* Current Status */}
        <div className="border-t border-stone-200 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-stone-600">Current Location:</span>
            </div>
            <span className="text-sm font-semibold text-stone-900">Red Sea Transit</span>
          </div>
          <div className="mt-2 text-xs text-stone-500">
            Last updated: 2 hours ago
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogisticsInfo;
