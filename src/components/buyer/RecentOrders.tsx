import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronRight, Eye, Truck, Shield, CreditCard, Search, Filter, ArrowUpDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface RecentOrdersProps {
  expanded?: boolean;
  onFinancialWorkflow?: (orderData: {
    invoiceId: string;
    amount: { inr: string; usd: string };
    buyer: string;
    status: 'approved' | 'pending' | 'rejected';
  }) => void;
  onTrackShipment?: (shipmentId: string) => void;
}

const RecentOrders = ({ expanded = false, onFinancialWorkflow, onTrackShipment }: RecentOrdersProps) => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'value' | 'exporter'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 4;

  const orders = [
    {
      id: 'INV-2024-0156',
      exporter: 'StoneX International',
      slabSummary: '24x Carrara White Quartz',
      status: 'In Transit',
      statusColor: 'bg-blue-100 text-blue-800',
      deliveryDate: 'Dec 15, 2024',
      escrowAmount: '$125,000',
      fxLocked: true,
      buyer: 'Rohan Marble Imports (NY, USA)',
      amount: {
        inr: "₹18,45,000",
        usd: "USD $22,100"
      },
      workflowStatus: 'approved' as const,
      timeline: [
        { step: 'Order Placed', completed: true, date: 'Nov 20' },
        { step: 'Factory QC', completed: true, date: 'Nov 25' },
        { step: 'Shipped', completed: true, date: 'Dec 1' },
        { step: 'In Transit', completed: true, date: 'Dec 5' },
        { step: 'Delivered', completed: false, date: 'Dec 15' }
      ]
    },
    {
      id: 'INV-2024-0148',
      exporter: 'Granite Masters Ltd',
      slabSummary: '18x Nero Marquina Granite',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800',
      deliveryDate: 'Completed',
      escrowAmount: '$89,500',
      fxLocked: true,
      buyer: 'Premium Stone Trading Co. (Dubai, UAE)',
      amount: {
        inr: "₹12,35,000",
        usd: "USD $14,800"
      },
      workflowStatus: 'approved' as const,
      timeline: [
        { step: 'Order Placed', completed: true, date: 'Oct 15' },
        { step: 'Factory QC', completed: true, date: 'Oct 20' },
        { step: 'Shipped', completed: true, date: 'Oct 28' },
        { step: 'In Transit', completed: true, date: 'Nov 5' },
        { step: 'Delivered', completed: true, date: 'Nov 12' }
      ]
    },
    {
      id: 'INV-2024-0142',
      exporter: 'Premium Stone Co',
      slabSummary: '36x Calacatta Gold Marble',
      status: 'Booked',
      statusColor: 'bg-yellow-100 text-yellow-800',
      deliveryDate: 'Jan 10, 2025',
      escrowAmount: '$245,000',
      fxLocked: false,
      buyer: 'Marble Palace Inc. (Los Angeles, USA)',
      amount: {
        inr: "₹32,80,000",
        usd: "USD $39,300"
      },
      workflowStatus: 'pending' as const,
      timeline: [
        { step: 'Order Placed', completed: true, date: 'Dec 1' },
        { step: 'Factory QC', completed: false, date: 'Dec 12' },
        { step: 'Shipped', completed: false, date: 'Dec 20' },
        { step: 'In Transit', completed: false, date: 'Dec 28' },
        { step: 'Delivered', completed: false, date: 'Jan 10' }
      ]
    },
    {
      id: 'INV-2024-0141',
      exporter: 'Marble World Ltd',
      slabSummary: '12x Statuario Marble',
      status: 'Processing',
      statusColor: 'bg-orange-100 text-orange-800',
      deliveryDate: 'Jan 20, 2025',
      escrowAmount: '$178,000',
      fxLocked: true,
      buyer: 'Luxury Stone Co (London, UK)',
      amount: {
        inr: "₹24,50,000",
        usd: "USD $29,400"
      },
      workflowStatus: 'pending' as const,
      timeline: [
        { step: 'Order Placed', completed: true, date: 'Nov 28' },
        { step: 'Factory QC', completed: false, date: 'Dec 10' },
        { step: 'Shipped', completed: false, date: 'Dec 18' },
        { step: 'In Transit', completed: false, date: 'Dec 26' },
        { step: 'Delivered', completed: false, date: 'Jan 20' }
      ]
    },
    {
      id: 'INV-2024-0140',
      exporter: 'Stone Craft International',
      slabSummary: '30x Black Galaxy Granite',
      status: 'Shipped',
      statusColor: 'bg-purple-100 text-purple-800',
      deliveryDate: 'Dec 28, 2024',
      escrowAmount: '$198,000',
      fxLocked: true,
      buyer: 'Modern Stone Inc (Toronto, Canada)',
      amount: {
        inr: "₹28,75,000",
        usd: "USD $34,500"
      },
      workflowStatus: 'approved' as const,
      timeline: [
        { step: 'Order Placed', completed: true, date: 'Nov 15' },
        { step: 'Factory QC', completed: true, date: 'Nov 22' },
        { step: 'Shipped', completed: true, date: 'Nov 30' },
        { step: 'In Transit', completed: false, date: 'Dec 8' },
        { step: 'Delivered', completed: false, date: 'Dec 28' }
      ]
    }
  ];

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.exporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.slabSummary.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status.toLowerCase().replace(/\s+/g, '') === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort orders
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          // Using delivery date for sorting
          const dateA = a.deliveryDate === 'Completed' ? new Date('2024-11-12') : new Date(a.deliveryDate);
          const dateB = b.deliveryDate === 'Completed' ? new Date('2024-11-12') : new Date(b.deliveryDate);
          comparison = dateA.getTime() - dateB.getTime();
          break;
        case 'value':
          const valueA = parseFloat(a.escrowAmount.replace(/[$,]/g, ''));
          const valueB = parseFloat(b.escrowAmount.replace(/[$,]/g, ''));
          comparison = valueA - valueB;
          break;
        case 'exporter':
          comparison = a.exporter.localeCompare(b.exporter);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [orders, searchTerm, statusFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredAndSortedOrders.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy, sortOrder]);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleFinancialWorkflowClick = (order: typeof orders[0]) => {
    if (onFinancialWorkflow) {
      onFinancialWorkflow({
        invoiceId: order.id,
        amount: order.amount,
        buyer: order.buyer,
        status: order.workflowStatus
      });
    }
  };

  const handleTrackClick = (orderId: string) => {
    if (onTrackShipment) {
      onTrackShipment(orderId);
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-stone-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-stone-900">Orders ({filteredAndSortedOrders.length})</CardTitle>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('intransit')}>
                  In Transit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('delivered')}>
                  Delivered
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('booked')}>
                  Booked
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('processing')}>
                  Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('shipped')}>
                  Shipped
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy('date')}>
                  Date {sortBy === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('value')}>
                  Value {sortBy === 'value' && (sortOrder === 'desc' ? '↓' : '↑')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('exporter')}>
                  Exporter {sortBy === 'exporter' && (sortOrder === 'desc' ? '↓' : '↑')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                  {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentOrders.length === 0 ? (
          <div className="text-center py-8 text-stone-500">
            No orders found matching your criteria.
          </div>
        ) : (
          currentOrders.map((order) => (
            <div key={order.id} className="border border-stone-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-stone-900">{order.id}</span>
                    <Badge className={order.statusColor}>{order.status}</Badge>
                    {order.fxLocked && (
                      <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                        <Shield className="w-3 h-3 mr-1" />
                        FX Locked
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-stone-600">{order.exporter} · {order.slabSummary}</p>
                  <p className="text-sm text-stone-500">Delivery: {order.deliveryDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTrackClick(order.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Track
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFinancialWorkflowClick(order)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <CreditCard className="w-4 h-4 mr-1" />
                    Workflow
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOrderExpansion(order.id)}
                  >
                    {expandedOrders.includes(order.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {expandedOrders.includes(order.id) && (
                <div className="border-t border-stone-200 pt-3 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Escrow Amount:</span>
                    <span className="font-medium">{order.escrowAmount}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-stone-700">Order Timeline:</p>
                    <div className="flex items-center justify-between">
                      {order.timeline.map((step, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                            step.completed 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'bg-stone-100 border-stone-300 text-stone-400'
                          }`}>
                            {index + 1}
                          </div>
                          <p className="text-xs text-center mt-1 text-stone-600">{step.step}</p>
                          <p className="text-xs text-stone-500">{step.date}</p>
                          {index < order.timeline.length - 1 && (
                            <div className={`h-0.5 w-full mt-2 ${
                              step.completed ? 'bg-emerald-500' : 'bg-stone-200'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage >= totalPages ? 'opacity-50 pointer-events-none' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
