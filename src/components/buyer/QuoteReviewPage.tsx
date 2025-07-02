import { useState } from 'react';
import { ArrowLeft, MessageSquare, Phone, Eye, Box, Clock, MapPin, DollarSign, FileText, CheckCircle, XCircle, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface QuoteReviewPageProps {
  onBack: () => void;
}

const QuoteReviewPage = ({ onBack }: QuoteReviewPageProps) => {
  const [buyerComments, setBuyerComments] = useState('');
  const [selectedAction, setSelectedAction] = useState<'accept' | 'negotiate' | 'decline' | null>(null);

  // Mock quote data
  const quote = {
    id: 'Q-01824',
    sentDate: 'June 30, 2025',
    validTill: 'July 5, 2025',
    seller: {
      name: 'Shivani Granites',
      location: 'Rajasthan, India',
      contact: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      type: 'Independent Trader'
    },
    slabs: [
      {
        id: 'SL001',
        blockId: 'BLK-4472',
        name: 'Absolute Black Granite',
        finish: 'Polished',
        dimensions: '120" x 75" x 3cm',
        quantity: 3,
        pricePerSqft: 12.50,
        totalSqft: 187.5,
        totalPrice: 2343.75,
        thumbnail: '/placeholder.svg'
      },
      {
        id: 'SL002',
        blockId: 'BLK-4473',
        name: 'Kashmir White Granite',
        finish: 'Leathered',
        dimensions: '126" x 78" x 2cm',
        quantity: 2,
        pricePerSqft: 15.80,
        totalSqft: 136.5,
        totalPrice: 2157.00,
        thumbnail: '/placeholder.svg'
      },
      {
        id: 'SL003',
        blockId: 'BLK-4474',
        name: 'Imperial Red Granite',
        finish: 'Flamed',
        dimensions: '118" x 72" x 3cm',
        quantity: 3,
        pricePerSqft: 18.25,
        totalSqft: 179.0,
        totalPrice: 3267.25,
        thumbnail: '/placeholder.svg'
      }
    ],
    shipping: {
      fromPort: 'JNPT, Mumbai',
      toPort: 'Port of Los Angeles',
      incoterms: 'CIF',
      leadTime: '4-6 weeks',
      freight: 850.00
    },
    payment: {
      terms: '30% upfront, 70% before shipment',
      currency: 'USD'
    },
    totals: {
      slabsSubtotal: 7768.00,
      freight: 850.00,
      total: 8618.00,
      inrTotal: 719509.40,
      fxRate: 83.45
    }
  };

  const handleAction = (action: 'accept' | 'negotiate' | 'decline') => {
    setSelectedAction(action);
    // Here you would typically make an API call
    console.log(`Quote ${action}ed with comments:`, buyerComments);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30 font-['Sora']">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="text-stone-600 hover:text-stone-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="h-6 w-px bg-stone-300" />
          <h1 className="text-2xl font-bold text-stone-900">Quote Review</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quote Overview */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-stone-900 mb-2">
                      Quote #{quote.id}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-stone-600">
                      <span>Sent on {quote.sentDate}</span>
                      <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50">
                        <Clock className="w-3 h-3 mr-1" />
                        Valid till {quote.validTill}
                      </Badge>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {quote.seller.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900">{quote.seller.name}</h3>
                      <p className="text-sm text-stone-600">{quote.seller.location}</p>
                      <p className="text-xs text-amber-700 font-medium">{quote.seller.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-emerald-700 border-emerald-200">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Slab Summary */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-stone-900">
                  <Box className="w-5 h-5" />
                  Quoted Slabs ({quote.slabs.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quote.slabs.map((slab) => (
                    <div key={slab.id} className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                      <div className="w-16 h-16 bg-stone-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <img src={slab.thumbnail} alt={slab.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-stone-900">{slab.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-stone-600 mt-1">
                          <span>Block: {slab.blockId}</span>
                          <span>Finish: {slab.finish}</span>
                          <span>Size: {slab.dimensions}</span>
                          <span>Qty: {slab.quantity} pcs</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-stone-600">
                            {slab.totalSqft} sqft × ${slab.pricePerSqft}/sqft
                          </span>
                          <span className="font-semibold text-stone-900">
                            ${slab.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="text-amber-700 border-amber-200">
                          <Eye className="w-4 h-4 mr-1" />
                          View 3D
                        </Button>
                        <Button variant="outline" size="sm" className="text-emerald-700 border-emerald-200">
                          AR View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Terms */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-stone-900">
                  <MapPin className="w-5 h-5" />
                  Shipping & Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-stone-900 mb-2">Shipping Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-stone-600">From Port:</span>
                          <span className="text-stone-900">{quote.shipping.fromPort}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">To Port:</span>
                          <span className="text-stone-900">{quote.shipping.toPort}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Incoterms:</span>
                          <Badge variant="outline" className="text-xs">{quote.shipping.incoterms}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Lead Time:</span>
                          <span className="text-stone-900">{quote.shipping.leadTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-stone-900 mb-2">Payment Terms</h4>
                      <div className="p-3 bg-amber-50 rounded-lg text-sm">
                        <p className="text-stone-900">{quote.payment.terms}</p>
                        <p className="text-xs text-stone-600 mt-1">
                          *Pricing includes financing and FX backend — no added cost to buyer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exporter Notes */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-stone-900">
                  <FileText className="w-5 h-5" />
                  Exporter Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-700 leading-relaxed">
                  Premium quality slabs from our verified quarries. All pieces have been quality checked and are ready for immediate shipment. We guarantee consistent color matching across all slabs from the same block.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Summary */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-stone-900">
                  <DollarSign className="w-5 h-5" />
                  Total Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Slabs Subtotal:</span>
                    <span className="text-stone-900">${quote.totals.slabsSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Freight (CIF):</span>
                    <span className="text-stone-900">${quote.totals.freight.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-stone-900">Total USD:</span>
                    <span className="text-stone-900">${quote.totals.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Total INR:</span>
                    <span>₹{quote.totals.inrTotal.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-stone-500">
                    *Exchange rate: ₹{quote.totals.fxRate}/USD
                  </p>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleAction('accept')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    disabled={selectedAction !== null}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept Quote
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleAction('negotiate')}
                      className="text-amber-700 border-amber-200 hover:bg-amber-50"
                      disabled={selectedAction !== null}
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Negotiate
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleAction('decline')}
                      className="text-red-700 border-red-200 hover:bg-red-50"
                      disabled={selectedAction !== null}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-900">
                    Your Comments (Optional)
                  </label>
                  <Textarea
                    placeholder="Add any questions or comments for the seller..."
                    value={buyerComments}
                    onChange={(e) => setBuyerComments(e.target.value)}
                    className="min-h-[80px] resize-none"
                    disabled={selectedAction !== null}
                  />
                </div>

                {selectedAction && (
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <p className="text-sm text-emerald-800 font-medium">
                      Quote {selectedAction}ed successfully!
                    </p>
                    <p className="text-xs text-emerald-700 mt-1">
                      The seller has been notified.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quote Timeline */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-stone-900">Quote Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <div className="text-sm">
                      <p className="text-stone-900 font-medium">Quote Sent</p>
                      <p className="text-stone-600">June 30, 2025 at 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    <div className="text-sm">
                      <p className="text-stone-900 font-medium">Viewed by Buyer</p>
                      <p className="text-stone-600">Now</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-stone-300 rounded-full" />
                    <div className="text-sm">
                      <p className="text-stone-500">Awaiting Response</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteReviewPage;
