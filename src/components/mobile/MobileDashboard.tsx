
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  TrendingUp, 
  Package, 
  Truck, 
  DollarSign, 
  ChevronDown, 
  ChevronRight,
  Eye,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Bell
} from 'lucide-react';

interface MobileDashboardProps {
  userType?: 'exporter' | 'factory';
}

const MobileDashboard = ({ userType = 'exporter' }: MobileDashboardProps) => {
  const isMobile = useIsMobile();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [swipeIndex, setSwipeIndex] = useState(0);

  // Mock data
  const summaryCards = [
    {
      id: 'quotes',
      title: 'Active Quotes',
      value: '24',
      change: '+3 today',
      icon: TrendingUp,
      color: 'emerald',
      bgGradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'shipments',
      title: 'In Transit',
      value: '12',
      change: '3 arriving today',
      icon: Truck,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'payouts',
      title: 'Pending Payouts',
      value: '₹8.5L',
      change: 'Next: ₹2.4L',
      icon: DollarSign,
      color: 'green',
      bgGradient: 'from-green-500 to-green-600'
    },
    {
      id: 'inventory',
      title: 'Inventory',
      value: '347',
      change: '28 new slabs',
      icon: Package,
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600'
    }
  ];

  const recentQuotes = [
    {
      id: 'Q-2024-001',
      buyer: 'Stone Craft LLC',
      amount: '₹4,50,000',
      status: 'pending',
      date: '2 hours ago',
      items: '15 slabs • Carrara White'
    },
    {
      id: 'Q-2024-002',
      buyer: 'Premium Marbles Inc',
      amount: '₹2,85,000',
      status: 'approved',
      date: '1 day ago',
      items: '8 slabs • Black Galaxy'
    },
    {
      id: 'Q-2024-003',
      buyer: 'Global Stone Ltd',
      amount: '₹6,20,000',
      status: 'negotiation',
      date: '2 days ago',
      items: '22 slabs • Tan Brown'
    }
  ];

  const shipmentData = [
    {
      id: 'SH-001',
      destination: 'New York Port',
      status: 'in-transit',
      progress: 75,
      eta: '3 days',
      buyer: 'Stone Imports LLC'
    },
    {
      id: 'SH-002',
      destination: 'Hamburg Port',
      status: 'customs',
      progress: 60,
      eta: '5 days',
      buyer: 'European Stone Co'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'approved': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'negotiation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-transit': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'customs': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'approved': return <CheckCircle className="w-3 h-3" />;
      case 'negotiation': return <AlertCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  if (!isMobile) {
    return null; // Only render on mobile
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 font-sora">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900">Dashboard</h1>
            <p className="text-sm text-stone-600">Welcome back</p>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" className="relative p-2">
              <Bell className="w-5 h-5 text-stone-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 px-4">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 pb-20">
        {/* Swipeable Summary Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900">Overview</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {summaryCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card 
                  key={card.id} 
                  className="min-w-[280px] snap-start bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-stone-600 mb-1">{card.title}</p>
                        <p className="text-3xl font-bold text-stone-900">{card.value}</p>
                        <p className="text-xs text-stone-500 mt-1">{card.change}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.bgGradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full bg-gradient-to-r ${card.bgGradient}`}
                        style={{ width: `${65 + index * 10}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Collapsible Quotes Section */}
        <Collapsible>
          <CollapsibleTrigger 
            className="w-full"
            onClick={() => setActiveCard(activeCard === 'quotes' ? null : 'quotes')}
          >
            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    Recent Quotes
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                      {recentQuotes.length} active
                    </Badge>
                    {activeCard === 'quotes' ? 
                      <ChevronDown className="w-5 h-5 text-stone-500" /> : 
                      <ChevronRight className="w-5 h-5 text-stone-500" />
                    }
                  </div>
                </div>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="space-y-3">
              {recentQuotes.map((quote) => (
                <Card key={quote.id} className="bg-white border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-stone-900 text-sm">{quote.buyer}</h4>
                          <Badge className={`text-xs ${getStatusColor(quote.status)}`}>
                            {getStatusIcon(quote.status)}
                            <span className="ml-1 capitalize">{quote.status}</span>
                          </Badge>
                        </div>
                        <p className="text-xs text-stone-600 mb-1">{quote.id}</p>
                        <p className="text-xs text-stone-500">{quote.items}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-stone-900 text-sm">{quote.amount}</p>
                        <p className="text-xs text-stone-500">{quote.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-8">
                        View
                      </Button>
                      <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-xs h-8">
                        Action
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Shipments Section */}
        <Collapsible>
          <CollapsibleTrigger 
            className="w-full"
            onClick={() => setActiveCard(activeCard === 'shipments' ? null : 'shipments')}
          >
            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    Active Shipments
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {shipmentData.length} in transit
                    </Badge>
                    {activeCard === 'shipments' ? 
                      <ChevronDown className="w-5 h-5 text-stone-500" /> : 
                      <ChevronRight className="w-5 h-5 text-stone-500" />
                    }
                  </div>
                </div>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="space-y-3">
              {shipmentData.map((shipment) => (
                <Card key={shipment.id} className="bg-white border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-stone-900 text-sm mb-1">{shipment.destination}</h4>
                        <p className="text-xs text-stone-600 mb-1">{shipment.buyer}</p>
                        <p className="text-xs text-stone-500">ETA: {shipment.eta}</p>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-600">Progress</span>
                        <span className="font-medium">{shipment.progress}%</span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                          style={{ width: `${shipment.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-stone-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-12 bg-emerald-600 hover:bg-emerald-700 flex-col py-2 px-3">
                <Send className="w-4 h-4 mb-1" />
                <span className="text-xs">New Quote</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col py-2 px-3 border-emerald-200 hover:bg-emerald-50">
                <Package className="w-4 h-4 mb-1" />
                <span className="text-xs">Add Inventory</span>
              </Button>
            </div>
            <Button variant="outline" className="w-full h-10 text-sm border-stone-200 hover:bg-stone-50">
              <Eye className="w-4 h-4 mr-2" />
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation Space */}
      <div className="h-16"></div>
    </div>
  );
};

export default MobileDashboard;
