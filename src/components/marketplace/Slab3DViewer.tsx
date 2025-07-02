
import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text } from '@react-three/drei';
import { TextureLoader, RepeatWrapping } from 'three';
import * as THREE from 'three';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  X, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2,
  Eye,
  Smartphone,
  Info,
  FileText,
  MapPin,
  Calendar,
  Ruler,
  Shield,
  Lightbulb,
  LightbulbOff
} from 'lucide-react';
import { Slab } from '@/types/marketplace';

interface Slab3DViewerProps {
  slab: Slab | null;
  isOpen: boolean;
  onClose: () => void;
}

// 3D Slab Mesh Component
const SlabMesh = ({ slab, showTraceability }: { slab: Slab; showTraceability: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load texture based on slab image
  const texture = useLoader(TextureLoader, slab.thumbnail);
  
  useEffect(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(1, 1);
    }
  }, [texture]);

  // Subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Create material based on finish type
  const getMaterial = () => {
    const baseProps = {
      map: texture,
      color: slab.color === 'white' ? '#f8f9fa' : slab.color === 'black' ? '#2d3748' : '#8b7355',
    };

    switch (slab.finish) {
      case 'polished':
        return new THREE.MeshPhysicalMaterial({
          ...baseProps,
          metalness: 0.1,
          roughness: 0.1,
          reflectivity: 0.9,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
        });
      case 'honed':
        return new THREE.MeshLambertMaterial({
          ...baseProps,
        });
      case 'leathered':
        return new THREE.MeshStandardMaterial({
          ...baseProps,
          roughness: 0.8,
          metalness: 0.0,
        });
      case 'flamed':
        return new THREE.MeshStandardMaterial({
          ...baseProps,
          roughness: 0.9,
          metalness: 0.0,
          bumpScale: 0.02,
        });
      default:
        return new THREE.MeshStandardMaterial(baseProps);
    }
  };

  return (
    <group>
      <mesh ref={meshRef} material={getMaterial()}>
        <boxGeometry args={[4, 0.2, 6]} />
      </mesh>
      
      {/* Traceability Info Overlay */}
      {showTraceability && (
        <group position={[0, 1, 0]}>
          <Text
            fontSize={0.2}
            color="#10b981"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.woff"
          >
            {slab.blockId}
          </Text>
          <Text
            position={[0, -0.3, 0]}
            fontSize={0.15}
            color="#6b7280"
            anchorX="center"
            anchorY="middle"
          >
            {slab.quarry.name}
          </Text>
        </group>
      )}
    </group>
  );
};

// Loading Component
const Loader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
  </div>
);

const Slab3DViewer = ({ slab, isOpen, onClose }: Slab3DViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTraceability, setShowTraceability] = useState(false);
  const [lighting, setLighting] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const controlsRef = useRef<any>(null);

  if (!slab) return null;

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleARMode = () => {
    // Placeholder for AR functionality
    console.log('AR Mode activated for slab:', slab.id);
  };

  const defectMarkers = [
    { position: [1.5, 0.11, 2], type: 'Natural Vein', description: 'Beautiful natural marble veining' },
    { position: [-1, 0.11, -1.5], type: 'Minor Edge Chip', description: 'Small chip that can be polished' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`p-0 border-0 ${isFullscreen ? 'max-w-full h-full' : 'max-w-7xl h-[85vh]'} overflow-hidden`}>
        <div className="relative h-full bg-gradient-to-b from-stone-900 to-stone-800">
          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-600 text-white px-3 py-1">
                3D View
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                {slab.name}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLighting(!lighting)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {lighting ? <Lightbulb className="w-4 h-4" /> : <LightbulbOff className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTraceability(!showTraceability)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Info className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="h-full">
            <Canvas
              camera={{ position: [5, 3, 5], fov: 50 }}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                {/* Lighting */}
                {lighting && (
                  <>
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <spotLight position={[-10, 10, -5]} intensity={0.5} />
                  </>
                )}
                
                {/* Environment */}
                <Environment preset="warehouse" />
                
                {/* Slab */}
                <SlabMesh slab={slab} showTraceability={showTraceability} />
                
                {/* Contact Shadows */}
                <ContactShadows
                  position={[0, -0.5, 0]}
                  opacity={0.4}
                  scale={10}
                  blur={2}
                  far={4}
                />
                
                {/* Defect Markers */}
                {defectMarkers.map((marker, index) => (
                  <mesh key={index} position={marker.position}>
                    <sphereGeometry args={[0.05]} />
                    <meshBasicMaterial color="#ef4444" />
                  </mesh>
                ))}
                
                {/* Controls */}
                <OrbitControls
                  ref={controlsRef}
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={3}
                  maxDistance={15}
                  maxPolarAngle={Math.PI / 2}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
            {/* Control Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleARMode}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Smartphone className="w-4 h-4 mr-1" />
                AR Mode
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInfo(!showInfo)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Eye className="w-4 h-4 mr-1" />
                {showInfo ? 'Hide' : 'Show'} Info
              </Button>
            </div>

            {/* Info Panel */}
            {showInfo && (
              <Card className="w-80 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-stone-900">{slab.name}</h3>
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                      Grade {slab.grade.toFixed(1)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
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
                  
                  <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                    <div className="text-xl font-bold text-emerald-600">
                      ${slab.price}/{slab.priceUnit}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Request Quote
                      </Button>
                      <Button size="sm" className="bg-emerald-600 text-white">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Touch Instructions for Mobile */}
          <div className="absolute top-20 right-4 z-10 md:hidden">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-3 text-xs text-stone-600">
                <p>• Pinch to zoom</p>
                <p>• Drag to rotate</p>
                <p>• Two fingers to pan</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Slab3DViewer;
