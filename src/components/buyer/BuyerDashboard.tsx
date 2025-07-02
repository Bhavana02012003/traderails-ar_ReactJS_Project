
import { useState } from 'react';
import { BarChart3, Package, MessageSquare, MapPin, TrendingUp, Users, FileText, DollarSign } from 'lucide-react';
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

interface BuyerDashboardProps {
  onShowInviteFlow?: () => void;
  userType?: 'buyer' | 'agent' | 'trader';
}

const BuyerDashboard = ({ onShowInviteFlow, userType = 'buyer' }: BuyerDashboardProps) => {
  const [showInviteFlow, setShowInviteFlow] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'quote-review'>('dashboard');
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);

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

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedQuoteId(null);
    setSelectedInvoice(null);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">
            {userType === 'agent' ? 'Agent' : userType === 'trader' ? 'Trader' : 'Buyer'} Dashboard
          </h1>
          <p className="text-stone-600">
            {userType === 'agent' ? 'Managing buyer relationships' : userType === 'trader' ? 'Trading opportunities' : 'Premium stone sourcing platform'}
          </p>
        </div>

        {/* Summary Cards - Always Visible */}
        <div className="mb-8">
          <BuyerSummaryCards />
        </div>

        {/* Quick Actions with Collapsible Sections */}
        <div className="mb-8">
          <BuyerQuickActions onShowInviteFlow={handleShowInviteFlow}>
            {/* Collapsible Content */}
            <div className="space-y-6">
              {/* Essential Sections */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <QuotesList onViewQuote={handleViewQuote} />
                <RecentOrders onFinancialWorkflow={handleFinancialWorkflow} />
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
          </BuyerQuickActions>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
