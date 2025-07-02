
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text, Html } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  FileText, 
  MapPin, 
  Calendar,
  Smartphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SlabData {
  id: string;
  name: string;
  blockId: string;
  material: string;
  finish: string;
  thickness: string;
  dimensions: string;
  quarryOrigin: string;
  finishingDate: string;
  defects: Array<{
    id: string;
    position: [number, number, number];
    type: string;
    description: string;
  }>;
  documents: Array<{
    name: string;
    type: string;
    url: string;
  }>;
}

interface SlabViewer3DProps {
  slabData: SlabData;
  onClose?: () => void;
}

// 3D Slab Mesh Component
const SlabMesh = ({ 
  slabData, 
  showTraceability, 
  onDefectClick 
}: { 
  slabData: SlabData; 
  showTraceability: boolean; 
  onDefectClick: (defect: any) => void;
}) => {
  const meshRef = useRef<any>();
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group>
      {/* Main Slab */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.2, 2.5]} />
        <meshStandardMaterial 
          color={slabData.material === 'Granite' ? '#2a2a2a' : '#f5f5f5'}
          roughness={slabData.finish === 'Polished' ? 0.1 : 0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Traceability Info Overlay */}
      {showTraceability && (
        <Html position={[0, 1, 0]} center>
          <div className="bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg text-sm">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{slabData.quarryOrigin}</span>
            </div>
            <div className="text-xs space-y-1">
              <div>Block ID: {slabData.blockId}</div>
              <div>Finished: {slabData.finishingDate}</div>
            </div>
          </div>
        </Html>
      )}

      {/* Defect Markers */}
      {slabData.defects.map((defect) => (
        <mesh 
          key={defect.id}
          position={defect.position}
          onClick={() => onDefectClick(defect)}
        >
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#ff4444" />
        </mesh>
      ))}
    </group>
  );
};

// Main Viewer Component
const SlabViewer3D: React.FC<SlabViewer3DProps> = ({ slabData, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTraceability, setShowTraceability] = useState(false);
  const [lightingMode, setLightingMode] = useState<'ambient' | 'dramatic'>('ambient');
  const [selectedDefect, setSelectedDefect] = useState<any>(null);
  const [isARMode, setIsARMode] = useState(false);
  const { toast } = useToast();
  const controlsRef = useRef<any>();

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleARMode = () => {
    if ('xr' in navigator) {
      setIsARMode(true);
      toast({
        title: "AR Mode",
        description: "Launching AR viewer...",
      });
    } else {
      toast({
        title: "AR Not Supported",
        description: "Please use a compatible device or scan QR code",
      });
    }
  };

  const handleDefectClick = (defect: any) => {
    setSelectedDefect(defect);
  };

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const containerClass = isFullscreen 
    ? "fixed inset-0 z-50 bg-stone-900" 
    : "relative w-full h-[600px] bg-stone-900 rounded-lg overflow-hidden";

  return (
    <div className={containerClass}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [5, 2, 5], fov: 50 }}
        shadows
        className="w-full h-full"
      >
        <color attach="background" args={['#1a1a1a']} />
        
        {/* Lighting */}
        {lightingMode === 'ambient' ? (
          <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
          </>
        ) : (
          <>
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} intensity={1.5} castShadow />
            <spotLight position={[-10, -10, -10]} intensity={0.5} />
          </>
        )}

        {/* Environment */}
        <Environment preset="warehouse" />
        
        {/* Slab Mesh */}
        <SlabMesh 
          slabData={slabData}
          showTraceability={showTraceability}
          onDefectClick={handleDefectClick}
        />
        
        {/* Ground Shadow */}
        <ContactShadows 
          position={[0, -1, 0]} 
          opacity={0.3} 
          scale={10} 
          blur={2} 
          far={4} 
        />
        
        {/* Controls */}
        <OrbitControls 
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Top Controls Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-600 text-white">
            {slabData.material} - {slabData.finish}
          </Badge>
          <Badge variant="outline" className="bg-white/10 text-white border-white/20">
            {slabData.id}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowTraceability(!showTraceability)}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Eye className="w-4 h-4 mr-2" />
            Traceability
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleARMode}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Smartphone className="w-4 h-4 mr-2" />
            AR View
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleFullscreen}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          
          {onClose && (
            <Button
              size="sm"
              variant="outline"
              onClick={onClose}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              ×
            </Button>
          )}
        </div>
      </div>

      {/* Side Controls */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
        <Button
          size="sm"
          variant="outline"
          onClick={resetCamera}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 p-2"
        >
          <RotateCw className="w-4 h-4" />
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => setLightingMode(lightingMode === 'ambient' ? 'dramatic' : 'ambient')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 p-2"
        >
          💡
        </Button>
      </div>

      {/* Bottom Info Panel */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Slab Details */}
              <div>
                <h3 className="font-semibold text-stone-900 mb-2">{slabData.name}</h3>
                <div className="space-y-1 text-sm text-stone-600">
                  <div>Thickness: {slabData.thickness}</div>
                  <div>Dimensions: {slabData.dimensions}</div>
                  <div>Block ID: {slabData.blockId}</div>
                </div>
              </div>
              
              {/* Origin & Finishing */}
              <div>
                <h4 className="font-medium text-stone-900 mb-2">Origin & Processing</h4>
                <div className="space-y-1 text-sm text-stone-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {slabData.quarryOrigin}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Finished: {slabData.finishingDate}
                  </div>
                </div>
              </div>
              
              {/* Documents */}
              <div>
                <h4 className="font-medium text-stone-900 mb-2">Documents</h4>
                <div className="space-y-1">
                  {slabData.documents.map((doc, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      className="text-xs h-6 px-2"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      {doc.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Defect Detail Modal */}
      {selectedDefect && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <Card className="bg-white m-4 max-w-md">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Surface Analysis</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Type:</strong> {selectedDefect.type}</div>
                <div><strong>Description:</strong> {selectedDefect.description}</div>
              </div>
              <Button
                size="sm"
                onClick={() => setSelectedDefect(null)}
                className="mt-3"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SlabViewer3D;
