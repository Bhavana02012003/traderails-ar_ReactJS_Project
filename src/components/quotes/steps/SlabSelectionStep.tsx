
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useQuote } from '../QuoteContext';

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const SlabSelectionStep = ({ onNext }: StepProps) => {
  const { state, dispatch } = useQuote();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock slabs data
  const availableSlabs = [
    {
      id: '1',
      name: 'Carrara White Marble',
      material: 'Marble',
      finish: 'Polished',
      dimensions: { length: 320, width: 160, thickness: 2 },
      pricePerSqft: 145,
      blockId: 'CAR-2024-001',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
      inStock: 24
    },
    {
      id: '2',
      name: 'Absolute Black Granite',
      material: 'Granite',
      finish: 'Honed',
      dimensions: { length: 300, width: 150, thickness: 3 },
      pricePerSqft: 89,
      blockId: 'ABS-2024-002',
      image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop',
      inStock: 18
    },
    {
      id: '3',
      name: 'Calacatta Gold Marble',
      material: 'Marble',
      finish: 'Polished',
      dimensions: { length: 310, width: 155, thickness: 2 },
      pricePerSqft: 289,
      blockId: 'CAL-2024-003',
      image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop',
      inStock: 12
    }
  ];

  const filteredSlabs = availableSlabs.filter(slab => {
    const matchesSearch = slab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         slab.blockId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         slab.material.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const addToQuote = (slab: typeof availableSlabs[0]) => {
    const totalSqft = (slab.dimensions.length * slab.dimensions.width) / 10000; // Convert cm² to sqft
    const selectedSlab = {
      ...slab,
      quantity: 1,
      totalSqft,
      totalPrice: totalSqft * slab.pricePerSqft
    };
    dispatch({ type: 'ADD_SLAB', payload: selectedSlab });
  };

  const removeFromQuote = (slabId: string) => {
    dispatch({ type: 'REMOVE_SLAB', payload: slabId });
  };

  const updateQuantity = (slabId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_SLAB_QUANTITY', payload: { id: slabId, quantity } });
    }
  };

  const getSlabQuantity = (slabId: string) => {
    const slab = state.selectedSlabs.find(s => s.id === slabId);
    return slab ? slab.quantity : 0;
  };

  const isSlabSelected = (slabId: string) => {
    return state.selectedSlabs.some(s => s.id === slabId);
  };

  const totalSlabs = state.selectedSlabs.reduce((sum, slab) => sum + slab.quantity, 0);
  const totalValue = state.selectedSlabs.reduce((sum, slab) => sum + slab.totalPrice, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Select Slabs</h2>
        <p className="text-stone-600">Add slabs to your quote basket with quantities and pricing.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
          <Input
            placeholder="Search slabs by name or block ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Marble', 'Granite', 'Quartzite'].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter.toLowerCase() ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(filter.toLowerCase())}
              className={selectedFilter === filter.toLowerCase() ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Quote Basket Summary */}
      {state.selectedSlabs.length > 0 && (
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
                <span className="font-medium text-emerald-900">
                  {totalSlabs} slabs selected • ${totalValue.toLocaleString()}
                </span>
              </div>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                Quote Basket
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Slab Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSlabs.map((slab) => (
          <Card key={slab.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] relative">
              <img 
                src={slab.image} 
                alt={slab.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90 text-stone-700">
                  {slab.inStock} in stock
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-stone-900 mb-2">{slab.name}</h3>
              <div className="space-y-2 text-sm text-stone-600 mb-4">
                <div className="flex justify-between">
                  <span>Material:</span>
                  <span>{slab.material}</span>
                </div>
                <div className="flex justify-between">
                  <span>Finish:</span>
                  <span>{slab.finish}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimensions:</span>
                  <span>{slab.dimensions.length}×{slab.dimensions.width}×{slab.dimensions.thickness}cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Block ID:</span>
                  <span className="font-medium">{slab.blockId}</span>
                </div>
                <div className="flex justify-between font-semibold text-stone-900">
                  <span>Price:</span>
                  <span>${slab.pricePerSqft}/sqft</span>
                </div>
              </div>

              {isSlabSelected(slab.id) ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg">
                    <span className="text-emerald-800 font-medium">Added to quote</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(slab.id, getSlabQuantity(slab.id) - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{getSlabQuantity(slab.id)}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(slab.id, getSlabQuantity(slab.id) + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => removeFromQuote(slab.id)}
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Remove from Quote
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => addToQuote(slab)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Quote
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-6 border-t border-stone-200">
        <Button 
          onClick={onNext}
          disabled={state.selectedSlabs.length === 0}
          className="bg-emerald-600 hover:bg-emerald-700 px-8"
        >
          Continue to Pricing & Terms
        </Button>
      </div>
    </div>
  );
};

export default SlabSelectionStep;
