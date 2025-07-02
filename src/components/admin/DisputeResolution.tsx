
import { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Paperclip,
  User,
  Building2,
  Camera,
  Send,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DisputeResolutionProps {
  disputeId: string;
  onBack: () => void;
}

const DisputeResolution = ({ disputeId, onBack }: DisputeResolutionProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Mock dispute data
  const dispute = {
    id: 'DSP-001',
    status: 'Escalated',
    filedBy: 'Buyer',
    filedAt: '2024-01-15T10:30:00Z',
    buyer: {
      name: 'Stone Craft Co.',
      contact: 'john@stonecraft.com',
      agent: 'Sarah Johnson'
    },
    exporter: {
      name: 'Marble Masters Ltd.',
      contact: 'exports@marblemasters.in',
      location: 'Rajasthan, India'
    },
    slab: {
      id: 'SLB-2024-001',
      name: 'Premium Granite Slab',
      image: '/placeholder.svg',
      grade: 'A+',
      aiScore: 92,
      discrepancy: 'Slab chipped on arrival - multiple chips on edges'
    },
    amount: '$45,000',
    escrowId: 'ESC-789123'
  };

  const timeline = [
    { 
      event: 'Invoice Created', 
      date: '2024-01-10', 
      time: '14:30',
      status: 'completed',
      details: 'Invoice #INV-001 generated for $45,000'
    },
    { 
      event: 'Payment to Escrow', 
      date: '2024-01-11', 
      time: '09:15',
      status: 'completed',
      details: 'Funds secured in escrow account'
    },
    { 
      event: 'Shipment Initiated', 
      date: '2024-01-12', 
      time: '16:20',
      status: 'completed',
      details: 'Tracking ID: TRK-456789'
    },
    { 
      event: 'Dispute Raised', 
      date: '2024-01-15', 
      time: '10:30',
      status: 'current',
      details: 'Quality issue reported by buyer'
    },
    { 
      event: 'Inspection Scheduled', 
      date: '2024-01-16', 
      time: '11:00',
      status: 'pending',
      details: 'Third-party inspection arranged'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Buyer',
      role: 'Stone Craft Co.',
      message: 'The slab arrived with multiple chips on the edges. This is not the quality we expected based on the AI grading.',
      timestamp: '2024-01-15T10:30:00Z',
      attachments: ['damage_photo1.jpg', 'damage_photo2.jpg']
    },
    {
      id: 2,
      sender: 'Exporter',
      role: 'Marble Masters Ltd.',
      message: 'We acknowledge the concern. The slab was in perfect condition when shipped. This damage may have occurred during transit.',
      timestamp: '2024-01-15T14:45:00Z',
      attachments: []
    },
    {
      id: 3,
      sender: 'Agent',
      role: 'Sarah Johnson',
      message: 'I have arranged for a third-party inspection. We will have the results within 24 hours.',
      timestamp: '2024-01-16T09:20:00Z',
      attachments: ['inspection_schedule.pdf']
    }
  ];

  const documents = [
    { name: 'Invoice #INV-001', type: 'PDF', size: '245 KB' },
    { name: 'Inspection Report', type: 'PDF', size: '1.2 MB' },
    { name: 'KYC Documents', type: 'ZIP', size: '3.4 MB' },
    { name: 'Escrow Agreement', type: 'PDF', size: '680 KB' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'Escalated': return 'bg-red-100 text-red-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getTimelineStatus = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500';
      case 'pending': return 'bg-slate-300';
      default: return 'bg-slate-300';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle message sending logic
      setNewMessage('');
    }
  };

  const handleAction = (action: string) => {
    setSelectedAction(action);
    // Handle action logic
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dispute Resolution</h1>
            <p className="text-slate-600">Review and resolve marketplace disputes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Dispute Summary & Timeline */}
          <div className="lg:col-span-1 space-y-6">
            {/* Dispute Summary */}
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-slate-900">Dispute Summary</CardTitle>
                  <Badge className={getStatusColor(dispute.status)}>
                    {dispute.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Dispute ID</span>
                  <span className="font-medium text-slate-900">{dispute.id}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900">{dispute.buyer.name}</p>
                      <p className="text-xs text-slate-500">Buyer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900">{dispute.exporter.name}</p>
                      <p className="text-xs text-slate-500">Exporter</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900">{dispute.buyer.agent}</p>
                      <p className="text-xs text-slate-500">Assigned Agent</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600">Filed by {dispute.filedBy}</span>
                  </div>
                  <p className="text-xs text-slate-500 ml-6">
                    {new Date(dispute.filedAt).toLocaleDateString()} at {new Date(dispute.filedAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-slate-900">Amount in Dispute</p>
                  <p className="text-xl font-bold text-slate-900">{dispute.amount}</p>
                  <p className="text-xs text-slate-500">Escrow ID: {dispute.escrowId}</p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${getTimelineStatus(item.status)}`} />
                        {index < timeline.length - 1 && (
                          <div className="w-px h-8 bg-slate-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-slate-900 text-sm">{item.event}</p>
                          <Badge variant="outline" className="text-xs">
                            {item.date}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600">{item.details}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Linked Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                          <p className="text-xs text-slate-500">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Slab Details & Chat */}
          <div className="lg:col-span-2 space-y-6">
            {/* Slab Details */}
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Slab Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{dispute.slab.name}</h3>
                      <Badge variant="outline">Grade {dispute.slab.grade}</Badge>
                      <Badge className="bg-emerald-100 text-emerald-800">
                        AI Score: {dispute.slab.aiScore}%
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">Slab ID: {dispute.slab.id}</p>
                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-900">Reported Discrepancy</p>
                          <p className="text-sm text-red-700">{dispute.slab.discrepancy}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chat Thread */}
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Communication Thread</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 mb-4">
                  <div className="space-y-4 pr-4">
                    {messages.map((message) => (
                      <div key={message.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-slate-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-sm">{message.role}</p>
                              <p className="text-xs text-slate-500">{message.sender}</p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm text-slate-700 mb-3">{message.message}</p>
                        {message.attachments.length > 0 && (
                          <div className="flex gap-2">
                            {message.attachments.map((attachment, idx) => (
                              <div key={idx} className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded text-xs">
                                <Paperclip className="w-3 h-3" />
                                {attachment}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add your response or notes..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button onClick={handleSendMessage} className="px-3">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Resolution Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleAction('request-info')}
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Request More Info
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleAction('approve-refund')}
                    className="flex items-center gap-2 text-green-700 border-green-200 hover:bg-green-50"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Refund
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleAction('escalate')}
                    className="flex items-center gap-2 text-red-700 border-red-200 hover:bg-red-50"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Escalate
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleAction('release-funds')}
                    className="flex items-center gap-2 text-blue-700 border-blue-200 hover:bg-blue-50"
                  >
                    <XCircle className="w-4 h-4" />
                    Release Funds
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Next Steps:</strong> Third-party inspection is scheduled for tomorrow. 
                    Results will be available within 24 hours to make an informed decision.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeResolution;
