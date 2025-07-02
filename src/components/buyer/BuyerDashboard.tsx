
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BuyerSummaryCards from './BuyerSummaryCards';
import BuyerQuickActions from './BuyerQuickActions';
import RecentOrders from './RecentOrders';
import SlabBookmarks from './SlabBookmarks';
import AssignedAgents from './AssignedAgents';
import LocationMap from './LocationMap';
import TrustBadges from './TrustBadges';
import OrganizationSwitcher from '@/components/auth/OrganizationSwitcher';

interface BuyerDashboardProps {
  onShowInviteFlow?: () => void;
  userType?: 'buyer' | 'agent' | 'trader';
  onOrgDetailsClick?: () => void;
}

// Mock organizations for demonstration
const mockOrganizations = [
  {
    id: '1',
    name: 'Shivani Granites Ltd.',
    type: 'Factory' as const,
    location: 'Jaipur, India',
  },
  {
    id: '2',
    name: 'Global Stone Exports',
    type: 'Exporter' as const,
    location: 'Mumbai, India',
  },
  {
    id: '3',
    name: 'Premium Marble Trading Co.',
    type: 'Trader' as const,
    location: 'Dubai, UAE',
  },
];

const BuyerDashboard = ({ onShowInviteFlow, userType = 'buyer' }: BuyerDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const currentOrg = mockOrganizations[0]; // Default to first org

  const handleOrganizationChange = (orgId: string) => {
    console.log('Switching to organization:', orgId);
    // In a real app, this would trigger a context switch
  };

  // Only show organization switcher for traders and agents
  const canSwitchOrganizations = userType === 'trader' || userType === 'agent';

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-stone-900 mb-2">Buyer Dashboard</h1>
              <p className="text-stone-600">Manage your orders, track shipments, and discover premium stone materials</p>
            </div>
            
            {/* Organization Switcher - Only for traders and agents */}
            {canSwitchOrganizations && (
              <div className="w-full sm:w-80">
                <OrganizationSwitcher
                  currentOrg={currentOrg}
                  organizations={mockOrganizations}
                  onOrganizationChange={handleOrganizationChange}
                />
              </div>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-stone-200 p-1 h-12">
            <TabsTrigger value="overview" className="px-6 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="px-6 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Orders
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="px-6 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Bookmarks
            </TabsTrigger>
            <TabsTrigger value="agents" className="px-6 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Agents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            <BuyerSummaryCards />
            
            {/* Quick Actions */}
            <BuyerQuickActions onShowInviteFlow={onShowInviteFlow} />
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <RecentOrders />
              
              {/* Location Map */}
              <LocationMap />
            </div>
            
            {/* Trust Badges */}
            <TrustBadges />
          </TabsContent>

          <TabsContent value="orders">
            <RecentOrders expanded={true} />
          </TabsContent>

          <TabsContent value="bookmarks">
            <SlabBookmarks />
          </TabsContent>

          <TabsContent value="agents">
            <AssignedAgents />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyerDashboard;
