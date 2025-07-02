
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw, ZoomIn, ZoomOut, Move } from 'lucide-react';

interface TouchControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  className?: string;
}

const TouchControls: React.FC<TouchControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  className = ''
}) => {
  const touchAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Prevent default pinch-to-zoom behavior
        e.preventDefault();
      }
    };

    const touchArea = touchAreaRef.current;
    if (touchArea) {
      touchArea.addEventListener('touchstart', handleTouch, { passive: false });
      touchArea.addEventListener('touchmove', handleTouch, { passive: false });
    }

    return () => {
      if (touchArea) {
        touchArea.removeEventListener('touchstart', handleTouch);
        touchArea.removeEventListener('touchmove', handleTouch);
      }
    };
  }, []);

  return (
    <div className={`md:hidden ${className}`}>
      {/* Touch interaction area */}
      <div
        ref={touchAreaRef}
        className="absolute inset-0 pointer-events-auto"
        style={{ touchAction: 'none' }}
      />
      
      {/* Mobile control buttons */}
      <div className="absolute bottom-20 right-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onZoomIn}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 p-2"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={onZoomOut}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 p-2"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={onReset}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 p-2"
        >
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Mobile gesture hints */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full inline-block">
          <Move className="w-3 h-3 inline mr-1" />
          Drag to rotate • Pinch to zoom
        </div>
      </div>
    </div>
  );
};

export default TouchControls;
