
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

  // Render financial workflow if an invoice is selected
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
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">
            {userType === 'agent' ? 'Agent' : userType === 'trader' ? 'Trader' : 'Buyer'} Dashboard
          </h1>
          <p className="text-stone-600">
            {userType === 'agent' ? 'Managing buyer relationships' : userType === 'trader' ? 'Trading opportunities' : 'Premium stone sourcing platform'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <BuyerSummaryCards />
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <QuotesList onViewQuote={handleViewQuote} />
              <RecentOrders onFinancialWorkflow={handleFinancialWorkflow} />
            </div>
            
            <TrustBadges />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <BuyerQuickActions onShowInviteFlow={handleShowInviteFlow} />
            <SlabBookmarks />
            {userType === 'buyer' && <AssignedAgents />}
            <LocationMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
