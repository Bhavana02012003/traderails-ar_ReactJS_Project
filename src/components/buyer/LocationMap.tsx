
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Anchor } from 'lucide-react';

const LocationMap = () => {
  const deliveryPorts = [
    {
      name: 'Port of Los Angeles',
      city: 'Los Angeles, CA',
      status: 'Primary',
      expectedSlabs: 42,
      nextDelivery: 'Dec 15, 2024'
    },
    {
      name: 'Port of Long Beach',
      city: 'Long Beach, CA',
      status: 'Secondary',
      expectedSlabs: 18,
      nextDelivery: 'Jan 8, 2025'
    },
    {
      name: 'Port of Seattle',
      city: 'Seattle, WA',
      status: 'Backup',
      expectedSlabs: 6,
      nextDelivery: 'Jan 20, 2025'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Primary': return 'bg-emerald-100 text-emerald-800';
      case 'Secondary': return 'bg-blue-100 text-blue-800';
      case 'Backup': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-stone-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-stone-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          Delivery Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Visualization (Placeholder) */}
        <div className="h-48 bg-stone-100 rounded-lg flex items-center justify-center border border-stone-200">
          <div className="text-center text-stone-500">
            <MapPin className="w-12 h-12 mx-auto mb-2 text-stone-400" />
            <p className="text-sm">Interactive map view</p>
            <p className="text-xs">Showing delivery ports and expected shipments</p>
          </div>
        </div>
        
        {/* Port Details */}
        <div className="space-y-3">
          {deliveryPorts.map((port, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-stone-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Anchor className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">{port.name}</h4>
                  <p className="text-sm text-stone-600">{port.city}</p>
                  <p className="text-xs text-stone-500">Next delivery: {port.nextDelivery}</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <Badge className={getStatusColor(port.status)}>
                  {port.status}
                </Badge>
                <p className="text-sm font-medium text-stone-900">{port.expectedSlabs} slabs</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationMap;
