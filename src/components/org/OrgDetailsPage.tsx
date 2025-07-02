
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Upload, Save, CheckCircle, Clock, XCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrgDetailsPageProps {
  onBack?: () => void;
}

interface OrgData {
  // Org Identity
  name: string;
  type: 'Exporter' | 'Buyer' | 'Platform';
  contactEmail: string;
  contactPhone: string;
  kycStatus: 'Pending' | 'Verified' | 'Rejected';
  logo?: string;
  
  // Legal + Compliance
  legalName: string;
  country: string;
  state: string;
  registeredAddress: string;
  gstin: string;
  pan: string;
  iec: string;
  cin: string;
  dateOfIncorporation: string;
  
  // Primary Contact
  contactPersonName: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  
  // Preferences
  defaultCurrency: string;
  preferredPaymentTerms: string;
}

const OrgDetailsPage = ({ onBack }: OrgDetailsPageProps) => {
  const { toast } = useToast();
  const [orgData, setOrgData] = useState<OrgData>({
    name: 'Shivani Granites Ltd.',
    type: 'Exporter',
    contactEmail: 'info@shivanigranites.com',
    contactPhone: '+91 98765 43210',
    kycStatus: 'Verified',
    legalName: 'Shivani Granites Private Limited',
    country: 'India',
    state: 'Rajasthan',
    registeredAddress: '123, Industrial Area, Jaipur, Rajasthan - 302013',
    gstin: '08ABCDE1234F1Z5',
    pan: 'ABCDE1234F',
    iec: '0817024567',
    cin: 'U26942RJ2010PTC031507',
    dateOfIncorporation: '2010-03-15',
    contactPersonName: 'Rajesh Kumar',
    contactPersonPhone: '+91 98765 43210',
    contactPersonEmail: 'rajesh@shivanigranites.com',
    defaultCurrency: 'USD',
    preferredPaymentTerms: 'Net 30'
  });

  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('identity');

  const handleInputChange = (field: keyof OrgData, value: string) => {
    setOrgData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setLastSaved(new Date());
      setHasChanges(false);
      toast({
        title: "Changes saved",
        description: "Organization details updated successfully",
      });
    }, 500);
  };

  const handleSubmitKYC = () => {
    toast({
      title: "KYC Review Submitted",
      description: "Your updated details have been submitted for KYC review",
    });
  };

  const getKYCBadge = () => {
    switch (orgData.kycStatus) {
      case 'Verified':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  // Auto-save functionality
  useEffect(() => {
    if (hasChanges) {
      const timer = setTimeout(() => {
        handleSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasChanges]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-stone-900">Organization Details</h1>
                <p className="text-stone-600">Manage your organization profile, legal details, and compliance information</p>
              </div>
            </div>
          </div>
          
          {/* Save Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              {hasChanges ? (
                <>
                  <Save className="w-4 h-4 animate-pulse" />
                  Saving changes...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Last saved {lastSaved.toLocaleTimeString()}
                </>
              )}
            </div>
            
            {hasChanges && (
              <Button variant="outline" size="sm" onClick={handleSubmitKYC}>
                Submit for KYC Review
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Tabs / Desktop Layout */}
        <div className="block md:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="identity">Identity</TabsTrigger>
              <TabsTrigger value="legal">Legal</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="preferences">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="identity" className="mt-6">
              <OrgIdentitySection orgData={orgData} onInputChange={handleInputChange} />
            </TabsContent>
            
            <TabsContent value="legal" className="mt-6">
              <LegalComplianceSection orgData={orgData} onInputChange={handleInputChange} />
            </TabsContent>
            
            <TabsContent value="contact" className="mt-6">
              <ContactSection orgData={orgData} onInputChange={handleInputChange} />
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-6">
              <PreferencesSection orgData={orgData} onInputChange={handleInputChange} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block space-y-8">
          <OrgIdentitySection orgData={orgData} onInputChange={handleInputChange} />
          <LegalComplianceSection orgData={orgData} onInputChange={handleInputChange} />
          <ContactSection orgData={orgData} onInputChange={handleInputChange} />
          <PreferencesSection orgData={orgData} onInputChange={handleInputChange} />
          <BankAccountsSection />
        </div>
      </div>
    </div>
  );
};

// Organization Identity Section
const OrgIdentitySection = ({ orgData, onInputChange }: { orgData: OrgData; onInputChange: (field: keyof OrgData, value: string) => void }) => {
  const getKYCBadge = () => {
    switch (orgData.kycStatus) {
      case 'Verified':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-stone-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-stone-50 to-amber-50/50">
        <CardTitle className="flex items-center justify-between">
          <span className="text-stone-900">Organization Identity</span>
          {getKYCBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              value={orgData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              className="bg-white/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Organization Type</Label>
            <Select value={orgData.type} onValueChange={(value) => onInputChange('type', value)}>
              <SelectTrigger className="bg-white/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Exporter">Exporter</SelectItem>
                <SelectItem value="Buyer">Buyer</SelectItem>
                <SelectItem value="Platform">Platform</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={orgData.contactEmail}
              onChange={(e) => onInputChange('contactEmail', e.target.value)}
              className="bg-white/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              value={orgData.contactPhone}
              onChange={(e) => onInputChange('contactPhone', e.target.value)}
              className="bg-white/50"
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label>Organization Logo</Label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Logo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Legal & Compliance Section
const LegalComplianceSection = ({ orgData, onInputChange }: { orgData: OrgData; onInputChange: (field: keyof OrgData, value: string) => void }) => (
  <Card className="bg-white/80 backdrop-blur-sm border-stone-200 shadow-lg">
    <CardHeader className="bg-gradient-to-r from-stone-50 to-amber-50/50">
      <CardTitle className="text-stone-900">Legal & Compliance Details</CardTitle>
    </CardHeader>
    <CardContent className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="legalName">Legal Name</Label>
          <Input
            id="legalName"
            value={orgData.legalName}
            onChange={(e) => onInputChange('legalName', e.target.value)}
            className="bg-white/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={orgData.country}
            onChange={(e) => onInputChange('country', e.target.value)}
            className="bg-white/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={orgData.state}
            onChange={(e) => onInputChange('state', e.target.value)}
            className="bg-white/50"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="registeredAddress">Registered Address</Label>
          <Textarea
            id="registeredAddress"
            value={orgData.registeredAddress}
            onChange={(e) => onInputChange('registeredAddress', e.target.value)}
            className="bg-white/50"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gstin">GSTIN</Label>
          <Input
            id="gstin"
            value={orgData.gstin}
            onChange={(e) => onInputChange('gstin', e.target.value)}
            className="bg-white/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pan">PAN</Label>
          <Input
            id="pan"
            value={orgData.pan}
            onChange={(e) => onInputChange('pan', e.target.value)}
            className="bg-white/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="iec">IEC</Label>
          <Input
            id="iec"
            value={orgData.iec}
            onChange={(e) => onInputChange('iec', e.target.value)}
            className="bg-white/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cin">CIN</Label>
          <Input
            id="cin"
            value={orgData.cin}
            onChange={(e) => onInputChange('cin', e.target.value)}
            className="bg-white/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dateOfIncorporation">Date of Incorporation</Label>
          <Input
            id="dateOfIncorporation"
            type="date"
            value={orgData.dateOfIncorporation}
            onChange={(e) => onInputChange('dateOfIncorporation', e.target.value)}
            className="bg-white/50"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Primary Contact Section
const ContactSection = ({ orgData, onInputChange }: { orgData: OrgData; onInputChange: (field: keyof OrgData, value: string) => void }) => (
  <Card className="bg-white/80 backdrop-blur-sm border-stone-200 shadow-lg">
    <CardHeader className="bg-gradient-to-r from-stone-50 to-amber-50/50">
      <CardTitle className="text-stone-900">Primary Contact Information</CardTitle>
    </CardHeader>
    <CardContent className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="contactPersonName">Contact Person Name</Label>
          <Input
            id="contactPersonName"
            value={orgData.contactPersonName}
            onChange={(e) => onInputChange('contactPersonName', e.target.value)}
            className="bg-white/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactPersonPhone">Phone</Label>
          <Input
            id="contactPersonPhone"
            value={orgData.contactPersonPhone}
            onChange={(e) => onInputChange('contactPersonPhone', e.target.value)}
            className="bg-white/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactPersonEmail">Email</Label>
          <Input
            id="contactPersonEmail"
            type="email"
            value={orgData.contactPersonEmail}
            onChange={(e) => onInputChange('contactPersonEmail', e.target.value)}
            className="bg-white/50"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Preferences Section
const PreferencesSection = ({ orgData, onInputChange }: { orgData: OrgData; onInputChange: (field: keyof OrgData, value: string) => void }) => (
  <Card className="bg-white/80 backdrop-blur-sm border-stone-200 shadow-lg">
    <CardHeader className="bg-gradient-to-r from-stone-50 to-amber-50/50">
      <CardTitle className="text-stone-900">Preferences</CardTitle>
    </CardHeader>
    <CardContent className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="defaultCurrency">Default Currency</Label>
          <Select value={orgData.defaultCurrency} onValueChange={(value) => onInputChange('defaultCurrency', value)}>
            <SelectTrigger className="bg-white/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD - US Dollar</SelectItem>
              <SelectItem value="EUR">EUR - Euro</SelectItem>
              <SelectItem value="INR">INR - Indian Rupee</SelectItem>
              <SelectItem value="GBP">GBP - British Pound</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="preferredPaymentTerms">Preferred Payment Terms</Label>
          <Select value={orgData.preferredPaymentTerms} onValueChange={(value) => onInputChange('preferredPaymentTerms', value)}>
            <SelectTrigger className="bg-white/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Net 15">Net 15</SelectItem>
              <SelectItem value="Net 30">Net 30</SelectItem>
              <SelectItem value="Net 60">Net 60</SelectItem>
              <SelectItem value="Cash on Delivery">Cash on Delivery</SelectItem>
              <SelectItem value="Letter of Credit">Letter of Credit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Bank Accounts Section
const BankAccountsSection = () => (
  <Card className="bg-white/80 backdrop-blur-sm border-stone-200 shadow-lg">
    <CardHeader className="bg-gradient-to-r from-stone-50 to-amber-50/50">
      <CardTitle className="text-stone-900">Bank Accounts</CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-stone-600">2 bank accounts configured</p>
          <p className="text-sm text-stone-500">Primary: HDFC Bank (****1234)</p>
        </div>
        <Button variant="outline">
          Manage Bank Settings
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default OrgDetailsPage;
