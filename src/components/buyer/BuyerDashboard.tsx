import { useState } from 'react';
import DashboardHeader from '@/components/exporter/DashboardHeader';
import BuyerSummaryCards from './BuyerSummaryCards';
import RecentOrders from './RecentOrders';
import LocationMap from './LocationMap';
import TrustBadges from './TrustBadges';
import AssignedAgents from './AssignedAgents';
import SlabBookmarks from './SlabBookmarks';
import BuyerQuickActions from './BuyerQuickActions';
import QuotesList from './QuotesList';
import QuoteReviewPage from './QuoteReviewPage';
import FinancialWorkflowTrigger from '@/components/finance/FinancialWorkflowTrigger';
import InviteUserFlow from '@/components/invite/InviteUserFlow';
import ShipmentTrackingView from '@/components/shipment/ShipmentTrackingView';

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">
            {userType === 'agent' ? 'Agent' : userType === 'trader' ? 'Trader' : 'Buyer'} Dashboard
          </h1>
          <p className="text-stone-600">
            {userType === 'agent' ? 'Managing buyer relationships' : userType === 'trader' ? 'Trading opportunities' : 'Premium stone sourcing platform'}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          <BuyerSummaryCards />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <BuyerQuickActions onShowInviteFlow={handleShowInviteFlow} />
        </div>

        {/* Main Dashboard Sections */}
        <div className="space-y-8">
          {/* Primary Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <QuotesList onViewQuote={handleViewQuote} />
            <RecentOrders 
              onFinancialWorkflow={handleFinancialWorkflow} 
              onTrackShipment={handleTrackShipment}
            />
          </div>

          {/* Secondary Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {userType === 'buyer' && <AssignedAgents />}
            <LocationMap />
          </div>

          {/* Additional Sections */}
          <SlabBookmarks />
          <TrustBadges />
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
