
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
  Building,
  Calendar,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrganizationSwitcher from '@/components/auth/OrganizationSwitcher';

interface TraderDashboardProps {
  onShowInviteFlow?: () => void;
  onOrgDetailsClick?: () => void;
}

// Mock data
const tradeStatuses = [
  { status: 'Quoted', count: 12, color: 'bg-gradient-to-br from-amber-400 to-amber-600', textColor: 'text-amber-900', bgAccent: 'bg-amber-50' },
  { status: 'Approved', count: 8, color: 'bg-gradient-to-br from-blue-400 to-blue-600', textColor: 'text-blue-900', bgAccent: 'bg-blue-50' },
  { status: 'In Production', count: 5, color: 'bg-gradient-to-br from-purple-400 to-purple-600', textColor: 'text-purple-900', bgAccent: 'bg-purple-50' },
  { status: 'Dispatched', count: 3, color: 'bg-gradient-to-br from-emerald-400 to-emerald-600', textColor: 'text-emerald-900', bgAccent: 'bg-emerald-50' }
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
    status: 'pending'
  },
  {
    name: 'Marble Masters Inc',
    location: 'New York, USA',
    quoteValue: '₹5,80,000',
    status: 'approved'
  },
  {
    name: 'Premium Stones Ltd',
    location: 'London, UK',
    quoteValue: '₹1,95,000',
    status: 'production'
  }
];

const paymentHistory = [
  { period: 'Last 1 Month', amount: '₹3,25,000', deals: 8 },
  { period: 'Last 3 Months', amount: '₹8,75,000', deals: 24 },
  { period: 'Last 6 Months', amount: '₹15,40,000', deals: 42 },
  { period: 'Year to Date', amount: '₹28,90,000', deals: 78 }
];

const upcomingPayments = [
  { buyer: 'Stone Craft LLC', amount: '₹2,45,000', dueDate: '15 Dec 2024', status: 'confirmed' },
  { buyer: 'Premium Stones Ltd', amount: '₹1,95,000', dueDate: '22 Dec 2024', status: 'pending' },
  { buyer: 'Global Marbles Inc', amount: '₹4,20,000', dueDate: '28 Dec 2024', status: 'confirmed' }
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
      case 'production': return 'bg-purple-100 text-purple-800';
      case 'confirmed': return 'bg-emerald-100 text-emerald-800';
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

        {/* Enhanced Trade Pipeline Overview */}
        <Card className="glass-panel border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-stone-100 to-emerald-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Trade Pipeline Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {tradeStatuses.map((item, index) => (
                <div key={index} className="relative group">
                  <div className={`p-6 rounded-xl ${item.bgAccent} border-2 border-transparent hover:border-stone-200 transition-all duration-300 hover:shadow-md`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center shadow-md`}>
                        <span className="text-white font-bold text-lg">{item.count}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-2xl font-bold ${item.textColor}`}>{item.count}</span>
                        <p className="text-xs text-stone-500 uppercase tracking-wide">DEALS</p>
                      </div>
                    </div>
                    <h3 className={`font-semibold ${item.textColor} text-center`}>{item.status}</h3>
                    <div className="mt-3 bg-white bg-opacity-50 rounded-lg p-2">
                      <div className={`h-2 ${item.color} rounded-full opacity-60`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pipeline Flow Visualization */}
            <div className="relative mb-8">
              <div className="flex items-center justify-between">
                {tradeStatuses.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {item.count}
                    </div>
                    <span className="text-xs font-medium text-stone-600 mt-2">{item.status}</span>
                  </div>
                ))}
              </div>
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-blue-400 via-purple-400 to-emerald-400 -z-10"></div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button className="emerald-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Send className="w-4 h-4 mr-2" />
                Create Quote
              </Button>
              <Button variant="outline" className="hover:bg-stone-50">
                <Package className="w-4 h-4 mr-2" />
                Check Production Status
              </Button>
              <Button variant="outline" className="hover:bg-stone-50">
                <FileText className="w-4 h-4 mr-2" />
                Track Shipments
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
            <TabsTrigger value="payments" className="px-6 py-3">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Summary */}
            <Card className="glass-panel border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span>Payment Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentHistory.map((period, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">{period.period}</span>
                      <p className="text-xs text-stone-600">{period.deals} deals</p>
                    </div>
                    <span className="font-bold text-emerald-700">{period.amount}</span>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  View Detailed Reports
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
                    <p className="text-sm font-medium">Payment received from Premium Stones</p>
                    <p className="text-xs text-stone-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New slab inquiry from Dubai buyer</p>
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
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Contact
                          </Button>
                          <Button size="sm" className="emerald-gradient text-white">
                            <Send className="w-4 h-4 mr-1" />
                            Finalize
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-panel border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <span>Payment History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentHistory.map((period, index) => (
                    <div key={index} className="p-4 bg-emerald-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-emerald-900">{period.period}</h4>
                        <span className="text-lg font-bold text-emerald-700">{period.amount}</span>
                      </div>
                      <p className="text-sm text-emerald-600">{period.deals} completed deals</p>
                    </div>
                  ))}
                  <Button className="w-full">Download Payment Report</Button>
                </CardContent>
              </Card>

              <Card className="glass-panel border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Upcoming Payments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingPayments.map((payment, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-blue-900">{payment.buyer}</h4>
                          <p className="text-sm text-blue-600">Due: {payment.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-blue-700">{payment.amount}</span>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">View All Pending Payments</Button>
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
