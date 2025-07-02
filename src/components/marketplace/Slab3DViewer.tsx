
/// <reference path="../../types/model-viewer.d.ts" />

import { useState, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  X, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Eye,
  Smartphone,
  Info,
  FileText,
  MapPin,
  Ruler,
  Shield,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCw
} from 'lucide-react';
import { Slab } from '@/types/marketplace';

interface Slab3DViewerProps {
  slab: Slab | null;
  isOpen: boolean;
  onClose: () => void;
}

const Slab3DViewer = ({ slab, isOpen, onClose }: Slab3DViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTraceability, setShowTraceability] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  if (!slab) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getSlabImage = () => {
    return slab.images[0] || slab.thumbnail;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`p-0 border-0 ${isFullscreen ? 'max-w-full h-full' : 'max-w-7xl h-[90vh]'} overflow-hidden`}>
        <div className="relative h-full bg-[#1c1c1c]">
          {/* Top Controls */}
          <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-emerald-600 text-white px-4 py-2 text-sm font-medium font-[Inter]">
                3D Viewer
              </Badge>
              <Badge variant="outline" className="bg-black/20 text-white border-white/20 backdrop-blur-sm font-[Inter]">
                {slab.name}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTraceability(!showTraceability)}
                className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm"
              >
                <Info className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Main Image Viewer */}
          <div 
            className="h-full relative overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              ref={imageRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease'
              }}
            >
              <img
                src={getSlabImage()}
                alt={slab.name}
                className="max-w-none max-h-none object-contain rounded-lg shadow-2xl"
                style={{
                  width: 'auto',
                  height: '70vh',
                  maxWidth: '90vw'
                }}
                draggable={false}
              />
              
              {/* Traceability Annotations */}
              {showTraceability && (
                <>
                  <div className="absolute top-1/4 left-1/4 bg-emerald-600 text-white px-3 py-2 rounded-full text-sm font-semibold font-[Inter] shadow-lg">
                    {slab.blockId}
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 bg-blue-600 text-white px-3 py-2 rounded-full text-xs font-[Inter] shadow-lg">
                    {slab.quarry.location}
                  </div>
                </>
              )}
            </div>

            {/* Surface texture overlay for realism */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-black/10 mix-blend-overlay" />
          </div>

          {/* Zoom and Rotation Controls */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm w-10 h-10 p-0"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm w-10 h-10 p-0"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRotate}
              className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm w-10 h-10 p-0"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between">
            {/* Control Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset View
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                View in AR
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInfo(!showInfo)}
                className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showInfo ? 'Hide' : 'Show'} Info
              </Button>
            </div>

            {/* Info Panel */}
            {showInfo && (
              <Card className="w-96 bg-white/95 backdrop-blur-md shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-stone-900 font-[Inter]">{slab.name}</h3>
                      <p className="text-stone-600 text-sm mt-1 font-[Inter]">{slab.supplier.name}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 font-[Inter]">
                      Grade {slab.grade.toFixed(1)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-stone-500" />
                      <span className="text-stone-600 font-[Inter]">
                        {slab.dimensions.length}×{slab.dimensions.width}×{slab.dimensions.thickness}cm
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-stone-500" />
                      <span className="text-stone-600 font-[Inter]">{slab.blockId}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-stone-500" />
                      <span className="text-stone-600 font-[Inter]">{slab.quarry.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-stone-500" />
                      <span className="text-stone-600 capitalize font-[Inter]">{slab.finish}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                    <div className="text-2xl font-bold text-emerald-600 font-[Inter]">
                      ${slab.price}/{slab.priceUnit}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs font-[Inter]">
                        <Download className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs font-[Inter]">
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-[Inter]">
                        Request Quote
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Mobile Touch Instructions */}
          <div className="absolute top-20 right-6 z-20 md:hidden">
            <Card className="bg-black/40 backdrop-blur-sm border-white/20">
              <CardContent className="p-3 text-xs text-white">
                <p className="font-[Inter]">• Pinch to zoom</p>
                <p className="font-[Inter]">• Drag to move</p>
                <p className="font-[Inter]">• Use controls to rotate</p>
              </CardContent>
            </Card>
          </div>

          {/* Zoom Level Indicator */}
          <div className="absolute bottom-6 right-6 z-10">
            <Badge className="bg-black/40 text-white border-white/20 backdrop-blur-sm font-[Inter]">
              {Math.round(zoom * 100)}%
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Slab3DViewer;
