
import { useState } from 'react';
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
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);

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
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
          onLogout={onLogout}
        />
        
        <main className="flex-1 p-6 ml-64">
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Platform Overview</h1>
                <p className="text-slate-600">Monitor key metrics and platform health</p>
              </div>
              
              <AdminMetrics />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TransactionMonitor />
                <DisputePanel onViewDispute={handleViewDispute} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <UserOnboardingFeed />
                <ComplianceAlerts />
                <PartnerHealthStatus />
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">User Management</h1>
                <p className="text-slate-600">Manage user accounts and verification</p>
              </div>
              <KYCReviewQueue />
            </div>
          )}

          {activeSection === 'transactions' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Transaction Monitoring</h1>
                <p className="text-slate-600">Track all platform transactions and payments</p>
              </div>
              <TransactionMonitor />
            </div>
          )}

          {activeSection === 'disputes' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Dispute Management</h1>
                <p className="text-slate-600">Review and resolve marketplace disputes</p>
              </div>
              <DisputePanel onViewDispute={handleViewDispute} />
            </div>
          )}

          {activeSection === 'compliance' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Compliance Dashboard</h1>
                <p className="text-slate-600">Monitor regulatory compliance and alerts</p>
              </div>
              <ComplianceAlerts />
              <PartnerHealthStatus />
            </div>
          )}

          {activeSection === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Analytics & Reports</h1>
                <p className="text-slate-600">Platform performance and business insights</p>
              </div>
              <AdminMetrics />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
