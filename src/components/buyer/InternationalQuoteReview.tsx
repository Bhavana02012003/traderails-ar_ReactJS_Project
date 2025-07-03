
import { useState } from 'react';
import { ArrowLeft, MessageSquare, Phone, Eye, Box, Clock, MapPin, DollarSign, FileText, CheckCircle, XCircle, Edit3, Info, Globe, Calendar, Truck, CreditCard, Shield, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InternationalQuoteReviewProps {
  onBack: () => void;
}

const InternationalQuoteReview = ({ onBack }: InternationalQuoteReviewProps) => {
  const [buyerComments, setBuyerComments] = useState('');
  const [selectedAction, setSelectedAction] = useState<'accept' | 'negotiate' | 'decline' | null>(null);

  // Mock quote data with international features
  const quote = {
    id: 'Q-01824',
    sentDate: 'June 30, 2025',
    validTill: 'July 5, 2025',
    seller: {
      name: 'Shivani Granites',
      location: 'Rajasthan, India',
      contact: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      type: 'Independent Trader',
      timeZone: 'Asia/Kolkata',
      localTime: '2:30 PM IST'
    },
    buyer: {
      location: 'Los Angeles, USA',
      timeZone: 'America/Los_Angeles',
      localTime: '2:00 AM PST',
      currency: 'USD',
      preferredLanguage: 'en-US'
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
      }
    ],
    shipping: {
      fromPort: 'JNPT, Mumbai',
      toPort: 'Port of Los Angeles',
      incoterms: 'CIF',
      incotermDefinition: 'Cost, Insurance and Freight - Seller pays for shipping and insurance to destination port',
      leadTime: '4-6 weeks',
      freight: 850.00,
      transitTime: '18-22 days',
      shippingLine: 'Maersk Line'
    },
    payment: {
      terms: '30% upfront, 70% before shipment',
      currency: 'USD',
      creditTerms: 'Net 30 days with approved credit facility',
      creditTermsDefinition: 'Payment due within 30 days of invoice date for pre-approved buyers',
      paymentMethods: ['Wire Transfer', 'Letter of Credit', 'Trade Finance']
    },
    totals: {
      slabsSubtotal: 4500.75,
      freight: 850.00,
      insurance: 135.00,
      total: 5485.75,
      localCurrency: {
        code: 'USD',
        symbol: '$',
        total: 5485.75
      },
      sellerCurrency: {
        code: 'INR',
        symbol: '₹',
        total: 457636.13,
        rate: 83.45
      }
    },
    timeZoneInfo: {
      sellerTime: '2:30 PM IST (GMT+5:30)',
      buyerTime: '2:00 AM PST (GMT-8)',
      timeDifference: '+13.5 hours ahead'
    }
  };

  const formatCurrency = (amount: number, currencyCode: string, locale: string = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatLocalTime = (timeZone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }).format(new Date());
  };

  const handleAction = (action: 'accept' | 'negotiate' | 'decline') => {
    setSelectedAction(action);
    console.log(`Quote ${action}ed with comments:`, buyerComments);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30 font-['Sora']">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header with International Context */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={onBack} className="text-stone-600 hover:text-stone-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-stone-300" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-stone-900">International Quote Review</h1>
              <div className="flex items-center gap-4 text-sm text-stone-600 mt-1">
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>Cross-border Transaction</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Seller: {formatLocalTime(quote.seller.timeZone)} | Your time: {formatLocalTime(quote.buyer.timeZone)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quote Overview with International Features */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-stone-900 mb-2 flex items-center gap-2">
                        Quote #{quote.id}
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          <Globe className="w-3 h-3 mr-1" />
                          International
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-stone-600">
                        <span>Sent on {quote.sentDate}</span>
                        <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50">
                          <Clock className="w-3 h-3 mr-1" />
                          Expires {quote.validTill}
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
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-stone-500" />
                          <span className="text-sm text-stone-600">{quote.seller.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-stone-500" />
                          <span className="text-xs text-stone-500">
                            Local time: {quote.timeZoneInfo.sellerTime}
                          </span>
                        </div>
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

              {/* Slabs with Enhanced Details */}
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
                        <div className="w-20 h-20 bg-stone-200 rounded-lg flex items-center justify-center overflow-hidden">
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
                              {slab.totalSqft} sqft × {formatCurrency(slab.pricePerSqft, quote.payment.currency)}/sqft
                            </span>
                            <span className="font-semibold text-stone-900">
                              {formatCurrency(slab.totalPrice, quote.payment.currency)}
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

              {/* International Shipping & Terms with Tooltips */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900">
                    <Truck className="w-5 h-5" />
                    International Shipping & Terms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-stone-900 mb-3 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Logistics Details
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-stone-600">Origin Port:</span>
                            <span className="text-stone-900 font-medium">{quote.shipping.fromPort}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-stone-600">Destination Port:</span>
                            <span className="text-stone-900 font-medium">{quote.shipping.toPort}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-stone-600">Shipping Line:</span>
                            <span className="text-stone-900 font-medium">{quote.shipping.shippingLine}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-stone-600">Transit Time:</span>
                            <span className="text-stone-900 font-medium">{quote.shipping.transitTime}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-stone-600">Lead Time:</span>
                            <span className="text-stone-900 font-medium">{quote.shipping.leadTime}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-stone-600 flex items-center gap-1">
                              Incoterms:
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="w-3 h-3 text-blue-500 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p className="text-sm">{quote.shipping.incotermDefinition}</p>
                                </TooltipContent>
                              </Tooltip>
                            </span>
                            <Badge variant="outline" className="text-xs font-medium">
                              {quote.shipping.incoterms}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-stone-900 mb-3 flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Payment Terms
                        </h4>
                        <div className="p-4 bg-amber-50 rounded-lg space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="text-stone-700 text-sm">Standard Terms:</span>
                            <span className="text-stone-900 font-medium text-sm text-right">
                              {quote.payment.terms}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-stone-700 text-sm flex items-center gap-1">
                              Credit Terms:
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="w-3 h-3 text-blue-500 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p className="text-sm">{quote.payment.creditTermsDefinition}</p>
                                </TooltipContent>
                              </Tooltip>
                            </span>
                            <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                              Available
                            </Badge>
                          </div>
                          <div className="pt-2 border-t border-amber-200">
                            <p className="text-xs text-stone-600">
                              *TradeRails financing available - no additional cost to buyer
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Multi-Currency Exchange Info */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900">
                    <Banknote className="w-5 h-5" />
                    Currency Exchange Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">Your Currency (USD)</h5>
                      <p className="text-2xl font-bold text-blue-900">
                        {formatCurrency(quote.totals.localCurrency.total, quote.totals.localCurrency.code)}
                      </p>
                      <p className="text-sm text-blue-700 mt-1">Final amount you pay</p>
                    </div>
                    <div className="p-4 bg-stone-50 rounded-lg">
                      <h5 className="font-medium text-stone-700 mb-2">Seller Currency (INR)</h5>
                      <p className="text-2xl font-bold text-stone-900">
                        {formatCurrency(quote.totals.sellerCurrency.total, quote.totals.sellerCurrency.code, 'en-IN')}
                      </p>
                      <p className="text-sm text-stone-600 mt-1">
                        Exchange Rate: {quote.totals.sellerCurrency.rate} INR/USD
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">FX Protection Available</p>
                        <p className="text-xs text-amber-700 mt-1">
                          Lock in current exchange rate to protect against currency fluctuations
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Multi-Currency Pricing Summary */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900">
                    <DollarSign className="w-5 h-5" />
                    International Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Slabs Subtotal:</span>
                      <span className="text-stone-900">
                        {formatCurrency(quote.totals.slabsSubtotal, quote.payment.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600 flex items-center gap-1">
                        Ocean Freight:
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-3 h-3 text-blue-500 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">Cost of shipping from origin to destination port</p>
                          </TooltipContent>
                        </Tooltip>
                      </span>
                      <span className="text-stone-900">
                        {formatCurrency(quote.totals.freight, quote.payment.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Marine Insurance:</span>
                      <span className="text-stone-900">
                        {formatCurrency(quote.totals.insurance, quote.payment.currency)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-stone-900">Total ({quote.payment.currency}):</span>
                      <span className="text-stone-900">
                        {formatCurrency(quote.totals.total, quote.payment.currency)}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 space-y-1">
                      <p>≈ {formatCurrency(quote.totals.sellerCurrency.total, quote.totals.sellerCurrency.code, 'en-IN')} (Seller receives)</p>
                      <p>Rate: 1 USD = {quote.totals.sellerCurrency.rate} INR</p>
                    </div>
                  </div>

                  <Separator />

                  {/* International Action Buttons */}
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

                  {/* Buyer Comments */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-900">
                      Your Comments (Optional)
                    </label>
                    <Textarea
                      placeholder="Add questions about shipping, quality, or payment terms..."
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
                        The seller has been notified via email and WhatsApp.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Time Zone Comparison */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900">
                    <Clock className="w-5 h-5" />
                    Time Zones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Your Time</p>
                    <p className="text-lg font-bold text-blue-900">
                      {formatLocalTime(quote.buyer.timeZone)}
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="text-sm font-medium text-amber-900">Seller Time</p>
                    <p className="text-lg font-bold text-amber-900">
                      {formatLocalTime(quote.seller.timeZone)}
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      {quote.timeZoneInfo.timeDifference}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default InternationalQuoteReview;
