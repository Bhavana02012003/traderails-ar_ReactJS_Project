
import { useState, useEffect } from 'react';
import SlabCard from './SlabCard';
import { Slab, MarketplaceFilters } from '@/types/marketplace';

interface SlabGridProps {
  viewMode: 'grid' | 'list';
  searchQuery: string;
  sortBy: string;
  filters: MarketplaceFilters;
  onSlabClick: (slab: Slab) => void;
}

const SlabGrid = ({ viewMode, searchQuery, sortBy, filters, onSlabClick }: SlabGridProps) => {
  const [slabs, setSlabs] = useState<Slab[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockSlabs: Slab[] = [
      {
        id: '1',
        name: 'Carrara White Marble',
        material: 'granite',
        finish: 'polished',
        color: 'white',
        price: 145,
        priceUnit: 'sqft',
        dimensions: { length: 320, width: 160, thickness: 2 },
        images: [
          'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop'
        ],
        thumbnail: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
        supplier: {
          name: 'Marble Masters Italy',
          location: 'Carrara, Italy',
          country: 'Italy',
          rating: 4.9,
          verified: true
        },
        quarry: { name: 'Carrara Quarry', location: 'Tuscany, Italy' },
        blockId: 'CAR-2024-001',
        grade: 4.8,
        aiQualityScore: 95,
        certifications: ['CE', 'ISO 9001'],
        availability: 'in-stock',
        shippingTime: '14-21 days',
        featured: true,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Absolute Black Granite',
        material: 'granite',
        finish: 'honed',
        color: 'black',
        price: 89,
        priceUnit: 'sqft',
        dimensions: { length: 300, width: 150, thickness: 3 },
        images: [
          'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&h=600&fit=crop'
        ],
        thumbnail: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop',
        supplier: {
          name: 'Granite World India',
          location: 'Karnataka, India',
          country: 'India',
          rating: 4.7,
          verified: true
        },
        quarry: { name: 'Karnataka Quarry', location: 'Bangalore, India' },
        blockId: 'ABS-2024-002',
        grade: 4.6,
        aiQualityScore: 88,
        certifications: ['ASTM', 'BIS'],
        availability: 'in-stock',
        shippingTime: '21-28 days',
        featured: false,
        createdAt: '2024-01-14',
        updatedAt: '2024-01-14'
      },
      {
        id: '3',
        name: 'Calacatta Gold Marble',
        material: 'granite',
        finish: 'polished',
        color: 'white',
        price: 289,
        priceUnit: 'sqft',
        dimensions: { length: 310, width: 155, thickness: 2 },
        images: [
          'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop'
        ],
        thumbnail: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop',
        supplier: {
          name: 'Premium Stone Co.',
          location: 'Tuscany, Italy',
          country: 'Italy',
          rating: 5.0,
          verified: true
        },
        quarry: { name: 'Calacatta Quarry', location: 'Tuscany, Italy' },
        blockId: 'CAL-2024-003',
        grade: 5.0,
        aiQualityScore: 97,
        certifications: ['CE', 'ISO 9001', 'GREENGUARD'],
        availability: 'in-stock',
        shippingTime: '10-14 days',
        featured: true,
        createdAt: '2024-01-13',
        updatedAt: '2024-01-13'
      },
      {
        id: '4',
        name: 'Kashmir White Granite',
        material: 'granite',
        finish: 'flamed',
        color: 'white',
        price: 125,
        priceUnit: 'sqft',
        dimensions: { length: 280, width: 140, thickness: 2 },
        images: [
          'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop'
        ],
        thumbnail: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
        supplier: {
          name: 'Kashmir Stone Works',
          location: 'Rajasthan, India',
          country: 'India',
          rating: 4.5,
          verified: true
        },
        quarry: { name: 'Kashmir Quarry', location: 'Rajasthan, India' },
        blockId: 'KAS-2024-004',
        grade: 4.3,
        aiQualityScore: 85,
        certifications: ['ASTM', 'BIS'],
        availability: 'pre-order',
        shippingTime: '28-35 days',
        featured: false,
        createdAt: '2024-01-12',
        updatedAt: '2024-01-12'
      }
    ];

    setSlabs(mockSlabs);
    setLoading(false);
  }, []);

  const filteredSlabs = slabs.filter(slab => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!slab.name.toLowerCase().includes(query) &&
          !slab.supplier.name.toLowerCase().includes(query) &&
          !slab.blockId.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Apply filters
    if (filters.material.length > 0 && !filters.material.includes(slab.material)) return false;
    if (filters.finish.length > 0 && !filters.finish.includes(slab.finish)) return false;
    if (filters.colors.length > 0 && !filters.colors.includes(slab.color)) return false;
    if (filters.countries.length > 0 && !filters.countries.includes(slab.supplier.country)) return false;
    if (slab.price < filters.priceRange[0] || slab.price > filters.priceRange[1]) return false;
    if (slab.grade < filters.gradeMin) return false;

    return true;
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm animate-pulse">
            <div className="aspect-[4/3] bg-stone-200 rounded-t-2xl" />
            <div className="p-6 space-y-3">
              <div className="h-4 bg-stone-200 rounded w-3/4" />
              <div className="h-3 bg-stone-200 rounded w-1/2" />
              <div className="h-6 bg-stone-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredSlabs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-stone-400 text-lg mb-2">No slabs found</div>
        <div className="text-stone-500 text-sm">Try adjusting your filters or search terms</div>
      </div>
    );
  }

  return (
    <div className={
      viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
    }>
      {filteredSlabs.map(slab => (
        <SlabCard
          key={slab.id}
          slab={slab}
          viewMode={viewMode}
          onClick={() => onSlabClick(slab)}
        />
      ))}
    </div>
  );
};

export default SlabGrid;
