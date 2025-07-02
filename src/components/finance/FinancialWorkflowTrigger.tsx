import { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  CreditCard, 
  FileText, 
  Download,
  Lock,
  Eye,
  Zap,
  Info,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FinancialWorkflowTriggerProps {
  invoiceId: string;
  amount: {
    inr: string;
    usd: string;
  };
  buyer: string;
  status: 'approved' | 'pending' | 'rejected';
  onBack: () => void;
}

const FinancialWorkflowTrigger = ({ 
  invoiceId, 
  amount, 
  buyer, 
  status,
  onBack
}: FinancialWorkflowTriggerProps) => {
  const [creditStatus, setCreditStatus] = useState<'idle' | 'triggered' | 'approved' | 'processing'>('idle');
  const [fxStatus, setFxStatus] = useState<'idle' | 'locked' | 'simulating'>('idle');
  const [escrowStatus, setEscrowStatus] = useState<'idle' | 'locked' | 'processing'>('idle');
  const [currentRate] = useState(83.45);
  const [rateExpiry, setRateExpiry] = useState(300); // 5 minutes in seconds

  // Simulate countdown
  useState(() => {
    const interval = setInterval(() => {
      setRateExpiry(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const canTriggerCredit = status === 'approved';
  const canTriggerFX = creditStatus === 'triggered' || creditStatus === 'approved';
  const canTriggerEscrow = fxStatus === 'locked';

  const handleCreditTrigger = () => {
    setCreditStatus('triggered');
    setTimeout(() => setCreditStatus('processing'), 1000);
  };

  const handleFXLock = () => {
    setFxStatus('locked');
  };

  const handleEscrowLock = () => {
    setEscrowStatus('locked');
  };

  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'triggered': return 'bg-blue-100 text-blue-800';
      case 'locked': return 'bg-purple-100 text-purple-800';
      case 'processing': return 'bg-amber-100 text-amber-800';
      default: return 'bg-stone-100 text-stone-600';
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full p-6 space-y-6 font-inter">
        {/* Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Invoice Overview */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-stone-50 to-stone-100 border-b">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-stone-900">Invoice #{invoiceId}</h2>
                  <Badge className={getStatusColor(status)}>
                    {status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                </div>
                <p className="text-stone-600">{buyer}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-stone-900">{amount.inr}</div>
                <div className="text-lg text-stone-600">{amount.usd}</div>
                <div className="text-sm text-stone-500">@ ₹{currentRate}/USD</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Workflow Progress */}
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-stone-900">Financial Workflow Progress</h3>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Clock className="w-4 h-4" />
              <span>Sequence: Credit → FX → Escrow</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {/* Credit Step */}
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                creditStatus === 'idle' ? 'bg-stone-200' : 
                creditStatus === 'triggered' ? 'bg-blue-500' : 'bg-emerald-500'
              }`}>
                {creditStatus === 'idle' ? (
                  <span className="text-sm font-medium text-stone-600">1</span>
                ) : (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="text-sm font-medium text-stone-700">Credit</span>
            </div>

            <div className="h-0.5 bg-stone-200 flex-1 min-w-8"></div>

            {/* FX Step */}
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                fxStatus === 'idle' ? 'bg-stone-200' : 'bg-purple-500'
              }`}>
                {fxStatus === 'idle' ? (
                  <span className="text-sm font-medium text-stone-600">2</span>
                ) : (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="text-sm font-medium text-stone-700">FX Hedge</span>
            </div>

            <div className="h-0.5 bg-stone-200 flex-1 min-w-8"></div>

            {/* Escrow Step */}
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                escrowStatus === 'idle' ? 'bg-stone-200' : 'bg-amber-500'
              }`}>
                {escrowStatus === 'idle' ? (
                  <span className="text-sm font-medium text-stone-600">3</span>
                ) : (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="text-sm font-medium text-stone-700">Escrow</span>
            </div>
          </div>
        </div>

        {/* Trigger Flow Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Credit Evaluation */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100 border-b">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <CreditCard className="w-5 h-5" />
                Credit Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">Approved Limit</span>
                  <span className="font-semibold text-stone-900">₹25,00,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">Available</span>
                  <span className="font-semibold text-emerald-600">₹18,45,000</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">Status</span>
                  <Badge className={getStatusColor(creditStatus)}>
                    {creditStatus === 'triggered' && 'Lender Notified'}
                    {creditStatus === 'processing' && 'Awaiting Response'}
                    {creditStatus === 'approved' && 'Approved'}
                    {creditStatus === 'idle' && 'Ready'}
                  </Badge>
                </div>
              </div>
              
              <div className="pt-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button 
                        onClick={handleCreditTrigger}
                        disabled={!canTriggerCredit || creditStatus !== 'idle'}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        {creditStatus === 'idle' ? 'Trigger Drawdown Request' : 'Request Sent'}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!canTriggerCredit && (
                    <TooltipContent>
                      <p>Invoice must be approved first</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          {/* FX Hedge */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-br from-purple-50 to-purple-100 border-b">
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <TrendingUp className="w-5 h-5" />
                FX Hedge
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">Live Rate</span>
                  <span className="font-bold text-lg text-stone-900">₹{currentRate}/USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">Rate Expires</span>
                  <span className={`font-semibold ${rateExpiry < 60 ? 'text-red-600' : 'text-amber-600'}`}>
                    {formatTime(rateExpiry)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">Status</span>
                  <Badge className={getStatusColor(fxStatus)}>
                    {fxStatus === 'locked' ? 'Rate Locked' : 'Available'}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button 
                        onClick={handleFXLock}
                        disabled={!canTriggerFX || fxStatus === 'locked'}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Lock Rate
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!canTriggerFX && (
                    <TooltipContent>
                      <p>You must trigger credit before locking FX</p>
                    </TooltipContent>
                  )}
                </Tooltip>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled={!canTriggerFX}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Simulate Payout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Escrow */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-br from-amber-50 to-amber-100 border-b">
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <Shield className="w-5 h-5" />
                Escrow
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">Partner</span>
                  <span className="font-semibold text-stone-900">Zentity Bank</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">Account ID</span>
                  <span className="font-mono text-sm text-stone-700">ESC-7829-XY</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">Status</span>
                  <Badge className={getStatusColor(escrowStatus)}>
                    {escrowStatus === 'locked' ? 'Funds Held' : 'Ready'}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button 
                        onClick={handleEscrowLock}
                        disabled={!canTriggerEscrow || escrowStatus === 'locked'}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Lock Funds
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!canTriggerEscrow && (
                    <TooltipContent>
                      <p>You must lock FX rate before securing escrow</p>
                    </TooltipContent>
                  )}
                </Tooltip>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Escrow Terms
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Smart Guidance */}
        {status === 'approved' && (
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-emerald-900">Workflow Guidance</h4>
                  <ul className="text-sm text-emerald-800 space-y-1">
                    <li>• Trigger credit evaluation first to establish funding</li>
                    <li>• Lock FX rate while it's favorable (expires in {formatTime(rateExpiry)})</li>
                    <li>• Secure escrow only after FX is locked to prevent rate exposure</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Audit & Track */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-stone-600" />
                Transaction Audit Trail
              </span>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-stone-50 rounded-lg">
                  <div className="text-sm text-stone-600">Credit</div>
                  <div className={`font-semibold ${creditStatus === 'idle' ? 'text-stone-400' : 'text-blue-600'}`}>
                    {creditStatus === 'idle' ? 'Pending' : 'Triggered'}
                  </div>
                </div>
                <div className="text-center p-4 bg-stone-50 rounded-lg">
                  <div className="text-sm text-stone-600">FX</div>
                  <div className={`font-semibold ${fxStatus === 'idle' ? 'text-stone-400' : 'text-purple-600'}`}>
                    {fxStatus === 'idle' ? 'Pending' : 'Locked'}
                  </div>
                </div>
                <div className="text-center p-4 bg-stone-50 rounded-lg">
                  <div className="text-sm text-stone-600">Escrow</div>
                  <div className={`font-semibold ${escrowStatus === 'idle' ? 'text-stone-400' : 'text-amber-600'}`}>
                    {escrowStatus === 'idle' ? 'Pending' : 'Funds Held'}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button variant="outline" className="text-stone-600">
                  View Complete Transaction History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default FinancialWorkflowTrigger;
