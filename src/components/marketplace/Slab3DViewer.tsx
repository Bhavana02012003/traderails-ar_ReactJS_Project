
import { useState, useRef, useEffect } from 'react';
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
  Lightbulb,
  LightbulbOff,
  Download,
  Share2
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
  const [lighting, setLighting] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    // Load model-viewer script if not already loaded
    if (!window.customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  if (!slab) return null;

  const handleReset = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.resetTurntableRotation();
      modelViewerRef.current.jumpCameraToGoal();
    }
  };

  const handleARMode = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.activateAR();
    }
  };

  // Generate mock 3D model URL based on slab texture
  const get3DModelUrl = () => {
    // In a real implementation, this would be a proper .glb file for each slab
    return `https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb`;
  };

  const getEnvironmentImage = () => {
    return lighting ? 'https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr' : '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`p-0 border-0 ${isFullscreen ? 'max-w-full h-full' : 'max-w-7xl h-[90vh]'} overflow-hidden`}>
        <div className="relative h-full bg-[#1c1c1c]">
          {/* Top Controls */}
          <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-emerald-600 text-white px-4 py-2 text-sm font-medium">
                3D Viewer
              </Badge>
              <Badge variant="outline" className="bg-black/20 text-white border-white/20 backdrop-blur-sm">
                {slab.name}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLighting(!lighting)}
                className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm"
              >
                {lighting ? <Lightbulb className="w-4 h-4" /> : <LightbulbOff className="w-4 h-4" />}
              </Button>
              
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

          {/* 3D Model Viewer */}
          <div className="h-full relative">
            <model-viewer
              ref={modelViewerRef}
              src={get3DModelUrl()}
              alt={slab.name}
              camera-controls
              auto-rotate={false}
              environment-image={getEnvironmentImage()}
              exposure="0.8"
              shadow-intensity="1"
              ar
              ar-modes="webxr scene-viewer quick-look"
              style={{
                width: '100%',
                height: '100%',
                background: '#1c1c1c'
              }}
            >
              {/* Hotspots for annotations */}
              {showTraceability && (
                <>
                  <button
                    className="hotspot"
                    slot="hotspot-1"
                    data-position="0 0.5 0"
                    data-normal="0 1 0"
                    style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '20px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {slab.blockId}
                  </button>
                  
                  <button
                    className="hotspot"
                    slot="hotspot-2"
                    data-position="1 0.2 0"
                    data-normal="1 0 0"
                    style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      padding: '6px 10px',
                      borderRadius: '15px',
                      border: 'none',
                      fontSize: '11px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {slab.quarry.location}
                  </button>
                </>
              )}
            </model-viewer>
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
                onClick={handleARMode}
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
                      <p className="text-stone-600 text-sm mt-1">{slab.supplier.name}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1">
                      Grade {slab.grade.toFixed(1)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-stone-500" />
                      <span className="text-stone-600">
                        {slab.dimensions.length}×{slab.dimensions.width}×{slab.dimensions.thickness}cm
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-stone-500" />
                      <span className="text-stone-600">{slab.blockId}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-stone-500" />
                      <span className="text-stone-600">{slab.quarry.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-stone-500" />
                      <span className="text-stone-600 capitalize">{slab.finish}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                    <div className="text-2xl font-bold text-emerald-600 font-[Inter]">
                      ${slab.price}/{slab.priceUnit}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Download className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs">
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
                <p className="font-[Inter]">• Drag to rotate</p>
                <p className="font-[Inter]">• Two fingers to pan</p>
              </CardContent>
            </Card>
          </div>

          {/* Loading Indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-white text-sm font-[Inter]">
              Loading 3D model...
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Slab3DViewer;
