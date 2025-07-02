import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from './AdminSidebar';
import AdminMetrics from './AdminMetrics';
import TransactionMonitor from './TransactionMonitor';
import KYCReviewQueue from './KYCReviewQueue';
import DisputePanel from './DisputePanel';
import UserOnboardingFeed from './UserOnboardingFeed';
import ComplianceAlerts from './ComplianceAlerts';
import PartnerHealthStatus from './PartnerHealthStatus';
import DisputeResolution from './DisputeResolution';

interface AdminDashboardProps {
  onLogout: () => void;
  onShowInviteFlow?: () => void;
}

const AdminDashboard = ({ onLogout, onShowInviteFlow }: AdminDashboardProps) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSelectedDisputeId(null); // Reset dispute view when changing sections
  };

  const handleViewDispute = (disputeId: string) => {
    setSelectedDisputeId(disputeId);
  };

  const handleBackFromDispute = () => {
    setSelectedDisputeId(null);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // If viewing a specific dispute, show the resolution screen
  if (selectedDisputeId) {
    return (
      <DisputeResolution 
        disputeId={selectedDisputeId} 
        onBack={handleBackFromDispute}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <AdminSidebar 
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
          onLogout={onLogout}
        />
        
        <main className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-0 lg:ml-64'
        }`}>
          {activeSection === 'overview' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Platform Overview</h1>
                  <p className="text-slate-600 text-sm sm:text-base">Monitor key metrics and platform health</p>
                </div>
                {onShowInviteFlow && (
                  <Button 
                    onClick={onShowInviteFlow}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite User
                  </Button>
                )}
              </div>
              
              <AdminMetrics />
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                <TransactionMonitor />
                <DisputePanel onViewDispute={handleViewDispute} />
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                <UserOnboardingFeed />
                <ComplianceAlerts />
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <PartnerHealthStatus />
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">User Management</h1>
                  <p className="text-slate-600 text-sm sm:text-base">Manage user accounts and verification</p>
                </div>
                {onShowInviteFlow && (
                  <Button 
                    onClick={onShowInviteFlow}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite User
                  </Button>
                )}
              </div>
              <KYCReviewQueue />
            </div>
          )}

          {activeSection === 'kyc' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">KYC & Compliance</h1>
                <p className="text-slate-600 text-sm sm:text-base">Review KYC applications and monitor compliance</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <KYCReviewQueue />
                <ComplianceAlerts />
              </div>
            </div>
          )}

          {activeSection === 'transactions' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Transaction Monitoring</h1>
                <p className="text-slate-600 text-sm sm:text-base">Track all platform transactions and payments</p>
              </div>
              <TransactionMonitor />
            </div>
          )}

          {activeSection === 'disputes' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Dispute Management</h1>
                <p className="text-slate-600 text-sm sm:text-base">Review and resolve marketplace disputes</p>
              </div>
              <DisputePanel onViewDispute={handleViewDispute} />
            </div>
          )}

          {activeSection === 'partners' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Partner Health Status</h1>
                <p className="text-slate-600 text-sm sm:text-base">Monitor partner API health and performance</p>
              </div>
              <PartnerHealthStatus />
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Platform Settings</h1>
                <p className="text-slate-600 text-sm sm:text-base">Configure platform parameters and preferences</p>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">System Configuration</h3>
                <p className="text-slate-600">Platform settings panel coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
