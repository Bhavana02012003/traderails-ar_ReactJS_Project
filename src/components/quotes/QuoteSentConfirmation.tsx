
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Copy, Plus, ArrowLeft } from 'lucide-react';

interface QuoteSentConfirmationProps {
  onCreateNew: () => void;
  onClose?: () => void;
}

const QuoteSentConfirmation = ({ onCreateNew, onClose }: QuoteSentConfirmationProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 font-['Inter'] flex items-center justify-center">
      <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Quote Sent Successfully!</h1>
          
          <p className="text-stone-600 mb-2">
            Quote <span className="font-semibold text-stone-900">#Q-01824</span> has been sent to
          </p>
          <p className="text-lg font-semibold text-stone-900 mb-8">
            Rohan Marble Imports (New York, USA)
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
              <span className="text-stone-600">Quote Value:</span>
              <span className="font-semibold text-stone-900">$24,750</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
              <span className="text-stone-600">Slabs Included:</span>
              <span className="font-semibold text-stone-900">8 pieces</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
              <span className="text-stone-600">Valid Until:</span>
              <span className="font-semibold text-stone-900">
                {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy Quote Link
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              Track Response
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {onClose && (
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            )}
            <Button 
              onClick={onCreateNew}
              className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Another Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteSentConfirmation;
