
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const KYCReviewQueue = () => {
  const kycQueue = [
    {
      id: 'KYC-001',
      orgName: 'Marble Masters Ltd.',
      type: 'Exporter',
      status: 'Pending Review',
      submittedDate: '2024-01-15',
      priority: 'high'
    },
    {
      id: 'KYC-002',
      orgName: 'Granite Solutions Inc.',
      type: 'Buyer',
      status: 'Documents Missing',
      submittedDate: '2024-01-14',
      priority: 'medium'
    },
    {
      id: 'KYC-003',
      orgName: 'Stone Craft Co.',
      type: 'Exporter',
      status: 'Under Review',
      submittedDate: '2024-01-13',
      priority: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Documents Missing': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">KYC Review Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {kycQueue.map((item) => (
            <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-slate-900">{item.orgName}</h4>
                  <p className="text-sm text-slate-600">{item.type} • {item.submittedDate}</p>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verify
                </Button>
                <Button size="sm" variant="destructive">
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  View Docs
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KYCReviewQueue;
