
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  X, 
  Star, 
  MapPin, 
  Clock, 
  Verified, 
  Box,
  Heart,
  Share2,
  MessageCircle,
  Truck,
  Shield,
  FileText,
  Camera,
  Download
} from 'lucide-react';
import { Slab } from '@/types/marketplace';
import Slab3DViewer from './Slab3DViewer';

interface SlabModalProps {
  slab: Slab;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SlabModal = ({ slab, open, onOpenChange }: SlabModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [show3DViewer, setShow3DViewer] = useState(false);

  const handle3DView = () => {
    setShow3DViewer(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl h-[90vh] p-0 overflow-hidden">
          <div className="flex h-full">
            {/* Left Side - Images */}
            <div className="flex-1 relative bg-stone-100">
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                {slab.featured && (
                  <Badge className="bg-emerald-500 text-white">
                    Featured
                  </Badge>
                )}
                <Badge className="bg-stone-900 text-white">
                  AI Grade {slab.grade.toFixed(1)}
                </Badge>
              </div>
              
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button size="sm" variant="outline" className="bg-white/80">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-white/80">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => onOpenChange(false)} className="bg-white/80">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <img 
                src={slab.images[currentImageIndex]} 
                alt={slab.name}
                className="w-full h-full object-cover"
              />

              {/* 3D View Button */}
              <div className="absolute bottom-4 right-4">
                <Button 
                  onClick={handle3DView}
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <Box className="w-4 h-4 mr-2" />
                  View in 3D
                </Button>
              </div>

              {/* Image Navigation */}
              {slab.images.length > 1 && (
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {slab.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Details */}
            <div className="w-96 bg-white overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                  <h1 className="text-2xl font-bold text-stone-900 mb-2">{slab.name}</h1>
                  <div className="flex items-center gap-2 text-stone-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{slab.supplier.name}</span>
                    {slab.supplier.verified && (
                      <Verified className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(slab.grade) ? 'text-yellow-400 fill-current' : 'text-stone-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-stone-600 ml-1">
                      ({slab.supplier.rating})
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">
                    ${slab.price}
                    <span className="text-lg font-normal text-stone-500">/{slab.priceUnit}</span>
                  </div>
                  <div className="flex items-center text-sm text-stone-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {slab.shippingTime} delivery
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-stone-500">Block ID</span>
                    <div className="font-medium">{slab.blockId}</div>
                  </div>
                  <div>
                    <span className="text-stone-500">Finish</span>
                    <div className="font-medium capitalize">{slab.finish}</div>
                  </div>
                  <div>
                    <span className="text-stone-500">Thickness</span>
                    <div className="font-medium">{slab.dimensions.thickness}cm</div>
                  </div>
                  <div>
                    <span className="text-stone-500">Origin</span>
                    <div className="font-medium">{slab.quarry.location}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                    Request Quote
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" onClick={handle3DView}>
                      <Box className="w-4 h-4 mr-1" />
                      3D View
                    </Button>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                    <TabsTrigger value="docs">Documents</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Material</span>
                          <span className="capitalize">{slab.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Color</span>
                          <span className="capitalize">{slab.color}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Dimensions</span>
                          <span>{slab.dimensions.length}×{slab.dimensions.width}cm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">AI Quality Score</span>
                          <span>{slab.aiQualityScore}/100</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="shipping" className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
                      <Truck className="w-5 h-5 text-stone-600" />
                      <div>
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-stone-600">{slab.shippingTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                      <Shield className="w-5 h-5 text-emerald-600" />
                      <div>
                        <div className="font-medium text-emerald-800">Insured Delivery</div>
                        <div className="text-sm text-emerald-600">Full coverage included</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="docs" className="space-y-3">
                    {slab.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-stone-600" />
                          <span className="font-medium">{cert} Certificate</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 3D Viewer */}
      <Slab3DViewer 
        slab={slab}
        isOpen={show3DViewer}
        onClose={() => setShow3DViewer(false)}
      />
    </>
  );
};

export default SlabModal;
