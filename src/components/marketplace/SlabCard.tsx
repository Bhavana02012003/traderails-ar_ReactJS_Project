
import { useState } from 'react';
import { Heart, Eye, Star, MapPin, Clock, Verified } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slab } from '@/types/marketplace';
import PayoutModal from './PayoutModal';

interface SlabCardProps {
  slab: Slab;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

const SlabCard = ({ slab, viewMode, onClick }: SlabCardProps) => {
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle quote request
    console.log('Request quote for:', slab.id);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPayoutModal(true);
  };

  const handleARView = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle AR view
    console.log('AR view for:', slab.id);
  };

  if (viewMode === 'list') {
    return (
      <>
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
          <div className="flex" onClick={onClick}>
            <div className="w-48 aspect-[4/3] relative overflow-hidden">
              <img 
                src={slab.thumbnail} 
                alt={slab.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {slab.featured && (
                <Badge className="absolute top-3 left-3 bg-emerald-500 text-white">
                  Featured
                </Badge>
              )}
            </div>
            
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-1">{slab.name}</h3>
                  <div className="flex items-center text-stone-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {slab.supplier.name} • {slab.supplier.location}
                    {slab.supplier.verified && (
                      <Verified className="w-4 h-4 ml-1 text-emerald-500" />
                    )}
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors">
                  <Heart className="w-5 h-5 text-stone-600" />
                </button>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(slab.grade) ? 'text-yellow-400 fill-current' : 'text-stone-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-stone-600">
                    AI Grade {slab.grade.toFixed(1)}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {slab.finish}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">
                    ${slab.price}/{slab.priceUnit}
                  </div>
                  <div className="text-sm text-stone-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {slab.shippingTime}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleRequestQuote}>
                    Request Quote
                  </Button>
                  <Button className="emerald-gradient text-white" onClick={handleBuyNow}>
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PayoutModal 
          isOpen={showPayoutModal} 
          onClose={() => setShowPayoutModal(false)} 
          slab={slab}
        />
      </>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-[1.02]">
        <div className="relative aspect-[4/3] overflow-hidden" onClick={onClick}>
          <img 
            src={slab.thumbnail} 
            alt={slab.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Overlay badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {slab.featured && (
              <Badge className="bg-emerald-500 text-white">
                Featured
              </Badge>
            )}
            <Badge className="glass-panel text-white text-xs">
              AI Graded • Premium Quality
            </Badge>
          </div>

          {/* Quick actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-10 h-10 glass-panel rounded-full flex items-center justify-center hover:scale-110 transition-transform text-white">
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 glass-panel rounded-full flex items-center justify-center hover:scale-110 transition-transform text-white">
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom overlay */}
          <div className="absolute bottom-4 right-4">
            <Badge className="glass-panel text-white text-xs">
              3D | AR
            </Badge>
          </div>

          {/* Grade indicator */}
          <div className="absolute bottom-4 left-4 flex items-center glass-panel px-2 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-white text-sm font-medium">{slab.grade.toFixed(1)}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-stone-900 mb-1">{slab.name}</h3>
              <div className="flex items-center text-stone-600 text-sm">
                <MapPin className="w-3 h-3 mr-1" />
                {slab.supplier.location}
                {slab.supplier.verified && (
                  <Verified className="w-3 h-3 ml-1 text-emerald-500" />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-emerald-600">
              ${slab.price}
              <span className="text-sm font-normal text-stone-500">/{slab.priceUnit}</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-stone-500">Block ID</div>
              <div className="text-sm font-medium text-stone-700">{slab.blockId}</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-stone-500 mb-4">
            <span className="capitalize">{slab.finish} finish</span>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {slab.shippingTime}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 text-sm" onClick={handleViewDetails}>
              View Details
            </Button>
            <Button className="flex-1 emerald-gradient text-white text-sm" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <PayoutModal 
        isOpen={showPayoutModal} 
        onClose={() => setShowPayoutModal(false)} 
        slab={slab}
      />
    </>
  );
};

export default SlabCard;
