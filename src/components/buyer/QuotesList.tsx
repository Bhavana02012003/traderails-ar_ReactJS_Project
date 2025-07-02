
import { useState } from 'react';
import { Eye, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface QuotesListProps {
  onViewQuote: (quoteId: string) => void;
}

const QuotesList = ({ onViewQuote }: QuotesListProps) => {
  // Mock quotes data
  const quotes = [
    {
      id: 'Q-01824',
      seller: 'Shivani Granites',
      location: 'Rajasthan, India',
      sentDate: '2025-06-30',
      validTill: '2025-07-05',
      status: 'pending' as const,
      totalValue: 8618.00,
      slabCount: 3,
      urgent: false
    },
    {
      id: 'Q-01823',
      seller: 'Marble Masters Ltd',
      location: 'Haryana, India',
      sentDate: '2025-06-28',
      validTill: '2025-07-03',
      status: 'accepted' as const,
      totalValue: 12750.00,
      slabCount: 5,
      urgent: false
    },
    {
      id: 'Q-01822',
      seller: 'Stone Craft Exports',
      location: 'Gujarat, India',
      sentDate: '2025-06-25',
      validTill: '2025-07-01',
      status: 'expired' as const,
      totalValue: 5200.00,
      slabCount: 2,
      urgent: true
    },
    {
      id: 'Q-01821',
      seller: 'Premium Quarries',
      location: 'Tamil Nadu, India',
      sentDate: '2025-06-24',
      validTill: '2025-07-02',
      status: 'negotiating' as const,
      totalValue: 9800.00,
      slabCount: 4,
      urgent: false
    }
  ];

  const getStatusBadge = (status: string, urgent: boolean) => {
    const baseClasses = "text-xs font-medium";
    
    if (urgent && status === 'expired') {
      return (
        <Badge variant="destructive" className={baseClasses}>
          <AlertTriangle className="w-3 h-3 mr-1" />
          Expired
        </Badge>
      );
    }
    
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className={`${baseClasses} text-amber-700 border-amber-200 bg-amber-50`}>
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'accepted':
        return (
          <Badge variant="outline" className={`${baseClasses} text-emerald-700 border-emerald-200 bg-emerald-50`}>
            <CheckCircle className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className={`${baseClasses} text-stone-700 border-stone-200 bg-stone-50`}>
            <XCircle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        );
      case 'negotiating':
        return (
          <Badge variant="outline" className={`${baseClasses} text-blue-700 border-blue-200 bg-blue-50`}>
            Negotiating
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

  const isExpiringSoon = (validTill: string) => {
    const today = new Date();
    const expiry = new Date(validTill);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays > 0;
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-stone-900">Recent Quotes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div 
              key={quote.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                quote.status === 'pending' ? 'bg-amber-50/50 border-amber-200' :
                quote.status === 'accepted' ? 'bg-emerald-50/50 border-emerald-200' :
                quote.status === 'expired' ? 'bg-stone-50 border-stone-200' :
                'bg-blue-50/50 border-blue-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-stone-900">#{quote.id}</h3>
                    {getStatusBadge(quote.status, quote.urgent)}
                    {isExpiringSoon(quote.validTill) && quote.status === 'pending' && (
                      <Badge variant="outline" className="text-xs text-orange-700 border-orange-200 bg-orange-50">
                        Expires Soon
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium text-stone-900">{quote.seller}</p>
                  <p className="text-xs text-stone-600">{quote.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-stone-900">${quote.totalValue.toLocaleString()}</p>
                  <p className="text-xs text-stone-600">{quote.slabCount} slabs</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-stone-600">
                  <span>Sent: {formatDate(quote.sentDate)}</span>
                  <span>Valid till: {formatDate(quote.validTill)}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewQuote(quote.id)}
                  className="text-stone-700 hover:text-stone-900"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuotesList;
