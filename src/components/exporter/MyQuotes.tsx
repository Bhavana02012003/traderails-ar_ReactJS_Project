
import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Plus, Eye, Edit, Copy, Download, X, Calendar, DollarSign, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

interface MyQuotesProps {
  onCreateQuote?: () => void;
  onViewQuote?: (quoteId: string) => void;
  onEditQuote?: (quoteId: string) => void;
}

const MyQuotes = ({ onCreateQuote, onViewQuote, onEditQuote }: MyQuotesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'expiry' | 'buyer'>('newest');
  const itemsPerPage = 6;

  // Mock quotes data
  const allQuotes = [
    {
      id: 'Q-01824',
      buyer: 'Rohan Imports',
      buyerLocation: 'New York, USA',
      slabCount: 12,
      totalValue: 840000,
      currency: '₹',
      quoteDate: '2025-07-01',
      expiryDate: '2025-07-08',
      status: 'pending' as const,
      lastViewed: '2025-07-02 14:30',
      isViewed: true,
      blockId: 'BLK-4021'
    },
    {
      id: 'Q-01823',
      buyer: 'Stone Craft USA',
      buyerLocation: 'California, USA',
      slabCount: 8,
      totalValue: 625000,
      currency: '₹',
      quoteDate: '2025-06-30',
      expiryDate: '2025-07-07',
      status: 'accepted' as const,
      lastViewed: '2025-07-01 09:15',
      isViewed: true,
      blockId: 'BLK-4019'
    },
    {
      id: 'Q-01822',
      buyer: 'Elite Marble Co',
      buyerLocation: 'Texas, USA',
      slabCount: 15,
      totalValue: 1200000,
      currency: '₹',
      quoteDate: '2025-06-28',
      expiryDate: '2025-07-05',
      status: 'revised' as const,
      lastViewed: '2025-06-29 16:45',
      isViewed: true,
      blockId: 'BLK-4017'
    },
    {
      id: 'Q-01821',
      buyer: 'Premium Stones Ltd',
      buyerLocation: 'Florida, USA',
      slabCount: 6,
      totalValue: 450000,
      currency: '₹',
      quoteDate: '2025-06-25',
      expiryDate: '2025-07-02',
      status: 'expired' as const,
      lastViewed: null,
      isViewed: false,
      blockId: 'BLK-4015'
    },
    {
      id: 'Q-01820',
      buyer: 'Metro Stone Works',
      buyerLocation: 'Illinois, USA',
      slabCount: 10,
      totalValue: 750000,
      currency: '₹',
      quoteDate: '2025-06-24',
      expiryDate: '2025-07-01',
      status: 'declined' as const,
      lastViewed: '2025-06-25 11:20',
      isViewed: true,
      blockId: 'BLK-4013'
    },
    {
      id: 'Q-01819',
      buyer: 'Luxury Marble Inc',
      buyerLocation: 'Nevada, USA',
      slabCount: 20,
      totalValue: 1800000,
      currency: '₹',
      quoteDate: '2025-06-22',
      expiryDate: '2025-06-29',
      status: 'pending' as const,
      lastViewed: null,
      isViewed: false,
      blockId: 'BLK-4011'
    }
  ];

  // Filter and sort quotes
  const filteredAndSortedQuotes = useMemo(() => {
    let filtered = allQuotes.filter(quote => {
      const matchesSearch = 
        quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.blockId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort quotes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.quoteDate).getTime() - new Date(a.quoteDate).getTime();
        case 'oldest':
          return new Date(a.quoteDate).getTime() - new Date(b.quoteDate).getTime();
        case 'expiry':
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
        case 'buyer':
          return a.buyer.localeCompare(b.buyer);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allQuotes, searchTerm, statusFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedQuotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQuotes = filteredAndSortedQuotes.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = allQuotes.length;
    const accepted = allQuotes.filter(q => q.status === 'accepted').length;
    const pending = allQuotes.filter(q => q.status === 'pending').length;
    const acceptedQuotes = allQuotes.filter(q => q.status === 'accepted');
    
    // Calculate average time to accept (mock calculation)
    const avgTimeToAccept = acceptedQuotes.length > 0 ? 1.8 : 0;
    
    return { total, accepted, pending, avgTimeToAccept };
  }, [allQuotes]);

  const getStatusBadge = (status: string) => {
    const baseClasses = "text-xs font-medium";
    
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className={`${baseClasses} text-amber-700 border-amber-200 bg-amber-50`}>
            Pending
          </Badge>
        );
      case 'accepted':
        return (
          <Badge variant="outline" className={`${baseClasses} text-emerald-700 border-emerald-200 bg-emerald-50`}>
            Accepted
          </Badge>
        );
      case 'declined':
        return (
          <Badge variant="outline" className={`${baseClasses} text-red-700 border-red-200 bg-red-50`}>
            Declined
          </Badge>
        );
      case 'revised':
        return (
          <Badge variant="outline" className={`${baseClasses} text-blue-700 border-blue-200 bg-blue-50`}>
            Revised
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className={`${baseClasses} text-stone-700 border-stone-200 bg-stone-50`}>
            Expired
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === '₹') {
      // Convert to lakhs for Indian currency
      const lakhs = amount / 100000;
      return `₹${lakhs.toFixed(1)}L`;
    }
    return `${currency}${amount.toLocaleString()}`;
  };

  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays > 0;
  };

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-stone-600" />
              <div>
                <p className="text-2xl font-bold text-stone-900">{stats.total}</p>
                <p className="text-sm text-stone-600">Total Quotes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-2xl font-bold text-emerald-700">{stats.accepted}</p>
                <p className="text-sm text-stone-600">Accepted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <div>
                <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
                <p className="text-sm text-stone-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-700">{stats.avgTimeToAccept}d</p>
                <p className="text-sm text-stone-600">Avg Accept Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-stone-900">My Quotes ({filteredAndSortedQuotes.length})</CardTitle>
            <Button onClick={onCreateQuote} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Quote
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
              <Input
                placeholder="Search by buyer, quote ID, or block ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
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
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('accepted')}>
                  Accepted
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('revised')}>
                  Revised
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('declined')}>
                  Declined
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('expired')}>
                  Expired
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy('newest')}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('oldest')}>
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('expiry')}>
                  Expiry Date
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('buyer')}>
                  Buyer Name
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardContent>
          {currentQuotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-12 h-12 text-stone-400" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-2">No quotes found</h3>
              <p className="text-stone-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Start by selecting slabs from your stock and send a quote to your buyers.'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button onClick={onCreateQuote} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Quote
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentQuotes.map((quote) => (
                <div 
                  key={quote.id}
                  className={`p-6 rounded-lg border transition-all hover:shadow-md ${
                    quote.status === 'pending' ? 'bg-amber-50/50 border-amber-200' :
                    quote.status === 'accepted' ? 'bg-emerald-50/50 border-emerald-200' :
                    quote.status === 'declined' ? 'bg-red-50/50 border-red-200' :
                    quote.status === 'revised' ? 'bg-blue-50/50 border-blue-200' :
                    'bg-stone-50 border-stone-200'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-stone-900">#{quote.id}</h3>
                        {getStatusBadge(quote.status)}
                        {isExpiringSoon(quote.expiryDate) && quote.status === 'pending' && (
                          <Badge variant="outline" className="text-xs text-orange-700 border-orange-200 bg-orange-50">
                            Expires Soon
                          </Badge>
                        )}
                        {!quote.isViewed && quote.status === 'pending' && (
                          <Badge variant="outline" className="text-xs text-gray-700 border-gray-200 bg-gray-50">
                            Not Viewed
                          </Badge>
                        )}
                      </div>
                      <p className="font-medium text-stone-900">{quote.buyer}</p>
                      <p className="text-sm text-stone-600">{quote.buyerLocation}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-stone-900">
                        {formatCurrency(quote.totalValue, quote.currency)}
                      </p>
                      <p className="text-sm text-stone-600">{quote.slabCount} slabs</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Quote Date:</span>
                      <span className="text-stone-900">{formatDate(quote.quoteDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Expires:</span>
                      <span className="text-stone-900">{formatDate(quote.expiryDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Block ID:</span>
                      <span className="text-stone-900">{quote.blockId}</span>
                    </div>
                    {quote.lastViewed && (
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600">Last Viewed:</span>
                        <span className="text-stone-900">{quote.lastViewed}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewQuote?.(quote.id)}
                      className="flex-1 min-w-0"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    {(quote.status === 'pending' || quote.status === 'declined') && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onEditQuote?.(quote.id)}
                        className="flex-1 min-w-0"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-1" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                    {quote.status === 'pending' && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
};

export default MyQuotes;
