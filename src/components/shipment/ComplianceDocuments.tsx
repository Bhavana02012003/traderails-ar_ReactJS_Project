
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Eye, 
  Shield, 
  CheckCircle, 
  Clock,
  AlertCircle 
} from 'lucide-react';

interface ComplianceDocumentsProps {
  shipmentId: string;
  userRole: string;
}

const ComplianceDocuments = ({ shipmentId, userRole }: ComplianceDocumentsProps) => {
  const documents = [
    {
      id: 1,
      name: 'Commercial Invoice',
      type: 'Invoice',
      status: 'available',
      uploadDate: '2024-12-10',
      size: '2.4 MB',
      access: ['buyer', 'agent', 'trader', 'exporter'],
      icon: FileText
    },
    {
      id: 2,
      name: 'Quality Inspection Report',
      type: 'Inspection',
      status: 'available',
      uploadDate: '2024-12-12',
      size: '8.7 MB',
      access: ['buyer', 'agent', 'trader'],
      icon: Shield
    },
    {
      id: 3,
      name: 'Bill of Lading (B/L)',
      type: 'Shipping',
      status: 'available',
      uploadDate: '2024-12-15',
      size: '1.2 MB',
      access: ['buyer', 'agent', 'trader', 'exporter'],
      icon: FileText
    },
    {
      id: 4,
      name: 'Insurance Certificate',
      type: 'Insurance',
      status: 'available',
      uploadDate: '2024-12-14',
      size: '892 KB',
      access: ['buyer', 'agent'],
      icon: Shield
    },
    {
      id: 5,
      name: 'FX Hedge Confirmation',
      type: 'Finance',
      status: 'available',
      uploadDate: '2024-12-11',
      size: '645 KB',
      access: ['buyer', 'trader'],
      icon: FileText
    },
    {
      id: 6,
      name: 'US Customs Declaration',
      type: 'Customs',
      status: 'pending',
      uploadDate: null,
      size: null,
      access: ['buyer', 'agent'],
      icon: FileText
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Available</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Expired</Badge>;
      default:
        return <Badge className="bg-stone-100 text-stone-800 border-stone-200">Unknown</Badge>;
    }
  };

  const hasAccess = (docAccess: string[]) => {
    return docAccess.includes(userRole);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-stone-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-stone-900">
          <FileText className="w-5 h-5 mr-2 text-emerald-600" />
          Compliance & Documents
        </CardTitle>
        <p className="text-sm text-stone-600">
          Role-based document access for {userRole}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="border border-stone-200 rounded-lg p-4 hover:bg-stone-50/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <h3 className="font-semibold text-stone-900">{doc.name}</h3>
                    <p className="text-sm text-stone-600">{doc.type}</p>
                  </div>
                </div>
                {getStatusBadge(doc.status)}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-stone-500">
                  {doc.uploadDate && (
                    <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                  )}
                  {doc.size && (
                    <span className="ml-4">Size: {doc.size}</span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {hasAccess(doc.access) && doc.status === 'available' ? (
                    <>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-50">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </>
                  ) : !hasAccess(doc.access) ? (
                    <Badge variant="outline" className="text-stone-500 border-stone-300">
                      No Access
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                      Not Ready
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-stone-200">
          <div className="flex gap-3">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
            {(userRole === 'buyer' || userRole === 'agent') && (
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                Request Document
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceDocuments;
