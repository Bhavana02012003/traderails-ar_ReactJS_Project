
import { useState } from 'react';
import { Globe, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from './AdminSidebar';
import AdminMetrics from './AdminMetrics';
import KYCReviewQueue from './KYCReviewQueue';
import TransactionMonitor from './TransactionMonitor';
import UserOnboardingFeed from './UserOnboardingFeed';
import DisputePanel from './DisputePanel';
import PartnerHealthStatus from './PartnerHealthStatus';
import ComplianceAlerts from './ComplianceAlerts';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white mb-6">
              <h2 className="text-2xl font-bold mb-2">Good morning, Admin</h2>
              <p className="text-slate-300">Monitor and manage your global B2B stone trading platform</p>
            </div>

            {/* Top Metrics */}
            <AdminMetrics />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
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
            <div className="space-y-6 mt-6">
              <PartnerHealthStatus />
              <ComplianceAlerts />
            </div>
          </>
        );
      case 'users':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">User Management</h2>
              <p className="text-slate-600">Manage platform users, roles, and permissions.</p>
            </div>
            <UserOnboardingFeed />
          </div>
        );
      case 'kyc':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">KYC & Compliance</h2>
              <p className="text-slate-600">Review and manage KYC submissions and compliance alerts.</p>
            </div>
            <KYCReviewQueue />
            <ComplianceAlerts />
          </div>
        );
      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Transaction Monitor</h2>
              <p className="text-slate-600">Monitor all platform transactions and their status.</p>
            </div>
            <TransactionMonitor />
          </div>
        );
      case 'disputes':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Dispute Management</h2>
              <p className="text-slate-600">Handle and resolve platform disputes.</p>
            </div>
            <DisputePanel />
          </div>
        );
      case 'partners':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Partner Health Status</h2>
              <p className="text-slate-600">Monitor the health and performance of platform partners.</p>
            </div>
            <PartnerHealthStatus />
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Platform Settings</h2>
              <p className="text-slate-600">Configure platform settings and preferences.</p>
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500">Settings panel coming soon...</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Top Header Bar */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">TradeRails Admin</h1>
                <p className="text-sm text-slate-600">Platform Administration Console</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <User className="w-4 h-4" />
                <span>Admin User</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
