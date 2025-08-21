import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  Eye,
  AlertTriangle,
  CheckCircle,
  Camera,
  MessageCircle,
  Phone,
  Building,
  MapPin,
  Clock,
  Package,
  FileText,
  Layers,
  ArrowRight,
} from "lucide-react";
import OrganizationSwitcher from "@/components/auth/OrganizationSwitcher";
import ChooseOrganizationModal from "@/components/auth/ChooseOrganizationModal";

interface AgentDashboardProps {
  onShowInviteFlow: () => void;
  onOrgDetailsClick?: () => void;
}

const AgentDashboard = ({ onShowInviteFlow }: AgentDashboardProps) => {
  const [selectedOrg, setSelectedOrg] = useState<string>("marble-corp");
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  const [selectedSlab, setSelectedSlab] = useState<string | null>(null);

  // Mock data for organizations
  const organizations = [
    {
      id: "marble-corp",
      name: "Marble Corp USA",
      type: "Buyer" as const,
      location: "New York, USA",
      logo: "/placeholder.svg",
    },
    {
      id: "stone-international",
      name: "Stone International Ltd",
      type: "Buyer" as const,
      location: "London, UK",
      logo: "/placeholder.svg",
    },
  ];

  const currentOrg =
    organizations.find((org) => org.id === selectedOrg) || organizations[0];

  // Mock data for assigned shipments
  const assignedShipments = [
    {
      id: "SHIP-001",
      containerNo: "TCLU-7834123",
      exporter: "Rajasthan Marble Co.",
      port: "Mumbai Port",
      eta: "2024-01-15T10:00:00Z",
      status: "Arriving Soon",
      slabCount: 48,
      priority: "high",
    },
    {
      id: "SHIP-002",
      containerNo: "MSKU-9876543",
      exporter: "Gujarat Stone Exports",
      port: "Kandla Port",
      eta: "2024-01-18T14:30:00Z",
      status: "In Transit",
      slabCount: 32,
      priority: "medium",
    },
  ];

  // Mock data for slabs requiring inspection
  const slabsForInspection = [
    {
      id: "SLAB-001",
      name: "Carrara White Premium",
      dimensions: "320x160x2cm",
      shipmentId: "SHIP-001",
      status: "Pending Inspection",
      image: "/placeholder.svg",
      priority: "high",
    },
    {
      id: "SLAB-002",
      name: "Calacatta Gold",
      dimensions: "320x160x3cm",
      shipmentId: "SHIP-001",
      status: "Pending Inspection",
      image: "/placeholder.svg",
      priority: "medium",
    },
  ];

  const handleOrganizationChange = (orgId: string) => {
    setSelectedOrg(orgId);
  };

  const handleMarkInspected = (shipmentId: string) => {
    console.log("Marking shipment as inspected:", shipmentId);
    // Implementation for marking shipment as inspected
  };

  const handleReportIssue = (shipmentId: string) => {
    console.log("Reporting issue for shipment:", shipmentId);
    // Implementation for reporting issues
  };

  const handleSlabInspection = (slabId: string) => {
    setSelectedSlab(slabId);
    console.log("Opening slab inspection for:", slabId);
    // Implementation for detailed slab inspection
  };

  const handleQuickContact = (type: "whatsapp" | "call") => {
    console.log("Initiating contact via:", type);
    // Implementation for quick communication
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 h-auto sm:h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">
                  Agent Portal
                </span>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                Field Inspector
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:space-x-4">
              <Button
                variant="ghost"
                onClick={() => handleQuickContact("whatsapp")}
                className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleQuickContact("call")}
                className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Organization Switcher - Standardized Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Agent Dashboard
            </h1>
            <p className="text-slate-600 mb-4">
              Field inspection and quality control for buyers
            </p>
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600">
                Currently inspecting for:{" "}
                <span className="font-medium">{currentOrg.name}</span>
              </span>
            </div>
          </div>

          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <OrganizationSwitcher
              currentOrg={currentOrg}
              organizations={organizations}
              onOrganizationChange={handleOrganizationChange}
            />
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assigned Shipments */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-xl border-white/20 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-slate-900">
                  <Truck className="w-5 h-5 mr-2" />
                  Assigned Shipments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignedShipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="bg-white/60 backdrop-blur-lg rounded-xl p-4 border border-white/30 hover:bg-white/80 transition-all duration-200"
                  >
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900">
                            {shipment.containerNo}
                          </h3>
                          <Badge
                            className={`text-xs ${
                              shipment.priority === "high"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                            }`}
                          >
                            {shipment.priority === "high" ? "Urgent" : "Medium"}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">
                          {shipment.exporter}
                        </p>
                        <div className="flex flex-wrap items-center text-sm text-slate-500 gap-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {shipment.port}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(shipment.eta).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Package className="w-4 h-4 mr-1" />
                            {shipment.slabCount} slabs
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs md:text-sm mt-2 md:mt-0">
                        {shipment.status}
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleMarkInspected(shipment.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm px-3 py-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Inspected
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReportIssue(shipment.id)}
                        className="border-red-200 text-red-700 hover:bg-red-50 text-xs md:text-sm px-3 py-1"
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Report Issue
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Current Status */}
          <div className="space-y-6">
            {/* Current Assignment Status */}
            <Card className="bg-white/90 backdrop-blur-xl border-white/20 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-slate-900">
                  Current Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Inspecting for:
                  </h3>
                  <p className="text-sm text-slate-600 font-medium">
                    {currentOrg.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {currentOrg.location}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Communication */}
            <Card className="bg-white/90 backdrop-blur-xl border-white/20 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-slate-900">
                  Quick Communication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => handleQuickContact("whatsapp")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Buyer Team
                </Button>
                <Button
                  onClick={() => handleQuickContact("call")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Slab Inspection Section */}
        <div className="mt-8">
          <Card className="bg-white/90 backdrop-blur-xl border-white/20 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-slate-900">
                <Layers className="w-5 h-5 mr-2" />
                Slabs Requiring Inspection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slabsForInspection.map((slab) => (
                  <div
                    key={slab.id}
                    className="bg-white/60 backdrop-blur-lg rounded-xl p-4 border border-white/30 hover:bg-white/80 transition-all duration-200 cursor-pointer"
                    onClick={() => handleSlabInspection(slab.id)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-3 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-slate-400" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-slate-900 text-sm">
                          {slab.name}
                        </h3>
                        <Badge
                          className={`text-xs ${
                            slab.priority === "high"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }`}
                        >
                          {slab.priority === "high" ? "Urgent" : "Medium"}
                        </Badge>
                      </div>

                      <p className="text-xs text-slate-600">
                        {slab.dimensions}
                      </p>
                      <p className="text-xs text-slate-500">
                        Shipment: {slab.shipmentId}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                          {slab.status}
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Organization Selection Modal */}
      <ChooseOrganizationModal
        open={showOrgModal}
        onOpenChange={setShowOrgModal}
        organizations={organizations}
        onOrganizationSelect={handleOrganizationChange}
        userType="agent"
      />
    </div>
  );
};

export default AgentDashboard;
