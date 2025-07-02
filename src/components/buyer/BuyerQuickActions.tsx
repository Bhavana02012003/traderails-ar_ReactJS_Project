
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Quote, Package, Users, MapPin, Heart } from 'lucide-react';
import QuotesList from './QuotesList';
import RecentOrders from './RecentOrders';
import AssignedAgents from './AssignedAgents';
import LocationMap from './LocationMap';
import SlabBookmarks from './SlabBookmarks';

interface BuyerQuickActionsProps {
  onShowInviteFlow?: () => void;
  onViewQuote?: (quoteId: string) => void;
  onFinancialWorkflow?: (orderData: any) => void;
  onTrackShipment?: (shipmentId: string) => void;
}

const BuyerQuickActions = ({ 
  onShowInviteFlow, 
  onViewQuote, 
  onFinancialWorkflow,
  onTrackShipment 
}: BuyerQuickActionsProps) => {
  const [activeTab, setActiveTab] = useState('quotes');

  const tabs = [
    {
      id: 'quotes',
      title: 'Recent Quotes',
      icon: Quote,
      component: <QuotesList onViewQuote={onViewQuote || (() => {})} />
    },
    {
      id: 'orders',
      title: 'Recent Orders',
      icon: Package,
      component: <RecentOrders onFinancialWorkflow={onFinancialWorkflow} onTrackShipment={onTrackShipment} />
    },
    {
      id: 'agents',
      title: 'Assigned Buyer Agents',
      icon: Users,
      component: <AssignedAgents />
    },
    {
      id: 'locations',
      title: 'Delivery Locations',
      icon: MapPin,
      component: <LocationMap />
    },
    {
      id: 'bookmarks',
      title: 'Slab Bookmarks',
      icon: Heart,
      component: <SlabBookmarks />
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-stone-200 shadow-sm">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 text-xs"
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              {tab.component}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BuyerQuickActions;
