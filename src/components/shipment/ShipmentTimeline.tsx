
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  Package, 
  Truck, 
  Ship, 
  MapPin, 
  Eye,
  FileText 
} from 'lucide-react';

interface ShipmentTimelineProps {
  shipmentData: {
    containerId: string;
    status: string;
  };
}

const ShipmentTimeline = ({ shipmentData }: ShipmentTimelineProps) => {
  const timelineSteps = [
    {
      id: 1,
      title: 'Slab Packed',
      description: 'Quality inspection completed',
      timestamp: '2024-12-10 14:30',
      responsible: 'Factory QC Team',
      status: 'completed',
      icon: Package,
      hasAttachment: true,
      comments: 'All 24 slabs packed securely with protective foam'
    },
    {
      id: 2,
      title: 'Factory Inspection',
      description: 'Third-party inspection passed',
      timestamp: '2024-12-12 09:15',
      responsible: 'SGS Inspector',
      status: 'completed',
      icon: Eye,
      hasAttachment: true,
      comments: 'Grade A certification issued'
    },
    {
      id: 3,
      title: 'Dispatched to Port',
      description: 'Container loaded on truck',
      timestamp: '2024-12-14 16:20',
      responsible: 'Logistics Partner',
      status: 'completed',
      icon: Truck,
      hasAttachment: false,
      comments: 'Transit time: 8 hours to JNPT'
    },
    {
      id: 4,
      title: 'Loaded on Vessel',
      description: 'Container secured on MSC Isabella',
      timestamp: '2024-12-15 11:45',
      responsible: 'Port Authority',
      status: 'completed',
      icon: Ship,
      hasAttachment: true,
      comments: 'Departure confirmed'
    },
    {
      id: 5,
      title: 'In Transit',
      description: 'Crossing Red Sea',
      timestamp: '2024-12-28 08:00',
      responsible: 'Shipping Line',
      status: 'current',
      icon: MapPin,
      hasAttachment: false,
      comments: 'Next update: Suez Canal'
    },
    {
      id: 6,
      title: 'Customs Clearance',
      description: 'US Customs processing',
      timestamp: '2025-01-16 TBD',
      responsible: 'Customs Broker',
      status: 'pending',
      icon: FileText,
      hasAttachment: false,
      comments: 'Documentation ready'
    },
    {
      id: 7,
      title: 'Delivered',
      description: 'Final delivery to buyer',
      timestamp: '2025-01-18 TBD',
      responsible: 'Local Carrier',
      status: 'pending',
      icon: CheckCircle,
      hasAttachment: false,
      comments: 'Scheduled delivery window'
    }
  ];

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          iconBg: 'bg-emerald-500 text-white',
          connector: 'bg-emerald-500',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200'
        };
      case 'current':
        return {
          iconBg: 'bg-blue-500 text-white animate-pulse',
          connector: 'bg-gradient-to-b from-emerald-500 to-stone-300',
          badge: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      default:
        return {
          iconBg: 'bg-stone-300 text-stone-600',
          connector: 'bg-stone-300',
          badge: 'bg-stone-100 text-stone-600 border-stone-200'
        };
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-stone-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-stone-900">
          <Ship className="w-5 h-5 mr-2 text-blue-600" />
          Shipment Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {timelineSteps.map((step, index) => {
            const styles = getStepStyles(step.status);
            const isLast = index === timelineSteps.length - 1;

            return (
              <div key={step.id} className="relative flex items-start space-x-4 pb-8">
                {/* Timeline Line */}
                {!isLast && (
                  <div 
                    className={`absolute left-6 top-12 w-0.5 h-16 ${styles.connector}`}
                  />
                )}

                {/* Icon */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white shadow-md ${styles.iconBg}`}>
                  <step.icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900">{step.title}</h3>
                      <p className="text-sm text-stone-600">{step.description}</p>
                    </div>
                    <Badge className={styles.badge}>
                      {step.status === 'completed' ? 'Complete' : 
                       step.status === 'current' ? 'In Progress' : 'Pending'}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-500">
                        {step.status === 'pending' ? 'Expected' : 'Completed'}: {step.timestamp}
                      </span>
                      <span className="text-stone-600 font-medium">{step.responsible}</span>
                    </div>
                    
                    {step.comments && (
                      <p className="text-sm text-stone-700 bg-stone-50 rounded-lg p-3">
                        {step.comments}
                      </p>
                    )}

                    {step.hasAttachment && step.status === 'completed' && (
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                        <Eye className="w-4 h-4 mr-2" />
                        View Attachment
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentTimeline;
