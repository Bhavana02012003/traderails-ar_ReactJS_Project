
import React, { useState } from 'react';
import SlabViewer3D from '@/components/slab-viewer/SlabViewer3D';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const SlabViewer = () => {
  const [selectedSlab, setSelectedSlab] = useState<string | null>(null);

  const sampleSlabs = [
    {
      id: 'SLB-4201',
      name: 'Imperial Red Granite',
      blockId: 'BLK-8901',
      material: 'Granite',
      finish: 'Polished',
      thickness: '20mm',
      dimensions: '320×160×2cm',
      quarryOrigin: 'Rajasthan, India',
      finishingDate: '2024-06-15',
      defects: [
        {
          id: 'DEF-001',
          position: [1, 0.1, 0.5] as [number, number, number],
          type: 'Natural Vein',
          description: 'Characteristic red mineral vein running through the stone'
        },
        {
          id: 'DEF-002',
          position: [-0.5, 0.1, -0.8] as [number, number, number],
          type: 'Surface Texture',
          description: 'Slight surface variation typical of this material'
        }
      ],
      documents: [
        { name: 'Quality Certificate', type: 'PDF', url: '#' },
        { name: 'Block Photo', type: 'JPG', url: '#' },
        { name: 'Test Report', type: 'PDF', url: '#' }
      ]
    },
    {
      id: 'SLB-4202',
      name: 'Calacatta Gold Quartz',
      blockId: 'BLK-8902',
      material: 'Quartz',
      finish: 'Honed',
      thickness: '30mm',
      dimensions: '300×150×3cm',
      quarryOrigin: 'Tuscany, Italy',
      finishingDate: '2024-06-20',
      defects: [
        {
          id: 'DEF-003',
          position: [0.2, 0.1, 0.3] as [number, number, number],
          type: 'Gold Veining',
          description: 'Premium gold veining pattern - characteristic of Calacatta'
        }
      ],
      documents: [
        { name: 'Authenticity Certificate', type: 'PDF', url: '#' },
        { name: 'Quarry Documentation', type: 'PDF', url: '#' }
      ]
    }
  ];

  const currentSlab = sampleSlabs.find(slab => slab.id === selectedSlab);

  if (currentSlab) {
    return (
      <div className="min-h-screen bg-stone-50">
        <SlabViewer3D 
          slabData={currentSlab}
          onClose={() => setSelectedSlab(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-stone-900 mb-2">
            3D Slab Viewer
          </h1>
          <p className="text-stone-600">
            Immersive 3D inspection of premium stone slabs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleSlabs.map((slab) => (
            <Card key={slab.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{slab.name}</span>
                  <span className="text-sm font-normal text-stone-500">
                    {slab.id}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-stone-600 mb-4">
                  <div><strong>Material:</strong> {slab.material}</div>
                  <div><strong>Finish:</strong> {slab.finish}</div>
                  <div><strong>Dimensions:</strong> {slab.dimensions}</div>
                  <div><strong>Origin:</strong> {slab.quarryOrigin}</div>
                </div>
                
                <Button 
                  onClick={() => setSelectedSlab(slab.id)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  View in 3D
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">3D Viewer Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-medium mb-2">Interactive Controls</h3>
              <ul className="space-y-1 text-stone-600">
                <li>• 360° rotation with mouse/touch</li>
                <li>• Zoom in/out with scroll</li>
                <li>• Pan with right-click drag</li>
                <li>• Reset camera position</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Visual Features</h3>
              <ul className="space-y-1 text-stone-600">
                <li>• Realistic material textures</li>
                <li>• Dynamic lighting modes</li>
                <li>• Defect markers & analysis</li>
                <li>• Traceability overlays</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Advanced Options</h3>
              <ul className="space-y-1 text-stone-600">
                <li>• AR mode for mobile devices</li>
                <li>• Fullscreen inspection</li>
                <li>• Document attachments</li>
                <li>• Block traceability info</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlabViewer;
