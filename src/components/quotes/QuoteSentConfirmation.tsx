
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Copy, Download, RefreshCw, BarChart3 } from 'lucide-react';
import { useQuote } from './QuoteContext';

interface QuoteSentConfirmationProps {
  onCreateNew: () => void;
}

const QuoteSentConfirmation = ({ onCreateNew }: QuoteSentConfirmationProps) => {
  const { state } = useQuote();
  
  const quoteId = `Q-${Date.now().toString().slice(-5)}`;
  const totalValue = state.selectedSlabs.reduce((sum, slab) => sum + slab.totalPrice, 0);

  const handleCopyQuoteId = () => {
    navigator.clipboard.writeText(quoteId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 font-['Inter'] flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-4 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Quote Sent Successfully!</h1>
          <p className="text-stone-600 mb-8">
            Quote <span className="font-semibold">#{quoteId}</span> has been sent to{' '}
            <span className="font-semibold">{state.selectedBuyer?.name}</span> ({state.selectedBuyer?.location})
          </p>

          {/* Quote Summary */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  {state.selectedSlabs.reduce((sum, slab) => sum + slab.quantity, 0)}
                </div>
                <div className="text-sm text-stone-600">Slabs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  ${totalValue.toLocaleString()}
                </div>
                <div className="text-sm text-stone-600">Total Value</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  {state.validityPeriod}
                </div>
                <div className="text-sm text-stone-600">Days Valid</div>
              </div>
            </div>
          </div>

          {/* Quote ID */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-lg">
              <span className="text-stone-600">Quote ID:</span>
              <span className="font-mono font-semibold">{quoteId}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyQuoteId}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Button variant="outline" className="w-full">
              <BarChart3 className="w-4 h-4 mr-2" />
              Track Response
            </Button>
            
            <Button variant="outline" className="w-full" onClick={onCreateNew}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Duplicate Quote
            </Button>
            
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {/* Create New Quote */}
          <Button 
            onClick={onCreateNew}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            size="lg"
          >
            Create New Quote
          </Button>

          {/* Expected Response */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Expected Response:</strong> Most buyers respond within 24-48 hours. 
              You'll receive a notification when they view or respond to your quote.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteSentConfirmation;
