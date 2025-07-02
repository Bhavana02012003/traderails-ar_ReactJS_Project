
import { useState } from 'react';
import DashboardHeader from '@/components/exporter/DashboardHeader';
import BuyerSummaryCards from './BuyerSummaryCards';
import BuyerQuickActions from './BuyerQuickActions';
import QuoteReviewPage from './QuoteReviewPage';
import FinancialWorkflowTrigger from '@/components/finance/FinancialWorkflowTrigger';
import InviteUserFlow from '@/components/invite/InviteUserFlow';
import ShipmentTrackingView from '@/components/shipment/ShipmentTrackingView';
import TrustBadges from './TrustBadges';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

interface BuyerDashboardProps {
  onShowInviteFlow?: () => void;
  userType?: 'buyer' | 'agent' | 'trader';
}

const BuyerDashboard = ({ onShowInviteFlow, userType = 'buyer' }: BuyerDashboardProps) => {
  const [showInviteFlow, setShowInviteFlow] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'quote-review' | 'shipment-tracking'>('dashboard');
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);

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
    setCurrentView('shipment-tracking');
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
                      <Button 
                        size="sm" 
                        onClick={() => window.open('/invoice/preview', '_blank')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        View Invoice
                      </Button>
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
