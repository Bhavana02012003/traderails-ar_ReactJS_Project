
import { useState } from 'react';
import { Plus, Upload, Download, Bell, TrendingUp, Package, Truck, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './DashboardHeader';
import QuickActionsPanel from './QuickActionsPanel';
import SlabInventory from './SlabInventory';
import ShipmentTracker from './ShipmentTracker';
import PayoutSummary from './PayoutSummary';
import BuyerInquiries from './BuyerInquiries';
import CompliancePanel from './CompliancePanel';

const ExporterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const summaryMetrics = [
    {
      title: 'Total Listings',
      value: '247',
      change: '+12 this month',
      icon: Package,
      color: 'emerald'
    },
    {
      title: 'Active Inquiries',
      value: '18',
      change: '3 urgent',
      icon: Bell,
      color: 'amber'
    },
    {
      title: 'Slabs in Transit',
      value: '34',
      change: '8 arriving today',
      icon: Truck,
      color: 'blue'
    },
    {
      title: 'Upcoming Payouts',
      value: '₹8,50,000',
      change: 'Next: ₹2,45,000',
      icon: DollarSign,
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-sage-50 font-sora">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <DashboardHeader />
        
        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="glass-panel border-0 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-stone-600 text-sm font-medium">{metric.title}</p>
                      <p className="text-2xl font-bold text-stone-900 mt-1">{metric.value}</p>
                      <p className="text-xs text-stone-500 mt-1">{metric.change}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl bg-${metric.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <QuickActionsPanel />

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-panel border-0 p-1 h-auto">
            <TabsTrigger value="overview" className="px-6 py-3">Overview</TabsTrigger>
            <TabsTrigger value="inventory" className="px-6 py-3">Inventory</TabsTrigger>
            <TabsTrigger value="shipments" className="px-6 py-3">Shipments</TabsTrigger>
            <TabsTrigger value="payouts" className="px-6 py-3">Payouts</TabsTrigger>
            <TabsTrigger value="inquiries" className="px-6 py-3">Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ShipmentTracker />
              <PayoutSummary />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BuyerInquiries />
              </div>
              <CompliancePanel />
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <SlabInventory />
          </TabsContent>

          <TabsContent value="shipments">
            <ShipmentTracker detailed />
          </TabsContent>

          <TabsContent value="payouts">
            <PayoutSummary detailed />
          </TabsContent>

          <TabsContent value="inquiries">
            <BuyerInquiries detailed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExporterDashboard;
