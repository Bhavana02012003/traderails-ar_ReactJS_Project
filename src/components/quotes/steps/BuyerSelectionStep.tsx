
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { useQuote } from '../QuoteContext';

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const BuyerSelectionStep = ({ onNext }: StepProps) => {
  const { state, dispatch } = useQuote();
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);

  // Mock buyers data
  const buyers = [
    {
      id: '1',
      name: 'Rohan Marble Imports',
      location: 'New York, USA',
      country: 'USA',
      preferredPort: 'New York Port',
      preferredCurrency: 'USD' as const,
      creditEligible: true,
      totalOrders: 24,
      lastOrder: '2 weeks ago'
    },
    {
      id: '2',
      name: 'Premium Stone Trading Co.',
      location: 'Dubai, UAE',
      country: 'UAE',
      preferredPort: 'Jebel Ali Port',
      preferredCurrency: 'USD' as const,
      creditEligible: true,
      totalOrders: 18,
      lastOrder: '1 month ago'
    },
    {
      id: '3',
      name: 'Marble Palace Inc.',
      location: 'Los Angeles, USA',
      country: 'USA',
      preferredPort: 'Los Angeles Port',
      preferredCurrency: 'USD' as const,
      creditEligible: false,
      totalOrders: 6,
      lastOrder: '3 months ago'
    }
  ];

  const filteredBuyers = buyers.filter(buyer =>
    buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buyer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuyerSelect = (buyer: typeof buyers[0]) => {
    dispatch({ type: 'SET_BUYER', payload: buyer });
  };

  const handleNext = () => {
    if (state.selectedBuyer) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Select Buyer</h2>
        <p className="text-stone-600">Choose an existing buyer or invite a new one to send your quote.</p>
      </div>

      {/* Search and Add */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
          <Input
            placeholder="Search buyers by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowInviteForm(true)}
          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Invite New Buyer
        </Button>
      </div>

      {/* Buyer List */}
      <div className="grid gap-4">
        {filteredBuyers.map((buyer) => (
          <Card 
            key={buyer.id} 
            className={`cursor-pointer transition-all ${
              state.selectedBuyer?.id === buyer.id 
                ? 'ring-2 ring-emerald-500 bg-emerald-50/50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleBuyerSelect(buyer)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-stone-900">{buyer.name}</h3>
                    {buyer.creditEligible && (
                      <div className="flex items-center gap-1 text-emerald-600 text-sm">
                        <CreditCard className="w-4 h-4" />
                        Credit Eligible
                      </div>
                    )}
                    {state.selectedBuyer?.id === buyer.id && (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {buyer.location}
                    </div>
                    <span>•</span>
                    <span>{buyer.totalOrders} orders</span>
                    <span>•</span>
                    <span>Last order: {buyer.lastOrder}</span>
                  </div>
                  <div className="mt-2 text-sm text-stone-500">
                    Preferred: {buyer.preferredCurrency} • {buyer.preferredPort}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invite Form */}
      {showInviteForm && (
        <Card className="bg-stone-50 border-stone-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Invite New Buyer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="buyerName">Company Name</Label>
                <Input id="buyerName" placeholder="Enter company name" />
              </div>
              <div>
                <Label htmlFor="buyerEmail">Email Address</Label>
                <Input id="buyerEmail" type="email" placeholder="Enter email" />
              </div>
              <div>
                <Label htmlFor="buyerLocation">Location</Label>
                <Input id="buyerLocation" placeholder="City, Country" />
              </div>
              <div>
                <Label htmlFor="buyerPhone">Phone Number</Label>
                <Input id="buyerPhone" placeholder="Enter phone number" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowInviteForm(false)}>
                Cancel
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Send Invitation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Button */}
      <div className="flex justify-end pt-6 border-t border-stone-200">
        <Button 
          onClick={handleNext}
          disabled={!state.selectedBuyer}
          className="bg-emerald-600 hover:bg-emerald-700 px-8"
        >
          Continue to Slab Selection
        </Button>
      </div>
    </div>
  );
};

export default BuyerSelectionStep;
