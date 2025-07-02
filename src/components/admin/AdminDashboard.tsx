
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
import { FileText } from 'lucide-react';

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
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
