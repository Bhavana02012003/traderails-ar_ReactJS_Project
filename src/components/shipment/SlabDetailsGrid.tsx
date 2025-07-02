
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Package } from 'lucide-react';

interface SlabDetailsGridProps {
  containerId: string;
}

const SlabDetailsGrid = ({ containerId }: SlabDetailsGridProps) => {
  const slabs = [
    {
      id: 'SLB-4201',
      type: 'Statuario Venato',
      material: 'Marble',
      finish: 'Polished',
      dimensions: '320x160x3cm',
      quantity: 4,
      grade: 'Premium A',
      weight: '2.1 tons'
    },
    {
      id: 'SLB-4202',
      type: 'Carrara White',
      material: 'Marble',
      finish: 'Honed',
      dimensions: '280x140x2cm',
      quantity: 8,
      grade: 'Commercial A',
      weight: '1.8 tons'
    },
    {
      id: 'SLB-4203',
      type: 'Calacatta Gold',
      material: 'Marble',
      finish: 'Polished',
      dimensions: '300x150x3cm',
      quantity: 6,
      grade: 'Premium A+',
      weight: '2.3 tons'
    },
    {
      id: 'SLB-4204',
      type: 'Nero Marquina',
      material: 'Marble',
      finish: 'Polished',
      dimensions: '320x160x2cm',
      quantity: 6,
      grade: 'Premium A',
      weight: '1.9 tons'
    }
  ];

  const totalWeight = slabs.reduce((sum, slab) => sum + parseFloat(slab.weight), 0);
  const totalSlabs = slabs.reduce((sum, slab) => sum + slab.quantity, 0);

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-stone-200/50 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-stone-900">
            <Package className="w-5 h-5 mr-2 text-emerald-600" />
            Container Contents
          </CardTitle>
          <div className="flex items-center space-x-4 text-sm text-stone-600">
            <span>{totalSlabs} slabs</span>
            <span>{totalWeight.toFixed(1)} tons</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Eye className="w-4 h-4 mr-2" />
              View in 3D
            </Button>
            <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Download className="w-4 h-4 mr-2" />
              Download Manifest
            </Button>
          </div>

          {/* Slab Grid */}
          <div className="grid grid-cols-1 gap-4">
            {slabs.map((slab) => (
              <div key={slab.id} className="border border-stone-200 rounded-lg p-4 hover:bg-stone-50/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-stone-900">{slab.type}</h3>
                    <p className="text-sm text-stone-600">{slab.id} · {slab.material}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={`${
                        slab.grade.includes('A+') 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : slab.grade.includes('Premium')
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-stone-100 text-stone-800 border-stone-200'
                      }`}
                    >
                      {slab.grade}
                    </Badge>
                    <span className="text-sm font-medium text-stone-700">×{slab.quantity}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-stone-500">Finish:</span>
                    <span className="ml-2 font-medium text-stone-900">{slab.finish}</span>
                  </div>
                  <div>
                    <span className="text-stone-500">Size:</span>
                    <span className="ml-2 font-medium text-stone-900">{slab.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-stone-500">Weight:</span>
                    <span className="ml-2 font-medium text-stone-900">{slab.weight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SlabDetailsGrid;
