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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, Shield, CreditCard, AlertTriangle, FileCheck, Settings } from 'lucide-react';

interface AdminDashboardProps {
  userRole?: 'admin' | 'buyer' | 'exporter' | 'agent' | 'trader';
  onLogout?: () => void;
  onShowInviteFlow?: () => void;
}

const AdminDashboard = ({ userRole = 'admin', onLogout, onShowInviteFlow }: AdminDashboardProps) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'dispute-resolution'>('dashboard');
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const handleViewDispute = (disputeId: string) => {
    setSelectedDisputeId(disputeId);
    setCurrentView('dispute-resolution');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedDisputeId(null);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <AdminMetrics />

            {/* Invoice Management Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Invoice Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">INV-2024-00108</h3>
                        <p className="text-sm text-gray-600">Shivani Granites → Rohan Imports Ltd</p>
                        <p className="text-xs text-gray-500">Amount: ₹2,85,574 | Status: Pending Payment</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-100 text-amber-800">
                          Pending Payment
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open('/invoice/preview', '_blank')}
                        >
                          Review Invoice
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
        );

      case 'users':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <UserOnboardingFeed />
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Recent User Activity</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">User management features will be displayed here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'kyc':
        return (
          <div className="space-y-6">
            <KYCReviewQueue />
            <ComplianceAlerts />
          </div>
        );

      case 'transactions':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Transaction Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionMonitor />
            </CardContent>
          </Card>
        );

      case 'disputes':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Dispute Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DisputePanel onViewDispute={handleViewDispute} />
            </CardContent>
          </Card>
        );

      case 'partners':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCheck className="w-5 h-5 mr-2" />
                Partner Health Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PartnerHealthStatus />
            </CardContent>
          </Card>
        );

      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">System Configuration</h3>
                  <p className="text-gray-600">Platform settings and configurations will be managed here</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Security Settings</h3>
                  <p className="text-gray-600">Security policies and access controls</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return renderSectionContent();
    }
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
        userType={userRole}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeSection === 'overview' ? 'Admin Dashboard' : 
               activeSection === 'users' ? 'User Management' :
               activeSection === 'kyc' ? 'KYC & Compliance' :
               activeSection === 'transactions' ? 'Transaction Management' :
               activeSection === 'disputes' ? 'Dispute Management' :
               activeSection === 'partners' ? 'Partner Health' :
               activeSection === 'settings' ? 'Platform Settings' : 'Admin Dashboard'}
            </h1>
            <p className="text-gray-600">
              {activeSection === 'overview' ? 'Monitor platform operations and resolve issues' :
               activeSection === 'users' ? 'Manage user accounts and permissions' :
               activeSection === 'kyc' ? 'Review KYC submissions and compliance status' :
               activeSection === 'transactions' ? 'Monitor and manage platform transactions' :
               activeSection === 'disputes' ? 'Handle disputes and resolution processes' :
               activeSection === 'partners' ? 'Monitor partner health and performance' :
               activeSection === 'settings' ? 'Configure platform settings and policies' : 'Platform administration'}
            </p>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {renderSectionContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
