
/// <reference path="../../types/model-viewer.d.ts" />

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
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
  RotateCw,
  Settings,
  Sun,
  Lightbulb
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
  const [showLightingControls, setShowLightingControls] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lighting, setLighting] = useState({
    ambient: 0.4,
    directional: 0.8,
    exposure: 1.0,
    shadowIntensity: 0.3
  });
  const modelViewerRef = useRef<any>(null);

  if (!slab) return null;

  const getSlabImage = () => {
    return slab.images[0] || slab.thumbnail;
  };

  const handleReset = () => {
    setAutoRotate(true);
    if (modelViewerRef.current) {
      modelViewerRef.current.resetTurntableRotation();
      modelViewerRef.current.jumpCameraToGoal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`p-0 border-0 ${isFullscreen ? 'max-w-full h-full' : 'max-w-7xl h-[90vh]'} overflow-hidden`}>
        <div className="relative h-full bg-gradient-to-br from-stone-900 to-stone-800">
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
                onClick={() => setShowLightingControls(!showLightingControls)}
                className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm"
              >
                <Settings className="w-4 h-4" />
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

          {/* Main 3D Viewer */}
          <div className="h-full relative overflow-hidden">
            <model-viewer
              ref={modelViewerRef}
              src="data:application/octet-stream;base64,Z0xURgIAAAAPAAAAKAAAAAgAAAABAAAAAAAAAAAAAAA="
              poster={getSlabImage()}
              alt={`3D view of ${slab.name}`}
              camera-controls
              auto-rotate={autoRotate}
              rotation-per-second="30deg"
              environment-image="neutral"
              exposure={lighting.exposure}
              shadow-intensity={lighting.shadowIntensity}
              camera-orbit="0deg 75deg 2.5m"
              min-camera-orbit="auto auto 1m"
              max-camera-orbit="auto auto 10m"
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                '--poster-color': 'transparent'
              }}
            >
              {/* Custom Plane Geometry with Texture */}
              <div 
                slot="default"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '60%',
                  height: '40%',
                  backgroundImage: `url(${getSlabImage()})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  filter: `brightness(${lighting.exposure}) contrast(1.1)`,
                  transition: 'all 0.3s ease'
                }}
              />

              {/* Traceability Hotspots */}
              {showTraceability && (
                <>
                  <button
                    className="bg-emerald-600 text-white px-3 py-2 rounded-full text-sm font-semibold font-[Inter] shadow-lg border-2 border-white"
                    slot="hotspot-1"
                    data-position="0.5 0.2 0.5"
                    data-normal="0 0 1"
                  >
                    {slab.blockId}
                  </button>
                  <button
                    className="bg-blue-600 text-white px-3 py-2 rounded-full text-xs font-[Inter] shadow-lg border-2 border-white"
                    slot="hotspot-2"
                    data-position="-0.5 -0.2 0.5"
                    data-normal="0 0 1"
                  >
                    {slab.quarry.location}
                  </button>
                </>
              )}

              {/* AR Button */}
              <div slot="ar-button" className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <Smartphone className="w-4 h-4 mr-2" />
                  View in AR
                </Button>
              </div>
            </model-viewer>
          </div>

          {/* Lighting Controls Panel */}
          {showLightingControls && (
            <div className="absolute left-6 top-24 z-20 w-72">
              <Card className="bg-black/80 backdrop-blur-md border-white/20">
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-semibold text-white font-[Inter] flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    Lighting Controls
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-white/80 font-[Inter] flex items-center gap-2 mb-2">
                        <Lightbulb className="w-3 h-3" />
                        Ambient Light: {lighting.ambient.toFixed(1)}
                      </label>
                      <Slider
                        value={[lighting.ambient]}
                        onValueChange={(value) => setLighting(prev => ({ ...prev, ambient: value[0] }))}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-white/80 font-[Inter] mb-2 block">
                        Directional Light: {lighting.directional.toFixed(1)}
                      </label>
                      <Slider
                        value={[lighting.directional]}
                        onValueChange={(value) => setLighting(prev => ({ ...prev, directional: value[0] }))}
                        max={2}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-white/80 font-[Inter] mb-2 block">
                        Exposure: {lighting.exposure.toFixed(1)}
                      </label>
                      <Slider
                        value={[lighting.exposure]}
                        onValueChange={(value) => setLighting(prev => ({ ...prev, exposure: value[0] }))}
                        max={2}
                        min={0.1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-white/80 font-[Inter] mb-2 block">
                        Shadow Intensity: {lighting.shadowIntensity.toFixed(1)}
                      </label>
                      <Slider
                        value={[lighting.shadowIntensity]}
                        onValueChange={(value) => setLighting(prev => ({ ...prev, shadowIntensity: value[0] }))}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setAutoRotate(!autoRotate)}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                    >
                      {autoRotate ? 'Stop' : 'Start'} Rotation
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleReset}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                    >
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Rotation Controls */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (modelViewerRef.current) {
                  const currentOrbit = modelViewerRef.current.getCameraOrbit();
                  modelViewerRef.current.cameraOrbit = `${currentOrbit.theta}rad ${currentOrbit.phi}rad ${Math.max(currentOrbit.radius * 0.8, 1)}m`;
                }
              }}
              className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm w-10 h-10 p-0"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (modelViewerRef.current) {
                  const currentOrbit = modelViewerRef.current.getCameraOrbit();
                  modelViewerRef.current.cameraOrbit = `${currentOrbit.theta}rad ${currentOrbit.phi}rad ${Math.min(currentOrbit.radius * 1.2, 10)}m`;
                }
              }}
              className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm w-10 h-10 p-0"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (modelViewerRef.current) {
                  const currentOrbit = modelViewerRef.current.getCameraOrbit();
                  modelViewerRef.current.cameraOrbit = `${currentOrbit.theta + Math.PI/4}rad ${currentOrbit.phi}rad ${currentOrbit.radius}m`;
                }
              }}
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
                <p className="font-[Inter]">• Drag to rotate</p>
                <p className="font-[Inter]">• Tap hotspots for info</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Slab3DViewer;
