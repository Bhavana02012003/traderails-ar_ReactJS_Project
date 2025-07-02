
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  Star, 
  MapPin, 
  Clock, 
  Verified, 
  Eye,
  Box,
  Sparkles
} from 'lucide-react';
import { Slab } from '@/types/marketplace';

interface SlabCardProps {
  slab: Slab;
  viewMode: 'grid' | 'list';
  onClick: () => void;
  on3DViewClick?: () => void;
}

const SlabCard = ({ slab, viewMode, onClick, on3DViewClick }: SlabCardProps) => {
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-all cursor-pointer bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="flex">
            {/* Image */}
            <div className="w-48 h-32 relative overflow-hidden flex-shrink-0">
              <img 
                src={slab.images[0]} 
                alt={slab.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              {slab.featured && (
                <Badge className="absolute top-2 left-2 bg-emerald-500 text-white text-xs">
                  Featured
                </Badge>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle favorite
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart className="w-4 h-4 text-stone-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4" onClick={onClick}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">{slab.name}</h3>
                  <div className="flex items-center text-stone-600 text-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    {slab.supplier.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-emerald-600">
                    ${slab.price}
                    <span className="text-sm text-stone-500">/{slab.priceUnit}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(slab.grade) ? 'text-yellow-400 fill-current' : 'text-stone-300'}`} 
                      />
                    ))}
                    <span className="ml-1 text-xs text-stone-600">{slab.grade}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-stone-600">
                  <span className="capitalize">{slab.material}</span>
                  <span className="capitalize">{slab.finish}</span>
                  <span>{slab.dimensions.length}×{slab.dimensions.width}×{slab.dimensions.thickness}cm</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI {slab.aiQualityScore}
                  </Badge>
                  {on3DViewClick && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        on3DViewClick();
                      }}
                      className="text-xs"
                    >
                      <Box className="w-3 h-3 mr-1" />
                      3D
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={slab.images[0]} 
          alt={slab.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
          onClick={onClick}
        />
        
        {slab.featured && (
          <Badge className="absolute top-3 left-3 bg-emerald-500 text-white">
            Featured
          </Badge>
        )}
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite
          }}
          className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart className="w-5 h-5 text-stone-600" />
        </button>

        {/* 3D View Button */}
        {on3DViewClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              on3DViewClick();
            }}
            className="absolute bottom-3 right-3 glass-panel px-3 py-2 rounded-lg text-white hover:scale-105 transition-transform text-sm font-medium"
          >
            <Box className="w-4 h-4 mr-1 inline" />
            3D View
          </button>
        )}
      </div>

      <CardContent className="p-4" onClick={onClick}>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(slab.grade) ? 'text-yellow-400 fill-current' : 'text-stone-300'}`} 
              />
            ))}
            <span className="ml-2 text-sm text-stone-600">({slab.grade})</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-stone-900 mb-2 cursor-pointer hover:text-emerald-600 transition-colors">
          {slab.name}
        </h3>
        
        <div className="flex items-center text-stone-600 text-sm mb-3">
          <div className="flex items-center mr-4">
            <span className="font-medium">{slab.supplier.name}</span>
            {slab.supplier.verified && (
              <Verified className="w-4 h-4 ml-1 text-emerald-500" />
            )}
          </div>
        </div>
        
        <div className="flex items-center text-stone-600 text-sm mb-3">
          <MapPin className="w-3 h-3 mr-1" />
          {slab.supplier.location}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-emerald-600">
            ${slab.price}
            <span className="text-sm text-stone-500">/{slab.priceUnit}</span>
          </div>
          <div className="text-right text-sm text-stone-600">
            <div>{slab.dimensions.length}×{slab.dimensions.width}×{slab.dimensions.thickness}cm</div>
            <div className="capitalize">{slab.material} • {slab.finish}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-100 text-purple-700">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Score {slab.aiQualityScore}
            </Badge>
            <div className="flex items-center text-stone-500 text-sm">
              <Clock className="w-3 h-3 mr-1" />
              {slab.shippingTime}
            </div>
          </div>
          
          <Badge 
            className={
              slab.availability === 'in-stock' ? 'bg-green-100 text-green-800' :
              slab.availability === 'pre-order' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }
          >
            {slab.availability === 'in-stock' ? 'In Stock' :
             slab.availability === 'pre-order' ? 'Pre-Order' : 'Sold'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default SlabCard;
