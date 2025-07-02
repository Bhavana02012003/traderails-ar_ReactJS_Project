
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Eye, 
  Star, 
  MapPin, 
  Clock, 
  Verified, 
  Share2, 
  MessageCircle,
  Cube,
  Shield,
  ChevronLeft,
  ChevronRight,
  Smartphone
} from 'lucide-react';
import { Slab } from '@/types/marketplace';

interface SlabModalProps {
  slab: Slab;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SlabModal = ({ slab, open, onOpenChange }: SlabModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [view3D, setView3D] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % slab.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + slab.images.length) % slab.images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex h-[80vh]">
          {/* Image Gallery */}
          <div className="flex-1 relative bg-stone-100">
            <div className="relative h-full">
              <img 
                src={slab.images[currentImageIndex]} 
                alt={slab.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              {slab.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 glass-panel rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 glass-panel rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Top overlay controls */}
              <div className="absolute top-4 left-4 flex gap-2">
                {slab.featured && (
                  <Badge className="bg-emerald-500 text-white">Featured</Badge>
                )}
                <Badge className="glass-panel text-white">
                  AI Graded • Score {slab.aiQualityScore}
                </Badge>
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <Button 
                    className="glass-panel text-white border-white/20 hover:bg-white/20"
                    variant="outline"
                    onClick={() => setView3D(!view3D)}
                  >
                    <Cube className="w-4 h-4 mr-2" />
                    {view3D ? 'Photo View' : '3D View'}
                  </Button>
                  <Button className="glass-panel text-white border-white/20 hover:bg-white/20" variant="outline">
                    <Smartphone className="w-4 h-4 mr-2" />
                    AR Preview
                  </Button>
                </div>

                {/* Image dots */}
                {slab.images.length > 1 && (
                  <div className="flex gap-2">
                    {slab.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="w-96 bg-white overflow-y-auto">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl font-bold text-stone-900">
                {slab.name}
              </DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-6">
              {/* Price and Rating */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-emerald-600">
                    ${slab.price}
                    <span className="text-lg text-stone-500">/{slab.priceUnit}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(slab.grade) ? 'text-yellow-400 fill-current' : 'text-stone-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-stone-600">
                      {slab.grade.toFixed(1)} Grade
                    </span>
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

              {/* Supplier Info */}
              <div className="border-t border-stone-200 pt-6">
                <h4 className="font-semibold text-stone-900 mb-3">Supplier</h4>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-stone-900">{slab.supplier.name}</span>
                      {slab.supplier.verified && (
                        <Verified className="w-4 h-4 ml-1 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex items-center text-stone-600 text-sm mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {slab.supplier.location}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(slab.supplier.rating) ? 'text-yellow-400 fill-current' : 'text-stone-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-xs text-stone-600">
                    {slab.supplier.rating} rating
                  </span>
                </div>
              </div>

              {/* Specifications */}
              <div className="border-t border-stone-200 pt-6">
                <h4 className="font-semibold text-stone-900 mb-3">Specifications</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Material:</span>
                    <span className="capitalize font-medium">{slab.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Finish:</span>
                    <span className="capitalize font-medium">{slab.finish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Dimensions:</span>
                    <span className="font-medium">
                      {slab.dimensions.length} × {slab.dimensions.width} × {slab.dimensions.thickness}cm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Block ID:</span>
                    <span className="font-medium">{slab.blockId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Shipping:</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span className="font-medium">{slab.shippingTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Traceability */}
              <div className="border-t border-stone-200 pt-6">
                <h4 className="font-semibold text-stone-900 mb-3">Traceability</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">Quarry:</span>
                    <span className="font-medium">{slab.quarry.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">Location:</span>
                    <span className="font-medium">{slab.quarry.location}</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="border-t border-stone-200 pt-6">
                <h4 className="font-semibold text-stone-900 mb-3">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {slab.certifications.map(cert => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-stone-200 pt-6 space-y-3">
                <Button className="w-full emerald-gradient text-white h-12">
                  Request Quote
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-10">
                    <Eye className="w-4 h-4 mr-2" />
                    Quick View
                  </Button>
                  <Button variant="outline" className="h-10">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>

              {/* Trust Signal */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center text-emerald-700 text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="font-medium">Protected Transaction</span>
                </div>
                <p className="text-emerald-600 text-xs mt-1">
                  Covered by escrow protection & FX hedge guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SlabModal;
