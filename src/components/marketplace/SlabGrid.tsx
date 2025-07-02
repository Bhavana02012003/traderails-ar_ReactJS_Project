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

  // Mock data with realistic slab images
  useEffect(() => {
    const mockSlabs: Slab[] = [
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
        thumbnail: "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=400&h=300&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=600&fit=crop"
        ],
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
        thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1565192692634-4b4f3e5bf2e4?w=800&h=600&fit=crop"
        ],
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
        thumbnail: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=800&h=600&fit=crop"
        ],
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
      },
      {
        id: '4',
        name: "Emperador Dark Marble",
        supplier: {
          name: "Spanish Stone Exports",
          location: "Valencia, Spain",
          country: "Spain",
          rating: 4.7,
          verified: true
        },
        price: 125,
        priceUnit: 'sqft',
        thumbnail: "https://images.unsplash.com/photo-1565192692634-4b4f3e5bf2e4?w=400&h=300&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1565192692634-4b4f3e5bf2e4?w=800&h=600&fit=crop"
        ],
        featured: false,
        thickness: "2cm",
        finish: "polished",
        material: "marble",
        color: "brown",
        dimensions: { length: 280, width: 140, thickness: 2 },
        quarry: { name: 'Valencia Quarry', location: 'Valencia, Spain' },
        blockId: 'EMP-2024-004',
        grade: 4.3,
        aiQualityScore: 89,
        certifications: ['CE', 'ISO 9001'],
        availability: 'in-stock',
        shippingTime: '18-25 days',
        createdAt: '2024-01-12',
        updatedAt: '2024-01-12'
      },
      {
        id: '5',
        name: "Verde Guatemala Granite",
        supplier: {
          name: "Latin Stone Co.",
          location: "Guatemala City, Guatemala",
          country: "Guatemala",
          rating: 4.5,
          verified: true
        },
        price: 95,
        priceUnit: 'sqft',
        thumbnail: "https://images.unsplash.com/photo-1578499370339-e3e5f17b45e5?w=400&h=300&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1578499370339-e3e5f17b45e5?w=800&h=600&fit=crop"
        ],
        featured: false,
        thickness: "3cm",
        finish: "flamed",
        material: "granite",
        color: "green",
        dimensions: { length: 290, width: 145, thickness: 3 },
        quarry: { name: 'Guatemala Quarry', location: 'Guatemala City, Guatemala' },
        blockId: 'VG-2024-005',
        grade: 4.1,
        aiQualityScore: 85,
        certifications: ['ASTM'],
        availability: 'in-stock',
        shippingTime: '25-35 days',
        createdAt: '2024-01-11',
        updatedAt: '2024-01-11'
      },
      {
        id: '6',
        name: "Travertine Classic",
        supplier: {
          name: "Turkish Natural Stone",
          location: "Denizli, Turkey",
          country: "Turkey",
          rating: 4.6,
          verified: true
        },
        price: 65,
        priceUnit: 'sqft',
        thumbnail: "https://images.unsplash.com/photo-1565366915513-3a0b2b8ab5c9?w=400&h=300&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1565366915513-3a0b2b8ab5c9?w=800&h=600&fit=crop"
        ],
        featured: false,
        thickness: "2cm",
        finish: "honed",
        material: "travertine",
        color: "beige",
        dimensions: { length: 240, width: 120, thickness: 2 },
        quarry: { name: 'Denizli Quarry', location: 'Denizli, Turkey' },
        blockId: 'TC-2024-006',
        grade: 3.9,
        aiQualityScore: 82,
        certifications: ['CE'],
        availability: 'in-stock',
        shippingTime: '20-28 days',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-10'
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
