
import { useState } from 'react';
import DashboardHeader from '@/components/exporter/DashboardHeader';
import BuyerSummaryCards from './BuyerSummaryCards';
import BuyerQuickActions from './BuyerQuickActions';
import QuoteReviewPage from './QuoteReviewPage';
import FinancialWorkflowTrigger from '@/components/finance/FinancialWorkflowTrigger';
import InviteUserFlow from '@/components/invite/InviteUserFlow';
import ShipmentTrackingView from '@/components/shipment/ShipmentTrackingView';
import TrustBadges from './TrustBadges';

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

        {/* Trust Badges */}
        <TrustBadges />
      </div>
    </div>
  );
};

export default BuyerDashboard;
