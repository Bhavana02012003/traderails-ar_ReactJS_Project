
import { AlertTriangle, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DisputePanel = () => {
  const activeDisputes = [
    {
      id: 'DSP-001',
      type: 'Quality Issue',
      parties: 'Stone Craft Co. vs Marble Masters Ltd.',
      amount: '$45,000',
      priority: 'High',
      age: '3 days',
      status: 'Under Review'
    },
    {
      id: 'DSP-002',
      type: 'Shipping Delay',
      parties: 'Granite World vs Premium Stone Inc.',
      amount: '$28,500',
      priority: 'Medium',
      age: '1 day',
      status: 'Awaiting Response'
    },
    {
      id: 'DSP-003',
      type: 'Payment Issue',
      parties: 'Stone Plus vs Marble Export Co.',
      amount: '$67,200',
      priority: 'Critical',
      age: '5 days',
      status: 'Escalated'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Awaiting Response': return 'bg-yellow-100 text-yellow-800';
      case 'Escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Active Disputes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeDisputes.map((dispute) => (
            <div key={dispute.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <h4 className="font-medium text-slate-900">{dispute.type}</h4>
                    <Badge className={getPriorityColor(dispute.priority)}>
                      {dispute.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{dispute.parties}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <div className="flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {dispute.amount}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {dispute.age}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(dispute.status)}>
                  {dispute.status}
                </Badge>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Resolve Dispute
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DisputePanel;
