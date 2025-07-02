
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Shield, 
  Lock, 
  Download, 
  ChevronDown, 
  Info, 
  CheckCircle,
  CreditCard,
  Building,
  MapPin,
  User
} from 'lucide-react';

const PayoutSummary = () => {
  const [showFxDetails, setShowFxDetails] = useState(false);
  const [showEscrowDetails, setShowEscrowDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Here you would typically redirect or show success state
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-emerald-50/30 to-slate-50 py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">
            Payment Confirmation
          </h1>
          <p className="text-stone-600">
            Review your order details and complete the secure payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Payout Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Summary Card */}
            <Card className="glass-panel border-0 shadow-2xl animate-slide-in">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-stone-900">Order Summary</h2>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified Order
                  </Badge>
                </div>

                <div className="space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-stone-600">Subtotal (Invoice)</span>
                    <span className="font-medium">₹6,00,000</span>
                  </div>

                  {/* Platform Discount */}
                  <div className="flex justify-between items-center text-lg text-emerald-600">
                    <span>Platform Discount</span>
                    <span className="font-medium">-₹20,000</span>
                  </div>

                  {/* Taxes/Fees */}
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-stone-600">Taxes & Processing Fees</span>
                    <span className="font-medium">+₹18,320</span>
                  </div>

                  <Separator className="my-4" />

                  {/* Total */}
                  <div className="flex justify-between items-center text-2xl font-bold text-stone-900">
                    <span>Total Payable</span>
                    <span className="text-emerald-600">₹5,98,320</span>
                  </div>
                </div>

                {/* Credit Applied Badge */}
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-800 font-medium">
                      Platform-backed credit applied. No external documentation required.
                    </span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-6 p-4 bg-white/50 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-stone-600" />
                      <div>
                        <p className="font-medium text-stone-900">Bank Transfer (RTGS)</p>
                        <p className="text-sm text-stone-600">Secure bank-to-bank transfer</p>
                      </div>
                    </div>
                    <Lock className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FX & Escrow Details */}
            <div className="space-y-4">
              {/* FX Details */}
              <Collapsible open={showFxDetails} onOpenChange={setShowFxDetails}>
                <Card className="glass-panel border-0 shadow-lg">
                  <CardContent className="p-6">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-emerald-600" />
                        <span className="font-medium">FX Rate Locked</span>
                        <Badge variant="secondary">USD 1 = ₹82.45</Badge>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showFxDetails ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 pt-4 border-t">
                      <div className="space-y-2 text-sm text-stone-600">
                        <p>• Rate locked for 24 hours from order confirmation</p>
                        <p>• Protected against currency fluctuations</p>
                        <p>• Powered by WiseFX institutional rates</p>
                      </div>
                    </CollapsibleContent>
                  </CardContent>
                </Card>
              </Collapsible>

              {/* Escrow Details */}
              <Collapsible open={showEscrowDetails} onOpenChange={setShowEscrowDetails}>
                <Card className="glass-panel border-0 shadow-lg">
                  <CardContent className="p-6">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-emerald-600" />
                        <span className="font-medium">Escrow Protection</span>
                        <Badge variant="secondary">YesBank Secured</Badge>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showEscrowDetails ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 pt-4 border-t">
                      <div className="space-y-2 text-sm text-stone-600">
                        <p>• Funds held securely until container approval</p>
                        <p>• Automatic release upon quality verification</p>
                        <p>• Full refund protection for 30 days</p>
                      </div>
                    </CollapsibleContent>
                  </CardContent>
                </Card>
              </Collapsible>
            </div>
          </div>

          {/* Sidebar - Shipment & Actions */}
          <div className="space-y-6">
            {/* Shipment Details */}
            <Card className="glass-panel border-0 shadow-xl animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-stone-900 mb-4">Shipment Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-stone-900">Funds Release</p>
                      <p className="text-sm text-stone-600">On container approval & quality check</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-stone-500" />
                      <div>
                        <p className="text-sm font-medium">Buyer Agent</p>
                        <p className="text-sm text-stone-600">Rajesh Kumar</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Building className="w-4 h-4 text-stone-500" />
                      <div>
                        <p className="text-sm font-medium">Supplier</p>
                        <p className="text-sm text-stone-600">Granite Masters Ltd.</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-stone-500" />
                      <div>
                        <p className="text-sm font-medium">Origin</p>
                        <p className="text-sm text-stone-600">Rajasthan, India</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full h-14 text-lg font-semibold emerald-gradient hover:shadow-lg transition-all"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Confirm Payment'
                )}
              </Button>

              <Button 
                variant="outline" 
                className="w-full h-12 border-stone-300 hover:bg-stone-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Summary
              </Button>
            </div>

            {/* Trust Section */}
            <Card className="glass-panel border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-xs text-stone-600 mb-2">Powered by</p>
                  <div className="space-y-1 text-xs text-stone-500">
                    <p>CredPartner (Credit) • WiseFX (Hedge)</p>
                    <p>YesBank (Escrow)</p>
                  </div>
                  <div className="mt-3 flex items-center justify-center space-x-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-stone-600">ISO/FEMA Compliant</span>
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

export default PayoutSummary;
