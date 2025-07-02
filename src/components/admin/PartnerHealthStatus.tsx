
import { CheckCircle, AlertCircle, XCircle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PartnerHealthStatus = () => {
  const partners = [
    {
      name: 'WiseFX',
      type: 'FX Partner',
      status: 'Healthy',
      uptime: '99.9%',
      latency: '45ms',
      lastCheck: '2 mins ago',
      issues: 0
    },
    {
      name: 'YesBank Escrow',
      type: 'Escrow Provider',
      status: 'Healthy',
      uptime: '99.7%',
      latency: '120ms',
      lastCheck: '1 min ago',
      issues: 0
    },
    {
      name: 'CreditInsure API',
      type: 'Insurance Partner',
      status: 'Warning',
      uptime: '97.2%',
      latency: '340ms',
      lastCheck: '5 mins ago',
      issues: 2
    },
    {
      name: 'ShipTrack Global',
      type: 'Logistics Partner',
      status: 'Down',
      uptime: '85.1%',
      latency: 'Timeout',
      lastCheck: '15 mins ago',
      issues: 5
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Healthy': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'Down': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Down': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Partner Health Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {partners.map((partner, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(partner.status)}
                  <h4 className="font-medium text-slate-900">{partner.name}</h4>
                </div>
                <Badge className={getStatusColor(partner.status)}>
                  {partner.status}
                </Badge>
              </div>
              
              <p className="text-sm text-slate-600 mb-3">{partner.type}</p>
              
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span className="font-medium">{partner.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency:</span>
                  <span className="font-medium">{partner.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Issues:</span>
                  <span className={`font-medium ${partner.issues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {partner.issues}
                  </span>
                </div>
                <div className="text-slate-400 mt-2">
                  Last check: {partner.lastCheck}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerHealthStatus;
