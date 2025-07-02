import { useState, useMemo } from 'react';
import { Slab } from '@/types/marketplace';
import SlabCard from './SlabCard';

// Mock data for demonstration
const mockSlabs: Slab[] = [
  {
    id: 'SLB-001',
    name: 'Carrara White Marble',
    blockId: 'BLK-4521',
    material: 'marble',
    finish: 'polished',
    colors: ['white', 'gray'],
    dimensions: { length: 320, width: 160, thickness: 2 },
    price: 145,
    priceUnit: 'sqft',
    grade: 4.9,
    aiQualityScore: 9.2,
    availability: 'in-stock',
    shippingTime: '7-14 days',
    images: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=600&fit=crop'
    ],
    supplier: {
      id: 'SUP-001',
      name: 'Marble Masters Italy',
      location: 'Carrara, Italy',
      verified: true,
      rating: 4.8
    },
    quarry: {
      name: 'Carrara Quarry Premium',
      location: 'Carrara, Italy'
    },
    certifications: ['CE Certified', 'ISO 9001'],
    featured: true
  },
  {
    id: 'SLB-002',
    name: 'Absolute Black Granite',
    blockId: 'BLK-7831',
    material: 'granite',
    finish: 'honed',
    colors: ['black'],
    dimensions: { length: 300, width: 150, thickness: 3 },
    price: 89,
    priceUnit: 'sqft',
    grade: 4.7,
    aiQualityScore: 8.8,
    availability: 'in-stock',
    shippingTime: '10-21 days',
    images: [
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=500&h=600&fit=crop'
    ],
    supplier: {
      id: 'SUP-002',
      name: 'Granite World India',
      location: 'Karnataka, India',
      verified: true,
      rating: 4.6
    },
    quarry: {
      name: 'Karnataka Black Quarry',
      location: 'Karnataka, India'
    },
    certifications: ['CE Certified'],
    featured: false
  },
  {
    id: 'SLB-003',
    name: 'Calacatta Gold Marble',
    blockId: 'BLK-9142',
    material: 'marble',
    finish: 'polished',
    colors: ['white', 'gold'],
    dimensions: { length: 280, width: 140, thickness: 2 },
    price: 289,
    priceUnit: 'sqft',
    grade: 5.0,
    aiQualityScore: 9.5,
    availability: 'pre-order',
    shippingTime: '14-28 days',
    images: [
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=600&fit=crop'
    ],
    supplier: {
      id: 'SUP-003',
      name: 'Premium Stone Co.',
      location: 'Tuscany, Italy',
      verified: true,
      rating: 4.9
    },
    quarry: {
      name: 'Tuscany Premium Quarry',
      location: 'Tuscany, Italy'
    },
    certifications: ['CE Certified', 'ISO 9001', 'FSC Certified'],
    featured: true
  }
];

interface SlabGridProps {
  viewMode: 'grid' | 'list';
  searchQuery: string;
  sortBy: string;
  filters: {
    material: string[];
    finish: string[];
    colors: string[];
    countries: string[];
    priceRange: [number, number];
    gradeMin: number;
  };
  onSlabClick: (slab: Slab) => void;
  on3DViewClick?: (slab: Slab) => void;
}

const SlabGrid = ({ 
  viewMode, 
  searchQuery, 
  sortBy, 
  filters, 
  onSlabClick,
  on3DViewClick 
}: SlabGridProps) => {
  const filteredAndSortedSlabs = useMemo(() => {
    let filtered = mockSlabs.filter(slab => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          slab.name.toLowerCase().includes(query) ||
          slab.material.toLowerCase().includes(query) ||
          slab.blockId.toLowerCase().includes(query) ||
          slab.supplier.name.toLowerCase().includes(query) ||
          slab.supplier.location.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // Material filter
      if (filters.material.length > 0 && !filters.material.includes(slab.material)) {
        return false;
      }

      // Finish filter
      if (filters.finish.length > 0 && !filters.finish.includes(slab.finish)) {
        return false;
      }

      // Colors filter
      if (filters.colors.length > 0) {
        const hasMatchingColor = filters.colors.some(color => 
          slab.colors.includes(color)
        );
        if (!hasMatchingColor) return false;
      }

      // Countries filter
      if (filters.countries.length > 0) {
        const hasMatchingCountry = filters.countries.some(country =>
          slab.supplier.location.toLowerCase().includes(country.toLowerCase())
        );
        if (!hasMatchingCountry) return false;
      }

      // Price filter
      if (slab.price < filters.priceRange[0] || slab.price > filters.priceRange[1]) {
        return false;
      }

      // Grade filter
      if (slab.grade < filters.gradeMin) {
        return false;
      }

      return true;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'grade':
        filtered.sort((a, b) => b.grade - a.grade);
        break;
      case 'popularity':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }

    return filtered;
  }, [searchQuery, sortBy, filters]);

  if (filteredAndSortedSlabs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-stone-400 text-lg mb-2">No slabs found</div>
        <div className="text-stone-500 text-sm">
          Try adjusting your search criteria or filters
        </div>
      </div>
    );
  }

  return (
    <div className={
      viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'space-y-4'
    }>
      {filteredAndSortedSlabs.map(slab => (
        <SlabCard
          key={slab.id}
          slab={slab}
          viewMode={viewMode}
          onClick={() => onSlabClick(slab)}
          on3DViewClick={on3DViewClick ? () => on3DViewClick(slab) : undefined}
        />
      ))}
    </div>
  );
};

export default SlabGrid;
