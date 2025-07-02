
import { AlertTriangle, RefreshCw, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ComplianceAlerts = () => {
  const alerts = [
    {
      id: 'COMP-001',
      type: 'GSTIN Compliance',
      message: 'Stone Craft Co. GSTIN verification failed - Invalid registration number',
      severity: 'High',
      org: 'Stone Craft Co.',
      timestamp: '2024-01-15 14:30'
    },
    {
      id: 'COMP-002',
      type: 'IEC Certificate',
      message: 'Marble Masters Ltd. IEC certificate expired on 2024-01-10',
      severity: 'Critical',
      org: 'Marble Masters Ltd.',
      timestamp: '2024-01-15 12:15'
    },
    {
      id: 'COMP-003',
      type: 'FX Limit',
      message: 'Granite Solutions Inc. approaching monthly FX trading limit (85% used)',
      severity: 'Medium',
      org: 'Granite Solutions Inc.',
      timestamp: '2024-01-15 10:45'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-slate-900">
          <Shield className="w-5 h-5" />
          <span>Compliance Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Shield className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>No compliance alerts at the moment</p>
            <p className="text-sm">All systems are compliant</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-slate-900">{alert.type}</h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">{alert.message}</p>
                      <div className="text-xs text-slate-500">
                        {alert.org} • {alert.timestamp}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="flex-shrink-0">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Retry
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceAlerts;
