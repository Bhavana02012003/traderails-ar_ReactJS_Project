
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Truck, DollarSign, Calendar, Package } from 'lucide-react';
import { useQuote } from '../QuoteContext';

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const PricingTermsStep = ({ onNext }: StepProps) => {
  const { state, dispatch } = useQuote();

  const totalValue = state.selectedSlabs.reduce((sum, slab) => sum + slab.totalPrice, 0);
  const convertedValue = state.currency === 'INR' ? totalValue * state.fxRate : totalValue;

  const handleFreightEstimate = () => {
    // Mock freight calculation
    const estimatedFreight = totalValue * 0.08; // 8% of total value
    dispatch({ type: 'SET_FREIGHT_ESTIMATE', payload: estimatedFreight });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Pricing & Terms</h2>
        <p className="text-stone-600">Configure pricing, shipping terms, and quote validity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Pricing */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Pricing Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={state.currency}
                  onValueChange={(value: 'USD' | 'INR') => dispatch({ type: 'SET_CURRENCY', payload: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-stone-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-stone-600">Subtotal:</span>
                  <span className="font-semibold">
                    {state.currency === 'USD' ? '$' : '₹'}{convertedValue.toLocaleString()}
                  </span>
                </div>
                {state.freightEstimate > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-stone-600">Freight (Est.):</span>
                    <span className="font-semibold">
                      {state.currency === 'USD' ? '$' : '₹'}{(state.freightEstimate * (state.currency === 'INR' ? state.fxRate : 1)).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="font-semibold text-stone-900">Total:</span>
                  <span className="font-bold text-lg text-emerald-600">
                    {state.currency === 'USD' ? '$' : '₹'}{(convertedValue + (state.freightEstimate * (state.currency === 'INR' ? state.fxRate : 1))).toLocaleString()}
                  </span>
                </div>
              </div>

              {state.currency === 'INR' && (
                <div className="text-sm text-stone-500 p-3 bg-blue-50 rounded-lg">
                  Exchange Rate: 1 USD = ₹{state.fxRate} (Today's Rate)
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Quote Validity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="validity">Valid for (days)</Label>
                <Select
                  value={state.validityPeriod.toString()}
                  onValueChange={(value) => dispatch({ type: 'SET_VALIDITY_PERIOD', payload: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="45">45 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Shipping & Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                Shipping Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="shippingTerms">Shipping Terms</Label>
                <Select
                  value={state.shippingTerms}
                  onValueChange={(value: 'FOB' | 'CIF') => dispatch({ type: 'SET_SHIPPING_TERMS', payload: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FOB">FOB - Free on Board</SelectItem>
                    <SelectItem value="CIF">CIF - Cost, Insurance & Freight</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  {state.shippingTerms === 'FOB' 
                    ? 'Buyer arranges and pays for shipping from port of origin.'
                    : 'Seller arranges shipping, insurance, and freight to destination port.'
                  }
                </p>
              </div>

              <Button
                variant="outline"
                onClick={handleFreightEstimate}
                className="w-full"
              >
                Get Freight Estimate
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-600" />
                Additional Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="partialFulfillment">Allow Partial Fulfillment</Label>
                  <p className="text-sm text-stone-500">Buyer can accept partial quantities</p>
                </div>
                <Switch
                  id="partialFulfillment"
                  checked={state.allowPartialFulfillment}
                  onCheckedChange={(checked) => dispatch({ type: 'SET_PARTIAL_FULFILLMENT', payload: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="creditTerms">Show Credit-Eligible Terms</Label>
                  <p className="text-sm text-stone-500">Display financing options if buyer qualifies</p>
                </div>
                <Switch
                  id="creditTerms"
                  checked={state.showCreditTerms}
                  onCheckedChange={(checked) => dispatch({ type: 'SET_CREDIT_TERMS', payload: checked })}
                  disabled={!state.selectedBuyer?.creditEligible}
                />
              </div>

              {!state.selectedBuyer?.creditEligible && (
                <p className="text-sm text-stone-400">
                  Selected buyer is not credit-eligible
                </p>
              )}
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
          Continue to Finance Options
        </Button>
      </div>
    </div>
  );
};

export default PricingTermsStep;
