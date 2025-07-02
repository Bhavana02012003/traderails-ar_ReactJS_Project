
/// <reference path="../../types/model-viewer.d.ts" />

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
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
  Lightbulb,
  Box
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
  const [rotationY, setRotationY] = useState(0);
  const [lighting, setLighting] = useState({
    ambient: 0.4,
    directional: 0.8,
    exposure: 1.0,
    shadowIntensity: 0.3
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !slab) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Load the slab image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const animate = () => {
        // Clear canvas with gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#1c1917');
        gradient.addColorStop(1, '#44403c');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Save context for 3D transformation
        ctx.save();

        // Move to center
        ctx.translate(width / 2, height / 2);

        // Auto-rotate if enabled
        if (autoRotate) {
          setRotationY(prev => prev + 0.005);
        }

        // Apply 3D-like transformation
        const perspective = Math.cos(rotationY) * 0.8 + 0.2;
        const skewX = Math.sin(rotationY) * 0.3;

        // Create 3D slab effect
        const slabWidth = 300 * perspective;
        const slabHeight = 200;
        const slabDepth = 20;

        // Draw slab shadow
        ctx.fillStyle = `rgba(0, 0, 0, ${0.3 * lighting.shadowIntensity})`;
        ctx.fillRect(-slabWidth/2 + 10, -slabHeight/2 + 10, slabWidth, slabHeight);

        // Draw slab sides (depth effect)
        if (rotationY > 0) {
          // Right side
          ctx.fillStyle = `rgba(100, 100, 100, ${0.6 * lighting.exposure})`;
          ctx.beginPath();
          ctx.moveTo(slabWidth/2, -slabHeight/2);
          ctx.lineTo(slabWidth/2 + slabDepth, -slabHeight/2 - slabDepth);
          ctx.lineTo(slabWidth/2 + slabDepth, slabHeight/2 - slabDepth);
          ctx.lineTo(slabWidth/2, slabHeight/2);
          ctx.closePath();
          ctx.fill();
        } else {
          // Left side
          ctx.fillStyle = `rgba(80, 80, 80, ${0.5 * lighting.exposure})`;
          ctx.beginPath();
          ctx.moveTo(-slabWidth/2, -slabHeight/2);
          ctx.lineTo(-slabWidth/2 - slabDepth, -slabHeight/2 - slabDepth);
          ctx.lineTo(-slabWidth/2 - slabDepth, slabHeight/2 - slabDepth);
          ctx.lineTo(-slabWidth/2, slabHeight/2);
          ctx.closePath();
          ctx.fill();
        }

        // Draw top edge
        ctx.fillStyle = `rgba(120, 120, 120, ${0.7 * lighting.exposure})`;
        ctx.beginPath();
        ctx.moveTo(-slabWidth/2, -slabHeight/2);
        ctx.lineTo(-slabWidth/2 - slabDepth * Math.sin(rotationY), -slabHeight/2 - slabDepth);
        ctx.lineTo(slabWidth/2 - slabDepth * Math.sin(rotationY), -slabHeight/2 - slabDepth);
        ctx.lineTo(slabWidth/2, -slabHeight/2);
        ctx.closePath();
        ctx.fill();

        // Apply skew for perspective
        ctx.transform(1, 0, skewX, 1, 0, 0);

        // Draw main slab surface with image
        ctx.save();
        ctx.beginPath();
        ctx.rect(-slabWidth/2, -slabHeight/2, slabWidth, slabHeight);
        ctx.clip();

        // Apply lighting effect
        ctx.globalAlpha = lighting.exposure * (0.8 + 0.2 * Math.cos(rotationY));
        ctx.drawImage(img, -slabWidth/2, -slabHeight/2, slabWidth, slabHeight);
        ctx.restore();

        // Add ambient lighting overlay
        const lightGradient = ctx.createRadialGradient(0, -slabHeight/4, 0, 0, 0, slabWidth/2);
        lightGradient.addColorStop(0, `rgba(255, 255, 255, ${lighting.ambient * 0.2})`);
        lightGradient.addColorStop(1, `rgba(255, 255, 255, ${lighting.ambient * 0.05})`);
        ctx.fillStyle = lightGradient;
        ctx.fillRect(-slabWidth/2, -slabHeight/2, slabWidth, slabHeight);

        // Add directional light highlight
        if (lighting.directional > 0.5) {
          const highlightGradient = ctx.createLinearGradient(-slabWidth/2, -slabHeight/2, slabWidth/4, slabHeight/4);
          highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${(lighting.directional - 0.5) * 0.3})`);
          highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = highlightGradient;
          ctx.fillRect(-slabWidth/2, -slabHeight/2, slabWidth, slabHeight);
        }

        ctx.restore();

        // Draw traceability markers if enabled
        if (showTraceability) {
          // Block ID marker
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(width * 0.7, height * 0.3, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'white';
          ctx.font = '12px Inter';
          ctx.fillText(slab.blockId, width * 0.7 + 15, height * 0.3 + 4);

          // Location marker
          ctx.fillStyle = '#3b82f6';
          ctx.beginPath();
          ctx.arc(width * 0.3, height * 0.7, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'white';
          ctx.fillText(slab.quarry.location, width * 0.3 + 15, height * 0.7 + 4);
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
    };

    img.src = slab.images[0] || slab.thumbnail;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [slab, autoRotate, rotationY, lighting, showTraceability]);

  if (!slab) return null;

  const handleReset = () => {
    setRotationY(0);
    setAutoRotate(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`p-0 border-0 ${isFullscreen ? 'max-w-full h-full' : 'max-w-7xl h-[90vh]'} overflow-hidden`}>
        <DialogTitle className="sr-only">3D Slab Viewer - {slab.name}</DialogTitle>
        <div className="relative h-full bg-gradient-to-br from-stone-900 to-stone-800">
          {/* Top Controls */}
          <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-emerald-600 text-white px-4 py-2 text-sm font-medium font-[Inter]">
                <Box className="w-4 h-4 mr-2" />
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

          {/* Main 3D Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onClick={() => setAutoRotate(!autoRotate)}
            style={{ width: '100%', height: '100%' }}
          />

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

          {/* Manual Rotation Controls */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRotationY(prev => prev - 0.1)}
              className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm w-10 h-10 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRotationY(prev => prev + 0.1)}
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

              <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                Click to pause/resume rotation
              </div>
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
                <p className="font-[Inter]">• Tap to pause/resume rotation</p>
                <p className="font-[Inter]">• Use side controls to manually rotate</p>
                <p className="font-[Inter]">• Tap hotspots for traceability info</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Slab3DViewer;
