
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp, CreditCard, Info } from 'lucide-react';
import { useQuote } from '../QuoteContext';

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const FinanceOptionsStep = ({ onNext }: StepProps) => {
  const { state, dispatch } = useQuote();

  const totalValue = state.selectedSlabs.reduce((sum, slab) => sum + slab.totalPrice, 0);
  const creditLimit = Math.min(totalValue * 0.8, 500000); // 80% of order value, max $500k

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Finance Options</h2>
        <p className="text-stone-600">Configure financing and risk management options for this quote.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Credit Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                Buyer Credit Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.selectedBuyer?.creditEligible ? (
                <>
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-emerald-100 text-emerald-800">Credit Approved</Badge>
                      <span className="text-sm text-emerald-700">
                        {state.selectedBuyer.name}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-600">Available Credit:</span>
                        <span className="font-semibold">${creditLimit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Payment Terms:</span>
                        <span className="font-semibold">Net 30-90 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Interest Rate:</span>
                        <span className="font-semibold">2.5% - 4.2% APR</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        Credit terms will be presented to the buyer during checkout. 
                        They won't see the backend financing breakdown.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                  <p className="text-stone-600 text-center">
                    Selected buyer is not pre-approved for credit financing.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                Escrow Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="escrow">Enable Escrow Service</Label>
                  <p className="text-sm text-stone-500">Funds held until delivery confirmation</p>
                </div>
                <Switch
                  id="escrow"
                  checked={state.escrowEnabled}
                  onCheckedChange={(checked) => dispatch({ type: 'SET_ESCROW', payload: checked })}
                />
              </div>

              {state.escrowEnabled && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Escrow Fee:</span>
                      <span className="font-semibold">1.5% of order value</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Release Trigger:</span>
                      <span className="font-semibold">Delivery + 7 days</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - FX Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                FX Rate Locking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="fxLocking">Offer FX Rate Lock</Label>
                  <p className="text-sm text-stone-500">Protect against currency fluctuations</p>
                </div>
                <Switch
                  id="fxLocking"
                  checked={state.fxLockingEnabled}
                  onCheckedChange={(checked) => dispatch({ type: 'SET_FX_LOCKING', payload: checked })}
                />
              </div>

              {state.fxLockingEnabled && (
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-900 mb-1">
                        1 USD = ₹{state.fxRate}
                      </div>
                      <div className="text-sm text-blue-700">
                        Today's Rate • Valid for 24 hours
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-600">Lock Duration:</span>
                        <span className="font-semibold">30-90 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Lock Fee:</span>
                        <span className="font-semibold">0.5% of order value</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-stone-600">Order Value:</span>
                  <span className="font-semibold">${totalValue.toLocaleString()}</span>
                </div>
                
                {state.selectedBuyer?.creditEligible && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Available Credit:</span>
                    <span className="font-semibold text-emerald-600">${creditLimit.toLocaleString()}</span>
                  </div>
                )}

                {state.escrowEnabled && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Escrow Fee:</span>
                    <span className="font-semibold">${(totalValue * 0.015).toLocaleString()}</span>
                  </div>
                )}

                {state.fxLockingEnabled && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">FX Lock Fee:</span>
                    <span className="font-semibold">${(totalValue * 0.005).toLocaleString()}</span>
                  </div>
                )}

                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-stone-900">Buyer Sees:</span>
                  <span className="font-bold text-lg text-emerald-600">
                    ${totalValue.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-6 border-t border-stone-200">
        <Button 
          onClick={onNext}
          className="bg-emerald-600 hover:bg-emerald-700 px-8"
        >
          Review & Send Quote
        </Button>
      </div>
    </div>
  );
};

export default FinanceOptionsStep;
