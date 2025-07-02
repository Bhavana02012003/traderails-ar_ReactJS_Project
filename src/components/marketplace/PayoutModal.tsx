
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Shield, 
  Lock, 
  Download, 
  Info, 
  CheckCircle,
  CreditCard,
  Building,
  MapPin,
  User,
  X
} from 'lucide-react';
import { Slab } from '@/types/marketplace';

interface PayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  slab: Slab;
}

const PayoutModal = ({ isOpen, onClose, slab }: PayoutModalProps) => {
  const [creditTerm, setCreditTerm] = useState('no-credit');
  const [isProcessing, setIsProcessing] = useState(false);

  const creditOptions = [
    { value: 'no-credit', label: 'No Credit - Pay Now', discount: 0 },
    { value: '30-days', label: '30 Days Credit', discount: 500 },
    { value: '45-days', label: '45 Days Credit', discount: 1000 },
    { value: '90-days', label: '90 Days Credit', discount: 2000 }
  ];

  const selectedCredit = creditOptions.find(opt => opt.value === creditTerm);
  const baseAmount = 600000;
  const platformDiscount = 20000 + (selectedCredit?.discount || 0);
  const taxesFees = 18320;
  const totalPayable = baseAmount - platformDiscount + taxesFees;

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      // Show success message or redirect
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="bg-gradient-to-br from-stone-50 via-emerald-50/30 to-slate-50">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-stone-900">
                Payment Confirmation
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-stone-600">
              Review your order details and complete the secure payment
            </p>
          </DialogHeader>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Payout Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Slab Info */}
              <Card className="glass-panel border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src={slab.thumbnail} 
                      alt={slab.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900">{slab.name}</h3>
                      <p className="text-stone-600">{slab.supplier.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Credit Terms Selection */}
              <Card className="glass-panel border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-stone-900 mb-4">Payment Terms</h3>
                  <Select value={creditTerm} onValueChange={setCreditTerm}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {creditOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{option.label}</span>
                            {option.discount > 0 && (
                              <Badge variant="secondary" className="ml-2">
                                +₹{option.discount.toLocaleString()} discount
                              </Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Primary Summary Card */}
              <Card className="glass-panel border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-stone-900">Order Summary</h2>
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verified Order
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-stone-600">Subtotal (Invoice)</span>
                      <span className="font-medium">₹{baseAmount.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-lg text-emerald-600">
                      <span>Platform Discount</span>
                      <span className="font-medium">-₹{platformDiscount.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-lg">
                      <span className="text-stone-600">Taxes & Processing Fees</span>
                      <span className="font-medium">+₹{taxesFees.toLocaleString()}</span>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center text-2xl font-bold text-stone-900">
                      <span>Total Payable</span>
                      <span className="text-emerald-600">₹{totalPayable.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Credit Applied Badge */}
                  <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5 text-emerald-600" />
                      <span className="text-emerald-800 font-medium">
                        {creditTerm === 'no-credit' 
                          ? 'Immediate payment - No credit terms applied'
                          : `${selectedCredit?.label} applied with enhanced discount`
                        }
                      </span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mt-4 p-4 bg-white/50 rounded-lg border">
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
            </div>

            {/* Sidebar - Shipment & Actions */}
            <div className="space-y-6">
              {/* Shipment Details */}
              <Card className="glass-panel border-0 shadow-xl">
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
                          <p className="text-sm text-stone-600">{slab.supplier.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-stone-500" />
                        <div>
                          <p className="text-sm font-medium">Origin</p>
                          <p className="text-sm text-stone-600">{slab.supplier.location}</p>
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
                  className="w-full h-12 text-lg font-semibold emerald-gradient hover:shadow-lg transition-all"
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
                  className="w-full h-10 border-stone-300 hover:bg-stone-50"
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
      </DialogContent>
    </Dialog>
  );
};

export default PayoutModal;
