
import { useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  CreditCard, 
  DollarSign, 
  Users, 
  Camera,
  MessageCircle,
  Upload,
  Eye,
  Edit,
  Send,
  FileText,
  Lock,
  Building
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrganizationSwitcher from '@/components/auth/OrganizationSwitcher';

interface TraderDashboardProps {
  onShowInviteFlow?: () => void;
}

// Mock data
const tradeStatuses = [
  { status: 'Quoted', count: 12, color: 'bg-amber-500' },
  { status: 'Approved', count: 8, color: 'bg-blue-500' },
  { status: 'In Escrow', count: 5, color: 'bg-purple-500' },
  { status: 'Dispatched', count: 3, color: 'bg-emerald-500' }
];

const slabData = [
  {
    id: 'SL001',
    type: 'Carrara White',
    price: '₹45,000/sqm',
    location: 'Mumbai',
    available: true,
    image: '/placeholder.svg'
  },
  {
    id: 'SL002', 
    type: 'Black Galaxy',
    price: '₹65,000/sqm',
    location: 'Bangalore',
    available: true,
    image: '/placeholder.svg'
  },
  {
    id: 'SL003',
    type: 'Tan Brown',
    price: '₹38,000/sqm', 
    location: 'Chennai',
    available: false,
    image: '/placeholder.svg'
  }
];

const activeBuyers = [
  {
    name: 'Stone Craft LLC',
    location: 'Dubai, UAE',
    quoteValue: '₹2,45,000',
    creditRequested: '₹1,50,000',
    status: 'pending'
  },
  {
    name: 'Marble Masters Inc',
    location: 'New York, USA',
    quoteValue: '₹5,80,000',
    creditRequested: '₹3,00,000',
    status: 'approved'
  },
  {
    name: 'Premium Stones Ltd',
    location: 'London, UK',
    quoteValue: '₹1,95,000',
    creditRequested: '₹1,00,000',
    status: 'escrow'
  }
];

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

const TraderDashboard = ({ onShowInviteFlow }: TraderDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentOrg, setCurrentOrg] = useState(mockOrganizations[0]);

  const handleOrganizationChange = (orgId: string) => {
    const org = mockOrganizations.find(o => o.id === orgId);
    if (org) setCurrentOrg(org);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'escrow': return 'bg-purple-100 text-purple-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-emerald-50 font-sora">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header with Organization Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              Independent Trader Dashboard
            </h1>
            <p className="text-stone-600">
              Manage your trade operations and buyer relationships
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Building className="w-4 h-4 text-stone-500" />
              <span className="text-sm text-stone-600">
                Operating under: <span className="font-medium">{currentOrg.name}</span>
              </span>
            </div>
          </div>
          
          <div className="w-full lg:w-80">
            <OrganizationSwitcher
              currentOrg={currentOrg}
              organizations={mockOrganizations}
              onOrganizationChange={handleOrganizationChange}
            />
          </div>
        </div>

        {/* Trade Pipeline Overview */}
        <Card className="glass-panel border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Trade Pipeline Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {tradeStatuses.map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-white font-bold text-lg">{item.count}</span>
                  </div>
                  <p className="text-sm font-medium text-stone-700">{item.status}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="emerald-gradient text-white">
                Create Quote
              </Button>
              <Button variant="outline">
                Check Escrow Status
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-panel border-0 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-4 text-center">
              <Camera className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-medium text-stone-900">Slab Scanner</p>
              <p className="text-xs text-stone-600">Scan & upload slabs</p>
            </CardContent>
          </Card>
          
          <Card className="glass-panel border-0 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-stone-900">WhatsApp</p>
              <p className="text-xs text-stone-600">Quick buyer contact</p>
            </CardContent>
          </Card>
          
          <Card className="glass-panel border-0 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-4 text-center">
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-stone-900">Upload Invoice</p>
              <p className="text-xs text-stone-600">Inspection photos</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-panel border-0 p-1 h-auto">
            <TabsTrigger value="overview" className="px-6 py-3">Overview</TabsTrigger>
            <TabsTrigger value="slabs" className="px-6 py-3">Slabs for Sale</TabsTrigger>
            <TabsTrigger value="buyers" className="px-6 py-3">Active Buyers</TabsTrigger>
            <TabsTrigger value="finance" className="px-6 py-3">Finance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Summary */}
            <Card className="glass-panel border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span>Financial Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm font-medium">Credit Approved</span>
                  <span className="font-bold text-emerald-700">₹8,50,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                  <span className="text-sm font-medium">Credit Pending</span>
                  <span className="font-bold text-amber-700">₹2,45,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">FX Hedged</span>
                  <span className="font-bold text-blue-700">₹6,20,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">Escrow Locked</span>
                  <span className="font-bold text-purple-700">₹4,85,000</span>
                </div>
                <Button className="w-full" variant="outline">
                  Request Lender Approval
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-panel border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Quote approved by Stone Craft LLC</p>
                    <p className="text-xs text-stone-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">FX rate locked for NYC deal</p>
                    <p className="text-xs text-stone-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Escrow triggered for Premium Stones</p>
                    <p className="text-xs text-stone-500">6 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="slabs">
            <Card className="glass-panel border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-stone-600" />
                  <span>Slabs for Sale</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {slabData.map((slab) => (
                    <Card key={slab.id} className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <img 
                          src={slab.image} 
                          alt={slab.type}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-stone-900 mb-1">{slab.type}</h3>
                        <p className="text-sm text-stone-600 mb-2">ID: {slab.id}</p>
                        <p className="text-lg font-bold text-emerald-600 mb-2">{slab.price}</p>
                        <p className="text-sm text-stone-500 mb-3">{slab.location}</p>
                        <Badge 
                          className={slab.available ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}
                        >
                          {slab.available ? 'Available' : 'Sold'}
                        </Badge>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="emerald-gradient text-white">
                            <Send className="w-4 h-4 mr-1" />
                            Send
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buyers">
            <Card className="glass-panel border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Active Buyer Deals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeBuyers.map((buyer, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-stone-900">{buyer.name}</h3>
                          <p className="text-sm text-stone-600">{buyer.location}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm">Quote: <strong>{buyer.quoteValue}</strong></span>
                            <span className="text-sm">Credit: <strong>{buyer.creditRequested}</strong></span>
                            <Badge className={getStatusColor(buyer.status)}>
                              {buyer.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-1" />
                            Invoice
                          </Button>
                          <Button size="sm" variant="outline">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Lock FX
                          </Button>
                          <Button size="sm" className="emerald-gradient text-white">
                            <Lock className="w-4 h-4 mr-1" />
                            Escrow
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-panel border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>Credit Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Total Credit Line</h4>
                    <p className="text-2xl font-bold text-blue-700">₹15,00,000</p>
                    <p className="text-sm text-blue-600">Available: ₹6,50,000</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilized</span>
                      <span>₹8,50,000</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '57%' }}></div>
                    </div>
                  </div>
                  <Button className="w-full">Request Credit Increase</Button>
                </CardContent>
              </Card>

              <Card className="glass-panel border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <span>FX & Escrow</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h4 className="font-semibold text-emerald-900">FX Exposure</h4>
                    <p className="text-sm text-emerald-600">USD exposure: $85,000</p>
                    <p className="text-sm text-emerald-600">EUR exposure: €23,000</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Escrow Status</h4>
                    <p className="text-sm text-purple-600">Active: 3 transactions</p>
                    <p className="text-sm text-purple-600">Pending release: ₹4,85,000</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Hedge FX</Button>
                    <Button variant="outline" size="sm">Release Escrow</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TraderDashboard;
