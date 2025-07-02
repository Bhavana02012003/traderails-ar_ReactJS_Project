
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Send, Download, Eye } from 'lucide-react';
import { useQuote } from '../QuoteContext';

interface StepProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep?: boolean;
}

const ReviewSendStep = ({ onNext }: StepProps) => {
  const { state, dispatch } = useQuote();

  const totalValue = state.selectedSlabs.reduce((sum, slab) => sum + slab.totalPrice, 0);
  const totalSlabs = state.selectedSlabs.reduce((sum, slab) => sum + slab.quantity, 0);

  const handleSendQuote = () => {
    // Here you would typically send the quote via API
    console.log('Sending quote:', state);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Review & Send Quote</h2>
        <p className="text-stone-600">Review all details before sending the quote to your buyer.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Quote Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Buyer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-600">Company:</span>
                  <span className="font-semibold">{state.selectedBuyer?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Location:</span>
                  <span className="font-semibold">{state.selectedBuyer?.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Preferred Port:</span>
                  <span className="font-semibold">{state.selectedBuyer?.preferredPort}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Credit Status:</span>
                  <Badge className={state.selectedBuyer?.creditEligible ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}>
                    {state.selectedBuyer?.creditEligible ? 'Eligible' : 'Not Eligible'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected Slabs ({totalSlabs})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {state.selectedSlabs.map((slab) => (
                  <div key={slab.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                    <div>
                      <div className="font-medium">{slab.name}</div>
                      <div className="text-sm text-stone-600">
                        {slab.blockId} • Qty: {slab.quantity}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${slab.totalPrice.toLocaleString()}</div>
                      <div className="text-sm text-stone-600">${slab.pricePerSqft}/sqft</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="message">Message to Buyer (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal note to your buyer..."
                  value={state.buyerMessage}
                  onChange={(e) => dispatch({ type: 'SET_BUYER_MESSAGE', payload: e.target.value })}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quote Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quote Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal:</span>
                  <span className="font-semibold">${totalValue.toLocaleString()}</span>
                </div>
                
                {state.freightEstimate > 0 && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Freight (Est.):</span>
                    <span className="font-semibold">${state.freightEstimate.toLocaleString()}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-emerald-600">
                    ${(totalValue + state.freightEstimate).toLocaleString()}
                  </span>
                </div>

                <div className="text-sm text-stone-500">
                  Currency: {state.currency} • {state.shippingTerms} Terms
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Valid Until:</span>
                  <span className="font-semibold">
                    {new Date(Date.now() + state.validityPeriod * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-stone-600">Shipping Terms:</span>
                  <span className="font-semibold">{state.shippingTerms}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-600">Partial Fulfillment:</span>
                  <span className="font-semibold">
                    {state.allowPartialFulfillment ? 'Allowed' : 'Not Allowed'}
                  </span>
                </div>

                {state.escrowEnabled && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Escrow Protection:</span>
                    <Badge className="bg-emerald-100 text-emerald-800">Enabled</Badge>
                  </div>
                )}

                {state.fxLockingEnabled && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">FX Rate Lock:</span>
                    <Badge className="bg-blue-100 text-blue-800">Available</Badge>
                  </div>
                )}

                {state.showCreditTerms && state.selectedBuyer?.creditEligible && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Credit Terms:</span>
                    <Badge className="bg-emerald-100 text-emerald-800">Available</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Quote
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                
                <Button 
                  onClick={handleSendQuote}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Quote to Buyer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewSendStep;
