
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Shield, 
  Package, 
  Truck, 
  MapPin, 
  DollarSign,
  Map,
  Eye,
  Calendar,
  Timer
} from 'lucide-react';

interface ShipmentStage {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
  eta?: string;
}

interface RealTimeShipmentTrackerProps {
  shipmentId?: string;
  className?: string;
}

const RealTimeShipmentTracker = ({ 
  shipmentId = 'SH-2024-0156',
  className 
}: RealTimeShipmentTrackerProps) => {
  const [showMapView, setShowMapView] = useState(false);
  const [activeStage, setActiveStage] = useState(3); // Currently at Escrow Funded stage

  const stages: ShipmentStage[] = [
    {
      id: 'quote-accepted',
      title: 'Quote Accepted',
      description: 'Buyer confirmed purchase order',
      icon: CheckCircle,
      status: 'completed',
      timestamp: '2024-12-28 14:30',
    },
    {
      id: 'invoice-raised',
      title: 'Invoice Raised',
      description: 'Commercial invoice generated',
      icon: FileText,
      status: 'completed',
      timestamp: '2024-12-29 09:15',
    },
    {
      id: 'escrow-funded',
      title: 'Escrow Funded',
      description: 'Payment secured in escrow',
      icon: Shield,
      status: 'current',
      timestamp: '2024-12-30 11:20',
    },
    {
      id: 'shipment',
      title: 'Shipment',
      description: 'Goods dispatched from origin',
      icon: Package,
      status: 'pending',
      eta: '2025-01-02',
    },
    {
      id: 'delivery',
      title: 'Delivery',
      description: 'Goods received at destination',
      icon: Truck,
      status: 'pending',
      eta: '2025-01-18',
    },
    {
      id: 'payout-released',
      title: 'Payout Released',
      description: 'Funds transferred to exporter',
      icon: DollarSign,
      status: 'pending',
      eta: '2025-01-20',
    }
  ];

  const progressPercentage = ((activeStage + 1) / stages.length) * 100;
  const currentStage = stages[activeStage];
  const nextStage = stages[activeStage + 1];

  const getStageStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          iconBg: 'bg-emerald-500 text-white shadow-lg',
          connector: 'bg-emerald-500',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200'
        };
      case 'current':
        return {
          iconBg: 'bg-blue-500 text-white shadow-xl animate-pulse-glow',
          connector: 'bg-gradient-to-r from-emerald-500 to-stone-300',
          badge: 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse'
        };
      default:
        return {
          iconBg: 'bg-stone-200 text-stone-500',
          connector: 'bg-stone-200',
          badge: 'bg-stone-100 text-stone-600 border-stone-200'
        };
    }
  };

  const formatTimeRemaining = (eta: string) => {
    const etaDate = new Date(eta);
    const now = new Date();
    const diffTime = etaDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `${diffDays} days remaining`;
    } else {
      return 'Overdue';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Card */}
      <Card className="bg-white/90 backdrop-blur-xl border border-stone-200/50 shadow-xl animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-stone-900">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Shipment Tracker
              </CardTitle>
              <p className="text-sm text-stone-600 mt-1">{shipmentId}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 animate-bounce-gentle">
                {currentStage.title}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMapView(!showMapView)}
                className="bg-white/80 hover:bg-white transition-all duration-200 hover:scale-105"
              >
                <Map className="w-4 h-4 mr-2" />
                {showMapView ? 'Timeline' : 'Map View'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress Overview */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-stone-700">Overall Progress</span>
              <span className="text-sm font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-stone-100 animate-scale-in" 
            />
          </div>

          {/* Current Status & ETA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 animate-slide-in-right">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Current Status</span>
              </div>
              <p className="text-blue-800">{currentStage.description}</p>
              {currentStage.timestamp && (
                <p className="text-xs text-blue-600 mt-1">
                  Updated: {currentStage.timestamp}
                </p>
              )}
            </div>

            {nextStage && (
              <div className="bg-amber-50 rounded-xl p-4 animate-slide-in-right" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3 mb-2">
                  <Timer className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-amber-900">Next Milestone</span>
                </div>
                <p className="text-amber-800">{nextStage.title}</p>
                {nextStage.eta && (
                  <p className="text-xs text-amber-600 mt-1">
                    ETA: {nextStage.eta} • {formatTimeRemaining(nextStage.eta)}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline/Map View */}
      <Card className="bg-white/90 backdrop-blur-xl border border-stone-200/50 shadow-xl">
        <CardContent className="p-6">
          {showMapView ? (
            /* Map Placeholder */
            <div className="h-80 bg-gradient-to-br from-blue-50 to-stone-50 rounded-xl border-2 border-dashed border-stone-200 flex items-center justify-center animate-fade-in">
              <div className="text-center space-y-3">
                <Map className="w-12 h-12 text-stone-400 mx-auto" />
                <div>
                  <p className="text-stone-600 font-medium">Interactive Map View</p>
                  <p className="text-sm text-stone-500">Real-time shipment location tracking</p>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Map
                </Button>
              </div>
            </div>
          ) : (
            /* Timeline View */
            <div className="relative animate-fade-in">
              {stages.map((stage, index) => {
                const styles = getStageStyles(stage.status);
                const isLast = index === stages.length - 1;
                const StageIcon = stage.icon;

                return (
                  <div 
                    key={stage.id} 
                    className="relative flex items-start space-x-4 pb-8 animate-slide-in-down"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Timeline Connector */}
                    {!isLast && (
                      <div 
                        className={`absolute left-6 top-12 w-0.5 h-16 transition-all duration-500 ${styles.connector}`}
                      />
                    )}

                    {/* Stage Icon */}
                    <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white transition-all duration-300 ${styles.iconBg}`}>
                      <StageIcon className="w-5 h-5" />
                    </div>

                    {/* Stage Content */}
                    <div className="flex-1 min-w-0 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-stone-900">{stage.title}</h3>
                          <p className="text-sm text-stone-600">{stage.description}</p>
                        </div>
                        <Badge className={`${styles.badge} transition-all duration-200 hover:scale-105`}>
                          {stage.status === 'completed' ? 'Complete' : 
                           stage.status === 'current' ? 'In Progress' : 'Pending'}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-stone-500">
                        {stage.timestamp && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Completed: {stage.timestamp}</span>
                          </div>
                        )}
                        {stage.eta && stage.status === 'pending' && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>ETA: {stage.eta}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeShipmentTracker;
