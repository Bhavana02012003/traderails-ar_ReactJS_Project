
import { useState } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MarketplaceFilters from '@/components/marketplace/MarketplaceFilters';
import SlabGrid from '@/components/marketplace/SlabGrid';
import SlabModal from '@/components/marketplace/SlabModal';
import { Slab } from '@/types/marketplace';

const MarketplaceContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSlab, setSelectedSlab] = useState<Slab | null>(null);
  const [filters, setFilters] = useState({
    material: [] as string[],
    finish: [] as string[],
    colors: [] as string[],
    countries: [] as string[],
    priceRange: [0, 1000] as [number, number],
    gradeMin: 1
  });

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'grade', label: 'AI Quality Score' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header - Fixed positioning */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-stone-900">Global Stone Marketplace</h1>
            <div className="text-sm text-stone-600">
              2,847 premium slabs available
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
              <Input
                placeholder="Search by material, color, origin, or block ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white border-stone-300 focus:border-emerald-500"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-4 border-stone-300"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 px-4 border border-stone-300 rounded-lg bg-white text-sm focus:border-emerald-500 focus:outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex border border-stone-300 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none h-12 px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none h-12 px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <MarketplaceFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            <SlabGrid
              viewMode={viewMode}
              searchQuery={searchQuery}
              sortBy={sortBy}
              filters={filters}
              onSlabClick={setSelectedSlab}
            />
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="bg-stone-100 border-t border-stone-200 py-6 mt-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-stone-600 text-sm">
                <span className="font-semibold text-emerald-600">All listings</span> covered by Escrow & FX hedge protection
              </p>
              <p className="text-stone-500 text-xs mt-1">
                Transparent fees • Secure payments • Global shipping support
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-stone-600">
              View Fee Breakdown
            </Button>
          </div>
        </div>
      </div>

      {/* Slab Detail Modal */}
      {selectedSlab && (
        <SlabModal
          slab={selectedSlab}
          open={!!selectedSlab}
          onOpenChange={() => setSelectedSlab(null)}
        />
      )}
    </div>
  );
};

export default MarketplaceContent;
