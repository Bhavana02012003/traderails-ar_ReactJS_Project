
import { useState } from 'react';
import { Download, Send, Share2, FileText, Shield, CheckCircle, Eye, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const InvoicePreviewPage = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Mock invoice data
  const invoiceData = {
    invoiceNumber: 'TR-2025-0081',
    dateIssued: '2025-06-30',
    linkedQuote: 'Q-02837',
    status: 'pending' as const,
    
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
      name: 'Rohan Imports LLC',
      address: '1247 Broadway, New York, NY 10001, USA',
      country: 'United States',
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
        blockId: 'BL-8203',
        stoneType: 'Black Galaxy',
        finish: 'Polished',
        quantity: 14,
        unit: 'Slabs',
        rateInr: 6800,
        totalInr: 95200
      },
      {
        blockId: 'BL-8204',
        stoneType: 'Absolute Black',
        finish: 'Honed',
        quantity: 8,
        unit: 'Slabs',
        rateInr: 6500,
        totalInr: 52000
      },
      {
        blockId: 'BL-8205',
        stoneType: 'Steel Grey',
        finish: 'Polished',
        quantity: 12,
        unit: 'Slabs',
        rateInr: 5900,
        totalInr: 70800
      }
    ],
    
    totals: {
      subtotal: 218000,
      gst: 39240, // 18% GST
      freight: 15000,
      total: 272240
    },
    
    payment: {
      terms: '60 days',
      method: 'Escrow',
      fxRate: 83.20,
      fxAmount: 3274, // USD equivalent
      creditProvider: 'LendSure Capital'
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
            Approved
          </Badge>
        );
      case 'financed':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
            Financed
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

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Dynamic import to avoid bundle size issues
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = document.getElementById('invoice-content');
      const opt = {
        margin: [10, 15, 10, 15],
        filename: `invoice-${invoiceData.invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-slate-50 font-sora">
      {/* Sticky Action Bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 max-w-5xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold text-stone-900">
                Invoice Preview
              </div>
              {getStatusBadge(invoiceData.status)}
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="bg-white hover:bg-stone-50"
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
              </Button>
              <Button variant="outline" size="sm" className="bg-white hover:bg-stone-50">
                <Send className="w-4 h-4 mr-2" />
                Send to Buyer
              </Button>
              <Button variant="outline" size="sm" className="bg-white hover:bg-stone-50">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Invoice Document */}
        <div 
          id="invoice-content"
          className="bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none print:rounded-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        >
          <div className="relative p-8 print:p-6">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-stone-900">COMMERCIAL INVOICE</h1>
                      <p className="text-stone-600">TradeRails.ai Platform</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-stone-700">
                    <p className="text-xl font-bold">#{invoiceData.invoiceNumber}</p>
                    <p>Date: {formatDate(invoiceData.dateIssued)}</p>
                    <p className="text-sm">Linked Quote: #{invoiceData.linkedQuote}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="mb-4">
                    {getStatusBadge(invoiceData.status)}
                  </div>
                  <div className="text-sm text-stone-600 space-y-1">
                    <p className="font-medium">Export Document</p>
                    <p>Digitally Generated</p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
            </div>

            {/* Seller & Buyer Details Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Exporter Details */}
              <Card className="border-2 border-emerald-100 bg-emerald-50/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-emerald-800">Exporter Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <h4 className="font-bold text-stone-900 text-lg">{invoiceData.exporter.name}</h4>
                  <div className="text-sm text-stone-700 space-y-1">
                    <p>{invoiceData.exporter.address}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <p><span className="font-medium">GSTIN:</span> {invoiceData.exporter.gstin}</p>
                      <p><span className="font-medium">IEC:</span> {invoiceData.exporter.iec}</p>
                      <p><span className="font-medium">PAN:</span> {invoiceData.exporter.pan}</p>
                    </div>
                    <div className="pt-2 border-t border-emerald-200">
                      <p>{invoiceData.exporter.phone}</p>
                      <p>{invoiceData.exporter.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Buyer Details */}
              <Card className="border-2 border-blue-100 bg-blue-50/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-800">Buyer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <h4 className="font-bold text-stone-900 text-lg">{invoiceData.buyer.name}</h4>
                  <div className="text-sm text-stone-700 space-y-1">
                    <p>{invoiceData.buyer.address}</p>
                    <p><span className="font-medium">Country:</span> {invoiceData.buyer.country}</p>
                    <div className="pt-2 border-t border-blue-200">
                      <p>{invoiceData.buyer.phone}</p>
                      <p>{invoiceData.buyer.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shipping Details */}
            <Card className="mb-8 border-stone-200 bg-stone-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Shipping Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-stone-700 mb-1">Port of Loading</p>
                    <p className="text-stone-900">{invoiceData.shipping.portOfLoading}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-700 mb-1">Port of Discharge</p>
                    <p className="text-stone-900">{invoiceData.shipping.portOfDischarge}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-700 mb-1">Terms</p>
                    <p className="text-stone-900 font-medium">{invoiceData.shipping.shippingTerms}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itemized Table */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-stone-900 mb-4">Stone Items</h3>
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-stone-100 hover:bg-stone-100">
                      <TableHead className="font-bold text-stone-900">Block ID</TableHead>
                      <TableHead className="font-bold text-stone-900">Stone Type</TableHead>
                      <TableHead className="font-bold text-stone-900">Finish</TableHead>
                      <TableHead className="font-bold text-stone-900 text-center">Qty</TableHead>
                      <TableHead className="font-bold text-stone-900 text-right">Rate (INR)</TableHead>
                      <TableHead className="font-bold text-stone-900 text-right">Total (INR)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoiceData.items.map((item, index) => (
                      <TableRow key={index} className="hover:bg-stone-50">
                        <TableCell className="font-semibold text-emerald-700">{item.blockId}</TableCell>
                        <TableCell className="font-medium">{item.stoneType}</TableCell>
                        <TableCell>{item.finish}</TableCell>
                        <TableCell className="text-center">{item.quantity} {item.unit}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(item.rateInr)}</TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(item.totalInr)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <Card className="w-full max-w-md border-2 border-stone-200">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-stone-700">
                      <span>Subtotal:</span>
                      <span className="font-semibold">{formatCurrency(invoiceData.totals.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-stone-700">
                      <span>GST (18%):</span>
                      <span className="font-semibold">{formatCurrency(invoiceData.totals.gst)}</span>
                    </div>
                    <div className="flex justify-between text-stone-700">
                      <span>Freight:</span>
                      <span className="font-semibold">{formatCurrency(invoiceData.totals.freight)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold text-stone-900">
                      <span>Total Payable:</span>
                      <span>{formatCurrency(invoiceData.totals.total)}</span>
                    </div>
                    <div className="text-sm text-stone-600 text-right pt-2 border-t border-stone-200">
                      USD Equivalent: {formatCurrency(invoiceData.payment.fxAmount, 'USD')} @ ₹{invoiceData.payment.fxRate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FX / Credit Summary Box */}
            <Card className="mb-8 border-2 border-amber-200 bg-amber-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-amber-800">Payment & Credit Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-2">
                    <p><span className="font-semibold">Payment Terms:</span> {invoiceData.payment.terms}</p>
                    <p><span className="font-semibold">Method:</span> Via {invoiceData.payment.method}</p>
                    <p><span className="font-semibold">FX Booked:</span> USD @ ₹{invoiceData.payment.fxRate}</p>
                  </div>
                  <div className="space-y-2">
                    <p><span className="font-semibold">Credit Provider:</span> {invoiceData.payment.creditProvider}</p>
                    <p><span className="font-semibold">Escrow Enabled:</span> Yes</p>
                    <Button variant="link" className="p-0 h-auto text-sm text-amber-700 hover:text-amber-800">
                      View Full Credit Summary →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="border-t-2 border-stone-200 pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Bank Account Details</h4>
                  <div className="text-sm text-stone-700 space-y-1">
                    <p>Bank: State Bank of India</p>
                    <p>Account: Shivani Granites Pvt Ltd</p>
                    <p>A/C No: 1234567890123</p>
                    <p>SWIFT: SBININBB104</p>
                    <p>IFSC: SBIN0001234</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Legal Disclaimers</h4>
                  <div className="text-xs text-stone-600 space-y-1">
                    <p>• Auto-generated and digitally verified</p>
                    <p>• Stone quality as per agreed specifications</p>
                    <p>• Subject to Indian Arbitration laws</p>
                    <p>• Platform T&C apply</p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-2">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xs text-stone-600">Digitally Signed</p>
                    <p className="text-xs text-stone-600">Platform Verified</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center pt-4 border-t border-stone-100">
                <div className="text-center text-sm text-stone-500">
                  <p className="font-medium">Auto-generated via TradeRails.ai</p>
                  <p>Generated on {formatDate(invoiceData.dateIssued)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body { background: white !important; }
          .container { max-width: none !important; padding: 0 !important; }
          .sticky { position: static !important; }
          .shadow-xl { box-shadow: none !important; }
          .rounded-lg { border-radius: 0 !important; }
          .bg-gradient-to-br { background: white !important; }
        }
      `}</style>
    </div>
  );
};

export default InvoicePreviewPage;
