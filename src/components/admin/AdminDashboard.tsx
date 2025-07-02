
import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminMetrics from './AdminMetrics';
import KYCReviewQueue from './KYCReviewQueue';
import TransactionMonitor from './TransactionMonitor';
import DisputePanel from './DisputePanel';
import DisputeResolutionPanel from './DisputeResolutionPanel';
import ComplianceAlerts from './ComplianceAlerts';
import UserOnboardingFeed from './UserOnboardingFeed';
import PartnerHealthStatus from './PartnerHealthStatus';

interface AdminDashboardProps {
  userRole?: 'admin' | 'buyer' | 'seller' | 'agent';
  onLogout?: () => void;
  onShowInviteFlow?: () => void;
}

const AdminDashboard = ({ userRole = 'admin', onLogout, onShowInviteFlow }: AdminDashboardProps) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'dispute-resolution'>('dashboard');
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleViewDispute = (disputeId: string) => {
    setSelectedDisputeId(disputeId);
    setCurrentView('dispute-resolution');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedDisputeId(null);
  };

  if (currentView === 'dispute-resolution' && selectedDisputeId) {
    return (
      <DisputeResolutionPanel 
        disputeId={selectedDisputeId}
        userRole={userRole}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={onLogout || (() => {})}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Monitor platform operations and resolve issues</p>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Key Metrics */}
            <AdminMetrics />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <KYCReviewQueue />
                <DisputePanel onViewDispute={handleViewDispute} />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <TransactionMonitor />
                <ComplianceAlerts />
              </div>
            </div>

            {/* Secondary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserOnboardingFeed />
              <PartnerHealthStatus />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
