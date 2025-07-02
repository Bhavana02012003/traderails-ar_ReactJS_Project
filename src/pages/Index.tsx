import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import MarketplacePreview from "@/components/MarketplacePreview";
import TrustSection from "@/components/TrustSection";

const Index = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Handle login click
    console.log("Login clicked");
  };

  const handleBrowseClick = () => {
    // Navigate to marketplace
    navigate('/marketplace');
  };

  const handleListClick = () => {
    // Handle list inventory click
    console.log("List inventory clicked");
  };

  const handleMarketplaceClick = () => {
    // Navigate to marketplace page
    navigate('/marketplace');
  };

  const handleHomeClick = () => {
    // Handle home navigation - scroll to top or refresh
    window.scrollTo(0, 0);
  };

  const handleDashboardClick = () => {
    // Handle dashboard navigation
    console.log("Dashboard clicked");
    // TODO: Navigate to dashboard when route is created
  };

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
              <Button variant="outline" className="w-full">
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
    </div>
  );
};

export default Index;
