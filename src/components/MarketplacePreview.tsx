import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Heart, Star, ArrowRight, ArrowLeft, Box } from 'lucide-react';
import Slab3DViewer from './marketplace/Slab3DViewer';

const MarketplacePreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSlab, setSelectedSlab] = useState(null);
  const [show3DViewer, setShow3DViewer] = useState(false);

  const slabs = [
    {
      id: '1',
      name: "Carrara White Marble",
      supplier: {
        name: "Marble Masters Italy",
        location: "Carrara, Italy",
        country: "Italy",
        rating: 4.9,
        verified: true
      },
      price: 145,
      priceUnit: 'sqft',
      location: "Carrara, Italy",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=500&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=400&h=300&fit=crop",
      images: ["https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=800&h=600&fit=crop"],
      featured: true,
      thickness: "2cm",
      finish: "polished",
      material: "marble",
      color: "white",
      dimensions: { length: 320, width: 160, thickness: 2 },
      quarry: { name: 'Carrara Quarry', location: 'Tuscany, Italy' },
      blockId: 'CAR-2024-001',
      grade: 4.8,
      aiQualityScore: 95,
      certifications: ['CE', 'ISO 9001'],
      availability: 'in-stock',
      shippingTime: '14-21 days',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: "Absolute Black Granite",
      supplier: {
        name: "Granite World India",
        location: "Karnataka, India",
        country: "India",
        rating: 4.8,
        verified: true
      },
      price: 89,
      priceUnit: 'sqft',
      location: "Karnataka, India",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"],
      featured: false,
      thickness: "3cm",
      finish: "honed",
      material: "granite",
      color: "black",
      dimensions: { length: 300, width: 150, thickness: 3 },
      quarry: { name: 'Karnataka Quarry', location: 'Bangalore, India' },
      blockId: 'ABS-2024-002',
      grade: 4.6,
      aiQualityScore: 88,
      certifications: ['ASTM', 'BIS'],
      availability: 'in-stock',
      shippingTime: '21-28 days',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14'
    },
    {
      id: '3',
      name: "Calacatta Gold Marble",
      supplier: {
        name: "Premium Stone Co.",
        location: "Tuscany, Italy",
        country: "Italy",
        rating: 5.0,
        verified: true
      },
      price: 289,
      priceUnit: 'sqft',
      location: "Tuscany, Italy",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=500&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop",
      images: ["https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=600&fit=crop"],
      featured: true,
      thickness: "2cm",
      finish: "polished",
      material: "marble",
      color: "white",
      dimensions: { length: 310, width: 155, thickness: 2 },
      quarry: { name: 'Calacatta Quarry', location: 'Tuscany, Italy' },
      blockId: 'CAL-2024-003',
      grade: 5.0,
      aiQualityScore: 97,
      certifications: ['CE', 'ISO 9001', 'GREENGUARD'],
      availability: 'in-stock',
      shippingTime: '10-14 days',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slabs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slabs.length) % slabs.length);
  };

  const handle3DView = (slab) => {
    setSelectedSlab(slab);
    setShow3DViewer(true);
  };

  return (
    <section id="marketplace" className="py-20 bg-gradient-to-br from-stone-50 to-sage-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Trending in Marketplace
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover premium stone slabs from verified suppliers worldwide. Each piece is quality-graded and ready for immediate shipping.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="flex overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slabs.map((slab) => (
                <div key={slab.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
                    <div className="md:flex">
                      {/* Image */}
                      <div className="md:w-1/2 relative overflow-hidden">
                        <img 
                          src={slab.image} 
                          alt={slab.name}
                          className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {slab.featured && (
                          <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </div>
                        )}
                        <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                          <Heart className="w-5 h-5 text-stone-600" />
                        </button>
                        <button 
                          onClick={() => handle3DView(slab)}
                          className="absolute bottom-4 right-4 glass-panel px-4 py-2 rounded-lg text-white hover:scale-105 transition-transform flex items-center gap-2"
                        >
                          <Box className="w-4 h-4" />
                          3D View
                        </button>
                      </div>

                      {/* Content */}
                      <div className="md:w-1/2 p-8">
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(slab.rating) ? 'text-yellow-400 fill-current' : 'text-stone-300'}`} 
                              />
                            ))}
                            <span className="ml-2 text-sm text-stone-600">({slab.rating})</span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-stone-900 mb-2">{slab.name}</h3>
                        <p className="text-stone-600 mb-4">{slab.supplier.name}</p>
                        <p className="text-sm text-stone-500 mb-4">{slab.location}</p>

                        <div className="flex items-center justify-between mb-6">
                          <div className="text-3xl font-bold text-emerald-600">${slab.price}/{slab.priceUnit}</div>
                          <div className="text-right">
                            <div className="text-sm text-stone-500">Thickness: {slab.thickness}</div>
                            <div className="text-sm text-stone-500">Finish: {slab.finish}</div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button className="flex-1 emerald-gradient text-white">
                            Request Quote
                          </Button>
                          <Button variant="outline" size="default" className="px-4">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-stone-600" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-stone-50 transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-stone-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {slabs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-emerald-500' : 'bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Browse All CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50">
            Browse All Slabs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* 3D Viewer */}
      <Slab3DViewer 
        slab={selectedSlab}
        isOpen={show3DViewer}
        onClose={() => {
          setShow3DViewer(false);
          setSelectedSlab(null);
        }}
      />
    </section>
  );
};

export default MarketplacePreview;
