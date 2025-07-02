
import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminMetrics from './AdminMetrics';
import KYCReviewQueue from './KYCReviewQueue';
import TransactionMonitor from './TransactionMonitor';
import UserOnboardingFeed from './UserOnboardingFeed';
import DisputePanel from './DisputePanel';
import PartnerHealthStatus from './PartnerHealthStatus';
import ComplianceAlerts from './ComplianceAlerts';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">Platform Administration</h1>
            <p className="text-slate-600">Manage platform operations, compliance, and user activities</p>
          </div>

          {/* Top Metrics */}
          <AdminMetrics />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <KYCReviewQueue />
              <UserOnboardingFeed />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <TransactionMonitor />
              <DisputePanel />
            </div>
          </div>

          {/* Full Width Sections */}
          <div className="space-y-6">
            <PartnerHealthStatus />
            <ComplianceAlerts />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
