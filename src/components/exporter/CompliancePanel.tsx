
import { Shield, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CompliancePanel = () => {
  const complianceItems = [
    {
      name: 'KYC Verification',
      status: 'verified',
      icon: CheckCircle,
      action: null
    },
    {
      name: 'IEC Certificate',
      status: 'verified',
      icon: CheckCircle,
      action: null
    },
    {
      name: 'Bank Details',
      status: 'verified',
      icon: CheckCircle,
      action: null
    },
    {
      name: 'FX Hedge Partner',
      status: 'active',
      icon: RefreshCw,
      action: 'WiseFX (change)',
      partner: 'WiseFX'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-emerald-600';
      case 'active': return 'text-blue-600';
      case 'pending': return 'text-amber-600';
      default: return 'text-stone-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'active': return CheckCircle;
      case 'pending': return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <Card className="glass-panel border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {complianceItems.map((item, index) => {
          const StatusIcon = getStatusIcon(item.status);
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
              <div className="flex items-center gap-3">
                <StatusIcon className={`w-5 h-5 ${getStatusColor(item.status)}`} />
                <div>
                  <div className="font-medium text-stone-900">{item.name}</div>
                  {item.partner && (
                    <div className="text-sm text-stone-600">Partner: {item.partner}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.status === 'verified' && (
                  <Badge className="bg-emerald-100 text-emerald-800">
                    ✅ Verified
                  </Badge>
                )}
                {item.action && (
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    {item.action}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CompliancePanel;
