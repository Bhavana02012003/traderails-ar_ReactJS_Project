
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BuyerSummaryCards from './BuyerSummaryCards';
import BuyerQuickActions from './BuyerQuickActions';
import RecentOrders from './RecentOrders';
import SlabBookmarks from './SlabBookmarks';
import AssignedAgents from './AssignedAgents';
import LocationMap from './LocationMap';
import TrustBadges from './TrustBadges';

interface BuyerDashboardProps {
  onShowInviteFlow?: () => void;
}

const BuyerDashboard = ({ onShowInviteFlow }: BuyerDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Buyer Dashboard</h1>
          <p className="text-stone-600">Manage your orders, track shipments, and discover premium stone materials</p>
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
