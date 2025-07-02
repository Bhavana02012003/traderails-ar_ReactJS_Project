
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, MessageCircle, MapPin, Calendar, Ship } from 'lucide-react';

interface ShipmentOverviewCardProps {
  shipmentData: {
    containerId: string;
    status: string;
    exporter: string;
    buyer: string;
    shippingLine: string;
    etd: string;
    eta: string;
    vesselName: string;
    currentLocation: string;
    progressPercentage: number;
  };
  userRole: string;
}

const ShipmentOverviewCard = ({ shipmentData, userRole }: ShipmentOverviewCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-white via-white to-blue-50/30 border border-stone-200/50 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-stone-900 mb-2">
              {shipmentData.containerId}
            </CardTitle>
            <div className="flex items-center space-x-4 text-sm text-stone-600">
              <div className="flex items-center">
                <Ship className="w-4 h-4 mr-1" />
                {shipmentData.shippingLine}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {shipmentData.currentLocation}
              </div>
            </div>
          </div>
          <Badge 
            className={`text-lg px-4 py-2 ${
              shipmentData.status === 'In Transit' 
                ? 'bg-blue-100 text-blue-800 border-blue-200'
                : shipmentData.status === 'Delivered'
                ? 'bg-green-100 text-green-800 border-green-200'
                : 'bg-yellow-100 text-yellow-800 border-yellow-200'
            }`}
          >
            {shipmentData.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-stone-600">Shipment Progress</span>
            <span className="font-semibold text-stone-900">{shipmentData.progressPercentage}%</span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${shipmentData.progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Key Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-stone-700">Exporter</p>
            <p className="text-sm text-stone-900 font-semibold">{shipmentData.exporter}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-stone-700">Buyer</p>
            <p className="text-sm text-stone-900 font-semibold">{shipmentData.buyer}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-stone-700">Vessel</p>
            <p className="text-sm text-stone-900 font-semibold">{shipmentData.vesselName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-stone-700">ETA</p>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-stone-500" />
              <p className="text-sm text-stone-900 font-semibold">
                {new Date(shipmentData.eta).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-stone-200">
          <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          {userRole === 'agent' && (
            <Button variant="outline" className="border-stone-300">
              Track External
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentOverviewCard;
