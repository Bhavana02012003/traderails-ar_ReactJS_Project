
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import MarketplacePreview from "@/components/MarketplacePreview";
import TrustSection from "@/components/TrustSection";
import SlabGrid from "@/components/marketplace/SlabGrid";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import SlabModal from "@/components/marketplace/SlabModal";
import SlabViewer3D from "@/components/slab-viewer/SlabViewer3D";
import TraderDashboard from "@/components/trader/TraderDashboard";
import LoginModal from "@/components/LoginModal";
import { Slab } from "@/types/marketplace";
import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'home' | 'marketplace' | 'dashboard' | 'login'>('home');
  const [selectedSlab, setSelectedSlab] = useState<Slab | null>(null);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Marketplace state
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    material: [] as string[],
    finish: [] as string[],
    colors: [] as string[],
    countries: [] as string[],
    priceRange: [0, 1000] as [number, number],
    gradeMin: 1
  });

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleBrowseClick = () => {
    setCurrentView('marketplace');
  };

  const handleListClick = () => {
    console.log("List inventory clicked");
  };

  const handleMarketplaceClick = () => {
    setCurrentView('marketplace');
  };

  const handleHomeClick = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  const handleDashboardClick = () => {
    setCurrentView('dashboard');
  };

  const handleSlabClick = (slab: Slab) => {
    setSelectedSlab(slab);
  };

  const handle3DViewClick = (slab: Slab) => {
    setSelectedSlab(slab);
    setShow3DViewer(true);
  };

  const close3DViewer = () => {
    setShow3DViewer(false);
  };

  const convertSlabToSlabData = (slab: Slab) => ({
    id: slab.id,
    name: slab.name,
    blockId: slab.blockId,
    material: slab.material,
    finish: slab.finish,
    thickness: `${slab.dimensions.thickness}cm`,
    dimensions: `${slab.dimensions.length}×${slab.dimensions.width}×${slab.dimensions.thickness}cm`,
    quarryOrigin: slab.quarry.location,
    finishingDate: '2024-06-15',
    defects: [
      {
        id: 'DEF-001',
        position: [1, 0.1, 0.5] as [number, number, number],
        type: 'Natural Variation',
        description: 'Natural stone variation - characteristic of this material'
      }
    ],
    documents: [
      { name: 'Quality Certificate', type: 'PDF', url: '#' },
      { name: 'Block Photo', type: 'JPG', url: '#' }
    ]
  });

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'grade', label: 'AI Quality Score' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  // Show 3D viewer if requested
  if (show3DViewer && selectedSlab) {
    return (
      <div className="min-h-screen bg-stone-900">
        <SlabViewer3D 
          slabData={convertSlabToSlabData(selectedSlab)}
          onClose={close3DViewer}
        />
      </div>
    );
  }

  // Show dashboard view
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-emerald-50">
        <Header 
          onLoginClick={handleLoginClick}
          onMarketplaceClick={handleMarketplaceClick}
          onHomeClick={handleHomeClick}
          onDashboardClick={handleDashboardClick}
          currentView="trader"
        />
        <TraderDashboard />
      </div>
    );
  }

  // Show marketplace view
  if (currentView === 'marketplace') {
    return (
      <div className="min-h-screen bg-stone-50">
        <Header 
          onLoginClick={handleLoginClick}
          onMarketplaceClick={handleMarketplaceClick}
          onHomeClick={handleHomeClick}
          onDashboardClick={handleDashboardClick}
          currentView="marketplace"
        />
        
        {/* Marketplace Header */}
        <div className="bg-white border-b border-stone-200 sticky top-0 z-40">
          <div className="container mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-stone-900">Global Stone Marketplace</h1>
              <div className="text-sm text-stone-600">
                2,847 premium slabs available
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                <Input
                  placeholder="Search by material, color, origin, or block ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-white border-stone-300 focus:border-emerald-500"
                />
              </div>

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
            {showFilters && (
              <div className="w-80 flex-shrink-0">
                <MarketplaceFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
            )}

            <div className="flex-1">
              <SlabGrid
                viewMode={viewMode}
                searchQuery={searchQuery}
                sortBy={sortBy}
                filters={filters}
                onSlabClick={handleSlabClick}
                on3DViewClick={handle3DViewClick}
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
        {selectedSlab && !show3DViewer && (
          <SlabModal
            slab={selectedSlab}
            open={!!selectedSlab}
            onOpenChange={() => setSelectedSlab(null)}
            on3DViewClick={() => handle3DViewClick(selectedSlab)}
          />
        )}
      </div>
    );
  }

  // Show home view
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-sage-50">
      <Header 
        onLoginClick={handleLoginClick}
        onMarketplaceClick={handleMarketplaceClick}
        onHomeClick={handleHomeClick}
        onDashboardClick={handleDashboardClick}
        currentView="home"
      />
      <HeroSection onBrowseClick={handleBrowseClick} onListClick={handleListClick} />
      
      {/* Quick Actions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Platform Tools
            </h2>
            <p className="text-lg text-stone-600">
              Explore our advanced tools for stone trading
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Marketplace</h3>
              <p className="text-stone-600 mb-4">Browse premium stone slabs from verified suppliers</p>
              <Button variant="outline" className="w-full" onClick={handleMarketplaceClick}>
                Explore Marketplace
              </Button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Box className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3D Slab Viewer</h3>
              <p className="text-stone-600 mb-4">Immersive 3D inspection of stone slabs with AR support</p>
              <Link to="/slab-viewer">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Launch 3D Viewer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trade Tools</h3>
              <p className="text-stone-600 mb-4">Advanced tools for quotes, orders, and payments</p>
              <Button variant="outline" className="w-full">
                View Tools
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturesSection />
      <MarketplacePreview />
      <TrustSection />

      {/* Login Modal */}
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
    </div>
  );
};

export default Index;
