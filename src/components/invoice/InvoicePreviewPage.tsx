
import { useState } from 'react';
import { Download, Send, Share2, FileText, Shield, Package, CheckCircle, Eye, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const InvoicePreviewPage = () => {
  const [viewMode, setViewMode] = useState<'preview' | 'print'>('preview');

  // Mock invoice data
  const invoiceData = {
    invoiceNumber: 'INV-2024-00108',
    dateIssued: '2025-06-28',
    linkedQuote: 'Q-02837',
    status: 'pending_payment' as const,
    
    exporter: {
      name: 'Shivani Granites Pvt Ltd',
      address: 'Plot 142, Industrial Area Phase-II, Jaipur, Rajasthan 302013',
      gstin: '08AABCS1681G1ZF',
      iec: '0306002345',
      pan: 'AABCS1681G',
      phone: '+91 98765 43210',
      email: 'exports@shivanigrantes.com'
    },
    
    buyer: {
      name: 'Rohan Imports Ltd',
      address: '1247 Broadway, New York, NY 10001, USA',
      country: 'United States',
      orgId: 'ORG-US-4521',
      phone: '+1 (555) 123-4567',
      email: 'purchasing@rohanimports.com'
    },
    
    shipping: {
      portOfLoading: 'Kandla Port, Gujarat, India',
      portOfDischarge: 'Port of New York, NY, USA',
      shippingTerms: 'FOB' as const
    },
    
    items: [
      {
        blockId: 'BLK-8723',
        stoneType: 'Black Galaxy',
        finish: 'Polished',
        quantity: 12,
        unit: 'Slabs',
        rateInr: 7200,
        totalInr: 86400
      },
      {
        blockId: 'BLK-8724',
        stoneType: 'Absolute Black',
        finish: 'Honed',
        quantity: 8,
        unit: 'Slabs',
        rateInr: 6800,
        totalInr: 54400
      },
      {
        blockId: 'BLK-8725',
        stoneType: 'Steel Grey',
        finish: 'Polished',
        quantity: 15,
        unit: 'Slabs',
        rateInr: 5900,
        totalInr: 88500
      }
    ],
    
    totals: {
      subtotal: 229300,
      gst: 41274, // 18% GST
      freight: 15000,
      total: 285574
    },
    
    payment: {
      terms: '60 days',
      method: 'Escrow',
      fxRate: 83.40,
      fxAmount: 3425, // USD equivalent
      creditProvider: 'LendSure India'
    },
    
    attachments: [
      { name: 'Accepted Quote PDF', type: 'quote', verified: true },
      { name: 'KYC Verification', type: 'kyc', verified: true },
      { name: 'Packing List & Slab Manifest', type: 'packing', verified: false },
      { name: 'Buyer Acceptance Screenshot', type: 'acceptance', verified: true }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_payment':
        return (
          <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50">
            Pending Payment
          </Badge>
        );
      case 'financed':
        return (
          <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
            Financed
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number, currency: 'INR' | 'USD' = 'INR') => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount.toLocaleString('en-US')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-slate-50 font-sora">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6 bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant={viewMode === 'preview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('preview')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              variant={viewMode === 'print' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('print')}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print View
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <Send className="w-4 h-4 mr-2" />
              Send to Buyer
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share with Lender
            </Button>
          </div>
        </div>

        {/* Invoice Document */}
        <Card className={`bg-white shadow-lg ${viewMode === 'print' ? 'print:shadow-none' : ''}`}>
          <CardContent className="p-8">
            {/* Watermark Background */}
            <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic3RvbmUtdGV4dHVyZSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIzIiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RvbmUtdGV4dHVyZSkiLz48L3N2Zz4=')] pointer-events-none"></div>
            
            {/* Header Section */}
            <div className="relative mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-stone-900 mb-2">INVOICE</h1>
                  <div className="space-y-1 text-stone-700">
                    <p className="text-lg font-semibold">#{invoiceData.invoiceNumber}</p>
                    <p>Date Issued: {formatDate(invoiceData.dateIssued)}</p>
                    <p>Linked Quote: #{invoiceData.linkedQuote}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="mb-4">
                    {getStatusBadge(invoiceData.status)}
                  </div>
                  <div className="text-sm text-stone-600">
                    <p>Generated via</p>
                    <p className="font-semibold text-stone-900">TradeRails.ai</p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
            </div>

            {/* Exporter & Buyer Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Exporter Details */}
              <div>
                <h3 className="text-lg font-semibold text-stone-900 mb-3">From (Exporter)</h3>
                <div className="bg-stone-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-stone-900 mb-2">{invoiceData.exporter.name}</h4>
                  <div className="space-y-1 text-sm text-stone-700">
                    <p>{invoiceData.exporter.address}</p>
                    <p>GSTIN: {invoiceData.exporter.gstin}</p>
                    <p>IEC: {invoiceData.exporter.iec}</p>
                    <p>PAN: {invoiceData.exporter.pan}</p>
                    <p>Phone: {invoiceData.exporter.phone}</p>
                    <p>Email: {invoiceData.exporter.email}</p>
                  </div>
                </div>
              </div>

              {/* Buyer Details */}
              <div>
                <h3 className="text-lg font-semibold text-stone-900 mb-3">To (Buyer)</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-stone-900 mb-2">{invoiceData.buyer.name}</h4>
                  <div className="space-y-1 text-sm text-stone-700">
                    <p>{invoiceData.buyer.address}</p>
                    <p>Country: {invoiceData.buyer.country}</p>
                    <p>Org ID: {invoiceData.buyer.orgId}</p>
                    <p>Phone: {invoiceData.buyer.phone}</p>
                    <p>Email: {invoiceData.buyer.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-stone-900 mb-3">Shipping Details</h3>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-stone-700">Port of Loading</p>
                    <p className="text-stone-900">{invoiceData.shipping.portOfLoading}</p>
                  </div>
                  <div>
                    <p className="font-medium text-stone-700">Port of Discharge</p>
                    <p className="text-stone-900">{invoiceData.shipping.portOfDischarge}</p>
                  </div>
                  <div>
                    <p className="font-medium text-stone-700">Terms</p>
                    <p className="text-stone-900">{invoiceData.shipping.shippingTerms}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Items</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-stone-100">
                      <TableHead className="font-semibold">Block ID</TableHead>
                      <TableHead className="font-semibold">Stone Type</TableHead>
                      <TableHead className="font-semibold">Finish</TableHead>
                      <TableHead className="font-semibold text-center">Quantity</TableHead>
                      <TableHead className="font-semibold text-right">Rate (INR)</TableHead>
                      <TableHead className="font-semibold text-right">Total (INR)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoiceData.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.blockId}</TableCell>
                        <TableCell>{item.stoneType}</TableCell>
                        <TableCell>{item.finish}</TableCell>
                        <TableCell className="text-center">{item.quantity} {item.unit}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.rateInr)}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(item.totalInr)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-full max-w-md">
                <div className="bg-stone-50 p-6 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-stone-700">Subtotal:</span>
                      <span className="font-medium">{formatCurrency(invoiceData.totals.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-700">GST (18%):</span>
                      <span className="font-medium">{formatCurrency(invoiceData.totals.gst)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-700">Freight:</span>
                      <span className="font-medium">{formatCurrency(invoiceData.totals.freight)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount Payable:</span>
                      <span>{formatCurrency(invoiceData.totals.total)}</span>
                    </div>
                    <div className="text-sm text-stone-600 text-right">
                      USD Equivalent: {formatCurrency(invoiceData.payment.fxAmount, 'USD')} @ ₹{invoiceData.payment.fxRate}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Credit Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Payment & Credit Terms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-medium text-stone-900 mb-2">Payment Terms</h4>
                  <div className="space-y-1 text-sm text-stone-700">
                    <p>Payment Due: {invoiceData.payment.terms}</p>
                    <p>Method: Via {invoiceData.payment.method}</p>
                    <p>FX Rate Locked: USD @ ₹{invoiceData.payment.fxRate}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-stone-900 mb-2">Credit Information</h4>
                  <div className="space-y-1 text-sm text-stone-700">
                    <p>Credit Provider: {invoiceData.payment.creditProvider}</p>
                    <p>Financing Available: Yes</p>
                    <Button variant="link" className="p-0 h-auto text-sm text-blue-600">
                      View Credit Summary →
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Attachments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {invoiceData.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                    <div className="flex-shrink-0">
                      <FileText className="w-5 h-5 text-stone-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-900 truncate">{attachment.name}</p>
                      <p className="text-xs text-stone-500 capitalize">{attachment.type}</p>
                    </div>
                    {attachment.verified && (
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-stone-200 pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-stone-900 mb-2">Bank Details for Remittance</h4>
                  <div className="text-sm text-stone-700 space-y-1">
                    <p>Bank: State Bank of India</p>
                    <p>Account Name: Shivani Granites Pvt Ltd</p>
                    <p>Account No: 1234567890123</p>
                    <p>SWIFT Code: SBININBB104</p>
                    <p>IFSC: SBIN0001234</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-stone-900 mb-2">Legal Disclaimers</h4>
                  <div className="text-xs text-stone-600 space-y-1">
                    <p>• This invoice is auto-generated and digitally verified</p>
                    <p>• All stone quality as per agreed specifications</p>
                    <p>• Disputes subject to Indian Arbitration laws</p>
                    <p>• Platform fees and charges apply as per T&C</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-stone-600">Digitally Signed & Platform Verified</span>
                </div>
                <div className="text-sm text-stone-500">
                  Auto-generated via TradeRails.ai on {formatDate(invoiceData.dateIssued)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoicePreviewPage;
