import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, Heart, Star, ArrowRight, ArrowLeft, Cube } from 'lucide-react';

const MarketplacePreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slabs = [
    {
      id: 1,
      name: "Carrara White Marble",
      supplier: "Marble Masters Italy",
      price: "$145/sqft",
      location: "Carrara, Italy",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=600&fit=crop",
      featured: true,
      thickness: "2cm",
      finish: "Polished"
    },
    {
      id: 2,
      name: "Absolute Black Granite",
      supplier: "Granite World India",
      price: "$89/sqft",
      location: "Karnataka, India",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=500&h=600&fit=crop",
      featured: false,
      thickness: "3cm",
      finish: "Honed"
    },
    {
      id: 3,
      name: "Calacatta Gold Marble",
      supplier: "Premium Stone Co.",
      price: "$289/sqft",
      location: "Tuscany, Italy",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=600&fit=crop",
      featured: true,
      thickness: "2cm",
      finish: "Polished"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slabs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slabs.length) % slabs.length);
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
                        <Link to="/slab-viewer">
                          <button className="absolute bottom-4 right-4 glass-panel px-4 py-2 rounded-lg text-white hover:scale-105 transition-transform">
                            <Cube className="w-4 h-4 mr-2 inline" />
                            3D View
                          </button>
                        </Link>
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
                        <p className="text-stone-600 mb-4">{slab.supplier}</p>
                        <p className="text-sm text-stone-500 mb-4">{slab.location}</p>

                        <div className="flex items-center justify-between mb-6">
                          <div className="text-3xl font-bold text-emerald-600">{slab.price}</div>
                          <div className="text-right">
                            <div className="text-sm text-stone-500">Thickness: {slab.thickness}</div>
                            <div className="text-sm text-stone-500">Finish: {slab.finish}</div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button className="flex-1 emerald-gradient text-white">
                            Request Quote
                          </Button>
                          <Link to="/slab-viewer">
                            <Button variant="outline" size="default" className="px-4">
                              <Cube className="w-4 h-4" />
                            </Button>
                          </Link>
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
        <div className="text-center mt-12 space-y-4">
          <Button size="lg" variant="outline" className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 mr-4">
            Browse All Slabs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Link to="/slab-viewer">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Try 3D Viewer
              <Cube className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
