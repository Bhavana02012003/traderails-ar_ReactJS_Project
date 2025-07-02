
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
  Download,
  Shield,
  Scale,
  Eye,
  Upload,
  Plus,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DisputeResolutionPanelProps {
  disputeId: string;
  onBack: () => void;
  userRole: 'admin' | 'buyer' | 'seller' | 'agent';
}

const DisputeResolutionPanel = ({ disputeId, onBack, userRole }: DisputeResolutionPanelProps) => {
  const [newComment, setNewComment] = useState('');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);

  // Mock dispute data
  const dispute = {
    id: 'DPT-1049',
    status: 'Under Review',
    transactionId: 'TXN-8834',
    shipmentId: 'SHP-2024-445',
    quoteId: 'QUO-1823',
    buyer: {
      name: 'Stone Craft International',
      contact: 'procurement@stonecraft.com',
      country: 'United States'
    },
    seller: {
      name: 'Rajasthan Marble Exports',
      contact: 'export@rajmarble.in',
      country: 'India'
    },
    raisedBy: {
      name: 'Sarah Johnson',
      role: 'Buyer Agent',
      company: 'Stone Craft International'
    },
    issueType: 'Slab mismatch',
    shortDescription: 'Delivered granite slabs do not match the AI-graded samples. Color variation exceeds acceptable tolerance.',
    reportedAt: 'Post-Delivery',
    disputeAmount: '$45,600',
    riskScore: 'Medium',
    createdAt: '2024-01-15T10:30:00Z',
    escalatedAt: '2024-01-16T14:20:00Z',
    age: '3 days'
  };

  const timeline = [
    {
      id: 1,
      type: 'dispute_raised',
      actor: 'Sarah Johnson (Buyer Agent)',
      action: 'Dispute Raised',
      timestamp: '2024-01-15T10:30:00Z',
      details: 'Initial dispute filed citing slab quality mismatch',
      status: 'completed'
    },
    {
      id: 2,
      type: 'seller_response',
      actor: 'Rajasthan Marble Exports',
      action: 'Seller Response',
      timestamp: '2024-01-15T16:45:00Z',
      details: 'Acknowledged receipt and requested inspection timeline',
      status: 'completed'
    },
    {
      id: 3,
      type: 'evidence_submitted',
      actor: 'Sarah Johnson (Buyer Agent)',
      action: 'Evidence Submitted',
      timestamp: '2024-01-16T09:15:00Z',
      details: 'Uploaded comparative photos and inspection report',
      status: 'completed'
    },
    {
      id: 4,
      type: 'admin_review',
      actor: 'Platform Admin',
      action: 'Under Admin Review',
      timestamp: '2024-01-16T14:20:00Z',
      details: 'Case escalated to admin panel for resolution',
      status: 'current'
    },
    {
      id: 5,
      type: 'resolution_pending',
      actor: 'Platform Admin',
      action: 'Resolution Pending',
      timestamp: null,
      details: 'Final decision expected within 24-48 hours',
      status: 'pending'
    }
  ];

  const comments = [
    {
      id: 1,
      author: 'Sarah Johnson',
      role: 'Buyer Agent',
      company: 'Stone Craft International',
      message: 'The delivered granite slabs show significant color variation from the AI-graded samples. We have documented the discrepancies with high-resolution photography.',
      timestamp: '2024-01-15T10:30:00Z',
      attachments: ['color_comparison.jpg', 'batch_overview.jpg']
    },
    {
      id: 2,
      author: 'Rajesh Kumar',
      role: 'Export Manager',
      company: 'Rajasthan Marble Exports',
      message: 'We acknowledge the concern raised. Our quality control team has reviewed the batch records. The slabs were within our standard tolerance range at dispatch. We request a joint inspection.',
      timestamp: '2024-01-15T16:45:00Z',
      attachments: ['qc_certificate.pdf']
    },
    {
      id: 3,
      author: 'Sarah Johnson',
      role: 'Buyer Agent',
      company: 'Stone Craft International',
      message: 'We have conducted a comprehensive inspection with our local team. The attached report shows the color variance exceeds industry standards by 15%.',
      timestamp: '2024-01-16T09:15:00Z',
      attachments: ['inspection_report.pdf', 'color_analysis.pdf']
    }
  ];

  const evidence = [
    { name: 'Original Sample Photos', type: 'Image', verified: true, uploadedBy: 'System' },
    { name: 'Delivered Slab Photos', type: 'Image', verified: true, uploadedBy: 'Sarah Johnson' },
    { name: 'Color Comparison Analysis', type: 'PDF', verified: true, uploadedBy: 'Sarah Johnson' },
    { name: 'Quality Control Certificate', type: 'PDF', verified: true, uploadedBy: 'Rajesh Kumar' },
    { name: 'Third-Party Inspection Report', type: 'PDF', verified: false, uploadedBy: 'Pending' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Buyer Evidence': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Under Review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Escalated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getTimelineStatus = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500 animate-pulse';
      case 'pending': return 'bg-slate-300';
      default: return 'bg-slate-300';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-amber-600';
      case 'Low': return 'text-green-600';
      default: return 'text-slate-600';
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      console.log('Submitting comment:', newComment);
      setNewComment('');
    }
  };

  const handleResolutionAction = (action: string) => {
    setSelectedAction(action);
    console.log('Resolution action:', action);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const canTakeAction = (actionType: 'comment' | 'evidence' | 'resolve') => {
    switch (actionType) {
      case 'comment': return true;
      case 'evidence': return userRole === 'buyer' || userRole === 'seller' || userRole === 'agent';
      case 'resolve': return userRole === 'admin';
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter']">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <Scale className="w-6 h-6 text-slate-700" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Dispute Resolution Panel</h1>
                <p className="text-slate-600">International Stone Trade Arbitration</p>
              </div>
            </div>
          </div>
          <Badge className={`${getStatusColor(dispute.status)} font-medium`}>
            {dispute.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Dispute Overview & Timeline */}
          <div className="lg:col-span-1 space-y-6">
            {/* Dispute Overview */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Dispute Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-slate-600">Dispute ID</Label>
                    <p className="font-mono font-medium">{dispute.id}</p>
                  </div>
                  <div>
                    <Label className="text-slate-600">Transaction ID</Label>
                    <p className="font-mono text-blue-600">{dispute.transactionId}</p>
                  </div>
                  <div>
                    <Label className="text-slate-600">Shipment ID</Label>
                    <p className="font-mono text-blue-600">{dispute.shipmentId}</p>
                  </div>
                  <div>
                    <Label className="text-slate-600">Quote ID</Label>
                    <p className="font-mono text-blue-600">{dispute.quoteId}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900">{dispute.buyer.name}</p>
                      <p className="text-xs text-slate-500">Buyer · {dispute.buyer.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900">{dispute.seller.name}</p>
                      <p className="text-xs text-slate-500">Seller · {dispute.seller.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900">{dispute.raisedBy.name}</p>
                      <p className="text-xs text-slate-500">Raised by · {dispute.raisedBy.role}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Issue Type</span>
                    <Badge variant="outline" className="text-xs">
                      {dispute.issueType}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Reported At</span>
                    <span className="text-sm font-medium">{dispute.reportedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Dispute Amount</span>
                    <span className="text-sm font-medium text-red-600">{dispute.disputeAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Risk Score</span>
                    <span className={`text-sm font-medium ${getRiskColor(dispute.riskScore)}`}>
                      {dispute.riskScore}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Age</span>
                    <span className="text-sm font-medium">{dispute.age}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resolution Timeline */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Resolution Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${getTimelineStatus(item.status)}`} />
                        {index < timeline.length - 1 && (
                          <div className="w-px h-8 bg-slate-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-slate-900 text-sm">{item.action}</p>
                          {item.timestamp && (
                            <Badge variant="outline" className="text-xs">
                              {new Date(item.timestamp).toLocaleDateString()}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">{item.details}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.actor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Evidence Summary */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Evidence & Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {evidence.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{item.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">{item.type}</span>
                            {item.verified && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {canTakeAction('evidence') && (
                  <div className="mt-4 pt-4 border-t">
                    <Dialog open={showEvidenceModal} onOpenChange={setShowEvidenceModal}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          <Upload className="w-4 h-4 mr-2" />
                          Add Evidence
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Submit Evidence</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Evidence Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select evidence type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="photo">Photographs</SelectItem>
                                <SelectItem value="document">Document</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="inspection">Inspection Report</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea placeholder="Describe the evidence being submitted..." />
                          </div>
                          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-600">Drop files here or click to upload</p>
                          </div>
                          <Button className="w-full">Submit Evidence</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Issue Details & Communication */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Summary */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Issue Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-900 mb-1">{dispute.issueType}</h3>
                      <p className="text-sm text-amber-800">{dispute.shortDescription}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Thread */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Communication Thread
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 mb-4">
                  <div className="space-y-4 pr-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-slate-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-sm">{comment.author}</p>
                              <p className="text-xs text-slate-500">{comment.role} · {comment.company}</p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500">
                            {formatTimestamp(comment.timestamp)}
                          </p>
                        </div>
                        <p className="text-sm text-slate-700 mb-3 leading-relaxed">{comment.message}</p>
                        {comment.attachments.length > 0 && (
                          <div className="flex gap-2">
                            {comment.attachments.map((attachment, idx) => (
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
                
                {canTakeAction('comment') && (
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add your response or comments..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[60px]"
                    />
                    <Button onClick={handleSubmitComment} className="px-3">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resolution Actions */}
            {canTakeAction('resolve') && (
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                    <Scale className="w-5 h-5" />
                    Admin Resolution Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <Button 
                      variant="outline" 
                      onClick={() => handleResolutionAction('request-info')}
                      className="flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Request Info
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleResolutionAction('approve-refund')}
                      className="flex items-center gap-2 text-green-700 border-green-200 hover:bg-green-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve Refund
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleResolutionAction('partial-refund')}
                      className="flex items-center gap-2 text-blue-700 border-blue-200 hover:bg-blue-50"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Partial Refund
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleResolutionAction('reject-dispute')}
                      className="flex items-center gap-2 text-red-700 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject Dispute
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-1">Platform Decision Guidelines</p>
                        <p className="text-sm text-blue-800">
                          All evidence has been reviewed. The case involves quality discrepancy claims. 
                          Consider ordering third-party inspection for final determination.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeResolutionPanel;
