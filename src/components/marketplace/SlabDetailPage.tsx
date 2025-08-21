import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import {
  ArrowLeft,
  Heart,
  Eye,
  Star,
  MapPin,
  Clock,
  Verified,
  Share2,
  MessageCircle,
  Box,
  Shield,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  ZoomIn,
  Factory,
  Award,
  TreePine,
  Layers,
  Target,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Slab } from "@/types/marketplace";
import PayoutModal from "./PayoutModal";

interface SlabDetailPageProps {
  slab: Slab;
  onBack: () => void;
}

const SlabDetailPage = ({ slab, onBack }: SlabDetailPageProps) => {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [view3D, setView3D] = useState(false);
  const [showAIGrading, setShowAIGrading] = useState(false);
  const [showDefectOverlay, setShowDefectOverlay] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % slab.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + slab.images.length) % slab.images.length
    );
  };

  const handleImageZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleBuyNow = () => {
    setShowPayoutModal(true);
  };

  const [showARModal, setShowARModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const arPolygons: Record<string, string> = {
    kitchen:
      "1,486,165,395,166,368,252,367,254,445,267,450,271,442,629,440,643,445,649,445,648,370,663,374,739,372,807,402,809,455,778,457,778,539,1,538,1,486",
    bedroom:
      "5,264,69,260,82,255,162,252,147,275,149,310,176,319,496,314,494,271,492,263,555,254,579,262,634,264,634,356,3,356,5,264",
  };
  const [slabOverlayVisible, setSlabOverlayVisible] = useState(true);

  const aiGradingData = {
    overallScore: slab.aiQualityScore,
    patternUniformity: 8.7,
    colorConsistency: 9.2,
    surfaceQuality: 8.9,
    suggestedUse: ["Countertops", "Wall Cladding"],
    defects: [
      {
        type: "Minor Vein Interruption",
        severity: "Low",
        position: { x: 30, y: 45 },
      },
      {
        type: "Color Variation",
        severity: "Very Low",
        position: { x: 70, y: 25 },
      },
    ],
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-slate-100">
        <div className="bg-white/90 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-stone-600 hover:text-stone-900"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Marketplace
                </Button>
                <div className="h-6 w-px bg-stone-300" />
                <h1 className="text-xl font-semibold text-stone-900">
                  {slab.name}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Image Viewer */}
              <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl">
                <div className="relative aspect-[4/3] bg-stone-100">
                  <img
                    ref={imageRef}
                    src={slab.images[currentImageIndex]}
                    alt={slab.name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                    onClick={handleImageZoom}
                  />

                  {/* Defect Overlay */}
                  {showDefectOverlay &&
                    aiGradingData.defects.map((defect, index) => (
                      <div
                        key={index}
                        className="absolute w-6 h-6 bg-red-500/20 border-2 border-red-500 rounded-full animate-pulse"
                        style={{
                          left: `${defect.position.x}%`,
                          top: `${defect.position.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        title={`${defect.type} - ${defect.severity} severity`}
                      />
                    ))}

                  {/* Navigation arrows */}
                  {slab.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-emerald-400 hover:bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md transition-transform hover:scale-110"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-emerald-400 hover:bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md transition-transform hover:scale-110"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Top overlay controls */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {slab.featured && (
                      <Badge className="bg-emerald-500 text-white">
                        Featured
                      </Badge>
                    )}
                    <Badge className="glass-panel text-white">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Graded • {slab.aiQualityScore}
                    </Badge>
                  </div>

                  {/* Media Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 shadow-sm transition-colors"
                        variant="outline"
                        onClick={() => setView3D(!view3D)}
                      >
                        <Box className="w-4 h-4 mr-2" />
                        {view3D ? "Photo View" : "3D View"}
                      </Button>

                      <Button
                        className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 shadow-sm transition-colors"
                        variant="outline"
                        onClick={() => setShowARModal(true)}
                      >
                        <Smartphone className="w-4 h-4 mr-2" />
                        AR Preview
                      </Button>

                      <Button
                        className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 shadow-sm transition-colors"
                        variant="outline"
                        onClick={handleImageZoom}
                      >
                        <ZoomIn className="w-4 h-4 mr-2" />
                        {isZoomed ? "Zoom Out" : "Zoom In"}
                      </Button>
                    </div>

                    {/* Image dots */}
                    {slab.images.length > 1 && (
                      <div className="flex gap-2">
                        {slab.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Block Traceability */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TreePine className="w-5 h-5 mr-2 text-emerald-600" />
                    Block Traceability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                        <MapPin className="w-8 h-8 text-emerald-600" />
                      </div>
                      <p className="font-medium text-stone-900">
                        {slab.quarry.name}
                      </p>
                      <p className="text-sm text-stone-600">
                        {slab.quarry.location}
                      </p>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 relative">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <ChevronRight className="w-4 h-4 text-stone-400" />
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <Layers className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="font-medium text-stone-900">
                        Block {slab.blockId}
                      </p>
                      <p className="text-sm text-stone-600">
                        12 slabs extracted
                      </p>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 relative">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <ChevronRight className="w-4 h-4 text-stone-400" />
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                        <Target className="w-8 h-8 text-purple-600" />
                      </div>
                      <p className="font-medium text-stone-900">This Slab</p>
                      <p className="text-sm text-stone-600">Premium Grade</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Grading Insights */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                      AI Quality Analysis
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAIGrading(!showAIGrading)}
                    >
                      {showAIGrading ? "Hide Details" : "Show Details"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        {aiGradingData.overallScore}
                      </div>
                      <div className="text-sm text-stone-600">
                        Overall Score
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {aiGradingData.patternUniformity}
                      </div>
                      <div className="text-sm text-stone-600">
                        Pattern Uniformity
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {aiGradingData.colorConsistency}
                      </div>
                      <div className="text-sm text-stone-600">
                        Color Consistency
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {aiGradingData.surfaceQuality}
                      </div>
                      <div className="text-sm text-stone-600">
                        Surface Quality
                      </div>
                    </div>
                  </div>

                  {showAIGrading && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-stone-900 mb-2">
                          Recommended Applications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {aiGradingData.suggestedUse.map((use) => (
                            <Badge
                              key={use}
                              variant="outline"
                              className="bg-emerald-50 text-emerald-700"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {use}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-stone-900">
                            Quality Inspection
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setShowDefectOverlay(!showDefectOverlay)
                            }
                          >
                            {showDefectOverlay ? "Hide" : "Show"} Defects
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {aiGradingData.defects.map((defect, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-stone-50 rounded"
                            >
                              <div className="flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                                <span className="text-sm font-medium">
                                  {defect.type}
                                </span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {defect.severity}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {showARModal && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md space-y-4">
                  <h3 className="text-lg font-semibold text-stone-900">
                    Choose a Room
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {["Kitchen", "Hall", "Bedroom"].map((room) => (
                      <Button
                        key={room}
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSelectedRoom(room);
                          setShowARModal(false);
                        }}
                      >
                        {room}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-stone-500 mt-2"
                    onClick={() => setShowARModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {selectedRoom && (
              <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                  {/* ✅ Close "X" button */}
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="absolute top-3 right-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-1.5 z-10 shadow-md"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="relative w-[810px] h-[540px]">
                    {/* Room Background */}
                    <img
                      src={`/ar-rooms/${selectedRoom.toLowerCase()}.jpg`}
                      alt={selectedRoom}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Slab Polygon */}
                    {slabOverlayVisible &&
                      arPolygons[selectedRoom.toLowerCase()] && (
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 810 540"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <clipPath
                              id="slabClip"
                              clipPathUnits="userSpaceOnUse"
                            >
                              <polygon
                                points={arPolygons[selectedRoom.toLowerCase()]}
                              />
                            </clipPath>
                          </defs>
                          <image
                            href={slab.images[currentImageIndex]}
                            width="810"
                            height="540"
                            preserveAspectRatio="xMidYMid slice"
                            clipPath="url(#slabClip)"
                          />
                        </svg>
                      )}

                    {/* Slab Preview (Bottom Left) */}
                    <div className="absolute bottom-4 left-4">
                      <img
                        src={slab.images[currentImageIndex]}
                        alt="Slab preview"
                        className="w-24 h-16 object-cover border-2 border-white shadow-lg cursor-pointer rounded-sm hover:scale-105 transition-transform"
                        onClick={() => setSlabOverlayVisible((prev) => !prev)}
                        title="Click to toggle slab overlay"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar - Slab Info & Actions */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Price and Grade */}
                    <div>
                      <div className="text-3xl font-bold text-emerald-600 mb-2">
                        ${slab.price}
                        <span className="text-lg text-stone-500">
                          /{slab.priceUnit}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(slab.grade)
                                  ? "text-yellow-400 fill-current"
                                  : "text-stone-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-stone-600">
                            {slab.grade.toFixed(1)} Grade
                          </span>
                        </div>
                        <Badge
                          className={
                            slab.availability === "in-stock"
                              ? "bg-green-100 text-green-800"
                              : slab.availability === "pre-order"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {slab.availability === "in-stock"
                            ? "In Stock"
                            : slab.availability === "pre-order"
                            ? "Pre-Order"
                            : "Sold"}
                        </Badge>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-stone-900">
                        Specifications
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-stone-600">Slab ID:</span>
                          <span className="font-medium">{slab.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Block ID:</span>
                          <span className="font-medium">{slab.blockId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Material:</span>
                          <span className="capitalize font-medium">
                            {slab.material}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Finish:</span>
                          <span className="capitalize font-medium">
                            {slab.finish}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Dimensions:</span>
                          <span className="font-medium">
                            {slab.dimensions.length} × {slab.dimensions.width} ×{" "}
                            {slab.dimensions.thickness}cm
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-600">Shipping:</span>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span className="font-medium">
                              {slab.shippingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <Button
                        className="w-full emerald-gradient text-white h-12 text-lg font-semibold"
                        onClick={handleBuyNow}
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-12 text-lg font-semibold"
                        onClick={() =>
                          console.log("Request quote for:", slab.id)
                        }
                      >
                        Request Quote
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-10">
                          <Heart className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" className="h-10">
                          <Eye className="w-4 h-4 mr-2" />
                          Compare
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full h-10">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat with Supplier
                      </Button>
                    </div>

                    {/* Trust Signal */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-center text-emerald-700 text-sm mb-2">
                        <Shield className="w-4 h-4 mr-2" />
                        <span className="font-medium">
                          Protected Transaction
                        </span>
                      </div>
                      <p className="text-emerald-600 text-xs">
                        Covered by escrow protection & FX hedge guarantee
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Factory className="w-5 h-5 mr-2 text-blue-600" />
                    Supplier Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-stone-900">
                          {slab.supplier.name}
                        </span>
                        {slab.supplier.verified && (
                          <Verified className="w-4 h-4 ml-1 text-emerald-500" />
                        )}
                      </div>
                      <div className="flex items-center text-stone-600 text-sm mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {slab.supplier.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(slab.supplier.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-stone-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-xs text-stone-600">
                        {slab.supplier.rating} rating
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Top Supplier
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Globe className="w-3 h-3 mr-1" />
                      Website
                    </Button>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h5 className="font-medium text-stone-900 mb-2">
                      Certifications
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {slab.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <PayoutModal
        isOpen={showPayoutModal}
        onClose={() => setShowPayoutModal(false)}
        slab={slab}
      />
    </>
  );
};

export default SlabDetailPage;
