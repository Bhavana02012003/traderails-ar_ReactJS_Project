
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { StatusBadgeGroup } from '@/components/ui/status-badges';

interface PayoutSummaryProps {
  detailed?: boolean;
}

const PayoutSummary = ({ detailed = false }: PayoutSummaryProps) => {
  const payouts = [
    {
      invoiceId: 'INV-2024-001',
      amount: '₹2,45,000',
      releaseDate: '2024-01-15',
      status: 'Released',
      method: 'RTGS',
      protections: ['credit', 'escrow'] as Array<'credit' | 'escrow' | 'fx-lock'>
    },
    {
      invoiceId: 'INV-2024-002',
      amount: '₹3,20,000',
      releaseDate: '2024-01-20',
      status: 'In Escrow',
      method: 'Wire Transfer',
      protections: ['escrow', 'fx-lock'] as Array<'credit' | 'escrow' | 'fx-lock'>
    },
    {
      invoiceId: 'INV-2024-003',
      amount: '₹2,85,000',
      releaseDate: '2024-01-25',
      status: 'Pending',
      method: 'RTGS',
      protections: ['credit', 'escrow', 'fx-lock'] as Array<'credit' | 'escrow' | 'fx-lock'>
    }
  ];

  const totalReceivable = payouts.reduce((sum, payout) => {
    const amount = parseInt(payout.amount.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  return (
    <Card className="glass-panel border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          Payout Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-emerald-50 rounded-xl">
          <div className="text-3xl font-bold text-emerald-600">
            ₹{totalReceivable.toLocaleString()}
          </div>
          <p className="text-sm text-emerald-700">Total Receivable</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-600">Latest Release</span>
            <Badge className="bg-emerald-100 text-emerald-800">
              Via RTGS • Released from Escrow
            </Badge>
          </div>

          <Separator />

          <div className="space-y-3">
            {payouts.map((payout) => (
              <div key={payout.invoiceId} className="space-y-3 p-3 bg-white/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-900">{payout.invoiceId}</div>
                    <div className="text-sm text-stone-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {payout.releaseDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-stone-900">{payout.amount}</div>
                    <Badge variant="outline" className={
                      payout.status === 'Released' ? 'text-emerald-600 border-emerald-200' :
                      payout.status === 'In Escrow' ? 'text-amber-600 border-amber-200' :
                      'text-stone-600 border-stone-200'
                    }>
                      {payout.status}
                    </Badge>
                  </div>
                </div>
                
                {/* Status badges */}
                <StatusBadgeGroup 
                  statuses={payout.protections} 
                  size="sm"
                  className="justify-start"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayoutSummary;
