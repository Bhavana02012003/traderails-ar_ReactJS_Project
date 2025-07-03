import { useState } from 'react';
import DashboardHeader from '@/components/exporter/DashboardHeader';
import BuyerSummaryCards from './BuyerSummaryCards';
import BuyerQuickActions from './BuyerQuickActions';
import QuoteReviewPage from './QuoteReviewPage';
import FinancialWorkflowTrigger from '@/components/finance/FinancialWorkflowTrigger';
import InviteUserFlow from '@/components/invite/InviteUserFlow';
import ShipmentTrackingView from '@/components/shipment/ShipmentTrackingView';
import RealTimeShipmentTracker from '@/components/shipment/RealTimeShipmentTracker';
import TrustBadges from './TrustBadges';
import RecentOrders from './RecentOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Send, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BuyerDashboardProps {
  onShowInviteFlow?: () => void;
  userType?: 'buyer' | 'agent' | 'trader';
}

const BuyerDashboard = ({ onShowInviteFlow, userType = 'buyer' }: BuyerDashboardProps) => {
  const [showInviteFlow, setShowInviteFlow] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'quote-review' | 'shipment-tracking' | 'real-time-tracker'>('dashboard');
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleFinancialWorkflow = (orderData: {
    invoiceId: string;
    amount: { inr: string; usd: string };
    buyer: string;
    status: 'approved' | 'pending' | 'rejected';
  }) => {
    setSelectedInvoice(orderData);
  };

  const handleViewQuote = (quoteId: string) => {
    setSelectedQuoteId(quoteId);
    setCurrentView('quote-review');
  };

  const handleTrackShipment = (shipmentId: string) => {
    setSelectedShipmentId(shipmentId);
    setCurrentView('real-time-tracker');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedQuoteId(null);
    setSelectedInvoice(null);
    setSelectedShipmentId(null);
  };

  const handleShowInviteFlow = () => {
    setShowInviteFlow(true);
    onShowInviteFlow?.();
  };

  const handleDownloadPDF = async (invoiceId: string) => {
    setIsDownloading(true);
    try {
      // Open invoice in new tab and trigger download
      const invoiceWindow = window.open('/invoice/preview', '_blank');
      if (invoiceWindow) {
        // Wait for the page to load and trigger download
        setTimeout(() => {
          invoiceWindow.postMessage({ action: 'download' }, '*');
        }, 2000);
      }
      
      toast({
        title: "Download Started",
        description: `Invoice ${invoiceId} is being downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the invoice.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendToBuyer = async (invoiceId: string) => {
    setIsSending(true);
    try {
      // Simulate sending invoice
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Invoice Sent",
        description: `Invoice ${invoiceId} has been sent to the buyer.`,
      });
    } catch (error) {
      toast({
        title: "Send Failed",
        description: "There was an error sending the invoice.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (showInviteFlow) {
    return <InviteUserFlow onBack={() => setShowInviteFlow(false)} />;
  }

  if (currentView === 'quote-review') {
    return <QuoteReviewPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'shipment-tracking') {
    return (
      <ShipmentTrackingView 
        shipmentId={selectedShipmentId || undefined}
        userRole={userType}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentView === 'real-time-tracker') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-stone-50 font-['Inter']">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl border-b border-stone-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={handleBackToDashboard} className="text-stone-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-stone-900">Order Workflow Tracker</h1>
                  <p className="text-sm text-stone-600">Shipment ID: {selectedShipmentId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RealTimeShipmentTracker shipmentId={selectedShipmentId || undefined} />
        </div>
      </div>
    );
  }

  if (selectedInvoice) {
    return (
      <FinancialWorkflowTrigger 
        invoiceId={selectedInvoice.invoiceId}
        amount={selectedInvoice.amount}
        buyer={selectedInvoice.buyer}
        status={selectedInvoice.status}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 font-['Inter']">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        {/* Summary Cards */}
        <div className="mb-8">
          <BuyerSummaryCards />
        </div>

        {/* Main Content with Tabs */}
        <div className="mb-8">
          <BuyerQuickActions 
            onShowInviteFlow={handleShowInviteFlow}
            onViewQuote={handleViewQuote}
            onFinancialWorkflow={handleFinancialWorkflow}
            onTrackShipment={handleTrackShipment}
          />
        </div>

        {/* Recent Orders Section */}
        <div className="mb-8">
          <RecentOrders 
            onFinancialWorkflow={handleFinancialWorkflow}
            onTrackShipment={handleTrackShipment}
          />
        </div>

        {/* Invoices Section */}
        <div className="mb-8">
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Recent Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white/60 backdrop-blur-lg rounded-xl p-4 border border-white/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-stone-900">INV-2024-00108</h3>
                      <p className="text-sm text-stone-600">From: Shivani Granites Ltd - ₹2,85,574</p>
                      <p className="text-xs text-stone-500">Received: June 28, 2025</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        Pending Payment
                      </Badge>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open('/invoice/preview', '_blank')}
                          className="bg-white hover:bg-stone-50"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadPDF('INV-2024-00108')}
                          disabled={isDownloading}
                          className="bg-white hover:bg-stone-50"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          {isDownloading ? 'Downloading...' : 'Download'}
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleSendToBuyer('INV-2024-00108')}
                          disabled={isSending}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Send className="w-4 h-4 mr-1" />
                          {isSending ? 'Sending...' : 'Send'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Badges */}
        <TrustBadges />
      </div>
    </div>
  );
};

export default BuyerDashboard;
