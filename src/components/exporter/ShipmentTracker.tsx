
import { Truck, Package, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ShipmentTrackerProps {
  detailed?: boolean;
}

const ShipmentTracker = ({ detailed = false }: ShipmentTrackerProps) => {
  const shipments = [
    {
      id: 'SH-001',
      buyer: 'Stone Imports LLC',
      port: 'New York',
      status: 'In Transit',
      progress: 75,
      stages: [
        { name: 'Slab Booked', completed: true },
        { name: 'Container Ready', completed: true },
        { name: 'Dispatched', completed: true },
        { name: 'Delivered', completed: false }
      ],
      escrowStatus: 'Pending Release',
      buyerApproval: 'Approved'
    },
    {
      id: 'SH-002',
      buyer: 'European Stone Co.',
      port: 'Hamburg',
      status: 'Container Ready',
      progress: 50,
      stages: [
        { name: 'Slab Booked', completed: true },
        { name: 'Container Ready', completed: true },
        { name: 'Dispatched', completed: false },
        { name: 'Delivered', completed: false }
      ],
      escrowStatus: 'Secured',
      buyerApproval: 'Pending'
    }
  ];

  return (
    <Card className="glass-panel border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-emerald-600" />
          Shipment Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {shipments.map((shipment) => (
          <div key={shipment.id} className="space-y-4 p-4 bg-white/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-stone-900">{shipment.buyer}</h4>
                <p className="text-sm text-stone-600">To: {shipment.port} • {shipment.id}</p>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                {shipment.status}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Progress</span>
                <span className="font-medium">{shipment.progress}%</span>
              </div>
              <Progress value={shipment.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {shipment.stages.map((stage, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    stage.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-stone-100 text-stone-400'
                  }`}>
                    {stage.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <span className="text-xs text-stone-600">{stage.name}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-sm pt-2 border-t border-stone-200">
              <div>
                <span className="text-stone-500">Escrow:</span>
                <span className={`ml-1 font-medium ${
                  shipment.escrowStatus === 'Secured' ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {shipment.escrowStatus}
                </span>
              </div>
              <div>
                <span className="text-stone-500">Buyer:</span>
                <span className={`ml-1 font-medium ${
                  shipment.buyerApproval === 'Approved' ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {shipment.buyerApproval}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ShipmentTracker;
