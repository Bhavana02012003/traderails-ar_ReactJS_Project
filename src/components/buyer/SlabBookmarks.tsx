
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, MessageSquare } from 'lucide-react';

const SlabBookmarks = () => {
  const bookmarkedSlabs = [
    {
      id: 'SLB-4201',
      name: 'Statuario Venato',
      material: 'Marble',
      dimensions: '320 x 160 x 3cm',
      price: '$145/sqft',
      supplier: 'Marble Masters',
      location: 'Rajasthan, India',
      grade: 9.2,
      image: '/placeholder.svg'
    },
    {
      id: 'SLB-3847',
      name: 'Kashmir White',
      material: 'Granite',
      dimensions: '280 x 140 x 2cm',
      price: '$89/sqft',
      supplier: 'Stone Elite',
      location: 'Karnataka, India',
      grade: 8.8,
      image: '/placeholder.svg'
    },
    {
      id: 'SLB-5692',
      name: 'Calacatta Borghini',
      material: 'Marble',
      dimensions: '310 x 150 x 3cm',
      price: '$198/sqft',
      supplier: 'Premium Stones',
      location: 'Rajasthan, India',
      grade: 9.5,
      image: '/placeholder.svg'
    }
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-stone-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-stone-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Slab Bookmarks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookmarkedSlabs.map((slab) => (
            <div key={slab.id} className="border border-stone-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
              <div className="aspect-video bg-stone-100 relative">
                <img 
                  src={slab.image} 
                  alt={slab.name}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </Button>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-stone-900 truncate">{slab.name}</h3>
                  <p className="text-sm text-stone-600 truncate">{slab.id} · {slab.material}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Dimensions:</span>
                    <span className="font-medium text-right truncate ml-2">{slab.dimensions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Price:</span>
                    <span className="font-bold text-emerald-600">{slab.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">AI Grade:</span>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                      {slab.grade}/10
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-stone-200">
                  <p className="text-sm text-stone-600 mb-3 truncate">{slab.supplier} · {slab.location}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 emerald-gradient text-white">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Quote
                    </Button>
                    <Button variant="outline" size="sm" className="flex-shrink-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SlabBookmarks;
