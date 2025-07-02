
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Camera, 
  Scan, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Maximize, 
  RotateCcw,
  Layers,
  FileText,
  Upload,
  Tag
} from 'lucide-react';

interface SlabInspectionViewProps {
  slabId: string;
  onClose: () => void;
  onApprove: (slabId: string, notes: string) => void;
  onReject: (slabId: string, issues: string[], notes: string) => void;
}

const SlabInspectionView = ({ slabId, onClose, onApprove, onReject }: SlabInspectionViewProps) => {
  const [inspectionNotes, setInspectionNotes] = useState('');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'2d' | '3d' | 'ar'>('2d');

  // Mock slab data
  const slabData = {
    id: slabId,
    name: 'Carrara White Premium',
    dimensions: '320x160x2cm',
    weight: '1,280 kg',
    origin: 'Carrara, Italy',
    grade: 'Premium A+',
    finish: 'Polished',
    shipmentId: 'SHIP-001',
    containerNo: 'TCLU-7834123'
  };

  const commonIssues = [
    'Crack/Fissure',
    'Color Variation',
    'Surface Scratches',
    'Staining',
    'Dimensional Variance',
    'Edge Chipping',
    'Veining Issues',
    'Thickness Variation'
  ];

  const handleIssueToggle = (issue: string) => {
    setSelectedIssues(prev => 
      prev.includes(issue) 
        ? prev.filter(i => i !== issue)
        : [...prev, issue]
    );
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const newPhoto = `photo-${Date.now()}`;
    setUploadedPhotos(prev => [...prev, newPhoto]);
  };

  const handleApproval = () => {
    onApprove(slabId, inspectionNotes);
    onClose();
  };

  const handleRejection = () => {
    if (selectedIssues.length === 0) {
      alert('Please select at least one issue before rejecting.');
      return;
    }
    onReject(slabId, selectedIssues, inspectionNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{slabData.name}</h2>
              <p className="text-sm text-slate-600">{slabData.dimensions} • {slabData.weight}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-slate-600 hover:text-slate-900">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex h-[calc(90vh-140px)]">
          {/* Left Panel - Slab View */}
          <div className="flex-1 p-6 space-y-4">
            {/* View Mode Selector */}
            <div className="flex items-center space-x-2 mb-4">
              <Button
                size="sm"
                variant={viewMode === '2d' ? 'default' : 'outline'}
                onClick={() => setViewMode('2d')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                2D View
              </Button>
              <Button
                size="sm"
                variant={viewMode === '3d' ? 'default' : 'outline'}
                onClick={() => setViewMode('3d')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                3D View
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'ar' ? 'default' : 'outline'}
                onClick={() => setViewMode('ar')}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Scan className="w-4 h-4 mr-1" />
                AR View
              </Button>
            </div>

            {/* Slab Display Area */}
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl aspect-video flex items-center justify-center relative">
              {viewMode === '2d' && (
                <div className="text-center">
                  <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">2D Slab View</p>
                  <p className="text-sm text-slate-500">Click to add issue tags</p>
                </div>
              )}
              {viewMode === '3d' && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <RotateCcw className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-slate-600">3D Interactive View</p>
                  <p className="text-sm text-slate-500">Drag to rotate, scroll to zoom</p>
                </div>
              )}
              {viewMode === 'ar' && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Scan className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-slate-600">AR Inspection Mode</p>
                  <p className="text-sm text-slate-500">Point camera at slab for overlay</p>
                </div>
              )}
              
              {/* View Controls */}
              <div className="absolute top-4 right-4 space-x-2">
                <Button size="sm" variant="outline" className="bg-white/80 backdrop-blur-sm">
                  <Maximize className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-white/80 backdrop-blur-sm">
                  <Tag className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Inspection Photos</h3>
                <Button onClick={handlePhotoUpload} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Upload className="w-4 h-4 mr-1" />
                  Add Photo
                </Button>
              </div>
              <div className="flex space-x-2">
                {uploadedPhotos.map((photo, index) => (
                  <div key={photo} className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                    <Camera className="w-6 h-6 text-slate-400" />
                  </div>
                ))}
                {uploadedPhotos.length === 0 && (
                  <p className="text-sm text-slate-500 py-4">No photos uploaded yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Inspection Form */}
          <div className="w-96 bg-white/60 backdrop-blur-lg border-l border-white/20 p-6 overflow-y-auto">
            {/* Slab Details */}
            <Card className="mb-6 bg-white/80 backdrop-blur-sm border-white/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-700">Slab Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Grade:</span>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    {slabData.grade}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Origin:</span>
                  <span className="text-slate-900">{slabData.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Finish:</span>
                  <span className="text-slate-900">{slabData.finish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Container:</span>
                  <span className="text-slate-900">{slabData.containerNo}</span>
                </div>
              </CardContent>
            </Card>

            {/* Issue Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 mb-3">Identify Issues</h3>
              <div className="space-y-2">
                {commonIssues.map((issue) => (
                  <div key={issue} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={issue}
                      checked={selectedIssues.includes(issue)}
                      onChange={() => handleIssueToggle(issue)}
                      className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor={issue} className="text-sm text-slate-700">
                      {issue}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspection Notes */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 mb-3">Inspection Notes</h3>
              <Textarea
                value={inspectionNotes}
                onChange={(e) => setInspectionNotes(e.target.value)}
                placeholder="Add detailed notes about the slab condition, quality, and any observations..."
                className="min-h-[100px] bg-white/80 backdrop-blur-sm border-white/30"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleApproval}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Slab
              </Button>
              <Button
                onClick={handleRejection}
                variant="outline"
                className="w-full border-red-200 text-red-700 hover:bg-red-50"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Reject Slab
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlabInspectionView;
